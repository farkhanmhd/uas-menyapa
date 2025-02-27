import { NextRequest, NextResponse } from "next/server";
import db from "@/db";
import { events, orders, paymentDetails } from "@/db/schema/public";
import { sql, eq, and } from "drizzle-orm";
import { auth } from "@/auth";
import {
  loadPurchasedEventsSearchParams,
  PurchasedStatus,
} from "../../lib/searchParams";

export const GET = async (req: NextRequest) => {
  try {
    const session = await auth();
    const isLoggedIn = !!session?.user;

    if (!isLoggedIn) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { status }: { status: PurchasedStatus } =
      loadPurchasedEventsSearchParams(req);

    const searchCondition = status
      ? sql`LOWER(${orders.orderStatus}) LIKE ${`%${status.toLowerCase()}%`}`
      : undefined;

    const userId = session?.user.id;

    const purchasedEvents = await db
      .select({
        eventId: events.id,
        title: events.title,
        posterUrl: events.posterUrl,
        venue: events.venue,
        city: events.city,
        startTime: events.startTime,
        endTime: events.endTime,
        totalQty: sql<number>`SUM(${orders.orderQty})`.as("totalQty"),
      })
      .from(events)
      .innerJoin(orders, eq(events.id, orders.eventId))
      .innerJoin(paymentDetails, eq(orders.id, paymentDetails.orderId))
      .where(
        and(
          eq(orders.userId, userId), // Filter by user
          eq(paymentDetails.transactionStatus, "settlement"), // Ensure the payment is completed
          searchCondition,
        ),
      )
      .groupBy(events.id);

    return NextResponse.json({ data: { purchasedEvents } });
  } catch (error) {
    console.error("Error fetching purchased events:", error);
    return NextResponse.json(
      { error: "Error fetching purchased events" },
      { status: 500 },
    );
  }
};

export const PUT = async () => {
  try {
    const result = await db.execute(sql`
      UPDATE tickets
      JOIN events ON tickets.event_id = events.id
      SET tickets.presence = 'absent'
      WHERE tickets.presence = 'waiting'
      AND events.end_time < NOW();
    `);

    if (result[0].affectedRows === 0) {
      return NextResponse.json(
        { error: "No waiting tickets found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      message: "Tickets updated successfully",
      updatedRows: result[0].affectedRows,
    });
  } catch (error) {
    console.error("Error updating tickets:", error);
    return NextResponse.json(
      { error: "Error updating tickets" },
      { status: 500 },
    );
  }
};
