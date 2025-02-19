import { EventSearchParams } from "@/app/lib/searchParams";
import { EventList, IEvent, IEventCard } from "@/types";
import { headers } from "next/headers";

export const getEvents = async (
  searchParams: EventSearchParams,
): Promise<EventList> => {
  try {
    const queryParams = new URLSearchParams();

    if (searchParams.search) queryParams.append("search", searchParams.search);
    if (searchParams.start) queryParams.append("start", searchParams.start);
    if (searchParams.end) queryParams.append("end", searchParams.end);
    if (searchParams.page)
      queryParams.append("page", String(searchParams.page));
    if (searchParams.limit)
      queryParams.append("limit", String(searchParams.limit));

    const res = await fetch(
      `${process.env.BASE_URL}/api/events?${queryParams.toString()}`,
      {
        cache: "force-cache",
        next: {
          tags: ["events-home"],
        },
      },
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch events: ${res.statusText}`);
    }

    const { data } = await res.json();
    return data;
  } catch (error) {
    console.error("Error in getEvents:", error);
    throw error;
  }
};

export const getEventById = async (id: string): Promise<{ event: IEvent }> => {
  try {
    const res = await fetch(`${process.env.BASE_URL}/api/events/${id}`, {
      cache: "force-cache",
      next: {
        tags: ["event-detail"],
      },
    });

    if (!res.ok) {
      throw new Error(`${res.statusText}`);
    }

    const { data } = await res.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const getRecommendations = async (
  id: string,
): Promise<{ events: IEventCard[] }> => {
  try {
    const res = await fetch(
      `${process.env.BASE_URL}/api/events/${id}/recommendations`,
      {
        cache: "force-cache",
        next: {
          tags: ["event-recommendations"],
        },
      },
    );

    if (!res.ok) {
      throw new Error(`${res.statusText}`);
    }

    const { data } = await res.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const getEditEventData = async (id: string) => {
  const headerList = await headers();
  const cookie = headerList.get("cookie");
  const res = await fetch(`${process.env.BASE_URL}/api/events/${id}/edit`, {
    method: "GET",
    cache: "no-store",
    headers: {
      cookie: cookie ?? "",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch event data");
  }

  const json = await res.json();
  return json;
};
