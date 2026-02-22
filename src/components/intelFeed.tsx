"use client";

import type { FeedFilter, IntelItem, Priority } from "@/types";
import { FILTERS, INTEL_DATA } from "@/lib/data";
import { Zap, MapPin } from "lucide-react";

const PRIORITY_CLASS: Record<Priority, string> = {
  high: "bg-accent-red",
  medium: "bg-accent-amber",
  low: "bg-text-muted",
};

function PriorityDot({ level, blink = false }: { level: Priority; blink?: boolean }) {
  return (
    <span className={`w-[3px] h-[7px] rounded-full inline-block ${PRIORITY_CLASS[level]} ${blink ? "animate-pulse-red" : ""}`} />
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
  const label = filter === "all" ? "all" : filter.charAt(0).toUpperCase() + filter.slice(1);
  return (
    <button
      onClick={onClick}
      className={`
        font-mono text-[10.5px] tracking-[0.3px]
        px-2.5 py-1 rounded cursor-pointer
        transition-all duration-150 border
        ${active
          ? "bg-text-primary text-bg-primary border-text-primary font-medium"
          : "bg-transparent text-text-secondary border-border hover:border-text-muted hover:text-text-primary"
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
          bg-bg-card border border-border-subtle rounded-lg p-3.5 mb-2
          cursor-pointer transition-all duration-200
          hover:bg-bg-card-hover hover:border-border
          animate-fade-in-up
        "
        style={{ animationDelay: `${index * 0.05}s` }}
      >
        {/* Priority + time */}
        <div className="flex items-center gap-1.5 mb-2">
          <PriorityDot level={item.priorities[0]} blink={item.priorities[0] === "high" || item.priorities[0] === "medium"} />
          <PriorityDot level={item.priorities[1]} />
          <span className="font-mono text-[10px] tracking-[0.5px] text-text-muted ml-1">
            {item.time}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-text-primary text-sm font-semibold leading-tight mb-1">
          {item.title}
        </h3>

        {/* Conflict — scarce red */}
        <p className="font-mono text-[10.5px] tracking-[0.3px] text-accent-red opacity-85 mb-2">
          {item.conflict}
        </p>

        {/* Description */}
        <p className="text-text-muted text-xs leading-relaxed mb-2.5">
          {item.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {item.tags.map((tag) => (
              <span
                key={tag.label}
                className={`
                  font-mono text-[10px] tracking-[0.3px] font-medium
                  px-2 py-0.5 rounded
                  ${tag.type === "analyst"
                    ? "bg-white/[0.06] text-text-secondary"
                    : "bg-transparent border border-border text-text-muted flex items-center gap-1"
                  }
                `}
              >
                {tag.type === "location" && <MapPin size={10} />}
                {tag.label}
              </span>
            ))}
          </div>
          <button className="
            w-[22px] h-[22px] flex items-center justify-center
            rounded border border-border bg-transparent
            text-text-muted text-sm cursor-pointer
            hover:text-text-primary hover:border-text-muted
            transition-all duration-150
          ">
            +
          </button>
        </div>
      </div>

      {/* Source */}
      <p className="font-mono text-[10px] tracking-[0.5px] text-text-muted opacity-50 px-3.5 pb-0.5 pt-1">
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
    <aside className="w-[370px] min-w-[370px] flex flex-col overflow-hidden bg-bg-secondary border-r border-border-subtle">
      {/* Header */}
      <div className="px-4 pt-3.5 pb-2.5 border-b border-border-subtle">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2">
            <Zap size={15} className="text-text-secondary" />
            <span className="font-mono text-xs tracking-[1.5px] font-semibold uppercase text-text-primary">
              Intel Feed
            </span>
          </div>
          <span className="font-mono text-[10.5px] tracking-[0.5px] text-text-muted">
            global
          </span>
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          {FILTERS.map((f) => (
            <FilterPill key={f} filter={f} active={activeFilter === f} onClick={() => onFilterChange(f)} />
          ))}
        </div>
      </div>

      {/* Status */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border-subtle">
        <span className="font-mono text-[10.5px] tracking-[0.5px] text-text-muted">
          {INTEL_DATA.length} items
        </span>
        <span className="flex items-center gap-1.5 font-mono text-[10px] tracking-[1px] font-medium uppercase text-accent-green">
          <span className="w-1.5 h-1.5 bg-accent-green rounded-full inline-block animate-pulse-green" />
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