"use client";

import { ListIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Sidebar } from "./sidebar";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ModeToggle } from "../ui/mode-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useSignOut } from "@/hooks/auth/useSignOut";
import { useMe } from "@/hooks/auth/useMe";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/common/routes";

export function TopNav() {
  const router = useRouter();
  const { data: me } = useMe();

  const { mutate: handleSignOut } = useSignOut();
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-3 px-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <ListIcon className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0">
            <Sidebar />
          </SheetContent>
        </Sheet>

        <div className="font-semibold">CV Assistant</div>

        <div className="flex-1" />

        <Separator orientation="vertical" className="h-6" />
        <ModeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar className="h-8 w-8 cursor-pointer">
              <AvatarFallback>
                {me?.firstName ? me.firstName[0].toLocaleUpperCase() : "U"}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40" align="start">
            <DropdownMenuGroup>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              {me?.isAuthenticated ? (
                <DropdownMenuItem onClick={() => handleSignOut()}>
                  Sign out
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem onClick={() => router.push(ROUTES.LOGIN)}>
                  Sign In
                </DropdownMenuItem>
              )}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
