import { getPaymentData } from "@/app/lib/orders";
import { OrderDetail } from "./OrderDetail";
import { PaymentData } from "@/utils/paymentUtils";

export async function OrderDetailWrapper({ id }: { id: string }) {
  const payment: PaymentData = await getPaymentData(id);
  return <OrderDetail payment={payment} />;
}
