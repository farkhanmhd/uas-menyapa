import { NextRequest, NextResponse } from "next/server";
// @ts-expect-error no official types available yet
import midtransClient from "midtrans-client";
import { randomUUID } from "crypto";
import { sql, desc, and, eq } from "drizzle-orm";
import type { OrderStatus } from "../../lib/searchParams";
import db from "@/db";
import {
  orders,
  eventAvailability,
  eventPrice,
  events,
  paymentDetails,
} from "@/db/schema/public";
import { users } from "@/db/schema/authentication";
import { calculateTotal } from "@/lib/utils";
import { BankTransferType, OrderDetails, PaymentType } from "@/types";
import { loadOrdersSearchParams } from "../../lib/searchParams";
import { auth } from "@/auth";
import { OrderData, orderSchema } from "@/types";
import { revalidatePath } from "next/cache";

export const POST = async (req: NextRequest) => {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    const body = await req.json();
    const validation = orderSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid request data", details: validation.error.format() },
        { status: 400 },
      );
    }

    const data: OrderData = validation.data;

    // Fetch user details
    const user = await db
      .select({
        name: users.name,
        email: users.email,
        whatsapp: users.whatsapp,
      })
      .from(users)
      .where(eq(users.id, userId));

    if (!user.length) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const customer = user[0];

    if (!customer.whatsapp) {
      return NextResponse.json(
        { error: "User has no whatsapp number" },
        { status: 400 },
      );
    }

    // Initialize Midtrans client outside transaction
    const core = new midtransClient.CoreApi({
      isProduction: true,
      serverKey: process.env.MIDTRANS_SERVER_KEY,
      clientKey: process.env.MIDTRANS_CLIENT_KEY,
    });

    const paymentType = {
      qris: "qris",
      gopay: "gopay",
      bca: "bank_transfer",
      bri: "bank_transfer",
      bni: "bank_transfer",
      cimb: "bank_transfer",
      mandiri: "echannel",
      permata: "permata",
    };

    // Handle everything in a single transaction
    const transaction = await db.transaction(async (tx) => {
      // Lock the row for update and fetch event details
      const [stockRow, eventDetails] = await Promise.all([
        tx
          .select()
          .from(eventAvailability)
          .where(eq(eventAvailability.eventId, data.eventId))
          .for("update"),
        tx
          .select({
            title: events.title,
            startTime: events.startTime,
          })
          .from(events)
          .where(eq(events.id, data.eventId)),
      ]);

      if (!stockRow.length) {
        throw new Error("Event not found");
      }

      if (!eventDetails.length) {
        throw new Error("Event details not found");
      }

      const stock = stockRow[0];
      const event = eventDetails[0];

      // Check if event has already started
      if (new Date(event.startTime) < new Date()) {
        throw new Error("Event has already started");
      }

      const availableStock =
        data.variant === "reguler"
          ? stock.regulerAvailability
          : stock.vipAvailability;

      if (availableStock < data.qty) {
        throw new Error("Not enough tickets available");
      }

      // Fetch ticket price
      const priceRow = await tx
        .select()
        .from(eventPrice)
        .where(eq(eventPrice.eventId, data.eventId));

      if (!priceRow.length) {
        throw new Error("Price not found");
      }

      const price = priceRow[0];
      const ticketPrice =
        data.variant === "reguler" ? price.reguler : price.vip;
      const totalPrice = ticketPrice * data.qty;

      const { total, serviceFee, vat } = calculateTotal(
        totalPrice,
        data.paymentMethod,
      );

      const orderDetails: OrderDetails = {
        payment_type: paymentType[
          data.paymentMethod as keyof typeof paymentType
        ] as PaymentType,
        transaction_details: {
          order_id: `order-${randomUUID()}`,
          gross_amount: total,
        },
        customer_details: {
          first_name: customer.name as string,
          email: customer.email as string,
          phone: customer.whatsapp as string,
        },
        item_details: [
          {
            id: data.eventId,
            price: ticketPrice,
            quantity: data.qty as number,
            name: event.title,
            category: data.variant as string,
          },
          {
            id: "service_fee",
            price: serviceFee,
            quantity: 1,
            name: "Service Fee",
            category: "service_fee",
          },
        ],
      };

      if (orderDetails.payment_type === "qris") {
        orderDetails.qris = {
          acquirer: "gopay",
        };
      }

      if (orderDetails.payment_type === "gopay") {
        orderDetails.gopay = {
          enable_callback: true,
        };
      }

      if (orderDetails.payment_type === "bank_transfer") {
        orderDetails.bank_transfer = {
          bank: data.paymentMethod as BankTransferType,
        };
        orderDetails.item_details.push({
          id: "vat",
          price: vat,
          quantity: 1,
          name: "VAT",
          category: "vat",
        });
      }

      if (orderDetails.payment_type === "echannel") {
        orderDetails.echannel = {
          bill_info1: "Payment For:",
          bill_info2: event.title,
          bill_info3: "Name:",
          bill_info4: customer.name as string,
        };
        orderDetails.item_details.push({
          id: "vat",
          price: vat,
          quantity: 1,
          name: "VAT",
          category: "vat",
        });
      }

      if (orderDetails.payment_type === "permata") {
        orderDetails.item_details.push({
          id: "vat",
          price: vat,
          quantity: 1,
          name: "VAT",
          category: "vat",
        });
      }

      // Process order inside transaction
      const paymentResponse = await core.charge(JSON.stringify(orderDetails));

      // If order is successful, update stock
      if (data.variant === "reguler") {
        await tx
          .update(eventAvailability)
          .set({
            regulerAvailability: sql`${eventAvailability.regulerAvailability} - ${data.qty}`,
          })
          .where(eq(eventAvailability.eventId, data.eventId));
      } else {
        await tx
          .update(eventAvailability)
          .set({
            vipAvailability: sql`${eventAvailability.vipAvailability} - ${data.qty}`,
          })
          .where(eq(eventAvailability.eventId, data.eventId));
      }

      // Insert order into database
      await tx.insert(orders).values({
        id: orderDetails.transaction_details.order_id,
        userId,
        eventId: data.eventId,
        ticketType: data.variant,
        paymentMethod: data.paymentMethod,
        orderQty: data.qty,
        subTotal: totalPrice,
        orderStatus: "Pending",
      });

      // Insert payment details
      await tx.insert(paymentDetails).values({
        orderId: orderDetails.transaction_details.order_id,
        transactionId: paymentResponse.transaction_id,
        grossAmount: paymentResponse.gross_amount,
        currency: "IDR", // Default as specified in schema
        paymentType: paymentResponse.payment_type,
        transactionTime: paymentResponse.transaction_time,
        transactionStatus: paymentResponse.transaction_status,
        fraudStatus: paymentResponse.fraud_status,
        expiryTime: paymentResponse.expiry_time,

        // Optional fields based on payment type
        qrString: paymentResponse.qr_string || null,
        acquirer: paymentResponse.acquirer || null,
        vaNumbers: paymentResponse.va_numbers || null,
        billKey: paymentResponse.bill_key || null,
        billerCode: paymentResponse.biller_code || null,
        permataVaNumber: paymentResponse.permata_va_number || null,
        actions: paymentResponse.actions || null,
      });

      revalidatePath(`/events/${data.eventId}`);
      revalidatePath("/orders");

      return paymentResponse;
    });

    return NextResponse.json(
      { data: transaction },
      { status: transaction.status_code },
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Something went wrong",
      },
      { status: 500 },
    );
  }
};

export const GET = async (req: NextRequest) => {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session?.user.id;

    const { status }: { status: OrderStatus } = loadOrdersSearchParams(req);

    const searchCondition = status
      ? sql`LOWER(${orders.orderStatus}) LIKE ${`%${status.toLowerCase()}%`}`
      : undefined;

    const result = await db
      .select({
        orderId: orders.id,
        title: events.title,
        startTime: events.startTime,
        endTime: events.endTime,
        posterUrl: events.posterUrl,
        ticketType: orders.ticketType,
        paymentMethod: orders.paymentMethod,
        qty: orders.orderQty,
        orderStatus: orders.orderStatus,
        grossAmount: paymentDetails.grossAmount,
        currency: paymentDetails.currency,
        transactionStatus: paymentDetails.transactionStatus,
      })
      .from(orders)
      .leftJoin(paymentDetails, eq(orders.id, paymentDetails.orderId))
      .leftJoin(events, eq(orders.eventId, events.id))
      .where(and(eq(orders.userId, userId ?? ""), searchCondition))
      .orderBy(desc(orders.createdAt));

    return NextResponse.json({ data: result }, { status: 200 });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
};
