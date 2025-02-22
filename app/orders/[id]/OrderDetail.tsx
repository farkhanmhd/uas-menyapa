"use client";

import { useRouter } from "next/navigation";
import { type PaymentData, getPaymentDetails } from "@/utils/paymentUtils";
import { Card, CardContent } from "@/components/ui/card";
import { ClientInteractions } from "./ClientInteractions";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { PaymentStatusBanner } from "./PaymentStatusBanner";
import { EventDetails } from "./EventDetails";
import { formatCurrency } from "@/lib/utils";
import { PaymentInstructions } from "./PaymentInstructions";

interface OrderDetailProps {
  payment: PaymentData;
}

export function OrderDetail({ payment }: OrderDetailProps) {
  const router = useRouter();
  const paymentDetails = getPaymentDetails(payment);

  if (!paymentDetails) {
    return <div>Unsupported payment type</div>;
  }

  const isPending = payment.payment_details.transactionStatus === "pending";
  const isPaid = ["settlement", "capture"].includes(
    payment.payment_details.transactionStatus,
  );
  const isExpired = new Date(payment.payment_details.expiryTime) < new Date();

  const getStatusBadge = () => {
    if (isPending) return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
    if (isPaid) return "bg-green-100 text-green-800 hover:bg-green-100";
    return "bg-red-100 text-red-800 hover:bg-red-100";
  };

  const handleRefresh = () => {
    router.replace(`/orders/${payment.orders.id}`);
  };

  return (
    <div className="container mx-auto max-w-3xl px-4 pb-8">
      <h1 className="mb-6 text-2xl font-bold">Order Details</h1>
      <Card>
        <CardContent className="p-6">
          <div className="space-y-6">
            <PaymentStatusBanner
              isPaid={isPaid}
              isPending={isPending}
              isExpired={isExpired}
              onRefresh={handleRefresh}
            />

            <EventDetails
              title={payment.events.title}
              venue={payment.events.venue}
              city={payment.events.city}
              startTime={payment.events.startTime}
              endTime={payment.events.endTime}
            />

            <Separator />

            {/* Order Info Grid */}
            <div className="grid grid-cols-2 gap-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Ticket Type</p>
                <p className="mt-1 font-medium uppercase">
                  {payment.orders.ticketType}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Quantity</p>
                <p className="mt-1 font-medium">{payment.orders.orderQty}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="mt-1 font-medium">
                  {formatCurrency(
                    payment.payment_details.grossAmount,
                    payment.payment_details.currency,
                  )}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Metode Pembayaran
                </p>
                <p className="mt-1 font-medium">{paymentDetails.type}</p>
              </div>
            </div>

            <Separator />

            {/* Status */}
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Status</p>
              <Badge variant="secondary" className={getStatusBadge()}>
                {payment.payment_details.transactionStatus}
              </Badge>
            </div>

            <Separator />

            {/* Payment Section */}
            <ClientInteractions
              paymentType={paymentDetails.type}
              paymentDetails={paymentDetails}
              isPending={isPending}
              isPaid={isPaid}
              expiryTime={payment.payment_details.expiryTime}
              actions={payment.payment_details.actions}
              eventId={payment.events.id}
              whatsapp={payment.events.whatsappGroupUrl}
            />
          </div>
        </CardContent>
      </Card>
      <PaymentInstructions payment={payment} />
    </div>
  );
}
