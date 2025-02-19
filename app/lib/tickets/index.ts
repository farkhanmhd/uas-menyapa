import { revalidatePath } from "next/cache";
import { PurchasedStatus } from "@/app/lib/searchParams";
import { PurchasedEvent, Ticket } from "@/types";
import { headers } from "next/headers";
import db from "@/db";
import { tickets, events } from "@/db/schema/public";
import { eq, and } from "drizzle-orm";
import { auth } from "@/auth";
import { format } from "date-fns";

export const getTicketsByEvents = async (
  status: PurchasedStatus,
): Promise<PurchasedEvent[]> => {
  const headerList = await headers();
  const cookie = headerList.get("cookie");
  const response = await fetch(
    `${process.env.BASE_URL}/api/tickets?status=${status}`,
    {
      method: "GET",
      headers: {
        cookie: cookie ?? "",
      },
    },
  );

  const { data } = await response.json();
  const { purchasedEvents } = data;

  return purchasedEvents;
};

export const getTicketsByEventId = async (
  eventId: string,
): Promise<Ticket[]> => {
  const headerList = await headers();
  const cookie = headerList.get("cookie");
  const response = await fetch(
    `${process.env.BASE_URL}/api/tickets/${eventId}`,
    {
      method: "GET",
      cache: "force-cache",
      headers: {
        cookie: cookie ?? "",
      },
    },
  );

  const { data } = await response.json();
  return data;
};

export const updateTicketPresence = async (ticketId: string) => {
  try {
    const session = await auth();
    if (!session?.user) {
      throw new Error("Unauthorized");
    }
    const transaction = await db.transaction(async (tx) => {
      const ticketRow = await tx
        .select({
          ticketId: tickets.id,
          eventId: tickets.eventId,
        })
        .from(tickets)
        .innerJoin(events, eq(events.id, tickets.eventId))
        .where(and(eq(tickets.id, ticketId), eq(tickets.presence, "waiting")))
        .limit(1);

      if (!ticketRow.length) {
        throw new Error("Invalid Format or Wrong ID");
      }

      await tx
        .update(tickets)
        .set({
          presence: "present",
          updatedAt: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
        })
        .where(eq(tickets.id, ticketId));

      revalidatePath(`/tickets/${ticketRow[0].eventId}`);
      revalidatePath("/purchases");
    });

    return {
      status: "success",
      message: "Ticket updated successfully. Absensi Berhasil",
      data: transaction,
    };
  } catch (error) {
    return {
      status: "error",
      message: error instanceof Error ? error.message : "Something went wrong",
    };
  }
};
