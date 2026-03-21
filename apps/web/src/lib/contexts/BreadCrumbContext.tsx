"use client";

import React, { createContext, useContext, useMemo, useState } from "react";
import * as _ from "lodash";

export type Crumb = { title: string; href: string };

type BreadcrumbsContextValue = {
  breadcrumbs: Crumb[];
  setBreadcrumbs: (next: Crumb[]) => void;
};

const BreadcrumbsContext = createContext<BreadcrumbsContextValue | undefined>(
  undefined,
);

export function BreadcrumbsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [breadcrumbs, setBreadcrumbsState] = useState<Crumb[]>([]);

  const setBreadcrumbs = (next: Crumb[]) => {
    setBreadcrumbsState((prev) => (_.isEqual(prev, next) ? prev : next));
  };

  const value = useMemo(() => ({ breadcrumbs, setBreadcrumbs }), [breadcrumbs]);

  return (
    <BreadcrumbsContext.Provider value={value}>
      {children}
    </BreadcrumbsContext.Provider>
  );
}

export function useBreadcrumbsContext() {
  const ctx = useContext(BreadcrumbsContext);
  if (!ctx)
    throw new Error(
      "useBreadcrumbsContext must be used within BreadcrumbsProvider",
    );
  return ctx;
}
