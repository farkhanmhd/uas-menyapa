import { Suspense } from "react";
import OrderCardSkeleton from "@/components/fragments/OrderCardSkeleton";
import OrderList from "./OrderList";
import { OrderStatus } from "../lib/searchParams";

export const Orders = async ({ status }: { status: OrderStatus }) => {
  return (
    <Suspense fallback={<OrderCardSkeleton />}>
      <OrderList status={status} />
    </Suspense>
  );
};
