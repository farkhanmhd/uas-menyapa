import React from "react";
import { checkRole, checkSession } from "../lib";
import PurchasedTabs from "./PurchasedTabs";
import { MapItems } from "@/lib/utils";
import { TabsContent } from "@/components/ui/tabs";
import { PurchasedStatus } from "../lib/searchParams";
import { Purchases } from "./Purchases";
import { redirect } from "next/navigation";

const Page = async () => {
  await checkSession();
  const role = (await checkRole()) || "customer";

  if (role !== "customer") redirect("/");
  return (
    <div className="container mx-auto px-4 md:py-4">
      <h1 className="mb-6 text-xl font-bold md:text-2xl">
        Pilih Tiket Berdasarkan Event
      </h1>
      <PurchasedTabs>
        <MapItems
          of={["active", "expired"]}
          render={(status, index) => (
            <TabsContent key={index} value={status as PurchasedStatus}>
              <Purchases status={status as PurchasedStatus} />
            </TabsContent>
          )}
        />
      </PurchasedTabs>
    </div>
  );
};

export default Page;
