import { Suspense } from "react";
import EventDetailWrapper from "./components/EventDetailWrapper";
import RecommendedEventsWrapper from "./components/RecommendedEventsWrapper";
import { EventSkeleton } from "@/components/fragments/EventSkeleton";
import EventListSkeleton from "@/components/fragments/EventListSkeleton";
import { checkSession } from "@/app/lib";

export default async function EventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await checkSession();
  const id = (await params).id;

  return (
    <div className="container mx-auto px-4 lg:px-0">
      <Suspense fallback={<EventSkeleton />}>
        <EventDetailWrapper id={id} />
      </Suspense>
      <div className="my-8">
        <Suspense fallback={<EventListSkeleton />}>
          <RecommendedEventsWrapper id={id} />
        </Suspense>
      </div>
    </div>
  );
}
