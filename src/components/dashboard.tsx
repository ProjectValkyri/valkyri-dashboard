"use client";

import { useState } from "react";
import type { FeedFilter, FrontlineItem, MapMode } from "@/types";
import {
  INTEL_DATA,
  FRONTLINE_ITEMS,
  LAYER_OPTIONS,
} from "@/lib/data";
import Topbar from "@/components/topBar";
import type { TopbarModalId } from "@/components/topBar";
import IconRail from "@/components/iconRail";
import IntelFeed from "@/components/intelFeed";
import FrontlinePanel from "@/components/FrontlinePanel";
import MapViewport from "@/components/mapViewport";
import LayerControls from "@/components/LayerControls";
import { IconButton } from "@/components/ui";
import { X } from "lucide-react";

function initialLayerVisibility(): Record<string, boolean> {
  return Object.fromEntries(
    LAYER_OPTIONS.map((opt) => [opt.id, opt.defaultOn])
  );
}

function MapPanel({
  onClose,
  children,
  className = "",
}: {
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`
        absolute right-4 top-4 bottom-4 z-10 flex flex-col
        rounded-lg border border-border bg-bg-secondary shadow-xl
        overflow-hidden
        ${className}
      `.trim()}
    >
      <div className="flex items-center justify-end px-2 pt-2 pb-0 shrink-0">
        <IconButton
          icon={X}
          size="sm"
          aria-label="Close"
          onClick={onClose}
        />
      </div>
      <div className="flex-1 min-h-0 overflow-hidden flex flex-col">
        {children}
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [activeFilter, setActiveFilter] = useState<FeedFilter>("all");
  const [activeRail, setActiveRail] = useState("reports");
  const [intelItems] = useState(INTEL_DATA);
  const [frontlineItems, setFrontlineItems] =
    useState<FrontlineItem[]>(FRONTLINE_ITEMS);
  const [mapMode, setMapMode] = useState<MapMode>("wire");
  const [layerVisibility, setLayerVisibility] = useState(
    initialLayerVisibility
  );
  const [layerOpacity, setLayerOpacity] = useState(100);
  const [openPanel, setOpenPanel] = useState<TopbarModalId>(null);

  const handleNavClick = (id: string) => {
    if (id === "frontlines" || id === "layers") {
      setOpenPanel((current) => (current === id ? null : id));
    }
  };

  const handleFrontlineToggleVisibility = (id: string, visible: boolean) => {
    setFrontlineItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, visible } : item
      )
    );
  };

  const handleFrontlineDelete = (id: string) => {
    setFrontlineItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="h-screen w-screen overflow-hidden">
      <Topbar
        activeModalId={openPanel}
        onNavClick={handleNavClick}
      />

      <div className="flex mt-[52px] h-[calc(100vh-52px)]">
        <IconRail activeId={activeRail} onSelect={setActiveRail} />
        <IntelFeed
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          items={intelItems}
        />
        <div className="flex-1 relative overflow-hidden">
          <MapViewport mapMode={mapMode} layerOpacity={layerOpacity} />

          {openPanel === "frontlines" && (
            <MapPanel onClose={() => setOpenPanel(null)} className="w-[340px]">
              <FrontlinePanel
                items={frontlineItems}
                onToggleVisibility={handleFrontlineToggleVisibility}
                onDelete={handleFrontlineDelete}
              />
            </MapPanel>
          )}

          {openPanel === "layers" && (
            <MapPanel onClose={() => setOpenPanel(null)} className="w-[300px]">
              <LayerControls
                mapMode={mapMode}
                onMapModeChange={setMapMode}
                layerVisibility={layerVisibility}
                onLayerVisibilityChange={(id, visible) =>
                  setLayerVisibility((prev) => ({ ...prev, [id]: visible }))
                }
                layerOpacity={layerOpacity}
                onLayerOpacityChange={setLayerOpacity}
              />
            </MapPanel>
          )}
        </div>
      </div>
    </div>
  );
}
