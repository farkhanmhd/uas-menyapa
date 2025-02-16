import { getEventById } from "@/app/lib/events";
import { IEvent } from "@/types";
import { EventDetail } from "./EventDetail";
import { checkVerification } from "@/app/lib";

const EventDetailWrapper = async ({ id }: { id: string }) => {
  const isVerified = await checkVerification();

  const { event }: { event: IEvent } = await getEventById(id);
  return <EventDetail props={event} verified={isVerified} />;
};

export default EventDetailWrapper;
