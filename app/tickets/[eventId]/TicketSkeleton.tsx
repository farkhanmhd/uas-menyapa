"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { User, Phone, Calendar, MapPin } from "lucide-react";

export function TicketCardSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <Card className="w-full" key={index}>
          <CardContent className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="mb-4 h-6 w-3/4" />
            <div className="space-y-4">
              <div className="rounded-lg bg-muted p-4">
                <Skeleton className="mb-2 h-5 w-1/3" />
                <div className="space-y-2">
                  <div className="flex items-center">
                    <User className="mr-2 h-4 w-4 text-muted" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                  <div className="flex items-center">
                    <Phone className="mr-2 h-4 w-4 text-muted" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4 text-muted" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
                <div className="flex items-center">
                  <MapPin className="mr-2 h-4 w-4 text-muted" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-muted/50 p-4">
            <Skeleton className="h-10 w-full" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
