"use client";

import type { LucideIcon } from "lucide-react";
import {
  Crosshair,
  Sun,
  Key,
  TimerIcon,
} from "lucide-react";

function TopbarButton({
  icon: Icon,
  label,
}: {
  icon: LucideIcon;
  label: string;
}) {
  return (
    <button
      className="
        flex items-center gap-1.75 px-3 py-1.5
        bg-transparent rounded
        font-mono text-[11px] tracking-[0.5px]
        text-muted-foreground
        hover:text-foreground hover:bg-card
        transition-all duration-150
      "
    >
      <Icon size={15} className="opacity-60" />
      {label}
    </button>
  );
}

export default function Topbar() {
  return (
    <header
      className="
        fixed top-0 left-0 right-0 h-13 z-50
        flex items-center justify-between px-4
        bg-background border-b border-border
        backdrop-blur supports-[backdrop-filter]:bg-background/80
      "
    >
      {/* Logo Section */}
      <div className="flex items-center gap-3">
        <div className="flex flex-col leading-none px-3">
          <span className="font-mono font-bold text-sm tracking-[3px] text-foreground">
            VALKYRI
          </span>
          <span className="font-mono font-light text-[9.5px] tracking-[1.5px] uppercase text-muted-foreground">
            OSINT Dashboard
          </span>
        </div>

        <div className="w-px h-7 mx-2 bg-border" />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1">
        <TopbarButton icon={Crosshair} label="POIs" />
        <TopbarButton icon={Sun} label="Layers" />
        <TopbarButton icon={Key} label="Key" />
        <TopbarButton icon={TimerIcon} label="Timeline" />
      </div>
    </header>
  );
}