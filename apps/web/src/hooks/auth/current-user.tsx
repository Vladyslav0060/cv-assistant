"use client";

import { MeDto } from "@/api/generated.schemas";
import { createContext, useContext } from "react";

type CurrentUserContextValue = MeDto | null | undefined;

const CurrentUserContext = createContext<CurrentUserContextValue>(undefined);

export function CurrentUserProvider({
  value,
  children,
}: {
  value: MeDto | undefined;
  children: React.ReactNode;
}) {
  return (
    <CurrentUserContext.Provider value={value}>
      {children}
    </CurrentUserContext.Provider>
  );
}

export function useCurrentUser() {
  return useContext(CurrentUserContext);
}
