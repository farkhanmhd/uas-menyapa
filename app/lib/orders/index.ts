import { eq } from "drizzle-orm";
import { OrderStatus } from "@/app/api/events/searchParams";
import { OrderCard } from "@/types";
import { PaymentData } from "@/utils/paymentUtils";
import db from "@/db";
import { paymentDetails, orders } from "@/db/schema/public";

export const getOrdersByStatus = async (
  status: OrderStatus,
): Promise<OrderCard[]> => {
  try {
    const res = await fetch(
      `${process.env.BASE_URL}/api/orders?status=${status}`,
      {
        cache: "force-cache",
      },
    );
    const { data } = await res.json();

    return data;
  } catch (error) {
    throw error;
  }
};

export async function getPaymentData(id: string): Promise<PaymentData> {
  try {
    const response = await fetch(`${process.env.BASE_URL}/api/orders/${id}`);

    if (!response.ok) {
      throw new Error("Failed to fetch payment data");
    }

    const data = await response.json();

    const {
      data: { order },
    } = data;

    return order;
  } catch (error) {
    throw error;
  }
}

export const getTransactionStatus = async (orderId: string) => {
  try {
    const data = await db
      .select({
        transactionStatus: paymentDetails.transactionStatus,
      })
      .from(orders)
      .innerJoin(paymentDetails, eq(orders.id, paymentDetails.orderId))
      .where(eq(orders.id, orderId))
      .limit(1);

    const transactions = data[0];

    const { transactionStatus } = transactions;

    return transactionStatus;
  } catch (error) {
    throw error;
  }
};
