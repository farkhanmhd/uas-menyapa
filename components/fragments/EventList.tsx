import { MapItems } from "@/lib/utils";
import { EventCard } from "./EventCard";
import { getEvents } from "@/app/lib/events";
import type { IEventCard } from "@/types";

type EventListProps = {
  searchParams: {
    search?: string;
    start?: string;
    end?: string;
    page?: number;
    limit?: number;
  };
};

export default async function EventList({ searchParams }: EventListProps) {
  const {
    events,
    total,
    limit,
    totalPages,
  }: {
    events: IEventCard[];
    total: number;
    limit: number;
    totalPages: number;
  } = await getEvents(searchParams);

  return (
    <div className="space-y-8 pb-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <MapItems
          of={events}
          render={(event, index) => <EventCard key={index} {...event} />}
        />
      </div>
      {/* <PageNavigation total={total} limit={limit} /> */}
    </div>
  );
}
