import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { linearGradient, type GradientDirection } from "../../../core/gradient";
import { cx, isColorName, type ColorName } from "../../../core/tokens";
import { NavbarItem } from "./NavbarItem";
import { SideToggle } from "../AppLayout/App";
import { useAppLayout } from "../AppLayout/appLayoutContext";
import { Tooltip } from "../Tooltip/Tooltip";
import { navbarActiveFillClasses } from "./navbarActiveStyles";
import { activeMarker } from "../../../core/activeVariant";
import { layoutBox } from "../../../core/layoutOffset";
import { motionClass, motionStyle, type TransitionVariant, type HoverEffect } from "../../../core/motion";

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

export type NavbarItemsAlign = "left" | "center" | "right";

export type NavbarScrollGlowEffect = "spread" | "fade" | "sweep" | "pulse" | "rainbow" | "particles";
const SCROLL_GLOW_EFFECTS: NavbarScrollGlowEffect[] = ["spread", "fade", "sweep", "pulse", "rainbow", "particles"];

export type NavbarVariant = "light" | "dark" | "bordered" | "elevated" | "minimal" | "gradient";

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
  /** Shows a tooltip under the link on hover/focus (useful when the label is visually hidden, e.g. an icon-only link on phones). */
  tooltip?: string;
  /** Keeps that tooltip showing while true, whether or not the link is hovered — e.g. to step through a short hint tour of icon-only links. */
  tooltipOpen?: boolean;
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
  /** Inside an `<App>` / `<l-app>`: while the App is collapsed (narrow screens) show a menu toggle in the brand area that opens
   * the sidebar drawer, so only the toggle is visible there (default: false). Has no effect outside an App or while the App isn't collapsed. */
  collapsible?: boolean;
  /** Bottom border (default: true) — only meaningful for "light"/"dark"/"gradient". Has no effect on
   * "minimal" (never shows a border, by design — the whole point of that one) or on the detached-panel
   * variants "bordered"/"elevated", each of which controls its own border entirely through
   * `variant` itself (see below), not this toggle. */
  bordered?: boolean;
  /**
   * Visual theme (default: "light"):
   * - "bordered"/"elevated" both float as a detached card instead of docking full-width to the
   *   page — kept as separate names since each still has its own distinct bar look on top of that
   *   shared shape: "bordered" has a thick `color`-tinted border, shadow, and rounded corners (see
   *   `color`/`borderWidth`); "elevated" has that same shadow and rounded corners but no border — depth
   *   from the shadow alone, Material-bar style.
   *   Both are self-contained — an inset backdrop is included automatically (padding + a light tint of the theme accent)
   *   so the bar always reads correctly (rounded corners) with no wrapper markup needed on your end.
   * - "dark" — a deep shade of the theme accent (accent-950), brand text (and, by inheritance, any plain text/links) switches to
   *   white.
   * - "minimal" — no background/border at all, blends into the page.
   * - "gradient" — a left-to-right gradient built from `color` (600 → 700).
   */
  variant?: NavbarVariant;
  /** Accent color (default: "accent" — follows the theme accent) — one of the built-in ColorNames, or any other CSS color value
   * (e.g. "#7c3aed" from a color-wheel picker) for a fully custom accent, unconstrained by the fixed
   * palette. For "gradient" it's the gradient itself (600→700-equivalent; a custom hex gets a
   * programmatically darkened second stop); for "bordered" it tints the bar's own border (has no effect
   * on "elevated", which has no border to tint). Has no effect on "light"/"dark"/"minimal". */
  color?: ColorName | (string & {});
  /** Second color of the "gradient" variant: a `ColorName` or any CSS color such as "#ec4899" (default: a darker shade of `color`). */
  gradientTo?: ColorName | (string & {});
  /** Direction of the "gradient" variant: "to-right" | "to-left" | "to-bottom" | "to-top" | "to-br" | "to-bl" | "to-tr" | "to-tl" (default: "to-right"). */
  gradientDirection?: GradientDirection;
  /** "bordered"'s own border thickness in px (default: 2). Has no effect on any other variant — every
   * other variant's border (where it has one at all) is a fixed-width neutral divider, not an
   * adjustable, colored one. */
  borderWidth?: number;
  /** Enter transition: "fade" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "zoom" | "zoom-out" | "flip" | "blur" | "bounce" | "rotate" | "drop" | "skew" (default: none). Respects `prefers-reduced-motion`. */
  transition?: TransitionVariant;
  /** Enter transition duration in ms (default: 450). */
  transitionDuration?: number;
  /** Delay before the enter transition starts, in ms (default: 0) — handy for staggering. */
  transitionDelay?: number;
  /** Effect while hovering: "lift" | "scale" | "press" | "tilt" | "ring" | "glow" | "shine" (default: none). Applied to each link of the `items` shortcut (links composed as `children` take their own `hoverEffect`). */
  hoverEffect?: HoverEffect;
  /** Transparent while at the top, switching to the variant's solid background once scrolled past `scrollThreshold` (default: false). Applies to "light"/"dark"/"gradient"/"bordered"/"elevated". Works with page scroll or an inner scroll container. */
  scrollBackground?: boolean;
  /** Shows an accent glow along the bottom edge while scrolling, fading out `scrollGlowDuration` ms after scrolling stops (default: false). Only shown once scrolled past `scrollThreshold`. `true` (or a bare `scroll-glow`) is "spread"; pass an effect name to pick how it animates: "spread" grows from the center outward | "fade" fades the whole line in and out | "sweep" a light travels along the edge | "pulse" breathes while scrolling | "rainbow" a multi-color line that spreads from the center | "particles" the spread glow plus sparks falling from the edge. */
  scrollGlow?: boolean | NavbarScrollGlowEffect;
  /** Where the link row sits in the bar: "left" next to the brand (default) | "center" centered between brand and actions | "right" next to the actions. */
  itemsAlign?: NavbarItemsAlign;
  /** Pixels scrolled before `scrollBackground`/`scrollGlow` kick in (default: 0). */
  scrollThreshold?: number;
  /** How long after scrolling stops the glow fades away, in ms (default: 600). */
  scrollGlowDuration?: number;
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
  dark: "bg-accent-950 text-white/70",
  // "bordered" and "elevated" both float as a detached card (see `isDetachedPanel`) rather
  // than docking full-width — kept as separate `variant` names since each still has its own distinct
  // look (colored border / shadow-only) on top of that shared shape. "elevated"
  // deliberately carries no border — shadow-lg alone does the "floating card" job, Material-style — so
  // it stays visually distinct from "bordered" instead of duplicating it.
  bordered: "bg-surface text-fg border-2 border-border-strong rounded-xl shadow-lg",
  elevated: "bg-surface text-fg rounded-xl shadow-lg",
  minimal: "bg-transparent text-fg",
  gradient: "text-white",
};

