"use client";

import React from "react";
import { useQueryStates } from "nuqs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ordersSearchParams, OrderStatus } from "../api/events/searchParams";

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
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="expired">Expired</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      {children}
    </Tabs>
  );
}
