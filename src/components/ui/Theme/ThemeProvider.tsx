import { useCallback, useEffect, useState, type ReactNode } from "react";
import {
  ThemeContext,
  DEFAULT_ACCENT,
  applyTheme,
  THEME_STORAGE_KEYS,
  ThemeProviderPresentContext,
  isAccentName,
  isThemeMode,
  type AccentName,
  type ThemeMode,
} from "../../../core/theme";
import { DEFAULT_ACTIVE_VARIANT, isActiveVariant, type ActiveVariant } from "../../../core/activeVariant";

const MODE_KEY = THEME_STORAGE_KEYS.mode;
const ACCENT_KEY = THEME_STORAGE_KEYS.accent;
const ACTIVE_KEY = THEME_STORAGE_KEYS.activeVariant;

function readStored<T>(key: string, guard: (v: unknown) => v is T, fallback: T): T {
  try {
    const stored = window.localStorage.getItem(key);
    if (guard(stored)) return stored;
  } catch {
    /* localStorage unavailable (private mode, SSR, etc.) — fall through to default */
  }
  return fallback;
}

function persist(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* selection just won't persist across reloads */
  }
}

export interface ThemeProviderProps {
  /** The app subtree that receives the theme (mode and accent) via context. */
  children: ReactNode;
  /** Initial mode when nothing is stored. Default "light". */
  defaultMode?: ThemeMode;
  /** Initial accent when nothing is stored. Default "slate". */
  defaultAccent?: AccentName;
  /** Initial active-item style when nothing is stored: "solid" (default), "outline" or "soft". */
  defaultActiveVariant?: ActiveVariant;
  /** Scope the theme to this provider's own subtree instead of `<html>`: it sets `data-theme` / `data-accent` on a
   * wrapper element and neither reads nor writes `localStorage`. Use it for a self-contained preview (docs, a
   * playground) without touching the page's theme. */
  isolated?: boolean;
  /** Controlled mode — when given, it wins over the provider's own state (handy with `isolated`). */
  mode?: ThemeMode;
  /** Controlled accent — when given, it wins over the provider's own state. */
  accent?: AccentName;
  /** Controlled active-item style — when given, it wins over the provider's own state. */
  activeVariant?: ActiveVariant;
}

/** Sets `data-theme` / `data-accent` on <html> (or on its own wrapper when `isolated`) and exposes them via useTheme(). */
export function ThemeProvider({
  children,
  defaultMode = "light",
  defaultAccent = DEFAULT_ACCENT,
  defaultActiveVariant = DEFAULT_ACTIVE_VARIANT,
  isolated = false,
  mode: modeProp,
  accent: accentProp,
  activeVariant: activeVariantProp,
}: ThemeProviderProps) {
  const [modeState, setModeState] = useState<ThemeMode>(() => (isolated ? defaultMode : readStored(MODE_KEY, isThemeMode, defaultMode)));
  const [accentState, setAccentState] = useState<AccentName>(() => (isolated ? defaultAccent : readStored(ACCENT_KEY, isAccentName, defaultAccent)));
  const [activeState, setActiveState] = useState<ActiveVariant>(() =>
    isolated ? defaultActiveVariant : readStored(ACTIVE_KEY, isActiveVariant, defaultActiveVariant)
  );
  const mode = modeProp ?? modeState;
  const accent = accentProp ?? accentState;
  const activeVariant = activeVariantProp ?? activeState;

  useEffect(() => {
    if (!isolated) applyTheme(mode, accent, activeVariant);
  }, [isolated, mode, accent, activeVariant]);

  const setMode = useCallback(
    (next: ThemeMode) => {
      setModeState(next);
      if (!isolated) persist(MODE_KEY, next);
    },
    [isolated]
  );
  const setAccent = useCallback(
    (next: AccentName) => {
      setAccentState(next);
      if (!isolated) persist(ACCENT_KEY, next);
    },
    [isolated]
  );

  const setActiveVariant = useCallback(
    (next: ActiveVariant) => {
      setActiveState(next);
      if (!isolated) persist(ACTIVE_KEY, next);
    },
    [isolated]
  );

  return (
    <ThemeProviderPresentContext.Provider value>
    <ThemeContext.Provider value={{ mode, accent, activeVariant, setMode, setAccent, setActiveVariant }}>
      {isolated ? (
        // `display: contents` keeps the wrapper out of layout while still scoping the theme attributes.
        <div data-theme={mode} data-accent={accent} data-active-variant={activeVariant} style={{ display: "contents" }}>
          {children}
        </div>
      ) : (
        children
      )}
    </ThemeContext.Provider>
    </ThemeProviderPresentContext.Provider>
  );
}

export default ThemeProvider;
