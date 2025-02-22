import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { getTicketSales } from "./data";

const SalesTable = async () => {
  const sales = await getTicketSales();
  return <DataTable data={sales} columns={columns} />;
};

export default SalesTable;
