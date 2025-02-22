"use server";

import { z } from "zod";
import { actionClient } from "../../safe-action";
import db from "@/db";
import { users } from "@/db/schema/authentication";
import { auth } from "@/auth";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

const updateUserRoleSchema = z.object({
  userId: z.string(),
  role: z.enum(["customer", "admin"]),
});

const updateUserRole = async (userId: string, role: "customer" | "admin") => {
  const session = await auth();

  if (!session?.user) {
    return {
      status: "error",
      message: "Unauthorized",
    };
  }

  await db.transaction(async (tx) => {
    await tx.update(users).set({ role }).where(eq(users.id, userId));
  });
};

export const updateUserRoleAction = actionClient
  .schema(updateUserRoleSchema)
  .action(async ({ parsedInput: bodyData }) => {
    try {
      await updateUserRole(bodyData.userId, bodyData.role);
      revalidatePath("/users");
      return {
        status: "success",
        message: "User role updated successfully",
      };
    } catch (error) {
      return {
        status: "error",
        message:
          error instanceof Error ? error.message : "Something went wrong",
      };
    }
  });
