import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function EventSkeleton() {
  return (
    <div className="relative grid gap-8 pt-8 lg:grid-cols-12">
      <div className="top-[112px] lg:sticky lg:col-span-3 lg:self-start">
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <Skeleton className="h-[600px] w-full" />
          </CardContent>
        </Card>
      </div>
      <div className="space-y-8 lg:col-span-6">
        <Card>
          <CardContent className="space-y-4 p-6">
            <Skeleton className="h-8 w-3/4" />
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-5 rounded-full" />
                <Skeleton className="h-4 w-40" />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-5 rounded-full" />
                <Skeleton className="h-4 w-48" />
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-24" />
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="space-y-4 p-6">
            <Skeleton className="h-6 w-1/2" />
            <div className="space-y-2">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-5/6" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:sticky lg:top-[112px] lg:z-0 lg:col-span-3 lg:self-start">
        <Card>
          <CardContent className="space-y-4 p-6">
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-10 w-full" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
