import { isColorName } from "../../../core/tokens";
import maplibreCss from "maplibre-gl/dist/maplibre-gl.css?inline";
import type { StyleSpecification } from "maplibre-gl";
import type { LngLat } from "./mapTypes";

// ---- base styles (free CARTO basemaps, no API key) ---------------------------------------------------------------
const rasterStyle = (tiles: string[], attribution: string, tileSize = 256): StyleSpecification => ({
  version: 8,
  sources: { base: { type: "raster", tiles, tileSize, attribution, maxzoom: 19 } },
  layers: [{ id: "base", type: "raster", source: "base" }],
});

export const MAP_STYLES: Record<string, string | StyleSpecification> = {
  light: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
  dark: "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
  voyager: "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json",
  "light-minimal": "https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json",
  "dark-minimal": "https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json",
  osm: rasterStyle(["https://tile.openstreetmap.org/{z}/{x}/{y}.png"], "© OpenStreetMap contributors"),
  satellite: rasterStyle(
    ["https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"],
    "Imagery © Esri, Maxar, Earthstar Geographics"
  ),
};

/** Named base maps, in the order the style switcher lists them. */
export const MAP_STYLE_NAMES = ["auto", "light", "dark", "voyager", "light-minimal", "dark-minimal", "osm", "satellite"] as const;

export type MapStyleName = (typeof MAP_STYLE_NAMES)[number];

/** Resolves a style name (or style JSON URL) to something `map.setStyle` accepts, plus a stable key for change detection. */
export function resolveStyle(style: MapStyleName | (string & {}), themeIsDark: boolean): { key: string; style: string | StyleSpecification } {
  const name = style === "auto" ? (themeIsDark ? "dark" : "light") : style;
  return { key: name, style: name in MAP_STYLES ? MAP_STYLES[name] : name };
}

/** The nearest `data-theme` above an element — also looks out of a shadow root to the host. */
export function isDarkAround(el: HTMLElement | null): boolean {
  let node: Element | null = el;
  while (node) {
    const t = node.closest("[data-theme]")?.getAttribute("data-theme");
    if (t) return t === "dark";
    const root = node.getRootNode();
    node = root instanceof ShadowRoot ? root.host : null;
  }
  return document.documentElement.getAttribute("data-theme") === "dark";
}

// ---- colors ------------------------------------------------------------------------------------------------------
/** CSS color (possibly a `var(...)`) for a color prop — a built-in name follows the theme. */
export function cssColor(color: string | undefined): string {
  if (!color || color === "accent") return "var(--color-accent-500)"; // 500 reads on both the light and the dark basemap
  return isColorName(color) ? `var(--color-${color}-500)` : color;
}

/**
 * MapLibre paint properties can't read CSS variables or `oklch()` colors, so turn any CSS color into a plain
 * `rgb()` string by letting the browser resolve it (a probe element, then a 1×1 canvas for modern color spaces).
 */
export function resolveColor(container: HTMLElement, color: string | undefined): string {
  const probe = document.createElement("span");
  probe.style.color = cssColor(color);
  container.appendChild(probe);
  const computed = getComputedStyle(probe).color;
  probe.remove();
  try {
    const ctx = document.createElement("canvas").getContext("2d", { willReadFrequently: true });
    if (!ctx) return computed;
    ctx.canvas.width = ctx.canvas.height = 1;
    ctx.fillStyle = "#000";
    ctx.fillStyle = computed;
    ctx.fillRect(0, 0, 1, 1);
    const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
    return `rgb(${r}, ${g}, ${b})`;
  } catch {
    return computed;
  }
}

/** `rgb(r, g, b)` → `rgba(r, g, b, a)`. */
export function withAlpha(rgb: string, alpha: number): string {
  const m = rgb.match(/rgba?\((\d+)[ ,]+(\d+)[ ,]+(\d+)/);
  return m ? `rgba(${m[1]}, ${m[2]}, ${m[3]}, ${alpha})` : rgb;
}

// ---- geometry ----------------------------------------------------------------------------------------------------
export function distanceMeters(a: LngLat, b: LngLat): number {
  const R = 6371000;
  const rad = (d: number) => (d * Math.PI) / 180;
  const dLat = rad(b[1] - a[1]);
  const dLng = rad(b[0] - a[0]);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a[1])) * Math.cos(rad(b[1])) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

