"use client";

import type { LucideIcon } from "lucide-react";
import { type ButtonHTMLAttributes, forwardRef } from "react";

export type ButtonVariant = "ghost" | "primary";
export type ButtonSize = "sm" | "md";

const variantClasses: Record<ButtonVariant, string> = {
  ghost:
    "bg-transparent text-text-secondary hover:text-text-primary hover:bg-white/[0.04] border-none",
  primary:
    "bg-text-primary text-bg-primary border border-text-primary hover:opacity-90",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-2.5 py-1 text-[10.5px]",
  md: "px-3 py-1.5 text-[11px]",
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  className?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "ghost",
      size = "md",
      icon: Icon,
      iconPosition = "left",
      className = "",
      children,
      ...rest
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type="button"
        className={`
          flex items-center gap-[7px] rounded cursor-pointer font-mono
          tracking-[0.5px] transition-all duration-150
          disabled:opacity-50 disabled:cursor-not-allowed
          ${variantClasses[variant]} ${sizeClasses[size]} ${className}
        `.trim()}
        {...rest}
      >
        {Icon && iconPosition === "left" && (
          <Icon size={size === "sm" ? 12 : 15} className="opacity-60 shrink-0" />
        )}
        {children}
        {Icon && iconPosition === "right" && (
          <Icon size={size === "sm" ? 12 : 15} className="opacity-60 shrink-0" />
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
