import {
  parseAsInteger,
  parseAsString,
  createLoader,
  parseAsStringLiteral,
} from "nuqs/server";

import { formatDate } from "date-fns";

const currentYear = new Date().getFullYear();

export type EventSearchParams = {
  limit?: number;
  page?: number;
  search?: string;
  start?: string;
  end?: string;
};

export const eventSearchParams = {
  limit: parseAsInteger.withDefault(12),
  page: parseAsInteger.withDefault(1),
  search: parseAsString.withDefault(""),
  start: parseAsString.withDefault(formatDate(new Date(), "yyyy-MM-dd")),
  end: parseAsString.withDefault(
    formatDate(`${currentYear}-12-31`, "yyyy-MM-dd"),
  ),
};

export const loadEventSearchParams = createLoader(eventSearchParams);

const orderStatusValues = [
  "pending",
  "active",
  "cancelled",
  "expired",
] as const;
export type OrderStatus = (typeof orderStatusValues)[number];

export const ordersSearchParams = {
  status: parseAsStringLiteral(orderStatusValues).withDefault("pending"),
};

export const loadOrdersSearchParams = createLoader(ordersSearchParams);
