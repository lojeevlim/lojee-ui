// Global theme selection — light/dark mode plus a brand accent palette.
// The CSS side lives in src/theme.css (driven by `data-theme` / `data-accent`
// on <html>); this file is the framework-agnostic state + DOM glue, shared by
// the React ThemeProvider and the web-component `setTheme` helper.
import { createContext, useContext, type CSSProperties } from "react";
import { COLORS } from "./tokens";
import { DEFAULT_ACTIVE_VARIANT, type ActiveVariant } from "./activeVariant";

export type ThemeMode = "light" | "dark";
/** Same as ThemeMode — kept as an alias for existing imports. */
export type ResolvedTheme = ThemeMode;
export type AccentName = (typeof COLORS)[number]["base"];

/** A built-in accent name, or any custom color written as a hex string such as "#e11d89". */
export type Accent = AccentName | (string & {});

export const THEME_MODES: { value: ThemeMode; label: string }[] = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
];

/** The overall design language. "bento" — the library's current look: flat surfaces, thin borders, modest radii and light shadows —
 * and "clay" — Claymorphism: soft, puffy, rounded shapes with a raised inner-light / inner-shade shadow and no hard outlines. */
export type DesignName = "bento" | "clay";

export const DESIGNS: { value: DesignName; label: string }[] = [
  { value: "bento", label: "Bento" },
  { value: "clay", label: "Claymorphism" },
];

export const DEFAULT_DESIGN: DesignName = "bento";

export function isDesign(v: unknown): v is DesignName {
  return v === "bento" || v === "clay";
}

export const DEFAULT_ACCENT: AccentName = "slate";

export function isThemeMode(v: unknown): v is ThemeMode {
  return v === "light" || v === "dark";
}

export function isAccentName(v: unknown): v is AccentName {
  return COLORS.some((c) => c.base === v);
}

const HEX = /^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i;

export function isHexColor(v: unknown): v is string {
  return typeof v === "string" && HEX.test(v);
}

/** A built-in accent name or a custom hex color. */
export function isAccent(v: unknown): v is Accent {
  return isAccentName(v) || isHexColor(v);
}

/** "#abc" → "#aabbcc" (what `<input type="color">` expects). */
export function normalizeHex(hex: string): string {
  const h = hex.toLowerCase();
  return h.length === 4 ? `#${h[1]}${h[1]}${h[2]}${h[2]}${h[3]}${h[3]}` : h;
}

// How much of the custom color each shade keeps, and what it is mixed with: lighter shades fade toward white, darker
// ones toward black. 600 — the shade buttons and active items use — is the color exactly as given.
const SHADE_MIX: Record<number, [percent: number, with_: "white" | "black"] | null> = {
  50: [8, "white"],
  100: [16, "white"],
  200: [30, "white"],
  300: [48, "white"],
  400: [68, "white"],
  500: [85, "white"],
  600: null,
  700: [85, "black"],
  800: [70, "black"],
  900: [55, "black"],
  950: [38, "black"],
};

/** One shade of an accent as a CSS color: `var(--color-blue-600)` for a built-in name, a `color-mix()` of the hex for a custom one. */
export function accentShade(accent: Accent, shade: number): string {
  if (!isHexColor(accent)) return `var(--color-${accent}-${shade})`;
  const mix = SHADE_MIX[shade];
  return mix ? `color-mix(in srgb, ${accent} ${mix[0]}%, ${mix[1]})` : accent;
}

/** The `--lojee-accent-*` palette of a custom accent — set inline on <html> (or a wrapper) it replaces the named palette. */
export function customAccentVars(hex: string): Record<string, string> {
  return Object.fromEntries(Object.keys(SHADE_MIX).map((n) => [`--lojee-accent-${n}`, accentShade(hex, Number(n))]));
}

/** `data-accent` (+ `data-accent-color` and the palette variables for a custom accent) for an element that scopes the theme. */
export function accentAttrs(accent: Accent): { "data-accent": string; "data-accent-color"?: string; style?: CSSProperties } {
  return isHexColor(accent)
    ? { "data-accent": "custom", "data-accent-color": accent, style: customAccentVars(accent) as CSSProperties }
    : { "data-accent": accent };
}

/** Writes the theme onto <html> so every component — including ones inside
 *  web-component shadow roots, which inherit CSS variables — picks it up. */
export function applyTheme(
  mode: ThemeMode,
  accent: Accent,
  activeVariant: ActiveVariant = DEFAULT_ACTIVE_VARIANT,
  design: DesignName = DEFAULT_DESIGN,
  root: HTMLElement = document.documentElement
) {
  root.setAttribute("data-theme", mode);
  if (isHexColor(accent)) {
    // A custom accent has no palette in the stylesheet: its shades go on as inline variables, which win over any `[data-accent]` rule.
    root.setAttribute("data-accent", "custom");
    root.setAttribute("data-accent-color", accent);
    for (const [name, value] of Object.entries(customAccentVars(accent))) root.style.setProperty(name, value);
  } else {
    root.setAttribute("data-accent", accent);
    root.removeAttribute("data-accent-color");
    for (const name of Object.keys(customAccentVars("#000"))) root.style.removeProperty(name);
  }
  root.setAttribute("data-active-variant", activeVariant);
  root.setAttribute("data-design", design);
}

/** localStorage keys `ThemeProvider` persists the user's choices under (shared so `<l-theme-switcher>` stays in step). */
export const THEME_STORAGE_KEYS = { mode: "lojee-ui:theme", accent: "lojee-ui:accent", activeVariant: "lojee-ui:active-variant", design: "lojee-ui:design" } as const;

export interface ThemeContextValue {
  mode: ThemeMode;
  accent: Accent;
  /** How active items (current page, selected segment…) are drawn: solid, outline or soft. */
  activeVariant: ActiveVariant;
  /** The design language: "bento" (default) or "clay". */
  design: DesignName;
  setMode: (mode: ThemeMode) => void;
  setAccent: (accent: Accent) => void;
  setActiveVariant: (variant: ActiveVariant) => void;
  setDesign: (design: DesignName) => void;
}

export const ThemeContext = createContext<ThemeContextValue>({
  mode: "light",
  accent: DEFAULT_ACCENT,
  activeVariant: DEFAULT_ACTIVE_VARIANT,
  design: DEFAULT_DESIGN,
  setMode: () => {},
  setAccent: () => {},
  setActiveVariant: () => {},
  setDesign: () => {},
});

/** True below a `ThemeProvider`. Lets a component (the theme switcher) tell "no provider" from "provider with defaults". */
export const ThemeProviderPresentContext = createContext(false);

export function useTheme(): ThemeContextValue {
  return useContext(ThemeContext);
}
