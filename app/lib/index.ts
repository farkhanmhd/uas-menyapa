import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { eq } from "drizzle-orm";
import db from "@/db";
import { users } from "@/db/schema/authentication";

export const checkSession = async () => {
  const session = await auth();
  const isLoggedIn = !!session?.user;

  if (!isLoggedIn) redirect("/");
};

export const checkVerification = async (): Promise<boolean> => {
  const session = await auth();

  if (!session?.user) {
    return false;
  }

  const userId = session?.user.id as string;

  const userDb = await db
    .select({ whatsapp: users.whatsapp })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  const isVerified = !!userDb[0].whatsapp;

  return isVerified;
};

export const checkAdminOrSuperAdmin = async () => {
  const session = await auth();
  const userId = session?.user?.id;
  const userDb = await db
    .select({ userRole: users.role })
    .from(users)
    .where(eq(users.id, userId as string))
    .limit(1);

  if (userDb.length === 0) redirect("/");

  const isAdminOrSuperadmin =
    userDb[0].userRole === "admin" || userDb[0].userRole === "superadmin";

  return isAdminOrSuperadmin;
};

export const checkRole = async () => {
  const session = await auth();
  const userId = session?.user?.id;
  const userDb = await db
    .select({ userRole: users.role })
    .from(users)
    .where(eq(users.id, userId as string))
    .limit(1);

  if (userDb.length === 0) redirect("/");

  const role = userDb[0].userRole;

  return role;
};
