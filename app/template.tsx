import React from "react";
import Navigation from "../components/fragments/Navigation";
import Footer from "../components/fragments/Footer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { auth } from "@/auth";

const Template = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  const user = session?.user;
  return (
    <ScrollArea className="relative h-dvh" type="scroll">
      <Navigation user={user!} />
      <main className="mt-6 flex min-h-[calc(100dvh-72px)] flex-col sm:px-4 md:mt-[72px]">
        {children}
      </main>
      <Footer />
    </ScrollArea>
  );
};

export default Template;
