import React from "react";
import { OverviewCard } from "./OverviewCard";
import { Ticket } from "lucide-react";
import db from "@/db";
import { tickets } from "@/db/schema/public";
import { count } from "drizzle-orm";

const TicketSoldComponent = async () => {
  const data = await db.select({ count: count() }).from(tickets).limit(1);
  const row = data[0];
  const { count: total } = row;

  return (
    <OverviewCard title="Tickets Sold" icon={Ticket}>
      <h2 className="text-3xl font-bold">{total}</h2>
    </OverviewCard>
  );
};
const TicketSold = async () => {
  return <TicketSoldComponent />;
};

export default TicketSold;
