import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import db from "@/db";
import { events as eventDb } from "@/db/schema/public";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const events = await db
      .select()
      .from(eventDb)
      .where(eq(eventDb.id, id))
      .limit(1);

    if (events.length === 0) {
      throw new Error("Event not found");
    }

    const event = events[0];

    return NextResponse.json({
      data: {
        event,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Event not found") {
        return NextResponse.json(
          {
            message: error.message,
          },
          {
            status: 404,
          },
        );
      }

      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 500,
        },
      );
    }

    return NextResponse.json(
      {
        message: "something went wrong",
      },
      {
        status: 500,
      },
    );
  }
}
