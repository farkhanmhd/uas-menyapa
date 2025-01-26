"use client";

import Image from "next/image";
import { Link } from "next-view-transitions";
import { signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { GoogleLoginDialog } from "@/components/ui/fragments/google-login";
import { Menu } from "lucide-react";
import { type User } from "next-auth";
import ThemeSwitch from "@/components/elements/theme-switch";

export default function Navigation({ user }: { user: User | null }) {
  const handleGoogleLogin = () => {
    signIn("google", { callbackUrl: "/" });
  };

  return (
    <nav className='bg-background/60 backdrop-blur-md z-50 shadow-sm fixed top-0 left-0 right-0'>
      <div className='container mx-auto px-4'>
        <div className='flex justify-between items-center py-4'>
          <Link href='/' className='text-2xl font-bold flex gap-x-2 items-center'>
            <Image src='/logo.png' alt='UAS Menyapa Logo' width={50} height={50} className='mr-2' />
          </Link>
          <div className='hidden md:flex space-x-6 items-center font-medium'>
            <Link href='/events' className='text-foreground text-sm hover:text-primary'>
              Events
            </Link>
            <Link href='/about' className='text-foreground text-sm hover:text-primary'>
              About
            </Link>
            <Link href='/contact' className='text-foreground text-sm hover:text-primary'>
              Contact
            </Link>
            <ThemeSwitch />
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
                    <Avatar>
                      <AvatarImage src={user?.image || ""} alt={user?.name || "User"} />
                      <AvatarFallback>{user?.name?.[0] || "U"}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                  <DropdownMenuItem className='cursor-pointer'>
                    <Link href='/user'>Riwayat Transaksi</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className='cursor-pointer' onClick={() => signOut()}>
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <GoogleLoginDialog />
            )}
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button className='md:hidden' variant='ghost'>
                <Menu className='h-6 w-6' />
              </Button>
            </SheetTrigger>
            <SheetContent side='right' className='w-[300px] sm:w-[400px]'>
              <nav className='flex flex-col space-y-4'>
                <Link href='/events' className='text-foreground text-sm hover:text-primary'>
                  Events
                </Link>
                <Link href='/about' className='text-foreground text-sm hover:text-primary'>
                  About
                </Link>
                <Link href='/contact' className='text-foreground text-sm hover:text-primary'>
                  Contact
                </Link>
                <p className='text-foreground flex justify-between items-center text-sm hover:text-primary'>
                  Theme
                  <ThemeSwitch />
                </p>
                {user ? (
                  <Button onClick={() => signOut()} className='w-full'>
                    Log out
                  </Button>
                ) : (
                  <Button onClick={handleGoogleLogin} className='w-full'>
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
