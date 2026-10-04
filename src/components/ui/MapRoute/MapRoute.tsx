import { useEffect, useId, useRef, useState } from "react";
import type * as MapLibre from "maplibre-gl";
import type { ColorName } from "../../../core/tokens";
import { useMap } from "../Map/mapContext";
import type { LngLat, MapRouteSummary, RouteAnimation } from "../Map/mapTypes";
import { clamp01, distanceMeters, easeInOutCubic, lineLength, luminance, pointAlong, resolveColor, shade, smoothstep, withAlpha } from "../Map/mapUtils";
import { fetchBestRoute, type RoutePreference, type RouteProfile } from "../Map/routing";

export interface MapRouteProps {
  /** The line to draw, as `[lng, lat]` pairs. */
  coordinates?: LngLat[];
  /** The points to travel through, in order, as `[lng, lat]` pairs — `[A, B]` for a trip from A to B, `[A, B, C, D]` for any number of stops. The route between them follows the real roads (fetched from the public OSRM demo servers; falls back to straight lines if they can't be reached). Use this instead of `coordinates`. */
  waypoints?: LngLat[];
  /** Which route to draw when there are alternatives between two points: "shortest" (least distance) or "fastest" (least travel time) (default: "shortest"). Alternatives only exist for a trip of exactly two points. */
  prefer?: RoutePreference;
  /** How the trip is made: "driving", "cycling" or "walking" — each uses roads / paths that mode may take (default: "driving"). */
  profile?: RouteProfile;
  /** Base URL of your own OSRM routing server, e.g. "https://osrm.example.com/route/v1/driving" — replaces the public demo servers (use this in production). */
  routingUrl?: string;
  /** Called when the road route could not be fetched (the line then falls back to straight segments between the points). */
  onRouteError?: (error: Error) => void;
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
  /** Animate the line: `true` / `"flow"` for marching dashes, or `"draw"` (draws on), `"pulse"` (a light comet), `"trail"` (a tracer over a ghost line), `"glow"` (breathing halo) or `"shimmer"` (a soft sheen). With `progress`, the animation plays over the travelled part only. */
  animated?: boolean | RouteAnimation;
  /** Animation speed multiplier (default 1). */
  animationSpeed?: number;
  /** Direction the animation travels (default "forward"). */
  animationDirection?: "forward" | "reverse";
  /** Zoom the map to this route once its geometry is known. */
  fit?: boolean;
  /** Called when the route line is clicked. */
  onClick?: () => void;
  /** Called with the route's length (and travel time for `waypoints` routes) once its geometry is known. */
  onLoad?: (summary: MapRouteSummary) => void;
  /** Stable id, reported in `onLoad`. Defaults to a generated one. */
  id?: string;
}

// Dash patterns that, played in order, make a dashed line appear to flow: a 7-unit pattern shifted in quarter steps.
const DASH_FRAMES: number[][] = Array.from({ length: 28 }, (_, k) => {
  const s = k * 0.25;
  return s <= 3 ? [s, 4, 3 - s] : [0, s - 3, 3, 4 - (s - 3)];
});

type RGB = [number, number, number];
const parseRgb = (c: string): RGB => {
  const m = c.match(/(\d+)[ ,]+(\d+)[ ,]+(\d+)/);
  return m ? [Number(m[1]), Number(m[2]), Number(m[3])] : [128, 128, 128];
};
const mixRgb = (a: RGB, b: RGB, k: number): RGB => [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k, a[2] + (b[2] - a[2]) * k];
const rgbaStr = (c: RGB, a: number) => `rgba(${Math.round(c[0])}, ${Math.round(c[1])}, ${Math.round(c[2])}, ${clamp01(a).toFixed(3)})`;

