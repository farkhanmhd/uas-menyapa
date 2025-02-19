import { getEventById } from "@/app/lib/events";
import { IEvent } from "@/types";
import { EventDetail } from "./EventDetail";
import { checkVerification } from "@/app/lib";

const EventDetailWrapper = async ({
  id,
  role,
}: {
  id: string;
  role: "customer" | "admin" | "superadmin";
}) => {
  const isVerified = await checkVerification();

  const { event }: { event: IEvent } = await getEventById(id);
  return <EventDetail props={event} verified={isVerified} role={role} />;
};

export default EventDetailWrapper;
