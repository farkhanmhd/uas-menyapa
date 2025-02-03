import { OrderStatus } from "@/app/api/events/searchParams";
import { headers } from "next/headers";
import { OrderCard } from "@/types";

export const getOrdersByStatus = async (
  status: OrderStatus,
): Promise<OrderCard[]> => {
  try {
    const headersList = await headers();
    const res = await fetch(
      `${process.env.BASE_URL}/api/orders?status=${status}`,
      {
        headers: {
          // Forward the cookie header to maintain the session
          cookie: headersList.get("cookie") ?? "",
        },
      },
    );
    const { data } = await res.json();

    return data;
  } catch (error) {
    throw error;
  }
};
