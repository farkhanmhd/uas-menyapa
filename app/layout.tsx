import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "next-auth/react";
import ClientProvider from "@/components/providers/client";
import "./globals.css";
import { ViewTransitions } from "next-view-transitions";
import { NuqsAdapter } from "nuqs/adapters/next/app";

export const metadata: Metadata = {
  title: {
    template: "%s | UAS Menyapa",
    default: "UAS Menyapa",
  },
  description: "UAS Menyapa",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ViewTransitions>
      <html lang="en">
        <body className={`${GeistSans.className} antialiased`}>
          <ClientProvider>
            <SessionProvider>
              <NuqsAdapter>{children}</NuqsAdapter>
              <Toaster />
            </SessionProvider>
          </ClientProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
