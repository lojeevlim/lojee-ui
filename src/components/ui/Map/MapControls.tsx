import { useEffect } from "react";
import type * as MapLibre from "maplibre-gl";
import { useMap } from "./mapContext";
import { ALL_CONTROLS, type MapControlName } from "./mapTypes";

export interface MapControlsProps {
  /** Which controls to show (default: zoom, compass, locate and fullscreen). Also "scale" for a distance scale bar. */
  controls?: MapControlName[];
  /** Corner of the map for the button controls (default "top-right"). The scale bar is always bottom-left. */
  position?: MapLibre.ControlPosition;
}

const DEFAULT: MapControlName[] = ["zoom", "compass", "locate", "fullscreen"];

/** Zoom / compass / locate-me / fullscreen buttons and an optional scale bar. Render it inside `<Map>`. */
export function MapControls({ controls = DEFAULT, position = "top-right" }: MapControlsProps) {
  const { map, maplibre } = useMap();
  const key = controls.filter((c) => ALL_CONTROLS.includes(c)).sort().join(",");

  useEffect(() => {
    if (!map || !maplibre) return;
    const names = key ? (key.split(",") as MapControlName[]) : [];
    const added: MapLibre.IControl[] = [];
    const add = (c: MapLibre.IControl, pos: MapLibre.ControlPosition) => {
      map.addControl(c, pos);
      added.push(c);
    };
    if (names.includes("zoom") || names.includes("compass")) {
      add(new maplibre.NavigationControl({ showZoom: names.includes("zoom"), showCompass: names.includes("compass"), visualizePitch: true }), position);
    }
    if (names.includes("locate")) add(new maplibre.GeolocateControl({ positionOptions: { enableHighAccuracy: true }, trackUserLocation: true }), position);
    if (names.includes("fullscreen")) add(new maplibre.FullscreenControl({ container: map.getContainer().parentElement ?? undefined }), position);
    if (names.includes("scale")) add(new maplibre.ScaleControl({ unit: "metric" }), "bottom-left");
    return () => {
      for (const c of added) {
        try {
          map.removeControl(c);
        } catch {
          /* map already torn down */
        }
      }
    };
  }, [map, maplibre, key, position]);

  return null;
}
