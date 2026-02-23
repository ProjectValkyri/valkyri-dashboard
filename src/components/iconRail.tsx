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
        rounded-lg cursor-pointer
        transition-all duration-150 relative
        border border-transparent
        ${
          active
            ? "bg-card text-foreground border-border"
            : "bg-transparent text-muted-foreground hover:bg-card hover:text-foreground"
        }
      `}
    >
      {item.badge && (
        <span className="absolute top-1.5 right-1.5 w-[7px] h-[7px] bg-foreground rounded-full border-2 border-background" />
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
    <nav className="w-14 min-w-[56px] flex flex-col items-center py-3 gap-1 bg-background border-r border-border">
      {RAIL_ITEMS.map((item) => (
        <RailButton
          key={item.id}
          item={item}
          active={activeId === item.id}
          onClick={() => onSelect(item.id)}
        />
      ))}

      <div className="flex-1" />
      <div className="w-6 h-px my-2 bg-border" />

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