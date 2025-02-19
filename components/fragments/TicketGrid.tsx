"use client";

import { TicketCard } from "./Ticketcard";
import { Ticket } from "@/types";
import { MapItems } from "@/lib/utils";

interface TicketGridProps {
  tickets: Ticket[];
}

export function TicketGrid({ tickets }: TicketGridProps) {
  return (
    <>
      <h1 className="mb-6 text-2xl font-bold">
        {tickets[0].eventTitle} Tickets
      </h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <MapItems
          of={tickets}
          render={(ticket, index) => <TicketCard key={index} {...ticket} />}
        />
      </div>
    </>
  );
}
