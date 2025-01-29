import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".env.local" });

export default defineConfig({
  out: "./drizzle/migrations",
  schema: "./db/schema",
  dialect: "mysql",
  dbCredentials: {
    url: process.env.AUTH_DRIZZLE_URL!,
  },
});
