"use server";

import { z } from "zod";
import { actionClient } from "../../safe-action";
import db from "@/db";
import { eq } from "drizzle-orm";
import { tickets } from "@/db/schema/public";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { updateTicketPresence } from "./../../tickets/index";

const participantSchema = z.object({
  id: z.string(),
  eventId: z.string(),
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  whatsapp: z
    .string()
    .min(8, { message: "WhatsApp number must be at least 8 digits" }),
});

export const updateParticipantAction = actionClient
  .schema(participantSchema)
  .action(async ({ parsedInput: bodyData }) => {
    try {
      const session = await auth();

      if (!session?.user) {
        return {
          status: "error",
          message: "Unauthorized",
        };
      }

      const { id, name, eventId, whatsapp } = bodyData;
      await db
        .update(tickets)
        .set({
          participantName: name,
          whatsappNumber: whatsapp,
        })
        .where(eq(tickets.id, id));

      revalidatePath(`/tickets/${eventId}`);

      return {
        status: "success",
        message: "Participant updated successfully",
      };
    } catch (error) {
      return {
        status: "error",
        message: "Failed to update participant",
      };
    }
  });

const presenceSchema = z.object({
  id: z.string(),
});

export const updatePresenceAction = actionClient
  .schema(presenceSchema)
  .action(async ({ parsedInput }) => {
    try {
      const { status, message, data } = await updateTicketPresence(
        parsedInput.id,
      );
      return { status, message, data };
    } catch (error) {
      return {
        status: "error",
        message:
          error instanceof Error ? error.message : "Something went wrong",
      };
    }
  });
