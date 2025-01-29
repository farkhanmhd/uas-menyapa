import EventList from "@/components/fragments/EventList";
import EventListSkeleton from "@/components/fragments/EventListSkeleton";
import EventSearch from "@/components/fragments/EventSearch";
import { Suspense } from "react";
import type { SearchParams } from "nuqs/server";
import { loadEventSearchParams } from "../api/events/searchParams";

type PageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function EventsPage({ searchParams }: PageProps) {
  const { start, end, search, page, limit } =
    await loadEventSearchParams(searchParams);

  return (
    <div className="container mx-auto px-4">
      <EventSearch />
      <Suspense fallback={<EventListSkeleton />}>
        <EventList searchParams={{ search, start, end, page, limit }} />
      </Suspense>
    </div>
  );
}
