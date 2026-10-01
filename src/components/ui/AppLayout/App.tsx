import { useEffect, useRef, useState, type ReactNode } from "react";
import { Menu } from "lucide-react";
import { cx } from "../../../core/tokens";
import { ThemeContext, useTheme, type AccentName } from "../../../core/theme";
import type { ActiveVariant } from "../../../core/activeVariant";
import { APP_THEME_OPTIONS, DEFAULT_LAYOUT, appGridStyle, type AppTheme, type GridLayout } from "./appLayout";
import { APP_BREAKPOINTS, APP_BREAKPOINT_PX, type AppBreakpoint } from "./breakpoints";
import { AppLayoutCtx, useAppLayout } from "./appLayoutContext";

export interface AppProps {
  /** Visual theme. Omit it and the App follows the surrounding `ThemeProvider` (light without one); pass it
   * to pin just this App to a theme — a scoped override that doesn't touch the page's own theme. */
  theme?: AppTheme;
  /** Brand accent (a built-in color name). Omit to follow the surrounding `ThemeProvider`. */
  accent?: AccentName;
  /** How active items inside are drawn — "solid", "outline" or "soft". Omit to follow the `ThemeProvider`. */
  activeVariant?: ActiveVariant;
  /** Section placement as a matrix of section names; the CSS Grid is generated from it (default: top
   * spanning the full width, side + main in the middle row, footer spanning the full width). */
  layout?: GridLayout;
  /** Container width below which the grid gives way to a single column with `<Side>` in an off-canvas
   * drawer (default: "md" = 28rem; "3xl" = 48rem). Measured on the App itself, not the viewport. */
  collapseBelow?: AppBreakpoint;
  /** `<Top>`, `<Side>`, `<Main>` and `<Foot>` — in any order. */
  children?: ReactNode;
  /** Extra class names for the root element, e.g. `h-full` to size the App to its parent instead of the viewport. */
  className?: string;
}

/**
 * Themeable, responsive app shell. Fills the viewport height by default (`h-screen`); pass a `className`
 * like `h-full` to size it to a parent instead.
 * Placement is owned by `layout`, never by the sections themselves: each
 * section component names its own grid area, and the grid template is derived from the layout matrix and
 * passed in as CSS variables (so arbitrary layouts need no generated Tailwind classes).
 *
 * Below `collapseBelow` the grid becomes one stacked column (top, main, footer) and `<Side>` turns into an
 * off-canvas drawer, opened by a `<SideToggle>` you place in `<Top>`. It keys off the App's own width, not
 * the viewport, so it also behaves inside a narrow panel.
 */
export function App({ theme: themeProp, accent, activeVariant, layout = DEFAULT_LAYOUT, collapseBelow = "md", children, className }: AppProps) {
  // `theme` reaches the CSS as `data-theme` (see theme.css); guard against a stale/unknown value.
  const parent = useTheme();
  const theme = themeProp ?? parent.mode;
  const known = APP_THEME_OPTIONS.some((t) => t.value === theme);
  const [sideOpen, setSideOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const bp = APP_BREAKPOINTS[collapseBelow];

  useEffect(() => {
    if (!sideOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSideOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [sideOpen]);

  // Mirrors the CSS container query in JS (the observer also fires once on observe), so children can adapt —
  // e.g. drop their own collapse toggle while Side is a drawer.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const obs = new ResizeObserver(([entry]) => setIsCollapsed(entry.contentRect.width < APP_BREAKPOINT_PX[collapseBelow]));
    obs.observe(el);
    return () => obs.disconnect();
  }, [collapseBelow]);

  // Everything inside — components via the CSS tokens, and code via useTheme() — sees this App's theme.
  const resolvedAccent = accent ?? parent.accent;
  const resolvedActive = activeVariant ?? parent.activeVariant;
  const scoped = { ...parent, mode: known ? theme : "light", accent: resolvedAccent, activeVariant: resolvedActive };
  return (
    <ThemeContext.Provider value={scoped}>
      <AppLayoutCtx.Provider value={{ breakpoint: collapseBelow, isCollapsed, sideOpen, setSideOpen }}>
        <div
          ref={rootRef}
          data-theme={known ? theme : "light"}
          data-accent={resolvedAccent}
          data-active-variant={resolvedActive}
          className={cx(
            "@container relative h-screen w-full overflow-hidden bg-[color-mix(in_srgb,var(--color-accent-500)_5%,var(--color-surface))] text-fg",
            className
          )}
        >
          <div style={appGridStyle(layout)} className={bp.grid}>
            {children}
          </div>
          {sideOpen && (
            <div
              aria-hidden
              onClick={() => setSideOpen(false)}
              className={cx("absolute inset-0 z-20 bg-black/40", bp.hideAbove)}
            />
          )}
        </div>
      </AppLayoutCtx.Provider>
    </ThemeContext.Provider>
  );
}

interface SectionProps {
  children?: ReactNode;
  className?: string;
}

// Each section's grid area is a literal class (see breakpoints.ts) so Tailwind can see it.
export function Top({ children, className }: SectionProps) {
  const { breakpoint } = useAppLayout();
  return <header className={cx(APP_BREAKPOINTS[breakpoint].top, className)}>{children}</header>;
}

export function Side({ children, className }: SectionProps) {
  const { breakpoint, sideOpen } = useAppLayout();
  return (
    <aside
      className={cx(
        // Collapsed: an off-canvas panel sliding in over the App. Grid mode: a normal grid cell.
        "absolute inset-y-0 left-0 z-30 w-fit max-w-[85%] min-h-0 overflow-auto bg-surface shadow-xl transition-transform duration-200",
        sideOpen ? "translate-x-0" : "-translate-x-full",
        APP_BREAKPOINTS[breakpoint].side,
        className
      )}
    >
      {children}
    </aside>
  );
}

export { Main, type MainProps, type MainPadding } from "../Main/Main";

/** The bottom section. Put the library's `<Footer>` (or anything else) inside it. */
export function Foot({ children, className }: SectionProps) {
  const { breakpoint } = useAppLayout();
  return <footer className={cx(APP_BREAKPOINTS[breakpoint].footer, className)}>{children}</footer>;
}

/** Menu button that opens `<Side>` while the App is collapsed; renders nothing once the grid layout shows.
 * Place it in `<Top>` (e.g. as a Navbar `brand`). */
export function SideToggle({ className, label = "Open navigation" }: { className?: string; label?: string }) {
  const { breakpoint, sideOpen, setSideOpen } = useAppLayout();
  return (
    <button
      type="button"
      aria-label={label}
      aria-expanded={sideOpen}
      onClick={() => setSideOpen(!sideOpen)}
      className={cx(
        "rounded-md p-1.5 text-fg-muted transition-colors hover:bg-surface-muted hover:text-fg",
        APP_BREAKPOINTS[breakpoint].hideAbove,
        className
      )}
    >
      <Menu size={20} />
    </button>
  );
}
