"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { PiXLight } from "react-icons/pi";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { loginAction } from "@/app/lib/auth";

export function GoogleLoginDialog({ children }: { children: React.ReactNode }) {
  const [, submitAction, isPending] = useActionState(loginAction, null);
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent className="absolute left-1/2 top-1/2 z-[100] w-10/12 -translate-x-1/2 -translate-y-1/2 rounded-xl sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Login to UAS Menyapa</AlertDialogTitle>
          <AlertDialogDescription>
            Silahkan masuk menggunakan akun Google anda
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <form action={submitAction}>
            <Button type="submit" className="w-full" disabled={isPending}>
              <svg
                className="mr-2 h-4 w-4"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="google"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 488 512"
              >
                <path
                  fill="currentColor"
                  d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                ></path>
              </svg>
              {isPending ? "Signing In..." : "Continue with Google"}
            </Button>
          </form>
        </div>
        <AlertDialogFooter>
          <p className="text-xs">
            By logging in, you agree to our{" "}
            <a href="/terms" className="underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="underline">
              Privacy Policy
            </a>
            .
          </p>
        </AlertDialogFooter>
        <AlertDialogCancel asChild>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 border-0 shadow-none"
            disabled={isPending}
          >
            <PiXLight />
          </Button>
        </AlertDialogCancel>
      </AlertDialogContent>
    </AlertDialog>
  );
}
