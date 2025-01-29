import { DateFormatter } from "@internationalized/date";
import { cn } from "@/lib/utils";

interface EventTimeProps {
  startTime: Date;
  endTime: Date;
  className?: string;
}

export function EventTime(props: EventTimeProps) {
  const formatter = new DateFormatter("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const startDate = new Date(props.startTime);
  const endDate = new Date(props.endTime);

  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    return <span className="text-sm md:text-base">Invalid date</span>;
  }

  const formattedStart = formatter.format(startDate);

  // Extract only the time using toLocaleTimeString
  const startTime = startDate.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const endTime = endDate.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  // Extract the date without the time part
  const formattedDate = formattedStart.split(" pukul")[0]; // Ensure we only take date part

  return (
    <span className={cn("text-sm md:text-base", props.className)}>
      {formattedDate}, {startTime} - {endTime}
    </span>
  );
}
