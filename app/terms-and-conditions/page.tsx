import type { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Syarat dan Ketentuan | UASMenyapa.com",
  description:
    "Syarat dan ketentuan untuk pembelian tiket dan partisipasi dalam event UAS Menyapa.",
  keywords: [
    "UASMenyapa",
    "syarat dan ketentuan",
    "pembelian tiket",
    "event",
    "Ustadz Abdul Somad",
  ],
  openGraph: {
    title: "Syarat dan Ketentuan | UASMenyapa.com",
    description:
      "Syarat dan ketentuan untuk pembelian tiket dan partisipasi dalam event UAS Menyapa.",
    url: "https://www.uasmenyapa.com/terms-and-conditions",
    siteName: "UASMenyapa.com",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Syarat dan Ketentuan | UASMenyapa.com",
    description:
      "Syarat dan ketentuan untuk pembelian tiket dan partisipasi dalam event UAS Menyapa.",
  },
};

export default function TermsAndConditionsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-4xl font-bold">Syarat dan Ketentuan</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            Ketentuan Umum UAS Menyapa
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>1. Pendaftaran Event</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc space-y-2 pl-5">
                  <li>
                    Peserta hanya dapat melakukan pembelian tiket event UAS
                    Menyapa melalui uasmenyapa.com dengan mengisi formulir dan
                    melakukan pembayaran dalam waktu yang telah ditentukan.
                  </li>
                  <li>
                    Setelah pembayaran berhasil, tiket dapat di download di
                    halaman website.
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>2. Ketentuan Acara</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc space-y-2 pl-5">
                  <li>
                    Peserta diharapkan mengikuti aturan dan tata tertib yang
                    ditetapkan selama acara berlangsung.
                  </li>
                  <li className="flex items-start">
                    <AlertTriangle className="mr-2 mt-0.5 h-5 w-5 flex-shrink-0 text-yellow-500" />
                    <span>
                      Apabila anda membeli melalui pihak lain selain melalui
                      website uasmenyapa.com, kami tidak bertanggung jawab jika
                      terjadi penipuan.
                    </span>
                  </li>
                  <li>
                    Peserta minimal berusia 10 tahun (dilarang mengajak dan
                    dilarang mendaftarkan anak dibawah 10 tahun, hal ini
                    berdasarkan evaluasi kami pada event-event sebelumnya)
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>3. Kebijakan Refund</AccordionTrigger>
              <AccordionContent>
                <p className="font-semibold">
                  Tidak ada Pengembalian Dana atau Refund Tiket.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
