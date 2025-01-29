"use client";

import { CardCarousel } from "@/components/fragments/CardCarousel";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { IEventCard } from "@/types";

type Props = {
  events: IEventCard[];
};

export default function RecommendedEvents({ events }: Props) {
  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold">Recommended Events</h2>
      <Carousel
        className="w-full px-8 sm:max-w-full sm:px-16"
        opts={{ loop: true }}
      >
        <CarouselContent className="-ml-1 max-w-[230px] sm:-ml-4 sm:max-w-full">
          {events.map((event) => (
            <CarouselItem
              key={event.id}
              className="basis-[240px] sm:basis-1/2 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
            >
              <CardCarousel {...event} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-0" />
        <CarouselNext className="right-0" />
      </Carousel>
    </div>
  );
}
