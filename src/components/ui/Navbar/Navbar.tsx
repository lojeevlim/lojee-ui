import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { cx, isColorName, type ColorName } from "../../../core/tokens";
import { NavbarItem } from "./NavbarItem";
import { navbarActiveFillClasses } from "./navbarActiveStyles";
import { activeMarker } from "../../../core/activeVariant";

// Determines which `items` row matches the current URL — identical logic to Sidebar's own
// `findActiveLabel` (see Sidebar.tsx for the full reasoning), kept as its own copy rather than a
// shared import, matching how this file's other Sidebar-mirrored pieces are also kept local instead
// of centralized.
function findActiveLabel(items: NavbarItemSpec[], pathname: string): string | undefined {
  let bestMatch: NavbarItemSpec | undefined;
  for (const item of items) {
    if (!item.href) continue;
    if (item.href === pathname) return item.label;
    if (item.href !== "/" && pathname.startsWith(item.href)) {
      if (!bestMatch || item.href.length > bestMatch.href!.length) bestMatch = item;
    }
  }
  return bestMatch?.label;
}

// Darkens a "#rrggbb" hex color for the second stop of a custom gradient — the same role Tailwind's
// 600→700 step plays for a named ColorName. Mirrors Sidebar's own `darkenHex` — kept as its own copy
// here rather than a shared import, matching how this file's other color maps below are also kept
// local instead of centralized (see e.g. SidebarMenuItem's own `ACTIVE_BG`).
function darkenHex(hex: string, factor = 0.82): string {
  const match = /^#?([0-9a-f]{6})$/i.exec(hex);
  // Not a "#rrggbb" (e.g. a `var(...)`/`rgb(...)` value) — can't be scaled channel-wise, so mix toward black instead.
  if (!match) return `color-mix(in srgb, ${hex}, black ${Math.round((1 - factor) * 100)}%)`;
  const value = parseInt(match[1], 16);
  const channel = (shift: number) => Math.max(0, Math.min(255, Math.round(((value >> shift) & 255) * factor)));
  return `#${[16, 8, 0].map((shift) => channel(shift).toString(16).padStart(2, "0")).join("")}`;
}

export type NavbarVariant = "light" | "dark" | "bordered" | "elevated" | "minimal" | "gradient" | "glass";

/** One link for the `items` shortcut — see `NavbarProps.items`. */
export interface NavbarItemSpec {
  /** The link's label. */
  label: string;
  /** Icon name, e.g. "home" — see src/core/icons.ts for the available set. */
  icon?: string;
  /** Renders the link as an `<a>` when set (otherwise a `<button type="button">` with no click
   * behavior of its own). */
  href?: string;
  /** Highlights this link as the current page/section — tinted with the parent Navbar's own `color`.
   * `Navbar` always manages the actual selection itself: clicking any link (with or without `href`)
   * updates it immediately, and a link's `href` is matched against the current URL on load/back-forward
   * -navigation — no router wiring needed for the common case. Setting `active: true` on a link is a
   * *default*, not a lock — same "seeds the initial selection, keeps winning only while it keeps
   * changing" behavior as Sidebar's identical `SidebarMenuItemSpec.active` (see there for the full
   * reasoning). For `disabled` per link, compose `<NavbarItem>` directly instead. */
  active?: boolean;
}

