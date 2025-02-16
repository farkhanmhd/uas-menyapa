import { OrderData } from "@/types";
import { headers } from "next/headers";

export const createOrder = async (data: OrderData) => {
  try {
    const headersList = await headers();
    const cookie = headersList.get("cookie");
    const response = await fetch(`${process.env.BASE_URL}/api/orders`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        cookie: cookie ?? "",
      },
    });

    const responseData = await response.json();

    if (!responseData.data) {
      throw new Error(responseData.error);
    }

    return {
      status: response.status,
      data: responseData.data,
      message: responseData.data.status_message,
    };
  } catch (error) {
    return {
      message: error instanceof Error ? error.message : "Something went wrong",
    };
  }
};
