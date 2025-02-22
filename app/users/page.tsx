import { Suspense } from "react";
import { UsersTable } from "./users-table";
import { TableSkeleton } from "@/table-skeleton";
import { checkRole, checkSession } from "../lib";
import { redirect } from "next/navigation";

export default async function UsersPage() {
  await checkSession();
  const role = (await checkRole()) || "customer";

  if (role !== "superadmin") {
    redirect("/");
  }

  return (
    <div className="container mx-auto mt-6">
      <h1 className="px-6 text-2xl font-bold sm:px-0">Users</h1>
      <Suspense fallback={<TableSkeleton />}>
        <UsersTable />
      </Suspense>
    </div>
  );
}
