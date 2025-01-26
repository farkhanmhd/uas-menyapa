import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "next-auth/react";
import ClientProvider from "@/components/providers/client";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ViewTransitions } from "next-view-transitions";

export const metadata: Metadata = {
  title: {
    template: "%s | UAS Menayapa",
    default: "UAS Menayapa",
  },
  description: "UAS Menyapa",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransitions>
      <html lang='en'>
        <body className={`${GeistSans.className} antialiased`}>
          <ClientProvider>
            <SessionProvider>
              <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
                {children}
                <Toaster />
              </ThemeProvider>
            </SessionProvider>
          </ClientProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
