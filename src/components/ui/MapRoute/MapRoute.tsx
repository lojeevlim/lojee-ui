import { useEffect, useId, useRef, useState } from "react";
import type * as MapLibre from "maplibre-gl";
import type { ColorName } from "../../../core/tokens";
import { useMap } from "../Map/mapContext";
import type { LngLat, MapRouteSummary } from "../Map/mapTypes";
import { lineLength, resolveColor, withAlpha } from "../Map/mapUtils";
import { fetchRoutes } from "../Map/routing";

export interface MapRouteProps {
  /** The line to draw, as `[lng, lat]` pairs. */
  coordinates?: LngLat[];
  /** Instead of `coordinates`: stops to route through. The road route between them is fetched from the public OSRM demo server (falls back to straight lines if it can't be reached). */
  waypoints?: LngLat[];
  /** Line color: a built-in color name (default "accent", which follows the theme) or any CSS color. */
  color?: ColorName | (string & {});
  /** Line width in px (default 4). */
  width?: number;
  /** Line opacity from 0 to 1 (default 0.85). */
  opacity?: number;
  /** Dash pattern as `[dash, gap]` in line widths, e.g. `[2, 2]`. */
  dashArray?: [number, number];
  /** 0 – 1: how much of the route has been travelled — the rest is drawn faded. Replaces `dashArray`. */
  progress?: number;
  /** Highlights the route: it is drawn with `activeWidth` / `activeOpacity` and above the others. */
  active?: boolean;
  /** Width while active (default: width + 2). */
  activeWidth?: number;
  /** Opacity while active (default 1). */
  activeOpacity?: number;
  /** Animate the dashes along the line, like marching ants. */
  animated?: boolean;
  /** Zoom the map to this route once its geometry is known. */
  fit?: boolean;
  /** Called when the route line is clicked. */
  onClick?: () => void;
  /** Called with the route's length (and travel time for `waypoints` routes) once its geometry is known. */
  onLoad?: (summary: MapRouteSummary) => void;
  /** Stable id, reported in `onLoad`. Defaults to a generated one. */
  id?: string;
}

// Dash patterns that, played in order, make a dashed line appear to flow.
const DASH_FRAMES: number[][] = [
  [0, 4, 3], [0.5, 4, 2.5], [1, 4, 2], [1.5, 4, 1.5], [2, 4, 1], [2.5, 4, 0.5], [3, 4, 0],
  [0, 0.5, 3, 3.5], [0, 1, 3, 3], [0, 1.5, 3, 2.5], [0, 2, 3, 2], [0, 2.5, 3, 1.5], [0, 3, 3, 1], [0, 3.5, 3, 0.5],
];

