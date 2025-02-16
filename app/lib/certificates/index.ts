import db from "@/db";
import { eq } from "drizzle-orm";
import { tickets, certificates, events } from "@/db/schema/public";
import { CertificateData } from "@/types";

export const getCertificateData = async (
  certificateId: string,
): Promise<CertificateData> => {
  const data = await db
    .select({
      id: certificates.id,
      name: tickets.participantName,
      eventTitle: events.title,
      certificateImage: events.certificateDesignUrl,
      createdAt: certificates.createdAt,
    })
    .from(certificates)
    .innerJoin(tickets, eq(tickets.id, certificates.ticketId))
    .leftJoin(events, eq(events.id, tickets.eventId))
    .where(eq(certificates.id, certificateId))
    .limit(1)
    .execute();

  const certificate = data[0];
  return certificate as CertificateData;
};
