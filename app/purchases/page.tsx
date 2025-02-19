import { Suspense } from "react";
import { AttendeesTable } from "./attendees-table";
import { TableSkeleton } from "@/table-skeleton";
import { checkRole, checkSession } from "../lib";
import { redirect } from "next/navigation";

export default async function AttendeesPage() {
  await checkSession();
  const role = (await checkRole()) || "customer";

  if (role === "customer") redirect("/");

  return (
    <div className="container mx-auto mt-6">
      <h1 className="px-6 text-2xl font-bold sm:px-0">Purchases</h1>
      <Suspense fallback={<TableSkeleton />}>
        <AttendeesTable />
      </Suspense>
    </div>
  );
}
