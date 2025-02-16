import { NextResponse } from "next/server";
import db from "@/db"; // Adjust the path to your Drizzle setup
import { certificates, tickets, events } from "@/db/schema/public";
import { eq, and, lt, isNull } from "drizzle-orm";
import { format } from "date-fns";
import { revalidatePath } from "next/cache";

export const POST = async () => {
  try {
    // 1. Select all tickets where the associated order's presence is "present"
    const ticketsToGenerate = await db
      .select({ ticketId: tickets.id })
      .from(tickets)
      .innerJoin(events, eq(events.id, tickets.eventId))
      .leftJoin(certificates, eq(certificates.ticketId, tickets.id))
      .where(
        and(
          eq(tickets.presence, "present"),
          lt(events.endTime, format(new Date(), "yyyy-MM-dd HH:mm:ss")),
          isNull(certificates.ticketId),
        ),
      );

    const ticketIds = ticketsToGenerate.map((t) => t.ticketId);

    if (ticketIds.length === 0) {
      return NextResponse.json({
        message: "No certificates to generate at this time.",
      });
    }

    // 2. Insert a new certificate for each eligible ticket
    await db.insert(certificates).values(
      ticketIds.map((ticketId) => ({
        ticketId,
      })),
    );

    revalidatePath(`/tickets/${tickets.eventId}`);

    return NextResponse.json({
      message: "Certificates generated successfully.",
      count: ticketIds.length,
    });
  } catch (error) {
    console.error("Error generating certificates:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
};