/** A line on the map — from coordinates, or fetched from OSRM between waypoints. Render it inside `<Map>`. */
export function MapRoute({
  coordinates,
  waypoints,
  color = "accent",
  width = 4,
  opacity = 0.85,
  dashArray,
  progress,
  active = false,
  activeWidth,
  activeOpacity = 1,
  animated = false,
  fit = false,
  onClick,
  onLoad,
  id,
}: MapRouteProps) {
  const { map, styleVersion, container } = useMap();
  const uid = useId().replace(/:/g, "");
  const routeId = id ?? `route-${uid}`;
  const layerBase = `lojee-${uid}`;
  const [fetched, setFetched] = useState<{ coordinates: LngLat[]; distance: number; duration: number } | null>(null);
  const handlers = useRef({ onClick, onLoad });
  useEffect(() => {
    handlers.current = { onClick, onLoad };
  });

  // Fetch the road route between waypoints.
  const wpKey = waypoints?.map((p) => p.join(",")).join(";") ?? "";
  useEffect(() => {
    const wps = wpKey ? (wpKey.split(";").map((p) => p.split(",").map(Number)) as LngLat[]) : [];
    if (wps.length < 2) return;
    const ac = new AbortController();
    fetchRoutes(wps, { signal: ac.signal })
      .then((r) => setFetched(r[0] ?? null))
      .catch(() => {
        if (!ac.signal.aborted) setFetched({ coordinates: wps, distance: lineLength(wps), duration: 0 });
      });
    return () => ac.abort();
  }, [wpKey]);

  const coords = coordinates ?? (wpKey ? fetched?.coordinates : undefined);
  const coordKey = coords ? coords.map((p) => p.join(",")).join(";") : "";

  // Report the geometry once it is known, and optionally zoom to it.
  useEffect(() => {
    if (!coords || coords.length < 2) return;
    handlers.current.onLoad?.({ id: routeId, distance: fetched && !coordinates ? fetched.distance : lineLength(coords), duration: fetched && !coordinates ? fetched.duration : undefined, coordinates: coords });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coordKey]);
  useEffect(() => {
    if (!fit || !map || !coords || coords.length < 2) return;
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const [x, y] of coords) {
      minX = Math.min(minX, x); maxX = Math.max(maxX, x); minY = Math.min(minY, y); maxY = Math.max(maxY, y);
    }
    map.fitBounds([[minX, minY], [maxX, maxY]], { padding: 60, duration: 700, maxZoom: 16 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fit, map, coordKey]);

  // Draw: a soft casing, the visible line, and a wide invisible layer to make clicking easy.
  const w = active ? activeWidth ?? width + 2 : width;
  const o = active ? activeOpacity : opacity;
  const dashKey = dashArray ? dashArray.join(",") : "";
  useEffect(() => {
    if (!map || !container || !coords || coords.length < 2 || styleVersion === 0) return;
    const line = resolveColor(container, color);
    const casing = resolveColor(container, "var(--lojee-surface)");
    const lineId = `${layerBase}-line`;
    const hitId = `${layerBase}-hit`;
    const casingId = `${layerBase}-casing`;
    const sourceId = `${layerBase}-src`;
    try {
      map.addSource(sourceId, { type: "geojson", lineMetrics: true, data: { type: "Feature", properties: {}, geometry: { type: "LineString", coordinates: coords } } });
      map.addLayer({ id: casingId, type: "line", source: sourceId, layout: { "line-cap": "round", "line-join": "round" }, paint: { "line-color": casing, "line-width": w + 3, "line-opacity": 0.7 * o } });
      const paint: MapLibre.LineLayerSpecification["paint"] = { "line-width": w, "line-opacity": o };
      if (typeof progress === "number") {
        paint["line-gradient"] = ["step", ["line-progress"], line, Math.min(1, Math.max(0, progress)) || 0.0001, withAlpha(line, 0.3)];
      } else {
        paint["line-color"] = line;
        if (dashKey) paint["line-dasharray"] = dashKey.split(",").map(Number);
      }
      map.addLayer({ id: lineId, type: "line", source: sourceId, layout: { "line-cap": dashKey ? "butt" : "round", "line-join": "round" }, paint });
      map.addLayer({ id: hitId, type: "line", source: sourceId, paint: { "line-width": 18, "line-opacity": 0 } });
    } catch {
      return;
    }
    const click = () => handlers.current.onClick?.();
    const enter = () => (map.getCanvas().style.cursor = "pointer");
    const leave = () => (map.getCanvas().style.cursor = "");
    map.on("click", hitId, click);
    map.on("mouseenter", hitId, enter);
    map.on("mouseleave", hitId, leave);

    let raf = 0;
    if (animated && typeof progress !== "number" && !window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      let step = -1;
      const tick = (t: number) => {
        const next = Math.floor((t / 60) % DASH_FRAMES.length);
        if (next !== step && map.getLayer(lineId)) {
          step = next;
          map.setPaintProperty(lineId, "line-dasharray", DASH_FRAMES[next]);
        }
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(raf);
      try {
        map.off("click", hitId, click);
        map.off("mouseenter", hitId, enter);
        map.off("mouseleave", hitId, leave);
        for (const l of [hitId, lineId, casingId]) if (map.getLayer(l)) map.removeLayer(l);
        if (map.getSource(sourceId)) map.removeSource(sourceId);
      } catch {
        /* style was replaced — its layers are already gone */
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, container, styleVersion, coordKey, color, w, o, dashKey, progress, animated, layerBase]);

  return null;
}