export interface NavbarProps {
  /** Logo/brand area, left-most. */
  brand?: ReactNode;
  /** Nav links/content, typically rendered next to the brand — composed directly (e.g. `<NavbarItem>`
   * children) alongside, or in addition to, the data-driven `items` shortcut below. */
  children?: ReactNode;
  /** Right-side content — search, buttons, avatar, etc. */
  actions?: ReactNode;
  /** Data-driven shortcut for a simple, evenly-spaced link row — the same self-managed active-state
   * system as Sidebar's own `items` (see `SidebarProps.items`): clicking a link updates the selection
   * immediately, a link's `href` is matched against the current URL on load/back-forward-navigation,
   * and every rendered link shares the row's width equally regardless of label length. Renders
   * alongside (before) any directly-composed `children` — not an exclusive alternative. */
  items?: NavbarItemSpec[];
  /** Only an initial default for the `items` shortcut (see `NavbarItemSpec.active` for the full
   * seed-vs-lock distinction) — which link starts selected when nothing else (a matching `href`, an
   * `active: true` entry) already determines it. */
  defaultActiveItem?: string;
  /** Called with the full `items` row object whenever the active link changes — a click, a URL match
   * on mount/back-forward-navigation, or a row's `active` field changing to point elsewhere. Use this
   * to read which link is active without tracking it yourself. Not called for links composed directly
   * via `children` (only the data-driven `items` shortcut has a "current link" concept). */
  onActiveItemChange?: (item: NavbarItemSpec) => void;
  /** Sticks to the top of its scroll container (default: false). */
  sticky?: boolean;
  /** Bottom border (default: true) — only meaningful for "light"/"dark"/"gradient". Has no effect on
   * "minimal" (never shows a border, by design — the whole point of that one) or on the detached-panel
   * variants "bordered"/"elevated"/"glass", each of which controls its own border entirely through
   * `variant` itself (see below), not this toggle. */
  bordered?: boolean;
  /**
   * Visual theme (default: "light"):
   * - "bordered"/"elevated"/"glass" all float as a detached card instead of docking full-width to the
   *   page — kept as separate names since each still has its own distinct bar look on top of that
   *   shared shape: "bordered" has a thick `color`-tinted border, shadow, and rounded corners (see
   *   `color`/`borderWidth`); "elevated" has that same shadow and rounded corners but no border — depth
   *   from the shadow alone, Material-bar style; "glass" is a faint, colorless `bg-white/10` tint plus
   *   `backdrop-blur-2xl` — a real frosted-glass look, not a solid tinted bar. `color` tints "glass"'s
   *   backdrop (the padded space around the bar) instead of the bar itself, since `backdrop-blur` can
   *   only ever blur what's behind it *within this same component* — its own backdrop, never your page
   *   — so a fully colorless bar would camouflage against a backdrop of the same color, with no
   *   contrast left to reveal its rounded corners or shadow. All three are self-contained — an inset
   *   backdrop is included automatically (padding + `bg-surface-muted`, or `color` for "glass") so the bar
   *   always reads correctly (rounded corners, blur) with no wrapper markup needed on your end.
   * - "dark" — slate-900 background, brand text (and, by inheritance, any plain text/links) switches to
   *   white.
   * - "minimal" — no background/border at all, blends into the page.
   * - "gradient" — a left-to-right gradient built from `color` (600 → 700).
   */
  variant?: NavbarVariant;
  /** Accent color (default: "accent" — follows the theme accent) — one of the built-in ColorNames, or any other CSS color value
   * (e.g. "#7c3aed" from a color-wheel picker) for a fully custom accent, unconstrained by the fixed
   * palette. For "gradient" it's the gradient itself (600→700-equivalent; a custom hex gets a
   * programmatically darkened second stop); for "bordered" it tints the bar's own border (has no effect
   * on "elevated", which has no border to tint); for "glass" — which has no background color of its own
   * — it tints the backdrop around the bar instead, since that's the only part of it that can carry a
   * color at all. Has no effect on "light"/"dark"/"minimal". */
  color?: ColorName | (string & {});
  /** "bordered"'s own border thickness in px (default: 2). Has no effect on any other variant — every
   * other variant's border (where it has one at all) is a fixed-width neutral divider, not an
   * adjustable, colored one. */
  borderWidth?: number;
  /** Extra CSS class(es) added to the root element, merged before `classNames.root`. */
  className?: string;
  /** Per-part class overrides — merged after (and win over) the built-in styling. */
  classNames?: {
    root?: string;
    brand?: string;
    links?: string;
    actions?: string;
  };
}

const VARIANT_CLASSES: Record<NavbarVariant, string> = {
  light: "bg-surface text-fg",
  // `text-white/70` mirrors Sidebar's own fix for the exact same gap — a plain-text brand/link with no
  // explicit color of its own otherwise falls back to the browser's default (near-black, invisible
  // against `bg-slate-900`) text color instead of inheriting something sane.
  dark: "bg-slate-900 text-white/70",
  // "bordered", "elevated", and "glass" all float as a detached card (see `isDetachedPanel`) rather
  // than docking full-width — kept as separate `variant` names since each still has its own distinct
  // look (colored border / shadow-only / frosted-transparent) on top of that shared shape. "elevated"
  // deliberately carries no border — shadow-lg alone does the "floating card" job, Material-style — so
  // it stays visually distinct from "bordered" instead of duplicating it.
  bordered: "bg-surface text-fg border-2 border-border-strong rounded-xl shadow-lg",
  elevated: "bg-surface text-fg rounded-xl shadow-lg",
  minimal: "bg-transparent text-fg",
  gradient: "text-white",
  // Same frosted-glass treatment as Sidebar's own "glass" — see that component for the full reasoning
  // on `bg-white/10`/`backdrop-blur-2xl`/the arbitrary shadow value. The shadow here is a touch lighter
  // (`35px`/`-12px` vs. Sidebar's `55px`/`-10px`) since a navbar is a much shorter, wider shape — the same
  // spread read as disproportionately heavy stretched across a full-width bar instead of a tall rail.
  glass: "bg-white/10 backdrop-blur-2xl border border-white/10 text-white rounded-xl shadow-[0_0_35px_-12px_rgba(0,0,0,0.18)]",
};

