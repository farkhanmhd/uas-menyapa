"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CountdownTimer } from "./CountdownTimer";
import { ClipboardCopy, Ticket, PhoneIcon as WhatsApp } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ClientInteractionsProps {
  paymentType: string;
  paymentDetails: any;
  isPending: boolean;
  isPaid: boolean;
  expiryTime: string;
  actions: any;
}

export function ClientInteractions({
  paymentType,
  paymentDetails,
  isPending,
  isPaid,
  expiryTime,
  actions,
}: ClientInteractionsProps) {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      description: "Copied to clipboard",
    });
  };

  const renderPaymentMethod = () => {
    switch (paymentType) {
      case "Virtual Account":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                {paymentDetails.bank} Virtual Account Number
              </p>
              <div className="flex items-center gap-2">
                <code className="flex-1 rounded bg-background px-3 py-2 text-base font-medium">
                  {paymentDetails.number}
                </code>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => copyToClipboard(paymentDetails.number)}
                >
                  <ClipboardCopy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        );

      case "Mandiri Bill":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Bill Key</p>
              <div className="flex items-center gap-2">
                <code className="flex-1 rounded bg-background px-3 py-2 text-base font-medium">
                  {paymentDetails.billKey}
                </code>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => copyToClipboard(paymentDetails.billKey!)}
                >
                  <ClipboardCopy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Biller Code</p>
              <div className="flex items-center gap-2">
                <code className="flex-1 rounded bg-background px-3 py-2 text-base font-medium">
                  {paymentDetails.billerCode}
                </code>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => copyToClipboard(paymentDetails.billerCode!)}
                >
                  <ClipboardCopy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        );

      case "GoPay":
      case "QRIS":
        if (new Date() >= new Date(expiryTime) || isPaid) return null;
        return (
          <div className="space-y-6">
            <div className="flex justify-center">
              <div className="relative aspect-square w-full max-w-[240px]">
                <Image
                  src={actions[0].url || "/placeholder.svg"}
                  alt={`${paymentType} QR Code ${actions[0].url}`}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            {paymentType === "GoPay" && (
              <Link href={paymentDetails.deeplink} className="block">
                <Button className="w-full">
                  Open GoPay App or Scan QR Code
                </Button>
              </Link>
            )}
            <p className="text-center text-sm text-muted-foreground">
              Scan the QR Code using your{" "}
              {paymentType === "QRIS"
                ? "e-wallet or mobile banking app"
                : "GoPay app"}
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {renderPaymentMethod()}

      {isPending && (
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Time left to pay</p>
          <CountdownTimer expiryTime={expiryTime} />
        </div>
      )}

      {isPaid && (
        <div className="flex flex-col gap-3">
          <Link
            href="https://chat.whatsapp.com/your-group-invite"
            target="_blank"
          >
            <Button className="w-full">
              <WhatsApp className="mr-2 h-4 w-4" />
              Join WhatsApp Group
            </Button>
          </Link>
          <Link href="/tickets">
            <Button variant="outline" className="w-full">
              <Ticket className="mr-2 h-4 w-4" />
              View Purchased Tickets
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
