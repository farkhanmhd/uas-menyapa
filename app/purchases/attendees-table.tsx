import { DataTable } from "@/components/fragments/data-table";
import { columns } from "./columns";
import { getPurchases } from "../lib/purchases";

export async function AttendeesTable() {
  const attendees = await getPurchases();

  return <DataTable columns={columns} data={attendees} />;
}
