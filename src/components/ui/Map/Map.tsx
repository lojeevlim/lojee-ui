import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import type * as MapLibre from "maplibre-gl";
import { cx } from "../../../core/tokens";
// MapLibre's web worker, bundled by Vite. Its URL is only the fallback: the worker is inlined (below) so it never
// depends on a separate file being served next to this one (dev-server pre-bundling, copied/CDN-hosted builds).
import workerUrl from "maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url";
import { MapContext, type MapLibreModule } from "./mapContext";
import { MapControls } from "./MapControls";
import { MapMarker } from "../MapMarker/MapMarker";
import { MapRoute } from "../MapRoute/MapRoute";
import { ensureMapCss, isDarkAround, resolveStyle, type MapStyleName } from "./mapUtils";
import { MapStyleSwitcher } from "./MapStyleSwitcher";
import type { LngLat, MapControlName, MapMarkerData, MapRouteData, MapRouteSummary, MapViewState } from "./mapTypes";

export interface MapProps {
  /** Map center as `[lng, lat]` (default `[0, 20]`). Changing it moves the map; panning does not write back. */
  center?: LngLat;
  /** Zoom level, 0 (world) – 22 (default 2). */
  zoom?: number;
  /** Camera tilt in degrees, 0 – 85 (default 0). */
  pitch?: number;
  /** Camera rotation in degrees (default 0). */
  bearing?: number;
  /** Base map: "auto" (default — light or dark to match the theme), "light", "dark", "voyager", "light-minimal", "dark-minimal" (no labels), "osm", "satellite", or the URL of any MapLibre style JSON. Named styles need no API key. */
  mapStyle?: MapStyleName | (string & {});
  /** Show map controls: `true` for zoom, compass, locate and fullscreen, or pick from "zoom" | "compass" | "locate" | "fullscreen" | "scale" | "style" (a base-map switcher). */
  controls?: boolean | MapControlName[];
  /** Markers drawn from plain data (the only way to add markers from a Web Component). */
  markers?: MapMarkerData[];
  /** Routes drawn from plain data. */
  routes?: MapRouteData[];
  /** Zoom to fit all `markers` and `routes` (with `coordinates`) once the map is ready, and whenever they change. */
  fitBounds?: boolean;
  /** Padding in px around the fitted bounds (default 60). */
  fitPadding?: number;
  /** Allow panning, zooming and rotating with the mouse / touch (default true). Read once, when the map is created. */
  interactive?: boolean;
  /** Called once the map and its style have loaded, with the MapLibre map instance. */
  onLoad?: (map: MapLibre.Map) => void;
  /** Called when the user picks a base map with the "style" control. */
  onStyleChange?: (style: MapStyleName) => void;
  /** Called when the user finishes moving the map, with the new view. */
  onMove?: (view: MapViewState) => void;
  /** Called when the map (not a marker or route) is clicked. */
  onMapClick?: (position: { lng: number; lat: number }) => void;
  /** Called when a data-driven marker is clicked. */
  onMarkerClick?: (marker: MapMarkerData) => void;
  /** Called with the marker and its new position when a draggable data-driven marker is dropped. */
  onMarkerDragEnd?: (marker: MapMarkerData, position: { lng: number; lat: number }) => void;
  /** Called when a data-driven route is clicked. */
  onRouteClick?: (route: MapRouteData) => void;
  /** Called when a data-driven route's geometry is known, with its length and (for fetched routes) travel time. */
  onRouteLoad?: (summary: MapRouteSummary) => void;
  /** `MapMarker`, `MapRoute`, `MapControls` or your own components that use `useMap()`. */
  children?: ReactNode;
  /** Width of the map: a number of px, or any CSS length such as "50%" or "40rem". Left unset, the map is as wide as its container. */
  width?: number | string;
  /** Height of the map: a number of px, or any CSS length such as "60vh" or "30rem". Left unset, the map is 480px tall. */
  height?: number | string;
  /** Extra class names applied to the root element (its default size is `h-[480px] w-full`). */
  className?: string;
  /** Per-part class overrides (`root`, `map`) — merged after the built-in styling. */
  classNames?: { root?: string; map?: string };
}

// A blob: URL for the inlined worker (null if that fails → fall back to `workerUrl`). Vite's `?worker&inline` only
// hands out a Worker constructor, so grab the object URL it creates for its blob while building one throwaway worker.
let inlineWorkerUrl: Promise<string | null> | undefined;
function getInlineWorkerUrl(): Promise<string | null> {
  inlineWorkerUrl ??= import("maplibre-gl/dist/maplibre-gl-worker.mjs?worker&inline")
    .then(({ default: InlineWorker }) => {
      const original = URL.createObjectURL;
      let url: string | null = null;
      URL.createObjectURL = (obj: Blob | MediaSource) => (url = original.call(URL, obj));
      try {
        new InlineWorker().terminate();
      } finally {
        URL.createObjectURL = original;
      }
      return url;
    })
    .catch(() => null);
  return inlineWorkerUrl;
}

