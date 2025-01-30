import { timestamp, mysqlTable, varchar, int } from "drizzle-orm/mysql-core";
import { randomUUID } from "crypto";
import { relations } from "drizzle-orm";
// import { users } from "./authentication";

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
  gmapUrl: varchar("gmap_url", { length: 255 }).notNull(),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

export type Event = typeof events.$inferSelect;
export type EventInsert = typeof events.$inferInsert;

export const eventAvailability = mysqlTable("event_availability", {
  id: varchar("id", { length: 50 })
    .primaryKey()
    .$defaultFn(() => `ea-${randomUUID()}`),
  eventId: varchar("event_id", { length: 50 })
    .notNull()
    .references(() => events.id),
  regulerAvailability: int("reguler_availability").notNull(),
  vipAvailability: int("vip_availability").notNull(),
  orderedVip: int("ordered_vip").notNull().default(0),
  orderedReguler: int("ordered_reguler").notNull().default(0),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

export const eventPrice = mysqlTable("event_price", {
  id: varchar("id", { length: 50 })
    .primaryKey()
    .$defaultFn(() => `ep-${randomUUID()}`),
  eventId: varchar("event_id", { length: 50 })
    .notNull()
    .references(() => events.id),
  reguler: int("reguler").notNull(),
  vip: int("vip").notNull(),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

export type EventAvailability = typeof eventAvailability.$inferSelect;
export type EventAvailabilityInsert = typeof eventAvailability.$inferInsert;

export type EventPrice = typeof eventPrice.$inferSelect;
export type EventPriceInsert = typeof eventPrice.$inferInsert;

export const eventQuestions = mysqlTable("event_questions", {
  id: varchar("id", { length: 50 })
    .primaryKey()
    .$defaultFn(() => `eq-${randomUUID()}`),
  eventId: varchar("event_id", { length: 50 })
    .notNull()
    .references(() => events.id),
  question: varchar("question", { length: 255 }).notNull(),
  answer: varchar("answer", { length: 255 }).notNull(),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

export type EventQuestion = typeof eventQuestions.$inferSelect;
export type EventQuestionInsert = typeof eventQuestions.$inferInsert;

export const eventAvailabilityRelations = relations(
  eventAvailability,
  ({ one }) => ({
    event: one(events, {
      fields: [eventAvailability.eventId],
      references: [events.id],
    }),
  }),
);

export const eventPriceRelations = relations(eventPrice, ({ one }) => ({
  event: one(events, {
    fields: [eventPrice.eventId],
    references: [events.id],
  }),
}));

export const eventQuestionsRelations = relations(eventQuestions, ({ one }) => ({
  event: one(events, {
    fields: [eventQuestions.eventId],
    references: [events.id],
  }),
}));

export const eventRelations = relations(events, ({ one, many }) => ({
  eventAvailability: one(eventAvailability, {
    fields: [events.id],
    references: [eventAvailability.eventId],
  }),
  eventPrice: one(eventPrice, {
    fields: [events.id],
    references: [eventPrice.eventId],
  }),
  eventQuestions: many(eventQuestions),
}));

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
