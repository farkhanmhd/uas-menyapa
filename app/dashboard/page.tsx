import React, { Suspense } from "react";
import AsyncSales from "./AsyncSales";
import { SalesChartSkeleton } from "./sales-chart-skeleton";
import SalesTable from "./SalesTable";
import { TableSkeleton } from "@/table-skeleton";

const DashboardPage = () => {
  return (
    <div className="space-y-12">
      <Suspense fallback={<SalesChartSkeleton />}>
        <AsyncSales />
      </Suspense>
      <div>
        <Suspense fallback={<TableSkeleton />}>
          <h3 className="text-3xl font-semibold">Sales Table</h3>
          <SalesTable />
        </Suspense>
      </div>
    </div>
  );
};

export default DashboardPage;
