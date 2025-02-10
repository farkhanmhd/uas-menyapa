import { Suspense } from "react";
import {
  EventList,
  EventListPagination,
} from "@/components/fragments/EventList";
import EventSearch from "@/components/fragments/EventSearch";
import type { SearchParams } from "nuqs/server";
import { loadEventSearchParams } from "../api/events/searchParams";
import EventListSkeleton from "@/components/fragments/EventListSkeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { checkSession } from "../lib";

type PageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function EventsPage({ searchParams }: PageProps) {
  await checkSession();
  const { start, end, search, page, limit } =
    await loadEventSearchParams(searchParams);

  return (
    <div className="container mx-auto flex h-full flex-1 flex-col px-4">
      <div className="flex flex-1 flex-col">
        <EventSearch />
        <Suspense fallback={<EventListSkeleton />}>
          <EventList searchParams={{ search, start, end, page, limit }} />
        </Suspense>
        <Suspense fallback={<Skeleton className="mt-8 h-12 max-w-sm" />}>
          <EventListPagination
            searchParams={{ search, start, end, page, limit }}
          />
        </Suspense>
      </div>
    </div>
  );
}
