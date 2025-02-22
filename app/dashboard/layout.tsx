import React, { Suspense } from "react";
import { checkRole } from "../lib";
import { redirect } from "next/navigation";
import Revenue from "./Revenue";
import EventCount from "./EventCount";
import CustomersCount from "./Customers";
import TicketSold from "./TicketsSold";
import { OverviewCardSkeleton } from "./OverviewCard";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = async ({ children }: LayoutProps) => {
  const role = await checkRole();

  if (role !== "superadmin") {
    redirect("/");
  }

  return (
    <section className="container mx-auto flex flex-col gap-y-6 px-4 py-8">
      <h1 className="text-4xl font-semibold">Dashboard</h1>
      <div className="lg grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        <Suspense fallback={<OverviewCardSkeleton />}>
          <EventCount />
        </Suspense>
        <Suspense fallback={<OverviewCardSkeleton />}>
          <CustomersCount />
        </Suspense>
        <Suspense fallback={<OverviewCardSkeleton />}>
          <TicketSold />
        </Suspense>
        <Suspense fallback={<OverviewCardSkeleton />}>
          <Revenue />
        </Suspense>
      </div>
      <div className="h-full flex-1">{children}</div>
    </section>
  );
};

export default Layout;
