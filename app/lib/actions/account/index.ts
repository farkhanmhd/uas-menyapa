"use server";

import { z } from "zod";
import { actionClient } from "../../safe-action";
import { updateAccount } from "../../account";
import { revalidatePath } from "next/cache";

const accountSchema = z.object({
  whatsapp: z
    .string({ required_error: "WhatsApp number is required" })
    .min(9, { message: "WhatsApp number must be at least 9 digits" }),
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
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

const whatsappSchema = z.object({
  whatsapp: z
    .string({ required_error: "WhatsApp number is required" })
    .min(8, { message: "WhatsApp number must be at least 8 digits" }),
});

export const updateWhatsappAction = actionClient
  .schema(whatsappSchema)
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
