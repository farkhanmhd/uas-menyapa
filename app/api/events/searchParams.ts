import { parseAsInteger, parseAsString, createLoader } from "nuqs/server";

import { formatDate } from "date-fns";

const currentYear = new Date().getFullYear();

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
