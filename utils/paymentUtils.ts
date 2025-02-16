export type PaymentData = {
  orders: {
    id: string;
    userId: string;
    eventId: string;
    ticketType: string;
    paymentMethod: string;
    orderQty: number;
    subTotal: number;
    orderStatus: string;
    createdAt: string;
    updatedAt: string;
  };
  events: {
    id: string;
    title: string;
    posterUrl: string;
    description: string;
    venue: string;
    city: string;
    startTime: string;
    endTime: string;
    gmapUrl: string;
    whatsappGroupUrl: string;
    certificateDesignUrl: string;
    createdAt: string;
    updatedAt: string;
  };
  payment_details: {
    id: string;
    orderId: string;
    transactionId: string;
    grossAmount: string;
    currency: string;
    paymentType: string;
    transactionTime: string;
    transactionStatus: string;
    fraudStatus: string;
    expiryTime: string;
    qrString: string | null;
    acquirer: string | null;
    vaNumbers: { bank: string; va_number: string }[] | null;
    billKey: string | null;
    billerCode: string | null;
    permataVaNumber: string | null;
    actions: any | null;
    createdAt: string;
    updatedAt: string;
  };
  user: {
    id: string;
    name: string;
    email: string;
    age: number | null;
    gender: string | null;
    address: string | null;
    marriageStatus: string | null;
    whatsapp: string | null;
    emailVerified: string | null;
    image: string;
    role: string;
    createdAt: string;
  };
};

export function getPaymentDetails(payment: PaymentData) {
  const { payment_details } = payment;
  switch (payment_details.paymentType) {
    case "bank_transfer":
      if (payment_details.vaNumbers) {
        return {
          type: "Virtual Account",
          bank: payment_details.vaNumbers[0].bank.toUpperCase(),
          number: payment_details.vaNumbers[0].va_number,
        };
      } else if (payment_details.permataVaNumber) {
        return {
          type: "Virtual Account",
          bank: "Permata",
          number: payment_details.permataVaNumber,
        };
      }
      break;
    case "echannel":
      return {
        type: "Mandiri Bill",
        billKey: payment_details.billKey,
        billerCode: payment_details.billerCode,
      };
    case "qris":
      return {
        type: "QRIS",
        qrUrl: payment_details.actions?.[0].url,
      };
    case "gopay":
      return {
        type: "GoPay",
        qrUrl: payment_details.actions?.[0].url,
        deeplink: payment_details.actions?.[1].url,
      };
  }
  return null;
}
