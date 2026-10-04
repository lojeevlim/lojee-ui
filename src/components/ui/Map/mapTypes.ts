import type { ColorName } from "../../../core/tokens";

/** A position as `[longitude, latitude]` — the order MapLibre and GeoJSON use. */
export type LngLat = [number, number];

/** Data for a marker (used by `Map`'s `markers` prop and the `<l-map>` Web Component). */
export interface MapMarkerData {
  /** Stable id, reported back by marker events. Defaults to the marker's index. */
  id?: string;
  lng: number;
  lat: number;
  /** Text shown under the pin. */
  label?: string;
  /** Pin color: a built-in color name (including "accent", the default) or any CSS color. */
  color?: ColorName | (string & {});
  /** Text shown in a popup when the marker is clicked. */
  popup?: string;
  /** Text shown in a small bubble while hovering the marker. */
  tooltip?: string;
  /** Icon name from the library's icon set, drawn inside the pin (e.g. "home"). */
  icon?: string;
  /** Let the marker be dragged to a new position. */
  draggable?: boolean;
}

/** Data for a route line (used by `Map`'s `routes` prop and the `<l-map>` Web Component). */
export interface MapRouteData {
  id?: string;
  /** The line to draw, as `[lng, lat]` pairs. */
  coordinates?: LngLat[];
  /** Instead of `coordinates`: the points to travel through, in order — `[A, B]` or any number of stops (A → B → C …). The route between them follows the real roads (fetched from the public OSRM demo servers). */
  waypoints?: LngLat[];
  /** Which route to pick when there are alternatives: "shortest" (default) or "fastest". */
  prefer?: "shortest" | "fastest";
  /** "driving" (default), "cycling" or "walking". */
  profile?: "driving" | "cycling" | "walking";
  /** Base URL of your own OSRM server (replaces the public demo servers). */
  routingUrl?: string;
  color?: ColorName | (string & {});
  /** Line width in px (default 4). */
  width?: number;
  /** Line opacity from 0 to 1 (default 0.85). */
  opacity?: number;
  /** Dash pattern as `[dash, gap]` in line widths, e.g. `[2, 2]`. */
  dashArray?: [number, number];
  /** 0 – 1: how much of the route has been travelled. The rest is drawn faded. */
  progress?: number;
  /** Highlights the route (uses `activeWidth` / `activeOpacity`). */
  active?: boolean;
  activeWidth?: number;
  activeOpacity?: number;
  /** Animate the line: `true` / `"flow"` for marching dashes, or `"draw"`, `"pulse"`, `"trail"`, `"glow"`, `"shimmer"`. */
  animated?: boolean | RouteAnimation;
  /** Animation speed multiplier (default 1). */
  animationSpeed?: number;
  /** Direction the animation travels (default "forward"). */
  animationDirection?: "forward" | "reverse";
}

/** Animated route styles. */
export type RouteAnimation = "flow" | "draw" | "pulse" | "trail" | "glow" | "shimmer";

/** What a route reports once its geometry is known. */
export interface MapRouteSummary {
  id: string;
  /** Length in metres. */
  distance: number;
  /** Estimated travel time in seconds (only for fetched `waypoints` routes). */
  duration?: number;
  coordinates: LngLat[];
}

export interface MapViewState {
  center: LngLat;
  zoom: number;
  pitch: number;
  bearing: number;
}

export type MapControlName = "zoom" | "compass" | "locate" | "fullscreen" | "scale" | "style";
export const ALL_CONTROLS: MapControlName[] = ["zoom", "compass", "locate", "fullscreen", "scale", "style"];
