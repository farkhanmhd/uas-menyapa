import OrderCard from "@/components/fragments/OrderCard";
import { getOrdersByStatus } from "../lib/orders";
import { OrderStatus } from "../api/events/searchParams";
import { MapItems } from "@/lib/utils";

export default async function OrderList({ status }: { status: OrderStatus }) {
  const orders = await getOrdersByStatus(status);

  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
      <MapItems
        of={orders}
        render={(order, index) => <OrderCard key={index} {...order} />}
      />
    </div>
  );
}
