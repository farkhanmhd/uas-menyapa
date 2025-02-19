import { Suspense } from "react";
import EventDetailWrapper from "./components/EventDetailWrapper";
import RecommendedEventsWrapper from "./components/RecommendedEventsWrapper";
import { EventSkeleton } from "@/components/fragments/EventSkeleton";
import EventListSkeleton from "@/components/fragments/EventListSkeleton";
import { auth } from "@/auth";
import { checkRole } from "@/app/lib";

export default async function EventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const session = await auth();
  let role: "customer" | "admin" | "superadmin" = "customer";

  if (session?.user) {
    role = await checkRole();
  }

  return (
    <div className="container mx-auto px-4 lg:px-0">
      <Suspense fallback={<EventSkeleton />}>
        <EventDetailWrapper id={id} role={role} />
      </Suspense>
      <div className="my-8">
        <Suspense fallback={<EventListSkeleton />}>
          <RecommendedEventsWrapper id={id} />
        </Suspense>
      </div>
    </div>
  );
}
