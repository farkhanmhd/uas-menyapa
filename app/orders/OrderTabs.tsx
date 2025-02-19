"use client";

import React from "react";
import { useQueryStates } from "nuqs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ordersSearchParams, OrderStatus } from "../lib/searchParams";
import { MapItems } from "@/lib/utils";
import { SelectOption } from "@/types";

const tabTriggers: SelectOption[] = [
  {
    label: "Pending",
    value: "pending",
  },
  {
    label: "Active",
    value: "active",
  },
  {
    label: "Cancelled",
    value: "cancelled",
  },
  {
    label: "Expired",
    value: "expired",
  },
];

export default function OrderTabs({ children }: { children: React.ReactNode }) {
  const [{ status }, setSearchParams] = useQueryStates(ordersSearchParams);

  return (
    <Tabs
      value={status}
      onValueChange={(value) =>
        setSearchParams({ status: value as OrderStatus })
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
