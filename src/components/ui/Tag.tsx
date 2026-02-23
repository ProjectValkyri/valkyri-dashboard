"use client";

import type { LucideIcon } from "lucide-react";

export type TagVariant = "analyst" | "location" | "status";

const variantClasses: Record<TagVariant, string> = {
  analyst: "bg-white/[0.06] text-text-secondary border-0",
  location:
    "bg-transparent border border-border text-text-muted",
  status: "bg-white/[0.06] text-text-secondary border-0",
};

export interface TagProps {
  label: string;
  variant?: TagVariant;
  icon?: LucideIcon;
  className?: string;
}

export default function Tag({
  label,
  variant = "analyst",
  icon: Icon,
  className = "",
}: TagProps) {
  return (
    <span
      className={`
        font-mono text-[10px] tracking-[0.3px] font-medium
        px-2 py-0.5 rounded inline-flex items-center gap-1
        ${variantClasses[variant]} ${className}
      `.trim()}
    >
      {Icon && <Icon size={10} className="shrink-0" />}
      {label}
    </span>
  );
}
