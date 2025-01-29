import { timestamp, mysqlTable, json, varchar } from "drizzle-orm/mysql-core";
import { randomUUID } from "crypto";
// import { relations } from "drizzle-orm";
// import { users } from "./authentication";

type TicketVariant = { reguler: number; vip: number };

export const events = mysqlTable("events", {
  id: varchar("id", { length: 50 })
    .primaryKey()
    .$defaultFn(() => `event-${randomUUID()}`),
  title: varchar("title", { length: 255 }).notNull(),
  posterUrl: varchar("poster_url", { length: 255 }).notNull(),
  description: varchar("description", { length: 255 }).notNull(),
  venue: varchar("venue", { length: 255 }).notNull(),
  city: varchar("city", { length: 255 }).notNull(),
  startTime: timestamp("start_time", { mode: "string" }).notNull(),
  endTime: timestamp("end_time", { mode: "string" }).notNull(),
  ticketStock: json("ticket_stock").$type<TicketVariant>().notNull(),
  purchasedTickets: json("purchased_tickets")
    .$type<TicketVariant>()
    .notNull()
    .default({
      reguler: 0,
      vip: 0,
    }),
  price: json("price").$type<TicketVariant>().notNull(),
  gmapUrl: varchar("gmap_url", { length: 255 }).notNull(),
  faqs: json("faqs").$type<{ question: string; answer: string }[]>().notNull(),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

export type Event = typeof events.$inferSelect;
export type EventInsert = typeof events.$inferInsert;

// Tickets Table
// export const tickets = mysqlTable("tickets", {
//   id: varchar("id", { length: 50 })
//     .primaryKey()
//     .$defaultFn(() => randomUUID()),
//   eventId: varchar("event_id", { length: 50 })
//     .notNull()
//     .references(() => events.id),
//   ticketType: varchar("ticket_type", { length: 10 })
//     .$type<"reguler" | "vip">()
//     .notNull(),
//   participantName: varchar("participant_name", { length: 255 }),
//   participantWhatsapp: varchar("participant_whatsapp", { length: 20 }),
//   ticketStatus: varchar("ticket_status", { length: 10 })
//     .$type<"active" | "used" | "expired">()
//     .notNull(),
//   createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
//   updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
// });

// // Orders Table
// export const orders = mysqlTable("orders", {
//   id: varchar("id", { length: 50 })
//     .primaryKey()
//     .$defaultFn(() => randomUUID()),
//   userId: varchar("user_id", { length: 50 })
//     .notNull()
//     .references(() => users.id),
//   orderQty: int("order_qty").notNull().default(1),
//   orderStatus: varchar("order_status", { length: 20 })
//     .$type<"Pending" | "Completed" | "Cancelled">()
//     .notNull(),
//   createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
//   updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
// });

// // Payments Table
// export const payments = mysqlTable("payments", {
//   id: varchar("id", { length: 50 })
//     .primaryKey()
//     .$defaultFn(() => randomUUID()),
//   orderId: varchar("order_id", { length: 50 })
//     .notNull()
//     .unique() // Ensure one-to-one relationship with orders
//     .references(() => orders.id),
//   paymentMethod: varchar("payment_method", { length: 50 }).notNull(),
//   paymentCategory: varchar("payment_category", { length: 50 })
//     .$type<"QR Code" | "E-Wallet" | "Bank Transfer">()
//     .notNull(),
//   paymentStatus: varchar("payment_status", { length: 20 })
//     .$type<"Pending" | "Completed" | "Failed">()
//     .notNull(),
//   paymentDate: timestamp("payment_date", { mode: "string" }), // Optional, set when paid
//   dueDate: timestamp("due_date", { mode: "string" }).notNull(), // New column for payment due date
//   amount: int("amount").notNull(),
//   createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
//   updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
// });

// // Relationships
// export const usersRelations = relations(users, ({ many }) => ({
//   orders: many(orders),
// }));

// export const eventsRelations = relations(events, ({ many }) => ({
//   tickets: many(tickets),
// }));

// export const ticketsRelations = relations(tickets, ({ one }) => ({
//   event: one(events, {
//     fields: [tickets.eventId],
//     references: [events.id],
//   }),
// }));

// export const ordersRelations = relations(orders, ({ one }) => ({
//   user: one(users, {
//     fields: [orders.userId],
//     references: [users.id],
//   }),
//   payment: one(payments, {
//     fields: [orders.id],
//     references: [payments.orderId],
//   }),
// }));

// export const paymentsRelations = relations(payments, ({ one }) => ({
//   order: one(orders, {
//     fields: [payments.orderId],
//     references: [orders.id],
//   }),
// }));
