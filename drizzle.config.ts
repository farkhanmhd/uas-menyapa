import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle/migrations",
  schema: "./db/schema",
  dialect: "mysql",
  dbCredentials: {
    url: process.env.AUTH_DRIZZLE_URL!,
  },
});
