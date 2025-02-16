import { NextRequest, NextResponse } from "next/server";
import { eq, and, desc } from "drizzle-orm";
import db from "@/db";
import {
  tickets as ticketsdb,
  orders,
  events,
  certificates,
} from "@/db/schema/public";
import { auth } from "@/auth";

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ eventId: string }> },
) => {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session?.user.id;

    const { eventId } = await params;

    const tickets = await db
      .select({
        id: ticketsdb.id,
        orderId: orders.id,
        eventId: events.id,
        eventTitle: events.title,
        participantName: ticketsdb.participantName,
        whatsappNumber: ticketsdb.whatsappNumber,
        ticketType: orders.ticketType,
        startTime: events.startTime,
        endTime: events.endTime,
        eventLocation: events.venue,
        ticketDesign: events.ticketDesignUrl,
        certificateId: certificates.id,
        presence: ticketsdb.presence,
      })
      .from(ticketsdb)
      .innerJoin(orders, eq(ticketsdb.orderId, orders.id))
      .innerJoin(events, eq(orders.eventId, events.id))
      .leftJoin(certificates, eq(certificates.ticketId, ticketsdb.id))
      .where(and(eq(orders.userId, userId), eq(events.id, eventId)))
      .orderBy(desc(ticketsdb.createdAt));

    if (tickets.length === 0) {
      return NextResponse.json({ status: 404, statusText: "Ticket not found" });
    }

    return NextResponse.json({ data: tickets });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
};
