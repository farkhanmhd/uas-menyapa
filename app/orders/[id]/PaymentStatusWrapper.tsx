import React from "react";
import { getTransactionStatus } from "@/app/lib/orders";
import PaymentStatus from "./PaymentStatus";

const PaymentStatusWrapper = async ({ id }: { id: string }) => {
  const transactionStatus = await getTransactionStatus(id);
  return <PaymentStatus transactionStatus={transactionStatus} />;
};

export default PaymentStatusWrapper;
