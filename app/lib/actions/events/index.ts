"use server";

import { z } from "zod";
import { actionClient } from "../../safe-action";
import db from "@/db";
import { desc, eq } from "drizzle-orm";
import {
  events,
  eventQuestions,
  eventPrice,
  eventAvailability,
  EventInsert,
  EventPriceInsert,
  EventAvailabilityInsert,
  Event,
  EventPrice,
  EventAvailability,
} from "@/db/schema/public";
import { auth } from "@/auth";

// Import Node.js modules for file handling
import fs from "fs/promises";
import path from "path";
import { revalidatePath, revalidateTag } from "next/cache";
import { format } from "date-fns";

const questionSchema = z.object({
  question: z.string().min(1, "Question is required"),
  answer: z.string().min(1, "Answer is required"),
});

const fileSchema = z.custom<File>(
  (file) => file instanceof File && file.type.startsWith("image/"),
  "Please upload a valid image file",
);

// Define a schema that accepts either a File or a string
const fileOrStringSchema = z.union([fileSchema, z.string()]);

const createEventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  venue: z.string().min(1, "Venue is required"),
  city: z.string().min(1, "City is required"),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  gmapUrl: z.string().url("Invalid Google Maps URL").optional(),
  whatsappGroupUrl: z.string().url("Invalid WhatsApp group URL").optional(),
  posterImage: fileSchema,
  ticketDesignImage: fileSchema,
  certificateImage: fileSchema,
  regularPrice: z.number().int().min(1, "Regular price must be at least 1"),
  vipPrice: z.number().int().min(1, "VIP price must be at least 1"),
  regularAvailability: z
    .number()
    .int()
    .min(1, "Regular ticket availability must be at least 1"),
  vipAvailability: z
    .number()
    .int()
    .min(1, "VIP ticket availability must be at least 1"),
  questions: z.array(questionSchema).min(1).max(5),
});

const saveFile = async (file: File, prefix: string) => {
  const publicDir = path.join(process.cwd(), "public", "images");
  await fs.mkdir(publicDir, { recursive: true });
  const fileName = `${prefix}-${Date.now()}-${file.name}`;
  const filePath = path.join(publicDir, fileName);
  // Convert File to Buffer
  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(filePath, buffer);
  return `/images/${fileName}`;
};

async function createEvent(data: z.infer<typeof createEventSchema>) {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }
  // Define the public images folder (Next.js public/images)

  // Helper: Save a file and return its relative URL.

  try {
    const transaction = await db.transaction(async (tx) => {
      // Upload files and get URLs
      const posterUrl = await saveFile(data.posterImage, "poster");
      const ticketUrl = await saveFile(data.ticketDesignImage, "ticket");
      const certificateUrl = await saveFile(
        data.certificateImage,
        "certificate",
      );

      const eventInsert: EventInsert = {
        title: data.title,
        description: data.description,
        venue: data.venue,
        city: data.city,
        startTime: format(data.startTime, "yyyy-MM-dd HH:mm:ss"),
        endTime: format(data.endTime, "yyyy-MM-dd HH:mm:ss"),
        gmapUrl: data.gmapUrl as string,
        whatsappGroupUrl: data.whatsappGroupUrl,
        posterUrl: posterUrl, // store file URL
        ticketDesignUrl: ticketUrl,
        certificateDesignUrl: certificateUrl as string, // store file URL
      };

      // Insert event data into events table.
      await tx.insert(events).values(eventInsert);
      console.log("successfully created event");

      // Since MySQL does not support .returning(), query the last inserted event.
      // (Assuming no concurrent inserts; otherwise, use a unique field)
      const insertedEvents = await tx
        .select()
        .from(events)
        .orderBy(desc(events.createdAt))
        .limit(1);
      const insertedEvent = insertedEvents[0];
      const eventId = insertedEvent.id;

      // Insert each question into eventQuestions table
      for (const q of data.questions) {
        await tx.insert(eventQuestions).values({
          eventId,
          question: q.question,
          answer: q.answer,
        });
      }
      console.log("successfully created event question");

      const eventPriceInsert: EventPriceInsert = {
        eventId,
        reguler: data.regularPrice,
        vip: data.regularPrice,
      };

      // Insert pricing information into eventPrice table
      await tx.insert(eventPrice).values(eventPriceInsert);

      console.log("successfully created event price");

      const eventAvailabilityInsert: EventAvailabilityInsert = {
        eventId,
        vipAvailability: data.vipAvailability,
        regulerAvailability: data.regularAvailability,
      };

      await tx.insert(eventAvailability).values(eventAvailabilityInsert);

      console.log("successfully created event availability");

      return { data: insertedEvent };
    });
    return { data: transaction.data };
  } catch (error) {
    return error;
  }
}

