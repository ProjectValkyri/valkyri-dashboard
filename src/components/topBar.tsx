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
        fixed top-0 left-0 right-0 h-[52px] z-50
        flex items-center justify-between px-4
        bg-bg-secondary border-b border-border
      "
    >
      <div className="flex items-center gap-3">
        <div className="flex flex-col leading-none">
          <span className="font-mono font-bold text-sm tracking-[3px] text-text-primary">
            {title}
          </span>
          <span className="font-mono font-light text-[9.5px] tracking-[1.5px] uppercase text-text-muted">
            {subtitle}
          </span>
        </div>
        <div className="w-px h-7 mx-2 bg-border" />
      </div>

      <div className="flex items-center gap-0.5">
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
