import { CalendarX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "next-view-transitions";

export function NoEvents() {
  return (
    <div className="flex h-full w-full flex-1 flex-col items-center justify-center space-y-4 py-12 text-center sm:col-span-2 lg:col-span-3 xl:col-span-4">
      <CalendarX className="h-24 w-24 text-muted-foreground" />
      <h2 className="text-2xl font-semibold tracking-tight">No events found</h2>
      <p className="max-w-md text-muted-foreground">
        We couldn&apos;t find any events matching your search criteria. Try
        adjusting your filters or check back later for new events.
      </p>
      <Link href="/events">
        <Button>View All Events</Button>
      </Link>
    </div>
  );
}
