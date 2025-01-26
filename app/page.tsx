import Jumbotron from "./components/Jumbotron";
import EventCarousel, { EventSkeleton } from "./components/EventCarousel";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className='container mx-auto px-4'>
      <Jumbotron />
      <Suspense fallback={<EventSkeleton />}>
        <EventCarousel />
      </Suspense>
    </div>
  );
}
