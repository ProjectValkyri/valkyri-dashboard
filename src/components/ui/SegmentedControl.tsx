"use client";

export interface SegmentedOption {
  id: string;
  label: string;
}

export interface SegmentedControlProps {
  options: SegmentedOption[];
  value: string;
  onChange: (id: string) => void;
  className?: string;
  optionClassName?: string;
}

export default function SegmentedControl({
  options,
  value,
  onChange,
  className = "",
  optionClassName = "",
}: SegmentedControlProps) {
  return (
    <div
      className={`flex items-center gap-1.5 flex-wrap ${className}`.trim()}
      role="group"
      aria-label="Segmented control"
    >
      {options.map((opt) => {
        const active = value === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            role="option"
            aria-selected={active}
            onClick={() => onChange(opt.id)}
            className={`
              font-mono text-[10.5px] tracking-[0.3px]
              px-2.5 py-1 rounded cursor-pointer
              transition-all duration-150 border
              ${active
                ? "bg-foreground text-background border-foreground font-medium"
                : "bg-transparent text-muted-foreground border-border hover:text-foreground hover:border-foreground"}
              ${optionClassName}
            `.trim()}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