/** A number (or numeric string, e.g. from a Web Component attribute) is px; anything else is a CSS length as given. */
const cssLength = (v: number | string | undefined) => (/^\d+(\.\d+)?$/.test(String(v)) ? `${v}px` : v);

const CONTROLS_DEFAULT: MapControlName[] = ["zoom", "compass", "locate", "fullscreen"];

/** An interactive MapLibre map that follows the light / dark theme. Compose it with `MapMarker`, `MapRoute` and `MapControls`, or pass `markers` / `routes` as data. */
export function Map({
  width,
  height,
  center = [0, 20],
  zoom = 2,
  pitch = 0,
  bearing = 0,
  mapStyle = "auto",
  controls = false,
  markers,
  routes,
  fitBounds = false,
  fitPadding = 60,
  interactive = true,
  onLoad,
  onStyleChange,
  onMove,
  onMapClick,
  onMarkerClick,
  onMarkerDragEnd,
  onRouteClick,
  onRouteLoad,
  children,
  className,
  classNames,
}: MapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [instance, setInstance] = useState<{ map: MapLibre.Map; maplibre: MapLibreModule } | null>(null);
  const [styleVersion, setStyleVersion] = useState(0);
  const [dark, setDark] = useState(false);
  const [failed, setFailed] = useState(false);

  // Latest props for the create-once effect and event handlers.
  const initial = useRef({ center, zoom, pitch, bearing, mapStyle, interactive });
  const handlers = useRef({ onLoad, onMove, onMapClick });
  useEffect(() => {
    handlers.current = { onLoad, onMove, onMapClick };
  });
  const appliedStyle = useRef("");
  // The base map is seeded from `mapStyle`; the "style" control can change it, and a new `mapStyle` prop wins again.
  const [activeStyle, setActiveStyle] = useState<MapStyleName | (string & {})>(mapStyle);
  const [prevStyleProp, setPrevStyleProp] = useState(mapStyle);
  if (prevStyleProp !== mapStyle) {
    setPrevStyleProp(mapStyle);
    setActiveStyle(mapStyle);
  }

  // Create the map (MapLibre is loaded on demand, so apps that never show a map never download it).
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let disposed = false;
    let map: MapLibre.Map | undefined;
    ensureMapCss(el);
    Promise.all([import("maplibre-gl"), getInlineWorkerUrl()])
      .then(([maplibre, inlineUrl]) => {
        if (disposed) return;
        const url = inlineUrl ?? workerUrl;
        if (maplibre.getWorkerUrl() !== url) maplibre.setWorkerUrl(url);
        const isDark = isDarkAround(el);
        const i = initial.current;
        const resolved = resolveStyle(i.mapStyle, isDark);
        appliedStyle.current = resolved.key;
        map = new maplibre.Map({
          container: el,
          style: resolved.style,
          center: i.center,
          zoom: i.zoom,
          pitch: i.pitch,
          bearing: i.bearing,
          interactive: i.interactive,
          attributionControl: { compact: true },
        });
        const m = map;
        m.on("style.load", () => setStyleVersion((v) => v + 1));
        m.on("load", () => handlers.current.onLoad?.(m));
        m.on("moveend", () => {
          const c = m.getCenter();
          handlers.current.onMove?.({ center: [c.lng, c.lat], zoom: m.getZoom(), pitch: m.getPitch(), bearing: m.getBearing() });
        });
        m.on("click", (e) => handlers.current.onMapClick?.({ lng: e.lngLat.lng, lat: e.lngLat.lat }));
        setDark(isDark);
        setInstance({ map: m, maplibre });
      })
      .catch(() => !disposed && setFailed(true));
    return () => {
      disposed = true;
      map?.remove();
      setInstance(null);
    };
  }, []);

  // Follow the page theme: light ↔ dark base map.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const sync = () => setDark(isDarkAround(el));
    const obs = new MutationObserver(sync);
    const opts = { attributes: true, attributeFilter: ["data-theme"] };
    obs.observe(document.documentElement, opts);
    let node: Element | null = el.closest("[data-theme]");
    while (node) {
      obs.observe(node, opts);
      node = node.parentElement?.closest("[data-theme]") ?? null;
    }
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!instance) return;
    const resolved = resolveStyle(activeStyle, dark);
    if (resolved.key === appliedStyle.current) return;
    appliedStyle.current = resolved.key;
    instance.map.setStyle(resolved.style);
  }, [instance, activeStyle, dark]);

  // Move the camera when the view props change.
  const centerKey = `${center[0]},${center[1]}`;
  const firstView = useRef(true);
  useEffect(() => {
    if (!instance) return;
    if (firstView.current) {
      firstView.current = false;
      return;
    }
    instance.map.easeTo({ center, zoom, pitch, bearing, duration: 700 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [instance, centerKey, zoom, pitch, bearing]);

  // Fit to the data.
  const fitKey = fitBounds
    ? JSON.stringify([markers?.map((m) => [m.lng, m.lat]), routes?.map((r) => r.coordinates)])
    : "";
  useEffect(() => {
    if (!instance || !fitKey) return;
    const pts: LngLat[] = [];
    for (const m of markers ?? []) pts.push([m.lng, m.lat]);
    for (const r of routes ?? []) pts.push(...(r.coordinates ?? []));
    if (pts.length === 0) return;
    const xs = pts.map((p) => p[0]);
    const ys = pts.map((p) => p[1]);
    instance.map.fitBounds([[Math.min(...xs), Math.min(...ys)], [Math.max(...xs), Math.max(...ys)]], { padding: fitPadding, duration: 700, maxZoom: 15 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [instance, fitKey, fitPadding]);

  const ctx = useMemo(
    () => ({ map: instance?.map ?? null, maplibre: instance?.maplibre ?? null, styleVersion, container: instance?.map.getContainer() ?? null }),
    [instance, styleVersion]
  );
  const controlList = controls === true ? CONTROLS_DEFAULT : controls || null;
  const showStyleSwitcher = !!controlList?.includes("style");

  const hasWidth = width !== undefined && width !== "";
  const hasHeight = height !== undefined && height !== "";

  return (
    <div
      data-map-root
      className={cx(
        "relative overflow-hidden rounded-xl border border-border bg-surface-muted",
        // Full width and 480px tall unless `width` / `height` say otherwise.
        !hasWidth && "w-full",
        !hasHeight && "h-[480px]",
        className,
        classNames?.root
      )}
      style={hasWidth || hasHeight ? { ...(hasWidth && { width: cssLength(width) }), ...(hasHeight && { height: cssLength(height) }) } : undefined}
    >
      {/* Inline position: MapLibre's own stylesheet sets `.maplibregl-map { position: relative }`, which would beat a utility class. */}
      <div ref={containerRef} className={classNames?.map} style={{ position: "absolute", inset: 0 }} />
      <div data-map-rim aria-hidden="true" className="pointer-events-none absolute inset-0 z-[5] hidden rounded-[inherit]" />
      {!instance && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-sm text-fg-subtle">
          {failed ? "The map could not be loaded." : "Loading map…"}
        </div>
      )}
      {instance && (
        <MapContext.Provider value={ctx}>
          {controlList && <MapControls controls={controlList} />}
          {showStyleSwitcher && (
            <MapStyleSwitcher
              value={activeStyle}
              dark={dark}
              onChange={(next) => {
                setActiveStyle(next);
                onStyleChange?.(next);
              }}
            />
          )}
          {markers?.map((m, i) => {
            const mid = m.id ?? String(i);
            return (
              <MapMarker
                key={mid}
                lng={m.lng}
                lat={m.lat}
                label={m.label}
                color={m.color}
                icon={m.icon}
                popup={m.popup}
                tooltip={m.tooltip}
                draggable={m.draggable}
                onClick={() => onMarkerClick?.({ ...m, id: mid })}
                onDragEnd={(p) => onMarkerDragEnd?.({ ...m, id: mid }, p)}
              />
            );
          })}
          {routes?.map((r, i) => {
            const rid = r.id ?? `route-${i}`;
            return (
              <MapRoute
                key={rid}
                id={rid}
                coordinates={r.coordinates}
                waypoints={r.waypoints}
                prefer={r.prefer}
                profile={r.profile}
                routingUrl={r.routingUrl}
                color={r.color}
                width={r.width}
                opacity={r.opacity}
                dashArray={r.dashArray}
                progress={r.progress}
                active={r.active}
                activeWidth={r.activeWidth}
                activeOpacity={r.activeOpacity}
                animated={r.animated}
                animationSpeed={r.animationSpeed}
                animationDirection={r.animationDirection}
                fit={fitBounds && !!r.waypoints}
                onClick={() => onRouteClick?.({ ...r, id: rid })}
                onLoad={onRouteLoad}
              />
            );
          })}
          {children}
        </MapContext.Provider>
      )}
    </div>
  );
}
