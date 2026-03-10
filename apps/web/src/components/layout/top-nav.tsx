"use client";
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
                <>
                  <DropdownMenuItem onClick={() => router.push(ROUTES.PROFILE)}>
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleSignOut()}>
                    Sign out
                  </DropdownMenuItem>
                </>
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
