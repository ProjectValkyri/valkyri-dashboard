"use client";

import type { RailItem } from "@/types";
import { RAIL_ITEMS, RAIL_BOTTOM } from "@/lib/data";
import { IconButton } from "@/components/ui";

export interface IconRailProps {
  activeId: string;
  onSelect: (id: string) => void;
  railItems?: RailItem[];
  bottomItems?: RailItem[];
}

export default function IconRail({
  activeId,
  onSelect,
  railItems = RAIL_ITEMS,
  bottomItems = RAIL_BOTTOM,
}: IconRailProps) {
  return (
    <nav className="w-14 min-w-[56px] flex flex-col items-center py-3 gap-0.5 bg-bg-secondary border-r border-border">
      {railItems.map((item) => (
        <IconButton
          key={item.id}
          icon={item.icon}
          size="md"
          active={activeId === item.id}
          badge={item.badge}
          aria-label={item.label}
          title={item.label}
          onClick={() => onSelect(item.id)}
        />
      ))}

      <div className="flex-1" />
      <div className="w-6 h-px my-1.5 bg-border-subtle" />

      {bottomItems.map((item) => (
        <IconButton
          key={item.id}
          icon={item.icon}
          size="md"
          active={activeId === item.id}
          badge={item.badge}
          aria-label={item.label}
          title={item.label}
          onClick={() => onSelect(item.id)}
        />
      ))}
    </nav>
  );
}
