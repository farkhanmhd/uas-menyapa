import { drizzle } from "drizzle-orm/mysql2";

const db = drizzle(process.env.AUTH_DRIZZLE_URL as string);

export default db;
