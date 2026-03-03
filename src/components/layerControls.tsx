"use client";

import type { MapMode } from "@/types";
import { LAYER_OPTIONS, MAP_MODES } from "@/lib/data";
import { SegmentedControl, Toggle } from "@/components/ui";
import type { SegmentedOption } from "@/components/ui";

export interface LayerControlsProps {
  mapMode: MapMode;
  onMapModeChange: (mode: MapMode) => void;
  layerVisibility: Record<string, boolean>;
  onLayerVisibilityChange: (id: string, visible: boolean) => void;
  layerOpacity: number;
  onLayerOpacityChange: (value: number) => void;
  sectionTitle?: string;
  opacityLabel?: string;
  layerOptions?: { id: string; label: string; defaultOn: boolean }[];
  mapModeOptions?: SegmentedOption[];
}

const defaultMapModeOptions: SegmentedOption[] = MAP_MODES.map((m) => ({
  id: m.id,
  label: m.label,
}));

export default function LayerControls({
  mapMode,
  onMapModeChange,
  layerVisibility,
  onLayerVisibilityChange,
  layerOpacity,
  onLayerOpacityChange,
  sectionTitle = "Layer Controls",
  opacityLabel = "Layer Opacity",
  layerOptions = LAYER_OPTIONS,
  mapModeOptions = defaultMapModeOptions,
}: LayerControlsProps) {
  return (
    <div className="flex flex-col overflow-hidden h-full min-h-0">
      <div className="px-4 pt-3.5 pb-3 border-b border-border-subtle shrink-0">
        <span className="font-mono text-xs tracking-[1.5px] font-semibold uppercase text-text-primary">
          {sectionTitle}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
        <div>
          <p className="font-mono text-[10px] text-text-muted mb-2 uppercase tracking-wider">
            Map mode
          </p>
          <SegmentedControl
            options={mapModeOptions}
            value={mapMode}
            onChange={(id) => onMapModeChange(id as MapMode)}
          />
        </div>

        <div>
          <p className="font-mono text-[10px] text-text-muted mb-2 uppercase tracking-wider">
            Layers
          </p>
          <div className="space-y-2">
            {layerOptions.map((opt) => (
              <Toggle
                key={opt.id}
                id={`layer-${opt.id}`}
                label={opt.label}
                checked={layerVisibility[opt.id] ?? opt.defaultOn}
                onCheckedChange={(checked) =>
                  onLayerVisibilityChange(opt.id, checked)
                }
              />
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="font-mono text-[10px] text-text-muted">
              {opacityLabel}
            </label>
            <span className="font-mono text-[10px] text-text-secondary">
              {layerOpacity}%
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={layerOpacity}
            onChange={(e) => onLayerOpacityChange(Number(e.target.value))}
            className="w-full h-1.5 rounded-full appearance-none bg-bg-card accent-accent-green cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
