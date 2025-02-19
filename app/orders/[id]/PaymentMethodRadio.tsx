"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { useId } from "react";

const paymentMethods = [
  {
    id: "qris",
    name: "QRIS",
    logo: "/images/icons/qris.svg",
    height: 12,
    width: 30,
  },
  {
    id: "gopay",
    name: "GoPay",
    logo: "/images/icons/gopay.svg",
    height: 32,
    width: 32,
  },
  {
    id: "bca",
    name: "Bank BCA",
    logo: "/images/icons/bca.svg",
    height: 16,
    width: 50,
  },
  {
    id: "mandiri",
    name: "Bank Mandiri",
    logo: "/images/icons/mandiri.svg",
    height: 16,
    width: 50,
  },
  {
    id: "bni",
    name: "Bank BNI",
    logo: "/images/icons/bni.svg",
    height: 10,
    width: 34,
  },
  {
    id: "bri",
    name: "Bank BRI",
    logo: "/images/icons/bri.svg",
    height: 15,
    width: 60,
  },
  {
    id: "permata",
    name: "Permata Bank",
    logo: "/images/icons/permata.svg",
    height: 24,
    width: 75,
  },
  {
    id: "cimb",
    name: "CIMB Niaga",
    logo: "/images/icons/cimb.svg",
    height: 9,
    width: 60,
  },
];

interface PaymentMethodRadioProps {
  value: string;
  onChange: (value: string) => void;
}

export default function PaymentMethodRadio({
  value,
  onChange,
}: PaymentMethodRadioProps) {
  const id = useId();

  return (
    <RadioGroup
      className="grid grid-cols-2 gap-3 sm:grid-cols-3"
      value={value}
      onValueChange={onChange}
    >
      {paymentMethods.map((method) => (
        <label
          key={method.id}
          className="relative flex cursor-pointer flex-col items-center gap-3 rounded-lg border border-input px-4 py-3 text-center shadow-sm shadow-black/5 outline-offset-2 transition-colors has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-accent has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ring/70"
        >
          <RadioGroupItem
            id={`${id}-${method.id}`}
            value={method.id}
            className="sr-only after:absolute after:inset-0"
          />
          <div className="relative flex h-10 w-full items-center justify-center">
            <img
              src={method.logo || "/placeholder.svg"}
              alt={method.name}
              width={method.width}
              height={method.height}
              className="object-contain"
            />
          </div>
          <p className="text-xs font-medium leading-none text-foreground">
            {method.name}
          </p>
        </label>
      ))}
    </RadioGroup>
  );
}
