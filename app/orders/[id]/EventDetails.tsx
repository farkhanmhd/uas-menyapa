import { MapPin, Calendar } from "lucide-react";
import { EventTime } from "@/components/fragments/EventTime";

interface EventDetailsProps {
  title: string;
  venue: string;
  city: string;
  startTime: string;
  endTime: string;
}

export function EventDetails({
  title,
  venue,
  city,
  startTime,
  endTime,
}: EventDetailsProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="mt-4 space-y-3">
        <p className="flex items-center text-muted-foreground">
          <MapPin className="mr-2 h-4 w-4" />
          {venue}, {city}
        </p>
        <p className="flex items-center text-muted-foreground">
          <Calendar className="mr-2 h-4 w-4" />
          <EventTime
            startTime={new Date(startTime)}
            endTime={new Date(endTime)}
          />
        </p>
      </div>
    </div>
  );
}
