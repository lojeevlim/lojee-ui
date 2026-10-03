import { useCallback, useEffect, useState, type ReactNode } from "react";
import {
  ThemeContext,
  DEFAULT_ACCENT,
  applyTheme,
  THEME_STORAGE_KEYS,
  ThemeProviderPresentContext,
  isAccent,
  isDesign,
  DEFAULT_DESIGN,
  accentAttrs,
  isThemeMode,
  type Accent,
  type DesignName,
  type ThemeMode,
} from "../../../core/theme";
import { DEFAULT_ACTIVE_VARIANT, isActiveVariant, type ActiveVariant } from "../../../core/activeVariant";

const MODE_KEY = THEME_STORAGE_KEYS.mode;
const ACCENT_KEY = THEME_STORAGE_KEYS.accent;
const ACTIVE_KEY = THEME_STORAGE_KEYS.activeVariant;
const DESIGN_KEY = THEME_STORAGE_KEYS.design;

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
  /** Initial accent when nothing is stored: a built-in name or any custom hex color such as "#e11d89". Default "slate". */
  defaultAccent?: Accent;
  /** Initial active-item style when nothing is stored: "solid" (default), "outline" or "soft". */
  defaultActiveVariant?: ActiveVariant;
  /** Initial design language when nothing is stored: "bento" (default — flat surfaces, thin borders) or "clay" (Claymorphism — soft, puffy, rounded). */
  defaultDesign?: DesignName;
  /** Scope the theme to this provider's own subtree instead of `<html>`: it sets `data-theme` / `data-accent` on a
   * wrapper element and neither reads nor writes `localStorage`. Use it for a self-contained preview (docs, a
   * playground) without touching the page's theme. */
  isolated?: boolean;
  /** Controlled mode — when given, it wins over the provider's own state (handy with `isolated`). */
  mode?: ThemeMode;
  /** Controlled accent — when given, it wins over the provider's own state. */
  accent?: Accent;
  /** Controlled active-item style — when given, it wins over the provider's own state. */
  activeVariant?: ActiveVariant;
  /** Controlled design language — when given, it wins over the provider's own state. */
  design?: DesignName;
}

/** Sets `data-theme` / `data-accent` on <html> (or on its own wrapper when `isolated`) and exposes them via useTheme(). */
export function ThemeProvider({
  children,
  defaultMode = "light",
  defaultAccent = DEFAULT_ACCENT,
  defaultActiveVariant = DEFAULT_ACTIVE_VARIANT,
  defaultDesign = DEFAULT_DESIGN,
  isolated = false,
  mode: modeProp,
  accent: accentProp,
  activeVariant: activeVariantProp,
  design: designProp,
}: ThemeProviderProps) {
  const [modeState, setModeState] = useState<ThemeMode>(() => (isolated ? defaultMode : readStored(MODE_KEY, isThemeMode, defaultMode)));
  const [accentState, setAccentState] = useState<Accent>(() => (isolated ? defaultAccent : readStored(ACCENT_KEY, isAccent, defaultAccent)));
  const [activeState, setActiveState] = useState<ActiveVariant>(() =>
    isolated ? defaultActiveVariant : readStored(ACTIVE_KEY, isActiveVariant, defaultActiveVariant)
  );
  const [designState, setDesignState] = useState<DesignName>(() => (isolated ? defaultDesign : readStored(DESIGN_KEY, isDesign, defaultDesign)));
  const mode = modeProp ?? modeState;
  const accent = accentProp ?? accentState;
  const activeVariant = activeVariantProp ?? activeState;
  const design = designProp ?? designState;

  useEffect(() => {
    if (!isolated) applyTheme(mode, accent, activeVariant, design);
  }, [isolated, mode, accent, activeVariant, design]);

  const setMode = useCallback(
    (next: ThemeMode) => {
      setModeState(next);
      if (!isolated) persist(MODE_KEY, next);
    },
    [isolated]
  );
  const setAccent = useCallback(
    (next: Accent) => {
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

  const setDesign = useCallback(
    (next: DesignName) => {
      setDesignState(next);
      if (!isolated) persist(DESIGN_KEY, next);
    },
    [isolated]
  );

  return (
    <ThemeProviderPresentContext.Provider value>
    <ThemeContext.Provider value={{ mode, accent, activeVariant, design, setMode, setAccent, setActiveVariant, setDesign }}>
      {isolated ? (
        // `display: contents` keeps the wrapper out of layout while still scoping the theme attributes.
        <div data-theme={mode} {...accentAttrs(accent)} data-active-variant={activeVariant} data-design={design} style={{ display: "contents", ...accentAttrs(accent).style }}>
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
