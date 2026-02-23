"use client";

import type { FrontlineItem } from "@/types";
import { FRONTLINE_ITEMS } from "@/lib/data";
import { Activity, Plus, Eye, EyeOff, Trash2 } from "lucide-react";
import { Button, IconButton, Tag } from "@/components/ui";

export interface FrontlinePanelProps {
  items?: FrontlineItem[];
  onAddLine?: () => void;
  onToggleVisibility?: (id: string, visible: boolean) => void;
  onDelete?: (id: string) => void;
  sectionTitle?: string;
  addButtonLabel?: string;
}

export default function FrontlinePanel({
  items = FRONTLINE_ITEMS,
  onAddLine,
  onToggleVisibility,
  onDelete,
  sectionTitle = "Frontline Tracking",
  addButtonLabel = "Add Line",
}: FrontlinePanelProps) {
  const activeCount = items.filter((i) => i.status === "active").length;
  const staticCount = items.filter((i) => i.status === "static").length;
  const visibleCount = items.filter((i) => i.visible).length;

  return (
    <div className="flex flex-col overflow-hidden h-full min-h-0">
      <div className="px-4 pt-3.5 pb-2.5 border-b border-border-subtle shrink-0">
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <Activity size={15} className="text-text-secondary" />
            <span className="font-mono text-xs tracking-[1.5px] font-semibold uppercase text-text-primary">
              {sectionTitle}
            </span>
          </div>
          <Button
            variant="primary"
            size="sm"
            icon={Plus}
            iconPosition="left"
            onClick={onAddLine}
          >
            {addButtonLabel}
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2 intel-feed-scroll">
        {items.map((item) => (
          <div
            key={item.id}
            className="
              bg-bg-card border border-border-subtle rounded-lg p-3 mb-2
              hover:bg-bg-card-hover hover:border-border
              transition-all duration-200
            "
          >
            <div className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-text-muted mt-1.5 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-mono text-[11px] font-medium text-text-primary">
                  {item.title}
                </p>
                <p className="font-mono text-[10px] text-text-muted mt-0.5">
                  {item.location}
                </p>
                <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                  <Tag label={item.status} variant="status" />
                  <Tag label={item.control} variant="status" />
                </div>
                <p className="font-mono text-[9px] text-text-muted mt-1.5">
                  Updated: {item.updatedAt}
                </p>
              </div>
              <div className="flex items-center gap-0.5 shrink-0">
                <IconButton
                  icon={item.visible ? Eye : EyeOff}
                  size="sm"
                  aria-label={item.visible ? "Hide" : "Show"}
                  onClick={() =>
                    onToggleVisibility?.(item.id, !item.visible)
                  }
                />
                <IconButton
                  icon={Trash2}
                  size="sm"
                  aria-label="Delete"
                  onClick={() => onDelete?.(item.id)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="px-4 py-2 border-t border-border-subtle flex items-center gap-3 font-mono text-[10px] text-text-muted shrink-0">
        <span>{activeCount} Active</span>
        <span>{staticCount} Static</span>
        <span>{visibleCount} Visible</span>
      </div>
    </div>
  );
}
