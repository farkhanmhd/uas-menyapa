import { NextRequest, NextResponse } from "next/server";
import { eq, sql } from "drizzle-orm";
import db from "@/db";
import {
  events as eventDb,
  eventAvailability,
  eventPrice,
  eventQuestions,
} from "@/db/schema/public";

type Params = Promise<{ id: string }>;

export async function GET(
  request: NextRequest,
  segmentData: { params: Params },
) {
  try {
    const params = await segmentData.params;
    const { id } = params;
    const events = await db
      .select({
        id: eventDb.id,
        title: eventDb.title,
        posterUrl: eventDb.posterUrl,
        description: eventDb.description,
        venue: eventDb.venue,
        city: eventDb.city,
        gmapUrl: eventDb.gmapUrl,
        startTime: eventDb.startTime,
        endTime: eventDb.endTime,
        vipAvailability: eventAvailability.vipAvailability,
        regulerAvailability: eventAvailability.regulerAvailability,
        vipPrice: eventPrice.vip,
        regulerPrice: eventPrice.reguler,
        questions: sql`JSON_ARRAYAGG(${eventQuestions.question})`,
        answers: sql`JSON_ARRAYAGG(${eventQuestions.answer})`,
      })
      .from(eventDb)
      .where(eq(eventDb.id, id))
      .innerJoin(eventAvailability, eq(eventDb.id, eventAvailability.eventId))
      .innerJoin(eventPrice, eq(eventDb.id, eventPrice.eventId))
      .leftJoin(eventQuestions, eq(eventDb.id, eventQuestions.eventId))
      .groupBy(
        eventDb.id,
        eventAvailability.vipAvailability,
        eventAvailability.regulerAvailability,
        eventPrice.vip,
        eventPrice.reguler,
      );

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
