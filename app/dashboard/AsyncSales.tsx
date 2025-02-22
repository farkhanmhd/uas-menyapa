import React from "react";
import { Sales } from "./Sales";
import db from "@/db";
import { sql } from "drizzle-orm";
import { tickets } from "@/db/schema/public";
import { ChartData } from "./Sales";

const getTicketSales = async (): Promise<ChartData[]> => {
  const ticketStats = await db
    .select({
      date: sql<string>`DATE(${tickets.createdAt})`.as("date"),
      reguler: sql<number>`
      COUNT(CASE WHEN ${tickets.ticketType} = 'reguler' THEN 1 END)
    `.as("reguler"),
      vip: sql<number>`
      COUNT(CASE WHEN ${tickets.ticketType} = 'vip' THEN 1 END)
    `.as("vip"),
    })
    .from(tickets)
    .where(
      sql`DATE(${tickets.createdAt}) BETWEEN CURDATE() - INTERVAL 29 DAY AND CURDATE()`,
    )
    .groupBy(sql`DATE(${tickets.createdAt})`)
    .orderBy(sql`DATE(${tickets.createdAt})`);

  return ticketStats;
};

const AsyncSales = async () => {
  const chartData = await getTicketSales();
  return <Sales chartData={chartData} />;
};

export default AsyncSales;
