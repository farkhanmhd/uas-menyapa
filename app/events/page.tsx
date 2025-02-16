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
import { Link } from "next-view-transitions";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { checkAdminOrSuperAdmin } from "../lib";

type PageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function EventsPage({ searchParams }: PageProps) {
  const { start, end, search, page, limit } =
    await loadEventSearchParams(searchParams);

  const isAdminOrSuperAdmin = await checkAdminOrSuperAdmin();

  return (
    <div className="container mx-auto mt-2 flex h-full flex-1 flex-col px-4 lg:mt-0">
      <h1 className="mb-4 mt-3 block text-2xl font-bold lg:hidden">Events</h1>
      <div className="flex flex-1 flex-col">
        <div className="mb-8 flex w-full flex-col items-center gap-4 lg:my-8 lg:flex-row">
          <div className="w-full flex-1">
            <EventSearch />
          </div>
          {isAdminOrSuperAdmin && (
            <Link
              href="/scan"
              className={cn("w-full lg:max-w-max", buttonVariants())}
            >
              Scan Tickets
            </Link>
          )}
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
