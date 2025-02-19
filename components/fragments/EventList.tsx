import { MapItems } from "@/lib/utils";
import { EventCard } from "./EventCard";
import { getEvents } from "@/app/lib/events";
import type { EventList } from "@/types";
import { PageNavigation } from "./Pagination";
import { NoEvents } from "./NoEvents";
import { EventSearchParams } from "@/app/lib/searchParams";

type EventListProps = {
  searchParams: EventSearchParams;
};

export async function EventList({ searchParams }: EventListProps) {
  const { events }: EventList = await getEvents(searchParams);

  return (
    <div className="flex flex-1 flex-col space-y-8 pb-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {events.length > 0 ? (
          <MapItems
            of={events}
            render={(event, index) => <EventCard key={index} event={event} />}
          />
        ) : (
          <NoEvents />
        )}
      </div>
    </div>
  );
}

export const EventListPagination = async ({ searchParams }: EventListProps) => {
  const { totalPages }: { totalPages: number } = await getEvents(searchParams);

  return <>{totalPages > 1 && <PageNavigation totalPages={totalPages} />}</>;
};
