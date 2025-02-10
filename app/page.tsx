import { Suspense } from "react";
import Jumbotron from "../components/fragments/Jumbotron";
import EventCarousel from "@/components/fragments/EventCarousel";
import EventListSkeleton from "@/components/fragments/EventListSkeleton";

export default async function Home() {
  return (
    <div className="container mx-auto px-4">
      <Jumbotron />
      <Suspense fallback={<EventListSkeleton />}>
        <EventCarousel />
      </Suspense>
    </div>
  );
}
