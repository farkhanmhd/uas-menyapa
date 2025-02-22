"use server";

import { signIn, signOut } from "@/auth";
import { revalidatePath } from "next/cache";

export const loginAction = async () => {
  await signIn("google");
  revalidatePath("/users");
};

export const logoutAction = async () => {
  await signOut();
};
