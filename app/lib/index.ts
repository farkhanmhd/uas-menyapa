import { redirect } from "next/navigation";
import { auth } from "@/auth";

export const checkSession = async () => {
  const session = await auth();
  const isLoggedIn = !!session?.user;

  if (!isLoggedIn) redirect("/");
};

export const checkVerification = async () => {
  const session = await auth();
  const isLoggedIn = !!session?.user;
  const isVerified = !!session?.user?.whatsapp;

  if (isLoggedIn && !isVerified) {
    redirect("/account");
  }
};
