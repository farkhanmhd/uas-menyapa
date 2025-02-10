import { EventSearchParams } from "@/app/api/events/searchParams";
import { EventList, IEvent, IEventCard } from "@/types";

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
