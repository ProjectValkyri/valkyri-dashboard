"use client";

import type { RailItem } from "@/types";
import { RAIL_ITEMS, RAIL_BOTTOM } from "@/lib/data";

function RailButton({
  item,
  active,
  onClick,
}: {
  item: RailItem;
  active: boolean;
  onClick: () => void;
}) {
  const Icon = item.icon;
  return (
    <button
      onClick={onClick}
      title={item.label}
      className={`
        w-10 h-10 flex items-center justify-center
        rounded-lg border-none cursor-pointer
        transition-all duration-150 relative
        ${active
          ? "text-text-primary bg-white/[0.06]"
          : "text-text-muted bg-transparent hover:text-text-secondary hover:bg-white/[0.04]"
        }
      `}
    >
      {item.badge && (
        <span className="absolute top-1.5 right-1.5 w-[7px] h-[7px] bg-accent-red rounded-full border-2 border-bg-secondary" />
      )}
      <Icon size={20} />
    </button>
  );
}

export default function IconRail({
  activeId,
  onSelect,
}: {
  activeId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <nav className="w-14 min-w-[56px] flex flex-col items-center py-3 gap-0.5 bg-bg-secondary border-r border-border">
      {RAIL_ITEMS.map((item) => (
        <RailButton
          key={item.id}
          item={item}
          active={activeId === item.id}
          onClick={() => onSelect(item.id)}
        />
      ))}

      <div className="flex-1" />
      <div className="w-6 h-px my-1.5 bg-border-subtle" />

      {RAIL_BOTTOM.map((item) => (
        <RailButton
          key={item.id}
          item={item}
          active={activeId === item.id}
          onClick={() => onSelect(item.id)}
        />
      ))}
    </nav>
  );
}