// Only "light"/"dark"/"gradient" ever render the `bordered` boolean's divider (see `isDetachedPanel`
// and "minimal" in the `variant` JSDoc above) — the other four don't need an entry here at all.
const VARIANT_DIVIDER_CLASSES: Partial<Record<NavbarVariant, string>> = {
  light: "border-border",
  dark: "border-slate-800",
  gradient: "border-white/15",
};

const VARIANT_BRAND_TEXT: Record<NavbarVariant, string> = {
  light: "text-fg",
  dark: "text-white",
  bordered: "text-fg",
  elevated: "text-fg",
  minimal: "text-fg",
  gradient: "text-white",
  glass: "text-white",
};

// "bordered"'s defining feature is its border, so unlike every other variant it tints that border with
// the Navbar's own `color` — same "300" shade every ColorName's own outline-style border already uses
// elsewhere in the library (see core/tokens.ts's colorClasses, and Sidebar's identical map), for
// consistency. "elevated" has no border to tint, so it doesn't use this map.
const DETACHED_PANEL_ACCENT_BORDER: Record<ColorName, string> = {
  slate: "border-border-strong",
  gray: "border-border-strong",
  indigo: "border-indigo-300 dark:border-indigo-700",
  accent: "border-accent-300 dark:border-accent-700",
  violet: "border-violet-300 dark:border-violet-700",
  blue: "border-blue-300 dark:border-blue-700",
  cyan: "border-cyan-300 dark:border-cyan-700",
  emerald: "border-emerald-300 dark:border-emerald-700",
  teal: "border-teal-300 dark:border-teal-700",
  amber: "border-amber-300 dark:border-amber-700",
  orange: "border-orange-300 dark:border-orange-700",
  rose: "border-rose-300 dark:border-rose-700",
  pink: "border-pink-300 dark:border-pink-700",
};

// "glass" itself has no background color (see VARIANT_CLASSES) — its own backdrop, the space around
// the frosted bar, is the only thing that can carry `color` for it, so it does instead. Same mid-tone
// (500) as Sidebar's identical map — this backdrop's whole job is to be visible color behind a
// translucent bar, the opposite of a subtle divider/border tint.
const GLASS_BACKDROP: Record<ColorName, string> = {
  slate: "bg-slate-500",
  gray: "bg-gray-500",
  indigo: "bg-indigo-500",
  accent: "bg-accent-500",
  violet: "bg-violet-500",
  blue: "bg-blue-500",
  cyan: "bg-cyan-500",
  emerald: "bg-emerald-500",
  teal: "bg-teal-500",
  amber: "bg-amber-500",
  orange: "bg-orange-500",
  rose: "bg-rose-500",
  pink: "bg-pink-500",
};

