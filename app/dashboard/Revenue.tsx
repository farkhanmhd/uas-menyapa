import React from "react";
import { OverviewCard } from "./OverviewCard";
import { Wallet } from "lucide-react";
import db from "@/db";
import { paymentDetails } from "@/db/schema/public";
import { eq, sum } from "drizzle-orm";

const RevenueComponent = async () => {
  const data = await db
    .select({ total: sum(paymentDetails.grossAmount) })
    .from(paymentDetails)
    .where(eq(paymentDetails.transactionStatus, "settlement"))
    .limit(1);
  const row = data[0];
  const { total } = row;

  const formattedTotal = Number(total).toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  });

  return (
    <OverviewCard title="Revenue" icon={Wallet}>
      <h2 className="text-2xl font-bold">{formattedTotal}</h2>
    </OverviewCard>
  );
};
const Revenue = async () => {
  return <RevenueComponent />;
};

export default Revenue;
