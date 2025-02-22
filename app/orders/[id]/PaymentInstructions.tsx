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
      `Masuk ke aplikasi mobile banking atau internet banking ${paymentDetails.bank} Anda.`,
      "Pilih 'Transfer' atau 'Kirim Uang'.",
      `Pilih 'Transfer ke Virtual Account ${paymentDetails.bank}'.`,
      `Masukkan nomor Virtual Account: ${paymentDetails.number}`,
      `Konfirmasi jumlah yang harus dibayar: ${payment.payment_details.currency} ${payment.payment_details.grossAmount}`,
      "Periksa detail dan konfirmasi transaksi.",
      "Simpan struk transaksi untuk catatan Anda.",
    ],
    "Mandiri Bill": [
      "Masuk ke aplikasi mobile banking atau internet banking Mandiri Anda.",
      "Pilih 'Bayar Tagihan' atau 'Pembayaran'.",
      "Pilih 'Multipayment'.",
      `Masukkan Kode Biller: ${paymentDetails.billerCode}`,
      `Masukkan Bill Key: ${paymentDetails.billKey}`,
      `Konfirmasi jumlah yang harus dibayar: ${payment.payment_details.currency} ${payment.payment_details.grossAmount}`,
      "Periksa detail dan konfirmasi transaksi.",
      "Simpan struk transaksi untuk catatan Anda.",
    ],
    QRIS: [
      "Buka aplikasi e-wallet atau bank yang mendukung QRIS pilihan Anda.",
      "Pilih opsi 'Pindai QR' atau 'Bayar dengan QR'.",
      "Pindai kode QR yang ditampilkan di layar.",
      `Konfirmasi jumlah yang harus dibayar: ${payment.payment_details.currency} ${payment.payment_details.grossAmount}`,
      "Periksa detail dan konfirmasi transaksi.",
      "Simpan struk transaksi untuk catatan Anda.",
    ],
    GoPay: [
      "Buka aplikasi GoPay Anda.",
      "Pilih 'Pindai QR' atau gunakan tombol 'Bayar'.",
      "Pindai kode QR yang ditampilkan di layar atau gunakan tombol 'Buka Aplikasi GoPay'.",
      `Konfirmasi jumlah yang harus dibayar: ${payment.payment_details.currency} ${payment.payment_details.grossAmount}`,
      "Periksa detail dan konfirmasi transaksi.",
      "Simpan struk transaksi untuk catatan Anda.",
    ],
  };

  return (
    <Card className="mx-auto mt-8 w-full max-w-5xl">
      <CardHeader>
        <CardTitle>Cara melakukan Pembayaran</CardTitle>
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
