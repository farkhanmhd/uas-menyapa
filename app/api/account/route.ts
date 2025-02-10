import { auth } from "@/auth";
import db from "@/db";
import { users } from "@/db/schema/authentication";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session?.user.id;
    const userDb = await db
      .select({
        whatsapp: users.whatsapp,
        name: users.name,
        dateOfBirth: users.dateOfBirth,
        address: users.address,
        gender: users.gender,
        marriageStatus: users.marriageStatus,
        email: users.email,
      })
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    if (userDb.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const user = userDb[0];

    return NextResponse.json({ data: user });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
};

export const PUT = async (req: Request) => {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session?.user.id;

    const payload = await req.json();
    const { whatsapp, name, dateOfBirth, address, gender, marriageStatus } =
      payload;

    // transaction
    await db
      .update(users)
      .set({
        whatsapp,
        name,
        dateOfBirth,
        address,
        gender,
        marriageStatus,
      })
      .where(eq(users.id, userId));

    return NextResponse.json({ message: "Account updated successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
};
