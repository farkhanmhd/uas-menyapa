import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import db from "@/db";
import { tickets, orders, events } from "@/db/schema/public";

export const GET = async () => {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await db
      .select({
        eventTitle: events.title,
        ticketCode: tickets.id,
        orderId: orders.id,
        ticketType: tickets.ticketType,
        name: tickets.participantName,
        whatsapp: tickets.whatsappNumber,
        presence: tickets.presence,
      })
      .from(tickets)
      .innerJoin(orders, eq(orders.id, tickets.orderId))
      .innerJoin(events, eq(events.id, orders.eventId));

    if (data.length === 0) {
      return NextResponse.json(
        { message: "No tickets found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
};