/** Sample `fn` (position 0 – 1 → [color, alpha]) into a smooth `line-gradient` expression. */
type Sample = [RGB, number];
function ramp(fn: (pos: number) => Sample, reverse: boolean, line: RGB, prog?: number) {
  const e: unknown[] = ["interpolate", ["linear"], ["line-progress"]];
  const n = prog === undefined ? 48 : 96;
  for (let i = 0; i < n; i++) {
    const s = i / (n - 1);
    const pos = reverse ? 1 - s : s;
    let [c, a] = fn(prog === undefined ? pos : pos / Math.max(prog, 0.001));
    if (prog !== undefined) {
      // Beyond the travelled part the line is drawn faded, with a slightly soft edge.
      const m = 1 - smoothstep(prog - 0.012, prog + 0.012, s);
      c = mixRgb(line, c, m);
      a = 0.3 + (a - 0.3) * m;
    }
    e.push(s, rgbaStr(c, a));
  }
  return e as MapLibre.ExpressionSpecification;
}

/** A bright head at `c` with a tail of length `tail` behind it (0 – 1 intensity). */
const comet = (p: number, c: number, tail: number) => {
  const d = c - p;
  return d < 0 ? 1 - smoothstep(0, 0.025, -d) : Math.pow(1 - smoothstep(0, tail, d), 1.6);
};

const PERIOD: Record<Exclude<RouteAnimation, "flow" | "glow">, number> = { draw: 3.2, pulse: 2.4, trail: 2.0, shimmer: 2.8 };

/** The gradient for one frame of a gradient animation at phase `u` (0 – 1). With `prog`, it plays over the travelled part only. */
function animatedGradient(kind: keyof typeof PERIOD, u: number, line: RGB, bright: RGB, reverse: boolean, prog?: number) {
  switch (kind) {
    case "pulse": {
      const c = u * 1.3;
      return ramp((p) => { const i = comet(p, c, 0.3); return [mixRgb(line, bright, i), 0.55 + 0.45 * i]; }, reverse, line, prog);
    }
    case "trail": {
      const c = u * 1.22;
      return ramp((p) => { const i = comet(p, c, 0.22); return [mixRgb(line, bright, 0.35 * i), 0.18 + 0.82 * i]; }, reverse, line, prog);
    }
    case "shimmer": {
      const c = -0.3 + u * 1.6;
      return ramp((p) => { const i = 1 - smoothstep(0, 0.3, Math.abs(p - c)); return [mixRgb(line, bright, 0.6 * i), 1]; }, reverse, line, prog);
    }
    case "draw": {
      const head = u < 0.72 ? -0.03 + 1.06 * easeInOutCubic(u / 0.72) : 1.03;
      const fade = 1 - smoothstep(0.88, 1, u);
      return ramp((p) => {
        const a = 1 - smoothstep(head, head + 0.03, p);
        const edge = a * smoothstep(head - 0.12, head, p);
        return [mixRgb(line, bright, 0.5 * edge), (0.12 + 0.88 * a) * (0.12 + 0.88 * fade)];
      }, reverse, line, prog);
    }
  }
}

/** Gradient for a static progress value, with a slightly soft edge. */
function progressGradient(p: number, line: string, faded: string): MapLibre.ExpressionSpecification {
  if (p <= 0.0005) return ["interpolate", ["linear"], ["line-progress"], 0, faded, 1, faded] as MapLibre.ExpressionSpecification;
  if (p >= 0.9995) return ["interpolate", ["linear"], ["line-progress"], 0, line, 1, line] as MapLibre.ExpressionSpecification;
  const f = 0.012;
  const a = Math.max(0.0001, p - f);
  const b = Math.min(0.9999, p + f);
  return ["interpolate", ["linear"], ["line-progress"], 0, line, a, line, b, faded, 1, faded] as MapLibre.ExpressionSpecification;
}

/** The first `fraction` (0 – 1) of a line, measured by distance. */
function sliceLine(coords: LngLat[], fraction: number): LngLat[] {
  const target = lineLength(coords) * Math.min(1, Math.max(0, fraction));
  const out: LngLat[] = [coords[0]];
  if (fraction <= 0) return [coords[0], coords[0]];
  let walked = 0;
  for (let i = 1; i < coords.length; i++) {
    const seg = distanceMeters(coords[i - 1], coords[i]);
    if (walked + seg >= target) {
      out.push(pointAlong(coords, fraction));
      return out;
    }
    walked += seg;
    out.push(coords[i]);
  }
  return out;
}

