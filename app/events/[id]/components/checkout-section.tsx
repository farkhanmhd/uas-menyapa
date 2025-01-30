"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import NumberInput from "@/components/fragments/NumberInput";
import RadioVariant from "@/components/fragments/RadioVariant";
import { GoogleLoginDialog } from "@/components/fragments/google-login";
import { formatToIDR } from "@/lib/utils";

const ticketVariant = [
  {
    label: "Reguler",
    value: "reguler",
  },
  {
    label: "VIP",
    value: "vip",
  },
];

type Props = {
  vipAvailability: number;
  vipPrice: number;
  regulerAvailability: number;
  regulerPrice: number;
};

export default function CheckoutSection({
  vipAvailability,
  vipPrice,
  regulerAvailability,
  regulerPrice,
}: Props) {
  const { data: session } = useSession();
  const [quantity, setQuantity] = useState(1);
  const [variant, setVariant] = useState<string>(ticketVariant[0].value);
  const selectedPrice = variant === "vip" ? vipPrice : regulerPrice;
  const maxPurchase = variant === "vip" ? vipAvailability : regulerAvailability;
  const total = selectedPrice * quantity;

  return (
    <Card className="rounded-none md:rounded-xl">
      <CardHeader className="py-3 md:py-6">
        <CardTitle>Checkout</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-2 md:gap-4">
          <RadioVariant
            options={ticketVariant}
            value={variant}
            onChange={setVariant}
            label="Tipe Tiket"
          />
          <div className="flex items-center justify-between">
            <Label>Harga Tiket</Label>
            <p className="text-lg font-semibold">
              {formatToIDR(selectedPrice)}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <Label>Jumlah</Label>
            <div className="max-w-[115px]">
              <NumberInput
                value={quantity}
                setValue={setQuantity}
                minValue={1}
                maxValue={maxPurchase}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Label>Total</Label>
            <p className="text-xl font-semibold">{formatToIDR(total)}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="grid w-full pb-3 md:pb-6">
        {!session ? (
          <GoogleLoginDialog label="Beli Tiket" />
        ) : (
          <Button>Beli Tiket</Button>
        )}
      </CardFooter>
    </Card>
  );
}
