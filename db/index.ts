import { config } from "dotenv";
import { drizzle } from "drizzle-orm/mysql2";

config({ path: ".env.local" });

const db = drizzle(process.env.AUTH_DRIZZLE_URL as string);

export default db;
