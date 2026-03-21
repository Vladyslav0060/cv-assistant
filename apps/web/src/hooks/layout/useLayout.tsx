"use client";

import { useBreadcrumbsContext } from "@/lib/contexts/BreadCrumbContext";
import { useEffect } from "react";

export const useBreadcrumbs = (next?: { title: string; href: string }[]) => {
  const { breadcrumbs, setBreadcrumbs } = useBreadcrumbsContext();

  useEffect(() => {
    if (!next) return;
    setBreadcrumbs(next);
    // We intentionally do not reset on unmount; next route/component should override
  }, [next, setBreadcrumbs]);

  return [breadcrumbs, setBreadcrumbs] as const;
};