export function lineLength(coords: LngLat[]): number {
  let total = 0;
  for (let i = 1; i < coords.length; i++) total += distanceMeters(coords[i - 1], coords[i]);
  return total;
}

/** The point `fraction` (0 – 1) of the way along a line, measured by distance. */
export function pointAlong(coords: LngLat[], fraction: number): LngLat {
  if (coords.length === 0) return [0, 0];
  const target = lineLength(coords) * Math.min(1, Math.max(0, fraction));
  let walked = 0;
  for (let i = 1; i < coords.length; i++) {
    const seg = distanceMeters(coords[i - 1], coords[i]);
    if (walked + seg >= target && seg > 0) {
      const t = (target - walked) / seg;
      return [coords[i - 1][0] + (coords[i][0] - coords[i - 1][0]) * t, coords[i - 1][1] + (coords[i][1] - coords[i - 1][1]) * t];
    }
    walked += seg;
  }
  return coords[coords.length - 1];
}

export function formatDistance(meters: number): string {
  return meters >= 1000 ? `${(meters / 1000).toFixed(meters >= 10000 ? 0 : 1)} km` : `${Math.round(meters)} m`;
}

export function formatDuration(seconds: number): string {
  const m = Math.round(seconds / 60);
  return m >= 60 ? `${Math.floor(m / 60)} h ${m % 60} min` : `${m} min`;
}

// ---- MapLibre CSS (injected into the document, or into a shadow root for Web Components) ---------------------------
const THEME_CSS = `
.maplibregl-map{font-family:inherit}
.maplibregl-popup-content{background:var(--lojee-surface,#fff);color:var(--lojee-fg,#0f172a);border-radius:12px;padding:10px 14px;font-size:13px;box-shadow:0 10px 30px rgba(0,0,0,.18)}
.maplibregl-popup-close-button{color:var(--lojee-fg-subtle,#64748b);font-size:18px;padding:2px 8px}
.maplibregl-popup-anchor-top .maplibregl-popup-tip,.maplibregl-popup-anchor-top-left .maplibregl-popup-tip,.maplibregl-popup-anchor-top-right .maplibregl-popup-tip{border-bottom-color:var(--lojee-surface,#fff)}
.maplibregl-popup-anchor-bottom .maplibregl-popup-tip,.maplibregl-popup-anchor-bottom-left .maplibregl-popup-tip,.maplibregl-popup-anchor-bottom-right .maplibregl-popup-tip{border-top-color:var(--lojee-surface,#fff)}
.maplibregl-popup-anchor-left .maplibregl-popup-tip{border-right-color:var(--lojee-surface,#fff)}
.maplibregl-popup-anchor-right .maplibregl-popup-tip{border-left-color:var(--lojee-surface,#fff)}
.maplibregl-ctrl-group{background:var(--lojee-surface,#fff);border-radius:10px;box-shadow:0 2px 10px rgba(0,0,0,.15)}
.maplibregl-ctrl-group button+button{border-top:1px solid var(--lojee-border,#e2e8f0)}
[data-theme="dark"] .maplibregl-ctrl-group button .maplibregl-ctrl-icon,[data-theme="dark"] .maplibregl-ctrl-group button span{filter:invert(1)}
.maplibregl-ctrl-scale{background:color-mix(in srgb,var(--lojee-surface,#fff) 80%,transparent);color:var(--lojee-fg,#0f172a);border-color:var(--lojee-fg-subtle,#64748b)}
.maplibregl-ctrl-attrib{background:color-mix(in srgb,var(--lojee-surface,#fff) 75%,transparent)!important;color:var(--lojee-fg-muted,#475569)}
.maplibregl-ctrl-attrib a{color:inherit}
`;

export function ensureMapCss(container: HTMLElement) {
  const root = container.getRootNode();
  const target: ParentNode = root instanceof ShadowRoot ? root : document.head;
  if (target.querySelector("style[data-lojee-maplibre]")) return;
  const style = document.createElement("style");
  style.setAttribute("data-lojee-maplibre", "");
  style.textContent = maplibreCss + THEME_CSS;
  target.appendChild(style);
}
