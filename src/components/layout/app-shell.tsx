"use client";

import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUiStore } from "@/store/ui-store";
import { Sidebar } from "./sidebar";
import { GenerateBar } from "./generate-bar";

export function AppShell({ children }: { children: React.ReactNode }) {
  const mobileOpen = useUiStore((state) => state.mobileOpen);
  const openMobile = useUiStore((state) => state.openMobile);
  const closeMobile = useUiStore((state) => state.closeMobile);

  return (
    <div className="flex h-dvh overflow-hidden bg-background text-foreground">
      {/* Desktop sidebar */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Mobile overlay + drawer */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/60 transition-opacity lg:hidden",
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={closeMobile}
      />
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 transition-transform duration-200 lg:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <Sidebar onNavigate={closeMobile} />
      </div>

      {/* Main */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-14 shrink-0 items-center gap-3 border-b border-border px-4 lg:hidden">
          <button
            type="button"
            onClick={openMobile}
            aria-label="Open menu"
            className="flex h-9 w-9 items-center justify-center rounded-md text-foreground transition-colors hover:bg-accent"
          >
            <Menu size={20} />
          </button>
          <span className="font-brand text-xl text-primary">
            NODE<span className="text-foreground">LIZR</span>
          </span>
        </header>

        <main className="flex-1 overflow-y-auto">{children}</main>
        <GenerateBar />
      </div>
    </div>
  );
}