/** A line on the map — from coordinates, or fetched from OSRM between waypoints. Render it inside `<Map>`. */
export function MapRoute({
  coordinates,
  waypoints,
  prefer = "shortest",
  profile = "driving",
  routingUrl,
  onRouteError,
  color = "accent",
  width = 4,
  opacity = 0.85,
  dashArray,
  progress,
  active = false,
  activeWidth,
  activeOpacity = 1,
  animated = false,
  animationSpeed = 1,
  animationDirection = "forward",
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
  const handlers = useRef({ onClick, onLoad, onRouteError });
  useEffect(() => {
    handlers.current = { onClick, onLoad, onRouteError };
  });

  // Fetch the road route through the waypoints (A → B → C …).
  const wpKey = waypoints?.map((p) => p.join(",")).join(";") ?? "";
  useEffect(() => {
    const wps = wpKey ? (wpKey.split(";").map((p) => p.split(",").map(Number)) as LngLat[]) : [];
    if (wps.length < 2) return;
    const ac = new AbortController();
    fetchBestRoute(wps, { prefer, profile, baseUrl: routingUrl, signal: ac.signal })
      .then((r) => setFetched(r ?? { coordinates: wps, distance: lineLength(wps), duration: 0 }))
      .catch((err: Error) => {
        if (ac.signal.aborted) return;
        setFetched({ coordinates: wps, distance: lineLength(wps), duration: 0 });
        handlers.current.onRouteError?.(err);
      });
    return () => ac.abort();
  }, [wpKey, prefer, profile, routingUrl]);

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

  // Reduced motion: re-evaluated live, so toggling the OS setting takes effect without a remount.
  const [reduced, setReduced] = useState(() => !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches);
  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mq) return;
    const on = () => setReduced(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  // Follow the theme: when the page theme changes what the line / casing colors resolve to, redraw with the new ones.
  const [themeTick, setThemeTick] = useState(0);
  useEffect(() => {
    if (!container) return;
    const read = () => resolveColor(container, color) + resolveColor(container, "var(--lojee-surface)");
    let prev = read();
    let raf = 0;
    const obs = new MutationObserver(() => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const next = read();
        if (next !== prev) {
          prev = next;
          setThemeTick((t) => t + 1);
        }
      });
    });
    const opts = { attributes: true, attributeFilter: ["class", "style", "data-theme", "data-accent"] };
    let node: Element | null = container;
    while (node) {
      obs.observe(node, opts);
      node = node.parentElement;
    }
    return () => {
      cancelAnimationFrame(raf);
      obs.disconnect();
    };
  }, [container, color]);

  // Draw: a soft casing, the visible line, and a wide invisible layer to make clicking easy.
  const w = active ? activeWidth ?? width + 2 : width;
  const o = active ? activeOpacity : opacity;
  const dashKey = dashArray ? dashArray.join(",") : "";
  const hasProgress = typeof progress === "number";
  const requested: RouteAnimation | null = animated === true ? "flow" : animated || null;
  const kind: RouteAnimation | null = reduced || !requested ? null : requested;
  const reverse = animationDirection === "reverse";
  const speed = animationSpeed > 0 ? animationSpeed : 1;
  const live = useRef({ w, o, progress });
  useEffect(() => {
    live.current = { w, o, progress };
  });
  const kick = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (!map || !container || !coords || coords.length < 2 || styleVersion === 0) return;
    const lineColor = resolveColor(container, color);
    const casing = resolveColor(container, "var(--lojee-surface)");
    const lineRgb = parseRgb(lineColor);
    const light = luminance(lineColor) > 170;
    const bright: RGB = light ? mixRgb(lineRgb, [0, 0, 0], 0.5) : mixRgb(lineRgb, [255, 255, 255], 0.7);
    const faded = withAlpha(lineColor, 0.3);
    const lineId = `${layerBase}-line`;
    const hitId = `${layerBase}-hit`;
    const casingId = `${layerBase}-casing`;
    const haloId = `${layerBase}-halo`;
    const sourceId = `${layerBase}-src`;
    const flowId = `${layerBase}-flow`;
    const flowSrc = `${layerBase}-flow-src`;
    const gradientKind = kind && kind !== "flow" && kind !== "glow" ? kind : null;
    const useGradient = hasProgress || !!gradientKind;
    const snap = { ...live.current };
    let shown = hasProgress ? clamp01(snap.progress ?? 0) : 0;
    const instant = { "line-width-transition": { duration: 0, delay: 0 }, "line-opacity-transition": { duration: 0, delay: 0 } };
    const noTransition = kind === "glow" ? instant : {};
    try {
      map.addSource(sourceId, { type: "geojson", lineMetrics: true, data: { type: "Feature", properties: {}, geometry: { type: "LineString", coordinates: coords } } });
      map.addLayer({ id: casingId, type: "line", source: sourceId, layout: { "line-cap": "round", "line-join": "round" }, paint: { "line-color": casing, "line-width": snap.w + 3, "line-opacity": 0.7 * snap.o, ...noTransition } });
      const paint: MapLibre.LineLayerSpecification["paint"] = { "line-width": snap.w, "line-opacity": snap.o, ...noTransition };
      if (gradientKind) {
        paint["line-gradient"] = animatedGradient(gradientKind, 0, lineRgb, bright, reverse, hasProgress ? shown : undefined);
      } else if (hasProgress) {
        paint["line-gradient"] = progressGradient(shown, lineColor, faded);
      } else {
        paint["line-color"] = lineColor;
        if (dashKey) paint["line-dasharray"] = dashKey.split(",").map(Number);
      }
      map.addLayer({ id: lineId, type: "line", source: sourceId, layout: { "line-cap": dashKey && !useGradient ? "butt" : "round", "line-join": "round" }, paint });
      map.addLayer({ id: hitId, type: "line", source: sourceId, paint: { "line-width": 18, "line-opacity": 0 } });
      if (kind === "glow") {
        map.addLayer({ id: haloId, type: "line", source: sourceId, layout: { "line-cap": "round", "line-join": "round" }, paint: { "line-color": lineColor, "line-width": snap.w * 3, "line-blur": snap.w * 2, "line-opacity": 0.15, ...instant } }, casingId);
      }
    } catch {
      return;
    }
    const click = () => handlers.current.onClick?.();
    const enter = () => (map.getCanvas().style.cursor = "pointer");
    const leave = () => (map.getCanvas().style.cursor = "");
    map.on("click", hitId, click);
    map.on("mouseenter", hitId, enter);
    map.on("mouseleave", hitId, leave);

    // With `progress`, the flow is a thin light dashed line drawn over the travelled part.
    let flowAdded = false;
    if (kind === "flow" && hasProgress) {
      try {
        map.addSource(flowSrc, { type: "geojson", data: { type: "Feature", properties: {}, geometry: { type: "LineString", coordinates: sliceLine(coords, shown) } } });
        map.addLayer({ id: flowId, type: "line", source: flowSrc, layout: { "line-cap": "butt", "line-join": "round" }, paint: { "line-color": light ? shade(lineColor, -0.55) : "#ffffff", "line-width": Math.max(2, snap.w * 0.45), "line-opacity": 0.85 * snap.o } }, hitId);
        flowAdded = true;
      } catch {
        /* ignore — the route is still drawn */
      }
    }
    const dashTarget = flowAdded ? flowId : lineId;

    // One time-based loop drives every animation (so speed is the same at 60 and 120 Hz), plus the eased progress.
    let raf = 0;
    let last = 0;
    let dashStep = -1;
    let gradKey = -1;
    let animKey = -1;
    const animating = kind !== null;
    const frame = (now: number) => {
      raf = 0;
      const dt = last ? Math.min(64, now - last) : 16;
      last = now;
      if (!map.getLayer(lineId)) return;
      const t = now / 1000;
      let busy = animating;

      if (hasProgress) {
        const target = clamp01(live.current.progress ?? 0);
        if (Math.abs(target - shown) > 0.0004) {
          shown += (target - shown) * (1 - Math.exp(-dt / 110));
          busy = true;
        } else {
          shown = target;
        }
        const key = Math.round(shown * 2000);
        if (key !== gradKey) {
          gradKey = key;
          if (!gradientKind) map.setPaintProperty(lineId, "line-gradient", progressGradient(shown, lineColor, faded));
          (map.getSource(flowSrc) as MapLibre.GeoJSONSource | undefined)?.setData({ type: "Feature", properties: {}, geometry: { type: "LineString", coordinates: sliceLine(coords, shown) } });
        }
      }

      if (kind === "flow") {
        const idx = Math.floor(t * speed * (DASH_FRAMES.length / 1.1)) % DASH_FRAMES.length;
        const step = reverse ? DASH_FRAMES.length - 1 - idx : idx;
        if (step !== dashStep) {
          dashStep = step;
          map.setPaintProperty(dashTarget, "line-dasharray", DASH_FRAMES[step]);
        }
      } else if (gradientKind) {
        const u = (t * speed / PERIOD[gradientKind]) % 1;
        const key = Math.round(u * 900) * 4001 + (hasProgress ? Math.round(shown * 2000) : 0);
        if (key !== animKey) {
          animKey = key;
          map.setPaintProperty(lineId, "line-gradient", animatedGradient(gradientKind, u, lineRgb, bright, reverse, hasProgress ? shown : undefined));
        }
      } else if (kind === "glow") {
        const s = 0.5 + 0.5 * Math.sin((t * speed * Math.PI * 2) / 2.4 - Math.PI / 2);
        const { w: lw, o: lo } = live.current;
        map.setPaintProperty(lineId, "line-width", lw * (1 + 0.3 * s));
        map.setPaintProperty(lineId, "line-opacity", lo * (0.7 + 0.3 * s));
        map.setPaintProperty(casingId, "line-width", lw * (1 + 0.3 * s) + 3);
        map.setPaintProperty(haloId, "line-opacity", 0.08 + 0.4 * s);
        map.setPaintProperty(haloId, "line-width", lw * (2.2 + 1.6 * s));
        map.setPaintProperty(haloId, "line-blur", lw * (1.4 + 1.2 * s));
      }
      if (busy) raf = requestAnimationFrame(frame);
    };
    const wake = () => {
      if (!raf) {
        last = 0;
        raf = requestAnimationFrame(frame);
      }
    };
    kick.current = wake;
    if (animating) wake();

    return () => {
      kick.current = null;
      cancelAnimationFrame(raf);
      try {
        map.off("click", hitId, click);
        map.off("mouseenter", hitId, enter);
        map.off("mouseleave", hitId, leave);
        for (const l of [hitId, flowId, lineId, haloId, casingId]) if (map.getLayer(l)) map.removeLayer(l);
        for (const src of [flowSrc, sourceId]) if (map.getSource(src)) map.removeSource(src);
      } catch {
        /* style was replaced — its layers are already gone */
      }
    };
    // Width / opacity / progress are applied by the effects below, so changing them doesn't rebuild the layers or reset the animation.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, container, styleVersion, coordKey, color, dashKey, hasProgress, kind, speed, reverse, layerBase, themeTick]);

  // Width and opacity changes ease in through MapLibre's paint transitions (the glow loop drives its own).
  useEffect(() => {
    if (!map || kind === "glow") return;
    try {
      const set = (layer: string, prop: "line-width" | "line-opacity", value: number) => map.getLayer(layer) && map.setPaintProperty(layer, prop, value);
      set(`${layerBase}-casing`, "line-width", w + 3);
      set(`${layerBase}-casing`, "line-opacity", 0.7 * o);
      set(`${layerBase}-line`, "line-width", w);
      set(`${layerBase}-line`, "line-opacity", o);
      set(`${layerBase}-flow`, "line-width", Math.max(2, w * 0.45));
      set(`${layerBase}-flow`, "line-opacity", 0.85 * o);
    } catch {
      /* layers not ready */
    }
  }, [map, styleVersion, coordKey, kind, layerBase, w, o]);

  // Progress glides to its new value.
  useEffect(() => {
    kick.current?.();
  }, [progress]);

  return null;
}
