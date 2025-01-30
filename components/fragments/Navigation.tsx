"use client";

import { useActionState } from "react";
import Image from "next/image";
import { Link } from "next-view-transitions";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { GoogleLoginDialog } from "@/components/fragments/google-login";
import { Menu } from "lucide-react";
import { type User } from "next-auth";
import ThemeSwitch from "@/components/elements/theme-switch";
import LogOutDialog from "./LogoutDialog";
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
import { logoutAction } from "@/app/lib/auth";

export default function Navigation({ user }: { user: User | null }) {
  const [, action, isPending] = useActionState(logoutAction, null);

  const handleGoogleLogin = () => {
    signIn("google", { callbackUrl: "/" });
  };

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 bg-background/60 shadow-sm backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <Link
            href="/"
            className="flex items-center gap-x-2 text-2xl font-bold"
          >
            <Image
              src="/logo.png"
              alt="UAS Menyapa Logo"
              width={50}
              height={50}
              className="mr-2"
            />
          </Link>
          <div className="hidden items-center space-x-6 font-medium md:flex">
            <Link
              href="/events"
              className="text-sm text-foreground hover:text-primary"
            >
              Events
            </Link>
            <Link
              href="/about"
              className="text-sm text-foreground hover:text-primary"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-sm text-foreground hover:text-primary"
            >
              Contact
            </Link>
            <ThemeSwitch />
            {user ? (
              <AlertDialog>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-8 w-8 rounded-full"
                    >
                      <Avatar>
                        <AvatarImage
                          src={user?.image || ""}
                          alt={user?.name || "User"}
                        />
                        <AvatarFallback>
                          {user?.name?.[0] || "U"}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="cursor-pointer">
                      <Link href="/user">Riwayat Transaksi</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer p-0">
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          className="h-8 w-full justify-start px-2"
                        >
                          Logout
                        </Button>
                      </AlertDialogTrigger>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel asChild>
                      <Button variant="secondary" disabled={isPending}>
                        Cancel
                      </Button>
                    </AlertDialogCancel>
                    <form action={action}>
                      <Button
                        type="submit"
                        variant="destructive"
                        disabled={isPending}
                      >
                        {isPending ? "Logging out..." : "Logout"}
                      </Button>
                    </form>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            ) : (
              <GoogleLoginDialog />
            )}
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button className="md:hidden" variant="ghost">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col space-y-4">
                <Link
                  href="/events"
                  className="text-sm text-foreground hover:text-primary"
                >
                  Events
                </Link>
                <Link
                  href="/about"
                  className="text-sm text-foreground hover:text-primary"
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="text-sm text-foreground hover:text-primary"
                >
                  Contact
                </Link>
                <span className="flex items-center justify-between text-sm text-foreground hover:text-primary">
                  Theme
                  <ThemeSwitch />
                </span>
                {user ? (
                  <LogOutDialog>
                    <Button className="w-full">Logout</Button>
                  </LogOutDialog>
                ) : (
                  <Button onClick={handleGoogleLogin} className="w-full">
                    Login
                  </Button>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
