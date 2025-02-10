import { MapPin, Calendar, Clock } from "lucide-react";

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
          {new Date(startTime).toLocaleDateString()}
        </p>
        <p className="flex items-center text-muted-foreground">
          <Clock className="mr-2 h-4 w-4" />
          {new Date(startTime).toLocaleTimeString()} -{" "}
          {new Date(endTime).toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
}
