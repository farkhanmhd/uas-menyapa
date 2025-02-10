"use server";

import { z } from "zod";
import { actionClient } from "../../safe-action";
import { updateAccount } from "../../account";
import { revalidatePath } from "next/cache";

const accountSchema = z.object({
  whatsapp: z.string({ required_error: "WhatsApp number is required" }).min(9),
  name: z.string().optional(),
  address: z.string().optional(),
  gender: z.enum(["male", "female"]).optional(),
  marriageStatus: z.enum(["unmarried", "married"]).optional(),
  dateOfBirth: z.date().optional(),
});

export const updateAccountAction = actionClient
  .schema(accountSchema)
  .action(async ({ parsedInput: bodyData }) => {
    try {
      const { message } = await updateAccount(bodyData);

      revalidatePath("/account");

      return { message };
    } catch (error) {
      return {
        message:
          error instanceof Error ? error.message : "Something went wrong",
      };
    }
  });
