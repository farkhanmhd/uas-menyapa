"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAction } from "next-safe-action/hooks";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import NumberInput from "@/components/fragments/NumberInput";
import RadioVariant from "@/components/fragments/RadioVariant";
import { GoogleLoginDialog } from "@/components/fragments/google-login";
import { formatToIDR, calculateTotal } from "@/lib/utils";
import type { OrderData, TicketVariant } from "@/types";
import SelectInputIcon, {
  type SelectOptionWithIcon,
} from "@/components/elements/SelectInputIcon";
import {
  BcaIcon,
  BriIcon,
  BniIcon,
  MandiriIcon,
  CimbIcon,
  PermataIcon,
  GopayIcon,
  QrisIcon,
} from "@/components/elements/Icons";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { createOrderAction } from "@/app/lib/actions/orders";
import { toast } from "@/hooks/use-toast";
import { Dialog, DialogPanel, DialogBackdrop } from "@headlessui/react";

const ticketVariant: { label: string; value: TicketVariant }[] = [
  {
    label: "Reguler",
    value: "reguler",
  },
  {
    label: "VIP",
    value: "vip",
  },
];

const paymentOptions: SelectOptionWithIcon[] = [
  {
    label: "QRIS",
    value: "qris",
    icon: <QrisIcon />,
  },
  {
    label: "GoPay",
    value: "gopay",
    icon: <GopayIcon />,
  },
  {
    label: "BCA",
    value: "bca",
    icon: <BcaIcon />,
  },
  {
    label: "BRI",
    value: "bri",
    icon: <BriIcon />,
  },
  {
    label: "Mandiri",
    value: "mandiri",
    icon: <MandiriIcon />,
  },
  {
    label: "BNI",
    value: "bni",
    icon: <BniIcon />,
  },
  {
    label: "CIMB",
    value: "cimb",
    icon: <CimbIcon />,
  },
  {
    label: "Permata Bank",
    value: "permata",
    icon: <PermataIcon />,
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
  const { push } = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [variant, setVariant] = useState<TicketVariant>(ticketVariant[0].value);
  const [paymentMethod, setPaymentMethod] = useState("qris");
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const params = useParams();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth > 1024);
      setDialogOpen(false);
      setSheetOpen(false);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const selectedPrice = variant === "vip" ? vipPrice : regulerPrice;
  const maxPurchase = variant === "vip" ? vipAvailability : regulerAvailability;
  const subtotal = selectedPrice * quantity;
  const { total, serviceFee, vat } = calculateTotal(subtotal, paymentMethod);

  const { execute, isPending } = useAction(createOrderAction, {
    onSettled: (actionResult) => {
      if (actionResult.result.data) {
        toast({
          title: actionResult.result.data.status !== 201 ? "Error" : "Success",
          description: actionResult.result.data.message,
          variant:
            actionResult.result.data.status !== 201 ? "destructive" : "default",
        });
        push("/orders");
      }
    },
  });

  const handleAction = () => {
    const data: OrderData = {
      eventId: params.id as string,
      qty: quantity,
      variant,
      paymentMethod,
    };

    execute(data);
  };

  const OrderSummary = () => (
    <div className="space-y-2">
      <h3 className="font-semibold">Order Summary</h3>
      <p className="flex justify-between">
        <span>Ticket Type: </span>
        <span className="font-semibold">{variant.toUpperCase()}</span>{" "}
      </p>
      <p className="flex justify-between">
        <span>Quantity:</span>
        <span>{quantity}</span>
      </p>
      <p className="flex justify-between">
        <span>Price per Ticket:</span>
        <span>{formatToIDR(selectedPrice)}</span>
      </p>
      <p className="flex justify-between">
        <span>Subtotal:</span>
        <span>{formatToIDR(subtotal)}</span>
      </p>
      <p className="flex justify-between">
        <span>Service Fee:</span>
        <span>{formatToIDR(serviceFee)}</span>
      </p>
      {paymentMethod !== "gopay" && paymentMethod !== "qris" && (
        <p className="flex justify-between">
          <span>VAT (11%):</span>
          <span>{formatToIDR(vat)}</span>
        </p>
      )}
      <p className="flex justify-between font-semibold">
        <span>Total:</span>
        <span>{formatToIDR(total)}</span>
      </p>
    </div>
  );

  const CheckoutContent = () => (
    <>
      <div className="grid w-full items-center gap-2 md:gap-4">
        <RadioVariant
          options={ticketVariant}
          value={variant}
          onChange={(value) => setVariant(value)}
          label="Tipe Tiket"
        />
        <div className="flex items-center justify-between">
          <Label>Harga Tiket</Label>
          <p className="text-lg font-semibold">{formatToIDR(selectedPrice)}</p>
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

        <SelectInputIcon
          options={paymentOptions}
          label="Metode Pembayaran"
          placeholder="Pilih Metode"
          value={paymentMethod}
          onChange={setPaymentMethod}
        />

        <div className="flex items-center justify-between">
          <Label>Subtotal</Label>
          <p className="text-lg font-semibold">{formatToIDR(subtotal)}</p>
        </div>

        <div className="flex items-center justify-between">
          <Label>Biaya Layanan</Label>
          <p className="text-lg font-semibold">{formatToIDR(serviceFee)}</p>
        </div>

        {paymentMethod !== "gopay" && paymentMethod !== "qris" && (
          <div className="flex items-center justify-between">
            <Label>PPN (11% dari Biaya Layanan)</Label>
            <p className="text-lg font-semibold">{formatToIDR(vat)}</p>
          </div>
        )}

        <div className="flex items-center justify-between">
          <Label>Total</Label>
          <p className="text-xl font-semibold">{formatToIDR(total)}</p>
        </div>
      </div>
      <div className="mt-4">
        {!session ? (
          <GoogleLoginDialog label="Beli Tiket" />
        ) : (
          <Button
            onClick={() => {
              setDialogOpen(true);
              setSheetOpen(false);
            }}
            className="w-full"
          >
            Checkout
          </Button>
        )}
      </div>
    </>
  );

  const ConfirmationDialog = () => (
    <Dialog
      open={dialogOpen}
      onClose={() => setDialogOpen(true)}
      className="relative z-[60] data-[closed]:opacity-0"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 z-[60] flex h-screen w-screen items-center justify-center bg-black/80 p-4 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-300"
      >
        <DialogPanel className="fixed left-1/2 top-1/2 z-[61] grid max-h-[calc(100%-4rem)] w-10/12 -translate-x-1/2 -translate-y-1/2 gap-4 overflow-y-auto rounded-xl bg-background p-6 shadow-lg shadow-black/5 duration-200 sm:max-w-[400px]">
          <OrderSummary />
          {isPending ? (
            <Button disabled className="w-full">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing
            </Button>
          ) : (
            <Button
              onClick={handleAction}
              disabled={isPending}
              type="button"
              className="w-full"
            >
              {isPending ? "Processing..." : "Confirm Checkout"}
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 border-0 shadow-none"
            disabled={isPending}
            onClick={() => setDialogOpen(false)}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </DialogPanel>
      </DialogBackdrop>
    </Dialog>
  );

  if (isLargeScreen) {
    return (
      <>
        <Card className="rounded-xl">
          <CardHeader className="py-3 md:py-6">
            <CardTitle>Checkout</CardTitle>
          </CardHeader>
          <CardContent>
            <CheckoutContent />
          </CardContent>
        </Card>
        <ConfirmationDialog />
      </>
    );
  }

  return (
    <>
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetTrigger asChild>
          <Button className="fixed bottom-2 left-4 right-4 z-50 h-10">
            Pesan Tiket
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="z-[55]">
          <SheetHeader>
            <SheetTitle>Checkout</SheetTitle>
            <SheetDescription>
              Complete your purchase for the event.
            </SheetDescription>
          </SheetHeader>
          <div className="mt-4">
            <CheckoutContent />
          </div>
        </SheetContent>
      </Sheet>
      <ConfirmationDialog />
    </>
  );
}
