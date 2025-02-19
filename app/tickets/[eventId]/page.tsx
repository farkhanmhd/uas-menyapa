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
    <div className="container mx-auto mt-6 px-4">
      <Suspense fallback={<TicketCardSkeleton />}>
        <AsyncTickets eventId={eventId} />
      </Suspense>
    </div>
  );
}
