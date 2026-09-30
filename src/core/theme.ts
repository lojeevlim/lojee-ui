// Global theme selection — light/dark mode plus a brand accent palette.
// The CSS side lives in src/theme.css (driven by `data-theme` / `data-accent`
// on <html>); this file is the framework-agnostic state + DOM glue, shared by
// the React ThemeProvider and the web-component `setTheme` helper.
import { createContext, useContext } from "react";
import { COLORS } from "./tokens";
import { DEFAULT_ACTIVE_VARIANT, type ActiveVariant } from "./activeVariant";

export type ThemeMode = "light" | "dark";
/** Same as ThemeMode — kept as an alias for existing imports. */
export type ResolvedTheme = ThemeMode;
export type AccentName = (typeof COLORS)[number]["base"];

export const THEME_MODES: { value: ThemeMode; label: string }[] = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
];

export const DEFAULT_ACCENT: AccentName = "indigo";

export function isThemeMode(v: unknown): v is ThemeMode {
  return v === "light" || v === "dark";
}

export function isAccentName(v: unknown): v is AccentName {
  return COLORS.some((c) => c.base === v);
}

/** Writes the theme onto <html> so every component — including ones inside
 *  web-component shadow roots, which inherit CSS variables — picks it up. */
export function applyTheme(
  mode: ThemeMode,
  accent: AccentName,
  activeVariant: ActiveVariant = DEFAULT_ACTIVE_VARIANT,
  root: HTMLElement = document.documentElement
) {
  root.setAttribute("data-theme", mode);
  root.setAttribute("data-accent", accent);
  root.setAttribute("data-active-variant", activeVariant);
}

export interface ThemeContextValue {
  mode: ThemeMode;
  accent: AccentName;
  /** How active items (current page, selected segment…) are drawn: solid, outline or soft. */
  activeVariant: ActiveVariant;
  setMode: (mode: ThemeMode) => void;
  setAccent: (accent: AccentName) => void;
  setActiveVariant: (variant: ActiveVariant) => void;
}

export const ThemeContext = createContext<ThemeContextValue>({
  mode: "light",
  accent: DEFAULT_ACCENT,
  activeVariant: DEFAULT_ACTIVE_VARIANT,
  setMode: () => {},
  setAccent: () => {},
  setActiveVariant: () => {},
});

export function useTheme(): ThemeContextValue {
  return useContext(ThemeContext);
}
