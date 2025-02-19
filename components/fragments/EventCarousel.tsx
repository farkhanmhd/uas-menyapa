import { EventCard } from "@/components/fragments/EventCard";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn, MapItems } from "@/lib/utils";
import { Link } from "next-view-transitions";
import { getEvents } from "@/app/lib/events";
import type { IEventCard } from "@/types";

export default async function EventCarousel() {
  const { events }: { events: IEventCard[]; total: number; limit: number } =
    await getEvents({
      search: "",
    });

  return (
    <div className="mb-12 px-4 2xl:px-0">
      <h2 className="mb-6 text-3xl font-bold">Events</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <MapItems
          of={events}
          render={(event, index) => <EventCard key={index} event={event} />}
        />
        <div className="col-span-1 flex items-center justify-center sm:col-span-2 lg:col-span-3 xl:col-span-4">
          <Link href="/events" className={cn(buttonVariants())}>
            View More
          </Link>
        </div>
      </div>
    </div>
  );
}

export function EventSkeleton() {
  return (
    <div className="mb-12 px-4 2xl:px-0">
      <Skeleton className="mb-6 h-10 w-64" />
      <Card>
        <CardContent className="p-0">
          <Skeleton className="h-[400px] w-full" />
        </CardContent>
        <CardFooter className="flex flex-col items-start p-4">
          <Skeleton className="mb-2 h-6 w-3/4" />
          <Skeleton className="mb-1 h-4 w-1/2" />
          <Skeleton className="mb-4 h-4 w-2/3" />
          <Skeleton className="h-10 w-32" />
        </CardFooter>
      </Card>
    </div>
  );
}
