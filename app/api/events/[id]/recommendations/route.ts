import { NextRequest, NextResponse } from "next/server";
import { ne } from "drizzle-orm";
import db from "@/db";
import { events as eventDb } from "@/db/schema/public";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const id = (await params).id;

    const events = await db
      .select({
        id: eventDb.id,
        title: eventDb.title,
        posterUrl: eventDb.posterUrl,
        venue: eventDb.venue,
        city: eventDb.city,
        startTime: eventDb.startTime,
        endTime: eventDb.endTime,
      })
      .from(eventDb)
      .where(ne(eventDb.id, id)) // Exclude the given id
      .limit(10);

    return NextResponse.json({
      data: {
        events,
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
