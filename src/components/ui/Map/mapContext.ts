import { createContext, useContext } from "react";
import type * as MapLibre from "maplibre-gl";

export type MapLibreModule = typeof MapLibre;

export interface MapContextValue {
  /** The MapLibre map instance — null until it has been created. */
  map: MapLibre.Map | null;
  /** The loaded MapLibre module (for `new maplibre.Marker(...)` etc.). */
  maplibre: MapLibreModule | null;
  /** Bumped whenever the base style is (re)loaded, which wipes custom sources / layers — layers re-add themselves on change. */
  styleVersion: number;
  /** The element that holds the map (resolves CSS variables like `--color-accent-500`). */
  container: HTMLElement | null;
}

export const MapContext = createContext<MapContextValue>({ map: null, maplibre: null, styleVersion: 0, container: null });

/** The map instance and helpers for custom children. Only valid inside `<Map>`. */
export function useMap(): MapContextValue {
  return useContext(MapContext);
}
