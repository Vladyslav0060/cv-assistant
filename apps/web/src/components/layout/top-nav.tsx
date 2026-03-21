"use client";

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
import Link from "next/link";
import { Container } from "../ui/container";

export function TopNav() {
  const router = useRouter();
  const { data: me } = useMe();

  const { mutate: handleSignOut } = useSignOut();
  return (
    <header className="relative w-full top-0 z-50 border-b bg-background/60 backdrop-blur">
      <Container
        variant={"fullMobileConstrainedBreakpointPadded"}
        paddingY="none"
      >
        <div className="flex h-14 items-center gap-3">
          <Link href={ROUTES.HOME} className="font-semibold">
            CV Assistant
          </Link>

          <div className="flex-1" />

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
                    <DropdownMenuItem
                      onClick={() => router.push(ROUTES.PROFILE)}
                    >
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => router.push(ROUTES.DOCUMENTS)}
                    >
                      Documents
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => router.push(ROUTES.NEW_DOCUMENT)}
                    >
                      New Document
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
      </Container>
    </header>
  );
}
