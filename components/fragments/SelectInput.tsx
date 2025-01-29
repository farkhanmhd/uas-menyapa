"use client";

import React from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapItems } from "@/lib/utils";
import { Label } from "@/components/ui/label";

type SelectInputProps = {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  setValue: (value: string) => void;
  options: { label: string; value: string }[];
};

export function SelectInput({ ...props }: SelectInputProps) {
  return (
    <>
      <Label htmlFor={props.id}>{props.label}</Label>
      <Select value={props.value} onValueChange={props.setValue}>
        <SelectTrigger id={props.id} name={props.id}>
          <SelectValue placeholder={props.placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <MapItems
              of={props.options}
              render={(option, index) => (
                <SelectItem key={index} value={option.value}>
                  {option.label}
                </SelectItem>
              )}
            />
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
}
