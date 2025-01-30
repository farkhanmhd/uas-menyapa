"use client";

import React from "react";
import Image from "next/image";
import { EventTime } from "@/components/fragments/EventTime";
import type { IEvent } from "@/types";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import {
  CalendarIcon,
  MapPinIcon,
  ShareIcon,
  MapIcon,
  Ticket,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import CheckoutSection from "./checkout-section";
import EventFAQ from "./event-faq";

export function EventDetail({ ...props }: IEvent) {
  return (
    <div className="relative grid gap-8 pt-8 lg:grid-cols-12">
      <div className="top-[112px] lg:sticky lg:col-span-3 lg:self-start">
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
      <div className="space-y-8 lg:col-span-6">
        <Card>
          <CardContent className="p-6">
            <h1 className="mb-4 text-lg font-bold sm:text-3xl">
              {props.title}
            </h1>
            <div className="mb-4 space-y-2">
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
            <div className="mb-4 flex flex-wrap gap-4">
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
            <p className="mb-6 text-sm text-muted-foreground md:text-base">
              {props.description}
            </p>
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Ketersediaan Tiket</h2>
              <TicketStock
                type="VIP"
                stock={props.vipAvailability}
                purchased={props.orderedVip}
                price={props.vipPrice}
              />
              <TicketStock
                type="Regular"
                stock={props.regulerAvailability}
                purchased={props.orderedReguler}
                price={props.regulerPrice}
              />
            </div>
          </CardContent>
        </Card>
        <EventFAQ questions={props.questions} answers={props.answers} />
      </div>
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:sticky lg:top-[112px] lg:z-0 lg:col-span-3 lg:self-start">
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

function TicketStock({
  type,
  stock,
  purchased,
  price,
}: {
  type: string;
  stock: number;
  purchased: number;
  price: number;
}) {
  const purchasedPercentage = Math.round((purchased / stock) * 100);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="flex items-center text-sm font-medium">
          <Ticket className="mr-2 h-4 w-4" />
          {type}
        </span>
        <span className="text-sm font-medium">
          Rp {price.toLocaleString("id-ID")}
        </span>
      </div>
      <div className="relative pt-1">
        <Progress value={purchasedPercentage} />
      </div>
      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold text-primary">
          {stock - purchased}{" "}
          <span className="text-sm font-normal text-muted-foreground">
            tiket tersedia
          </span>
        </p>
        <p className="text-sm text-muted-foreground">
          {purchased} tiket telah dipesan dari total {stock} tiket
        </p>
      </div>
    </div>
  );
}
