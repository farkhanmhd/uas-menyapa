"use client";

import { useState } from "react";
import { useAction } from "next-safe-action/hooks";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogDescription,
  AlertDialogTrigger,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import PhoneInput from "./PhoneInput";
import { updateWhatsappAction } from "@/app/lib/actions/account";
import { toast } from "@/hooks/use-toast";

const UpdateWhatsappDialog = () => {
  const [whatsapp, setWhatsapp] = useState<string>("");
  const { execute, result, isPending } = useAction(updateWhatsappAction, {
    onSettled: (actionResult) => {
      if (actionResult?.result?.data) {
        const { message } = actionResult?.result?.data;

        toast({
          title:
            message !== "Account updated successfully" ? "Failed" : "Success",
          description: message,
          variant:
            message !== "Account updated successfully"
              ? "destructive"
              : "default",
        });
      }
    },
  });
  const whatsappError = result?.validationErrors?.whatsapp?._errors?.join();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="w-full">Checkout</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="z-[100] w-10/12 rounded-xl sm:max-w-[500px]">
        <form
          action={() => execute({ whatsapp })}
          className="flex flex-col gap-y-4"
        >
          <AlertDialogHeader>
            <AlertDialogTitle>Update Whatsapp</AlertDialogTitle>
            <AlertDialogDescription>
              Silahkan update nomor Whatsapp anda untuk melakukan checkout
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div>
            <PhoneInput
              label="Nomor Whatsapp"
              id="whatsapp"
              value={whatsapp}
              onChange={setWhatsapp}
              className={cn({
                "border-destructive/80 text-destructive focus-visible:border-destructive/80 focus-visible:ring-destructive/20":
                  whatsappError,
              })}
            />
            {whatsappError && (
              <span
                className="mt-2 block text-sm text-destructive"
                aria-live="polite"
              >
                {whatsappError}
              </span>
            )}
          </div>
          <AlertDialogFooter className="flex flex-col gap-4 sm:flex-row">
            <AlertDialogCancel asChild>
              <Button variant="ghost" className="border-none shadow-none">
                Batal
              </Button>
            </AlertDialogCancel>
            <Button disabled={isPending} type="submit">
              Simpan
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default UpdateWhatsappDialog;
