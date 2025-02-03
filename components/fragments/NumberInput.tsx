"use client";

import { Minus, Plus } from "lucide-react";
import { Button, Group, Input, NumberField } from "react-aria-components";

type NumberInputProps = {
  value: number;
  setValue: (value: number) => void;
  minValue: number;
  maxValue: number;
};

export default function NumberInput({ ...props }: NumberInputProps) {
  return (
    <NumberField
      value={props.value}
      minValue={props.minValue}
      maxValue={props.maxValue}
      onChange={props.setValue}
      aria-label="Numeric input"
    >
      <Group className="relative inline-flex h-9 w-full items-center overflow-hidden whitespace-nowrap rounded-lg border border-input text-sm shadow-sm shadow-black/5 transition-shadow data-[focus-within]:border-ring data-[disabled]:opacity-50 data-[focus-within]:outline-none">
        <Button
          slot="decrement"
          className="-ms-px flex aspect-square h-[inherit] items-center justify-center rounded-s-lg border border-input bg-background text-sm text-muted-foreground/80 transition-shadow hover:bg-accent hover:text-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Minus size={16} strokeWidth={2} aria-hidden="true" />
        </Button>
        <Input className="w-full grow bg-background px-1 py-2 text-center text-xs tabular-nums text-foreground focus:outline-none" />
        <Button
          slot="increment"
          className="-me-px flex aspect-square h-[inherit] items-center justify-center rounded-e-lg border border-input bg-background text-sm text-muted-foreground/80 transition-shadow hover:bg-accent hover:text-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Plus size={16} strokeWidth={2} aria-hidden="true" />
        </Button>
      </Group>
    </NumberField>
  );
}
