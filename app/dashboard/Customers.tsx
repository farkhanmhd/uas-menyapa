import React from "react";
import { OverviewCard } from "./OverviewCard";
import { Users } from "lucide-react";
import db from "@/db";
import { users } from "@/db/schema/authentication";
import { count, eq } from "drizzle-orm";

const CustomersCountCompnent = async () => {
  const data = await db
    .select({ count: count() })
    .from(users)
    .where(eq(users.role, "customer"))
    .limit(1);
  const row = data[0];
  const { count: total } = row;

  return (
    <OverviewCard title="Total Customers" icon={Users}>
      <h2 className="text-3xl font-bold">{total}</h2>
    </OverviewCard>
  );
};
const CustomersCount = async () => {
  return <CustomersCountCompnent />;
};

export default CustomersCount;
