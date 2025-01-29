import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function EventCardSkeleton() {
  return (
    <Card className='overflow-hidden flex flex-col justify-between'>
      <CardContent className='p-0 aspect-[10/12]'>
        <Skeleton className='w-full h-full' />
      </CardContent>
      <CardFooter className='flex flex-col items-start p-4'>
        <Skeleton className='h-6 w-3/4 mb-2' />
        <Skeleton className='h-4 w-1/2 mb-1' />
        <Skeleton className='h-4 w-2/3 mb-4' />
        <Skeleton className='h-10 w-32' />
      </CardFooter>
    </Card>
  );
}

export default function EventListSkeleton() {
  return (
    <div className='space-y-8'>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
        {Array.from({ length: 4 }).map((_, index) => (
          <EventCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}
