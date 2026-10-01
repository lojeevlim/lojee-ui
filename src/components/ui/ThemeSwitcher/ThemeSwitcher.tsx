import { useContext, useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { COLORS } from "../../../core/tokens";
import {
  THEME_MODES,
  THEME_STORAGE_KEYS,
  ThemeProviderPresentContext,
  applyTheme,
  isAccentName,
  isThemeMode,
  useTheme,
  DEFAULT_ACCENT,
  type AccentName,
  type ThemeMode,
} from "../../../core/theme";
import { ACTIVE_VARIANTS, DEFAULT_ACTIVE_VARIANT, isActiveVariant, type ActiveVariant } from "../../../core/activeVariant";

const MODE_LABEL = Object.fromEntries(THEME_MODES.map((m) => [m.value, m.label])) as Record<ThemeMode, string>;

interface ThemeState {
  mode: ThemeMode;
  accent: AccentName;
  activeVariant: ActiveVariant;
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
    accent: pick(readStored(THEME_STORAGE_KEYS.accent), "data-accent", isAccentName, DEFAULT_ACCENT),
    activeVariant: pick(readStored(THEME_STORAGE_KEYS.activeVariant), "data-active-variant", isActiveVariant, DEFAULT_ACTIVE_VARIANT),
  };
}

/** The switcher's own theme control, used when there is no `ThemeProvider` above it: it restores the saved choice,
 * writes the theme onto <html> (which every component reads), remembers the choice, and follows outside changes. */
function useStandaloneTheme(enabled: boolean) {
  const [state, setState] = useState<ThemeState>(readThemeState);

  useEffect(() => {
    if (!enabled) return;
    // `state` was read from the same sources on first render, so this only writes the restored choice onto <html>.
    applyTheme(state.mode, state.accent, state.activeVariant);
    const obs = new MutationObserver(() => setState((prev) => {
      const next = readThemeState();
      return prev.mode === next.mode && prev.accent === next.accent && prev.activeVariant === next.activeVariant ? prev : next;
    }));
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme", "data-accent", "data-active-variant"] });
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only (re)applies when the switcher takes over / hands back control
  }, [enabled]);

  const update = (patch: Partial<ThemeState>, key: keyof typeof THEME_STORAGE_KEYS) => {
    const next = { ...state, ...patch };
    setState(next);
    writeStored(THEME_STORAGE_KEYS[key], String(patch[key]));
    applyTheme(next.mode, next.accent, next.activeVariant);
  };
  return {
    ...state,
    setMode: (mode: ThemeMode) => update({ mode }, "mode"),
    setAccent: (accent: AccentName) => update({ accent }, "accent"),
    setActiveVariant: (activeVariant: ActiveVariant) => update({ activeVariant }, "activeVariant"),
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
  /** Current accent — omit to use the surrounding `ThemeProvider`. */
  accent?: AccentName;
  /** Current active-item style — omit to use the surrounding `ThemeProvider`. */
  activeVariant?: ActiveVariant;
  /** Called when light/dark is picked (default: the `ThemeProvider`'s `setMode`). */
  onModeChange?: (mode: ThemeMode) => void;
  /** Called when an accent is picked (default: the `ThemeProvider`'s `setAccent`). */
  onAccentChange?: (accent: AccentName) => void;
  /** Called when an active-item style is picked (default: the `ThemeProvider`'s `setActiveVariant`). */
  onActiveVariantChange?: (variant: ActiveVariant) => void;
  /** Where the dropdown (which always opens below the button) lines up with the button: "start" (left edges together), "center", or "end" (right edges together). "left" / "right" also work, as start / end. Default: "end". */
  align?: ThemeSwitcherAlign;
  /** Show the "Active items" section (default: true). */
  showActiveItems?: boolean;
  /** Show the "Accent" section (default: true). */
  showAccent?: boolean;
  /** Controlled open state of the menu — omit to let the button open and close it. Handy to keep the menu showing in docs or screenshots. */
  open?: boolean;
  /** Called when the menu asks to open or close (the button, a click outside, Escape). */
  onOpenChange?: (open: boolean) => void;
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
  onModeChange,
  onAccentChange,
  onActiveVariantChange,
  align = "end",
  showActiveItems = true,
  showAccent = true,
  open: openProp,
  onOpenChange,
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
  const setMode = onModeChange ?? theme.setMode;
  const setAccent = onAccentChange ?? theme.setAccent;
  const setActiveVariant = onActiveVariantChange ?? theme.setActiveVariant;
  // Unknown values (e.g. a typo in an attribute) fall back to the defaults.
  const placement = PLACEMENT[ALIGN_ALIAS[align] ?? "end"];
  const [openState, setOpenState] = useState(false);
  const open = openProp ?? openState;
  const setOpen = (next: boolean) => {
    setOpenState(next);
    onOpenChange?.(next);
  };
  const rootRef = useRef<HTMLDivElement>(null);

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
        className="flex items-center gap-2 rounded-md border border-border bg-surface px-2.5 py-2 max-sm:px-2 text-sm text-fg-muted transition-colors hover:bg-surface-muted focus:outline-none focus:ring-2 focus:ring-fg/10"
      >
        <Preview theme={mode} accent={accent} />
        <span className="hidden capitalize sm:inline">
          {MODE_LABEL[mode]}{showAccent ? ` · ${accent}` : ""}
        </span>
        <ChevronDown size={14} className={`hidden transition-transform sm:block ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div
          role="menu"
          aria-label="Theme"
          className={`absolute top-full mt-2 ${placement} z-50 max-h-96 w-56 overflow-y-auto rounded-lg border border-border bg-surface-raised p-2 shadow-lg`}
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
              </ul>
            </>
          )}
        </div>
      )}
    </div>
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
  const dots = ["var(--color-fg)", `var(--color-${accent}-600)`, `var(--color-${accent}-400)`, `var(--color-${accent}-200)`];
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
