import OrderCard from "@/components/fragments/OrderCard";
import { getOrdersByStatus } from "../lib/orders";
import { OrderStatus } from "../lib/searchParams";
import { MapItems } from "@/lib/utils";
import { Inbox } from "lucide-react";

export default async function OrderList({ status }: { status: OrderStatus }) {
  const orders = await getOrdersByStatus(status);

  return (
    <div>
      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center space-y-2">
          <Inbox className="h-12 w-12 text-gray-400" />
          <p className="text-center text-gray-500">
            There are no {status} orders
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          <MapItems
            of={orders}
            render={(order, index) => <OrderCard key={index} {...order} />}
          />
        </div>
      )}
    </div>
  );
}
