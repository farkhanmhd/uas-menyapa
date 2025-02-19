"use client";

import React from "react";

import { Link, useTransitionRouter } from "next-view-transitions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { IEventCard } from "@/types";
import { CalendarIcon, MapPinIcon } from "lucide-react";
import { EventTime } from "./EventTime";

export function CardCarousel({ ...event }: IEventCard) {
  const { push } = useTransitionRouter();
  return (
    <Card
      key={event.id}
      className="flex h-full max-h-[520px] w-[200px] cursor-pointer flex-col justify-between overflow-hidden duration-200 hover:bg-muted sm:max-h-full sm:w-full"
      onClick={() => push(`/events/${event.id}`)}
    >
      <CardContent className="p-0">
        <div className="relative aspect-[10/12] h-full w-full">
          <img
            src={event.posterUrl || "/placeholder.svg"}
            alt={event.title}
            className="h-full w-full object-cover"
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start p-4">
        <h3 className="mb-2 line-clamp-2 text-xl font-semibold">
          {event.title}
        </h3>
        <div className="mb-4 space-y-2">
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-muted-foreground" />
            <EventTime
              startTime={event.startTime}
              endTime={event.endTime}
              className="md:text-sm"
            />
          </div>
          <div className="flex items-center gap-2">
            <MapPinIcon className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm">
              {event.venue}, {event.city}
            </span>
          </div>
        </div>
        <Link href={`/events/${event.id}`}>
          <Button>View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
