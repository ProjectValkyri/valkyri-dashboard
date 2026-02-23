import type { LucideIcon } from "lucide-react";

export type FeedFilter = "all" | "news" | "telegram" | "osint" | "analyst" | "twitter";
export type IntelSource = "news" | "telegram" | "osint" | "twitter";
export type Priority = "high" | "medium" | "low";

export interface IntelItem {
  id: string;
  title: string;
  conflict: string;
  description: string;
  priorities: [Priority, Priority];
  tags: { label: string; type: "analyst" | "location" }[];
  source: IntelSource;
  time: string;
}

export interface RailItem {
  id: string;
  label: string;
  icon: LucideIcon;
  badge?: boolean;
}