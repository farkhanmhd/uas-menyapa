import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import db from "./db";
import { Adapter } from "next-auth/adapters";
import { accounts, users } from "./db/schema/authentication";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
  }) as Adapter,
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub as string;
      return session;
    },
  },
  trustHost: true,
  ...authConfig,
});
