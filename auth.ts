import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import db from "./db";
import { Adapter } from "next-auth/adapters";
import { accounts, sessions, users } from "./db/schema/authentication";
import { eq } from "drizzle-orm";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
  }) as Adapter,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token }) {
      const userDb = await db
        .select({
          id: users.id,
          role: users.role,
          whatsapp: users.whatsapp,
        })
        .from(users)
        .where(eq(users.id, token.sub as string))
        .limit(1);

      const userData = userDb[0];
      token.id = userData.id;
      token.role = userData.role;
      token.whatsapp = userData.whatsapp;

      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.role = token.role as any;
      session.user.whatsapp = token.whatsapp as string;
      return session;
    },
  },
  trustHost: true,
  ...authConfig,
});
