"use client";

import { Link } from "next-view-transitions";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex h-[calc(100dvh-82px)] flex-col items-center justify-center bg-background text-foreground">
      <div className="container mx-auto px-4 text-center">
        <AlertCircle className="mx-auto mb-6 h-16 w-16 text-destructive" />
        <h1 className="mb-4 text-4xl font-bold">Oops! Something went wrong</h1>
        <p className="mb-8 text-xl">
          {error.message || "An unexpected error occurred."}
        </p>
        <div className="space-x-4">
          <Button onClick={() => reset()} variant="outline">
            Try again
          </Button>
          <Link href="/events">
            <Button>Return to Events</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
