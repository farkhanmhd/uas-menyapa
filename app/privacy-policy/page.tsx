import type { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Kebijakan Privasi | UASMenyapa.com",
  description:
    "Kebijakan privasi UASMenyapa.com menjelaskan bagaimana kami mengumpulkan dan menggunakan informasi pribadi Anda.",
  keywords: ["UASMenyapa", "kebijakan privasi", "privasi", "informasi pribadi"],
  openGraph: {
    title: "Kebijakan Privasi | UASMenyapa.com",
    description:
      "Kebijakan privasi UASMenyapa.com menjelaskan bagaimana kami mengumpulkan dan menggunakan informasi pribadi Anda.",
    url: "https://www.uasmenyapa.com/privacy-policy",
    siteName: "UASMenyapa.com",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Kebijakan Privasi | UASMenyapa.com",
    description:
      "Kebijakan privasi UASMenyapa.com menjelaskan bagaimana kami mengumpulkan dan menggunakan informasi pribadi Anda.",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-4xl font-bold">Kebijakan Privasi</h1>
      <Card className="mx-auto">
        <CardContent className="pt-6">
          <h2 className="mb-2 text-xl font-semibold">
            Pengumpulan Informasi Pribadi
          </h2>
          <p className="leading-relaxed text-gray-700">
            UASMenyapa.com menghormati privasi pengunjungnya. Kami mengumpulkan
            informasi pribadi hanya jika diperlukan untuk menyediakan layanan,
            memperbaiki pengalaman pengguna, dan mematuhi kebijakan hukum yang
            berlaku.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
