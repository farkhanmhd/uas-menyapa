"use client";

import { ChangeEvent } from "react";
import { useQueryStates } from "nuqs";
import { eventSearchParams } from "@/app/api/events/searchParams";
import { Input } from "@/components/ui/input";
import { parseDate } from "@internationalized/date";
import { DatePickerRange } from "./DatePickerRange";
import { CalendarDate } from "@internationalized/date";
import { formatDate } from "@/lib/utils";

export default function EventSearch() {
  const [{ search, start, end }, setSearchParams] = useQueryStates(
    eventSearchParams,
    {
      throttleMs: 300,
      shallow: false,
    },
  );

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchParams({
      search: e.target.value,
      page: 1,
    });
  };

  const handleDateChange = (
    value: { start: CalendarDate; end: CalendarDate } | null,
  ) => {
    if (value) {
      setSearchParams({
        start: formatDate(value.start),
        end: formatDate(value.end),
      });
    }
  };

  return (
    <form className="mb-8 space-y-4 pt-8">
      <div className="grid grid-cols-1 flex-wrap gap-4 md:grid-cols-3">
        <div className="min-w-[200px] flex-1 space-y-2 md:col-span-2">
          <Input
            id="search"
            placeholder="Cari Event..."
            value={search}
            onChange={handleSearchChange}
            autoComplete="off"
          />
        </div>
        <div className="min-w-[200px] flex-1 space-y-2">
          <DatePickerRange
            value={{ start: parseDate(start), end: parseDate(end) }}
            setValue={handleDateChange}
          />
        </div>
      </div>
    </form>
  );
}
