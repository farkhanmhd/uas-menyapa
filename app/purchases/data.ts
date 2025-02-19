import { faker } from "@faker-js/faker";

export type Attendee = {
  eventTitle: string;
  ticketCode: string;
  orderId: string;
  ticketType: "vip" | "reguler";
  name: string;
  whatsapp: string;
  presence: "waiting" | "present" | "absent";
};

export function generateAttendees(count: number): Attendee[] {
  return Array.from({ length: count }, () => ({
    eventTitle: faker.company.name() + " Event",
    ticketCode: faker.string.alphanumeric(8).toUpperCase(),
    orderId: faker.string.alphanumeric(6).toUpperCase(),
    ticketType: faker.helpers.arrayElement(["vip", "reguler"]),
    name: faker.person.fullName(),
    whatsapp: faker.phone.number("+1##########"),
    presence: faker.helpers.arrayElement(["waiting", "present", "absent"]),
  }));
}

export const attendees: Attendee[] = generateAttendees(500);
