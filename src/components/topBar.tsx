"use client";

import type { NavItem } from "@/types";
import { TOPBAR_NAV, APP_TITLE, APP_SUBTITLE } from "@/lib/data";
import { Button } from "@/components/ui";

export type TopbarModalId = "frontlines" | "layers" | null;

export interface TopbarProps {
  navItems?: NavItem[];
  title?: string;
  subtitle?: string;
  activeModalId?: TopbarModalId;
  onNavClick?: (id: string) => void;
}

export default function Topbar({
  navItems = TOPBAR_NAV,
  title = APP_TITLE,
  subtitle = APP_SUBTITLE,
  activeModalId = null,
  onNavClick,
}: TopbarProps) {
  return (
    <header
      className="
        fixed top-0 left-0 right-0 h-13 z-50
        flex items-center justify-between px-4
        bg-background border-b border-border
        backdrop-blur supports-[backdrop-filter]:bg-background/80
      "
    >
      <div className="flex items-center gap-3">
        <div className="flex flex-col leading-none px-3">
          <span className="font-mono font-bold text-sm tracking-[3px] text-foreground">
            {title}
          </span>
          <span className="font-mono font-light text-[9.5px] tracking-[1.5px] uppercase text-muted-foreground">
            {subtitle}
          </span>
        </div>
        <div className="w-px h-7 mx-2 bg-border" />
      </div>

      <div className="flex items-center gap-1">
        {navItems.map((item) => (
          <Button
            key={item.id}
            variant={activeModalId === item.id ? "primary" : "ghost"}
            size="md"
            icon={item.icon}
            iconPosition="left"
            onClick={() => onNavClick?.(item.id)}
          >
            {item.label}
          </Button>
        ))}
      </div>
    </header>
  );
}
