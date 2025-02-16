"use client";

import React from "react";
import { useQueryStates } from "nuqs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  purchasedEventsSearchParams,
  PurchasedStatus,
} from "../api/events/searchParams";
import { MapItems } from "@/lib/utils";
import { SelectOption } from "@/types";

const tabTriggers: SelectOption[] = [
  {
    label: "Active",
    value: "active",
  },
  {
    label: "Expired",
    value: "expired",
  },
];

export default function PurchasedTabs({
  children,
}: {
  children: React.ReactNode;
}) {
  const [{ status }, setSearchParams] = useQueryStates(
    purchasedEventsSearchParams,
  );

  return (
    <Tabs
      value={status}
      onValueChange={(value) =>
        setSearchParams({ status: value as PurchasedStatus })
      }
    >
      <ScrollArea>
        <TabsList className="mb-3">
          <MapItems
            of={tabTriggers}
            render={(trigger, index) => (
              <TabsTrigger key={index} value={trigger.value}>
                {trigger.label}
              </TabsTrigger>
            )}
          />
        </TabsList>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      {children}
    </Tabs>
  );
}
