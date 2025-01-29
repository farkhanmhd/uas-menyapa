import { getEventById } from "@/app/lib/events";
import { IEvent } from "@/types";
import { EventDetail } from "./EventDetail";

const EventDetailWrapper = async ({ id }: { id: string }) => {
  const { event }: { event: IEvent } = await getEventById(id);
  return <EventDetail {...event} />;
};

export default EventDetailWrapper;
