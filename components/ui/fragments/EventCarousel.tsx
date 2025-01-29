import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn, MapItems } from "@/lib/utils";
import { Link } from "next-view-transitions";
import { EventCard } from "@/components/fragments/EventCard";

// Mock data fetching function
async function fetchEvents() {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return [
    {
      id: 1,
      name: "Gelisah Ketika Rezeki Tertunda, Saat Jodoh Sedang di Uji (Sesi 1)",
      image: "/images/event-1.jpeg",
      time: "Sabtu, 31 Mei 2025 08:00 - 10:00",
      location: "Grand Ballroom JW Marriott Hotel Medan",
    },
    {
      id: 2,
      name: "Gelisah Ketika Rezeki Tertunda, Saat Jodoh Sedang di Uji (Sesi 2)",
      image: "/images/event-2.jpeg",
      time: "Sabtu, 31 Mei 2025 13:00 - 16:00",
      location: "Grand Ballroom JW Marriott Hotel Medan",
    },
    {
      id: 3,
      name: "Gelisah Ketika Rezeki Tertunda, Saat Jodoh Sedang di Uji (Sesi 1)",
      image: "/images/event-1.jpeg",
      time: "Sabtu, 31 Mei 2025 08:00 - 10:00",
      location: "Grand Ballroom JW Marriott Hotel Medan",
    },
    {
      id: 4,
      name: "Gelisah Ketika Rezeki Tertunda, Saat Jodoh Sedang di Uji (Sesi 2)",
      image: "/images/event-2.jpeg",
      time: "Sabtu, 31 Mei 2025 13:00 - 16:00",
      location: "Grand Ballroom JW Marriott Hotel Medan",
    },
    {
      id: 5,
      name: "Gelisah Ketika Rezeki Tertunda, Saat Jodoh Sedang di Uji (Sesi 1)",
      image: "/images/event-1.jpeg",
      time: "Sabtu, 31 Mei 2025 08:00 - 10:00",
      location: "Grand Ballroom JW Marriott Hotel Medan",
    },
    {
      id: 6,
      name: "Gelisah Ketika Rezeki Tertunda, Saat Jodoh Sedang di Uji (Sesi 2)",
      image: "/images/event-2.jpeg",
      time: "Sabtu, 31 Mei 2025 13:00 - 16:00",
      location: "Grand Ballroom JW Marriott Hotel Medan",
    },
  ];
}

export default async function EventCarousel() {
  const events = await fetchEvents();

  return (
    <div className="mb-12 px-4 2xl:px-0">
      <h2 className="mb-6 text-3xl font-bold">Upcoming Events</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <MapItems
          of={events}
          render={(event, index) => <EventCard key={index} {...event} />}
        />
        <div className="col-span-1 flex items-center justify-center md:col-span-2 lg:col-span-3 xl:col-span-4">
          <Link href="/events" className={cn(buttonVariants())}>
            View More
          </Link>
        </div>
      </div>
    </div>
  );
}

export function EventSkeleton() {
  return (
    <div className="mb-12 px-4 2xl:px-0">
      <Skeleton className="mb-6 h-10 w-64" />
      <Card>
        <CardContent className="p-0">
          <Skeleton className="h-[400px] w-full" />
        </CardContent>
        <CardFooter className="flex flex-col items-start p-4">
          <Skeleton className="mb-2 h-6 w-3/4" />
          <Skeleton className="mb-1 h-4 w-1/2" />
          <Skeleton className="mb-4 h-4 w-2/3" />
          <Skeleton className="h-10 w-32" />
        </CardFooter>
      </Card>
    </div>
  );
}
