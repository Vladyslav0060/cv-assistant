/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useQuery } from "@tanstack/react-query";
import { appControllerMe } from "@/api/generated"; // или appControllerMe — как у тебя называется

type Me = any; // подставь тип юзера из generated models

export function useMe() {
  return useQuery<Me | null>({
    queryKey: ["me"],
    queryFn: async () => {
      try {
        const res = await appControllerMe();
        // depending on your generator it may already be the data
        // but in your case you likely have { data, status, headers }
        return res?.data ?? null;
      } catch (err: any) {
        const status = err?.response?.status;
        if (status === 401 || status === 403) return null; // not logged in
        throw err; // real error
      }
    },
    retry: false,
  });
}
