import {
  timestamp,
  mysqlTable,
  varchar,
  int,
  mysqlEnum,
  index,
  decimal,
  json,
} from "drizzle-orm/mysql-core";
import { randomUUID } from "crypto";
import { relations } from "drizzle-orm";
import { users } from "./authentication";

/** 🎟 Events Table */
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

/** 🎫 Event Availability */
export const eventAvailability = mysqlTable(
  "event_availability",
  {
    id: varchar("id", { length: 50 })
      .primaryKey()
      .$defaultFn(() => `ea-${randomUUID()}`),
    eventId: varchar("event_id", { length: 50 })
      .notNull()
      .references(() => events.id, { onDelete: "cascade" }),
    regulerAvailability: int("reguler_availability").notNull(),
    vipAvailability: int("vip_availability").notNull(),
    createdAt: timestamp("created_at", { mode: "string" })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    idx_event: index("idx_event").on(table.eventId),
  }),
);

/** 💰 Event Pricing */
export const eventPrice = mysqlTable("event_price", {
  id: varchar("id", { length: 50 })
    .primaryKey()
    .$defaultFn(() => `ep-${randomUUID()}`),
  eventId: varchar("event_id", { length: 50 })
    .notNull()
    .references(() => events.id, { onDelete: "cascade" }),
  reguler: int("reguler").notNull(),
  vip: int("vip").notNull(),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

/** ❓ Event Questions */
export const eventQuestions = mysqlTable("event_questions", {
  id: varchar("id", { length: 50 })
    .primaryKey()
    .$defaultFn(() => `eq-${randomUUID()}`),
  eventId: varchar("event_id", { length: 50 })
    .notNull()
    .references(() => events.id, { onDelete: "cascade" }),
  question: varchar("question", { length: 255 }).notNull(),
  answer: varchar("answer", { length: 255 }).notNull(),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

/** 🛒 Orders Table */
export const orders = mysqlTable(
  "orders",
  {
    id: varchar("id", { length: 50 })
      .primaryKey()
      .$defaultFn(() => `order-${randomUUID()}`),
    userId: varchar("user_id", { length: 50 })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    eventId: varchar("event_id", { length: 50 })
      .notNull()
      .references(() => events.id, { onDelete: "cascade" }),
    ticketType: mysqlEnum("ticket_type", ["reguler", "vip"]).notNull(),
    paymentMethod: varchar("payment_method", { length: 20 }).notNull(),
    orderQty: int("order_qty").notNull().default(1),
    subTotal: int("sub_total").notNull(),
    orderStatus: mysqlEnum("order_status", [
      "Pending",
      "Active",
      "Expired",
      "Cancelled",
    ]).default("Pending"),
    createdAt: timestamp("created_at", { mode: "string" })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    idx_event_ticket: index("idx_event_ticket").on(
      table.eventId,
      table.ticketType,
    ),
    idx_user: index("idx_user").on(table.userId),
  }),
);

/** 💳 Payment Details Table */
export const paymentDetails = mysqlTable(
  "payment_details",
  {
    id: varchar("id", { length: 50 })
      .primaryKey()
      .$defaultFn(() => `pd-${randomUUID()}`),
    orderId: varchar("order_id", { length: 50 })
      .notNull()
      .references(() => orders.id, { onDelete: "cascade" }),
    transactionId: varchar("transaction_id", { length: 50 }).notNull(),
    grossAmount: decimal("gross_amount", { precision: 10, scale: 2 }).notNull(),
    currency: varchar("currency", { length: 10 }).notNull().default("IDR"),
    paymentType: mysqlEnum("payment_type", [
      "qris",
      "gopay",
      "bank_transfer",
      "echannel",
    ]).notNull(),
    transactionTime: timestamp("transaction_time", {
      mode: "string",
    }).notNull(),
    transactionStatus: varchar("transaction_status", { length: 20 }).notNull(),
    fraudStatus: varchar("fraud_status", { length: 20 }).notNull(),
    expiryTime: timestamp("expiry_time", { mode: "string" }).notNull(),

    // QRIS specific fields
    qrString: varchar("qr_string", { length: 500 }),
    acquirer: varchar("acquirer", { length: 50 }),

    // Bank Transfer specific fields
    vaNumbers:
      json("va_numbers").$type<{ bank: string; va_number: string }[]>(),

    // Mandiri specific fields
    billKey: varchar("bill_key", { length: 50 }),
    billerCode: varchar("biller_code", { length: 50 }),

    // Permata specific fields
    permataVaNumber: varchar("permata_va_number", { length: 50 }),

    // Store all action URLs and methods
    actions:
      json("actions").$type<{ name: string; method: string; url: string }[]>(),

    createdAt: timestamp("created_at", { mode: "string" })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    idx_order: index("idx_order").on(table.orderId),
    idx_transaction: index("idx_transaction").on(table.transactionId),
  }),
);

/** 🔗 Relations */
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
  event: one(events, { fields: [eventPrice.eventId], references: [events.id] }),
}));

export const eventQuestionsRelations = relations(eventQuestions, ({ one }) => ({
  event: one(events, {
    fields: [eventQuestions.eventId],
    references: [events.id],
  }),
}));

export const orderRelations = relations(orders, ({ one, many }) => ({
  user: one(users, { fields: [orders.userId], references: [users.id] }),
  event: one(events, { fields: [orders.eventId], references: [events.id] }),
  paymentDetails: many(paymentDetails),
}));

export const paymentDetailsRelations = relations(paymentDetails, ({ one }) => ({
  order: one(orders, {
    fields: [paymentDetails.orderId],
    references: [orders.id],
  }),
}));

export const userRelations = relations(users, ({ many }) => ({
  orders: many(orders),
}));

export type Order = typeof orders.$inferSelect;
export type Event = typeof events.$inferSelect;
export type EventAvailability = typeof eventAvailability.$inferSelect;
export type EventPrice = typeof eventPrice.$inferSelect;
export type EventQuestion = typeof eventQuestions.$inferSelect;
export type PaymentDetail = typeof paymentDetails.$inferSelect;

export type OrderInsert = typeof orders.$inferInsert;
export type EventInsert = typeof events.$inferInsert;
export type EventAvailabilityInsert = typeof eventAvailability.$inferInsert;
export type EventPriceInsert = typeof eventPrice.$inferInsert;
export type EventQuestionInsert = typeof eventQuestions.$inferInsert;
export type PaymentDetailInsert = typeof paymentDetails.$inferInsert;
