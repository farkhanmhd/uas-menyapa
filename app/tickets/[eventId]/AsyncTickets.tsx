import React from "react";
import { getTicketsByEventId } from "@/app/lib/tickets";
import { TicketGrid } from "@/components/fragments/TicketGrid";

const AsyncTickets = async ({ eventId }: { eventId: string }) => {
  const tickets = await getTicketsByEventId(eventId);
  return <TicketGrid tickets={tickets} />;
};

export default AsyncTickets;
