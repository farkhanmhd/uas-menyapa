import { NextRequest, NextResponse } from "next/server";
import db from "@/db";
import { events, orders, paymentDetails, tickets } from "@/db/schema/public";
import { sql, eq, and, lt } from "drizzle-orm";
import { auth } from "@/auth";
import {
  loadPurchasedEventsSearchParams,
  PurchasedStatus,
} from "../../lib/searchParams";
import { format } from "date-fns";

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
    const updatedRows = await db.transaction(async (tx) => {
      // Update tickets directly without an extra SELECT query
      const result = await tx
        .update(tickets)
        .set({ presence: "present" })
        .where(
          and(
            eq(tickets.presence, "waiting"),
            lt(events.endTime, format(new Date(), "yyyy-MM-dd HH:mm:ss")),
          ),
        );

      return result[0].affectedRows;
    });

    if (updatedRows === 0) {
      return NextResponse.json(
        { error: "No waiting tickets found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      message: "Tickets updated successfully",
      updatedRows,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating tickets" },
      { status: 500 },
    );
  }
};
