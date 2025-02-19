import { Suspense } from "react";
import {
  EventList,
  EventListPagination,
} from "@/components/fragments/EventList";
import EventSearch from "@/components/fragments/EventSearch";
import type { SearchParams } from "nuqs/server";
import { loadEventSearchParams } from "../lib/searchParams";
import EventListSkeleton from "@/components/fragments/EventListSkeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "next-view-transitions";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type PageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function EventsPage({ searchParams }: PageProps) {
  const { start, end, search, page, limit } =
    await loadEventSearchParams(searchParams);

  return (
    <div className="container mx-auto mt-6 flex h-full flex-1 flex-col px-4 lg:mt-0">
      <h1 className="mb-4 block text-2xl font-bold lg:hidden">Events</h1>
      <div className="flex flex-1 flex-col">
        <div className="mb-8 flex w-full flex-col items-center gap-4 lg:my-8 lg:flex-row">
          <div className="flex w-full flex-1 flex-col gap-4 lg:flex-row lg:items-center">
            <div className="w-full flex-1">
              <EventSearch />
            </div>
            <Link className={cn(buttonVariants())} href="/events/create">
              Create Event
            </Link>
          </div>
        </div>
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
