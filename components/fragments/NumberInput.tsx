"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Minus, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type NumberInputProps = {
  value: number;
  setValue: (value: number) => void;
  minValue: number;
  maxValue: number;
};

export default function NumberInput({
  value,
  setValue,
  minValue,
  maxValue,
}: NumberInputProps) {
  const [inputValue, setInputValue] = useState(value.toString());

  useEffect(() => {
    setInputValue(value.toString());
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (newValue === "" || /^-?\d*\.?\d*$/.test(newValue)) {
      setInputValue(newValue);
    }
  };

  const handleBlur = () => {
    let newValue = Number.parseFloat(inputValue);
    if (isNaN(newValue)) {
      newValue = minValue;
    } else if (newValue < minValue) {
      newValue = minValue;
    } else if (newValue > maxValue) {
      newValue = maxValue;
    }
    setValue(newValue);
    setInputValue(newValue.toString());
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleBlur();
    }
  };

  const handleDecrement = () => {
    setValue(Math.max(minValue, value - 1));
  };

  const handleIncrement = () => {
    setValue(Math.min(maxValue, value + 1));
  };

  return (
    <div className="flex h-9 w-full items-center overflow-hidden rounded-md border border-input shadow-sm">
      <Button
        variant="ghost"
        onClick={handleDecrement}
        disabled={value <= minValue}
        className="rounded-none px-3"
      >
        <Minus size={16} />
      </Button>
      <Input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className="h-full w-full border-none px-2 text-center focus-visible:ring-0"
      />
      <Button
        variant="ghost"
        onClick={handleIncrement}
        disabled={value >= maxValue}
        className="rounded-none px-3"
      >
        <Plus size={16} />
      </Button>
    </div>
  );
}
