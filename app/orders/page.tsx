import OrderTabs from "./OrderTabs";
import { TabsContent } from "@radix-ui/react-tabs";
import { OrderStatus } from "../api/events/searchParams";
import { MapItems } from "@/lib/utils";
import { Orders } from "./Orders";
import { checkSession } from "../lib";

export default async function OrdersPage() {
  await checkSession();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-4 text-2xl font-bold">Your Orders</h1>
      <OrderTabs>
        <MapItems
          of={["active", "pending", "expired", "cancelled"]}
          render={(status, index) => (
            <TabsContent key={index} value={status as OrderStatus}>
              <Orders status={status as OrderStatus} />
            </TabsContent>
          )}
        />
      </OrderTabs>
    </div>
  );
}
