import {
  type PaymentData,
  getPaymentDetails,
} from "../../../utils/paymentUtils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PaymentInstructionsProps {
  payment: PaymentData;
}

export function PaymentInstructions({ payment }: PaymentInstructionsProps) {
  if (!payment) {
    return null;
  }

  const paymentDetails = getPaymentDetails(payment);

  if (!paymentDetails) {
    return null;
  }

  const instructions = {
    "Virtual Account": [
      `Log in to your ${paymentDetails.bank} mobile banking app or internet banking.`,
      "Select 'Transfer' or 'Send Money'.",
      `Choose 'Transfer to ${paymentDetails.bank} Virtual Account'.`,
      `Enter the Virtual Account number: ${paymentDetails.number}`,
      `Confirm the amount to pay: ${payment.payment_details.currency} ${payment.payment_details.grossAmount}`,
      "Review the details and confirm the transaction.",
      "Keep the transaction receipt for your records.",
    ],
    "Mandiri Bill": [
      "Log in to your Mandiri mobile banking app or internet banking.",
      "Select 'Pay Bills' or 'Payments'.",
      "Choose 'Multipayment'.",
      `Enter the Biller Code: ${paymentDetails.billerCode}`,
      `Enter the Bill Key: ${paymentDetails.billKey}`,
      `Confirm the amount to pay: ${payment.payment_details.currency} ${payment.payment_details.grossAmount}`,
      "Review the details and confirm the transaction.",
      "Keep the transaction receipt for your records.",
    ],
    QRIS: [
      "Open your preferred e-wallet or banking app that supports QRIS.",
      "Select the 'Scan QR' or 'Pay with QR' option.",
      "Scan the QR code displayed on the screen.",
      `Confirm the amount to pay: ${payment.payment_details.currency} ${payment.payment_details.grossAmount}`,
      "Review the details and confirm the transaction.",
      "Keep the transaction receipt for your records.",
    ],
    GoPay: [
      "Open your GoPay app.",
      "Select 'Scan QR' or use the 'Pay' button.",
      "Scan the QR code displayed on the screen or use the 'Open GoPay App' button.",
      `Confirm the amount to pay: ${payment.payment_details.currency} ${payment.payment_details.grossAmount}`,
      "Review the details and confirm the transaction.",
      "Keep the transaction receipt for your records.",
    ],
  };

  return (
    <Card className="mx-auto mt-8 w-full max-w-5xl">
      <CardHeader>
        <CardTitle>How to Pay</CardTitle>
      </CardHeader>
      <CardContent>
        <ol className="list-inside list-decimal space-y-2">
          {instructions[paymentDetails.type as keyof typeof instructions].map(
            (instruction, index) => (
              <li key={index}>{instruction}</li>
            ),
          )}
        </ol>
      </CardContent>
    </Card>
  );
}
