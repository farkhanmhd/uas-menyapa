import { relations } from "drizzle-orm/relations";
import { user, account, events, eventAvailability, eventPrice, eventQuestions, orders, paymentDetails, session } from "./schema";

export const accountRelations = relations(account, ({one}) => ({
	user: one(user, {
		fields: [account.userId],
		references: [user.id]
	}),
}));

export const userRelations = relations(user, ({many}) => ({
	accounts: many(account),
	orders: many(orders),
	sessions: many(session),
}));

export const eventAvailabilityRelations = relations(eventAvailability, ({one}) => ({
	event: one(events, {
		fields: [eventAvailability.eventId],
		references: [events.id]
	}),
}));

export const eventsRelations = relations(events, ({many}) => ({
	eventAvailabilities: many(eventAvailability),
	eventPrices: many(eventPrice),
	eventQuestions: many(eventQuestions),
	orders: many(orders),
}));

export const eventPriceRelations = relations(eventPrice, ({one}) => ({
	event: one(events, {
		fields: [eventPrice.eventId],
		references: [events.id]
	}),
}));

export const eventQuestionsRelations = relations(eventQuestions, ({one}) => ({
	event: one(events, {
		fields: [eventQuestions.eventId],
		references: [events.id]
	}),
}));

export const ordersRelations = relations(orders, ({one, many}) => ({
	event: one(events, {
		fields: [orders.eventId],
		references: [events.id]
	}),
	user: one(user, {
		fields: [orders.userId],
		references: [user.id]
	}),
	paymentDetails: many(paymentDetails),
}));

export const paymentDetailsRelations = relations(paymentDetails, ({one}) => ({
	order: one(orders, {
		fields: [paymentDetails.orderId],
		references: [orders.id]
	}),
}));

export const sessionRelations = relations(session, ({one}) => ({
	user: one(user, {
		fields: [session.userId],
		references: [user.id]
	}),
}));