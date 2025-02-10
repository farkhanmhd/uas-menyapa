import Link from "next/link";
import { CheckCircle2, Ticket, PhoneIcon as WhatsApp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export default function ThankYouPage() {
  return (
    <div className="container relative flex min-h-[calc(100vh-4rem)] items-center justify-center">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="rounded-full bg-green-100 p-3">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-semibold tracking-tight">
                Thank you for your order!
              </h1>
              <p className="text-muted-foreground">
                Your payment has been successfully processed.
              </p>
            </div>

            <div className="w-full max-w-[280px] rounded-lg bg-muted p-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Order ID</span>
                  <span className="font-medium">ORD-12345</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount Paid</span>
                  <span className="font-medium">IDR 50,350.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Payment Method</span>
                  <span className="font-medium">QRIS</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2 pt-4">
          <Link
            href="https://chat.whatsapp.com/your-group-invite"
            className="w-full"
            target="_blank"
          >
            <Button className="w-full">
              <WhatsApp className="mr-2 h-4 w-4" />
              Join WhatsApp Group
            </Button>
          </Link>
          <Link href="/tickets" className="w-full">
            <Button variant="outline" className="w-full">
              <Ticket className="mr-2 h-4 w-4" />
              View Tickets
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
