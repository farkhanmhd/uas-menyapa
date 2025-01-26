import React from "react";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import { auth } from "@/auth";
import { type User } from "next-auth";
import { ScrollArea } from "@/components/ui/scroll-area";

const Template = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  const user = session?.user as User;
  return (
    <ScrollArea className='h-dvh' type='scroll'>
      <Navigation user={user} />
      <main className='mt-[82]'>{children}</main>
      <Footer />
    </ScrollArea>
  );
};

export default Template;
