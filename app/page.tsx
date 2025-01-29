import Jumbotron from "../components/fragments/Jumbotron";
import EventCarousel from "@/components/fragments/EventCarousel";
import EventListSkeleton from "@/components/fragments/EventListSkeleton";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="container mx-auto px-4">
      <Jumbotron />
      <Suspense fallback={<EventListSkeleton />}>
        <EventCarousel />
      </Suspense>
    </div>
  );
}
