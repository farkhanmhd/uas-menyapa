"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export default function ThankYouError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container relative flex min-h-[calc(100vh-4rem)] items-center justify-center">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="rounded-full bg-red-100 p-3">
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-semibold tracking-tight">
                Something went wrong!
              </h1>
              <p className="text-muted-foreground">
                We encountered an error while processing your request. Please
                try again or contact support if the problem persists.
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2 pt-4">
          <Button onClick={() => reset()} className="w-full">
            Try again
          </Button>
          <Link href="/orders" className="w-full">
            <Button variant="outline" className="w-full">
              View Orders
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
