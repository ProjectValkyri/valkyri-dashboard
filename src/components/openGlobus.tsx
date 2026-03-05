"use client";

import React, { useEffect, useRef } from "react";
import {
  Globe,
  Bing,
  control,
  OpenStreetMap,
  GlobusRgbTerrain,
} from "@openglobus/og";

const OpenGlobus = () => {
  const globeRef = useRef(null);

  useEffect(() => {
    if (!globeRef.current) return;

    const osm = new OpenStreetMap("osm");
    const bing = new Bing("bing");

    const globus = new Globe({
      target: globeRef.current,
      name: "Earth",
      controls: [
        new control.Navigation(),
        new control.KeyboardNavigation(),
        new control.EarthCoordinates(),
        new control.LayerSwitcher(),
        new control.ZoomControl(),
        new control.TouchNavigation(),
        new control.Sun(),
      ],
      terrain: new GlobusRgbTerrain(),
      layers: [osm, bing],
      atmosphereEnabled: true,
    });

    return () => globus.destroy();
  }, []);

  return <div ref={globeRef} className="w-full h-full absolute inset-0" />;
};

export default OpenGlobus;