export const createEventAction = actionClient
  .schema(createEventSchema)
  .action(async ({ parsedInput }) => {
    try {
      await createEvent(parsedInput);

      revalidatePath("/events");
      revalidateTag("event-detail");
      revalidateTag("event-recommendations");
      revalidateTag("events-home");
      return {
        status: "success",
        message: `Event data created successfully`,
      };
    } catch (error) {
      return {
        status: "error",
        error: "Failed to process event data",
      };
    }
  });

// ------------------------- Updated editEventAction below -------------------------

const editEventSchema = z.object({
  id: z.string().min(1, "Event id required"),
  title: z.string().optional(),
  description: z.string().optional(),
  venue: z.string().optional(),
  city: z.string().optional(),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  gmapUrl: z.string().url().optional(),
  whatsappGroupUrl: z.string().url().optional(),
  // Accept a File or a string URL
  posterImage: fileOrStringSchema.optional(),
  ticketDesignImage: fileOrStringSchema.optional(),
  certificateImage: fileOrStringSchema.optional(),
  regularPrice: z.number().int().optional(),
  vipPrice: z.number().int().optional(),
  regularAvailability: z.number().int().optional(),
  vipAvailability: z.number().int().optional(),
  questions: z
    .array(
      z.object({
        question: z.string().min(1, "Question is required"),
        answer: z.string().min(1, "Answer is required"),
      }),
    )
    .optional(),
});

async function editEvent(data: z.infer<typeof editEventSchema>) {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const updateData: Partial<Event> = {};
  if (data.title) updateData.title = data.title;
  if (data.description) updateData.description = data.description;
  if (data.venue) updateData.venue = data.venue;
  if (data.city) updateData.city = data.city;
  if (data.startTime)
    updateData.startTime = format(
      new Date(data.startTime),
      "yyyy-MM-dd HH:mm:ss",
    );
  if (data.endTime)
    updateData.endTime = format(new Date(data.endTime), "yyyy-MM-dd HH:mm:ss");
  if (data.gmapUrl) updateData.gmapUrl = data.gmapUrl;
  if (data.whatsappGroupUrl)
    updateData.whatsappGroupUrl = data.whatsappGroupUrl;

  // Process image fields: if a File, upload it; otherwise use given string URL
  if (data.posterImage) {
    if (data.posterImage instanceof File) {
      updateData.posterUrl = await saveFile(data.posterImage, "poster");
    } else if (typeof data.posterImage === "string") {
      updateData.posterUrl = data.posterImage;
    }
  }
  if (data.ticketDesignImage) {
    if (data.ticketDesignImage instanceof File) {
      updateData.ticketDesignUrl = await saveFile(
        data.ticketDesignImage,
        "ticket",
      );
    } else if (typeof data.ticketDesignImage === "string") {
      updateData.ticketDesignUrl = data.ticketDesignImage;
    }
  }
  if (data.certificateImage) {
    if (data.certificateImage instanceof File) {
      updateData.certificateDesignUrl = await saveFile(
        data.certificateImage,
        "certificate",
      );
    } else if (typeof data.certificateImage === "string") {
      updateData.certificateDesignUrl = data.certificateImage;
    }
  }

  await db.update(events).set(updateData).where(eq(events.id, data.id));

  if (data.regularPrice || data.vipPrice) {
    const updatePrice: Partial<EventPrice> = {};
    if (data.regularPrice) updatePrice.reguler = data.regularPrice;
    if (data.vipPrice) updatePrice.vip = data.vipPrice;
    await db
      .update(eventPrice)
      .set(updatePrice)
      .where(eq(eventPrice.eventId, data.id));
  }

  if (data.regularAvailability || data.vipAvailability) {
    const updateAvail: Partial<EventAvailability> = {};
    if (data.regularAvailability)
      updateAvail.regulerAvailability = data.regularAvailability;
    if (data.vipAvailability)
      updateAvail.vipAvailability = data.vipAvailability;
    await db
      .update(eventAvailability)
      .set(updateAvail)
      .where(eq(eventAvailability.eventId, data.id));
  }

  if (data.questions) {
    await db.delete(eventQuestions).where(eq(eventQuestions.eventId, data.id));
    for (const q of data.questions) {
      await db.insert(eventQuestions).values({
        eventId: data.id,
        question: q.question,
        answer: q.answer,
      });
    }
  }

  revalidatePath("/events");
  revalidateTag("event-detail");

  return { status: "success", message: "Event updated successfully" };
}

export const editEventAction = actionClient
  .schema(editEventSchema)
  .action(async ({ parsedInput }) => {
    try {
      await editEvent(parsedInput);
      return { status: "success", message: "Event updated successfully" };
    } catch (error) {
      return { status: "error", error: "Failed to update event" };
    }
  });
