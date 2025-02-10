import { NextRequest, NextResponse } from "next/server";
import { eq, and } from "drizzle-orm";
import db from "@/db";
import { events, orders, paymentDetails } from "@/db/schema/public";
import { users } from "@/db/schema/authentication";
import { auth } from "@/auth";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session?.user.id;
    const { id: orderId } = await params;

    const data = await db
      .select()
      .from(orders)
      .innerJoin(events, eq(orders.eventId, events.id))
      .innerJoin(paymentDetails, eq(orders.id, paymentDetails.orderId))
      .innerJoin(users, eq(orders.userId, users.id))
      .where(and(eq(orders.id, orderId), eq(orders.userId, userId as string)));

    const order = data[0];

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({
      data: {
        order,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: error.message,
        },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      { status: 500 },
    );
  }
};
