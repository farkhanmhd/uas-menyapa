export const metadata = {
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
    title: "Home",
    description:
      "UASMenyapa.com adalah platform resmi untuk pembelian tiket kajian eksklusif bersama Ustadz Abdul Somad. Dapatkan akses ke kajian ilmiah yang penuh hikmah dan inspirasi.",
    url: "https://uasmenyapa.com",
    siteName: "UAS Menyapa",
    locale: "en_US",
    type: "website",
  },
};

import { Suspense } from "react";
import Jumbotron from "../components/fragments/Jumbotron";
import EventCarousel from "@/components/fragments/EventCarousel";
import EventListSkeleton from "@/components/fragments/EventListSkeleton";

export const dynamic = "force-dynamic";

export default async function Home() {
  return (
    <div className="container mx-auto mt-6 px-4">
      <Jumbotron />
      <Suspense fallback={<EventListSkeleton />}>
        <EventCarousel />
      </Suspense>
    </div>
  );
}
