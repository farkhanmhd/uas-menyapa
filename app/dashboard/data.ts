import db from "@/db";
import {
  tickets,
  orders,
  events,
  paymentDetails,
  eventPrice,
} from "@/db/schema/public";
import { eq } from "drizzle-orm";

export type Sale = {
  eventTitle: string;
  ticketCode: string;
  orderId: string;
  ticketType: "vip" | "reguler";
  name: string | null;
  whatsapp: string | null;
  paymentMethod: string;
  orderQty: number;
  grossAmount: string;
};

export async function getTicketSales(): Promise<Sale[]> {
  const rows = await db
    .select({
      eventTitle: events.title,
      ticketCode: tickets.id,
      orderId: orders.id,
      ticketType: tickets.ticketType,
      name: tickets.participantName,
      whatsapp: tickets.whatsappNumber,
      paymentMethod: orders.paymentMethod,
      orderQty: orders.orderQty,
      grossAmount: paymentDetails.grossAmount,
    })
    .from(tickets)
    .innerJoin(orders, eq(orders.id, tickets.orderId))
    .innerJoin(events, eq(events.id, tickets.eventId))
    .innerJoin(eventPrice, eq(events.id, eventPrice.eventId))
    .innerJoin(paymentDetails, eq(orders.id, paymentDetails.orderId));

  return rows;
}
