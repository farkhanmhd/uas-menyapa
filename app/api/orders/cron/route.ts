import { NextResponse } from "next/server";
import db from "@/db"; // Import your DB connection
import { sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const PUT = async () => {
  try {
    await db.execute(sql`
      UPDATE orders o
      INNER JOIN events e ON o.event_id = e.id
      SET o.order_status = 'Expired'
      WHERE e.end_time < NOW() AND o.order_status != 'Expired';
    `);

    revalidatePath("/orders");

    return NextResponse.json({ message: "Orders updated successfully" });
  } catch (error) {
    console.error("Error updating orders:", error);
    return NextResponse.json(
      { error: "Error updating orders" },
      { status: 500 },
    );
  }
};
