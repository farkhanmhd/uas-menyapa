import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import db from "@/db";
import { tickets, orders, events } from "@/db/schema/public";
import { eq } from "drizzle-orm";

export async function GET(
  request: NextRequest,
  { params }: { params: { eventId: string } },
) {
  try {
    const session = await auth();
    if (
      !session?.user ||
      !["admin", "superAdmin"].includes(session.user.role)
    ) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const ticketData = await db
      .select({
        ticketCode: tickets.id,
        nameOnTicket: tickets.participantName,
        whatsapp: tickets.whatsappNumber,
        presence: tickets.presence,
        orderId: orders.id,
        ticketType: tickets.ticketType,
      })
      .from(tickets)
      .innerJoin(orders, eq(tickets.orderId, orders.id))
      .innerJoin(events, eq(orders.eventId, events.id))
      .where(eq(events.id, params.eventId));

    return NextResponse.json({
      status: "success",
      data: ticketData,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