export function Navbar({
  brand,
  children,
  actions,
  items,
  defaultActiveItem,
  onActiveItemChange,
  sticky = false,
  bordered = true,
  variant = "light",
  color = "accent",
  borderWidth,
  className,
  classNames,
}: NavbarProps) {
  // Same "detached panel" concept as Sidebar (see its own `isDetachedPanel` for the full reasoning) —
  // "bordered"/"elevated"/"glass" float as a card with an inset backdrop instead of docking full-width.
  const isDetachedPanel = variant === "bordered" || variant === "elevated" || variant === "glass";
  const colorIsNamed = isColorName(color);
  // Same pairing Sidebar gives its own directly-composed `SidebarMenuItem`s (see Sidebar.tsx's `dark`/
  // `vividActive`) — threaded automatically into every `items`-generated `NavbarItem` below, so (unlike
  // directly-composed `NavbarItem` children, which have no ancestor to auto-detect these from — see its
  // own doc comment) the data-driven shortcut needs no extra wiring to match the parent Navbar's theme.
  const dark = variant === "dark" || variant === "gradient" || variant === "glass";
  const vividActive = variant === "gradient" || variant === "glass";
  // Always self-manages which `items` link is highlighted — identical logic/reasoning to Sidebar's own
  // `selectedLabel` (see Sidebar.tsx for the full "seed vs. lock" explanation of `active`/
  // `defaultActiveItem`, and of the URL-matching/`popstate`/`onActiveItemChange` effects below).
  const explicitActiveLabel = items?.find((item) => item.active)?.label;
  const [selectedLabel, setSelectedLabel] = useState<string | undefined>(
    () =>
      (typeof window === "undefined" ? undefined : findActiveLabel(items ?? [], window.location.pathname)) ??
      explicitActiveLabel ??
      defaultActiveItem
  );
  const [prevExplicitActiveLabel, setPrevExplicitActiveLabel] = useState(explicitActiveLabel);
  if (explicitActiveLabel !== prevExplicitActiveLabel) {
    setPrevExplicitActiveLabel(explicitActiveLabel);
    if (explicitActiveLabel !== undefined) setSelectedLabel(explicitActiveLabel);
  }
  const itemsRef = useRef(items);
  useEffect(() => {
    itemsRef.current = items;
  });
  useEffect(() => {
    if (typeof window === "undefined") return;
    const syncToUrl = () => setSelectedLabel(findActiveLabel(itemsRef.current ?? [], window.location.pathname));
    window.addEventListener("popstate", syncToUrl);
    return () => window.removeEventListener("popstate", syncToUrl);
  }, []);
  useEffect(() => {
    if (selectedLabel === undefined) return;
    const item = itemsRef.current?.find((i) => i.label === selectedLabel);
    if (item) onActiveItemChange?.(item);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- onActiveItemChange intentionally excluded: it's a callback prop, not reactive state, and including it would re-fire this effect on every render whenever the consumer passes a new inline function.
  }, [selectedLabel]);
  // A single shared "pill" slides between links instead of each link cross-fading its own background
  // — a continuous slide reads far smoother than N independent color transitions firing at once (see
  // NavbarItem's own `activeStyle` doc). `itemNodesRef` holds each rendered link's real DOM node
  // (keyed by label) purely so this effect can measure it; `linksRef` is the positioned ancestor those
  // measurements are made relative to.
  const linksRef = useRef<HTMLDivElement>(null);
  const itemNodesRef = useRef<Record<string, HTMLElement | null>>({});
  const [pillRect, setPillRect] = useState<{ left: number; width: number } | null>(null);
  useLayoutEffect(() => {
    const measure = () => {
      const container = linksRef.current;
      const activeEl = selectedLabel ? itemNodesRef.current[selectedLabel] : null;
      if (!container || !activeEl) {
        setPillRect(null);
        return;
      }
      const containerRect = container.getBoundingClientRect();
      const activeElRect = activeEl.getBoundingClientRect();
      setPillRect({ left: activeElRect.left - containerRect.left, width: activeElRect.width });
    };
    measure();
    // Link widths are content-driven (`auto-cols-fr` sizes every column to the widest link's own text)
    // — a viewport resize can reflow that, e.g. text wrapping differently at a narrower width, so the
    // pill needs to re-measure rather than keep animating toward a now-stale position.
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [selectedLabel, items]);
  const itemRows =
    items &&
    items.length > 0 &&
    items.map((item, index) => (
      <NavbarItem
        key={`${item.label}-${index}`}
        ref={(el) => {
          itemNodesRef.current[item.label] = el;
        }}
        icon={item.icon}
        href={item.href}
        active={selectedLabel === item.label}
        activeStyle="text"
        // A unique value per item — see NavbarItem's own `slotName` doc for why: every generated item
        // shares this single Navbar's shadow root, so their internal label slots would otherwise all
        // be unnamed together and collide.
        slotName={`navbar-item-label-${index}`}
        color={color}
        dark={dark}
        vividActive={vividActive}
        onClick={() => setSelectedLabel(item.label)}
      >
        {item.label}
      </NavbarItem>
    ));
  // Only "bordered" ties its border to `color`/`borderWidth` — "elevated" has no border at all
  // (shadow-only), "glass" deliberately stays colorless (a real frosted-glass look has no tint), and
  // every other variant's border is a fixed-width neutral divider, not an adjustable, colored one.
  const hasAccentBorder = variant === "bordered";
  const borderedAccentClass = hasAccentBorder && colorIsNamed ? DETACHED_PANEL_ACCENT_BORDER[color] : undefined;
  const borderedAccentStyle: CSSProperties | undefined = hasAccentBorder
    ? {
        ...(!colorIsNamed && { borderColor: color }),
        ...(borderWidth !== undefined && { borderWidth: `${borderWidth}px` }),
      }
    : undefined;
  const isGlass = variant === "glass";
  // "glass"'s own backdrop (the padded space around the bar, not the bar itself) is what carries
  // `color` for it — a named ColorName gets a real Tailwind class; a custom value falls back to the
  // same inline-style approach used everywhere else in this component for arbitrary CSS colors.
  const glassBackdropClass = isGlass && colorIsNamed ? GLASS_BACKDROP[color] : undefined;
  const style: CSSProperties = {
    ...(isGlass && !colorIsNamed && { backgroundColor: color }),
    ...(variant === "gradient" && {
      backgroundImage: colorIsNamed
        ? // "to right", not Sidebar's "to bottom" — this bar is horizontal, not a vertical rail.
          `linear-gradient(to right, var(--color-${color}-600), var(--color-${color}-700))`
        : `linear-gradient(to right, ${color}, ${darkenHex(color)})`,
    }),
  };
  const dividerClass = VARIANT_DIVIDER_CLASSES[variant];
  const showDivider = !isDetachedPanel && variant !== "minimal" && bordered && dividerClass != null;

  const bar = (
    <nav
      className={cx(
        "flex items-center justify-between gap-4 px-6 py-3",
        VARIANT_CLASSES[variant],
        isDetachedPanel && borderedAccentClass,
        showDivider && cx("border-b", dividerClass),
        !isDetachedPanel && (sticky ? "sticky top-0 z-40" : undefined),
        className,
        classNames?.root
      )}
      style={isDetachedPanel ? borderedAccentStyle : style}
    >
      <div className="flex min-w-0 items-center gap-6">
        {/* Unconditional, unlike a `brand != null &&` guard — that would skip rendering this `<slot>`
            entirely for the web-component build, and a `<slot>` that was never rendered can never
            receive *anything* projected into it, including a `<div slot="brand">` a non-React consumer
            supplies with no `brand` attribute of its own. React's own `brand` prop reaching this exact
            same slot as fallback content (`{brand}`) means a plain-React consumer who omits `brand`
            entirely still sees nothing here — just an empty wrapper contributing this row's own `gap-6`
            even though it has nothing to show, the one accepted tradeoff for making the slot workable
            at all without inspecting real DOM assignment (React has no way to know, at render time,
            whether a light-DOM node will later get projected here). */}
        <div className={cx("flex shrink-0 items-center gap-2 font-semibold", VARIANT_BRAND_TEXT[variant], classNames?.brand)}>
          <slot name="brand">{brand}</slot>
        </div>
        <div
          ref={linksRef}
          className={cx(
            "relative",
            // The `items` shortcut lays its links out as equal-width grid columns instead of a plain
            // flex row — each column sizes to the *widest* link's own content (`auto-cols-fr` with no
            // other width constraint on this row), not stretched to fill whatever's left of the bar
            // before `actions`; that would blow the row out far wider than the links actually need
            // (and, with only one or two short labels, comically so). Freeform `children` keep their
            // ordinary natural-width flex layout, same as before, whether or not `items` is also given
            // alongside them.
            itemRows ? "grid grid-flow-col auto-cols-fr items-center gap-2" : "flex items-center gap-6",
            classNames?.links
          )}
        >
          {itemRows && pillRect && (
            <div
              aria-hidden
              className={cx(
                "pointer-events-none absolute inset-y-0 rounded-md transition-[left,width,background-color,box-shadow] duration-200 ease-[cubic-bezier(.4,0,.2,1)]",
                navbarActiveFillClasses(color, dark, vividActive)
              )}
              {...activeMarker("fill", color, colorIsNamed, dark, {
                left: pillRect.left,
                width: pillRect.width,
                ...(!colorIsNamed && !dark && { backgroundColor: color }),
              })}
            />
          )}
          {itemRows}
          <slot>{children}</slot>
        </div>
      </div>
      {/* Same reasoning as the `brand` slot above — rendered unconditionally so a non-React
          `<div slot="actions">` actually has a `<slot>` to project into. */}
      <div className={cx("flex shrink-0 items-center gap-3", classNames?.actions)}>
        <slot name="actions">{actions}</slot>
      </div>
    </nav>
  );

  if (!isDetachedPanel) return bar;

  return (
    <div
      className={cx("p-3", isGlass ? glassBackdropClass : "bg-surface-muted", sticky && "sticky top-0 z-40")}
      style={style}
    >
      {bar}
    </div>
  );
}
