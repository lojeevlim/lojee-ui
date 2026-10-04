import { useContext, useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { COLORS } from "../../../core/tokens";
import {
  THEME_MODES,
  THEME_STORAGE_KEYS,
  ThemeProviderPresentContext,
  applyTheme,
  isAccent,
  isDesign,
  DESIGNS,
  DEFAULT_DESIGN,
  isHexColor,
  normalizeHex,
  accentShade,
  isThemeMode,
  useTheme,
  DEFAULT_ACCENT,
  type Accent,
  type DesignName,
  type ThemeMode,
} from "../../../core/theme";
import { motionClass, motionState, motionStyle, DEFAULT_TRANSITION_MS, type TransitionVariant, type HoverEffect } from "../../../core/motion";
import { usePresence } from "../../../core/usePresence";
import { ACTIVE_VARIANTS, DEFAULT_ACTIVE_VARIANT, isActiveVariant, type ActiveVariant } from "../../../core/activeVariant";

const MODE_LABEL = Object.fromEntries(THEME_MODES.map((m) => [m.value, m.label])) as Record<ThemeMode, string>;

interface ThemeState {
  mode: ThemeMode;
  accent: Accent;
  activeVariant: ActiveVariant;
  design: DesignName;
}

function readStored(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeStored(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* choice just won't persist across reloads */
  }
}

// The saved accent, else the one <html> carries (a custom accent is "custom" plus a `data-accent-color` hex), else the default.
function readAccent(): Accent {
  const stored = readStored(THEME_STORAGE_KEYS.accent);
  if (isAccent(stored)) return stored;
  const html = document.documentElement;
  const name = html.getAttribute("data-accent");
  const color = html.getAttribute("data-accent-color");
  if (name === "custom" && isHexColor(color)) return color;
  return isAccent(name) ? name : DEFAULT_ACCENT;
}

// What the page should be showing: the user's saved choice, else whatever <html> already says, else the defaults.
function readThemeState(): ThemeState {
  const html = document.documentElement;
  const pick = <T,>(stored: string | null, attr: string, guard: (v: unknown) => v is T, fallback: T): T => {
    if (guard(stored)) return stored;
    const current = html.getAttribute(attr);
    return guard(current) ? current : fallback;
  };
  return {
    mode: pick(readStored(THEME_STORAGE_KEYS.mode), "data-theme", isThemeMode, "light"),
    accent: readAccent(),
    activeVariant: pick(readStored(THEME_STORAGE_KEYS.activeVariant), "data-active-variant", isActiveVariant, DEFAULT_ACTIVE_VARIANT),
    design: pick(readStored(THEME_STORAGE_KEYS.design), "data-design", isDesign, DEFAULT_DESIGN),
  };
}

/** The switcher's own theme control, used when there is no `ThemeProvider` above it: it restores the saved choice,
 * writes the theme onto <html> (which every component reads), remembers the choice, and follows outside changes. */
function useStandaloneTheme(enabled: boolean) {
  const [state, setState] = useState<ThemeState>(readThemeState);

  useEffect(() => {
    if (!enabled) return;
    // `state` was read from the same sources on first render, so this only writes the restored choice onto <html>.
    applyTheme(state.mode, state.accent, state.activeVariant, state.design);
    const obs = new MutationObserver(() => setState((prev) => {
      const next = readThemeState();
      return prev.mode === next.mode && prev.accent === next.accent && prev.activeVariant === next.activeVariant && prev.design === next.design ? prev : next;
    }));
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme", "data-accent", "data-accent-color", "data-active-variant", "data-design"] });
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only (re)applies when the switcher takes over / hands back control
  }, [enabled]);

  const update = (patch: Partial<ThemeState>, key: keyof typeof THEME_STORAGE_KEYS) => {
    const next = { ...state, ...patch };
    setState(next);
    writeStored(THEME_STORAGE_KEYS[key], String(patch[key]));
    applyTheme(next.mode, next.accent, next.activeVariant, next.design);
  };
  return {
    ...state,
    setMode: (mode: ThemeMode) => update({ mode }, "mode"),
    setAccent: (accent: Accent) => update({ accent }, "accent"),
    setActiveVariant: (activeVariant: ActiveVariant) => update({ activeVariant }, "activeVariant"),
    setDesign: (design: DesignName) => update({ design }, "design"),
  };
}

// Literal class strings so Tailwind can see them.
export type ThemeSwitcherAlign = "start" | "center" | "end" | "left" | "right";

// The dropdown always opens below the button; `align` is where along the button's bottom edge it lines up (start / center /
// end — "left" / "right" are accepted as aliases of start / end). Literal class strings so Tailwind can see them.
const PLACEMENT: Record<"start" | "center" | "end", string> = {
  start: "left-0",
  center: "left-1/2 -translate-x-1/2",
  end: "right-0",
};
const ALIGN_ALIAS: Record<string, "start" | "center" | "end"> = { start: "start", left: "start", center: "center", end: "end", right: "end" };

export interface ThemeSwitcherProps {
  /** Current mode — omit to use the surrounding `ThemeProvider`. */
  mode?: ThemeMode;
  /** Current accent — a built-in name or a custom hex color. Omit to use the surrounding `ThemeProvider`. */
  accent?: Accent;
  /** Current active-item style — omit to use the surrounding `ThemeProvider`. */
  activeVariant?: ActiveVariant;
  /** Current design language — "bento" or "clay". Omit to use the surrounding `ThemeProvider`. */
  design?: DesignName;
  /** Called when light/dark is picked (default: the `ThemeProvider`'s `setMode`). */
  onModeChange?: (mode: ThemeMode) => void;
  /** Called when an accent is picked (default: the `ThemeProvider`'s `setAccent`). */
  onAccentChange?: (accent: Accent) => void;
  /** Called when an active-item style is picked (default: the `ThemeProvider`'s `setActiveVariant`). */
  onActiveVariantChange?: (variant: ActiveVariant) => void;
  /** Called when a design is picked (default: the `ThemeProvider`'s `setDesign`). */
  onDesignChange?: (design: DesignName) => void;
  /** Where the dropdown (which always opens below the button) lines up with the button: "start" (left edges together), "center", or "end" (right edges together). "left" / "right" also work, as start / end. Default: "end". */
  align?: ThemeSwitcherAlign;
  /** Show the "Design" section — Bento or Claymorphism (default: true). */
  showDesign?: boolean;
  /** Show the "Active items" section (default: true). */
  showActiveItems?: boolean;
  /** Show the "Accent" section — the built-in colors plus a "Custom" row that opens a color picker for any color (default: true). */
  showAccent?: boolean;
  /** Show the "Custom" row in the Accent section — a color picker for any accent color (default: true). */
  showCustom?: boolean;
  /** Text of the custom-accent row (default: "Custom"). */
  customAccentLabel?: string;
  /** Controlled open state of the menu — omit to let the button open and close it. Handy to keep the menu showing in docs or screenshots. */
  open?: boolean;
  /** Called when the menu asks to open or close (the button, a click outside, Escape). */
  onOpenChange?: (open: boolean) => void;
  /** Enter / exit transition of the dropdown: "fade" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "zoom" | "zoom-out" | "flip" | "blur" | "bounce" | "rotate" | "drop" | "skew" (default: none). Respects `prefers-reduced-motion`. */
  transition?: TransitionVariant;
  /** Transition duration in ms (default: 450). */
  transitionDuration?: number;
  /** Delay before the enter transition starts, in ms (default: 0). */
  transitionDelay?: number;
  /** Effect while hovering the button: "lift" | "scale" | "press" | "tilt" | "ring" | "glow" | "shine" (default: none). */
  hoverEffect?: HoverEffect;
  /** Extra class name(s) appended to the root element. */
  className?: string;
}

/** One menu for light/dark, the accent color and the active-item style. It changes the app theme by itself: inside a
 * `ThemeProvider` it drives that provider; anywhere else it sets the page theme on <html> and remembers the choice, so
 * no provider is needed. It can also be fully controlled through `mode` / `accent` / `activeVariant` and the `on…Change` callbacks. */
export function ThemeSwitcher({
  mode: modeProp,
  accent: accentProp,
  activeVariant: activeProp,
  design: designProp,
  onModeChange,
  onAccentChange,
  onActiveVariantChange,
  onDesignChange,
  align = "end",
  showDesign = true,
  showActiveItems = true,
  showAccent = true,
  showCustom = true,
  customAccentLabel = "Custom",
  open: openProp,
  onOpenChange,
  transition,
  transitionDuration,
  transitionDelay,
  hoverEffect,
  className,
}: ThemeSwitcherProps) {
  // Under a ThemeProvider it drives that; with none it changes the page theme itself (built in).
  const hasProvider = useContext(ThemeProviderPresentContext);
  const provided = useTheme();
  const standalone = useStandaloneTheme(!hasProvider);
  const theme = hasProvider ? provided : standalone;
  const mode = modeProp ?? theme.mode;
  const accent = accentProp ?? theme.accent;
  const activeVariant = activeProp ?? theme.activeVariant;
  const design = designProp ?? theme.design;
  const setMode = onModeChange ?? theme.setMode;
  const setAccent = onAccentChange ?? theme.setAccent;
  const setActiveVariant = onActiveVariantChange ?? theme.setActiveVariant;
  const setDesign = onDesignChange ?? theme.setDesign;
  // Unknown values (e.g. a typo in an attribute) fall back to the defaults.
  const placement = PLACEMENT[ALIGN_ALIAS[align] ?? "end"];
  const [openState, setOpenState] = useState(false);
  const open = openProp ?? openState;
  const setOpen = (next: boolean) => {
    setOpenState(next);
    onOpenChange?.(next);
  };
  const rootRef = useRef<HTMLDivElement>(null);
  // With a `transition` the dropdown stays mounted for its exit; without one it unmounts at once, as before.
  const { mounted } = usePresence(open, transition ? (transitionDuration ?? DEFAULT_TRANSITION_MS) + (transitionDelay ?? 0) : 0);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      // composedPath, not contains(e.target): from a document listener a click inside a web component's shadow root is
      // retargeted to the host element, which would look like an outside click.
      if (!e.composedPath().includes(rootRef.current as EventTarget)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- setOpen only closes over state setters and the latest onOpenChange; re-subscribing on every render would be wasteful
  }, [open]);

  return (
    <div ref={rootRef} className={`relative ${className ?? ""}`}>
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-2 rounded-md border border-border bg-surface px-2.5 py-2 max-sm:px-2 text-sm text-fg-muted transition-colors hover:bg-surface-muted focus:outline-none focus:ring-2 focus:ring-fg/10 ${motionClass(undefined, hoverEffect) ?? ""}`}
      >
        <Preview theme={mode} accent={accent} />
        <span className="hidden capitalize sm:inline">
          {MODE_LABEL[mode]}{showAccent ? ` · ${accent}` : ""}
        </span>
        <ChevronDown size={14} className={`hidden transition-transform sm:block ${open ? "rotate-180" : ""}`} />
      </button>

      {(transition ? mounted : open) && (
        <div
          role="menu"
          aria-label="Theme"
          className={`absolute top-full mt-2 ${placement} z-50 max-h-96 w-56 overflow-y-auto rounded-lg border border-border bg-surface-raised p-2 shadow-lg ${motionClass(transition) ?? ""}`}
          style={motionStyle(transitionDuration, transitionDelay)}
          {...motionState(open)}
        >
          <p className="px-2 pb-1 pt-1 text-xs font-semibold text-fg-subtle">Theme</p>
          <ul>
            {THEME_MODES.map(({ value, label }) => (
              <li key={value}>
                <Row
                  active={mode === value}
                  onSelect={() => setMode(value)}
                  preview={<Preview theme={value} accent={accent} />}
                  label={label}
                />
              </li>
            ))}
          </ul>

          {showDesign && (
            <>
              <p className="px-2 pb-1 pt-3 text-xs font-semibold text-fg-subtle">Design</p>
              <ul>
                {DESIGNS.map(({ value, label }) => (
                  <li key={value}>
                    <Row active={design === value} onSelect={() => setDesign(value)} preview={<DesignSwatch design={value} mode={mode} />} label={label} />
                  </li>
                ))}
              </ul>
            </>
          )}

          {showActiveItems && (
            <>
              <p className="px-2 pb-1 pt-3 text-xs font-semibold text-fg-subtle">Active items</p>
              <ul>
                {ACTIVE_VARIANTS.map(({ value, label }) => (
                  <li key={value}>
                    <Row
                      active={activeVariant === value}
                      onSelect={() => setActiveVariant(value)}
                      preview={<ActiveSwatch variant={value} />}
                      label={label}
                    />
                  </li>
                ))}
              </ul>
            </>
          )}

          {showAccent && (
            <>
              <p className="px-2 pb-1 pt-3 text-xs font-semibold text-fg-subtle">Accent</p>
              <ul>
                {COLORS.map((c) => (
                  <li key={c.base}>
                    <Row active={accent === c.base} onSelect={() => setAccent(c.base)} preview={<Preview theme={mode} accent={c.base} />} label={c.name} />
                  </li>
                ))}
                {showCustom && (
                  <li>
                    <CustomAccentRow accent={accent} mode={mode} label={customAccentLabel} onPick={setAccent} />
                  </li>
                )}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}

/** "Custom" accent: a row that opens the browser's color picker; every pick applies at once. */
function CustomAccentRow({ accent, mode, label, onPick }: { accent: Accent; mode: string; label: string; onPick: (hex: Accent) => void }) {
  const active = isHexColor(accent);
  const [draft, setDraft] = useState("#7c3aed");
  const shown = active ? normalizeHex(accent) : draft;
  return (
    <label
      className={`flex w-full cursor-pointer items-center gap-3 rounded-md px-2 py-1.5 text-left text-sm transition-colors focus-within:ring-2 focus-within:ring-fg/10 hover:bg-surface-muted ${
        active ? "bg-surface-muted text-fg" : "text-fg-muted"
      }`}
    >
      <Preview theme={mode} accent={shown} />
      <span className="flex-1 truncate">{label}</span>
      {active && <span className="font-mono text-[11px] text-fg-subtle">{shown}</span>}
      <Check size={14} className={`shrink-0 ${active ? "visible" : "invisible"}`} />
      <input
        type="color"
        aria-label="Custom accent color"
        value={shown}
        onChange={(e) => {
          setDraft(e.target.value);
          onPick(e.target.value);
        }}
        className="sr-only"
      />
    </label>
  );
}

function Row({ active, onSelect, preview, label }: { active: boolean; onSelect: () => void; preview: React.ReactNode; label: string }) {
  return (
    <button
      type="button"
      role="menuitemradio"
      aria-checked={active}
      onClick={onSelect}
      className={`flex w-full items-center gap-3 rounded-md px-2 py-1.5 text-left text-sm transition-colors hover:bg-surface-muted ${
        active ? "bg-surface-muted text-fg" : "text-fg-muted"
      }`}
    >
      {preview}
      <span className="flex-1 truncate">{label}</span>
      <Check size={14} className={`shrink-0 ${active ? "visible" : "invisible"}`} />
    </button>
  );
}

// 2×2 dot tile. `data-theme` scopes the tile to that theme's tokens, so it previews the real
// surface / foreground colors (like the swatches in daisyUI's theme menu) instead of the page's own.
function Preview({ theme, accent }: { theme: string; accent: string }) {
  const dots = ["var(--color-fg)", accentShade(accent, 600), accentShade(accent, 400), accentShade(accent, 200)];
  return (
    <span
      data-theme={theme}
      aria-hidden
      className="grid shrink-0 grid-cols-2 gap-0.5 rounded-md border border-border bg-surface p-1 shadow-sm"
    >
      {dots.map((bg, i) => (
        <span key={i} className="size-1.5 rounded-full" style={{ backgroundColor: bg }} />
      ))}
    </span>
  );
}

// A tiny tile in each design's own style: Bento — flat with a thin outline; Clay — puffy with a raised inner light and shade.
function DesignSwatch({ design, mode }: { design: DesignName; mode: string }) {
  const style =
    design === "clay"
      ? { borderRadius: 9, background: "var(--color-surface)", boxShadow: "inset 2px 2px 3px rgba(255,255,255,0.9), inset -2px -2px 4px rgba(60,70,110,0.22), 2px 3px 5px rgba(60,70,110,0.22)" }
      : { borderRadius: 4, background: "var(--color-surface)", boxShadow: "inset 0 0 0 1px var(--color-border-strong)" };
  return <span data-theme={mode} aria-hidden className="block h-[22px] w-[22px] shrink-0" style={style} />;
}

// Tiny sample of how an active item looks in each variant, in the current accent.
function ActiveSwatch({ variant }: { variant: "solid" | "outline" | "soft" }) {
  const base = "block h-[22px] w-[22px] shrink-0 rounded-md";
  const style =
    variant === "solid"
      ? { backgroundColor: "var(--color-accent-600)" }
      : variant === "outline"
        ? { boxShadow: "inset 0 0 0 1.5px var(--color-accent-600)" }
        : { backgroundColor: "color-mix(in srgb, var(--color-accent-600) 18%, transparent)" };
  return <span aria-hidden className={base} style={style} />;
}
