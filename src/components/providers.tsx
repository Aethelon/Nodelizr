"use client";

import { useEffect } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { AppShell } from "@/components/layout/app-shell";
import { useProjectStore } from "@/store/project-store";

export function Providers({ children }: { children: React.ReactNode }) {
  const loadOptions = useProjectStore((state) => state.loadOptions);

  useEffect(() => {
    loadOptions();
  }, [loadOptions]);

  return (
    <TooltipProvider delay={0}>
      <AppShell>{children}</AppShell>
      <Toaster position="top-center" richColors />
    </TooltipProvider>
  );
}
