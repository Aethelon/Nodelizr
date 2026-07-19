"use client";

import Image from "next/image";
import {
  FolderTree,
  House,
  LayoutTemplate,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useUiStore } from "@/store/ui-store";
import { GithubIcon } from "@/components/icons/github";
import { SidebarItem } from "./sidebar-item";

const NAV_ITEMS = [
  { href: "/", label: "Home", icon: House },
  { href: "/templates", label: "Templates", icon: LayoutTemplate },
  { href: "/structure", label: "Structure", icon: FolderTree },
];

const REPO_URL = "https://github.com/Aethelon/Nodelizr-APP";

const DEVELOPERS = [
  { name: "Bruno Magno", avatar: "https://avatars.githubusercontent.com/u/114788642?v=4", github: "https://github.com/brunoliratm" },
  { name: "Paulo de Araújo", avatar: "https://avatars.githubusercontent.com/u/127964717?v=4", github: "https://github.com/Paulo-Araujo-Jr" },
];

interface SidebarProps {
  onNavigate?: () => void;
}

export function Sidebar({ onNavigate }: SidebarProps) {
  const collapsed = useUiStore((state) => state.collapsed);
  const toggleCollapsed = useUiStore((state) => state.toggleCollapsed);

  return (
    <aside
      className={cn(
        "flex h-full flex-col border-r border-sidebar-border bg-sidebar transition-[width] duration-200",
        collapsed ? "w-[72px]" : "w-[260px]",
      )}
    >
      {/* Brand */}
      <div
        className={cn(
          "flex h-16 shrink-0 items-center overflow-hidden px-5 transition-all duration-200",
          collapsed ? "gap-0" : "gap-3",
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/favicon.svg"
          alt="Nodelizr"
          className="h-8 w-8 shrink-0 object-contain"
        />
        <div
          className={cn(
            "flex flex-col overflow-hidden whitespace-nowrap transition-all duration-200",
            collapsed ? "max-w-0 opacity-0" : "max-w-[200px] opacity-100",
          )}
        >
          <span className="font-brand text-2xl leading-none text-primary">
            NODE<span className="text-sidebar-foreground">LIZR</span>
          </span>
          <span className="text-[11px] font-medium text-muted-foreground">
            Project generator
          </span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-4">
        {NAV_ITEMS.map((item) => (
          <SidebarItem
            key={item.href}
            collapsed={collapsed}
            onNavigate={onNavigate}
            {...item}
          />
        ))}
      </nav>

      {/* Footer */}
      <div className="flex flex-col gap-1 border-t border-sidebar-border p-3">
        {collapsed ? (
          <a
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            title="View on GitHub"
            className="flex items-center rounded-md py-2 pl-3.5 text-sidebar-foreground/70 transition-all duration-200 hover:bg-sidebar-accent hover:text-sidebar-foreground"
          >
            <GithubIcon size={20} />
          </a>
        ) : (
          <a
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-md px-2 py-2 transition-colors hover:bg-sidebar-accent"
          >
            <div className="flex -space-x-2.5">
              {DEVELOPERS.map((dev) => (
                <Image
                  key={dev.name}
                  src={dev.avatar}
                  alt={dev.name}
                  title={dev.name}
                  width={32}
                  height={32}
                  className="h-8 w-8 rounded-full border-2 border-sidebar object-cover"
                />
              ))}
            </div>
            <div className="flex flex-col overflow-hidden whitespace-nowrap">
              <span className="text-sm font-semibold text-sidebar-foreground">
                Aethelon
              </span>
              <span className="text-[11px] text-muted-foreground">
                View on GitHub
              </span>
            </div>
          </a>
        )}

        <button
          type="button"
          onClick={toggleCollapsed}
          className={cn(
            "hidden items-center rounded-md py-2 text-sm font-medium text-muted-foreground transition-all duration-200 hover:bg-sidebar-accent hover:text-sidebar-foreground lg:flex",
            collapsed ? "pl-3.5" : "gap-3 px-3",
          )}
        >
          {collapsed ? (
            <PanelLeftOpen size={18} className="shrink-0" />
          ) : (
            <PanelLeftClose size={18} className="shrink-0" />
          )}
          <span
            className={cn(
              "overflow-hidden whitespace-nowrap transition-all duration-200",
              collapsed ? "max-w-0 opacity-0" : "max-w-[200px] opacity-100",
            )}
          >
            Collapse
          </span>
        </button>
      </div>
    </aside>
  );
}
