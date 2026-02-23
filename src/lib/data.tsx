import {
  FileText,
  Bookmark,
  Clock,
  LayoutGrid,
  Layers,
  Code2,
  Settings,
  Crosshair,
  Sun,
  Key,
  TimerIcon,
  Activity,
} from "lucide-react";
import type {
  IntelItem,
  RailItem,
  FeedFilter,
  NavItem,
  FrontlineItem,
  LayerOption,
} from "@/types";

export const TOPBAR_NAV: NavItem[] = [
  { id: "pois", label: "POIs", icon: Crosshair },
  { id: "frontlines", label: "Frontlines", icon: Activity },
  { id: "layers", label: "Layers", icon: Sun },
  { id: "key", label: "Key", icon: Key },
  { id: "timeline", label: "Timeline", icon: TimerIcon },
];

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
  "all",
  "news",
  "telegram",
  "osint",
  "analyst",
  "twitter",
];

export const FEED_SECTION_TITLE = "Intel Feed";
export const FEED_STATUS_LABEL = "Connected";
export const FEED_REGION_DEFAULT = "global";

export const APP_TITLE = "VALKYRI";
export const APP_SUBTITLE = "OSINT Dashboard";

export const FRONTLINE_ITEMS: FrontlineItem[] = [
  {
    id: "fl1",
    title: "Eastern Front",
    location: "Donetsk Oblast",
    status: "active",
    control: "Contested",
    updatedAt: "2 hours ago",
    visible: true,
  },
  {
    id: "fl2",
    title: "Southern Front",
    location: "Zaporizhzhia Oblast",
    status: "static",
    control: "Ukrainian Forces",
    updatedAt: "1 day ago",
    visible: true,
  },
];

export const MAP_MODES = [
  { id: "wire", label: "Wire" },
  { id: "terrain", label: "Terrain" },
  { id: "satellite", label: "Satellite" },
] as const;

export const LAYER_OPTIONS: LayerOption[] = [
  { id: "poi", label: "Points of Interest", defaultOn: true },
  { id: "frontlines", label: "Frontlines", defaultOn: true },
  { id: "borders", label: "Borders", defaultOn: true },
  { id: "flight-paths", label: "Flight Paths", defaultOn: false },
  { id: "naval-routes", label: "Naval Routes", defaultOn: false },
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