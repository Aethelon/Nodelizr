"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SidebarItemProps {
  href: string;
  label: string;
  icon: LucideIcon;
  collapsed: boolean;
  onNavigate?: () => void;
}

export function SidebarItem({
  href,
  label,
  icon: Icon,
  collapsed,
  onNavigate,
}: SidebarItemProps) {
  const pathname = usePathname();
  const isActive =
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const link = (
    <Link
      href={href}
      onClick={onNavigate}
      className={cn(
        "flex items-center overflow-hidden rounded-md py-2 text-sm font-medium transition-all duration-200",
        collapsed ? "pl-3.5" : "gap-3 px-3",
        isActive
          ? "bg-sidebar-accent text-primary"
          : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground",
      )}
    >
      <Icon size={18} className="shrink-0" />
      <span
        className={cn(
          "overflow-hidden whitespace-nowrap transition-all duration-200",
          collapsed ? "max-w-0 opacity-0" : "max-w-[200px] opacity-100",
        )}
      >
        {label}
      </span>
    </Link>
  );

  if (!collapsed) {
    return link;
  }

  return (
    <Tooltip>
      <TooltipTrigger render={link} />
      <TooltipContent side="right">{label}</TooltipContent>
    </Tooltip>
  );
}
