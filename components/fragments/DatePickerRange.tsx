"use client";

import { cn } from "@/lib/utils";
import { RangeCalendar } from "@/components/ui/calendar-rac";
import { DateInput, dateInputStyle } from "@/components/ui/datefield-rac";
import { CalendarIcon } from "lucide-react";
import { CalendarDate } from "@internationalized/date";
import {
  Button,
  DateRangePicker,
  Dialog,
  Group,
  Label,
  Popover,
} from "react-aria-components";

type Props = {
  label?: string;
  value: { start: CalendarDate; end: CalendarDate } | null | undefined;
  setValue:
    | ((value: { start: CalendarDate; end: CalendarDate } | null) => void)
    | undefined;
};

export function DatePickerRange({ ...props }: Props) {
  return (
    <DateRangePicker
      className="space-y-2"
      value={props.value}
      onChange={props.setValue}
      aria-label="Date picker range"
    >
      {props.label && (
        <Label className="text-sm font-medium text-foreground">
          {props.label}
        </Label>
      )}
      <div className="flex">
        <Group className={cn(dateInputStyle, "pe-9")}>
          <DateInput slot="start" unstyled />
          <span aria-hidden="true" className="px-2 text-muted-foreground/70">
            -
          </span>
          <DateInput slot="end" unstyled />
        </Group>
        <Button className="z-10 -me-px -ms-9 flex w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 transition-colors hover:text-foreground">
          <CalendarIcon size={16} strokeWidth={2} />
        </Button>
      </div>
      <Popover
        className="z-50 rounded-lg border border-border bg-background text-popover-foreground shadow-lg shadow-black/5 outline-none data-[entering]:animate-in data-[exiting]:animate-out data-[entering]:fade-in-0 data-[exiting]:fade-out-0 data-[entering]:zoom-in-95 data-[exiting]:zoom-out-95 data-[placement=bottom]:slide-in-from-top-2 data-[placement=left]:slide-in-from-right-2 data-[placement=right]:slide-in-from-left-2 data-[placement=top]:slide-in-from-bottom-2"
        offset={4}
      >
        <Dialog className="max-h-[inherit] overflow-auto p-2">
          <RangeCalendar />
        </Dialog>
      </Popover>
    </DateRangePicker>
  );
}
