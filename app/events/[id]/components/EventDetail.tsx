"use client";

import React from "react";
import Image from "next/image";
import { EventTime } from "@/components/fragments/EventTime";
import type { IEvent } from "@/types";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarIcon, MapPinIcon, ShareIcon, MapIcon } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import CheckoutSection from "./checkout-section";
import EventFAQ from "./event-faq";

export function EventDetail({ ...props }: IEvent) {
  return (
    <div className="relative grid gap-8 pt-8 lg:grid-cols-12">
      <div className="top-[112px] col-auto md:col-span-5 lg:sticky lg:col-span-3 lg:self-start">
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <Image
              src={props.posterUrl || "/placeholder.svg"}
              alt={props.title}
              width={400}
              height={600}
              className="h-full max-h-[600px] w-full rounded-t-lg object-contain"
            />
          </CardContent>
        </Card>
      </div>
      <div className="space-y-8 md:col-span-5 xl:col-span-6">
        <Card>
          <CardContent className="flex flex-col gap-y-4 p-6">
            <h1 className="text-lg font-bold sm:text-3xl">{props.title}</h1>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5 text-muted-foreground" />
                <EventTime
                  startTime={props.startTime}
                  endTime={props.endTime}
                />
              </div>
              <div className="flex items-center gap-2">
                <MapPinIcon className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm md:text-base">
                  {props.venue}, {props.city}
                </span>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button
                variant="outline"
                onClick={() => {
                  navigator.share({
                    title: props.title,
                    text: "Check out this event!",
                    url: window.location.href,
                  });
                }}
              >
                <ShareIcon className="mr-2 h-4 w-4" />
                Share
              </Button>
              <Link href={props.gmapUrl} target="_blank">
                <Button variant="outline">
                  <MapIcon className="mr-2 h-4 w-4" />
                  View Map
                </Button>
              </Link>
            </div>
            <p className="text-sm text-muted-foreground md:text-base">
              {props.description}
            </p>
            {props.vipAvailability + props.regulerAvailability <= 10 && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Ketersediaan Tiket</h2>
                <p className={buttonVariants({ variant: "destructive" })}>
                  Hanya tersisa{" "}
                  {props.vipAvailability + props.regulerAvailability} tiket!
                </p>
              </div>
            )}
          </CardContent>
        </Card>
        <EventFAQ questions={props.questions} answers={props.answers} />
      </div>
      <div className="fixed bottom-0 left-0 right-0 z-50 md:col-span-4 lg:sticky lg:top-[112px] lg:z-0 lg:self-start xl:col-span-3">
        <CheckoutSection
          vipAvailability={props.vipAvailability}
          vipPrice={props.vipPrice}
          regulerAvailability={props.regulerAvailability}
          regulerPrice={props.regulerPrice}
        />
      </div>
    </div>
  );
}
