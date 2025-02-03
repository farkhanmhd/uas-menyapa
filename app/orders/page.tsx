import { redirect } from "next/navigation";
import OrderTabs from "./OrderTabs";
import { auth } from "@/auth";
import { TabsContent } from "@radix-ui/react-tabs";
import { OrderStatus } from "../api/events/searchParams";
import { MapItems } from "@/lib/utils";
import { Orders } from "./Orders";

export default async function OrdersPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-4 text-2xl font-bold">Your Orders</h1>
      <OrderTabs>
        <MapItems
          of={["active", "pending", "completed", "cancelled"]}
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
