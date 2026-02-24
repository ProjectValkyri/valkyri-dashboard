"use client";

import type { FeedFilter, IntelItem, Priority } from "@/types";
import {
  FILTERS,
  INTEL_DATA,
  FEED_SECTION_TITLE,
  FEED_STATUS_LABEL,
  FEED_REGION_DEFAULT,
} from "@/lib/data";
import { Zap, MapPin, Plus } from "lucide-react";
import { SegmentedControl, Tag, IconButton } from "@/components/ui";
import type { SegmentedOption } from "@/components/ui";

const PRIORITY_CLASS: Record<Priority, string> = {
  high: "bg-foreground",
  medium: "bg-muted-foreground",
  low: "bg-border",
};

function priorityToLabel(filter: FeedFilter): string {
  return filter === "all" ? "all" : filter.charAt(0).toUpperCase() + filter.slice(1);
}

function filterOptionsFromFilters(filters: FeedFilter[]): SegmentedOption[] {
  return filters.map((id) => ({ id, label: priorityToLabel(id) }));
}

function PriorityDot({
  level,
  blink = false,
}: {
  level: Priority;
  blink?: boolean;
}) {
  return (
    <span
      className={`w-[3px] h-[7px] rounded-full inline-block ${PRIORITY_CLASS[level]} ${blink ? "animate-pulse-red" : ""}`}
    />
  );
}

export interface IntelCardProps {
  item: IntelItem;
  index: number;
  onAction?: (item: IntelItem) => void;
}

export function IntelCard({ item, index, onAction }: IntelCardProps) {
  return (
    <div>
      <div
        className="
          bg-card border border-border rounded-lg p-3.5 mb-2
          cursor-pointer transition-all duration-200
          hover:border-foreground/40
          animate-fade-in-up
        "
        style={{ animationDelay: `${index * 0.05}s` }}
      >
        <div className="flex items-center gap-1.5 mb-2">
          <PriorityDot
            level={item.priorities[0]}
            blink={item.priorities[0] === "high" || item.priorities[0] === "medium"}
          />
          <PriorityDot level={item.priorities[1]} />
          <span className="font-mono text-[10px] tracking-[0.5px] text-muted-foreground ml-1">
            {item.time}
          </span>
        </div>

        <h3 className="text-foreground text-sm font-semibold leading-tight mb-1">
          {item.title}
        </h3>

        <p className="font-mono text-[10.5px] tracking-[0.3px] text-muted-foreground opacity-80 mb-2">
          {item.conflict}
        </p>

        <p className="text-muted-foreground text-xs leading-relaxed mb-2.5">
          {item.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {item.tags.map((tag) => (
              <Tag
                key={tag.label}
                label={tag.label}
                variant={tag.type}
                icon={tag.type === "location" ? MapPin : undefined}
              />
            ))}
          </div>
          <IconButton
            icon={Plus}
            size="sm"
            aria-label="Add or bookmark"
            onClick={(e) => {
              e.stopPropagation();
              onAction?.(item);
            }}
          />
        </div>
      </div>

      <p className="font-mono text-[10px] tracking-[0.5px] text-muted-foreground opacity-50 px-3.5 pb-0.5 pt-1">
        {item.source}
      </p>
    </div>
  );
}

export interface IntelFeedProps {
  activeFilter: FeedFilter;
  onFilterChange: (filter: FeedFilter) => void;
  items?: IntelItem[];
  filters?: FeedFilter[];
  sectionTitle?: string;
  regionLabel?: string;
  statusLabel?: string;
  onCardAction?: (item: IntelItem) => void;
}

export default function IntelFeed({
  activeFilter,
  onFilterChange,
  items = INTEL_DATA,
  filters = FILTERS,
  sectionTitle = FEED_SECTION_TITLE,
  regionLabel = FEED_REGION_DEFAULT,
  statusLabel = FEED_STATUS_LABEL,
  onCardAction,
}: IntelFeedProps) {
  const options = filterOptionsFromFilters(filters);
  const itemCount = items.length;

  return (
    <aside className="w-[370px] min-w-[370px] flex flex-col overflow-hidden bg-background border-r border-border">
      <div className="px-4 pt-3.5 pb-2.5 border-b border-border">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2">
            <Zap size={15} className="text-muted-foreground" />
            <span className="font-mono text-xs tracking-[1.5px] font-semibold uppercase text-foreground">
              {sectionTitle}
            </span>
          </div>
          <span className="font-mono text-[10.5px] tracking-[0.5px] text-muted-foreground">
            {regionLabel}
          </span>
        </div>
        <SegmentedControl
          options={options}
          value={activeFilter}
          onChange={(id) => onFilterChange(id as FeedFilter)}
        />
      </div>

      <div className="flex items-center justify-between px-4 py-2 border-b border-border">
        <span className="font-mono text-[10.5px] tracking-[0.5px] text-muted-foreground">
          {itemCount} items
        </span>
        <span className="flex items-center gap-1.5 font-mono text-[10px] tracking-[1px] font-medium uppercase text-foreground">
          <span className="w-1.5 h-1.5 bg-foreground rounded-full inline-block animate-pulse-green" />
          {statusLabel}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-2 intel-feed-scroll">
        {items.map((item, i) => (
          <IntelCard
            key={item.id}
            item={item}
            index={i}
            onAction={onCardAction}
          />
        ))}
      </div>
    </aside>
  );
}
