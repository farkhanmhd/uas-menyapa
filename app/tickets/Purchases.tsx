import { Suspense } from "react";
import { PurchasedEventSkeleton } from "@/components/fragments/PurchasedEventSkeleton";
import PurchasedEventsList from "./PurchasedEventsList";
import { PurchasedStatus } from "../lib/searchParams";

export const Purchases = async ({ status }: { status: PurchasedStatus }) => {
  return (
    <Suspense fallback={<PurchasedEventSkeleton />}>
      <PurchasedEventsList status={status} />
    </Suspense>
  );
};
