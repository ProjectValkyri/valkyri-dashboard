import {
  FileText,
  Bookmark,
  Clock,
  LayoutGrid,
  Layers,
  Code2,
  Settings,
} from "lucide-react";
import type { IntelItem, RailItem, FeedFilter } from "@/types";

export const RAIL_ITEMS: RailItem[] = [
  { id: "reports", label: "Reports", icon: FileText, badge: true },
  { id: "bookmarks", label: "Bookmarks", icon: Bookmark },
  { id: "timeline", label: "Timeline", icon: Clock },
  { id: "assets", label: "Assets", icon: LayoutGrid },
  { id: "sources", label: "Sources", icon: Layers },
];

export const RAIL_BOTTOM: RailItem[] = [
  { id: "integrations", label: "Integrations", icon: Code2 },
  { id: "settings", label: "Settings", icon: Settings },
];

export const FILTERS: FeedFilter[] = [
  "all", "news", "telegram", "osint", "analyst", "twitter",
];

export const INTEL_DATA: IntelItem[] = [
  {
    id: "1",
    title: "Humanitarian Corridor Update",
    conflict: "russo uk conflict new update",
    description: "New intelligence data received from multiple verified sources indicating ongoing developments.",
    priorities: ["high", "high"],
    tags: [{ label: "Analyst", type: "analyst" }],
    source: "Reuters",
    time: "Just now",
  },
  {
    id: "2",
    title: "Naval Operations Observed",
    conflict: "sudan genocide",
    description: "New intelligence data received from multiple verified sources indicating ongoing developments.",
    priorities: ["medium", "high"],
    tags: [
      { label: "Analyst", type: "analyst" },
      { label: "Baltic Sea", type: "location" },
    ],
    source: "AP News",
    time: "Just now",
  },
  {
    id: "3",
    title: "Communication Intercept",
    conflict: "eastern front signals activity",
    description: "Encrypted communications detected across monitored frequency bands with unusual patterns.",
    priorities: ["low", "medium"],
    tags: [
      { label: "OSINT", type: "analyst" },
      { label: "Donbas", type: "location" },
    ],
    source: "Telegram / OSINT",
    time: "2 min ago",
  },
  {
    id: "4",
    title: "Satellite Imagery Analysis",
    conflict: "troop movement confirmed",
    description: "New overhead imagery reveals significant asset repositioning along the northern corridor.",
    priorities: ["high", "high"],
    tags: [{ label: "Analyst", type: "analyst" }],
    source: "Maxar / Analyst",
    time: "5 min ago",
  },
];