import { mysqlTable, mysqlSchema, AnyMySqlColumn, foreignKey, primaryKey, varchar, int, index, timestamp, mysqlEnum, decimal, json, unique } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"

export const account = mysqlTable("account", {
	userId: varchar({ length: 255 }).notNull().references(() => user.id, { onDelete: "cascade" } ),
	type: varchar({ length: 255 }).notNull(),
	provider: varchar({ length: 255 }).notNull(),
	providerAccountId: varchar({ length: 255 }).notNull(),
	refreshToken: varchar("refresh_token", { length: 255 }),
	accessToken: varchar("access_token", { length: 255 }),
	expiresAt: int("expires_at"),
	tokenType: varchar("token_type", { length: 255 }),
	scope: varchar({ length: 255 }),
	idToken: varchar("id_token", { length: 2048 }),
	sessionState: varchar("session_state", { length: 255 }),
},
(table) => [
	primaryKey({ columns: [table.provider, table.providerAccountId], name: "account_provider_providerAccountId"}),
]);

export const eventAvailability = mysqlTable("event_availability", {
	id: varchar({ length: 50 }).notNull(),
	eventId: varchar("event_id", { length: 50 }).notNull().references(() => events.id, { onDelete: "cascade" } ),
	regulerAvailability: int("reguler_availability").notNull(),
	vipAvailability: int("vip_availability").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`(now())`).notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`(now())`).notNull(),
},
(table) => [
	index("idx_event").on(table.eventId),
	primaryKey({ columns: [table.id], name: "event_availability_id"}),
]);

export const eventPrice = mysqlTable("event_price", {
	id: varchar({ length: 50 }).notNull(),
	eventId: varchar("event_id", { length: 50 }).notNull().references(() => events.id, { onDelete: "cascade" } ),
	reguler: int().notNull(),
	vip: int().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`(now())`).notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`(now())`).notNull(),
},
(table) => [
	primaryKey({ columns: [table.id], name: "event_price_id"}),
]);

export const eventQuestions = mysqlTable("event_questions", {
	id: varchar({ length: 50 }).notNull(),
	eventId: varchar("event_id", { length: 50 }).notNull().references(() => events.id, { onDelete: "cascade" } ),
	question: varchar({ length: 255 }).notNull(),
	answer: varchar({ length: 255 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`(now())`).notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`(now())`).notNull(),
},
(table) => [
	primaryKey({ columns: [table.id], name: "event_questions_id"}),
]);

export const events = mysqlTable("events", {
	id: varchar({ length: 50 }).notNull(),
	title: varchar({ length: 255 }).notNull(),
	posterUrl: varchar("poster_url", { length: 255 }).notNull(),
	description: varchar({ length: 255 }).notNull(),
	venue: varchar({ length: 255 }).notNull(),
	city: varchar({ length: 255 }).notNull(),
	startTime: timestamp("start_time", { mode: 'string' }).notNull(),
	endTime: timestamp("end_time", { mode: 'string' }).notNull(),
	gmapUrl: varchar("gmap_url", { length: 255 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`(now())`).notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`(now())`).notNull(),
},
(table) => [
	primaryKey({ columns: [table.id], name: "events_id"}),
]);

export const orders = mysqlTable("orders", {
	id: varchar({ length: 50 }).notNull(),
	userId: varchar("user_id", { length: 50 }).notNull().references(() => user.id, { onDelete: "cascade" } ),
	eventId: varchar("event_id", { length: 50 }).notNull().references(() => events.id, { onDelete: "cascade" } ),
	ticketType: mysqlEnum("ticket_type", ['reguler','vip']).notNull(),
	paymentMethod: varchar("payment_method", { length: 20 }).notNull(),
	orderQty: int("order_qty").default(1).notNull(),
	subTotal: int("sub_total").notNull(),
	orderStatus: mysqlEnum("order_status", ['Pending','Active','Expired','Cancelled']).default('Pending'),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`(now())`).notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`(now())`).notNull(),
},
(table) => [
	index("idx_event_ticket").on(table.eventId, table.ticketType),
	index("idx_user").on(table.userId),
	primaryKey({ columns: [table.id], name: "orders_id"}),
]);

export const paymentDetails = mysqlTable("payment_details", {
	id: varchar({ length: 50 }).notNull(),
	orderId: varchar("order_id", { length: 50 }).notNull().references(() => orders.id, { onDelete: "cascade" } ),
	transactionId: varchar("transaction_id", { length: 50 }).notNull(),
	grossAmount: decimal("gross_amount", { precision: 10, scale: 2 }).notNull(),
	currency: varchar({ length: 10 }).default('IDR').notNull(),
	paymentType: mysqlEnum("payment_type", ['qris','gopay','bank_transfer','echannel']).notNull(),
	transactionTime: timestamp("transaction_time", { mode: 'string' }).notNull(),
	transactionStatus: varchar("transaction_status", { length: 20 }).notNull(),
	fraudStatus: varchar("fraud_status", { length: 20 }).notNull(),
	expiryTime: timestamp("expiry_time", { mode: 'string' }).notNull(),
	qrString: varchar("qr_string", { length: 500 }),
	acquirer: varchar({ length: 50 }),
	vaNumbers: json("va_numbers"),
	billKey: varchar("bill_key", { length: 50 }),
	billerCode: varchar("biller_code", { length: 50 }),
	permataVaNumber: varchar("permata_va_number", { length: 50 }),
	actions: json(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`(now())`).notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`(now())`).notNull(),
},
(table) => [
	index("idx_order").on(table.orderId),
	index("idx_transaction").on(table.transactionId),
	primaryKey({ columns: [table.id], name: "payment_details_id"}),
]);

export const session = mysqlTable("session", {
	sessionToken: varchar({ length: 255 }).notNull(),
	userId: varchar({ length: 255 }).notNull().references(() => user.id, { onDelete: "cascade" } ),
	expires: timestamp({ mode: 'string' }).notNull(),
},
(table) => [
	primaryKey({ columns: [table.sessionToken], name: "session_sessionToken"}),
]);

export const user = mysqlTable("user", {
	id: varchar({ length: 50 }).notNull(),
	name: varchar({ length: 255 }),
	email: varchar({ length: 255 }),
	age: int(),
	gender: varchar({ length: 6 }),
	address: varchar({ length: 255 }),
	marriageStatus: varchar("marriage_status", { length: 9 }),
	whatsapp: varchar({ length: 20 }),
	emailVerified: timestamp({ fsp: 3, mode: 'string' }),
	image: varchar({ length: 255 }),
	role: varchar({ length: 255 }).default('customer').notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`(now())`).notNull(),
},
(table) => [
	primaryKey({ columns: [table.id], name: "user_id"}),
	unique("user_email_unique").on(table.email),
]);
