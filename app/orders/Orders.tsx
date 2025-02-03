import { Suspense } from "react";
import OrderCardSkeleton from "@/components/fragments/OrderCardSkeleton";
import OrderList from "./OrderList";
import { OrderStatus } from "../api/events/searchParams";

export const Orders = async ({ status }: { status: OrderStatus }) => {
  return (
    <Suspense fallback={<OrderCardSkeleton />}>
      <OrderList status={status} />
    </Suspense>
  );
};
