import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
// @ts-expect-error no official types available yet
import midtransClient from "midtrans-client";
import db from "@/db";
import {
  orders,
  paymentDetails,
  eventAvailability,
  tickets,
} from "@/db/schema/public";
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
      try {
        await db.transaction(async (trx) => {
          // Update order status to 'Active'
          await trx
            .update(orders)
            .set({ orderStatus: "Active" })
            .where(eq(orders.id, order_id));

          // Update payment details status to 'settlement'
          await trx
            .update(paymentDetails)
            .set({ transactionStatus: transaction_status })
            .where(eq(paymentDetails.orderId, order_id));

          // Retrieve the order details within the transaction
          const orderDetails = await trx
            .select({
              orderId: orders.id,
              eventId: orders.eventId,
              ticketType: orders.ticketType,
              orderQty: orders.orderQty,
            })
            .from(orders)
            .where(eq(orders.id, order_id));

          if (orderDetails.length === 0) {
            throw new Error(`Order ${order_id} not found`);
          }

          const { eventId, ticketType, orderQty } = orderDetails[0];

          // Generate an array of ticket objects for batch insert
          const ticketsToInsert = Array.from({ length: orderQty }).map(() => ({
            orderId: order_id,
            eventId,
            ticketType,
          }));

          // Insert all tickets at once within the transaction
          await trx.insert(tickets).values(ticketsToInsert);

          revalidatePath("/orders");
          revalidatePath(`/events/${eventId}`);
          revalidatePath("/tickets");

          console.log(`${orderQty} tickets generated for order ${order_id}`);
        });

        console.log(`Transaction completed for order ${order_id}`);
      } catch (error) {
        console.error(`Transaction failed for order ${order_id}:`, error);
      }
    }

    if (transaction_status === "expire") {
      try {
        await db.transaction(async (trx) => {
          // Retrieve the ordered quantity, variant, and eventId within the transaction
          const orderedQty = await trx
            .select({
              qty: orders.orderQty,
              variant: orders.ticketType,
              eventId: orders.eventId,
            })
            .from(orders)
            .where(eq(orders.id, order_id));

          if (orderedQty.length === 0) {
            throw new Error(`Order ${order_id} not found`);
          }

          const { qty, variant, eventId } = orderedQty[0];

          // Update order status to 'Cancelled'
          await trx
            .update(orders)
            .set({ orderStatus: "Cancelled" })
            .where(eq(orders.id, order_id));

          // Update event availability based on the ticket variant
          if (variant === "vip") {
            await trx
              .update(eventAvailability)
              .set({
                vipAvailability: sql`${eventAvailability.vipAvailability} + ${qty}`, // Increment VIP availability
              })
              .where(eq(eventAvailability.eventId, eventId));
          } else {
            await trx
              .update(eventAvailability)
              .set({
                regulerAvailability: sql`${eventAvailability.regulerAvailability} + ${qty}`, // Increment Regular availability
              })
              .where(eq(eventAvailability.eventId, eventId));
          }

          // Revalidate relevant paths
          revalidatePath("/orders");
          revalidatePath(`/events/${eventId}`);

          console.log(
            `Order ${order_id} marked as 'Cancelled', and availability updated.`,
          );
        });
      } catch (error) {
        console.error(
          `Transaction failed for expiring order ${order_id}:`,
          error,
        );
      }
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
