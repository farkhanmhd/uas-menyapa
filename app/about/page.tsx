import type { Metadata } from "next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "Tentang UASMenyapa.com | Platform Resmi Kajian Ustadz Abdul Somad",
  description:
    "UASMenyapa.com adalah platform resmi untuk pembelian tiket kajian eksklusif bersama Ustadz Abdul Somad. Dapatkan akses ke kajian ilmiah yang penuh hikmah dan inspirasi.",
  keywords: [
    "UASMenyapa",
    "Ustadz Abdul Somad",
    "kajian Islam",
    "tiket kajian",
    "dakwah digital",
  ],
  openGraph: {
    title: "Tentang UASMenyapa.com | Platform Resmi Kajian Ustadz Abdul Somad",
    description:
      "UASMenyapa.com adalah platform resmi untuk pembelian tiket kajian eksklusif bersama Ustadz Abdul Somad. Dapatkan akses ke kajian ilmiah yang penuh hikmah dan inspirasi.",
    url: "https://www.uasmenyapa.com/about",
    siteName: "UASMenyapa.com",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    title: "Tentang UASMenyapa.com | Platform Resmi Kajian Ustadz Abdul Somad",
    description:
      "UASMenyapa.com adalah platform resmi untuk pembelian tiket kajian eksklusif bersama Ustadz Abdul Somad. Dapatkan akses ke kajian ilmiah yang penuh hikmah dan inspirasi.",
  },
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-4xl font-bold">Tentang Kami</h1>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Selamat datang di UASMenyapa.com</CardTitle>
          <CardDescription>
            Satu-satunya platform resmi untuk pembelian tiket kajian eksklusif
            bersama Ustadz Abdul Somad.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Kami hadir untuk memudahkan Anda dalam mendapatkan akses ke
            kajian-kajian ilmiah yang penuh hikmah dan inspirasi. Dengan sistem
            pemesanan yang praktis dan aman, kami memastikan Anda bisa menikmati
            kajian secara langsung dengan nyaman dan tanpa kendala.
          </p>
          <p className="mb-4">
            Melalui UASMenyapa.com, kami berkomitmen untuk:
          </p>
          <ul className="mb-4 space-y-2">
            <li className="flex items-center">
              <CheckCircle className="mr-2 h-4 w-4 text-green-500" />{" "}
              Menyediakan informasi resmi terkait jadwal dan lokasi kajian.
            </li>
            <li className="flex items-center">
              <CheckCircle className="mr-2 h-4 w-4 text-green-500" />{" "}
              Mempermudah proses pembelian tiket secara online.
            </li>
            <li className="flex items-center">
              <CheckCircle className="mr-2 h-4 w-4 text-green-500" />{" "}
              Menghadirkan pengalaman belajar agama yang lebih eksklusif dan
              tertata.
            </li>
          </ul>
          <p className="mb-4">
            Terima kasih telah mempercayakan pengalaman spiritual Anda bersama
            kami. Mari bersama-sama menuntut ilmu dan meraih keberkahan!
          </p>
          <p className="flex items-center text-sm text-muted-foreground">
            <Globe className="mr-2 h-4 w-4" /> Kunjungi website kami secara
            berkala untuk update terbaru!
          </p>
        </CardContent>
      </Card>

      <Tabs defaultValue="visi" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="visi">Visi Kami</TabsTrigger>
          <TabsTrigger value="misi">Misi Kami</TabsTrigger>
        </TabsList>
        <TabsContent value="visi">
          <Card>
            <CardHeader>
              <CardTitle>Visi Kami</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Menjadi platform utama dalam menghadirkan kajian eksklusif
                Ustadz Abdul Somad, yang memberikan kemudahan bagi umat Islam
                dalam menuntut ilmu agama secara nyaman, terpercaya, dan
                berkualitas.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="misi">
          <Card>
            <CardHeader>
              <CardTitle>Misi Kami</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="mr-2 mt-1 h-4 w-4 text-green-500" />
                  <span>
                    Menyediakan akses mudah dan aman bagi peserta kajian untuk
                    mendapatkan tiket secara online.
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="mr-2 mt-1 h-4 w-4 text-green-500" />
                  <span>
                    Menghadirkan kajian eksklusif yang memberikan wawasan
                    keislaman yang mendalam dan aplikatif.
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="mr-2 mt-1 h-4 w-4 text-green-500" />
                  <span>
                    Membangun komunitas pembelajar yang aktif dalam memperdalam
                    ilmu agama dan memperkuat ukhuwah Islamiyah.
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="mr-2 mt-1 h-4 w-4 text-green-500" />
                  <span>
                    Mendukung dakwah digital dengan menyebarkan ilmu yang
                    bermanfaat melalui platform yang modern dan profesional.
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="mr-2 mt-1 h-4 w-4 text-green-500" />
                  <span>
                    Memberikan layanan terbaik bagi jamaah dengan sistem
                    pemesanan yang praktis dan responsif.
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
