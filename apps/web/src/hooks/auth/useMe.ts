/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useQuery } from "@tanstack/react-query";
import { authControllerMe } from "@/api/generated"; // или appControllerMe — как у тебя называется
import { MeDto } from "@/api/generated.schemas";
import { useCurrentUser } from "@/hooks/auth/current-user";

export function useMe() {
  const currentUser = useCurrentUser();

  return useQuery<(MeDto & { isAuthenticated: boolean }) | null>({
    queryKey: ["me"],
    enabled: currentUser === undefined,
    initialData:
      currentUser === undefined
        ? undefined
        : currentUser
          ? { ...currentUser, isAuthenticated: true }
          : null,
    staleTime: currentUser === undefined ? 0 : Infinity,
    queryFn: async () => {
      try {
        const { data } = await authControllerMe();
        const isAuthenticated = data && !!data.id;
        const result = { ...data, isAuthenticated };
        return result ?? null;
      } catch (err: any) {
        const status = err?.response?.status;
        if (status === 401 || status === 403) return null; // not logged in
        throw err; // real error
      }
    },
    retry: false,
  });
}