// Only "light"/"dark"/"gradient" ever render the `bordered` boolean's divider (see `isDetachedPanel`
// and "minimal" in the `variant` JSDoc above) — the other three don't need an entry here at all.
const VARIANT_DIVIDER_CLASSES: Partial<Record<NavbarVariant, string>> = {
  light: "border-border",
  dark: "border-accent-900",
  gradient: "border-white/15",
};

const VARIANT_BRAND_TEXT: Record<NavbarVariant, string> = {
  light: "text-fg",
  dark: "text-white",
  bordered: "text-fg",
  elevated: "text-fg",
  minimal: "text-fg",
  gradient: "text-white",
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

export function Navbar({
  brand,
  children,
  actions,
  items,
  defaultActiveItem,
  onActiveItemChange,
  sticky = false,
  collapsible = false,
  bordered = true,
  variant = "light",
  color = "accent",
  gradientTo,
  gradientDirection = "to-right",
  borderWidth,
  transition,
  transitionDuration,
  transitionDelay,
  hoverEffect,
  scrollBackground = false,
  scrollGlow: scrollGlowProp = false,
  itemsAlign = "left",
  scrollThreshold = 0,
  scrollGlowDuration = 600,
  className,
  classNames,
}: NavbarProps) {
  // Scroll effects (same idea as the landing page header): `scrolled` flips the background solid, `glow`
  // is true while the page is actively scrolling and drops back `scrollGlowDuration` ms after it stops.
  const { isCollapsed } = useAppLayout();
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [glow, setGlow] = useState(false);
  // `scrollGlow` doubles as the effect name; `true`, "" (a bare `scroll-glow` attribute) and unknown values mean "spread".
  const scrollGlowEffect: NavbarScrollGlowEffect | null =
    !scrollGlowProp || (scrollGlowProp as string) === "false" ? null : SCROLL_GLOW_EFFECTS.includes(scrollGlowProp as NavbarScrollGlowEffect) ? (scrollGlowProp as NavbarScrollGlowEffect) : "spread";
  const scrollGlow = scrollGlowEffect !== null;
  const scrollEffects = scrollBackground || scrollGlow;
  useEffect(() => {
    if (!scrollEffects || typeof window === "undefined") return;
    let idle = 0;
    let frame = 0;
    const offsetOf = (target: EventTarget | null) =>
      target instanceof Element ? target.scrollTop : window.scrollY;
    // Scroll doesn't bubble but is capturable, so one window listener sees the page and any inner scroll
    // container. Only react to scrolling that actually contains this navbar — walking up from the nav and
    // hopping out of the shadow root (via its host) when used as `<l-navbar>`.
    const contains = (scroller: Element, nav: Node) => {
      let node: Node | null = nav;
      while (node) {
        if (node === scroller) return true;
        node = node.parentNode ?? (node as ShadowRoot).host ?? null;
      }
      return false;
    };
    const onScroll = (event: Event) => {
      const nav = navRef.current;
      const target = event.target;
      const isPage = target === document || target === document.documentElement;
      if (!nav || (!isPage && !(target instanceof Element && contains(target, nav)))) return;
      const top = offsetOf(isPage ? null : target);
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const past = top > scrollThreshold;
        setScrolled(past);
        window.clearTimeout(idle);
        if (!past) {
          setGlow(false);
          return;
        }
        setGlow(true);
        idle = window.setTimeout(() => setGlow(false), scrollGlowDuration);
      });
    };
    // Initial state for a page that is already scrolled (reload/anchor) — only the window case is knowable here.
    frame = requestAnimationFrame(() => setScrolled(window.scrollY > scrollThreshold));
    window.addEventListener("scroll", onScroll, { passive: true, capture: true });
    return () => {
      window.removeEventListener("scroll", onScroll, true);
      cancelAnimationFrame(frame);
      window.clearTimeout(idle);
    };
  }, [scrollEffects, scrollThreshold, scrollGlowDuration]);
  const reducedMotion = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const transparentTop = scrollBackground && !scrolled;

  // Same "detached panel" concept as Sidebar (see its own `isDetachedPanel` for the full reasoning) —
  // "bordered"/"elevated" float as a card with an inset backdrop instead of docking full-width.
  const isDetachedPanel = variant === "bordered" || variant === "elevated";
  const colorIsNamed = isColorName(color);
  // Same pairing Sidebar gives its own directly-composed `SidebarMenuItem`s (see Sidebar.tsx's `dark`/
  // `vividActive`) — threaded automatically into every `items`-generated `NavbarItem` below, so (unlike
  // directly-composed `NavbarItem` children, which have no ancestor to auto-detect these from — see its
  // own doc comment) the data-driven shortcut needs no extra wiring to match the parent Navbar's theme.
  const dark = variant === "dark" || variant === "gradient";
  const vividActive = variant === "gradient";
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
    // Only follow the URL when it matches a link: an `href="#"` click elsewhere on the page fires `popstate` without matching anything.
    const syncToUrl = () => {
      const match = findActiveLabel(itemsRef.current ?? [], window.location.pathname);
      if (match !== undefined) setSelectedLabel(match);
    };
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
      // Layout offsets, not bounding rects: a transform from an enter transition ("bounce" starts at scale 0.3) would skew the rect.
      const box = layoutBox(activeEl, container);
      setPillRect({ left: box.left, width: box.width });
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
    items.map((item, index) => {
      const link = (
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
        hoverEffect={hoverEffect}
        onClick={() => setSelectedLabel(item.label)}
      >
        {item.label}
      </NavbarItem>
      );
      return item.tooltip ? (
        <Tooltip key={`${item.label}-${index}`} content={item.tooltip} position="bottom" color="neutral" open={item.tooltipOpen} className="flex" classNames={{ bubble: "min-[1024px]:hidden" }}>
          {link}
        </Tooltip>
      ) : (
        link
      );
    });
  // Only "bordered" ties its border to `color`/`borderWidth` — "elevated" has no border at all
  // (shadow-only), and
  // every other variant's border is a fixed-width neutral divider, not an adjustable, colored one.
  const hasAccentBorder = variant === "bordered";
  const borderedAccentClass = hasAccentBorder && colorIsNamed ? DETACHED_PANEL_ACCENT_BORDER[color] : undefined;
  const borderedAccentStyle: CSSProperties | undefined = hasAccentBorder
    ? {
        ...(!colorIsNamed && { borderColor: color }),
        ...(borderWidth !== undefined && { borderWidth: `${borderWidth}px` }),
      }
    : undefined;
  const style: CSSProperties = {
    // The second stop defaults to a darker shade of `color`: 600 → 700 for a named color (700 is the darkest
    // shade every ColorName's `colorClasses` entry references, so Tailwind always emits its variable), and
    // a programmatic darkening for a custom one.
    ...(variant === "gradient" && {
      backgroundImage: linearGradient(color, gradientTo ?? (colorIsNamed ? `var(--color-${color}-700)` : darkenHex(color)), gradientDirection),
    }),
  };
  const dividerClass = VARIANT_DIVIDER_CLASSES[variant];
  const showDivider = !isDetachedPanel && variant !== "minimal" && bordered && dividerClass != null;

  const scrollStyle: CSSProperties = {
    ...(transparentTop && { backgroundColor: "transparent", backgroundImage: "none", ...(showDivider && { borderBottomColor: "transparent" }) }),
    ...(scrollBackground && !reducedMotion && { transition: "background-color 90ms linear, border-color 90ms linear" }),
  };
  const glowOn = scrollGlow && glow && !reducedMotion;
  // These effects grow from the middle of the edge (scaleX) instead of just fading.
  const glowSpreads = scrollGlowEffect === "spread" || scrollGlowEffect === "rainbow" || scrollGlowEffect === "particles";

  const linksEl = (
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
  );

  const bar = (
    <nav
      ref={navRef}
      className={cx(
        "flex h-16 items-center justify-between gap-4 px-8",
        // A sticky nav already anchors the absolutely-positioned glow; `relative` would fight `sticky`.
        scrollGlow && !(sticky && !isDetachedPanel) && "relative",
        VARIANT_CLASSES[variant],
        isDetachedPanel && borderedAccentClass,
        showDivider && cx("border-b", dividerClass),
        !isDetachedPanel && (sticky ? "sticky top-0 z-50" : undefined),
        motionClass(transition),
        className,
        classNames?.root
      )}
      style={{ ...(isDetachedPanel ? borderedAccentStyle : style), ...scrollStyle, ...motionStyle(transitionDuration, transitionDelay) }}
    >
      {scrollGlow && (
        // The glow sits on the bottom edge. Each `scrollGlowEffect` animates it differently — "spread" is the
        // landing page's own (forms at the middle, spreads sideways, fades toward both ends).
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-0 overflow-visible"
          style={{
            opacity: glowOn ? 1 : 0,
            ...(glowSpreads && { transform: glowOn ? "scaleX(1)" : "scaleX(0.15)" }),
            transition: reducedMotion
              ? "none"
              : glowSpreads
                ? glowOn ? "opacity 400ms ease, transform 900ms ease-out" : "opacity 600ms ease, transform 900ms ease-in"
                : glowOn ? "opacity 300ms ease" : "opacity 500ms ease",
          }}
        >
          {scrollGlowEffect === "sweep" ? (
            <div className="absolute inset-x-0 -bottom-px h-px overflow-hidden">
              <div
                className="h-full w-1/3"
                style={{
                  background: "linear-gradient(to right, transparent, var(--color-accent-500), transparent)",
                  boxShadow: "0 0 10px 1px color-mix(in srgb, var(--color-accent-500) 60%, transparent)",
                  animation: glowOn ? "lojee-nav-sweep 1.1s linear infinite" : "none",
                }}
              />
            </div>
          ) : (
            <div
              style={scrollGlowEffect === "pulse" && glowOn ? { animation: "lojee-nav-pulse 1.2s ease-in-out infinite" } : undefined}
            >
              <div
                className="absolute inset-x-0 -bottom-px h-px"
                style={{
                  background:
                    scrollGlowEffect === "rainbow"
                      ? "linear-gradient(to right, transparent, #f43f5e 20%, #f59e0b 40%, #10b981 60%, #3b82f6 80%, transparent)"
                      : scrollGlowEffect === "fade"
                        ? "var(--color-accent-500)"
                        : "linear-gradient(to right, transparent, var(--color-accent-500) 50%, transparent)",
                }}
              />
              <div
                className="absolute inset-x-0 top-0 h-5"
                style={{
                  background:
                    scrollGlowEffect === "rainbow"
                      ? "linear-gradient(to bottom, color-mix(in srgb, #8b5cf6 35%, transparent), transparent)"
                      : scrollGlowEffect === "fade"
                        ? "linear-gradient(to bottom, color-mix(in srgb, var(--color-accent-500) 40%, transparent), transparent)"
                        : "radial-gradient(ellipse 50% 100% at 50% 0, color-mix(in srgb, var(--color-accent-500) 45%, transparent), transparent)",
                }}
              />
            </div>
          )}
          {scrollGlowEffect === "particles" && glowOn && (
            // A drifting cloud of glowing dust falling from the edge. Every particle gets its own spot (denser
            // toward the middle, where the glow is strongest), size, sway, fall distance, speed and delay from a
            // golden-ratio sequence, so it looks random but is stable between renders. Most are tiny bright
            // points, some mid-size, a few large soft orbs.
            <div className="absolute inset-x-0 -bottom-px h-0">
              {Array.from({ length: 48 }).map((_, i) => {
                const r = (n: number) => ((i + 1) * n) % 1; // pseudo-random 0..1
                const x = 50 + (r(0.618) - 0.5) * 100 * (0.3 + 0.7 * r(0.414)); // % across the bar
                const orb = i % 9 === 0;
                const size = orb ? 5 + r(0.732) * 3 : 1 + r(0.732) * 2.6;
                const tone = orb ? "var(--color-accent-400)" : i % 5 === 0 ? "#fff" : i % 2 === 0 ? "var(--color-accent-300)" : "var(--color-accent-400)";
                return (
                  <span
                    key={i}
                    className="absolute bottom-0 rounded-full"
                    style={
                      {
                        left: `${x}%`,
                        width: size,
                        height: size,
                        background: orb ? `radial-gradient(circle, color-mix(in srgb, ${tone} 70%, transparent), transparent 70%)` : tone,
                        boxShadow: orb ? undefined : `0 0 ${3 + size * 2.5}px ${size / 3}px color-mix(in srgb, var(--color-accent-500) 75%, transparent)`,
                        "--lojee-dx": `${((r(0.866) - 0.5) * 22).toFixed(1)}px`,
                        "--lojee-sway": `${((r(0.953) - 0.5) * 8).toFixed(1)}px`,
                        "--lojee-dy": `${(45 + r(0.139) * 75).toFixed(1)}px`,
                        "--lojee-peak": orb ? 0.5 : 0.7 + r(0.211) * 0.3,
                        animation: `lojee-nav-particle ${(1.6 + r(0.529) * 1.8).toFixed(2)}s cubic-bezier(.3,.2,.6,1) ${(r(0.317) * 2).toFixed(2)}s infinite`,
                      } as CSSProperties
                    }
                  />
                );
              })}
            </div>
          )}
        </div>
      )}
      <div className={cx("flex min-w-0 items-center gap-6", itemsAlign !== "left" && "flex-1 basis-0")}>
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
          {collapsible && isCollapsed && <SideToggle />}
          <slot name="brand">{brand}</slot>
        </div>
        {itemsAlign === "left" && linksEl}
      </div>
      {/* "center"/"right" place the links as their own row between the brand and the actions instead of next to the brand. */}
      {itemsAlign !== "left" && linksEl}
      {/* Same reasoning as the `brand` slot above — rendered unconditionally so a non-React
          `<div slot="actions">` actually has a `<slot>` to project into. */}
      <div className={cx("flex items-center gap-3", itemsAlign === "center" ? "flex-1 basis-0 justify-end" : "shrink-0", classNames?.actions)}>
        <slot name="actions">{actions}</slot>
      </div>
    </nav>
  );

  if (!isDetachedPanel) return bar;

  return (
    <div
      className={cx("p-3", "bg-[color-mix(in_srgb,var(--color-accent-500)_8%,var(--color-surface))]", sticky && "sticky top-0 z-50")}
      style={style}
    >
      {bar}
    </div>
  );
}
