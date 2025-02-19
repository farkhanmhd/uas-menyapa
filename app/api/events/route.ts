import { count, sql, and, gte, lte } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import db from "@/db";
import { events as eventsDb } from "@/db/schema/public";
import { loadEventSearchParams } from "../../lib/searchParams";

export async function GET(request: NextRequest) {
  try {
    const { page, search, limit, start, end } = loadEventSearchParams(request);
    const offset = (Number(page) - 1) * Number(limit);

    // Search condition (case-insensitive)
    const searchCondition = search
      ? sql`(
          LOWER(${eventsDb.title}) LIKE ${`%${search.toLowerCase()}%`} OR 
          LOWER(${eventsDb.city}) LIKE ${`%${search.toLowerCase()}%`} OR 
          LOWER(${eventsDb.venue}) LIKE ${`%${search.toLowerCase()}%`}
        )`
      : undefined;

    const startNormalized = start ? `${start} 00:00:00` : undefined;
    const endNormalized = end ? `${end} 23:59:59` : undefined;

    // Build the date range condition
    const dateCondition =
      startNormalized && endNormalized
        ? and(
            gte(eventsDb.startTime, startNormalized), // Greater than or equal to start date
            lte(eventsDb.endTime, endNormalized), // Less than or equal to end date
          )
        : undefined;

    // Combine search and date filters
    const whereClause = searchCondition
      ? sql`(${searchCondition}) AND ${dateCondition}`
      : dateCondition;

    const events = await db
      .select({
        id: eventsDb.id,
        title: eventsDb.title,
        posterUrl: eventsDb.posterUrl,
        venue: eventsDb.venue,
        city: eventsDb.city,
        startTime: eventsDb.startTime,
        endTime: eventsDb.endTime,
      })
      .from(eventsDb)
      .where(whereClause)
      .limit(Number(limit))
      .offset(offset);

    const rows = await db
      .select({ count: count(eventsDb.id) })
      .from(eventsDb)
      .where(whereClause);

    const total = rows[0]?.count || 0;
    const totalPages = Math.ceil(total / Number(limit));

    return NextResponse.json({
      data: {
        events,
        total,
        totalPages,
        limit,
        currentPage: Number(page),
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Something went wrong",
      },
      { status: 500 },
    );
  }
}
