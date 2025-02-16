import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function PurchasedEventSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {Array.from({ length: 6 }).map((_, index) => (
        <Card className="overflow-hidden" key={index}>
          <div className="grid grid-cols-8 md:grid-cols-6">
            <div className="hidden w-full md:col-span-2 md:block">
              <Skeleton className="h-full w-full" />
            </div>
            <CardContent className="col-span-8 flex flex-col justify-between p-4 sm:p-6 md:col-span-4 md:grid-cols-4">
              <div className="mb-4 flex flex-col sm:flex-row sm:items-start sm:justify-between">
                <Skeleton className="mb-2 h-6 w-3/4" />
                <Skeleton className="h-6 w-20" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            </CardContent>
          </div>
        </Card>
      ))}
    </div>
  );
}
