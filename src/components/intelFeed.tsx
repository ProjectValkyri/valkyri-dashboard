"use client";

import type { FeedFilter, IntelItem, Priority, IntelSource } from "@/types";
import { FILTERS, INTEL_DATA } from "@/lib/data";
import { Zap, MapPin } from "lucide-react";

const PRIORITY_COLOR: Record<Priority, string> = {
  high: "text-foreground",
  medium: "text-muted-foreground",
  low: "text-border",
};

const SOURCE_PILL_CLASS: Record<IntelSource, string> = {
  twitter: "bg-blue-500/10 text-blue-400 border border-blue-500/30",
  news: "bg-accent-amber/10 text-accent-amber border border-accent-amber/30",
  telegram: "bg-indigo-500/10 text-indigo-400 border border-indigo-500/30",
  osint: "bg-accent-green/10 text-accent-green border border-accent-green/30",
};

const PRIORITY_CLASS: Record<Priority, string> = {
  high: "bg-foreground",
  medium: "bg-muted-foreground",
  low: "bg-border",
};

function PriorityDot({
  level,
  blink = false,
}: {
  level: Priority;
  blink?: boolean;
}) {
  return (
    <span
      className={`w-[3px] h-[7px] rounded-full inline-block ${PRIORITY_CLASS[level]} ${
        blink ? "animate-pulse-red" : ""
      }`}
    />
  );
}

function FilterPill({
  filter,
  active,
  onClick,
}: {
  filter: FeedFilter;
  active: boolean;
  onClick: () => void;
}) {
  const label =
    filter === "all" ? "all" : filter.charAt(0).toUpperCase() + filter.slice(1);

  return (
    <button
      onClick={onClick}
      className={`
        font-mono text-[10.5px] tracking-[0.3px]
        px-2.5 py-1 rounded cursor-pointer
        transition-all duration-150 border
        ${
          active
            ? "bg-foreground text-background border-foreground font-medium"
            : "bg-transparent text-muted-foreground border-border hover:text-foreground hover:border-foreground"
        }
      `}
    >
      {label}
    </button>
  );
}

function IntelCard({ item, index }: { item: IntelItem; index: number }) {
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
        {/* Priority + time */}
        <div className="flex items-center gap-1.5 mb-2">
          <PriorityDot
            level={item.priorities[0]}
            blink={item.priorities[0] === "high"}
          />
          <PriorityDot level={item.priorities[1]} />
          <span className="font-mono text-[10px] tracking-[0.5px] text-muted-foreground ml-1">
            {item.time}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-foreground text-sm font-semibold leading-tight mb-1">
          {item.title}
        </h3>

        {/* Conflict */}
        <p className="font-mono text-[10.5px] tracking-[0.3px] text-muted-foreground opacity-80 mb-2">
          {item.conflict}
        </p>

        {/* Description */}
        <p className="text-muted-foreground text-xs leading-relaxed mb-2.5">
          {item.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {item.tags.map((tag, index) => (
              <span key={`${tag.label}-${index}`}
                className={`
                font-mono text-[10px] tracking-[0.3px] font-medium
                  px-2 py-0.5 rounded border
                    ${SOURCE_PILL_CLASS[item.source]}
                    `}
                  >
                {item.source.toUpperCase()}
              </span>
            ))}
          </div>

          <button
            className="
              w-5.5 h-5.5 flex items-center justify-center
              rounded border border-border bg-transparent
              text-muted-foreground text-sm cursor-pointer
              hover:text-foreground hover:border-foreground
              transition-all duration-150
            "
          >
            +
          </button>
        </div>
      </div>

      {/* Source */}
      <p className="font-mono text-[10px] tracking-[0.5px] text-muted-foreground opacity-50 px-3.5 pb-0.5 pt-1">
        {item.source}
      </p>
    </div>
  );
}

export default function IntelFeed({
  activeFilter,
  onFilterChange,
}: {
  activeFilter: FeedFilter;
  onFilterChange: (filter: FeedFilter) => void;
}) {
  return (
    <aside className="w-[370px] min-w-[370px] flex flex-col overflow-hidden bg-background border-r border-border">
      {/* Header */}
      <div className="px-4 pt-3.5 pb-2.5 border-b border-border">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2">
            <Zap size={15} className="text-muted-foreground" />
            <span className="font-mono text-xs tracking-[1.5px] font-semibold uppercase text-foreground">
              Intel Feed
            </span>
          </div>
          <span className="font-mono text-[10.5px] tracking-[0.5px] text-muted-foreground">
            global
          </span>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          {FILTERS.map((f) => (
            <FilterPill
              key={f}
              filter={f}
              active={activeFilter === f}
              onClick={() => onFilterChange(f)}
            />
          ))}
        </div>
      </div>

      {/* Status */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border">
        <span className="font-mono text-[10.5px] tracking-[0.5px] text-muted-foreground">
          {INTEL_DATA.length} items
        </span>

        <span className="flex items-center gap-1.5 font-mono text-[10px] tracking-[1px] font-medium uppercase text-foreground">
          <span className="w-1.5 h-1.5 bg-foreground rounded-full inline-block animate-pulse-green" />
          Connected
        </span>
      </div>

      {/* Cards */}
      <div className="flex-1 overflow-y-auto p-2 intel-feed-scroll">
        {INTEL_DATA.map((item, i) => (
          <IntelCard key={item.id} item={item} index={i} />
        ))}
      </div>
    </aside>
  );
}
