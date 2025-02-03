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

export const calculateTotal = (subtotal: number, paymentMethod: string) => {
  let serviceFee = 0;
  let vat = 0;

  if (paymentMethod === "qris") {
    serviceFee = Math.floor(subtotal * 0.007);
  } else if (paymentMethod === "gopay") {
    serviceFee = 3000;
  } else {
    serviceFee = 4000;
    vat = serviceFee * 0.11;
  }

  const total = subtotal + serviceFee + vat;

  return { total, serviceFee, vat };
};

export function formatDateOrder(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
}

export function formatCurrency(amount: string, currency: string): string {
  const numericAmount = Number.parseFloat(amount);
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
  }).format(numericAmount);
}
