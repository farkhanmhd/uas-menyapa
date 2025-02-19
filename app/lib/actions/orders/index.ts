"use server";

import { actionClient } from "../../safe-action";
import { orderSchema } from "@/types";
import { createOrder } from "../../services/orders";

export const createOrderAction = actionClient
  .schema(orderSchema)
  .action(async ({ parsedInput: bodyData }) => {
    try {
      const { status, data, message } = await createOrder(bodyData);

      return { status, data, message };
    } catch (error) {
      console.log(error);
      return {
        status: "error",
        message:
          error instanceof Error ? error.message : "Something went wrong",
      };
    }
  });
