import Image from "next/image";
import { Link } from "next-view-transitions";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

// Mock data fetching function
async function fetchEvents() {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return [
    {
      id: 1,
      name: "Summer Music Festival",
      image: "/event1.jpg",
      time: "2023-07-15 18:00",
      location: "Central Park, NY",
    },
    {
      id: 2,
      name: "Tech Conference 2023",
      image: "/event2.jpg",
      time: "2023-08-22 09:00",
      location: "Convention Center, SF",
    },
    { id: 3, name: "Food & Wine Expo", image: "/event3.jpg", time: "2023-09-10 11:00", location: "Expo Hall, Chicago" },
    { id: 4, name: "Food & Wine Expo", image: "/event3.jpg", time: "2023-09-10 11:00", location: "Expo Hall, Chicago" },
    { id: 5, name: "Food & Wine Expo", image: "/event3.jpg", time: "2023-09-10 11:00", location: "Expo Hall, Chicago" },
    { id: 6, name: "Food & Wine Expo", image: "/event3.jpg", time: "2023-09-10 11:00", location: "Expo Hall, Chicago" },
    // Add more events as needed
  ];
}

export default async function EventCarousel() {
  const events = await fetchEvents();

  return (
    <div className='mb-12'>
      <h2 className='text-3xl font-bold mb-6'>Upcoming Events</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {events.map((event) => (
          <Card key={event.id}>
            <CardContent className='p-0'>
              <Image src={event.image || "/placeholder.svg"} alt={event.name} width={400} height={600} className='w-full h-[300px] object-cover' />
            </CardContent>
            <CardFooter className='flex flex-col items-start p-4'>
              <h3 className='text-xl font-semibold mb-2'>{event.name}</h3>
              <p className='text-sm text-gray-600 mb-1'>{event.time}</p>
              <p className='text-sm text-gray-600 mb-4'>{event.location}</p>
              <Link href={`/events/${event.id}`}>
                <Button>View Details</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function EventSkeleton() {
  return (
    <div className='mb-12'>
      <Skeleton className='h-10 w-64 mb-6' />
      <Card>
        <CardContent className='p-0'>
          <Skeleton className='w-full h-[400px]' />
        </CardContent>
        <CardFooter className='flex flex-col items-start p-4'>
          <Skeleton className='h-6 w-3/4 mb-2' />
          <Skeleton className='h-4 w-1/2 mb-1' />
          <Skeleton className='h-4 w-2/3 mb-4' />
          <Skeleton className='h-10 w-32' />
        </CardFooter>
      </Card>
    </div>
  );
}
