"use client";

import type { LucideIcon } from "lucide-react";
import { Crosshair, TrendingUp, Sun, Table2, Menu, Key, TimerIcon } from "lucide-react";


function TopbarButton({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
  return (
    <button className="
      flex items-center gap-[7px] px-3 py-1.5
      bg-transparent border-none rounded cursor-pointer
      font-mono text-[11px] tracking-[0.5px]
      text-text-secondary hover:text-text-primary hover:bg-white/[0.04]
      transition-all duration-150
    ">
      <Icon size={15} className="opacity-60" />
      {label}
    </button>
  );
}

export default function Topbar({

}) {
  return (
    <header className="
      fixed top-0 left-0 right-0 h-[52px] z-50
      flex items-center justify-between px-4
      bg-bg-secondary border-b border-border
    ">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="flex flex-col leading-none">
          <span className="font-mono font-bold text-sm tracking-[3px] text-text-primary">
            VALKYRI
          </span>
          <span className="font-mono font-light text-[9.5px] tracking-[1.5px] uppercase text-text-muted">
            OSINT Dashboard
          </span>
        </div>
        <div className="w-px h-7 mx-2 bg-border" />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-0.5">
        <TopbarButton icon={Crosshair} label="POIs" />
        <TopbarButton icon={Sun} label="Layers" />
        <TopbarButton icon={Key} label="Key" />
        <TopbarButton icon={TimerIcon} label="Timeline" />
      </div>
    </header>
  );
}