import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function SalesChartSkeleton() {
  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-4 w-48" />
        </div>
        <Skeleton className="h-10 w-[160px] rounded-lg" />
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <div className="aspect-auto h-[250px] w-full">
          <div className="flex h-full w-full flex-col justify-between">
            <div className="flex justify-between">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-4 w-12" />
              ))}
            </div>
            <div className="flex h-full items-end justify-between gap-2 pb-4">
              {[...Array(30)].map((_, i) => (
                <Skeleton
                  key={i}
                  className="w-full"
                  style={{
                    height: `${Math.random() * 100}%`,
                  }}
                />
              ))}
            </div>
            <div className="flex justify-between pt-2">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-4 w-12" />
              ))}
            </div>
          </div>
        </div>
        <div className="mt-4 flex justify-center gap-4">
          <div className="flex items-center gap-2">
            <Skeleton className="h-3 w-3 rounded-full" />
            <Skeleton className="h-4 w-16" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-3 w-3 rounded-full" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
