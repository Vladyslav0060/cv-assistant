"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BreadcrumbsProvider } from "@/lib/contexts/BreadCrumbContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [client] = useState(() => new QueryClient());
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <TooltipProvider>
        <QueryClientProvider client={client}>
          <BreadcrumbsProvider>{children}</BreadcrumbsProvider>
        </QueryClientProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
}
