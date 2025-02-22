import { auth } from "@/auth";
import { NextResponse } from "next/server";
import db from "@/db";
import { ne } from "drizzle-orm";
import { users } from "@/db/schema/authentication";

export const GET = async () => {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        dateOfBirth: users.dateOfBirth,
        gender: users.gender,
        address: users.address,
        marriageStatus: users.marriageStatus,
        whatsapp: users.whatsapp,
        role: users.role,
      })
      .from(users)
      .where(ne(users.role, "superadmin"));

    if (data.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
};
