"use client";

import type { LucideIcon } from "lucide-react";
import { type ButtonHTMLAttributes, forwardRef } from "react";

export type IconButtonSize = "sm" | "md";

const sizeClasses: Record<IconButtonSize, string> = {
  sm: "w-[22px] h-[22px]",
  md: "w-10 h-10",
};

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: LucideIcon;
  size?: IconButtonSize;
  active?: boolean;
  badge?: boolean;
  "aria-label": string;
  className?: string;
}

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      icon: Icon,
      size = "md",
      active = false,
      badge = false,
      className = "",
      ...rest
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type="button"
        className={`
          flex items-center justify-center rounded-lg cursor-pointer
          transition-all duration-150 relative shrink-0
          ${sizeClasses[size]}
          ${active
            ? "text-text-primary bg-white/[0.06]"
            : "text-text-muted bg-transparent hover:text-text-secondary hover:bg-white/[0.04]"}
          ${size === "sm" ? "rounded border border-border hover:border-text-muted" : "border-none"}
          ${className}
        `.trim()}
        {...rest}
      >
        {badge && (
          <span
            className="absolute top-1.5 right-1.5 w-[7px] h-[7px] bg-accent-red rounded-full border-2 border-bg-secondary"
            aria-hidden
          />
        )}
        <Icon size={size === "sm" ? 14 : 20} />
      </button>
    );
  }
);

IconButton.displayName = "IconButton";

export default IconButton;
