import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { logoutAction } from "@/app/lib/auth";
import { useActionState } from "react";

export default function LogOutDialog({
  children,
}: {
  children: React.ReactNode;
}) {
  const [, action, isPending] = useActionState(logoutAction, null);
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Logging out will end your current session. You will need to sign in
            again to regain access to your account.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant="secondary">Cancel</Button>
          </AlertDialogCancel>
          <form action={action}>
            <Button
              type="submit"
              className="w-full"
              variant="destructive"
              disabled={isPending}
            >
              {isPending ? "Logging out..." : "Logout"}
            </Button>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
