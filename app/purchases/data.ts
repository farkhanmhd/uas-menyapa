export type Attendee = {
  eventTitle: string;
  ticketCode: string;
  orderId: string;
  ticketType: "vip" | "reguler";
  name: string;
  whatsapp: string;
  presence: "waiting" | "present" | "absent";
};
