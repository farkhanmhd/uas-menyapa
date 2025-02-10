"use client";

import { useTransitionRouter } from "next-view-transitions";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle, AlertCircle } from "lucide-react";

export default function PaymentStatus({
  transactionStatus,
}: {
  transactionStatus: string;
}) {
  const { refresh } = useTransitionRouter();

  return (
    <Alert
      variant={transactionStatus === "settlement" ? "default" : "destructive"}
    >
      {transactionStatus === "settlement" ? (
        <>
          <CheckCircle className="h-4 w-4" />
          <AlertTitle>Transaction Settled</AlertTitle>
          <AlertDescription>Transaction Settled</AlertDescription>
        </>
      ) : (
        <>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Transaction Pending</AlertTitle>
          <AlertDescription className="flex justify-between font-medium">
            <span>Transaction Pending</span>
            <Button onClick={refresh} variant="outline">
              Refresh Status
            </Button>
          </AlertDescription>
        </>
      )}
    </Alert>
  );
}

// <h1 className="mb-6 text-2xl font-bold">Order Details</h1>
