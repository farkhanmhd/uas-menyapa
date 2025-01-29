import React from "react";
import RecommendedEvents from "./recommended-events";
import { getRecommendations } from "@/app/lib/events";

const RecommendedEventsWrapper = async ({ id }: { id: string }) => {
  const { events } = await getRecommendations(id);
  return <RecommendedEvents events={events} />;
};

export default RecommendedEventsWrapper;
