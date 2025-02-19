import { NextRequest, NextResponse } from "next/server";
import { eq, sql } from "drizzle-orm";
import db from "@/db";
import {
  events as eventDb,
  eventAvailability,
  eventPrice,
  eventQuestions,
} from "@/db/schema/public";
import { auth } from "@/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const id = params.id;
    // Fetch event data with availability, price and questions
    const events = await db
      .select({
        id: eventDb.id,
        title: eventDb.title,
        posterUrl: eventDb.posterUrl,
        ticketUrl: eventDb.ticketDesignUrl,
        certificateUrl: eventDb.certificateDesignUrl,
        description: eventDb.description,
        venue: eventDb.venue,
        city: eventDb.city,
        gmapUrl: eventDb.gmapUrl,
        startTime: eventDb.startTime,
        whatsapp: eventDb.whatsappGroupUrl,
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
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    const event = events[0];

    // Prepare the response data
    const eventData = {
      title: event.title,
      description: event.description,
      venue: event.venue,
      city: event.city,
      startTime: event.startTime,
      endTime: event.endTime,
      gmapUrl: event.gmapUrl,
      whatsappGroupUrl: event.whatsapp,
      posterImage: event.posterUrl,
      ticketDesignImage: event.ticketUrl,
      certificateImage: event.certificateUrl,
      regularPrice: event.regulerPrice,
      vipPrice: event.vipPrice,
      regularAvailability: event.regulerAvailability,
      vipAvailability: event.vipAvailability,
    };

    console.log(event);

    // Parse questions and answers arrays into an array of Question objects
    let questions: { question: string; answer: string }[] = [];
    try {
      let qs: string[] = [];
      let ans: string[] = [];

      if (typeof event.questions === "string") {
        qs = JSON.parse(event.questions as string);
      } else if (Array.isArray(event.questions)) {
        qs = event.questions;
      }

      if (typeof event.answers === "string") {
        ans = JSON.parse(event.answers as string);
      } else if (Array.isArray(event.answers)) {
        ans = event.answers;
      }

      questions = qs.map((q, idx) => ({
        question: q,
        answer: ans[idx] || "",
      }));
    } catch (e) {
      questions = [];
    }

    return NextResponse.json({ data: eventData, questions });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Something went wrong",
      },
      { status: 500 },
    );
  }
}
