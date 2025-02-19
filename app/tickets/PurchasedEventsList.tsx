import React from "react";
import { PurchasedEventCard } from "@/components/fragments/PurchasedEventCard";
import { MapItems } from "@/lib/utils";
import { PurchasedStatus } from "../lib/searchParams";
import { getTicketsByEvents } from "../lib/tickets";
import { Empty } from "@/components/ui/empty";

const PurchasedEventsList = async ({ status }: { status: PurchasedStatus }) => {
  const purchasedEvents = await getTicketsByEvents(status);

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
      {purchasedEvents.length === 0 ? (
        <div className="xl:col-span-2">
          <Empty
            title="No Purchased Events"
            description="You have not purchased any events yet."
          />
        </div>
      ) : (
        <MapItems
          of={purchasedEvents}
          render={(event, index) => (
            <PurchasedEventCard key={index} {...event} />
          )}
        />
      )}
    </div>
  );
};

export default PurchasedEventsList;
