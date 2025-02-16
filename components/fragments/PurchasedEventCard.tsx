import Image from "next/image";
import { Link } from "next-view-transitions";
import { Card, CardContent } from "@/components/ui/card";
import { EventTime } from "./EventTime";
import { PurchasedEvent } from "@/types";

export function PurchasedEventCard({ ...event }: PurchasedEvent) {
  return (
    <Card className="overflow-hidden duration-200 hover:bg-muted">
      <Link
        href={`/tickets/${event.eventId}`}
        className="grid grid-cols-8 md:grid-cols-6"
      >
        <div className="hidden w-full md:col-span-2 md:block">
          <Image
            src={event.posterUrl || "/placeholder.svg"}
            alt={event.title}
            width={300}
            height={400}
            className="h-full object-cover"
          />
        </div>
        <CardContent className="col-span-8 flex flex-col justify-around p-4 sm:p-6 md:col-span-4 md:grid-cols-4">
          <div className="mb-4 flex flex-col sm:flex-row sm:items-start sm:justify-between">
            <h3 className="mb-2 text-lg font-semibold sm:mb-0 md:line-clamp-3">
              {event.title}
            </h3>
          </div>
          <div className="space-y-2 text-sm">
            <p className="flex justify-between">
              <span className="font-medium">Venue:</span>
              <span className="font-semibold">{event.venue}</span>
            </p>
            <p className="flex justify-between">
              <span className="font-medium">Kota:</span>
              <span className="font-semibold">{event.city}</span>
            </p>
            <p className="flex justify-between">
              <span className="font-medium">Jumlah Tiket:</span>
              <span className="font-semibold">{event.totalQty}</span>
            </p>
            <p className="flex justify-between">
              <span className="font-medium">Waktu:</span>
              <EventTime
                startTime={new Date(event.startTime)}
                endTime={new Date(event.endTime)}
                className="md:text-sm"
              />
            </p>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
