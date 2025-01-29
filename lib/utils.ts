import { Children, ReactNode } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface MapItemsProps<T> {
  of: T[]; // Array of items to map
  render: (item: T, index: number) => ReactNode; // Render function
}

export const MapItems = <T>({ of, render }: MapItemsProps<T>): ReactNode[] => {
  return Children.toArray(of.map((item, index) => render(item, index)));
};

export const formatDate = (dateObj: {
  year: number;
  month: number;
  day: number;
}) => {
  const { year, month, day } = dateObj;
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
};

export const formatToIDR = (number: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};
