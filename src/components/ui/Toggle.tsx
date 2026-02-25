"use client";

export interface ToggleProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label?: string;
  className?: string;
  id?: string;
}

export default function Toggle({
  checked,
  onCheckedChange,
  label,
  className = "",
  id,
}: ToggleProps) {
  const inputId = id ?? `toggle-${Math.random().toString(36).slice(2, 9)}`;
  return (
    <div className={`flex items-center justify-between gap-2 ${className}`.trim()}>
      {label && (
        <label
          htmlFor={inputId}
          className="font-mono text-[11px] tracking-[0.3px] text-text-secondary cursor-pointer"
        >
          {label}
        </label>
      )}
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        id={inputId}
        onClick={() => onCheckedChange(!checked)}
        className={`
          relative w-9 h-5 rounded-full border border-border
          transition-colors duration-150 cursor-pointer
          ${checked ? "bg-accent-green/30 border-accent-green" : "bg-bg-card"}
        `}
      >
        <span
          className={`
            absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-text-primary
            transition-transform duration-150
            ${checked ? "translate-x-4" : "translate-x-0"}
          `}
        />
      </button>
    </div>
  );
}
