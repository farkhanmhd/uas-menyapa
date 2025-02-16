"use client";

import { useTransitionRouter } from "next-view-transitions";
import QRScanner from "@/components/fragments/QRScanner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export default function ScanContent() {
  const { back } = useTransitionRouter();

  return (
    <Card className="mx-auto w-full max-w-lg">
      <CardHeader className="flex flex-row items-center justify-start gap-x-4 space-y-0">
        <Button onClick={back} size="icon" variant="ghost">
          <ChevronLeft />
        </Button>
        <CardTitle className="text-xl font-bold lg:text-3xl">
          Scan Purchased Tickets
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-center text-gray-600">
          Use the QR code scanner below to validate purchased tickets.
        </p>
        <QRScanner />
      </CardContent>
    </Card>
  );
}
