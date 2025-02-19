"use client";

import { Link } from "next-view-transitions";
import Image from "next/image";
import {
  Home,
  Calendar,
  Clipboard,
  Ticket,
  User,
  UserCog,
  ScanLine,
} from "lucide-react";
import { MapItems } from "@/lib/utils";
import { GoogleLoginDialog } from "@/components/fragments/google-login";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogHeader,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { useActionState } from "react";
import { logoutAction } from "@/app/lib/auth";

type Props = {
  user: any;
  role: "superadmin" | "admin" | "customer";
};

export default function Navigation({ user, role }: Props) {
  const [, action, isPending] = useActionState(logoutAction, null);
  const customerNavItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/events", label: "Events", icon: Calendar },
    { href: "/orders", label: "Orders", icon: Clipboard },
    { href: "/tickets", label: "Tickets", icon: Ticket },
    { href: "/account", label: "Account", icon: User },
  ];

  const adminNavItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/purchases", label: "Purchases", icon: UserCog },
    { href: "/scan", label: "Scan", icon: ScanLine },
    { href: "/events", label: "Events", icon: Calendar },
    { href: "/orders", label: "Orders", icon: Clipboard },
    { href: "/account", label: "Account", icon: User },
  ];

  const selectedNavItems =
    role === "customer" ? customerNavItems : adminNavItems;

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="fixed top-0 z-50 hidden w-screen bg-background/90 px-6 py-4 shadow-sm backdrop-blur-md md:flex">
        <div className="container mx-auto flex items-center justify-between px-4">
          <div>
            <Link href="/">
              <Image src="/logo.png" alt="Logo" width={40} height={40} />
            </Link>
          </div>
          <div className="flex items-center gap-x-6">
            <MapItems
              of={selectedNavItems}
              render={(item, index) => {
                // Hide "Orders" and "Tickets" if not logged in
                if (
                  !user &&
                  (item.label === "Orders" || item.label === "Tickets")
                ) {
                  return null;
                }
                return item.label === "Account" ? (
                  user ? (
                    <AlertDialog key={index}>
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
                          <DropdownMenuItem className="cursor-pointer p-0">
                            <Link
                              href="/account"
                              className="block h-full w-full px-2 py-1.5 font-medium"
                            >
                              Akun
                            </Link>
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
                    <GoogleLoginDialog key={index}>
                      <Button>Login</Button>
                    </GoogleLoginDialog>
                  )
                ) : (
                  <Link
                    key={index}
                    href={item.href}
                    className="text-sm font-medium text-foreground hover:text-primary"
                  >
                    {item.label}
                  </Link>
                );
              }}
            />
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-gray-200 bg-background py-3 shadow md:hidden">
        <div className="flex items-center justify-around">
          <MapItems
            of={selectedNavItems}
            render={(item) => {
              // Hide "Orders" and "Tickets" if not logged in
              if (
                !user &&
                (item.label === "Orders" || item.label === "Tickets")
              ) {
                return null;
              }
              const Icon = item.icon;
              return item.label === "Account" && !user ? (
                <GoogleLoginDialog key={item.href}>
                  <button className="flex flex-col justify-center gap-0 px-0 py-2">
                    <User className="h-[24px] w-[24px]" />
                    <span className="text-[10px]">Login</span>
                  </button>
                </GoogleLoginDialog>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex flex-col items-center justify-center py-2"
                >
                  <Icon className="h-6 w-6" />
                  <span className="text-[10px]">{item.label}</span>
                </Link>
              );
            }}
          />
        </div>
      </nav>
    </>
  );
}
