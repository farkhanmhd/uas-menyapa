import { config } from "dotenv";
import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import db from "./db";
import authConfig from "./auth.config";
import { accounts, sessions, users } from "./db/schema/authentication";
import { Adapter } from "next-auth/adapters";

config({ path: ".env" });

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
  }) as Adapter,
  secret: process.env.AUTHENTICATION_SECRET!,
  session: {
    maxAge: 24 * 60 * 60,
  },
  trustHost: true,
  ...authConfig,
});
