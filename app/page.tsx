import { Suspense } from "react";
import Jumbotron from "../components/fragments/Jumbotron";
import EventCarousel from "@/components/fragments/EventCarousel";
import EventListSkeleton from "@/components/fragments/EventListSkeleton";

export const dynamic = "force-dynamic";

export default async function Home() {
  return (
    <div className="container mx-auto mt-6 px-4">
      <Jumbotron />
      <Suspense fallback={<EventListSkeleton />}>
        <EventCarousel />
      </Suspense>
    </div>
  );
}
