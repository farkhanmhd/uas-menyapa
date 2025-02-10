"use client";

import { Calendar } from "@/components/ui/calendar-rac";
import { DateInput } from "@/components/ui/datefield-rac";
import { CalendarIcon } from "lucide-react";
import {
  Button,
  DatePicker as DatePickerRac,
  DateValue,
  Dialog,
  Group,
  Label,
  Popover,
} from "react-aria-components";

type Props = {
  label?: string;
  id?: string;
  date: DateValue;
  onChange: (date: DateValue) => void;
};

export default function DatePicker(props: Props) {
  return (
    <DatePickerRac className="space-y-2">
      <Label className="text-sm font-medium text-foreground" htmlFor={props.id}>
        {props.label}
      </Label>
      <div className="flex">
        <Group className="w-full" id={props.id}>
          <DateInput className="pe-9" />
        </Group>
        <Button className="z-10 -me-px -ms-9 flex w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground">
          <CalendarIcon size={16} strokeWidth={2} />
        </Button>
      </div>
      <Popover
        className="z-50 rounded-lg border border-border bg-background text-popover-foreground shadow-lg shadow-black/5 outline-none data-[entering]:animate-in data-[exiting]:animate-out data-[entering]:fade-in-0 data-[exiting]:fade-out-0 data-[entering]:zoom-in-95 data-[exiting]:zoom-out-95 data-[placement=bottom]:slide-in-from-top-2 data-[placement=left]:slide-in-from-right-2 data-[placement=right]:slide-in-from-left-2 data-[placement=top]:slide-in-from-bottom-2"
        offset={4}
      >
        <Dialog className="max-h-[inherit] overflow-auto p-2">
          <Calendar value={props.date} onChange={props.onChange} />
        </Dialog>
      </Popover>
    </DatePickerRac>
  );
}
