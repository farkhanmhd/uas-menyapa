import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
// @ts-expect-error no official types available yet
import midtransClient from "midtrans-client";
import db from "@/db";
import { orders, paymentDetails, eventAvailability } from "@/db/schema/public";
import { eq, sql } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const notificationJson = await req.json();

    const apiClient = new midtransClient.Snap({
      isProduction: false,
      serverKey: process.env.MIDTRANS_SERVER_KEY as string,
      clientKey: process.env.MIDTRANS_CLIENT_KEY as string,
    });

    const statusResponse =
      await apiClient.transaction.notification(notificationJson);

    const { order_id, transaction_status } = statusResponse;

    if (transaction_status === "settlement") {
      // Update order status to 'Active'
      await db
        .update(orders)
        .set({ orderStatus: "Active" }) // Ensure "Active" is a valid status in your schema
        .where(eq(orders.id, order_id));

      // Update payment details status to 'settlement'
      await db
        .update(paymentDetails)
        .set({ transactionStatus: transaction_status }) // Ensure "settlement" is a valid status in payment details
        .where(eq(paymentDetails.orderId, order_id));

      // Revalidate the /orders path to reflect changes
      revalidatePath("/orders");
      revalidatePath(`/orders/${order_id}`);
    }

    if (transaction_status === "expire") {
      const orderedQty = await db
        .select({
          qty: orders.orderQty,
          variant: orders.ticketType,
          eventId: orders.eventId,
        })
        .from(orders)
        .where(eq(orders.id, order_id));

      const orderedQtyData = orderedQty[0];
      const { qty, variant, eventId } = orderedQtyData;

      // Update order status to 'Cancelled'
      await db
        .update(orders)
        .set({ orderStatus: "Cancelled" }) // Ensure "Cancelled" is a valid status in your schema
        .where(eq(orders.id, order_id));

      // update event availability qty
      // Update event availability based on ticket variant (e.g., VIP or Regular)
      if (variant === "vip") {
        await db
          .update(eventAvailability)
          .set({
            vipAvailability: sql`${eventAvailability.vipAvailability} + ${qty}`, // Increment the availability
          })
          .where(eq(eventAvailability.eventId, eventId)); // Assuming variant is linked to eventId
      } else {
        await db
          .update(eventAvailability)
          .set({
            regulerAvailability: sql`${eventAvailability.regulerAvailability} + ${qty}`, // Increment the availability
          })
          .where(eq(eventAvailability.eventId, eventId)); // Assuming variant is linked to eventId
      }

      revalidatePath("/orders");
      revalidatePath(`/events/${eventId}`);
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error processing Midtrans webhook:", error);
    return NextResponse.json(
      { error: "Error processing Midtrans webhook" },
      { status: 500 },
    );
  }
}
