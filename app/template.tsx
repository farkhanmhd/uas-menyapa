import React from "react";
import Footer from "../components/fragments/Footer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { auth } from "@/auth";
import NavigationWrapper from "@/components/fragments/NavigationWrapper";

const Template = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  const user = session?.user;
  return (
    <ScrollArea className="relative h-dvh" type="scroll">
      <NavigationWrapper user={user!} />
      <main className="flex min-h-[calc(100dvh-72px)] flex-col sm:px-4 md:mt-[72px]">
        {children}
      </main>
      <Footer />
    </ScrollArea>
  );
};

export default Template;
