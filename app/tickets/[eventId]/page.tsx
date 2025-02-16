import { Suspense } from "react";
import { checkSession } from "@/app/lib";
import AsyncTickets from "./AsyncTickets";
import { TicketCardSkeleton } from "./TicketSkeleton";

export default async function TicketsPage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  await checkSession();
  const { eventId } = await params;
  return (
    <div className="container mx-auto px-4 md:py-4">
      <h1 className="mb-6 text-2xl font-bold">Your Tickets</h1>
      <Suspense fallback={<TicketCardSkeleton />}>
        <AsyncTickets eventId={eventId} />
      </Suspense>
    </div>
  );
}
