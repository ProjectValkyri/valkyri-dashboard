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
import { Modal } from "@/components/ui";

function initialLayerVisibility(): Record<string, boolean> {
  return Object.fromEntries(
    LAYER_OPTIONS.map((opt) => [opt.id, opt.defaultOn])
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
  const [openModal, setOpenModal] = useState<TopbarModalId>(null);

  const handleNavClick = (id: string) => {
    if (id === "frontlines" || id === "layers") {
      setOpenModal((current) => (current === id ? null : id));
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
        activeModalId={openModal}
        onNavClick={handleNavClick}
      />

      <div className="flex mt-[52px] h-[calc(100vh-52px)]">
        <IconRail activeId={activeRail} onSelect={setActiveRail} />
        <IntelFeed
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          items={intelItems}
        />
        <MapViewport mapMode={mapMode} layerOpacity={layerOpacity} />
      </div>

      <Modal
        open={openModal === "frontlines"}
        onClose={() => setOpenModal(null)}
        width={340}
      >
        <FrontlinePanel
          items={frontlineItems}
          onToggleVisibility={handleFrontlineToggleVisibility}
          onDelete={handleFrontlineDelete}
        />
      </Modal>

      <Modal
        open={openModal === "layers"}
        onClose={() => setOpenModal(null)}
        width={300}
      >
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
      </Modal>
    </div>
  );
}
