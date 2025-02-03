"use server";

import { actionClient } from "../../safe-action";
import { orderSchema } from "@/types";
import { headers } from "next/headers";

export const createOrderAction = actionClient
  .schema(orderSchema)
  .action(async ({ parsedInput: data }) => {
    try {
      const headersList = await headers();
      const response = await fetch(`${process.env.BASE_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          cookie: headersList.get("cookie") ?? "",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (!response.ok) {
        return {
          message: responseData.message,
        };
      }

      return {
        status: response.status,
        data: responseData.data,
        message: "Order created successfully!",
      };
    } catch (error) {
      return {
        message:
          error instanceof Error ? error.message : "Something went wrong",
      };
    }
  });
