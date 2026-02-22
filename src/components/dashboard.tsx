"use client";

import { useState } from "react";
import type { FeedFilter } from "@/types";
import Topbar from "@/components/topBar";
import IconRail from "@/components/iconRail";
import IntelFeed from "@/components/intelFeed";
import MapViewport from "@/components/mapViewport";

export default function Dashboard() {
  const [activeFilter, setActiveFilter] = useState<FeedFilter>("all");
  const [activeRail, setActiveRail] = useState("reports");

  return (
    <div className="h-screen w-screen overflow-hidden">
      <Topbar />

      <div className="flex mt-[52px] h-[calc(100vh-52px)]">
        <IconRail activeId={activeRail} onSelect={setActiveRail} />
        <IntelFeed activeFilter={activeFilter} onFilterChange={setActiveFilter} />
        <MapViewport />
      </div>
    </div>
  );
}