import React from "react";
import { OverviewCard } from "./OverviewCard";
import { Calendar } from "lucide-react";
import db from "@/db";
import { events } from "@/db/schema/public";
import { count } from "drizzle-orm";

const EventCountComponent = async () => {
  const data = await db.select({ count: count() }).from(events).limit(1);
  const row = data[0];
  const { count: total } = row;

  return (
    <OverviewCard title="Total Events" icon={Calendar}>
      <h2 className="text-3xl font-bold">{total}</h2>
    </OverviewCard>
  );
};
const EventCount = async () => {
  return <EventCountComponent />;
};

export default EventCount;
