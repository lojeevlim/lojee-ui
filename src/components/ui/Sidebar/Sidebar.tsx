import { Children, isValidElement, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode, UIEvent } from "react";
import { linearGradient, type GradientDirection } from "../../../core/gradient";
import { cx, isColorName, type ColorName } from "../../../core/tokens";
import { Icon } from "../Icons/Icon";
import { Tooltip } from "../Tooltip/Tooltip";
import { SidebarMenuItem } from "./SidebarMenuItem";
import { sidebarActiveFillClasses } from "./sidebarActiveStyles";
import { activeMarker } from "../../../core/activeVariant";
import { layoutBox } from "../../../core/layoutOffset";
import { motionClass, motionStyle, type TransitionVariant } from "../../../core/motion";

// Determines which `items` row matches the current URL, for the built-in active-item detection
// below — an exact `path` match always wins outright; otherwise the longest `path` the current path
// starts with wins, so a nested route (e.g. "/settings/billing") still highlights its parent nav row
// ("/settings") rather than none at all. "/" is excluded from prefix matching since every path starts
// with it — it can only win via an exact match. (`href` is read as a deprecated alias of `path`.)
const rowPath = (item: SidebarMenuItemSpec) => item.path ?? item.href;

// Single-page navigation for a row with a `path`: the row is still a real link (so "open in new tab" and the
// status-bar URL work), but a plain click is intercepted so the browser doesn't reload the page. The caller's
// `onNavigate` does the routing when given; otherwise the URL is changed with the History API and a `popstate`
// event is fired so routers listening to the history (React Router, etc.) re-read the location.
function navigateInApp(
  event: { preventDefault: () => void; defaultPrevented: boolean; button: number; metaKey: boolean; ctrlKey: boolean; shiftKey: boolean; altKey: boolean },
  path: string,
  item: SidebarMenuItemSpec,
  onNavigate?: (path: string, item: SidebarMenuItemSpec) => void
) {
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  let url: URL;
  try {
    url = new URL(path, window.location.href);
  } catch {
    return;
  }
  if (url.origin !== window.location.origin) return; // another site: let the browser follow the link
  event.preventDefault();
  if (onNavigate) {
    onNavigate(path, item);
    return;
  }
  const target = url.pathname + url.search + url.hash;
  if (target !== window.location.pathname + window.location.search + window.location.hash) {
    window.history.pushState({}, "", target);
    window.dispatchEvent(new PopStateEvent("popstate"));
  }
}

function findActiveLabel(items: SidebarMenuItemSpec[], pathname: string): string | undefined {
  let bestMatch: SidebarMenuItemSpec | undefined;
  for (const item of items) {
    const path = rowPath(item);
    if (!path) continue;
    if (path === pathname) return item.label;
    if (path !== "/" && pathname.startsWith(path)) {
      if (!bestMatch || path.length > rowPath(bestMatch)!.length) bestMatch = item;
    }
  }
  return bestMatch?.label;
}

// Darkens a "#rrggbb" hex color for the second stop of a custom gradient —
// the same role Tailwind's 600→700 step plays for a named ColorName. Only
// meaningful for hex input (the native color-wheel picker's format); an
// arbitrary CSS color keyword passed as a custom color renders as a flat
// fill instead of a gradient rather than fail outright.
function darkenHex(hex: string, factor = 0.82): string {
  const match = /^#?([0-9a-f]{6})$/i.exec(hex);
  // Not a "#rrggbb" (e.g. a `var(...)`/`rgb(...)` value) — can't be scaled channel-wise, so mix toward black instead.
  if (!match) return `color-mix(in srgb, ${hex}, black ${Math.round((1 - factor) * 100)}%)`;
  const value = parseInt(match[1], 16);
  const channel = (shift: number) => Math.max(0, Math.min(255, Math.round(((value >> shift) & 255) * factor)));
  return `#${[16, 8, 0].map((shift) => channel(shift).toString(16).padStart(2, "0")).join("")}`;
}

export type SidebarVariant = "light" | "dark" | "bordered" | "elevated" | "minimal" | "gradient";

// Width of the icon-only rail when `collapsed`. 64px looks right for the
// icon itself but leaves almost no breathing room around it once the
// surrounding body/nav padding a consumer typically adds is subtracted —
// 72px keeps the rail feeling compact while giving nav items enough room
// not to need near-zero horizontal padding to avoid overflowing it.
const COLLAPSED_WIDTH = 88;

// The "bordered"/"elevated" backdrop's own padding (p-3 = 12px a side) — see `isDetachedPanel`.
const DETACHED_PANEL_PADDING = 12;

export interface SidebarHeaderProps {
  /** Content rendered in the header area, docked above the nav rows. */
  children?: ReactNode;
}

/** Sidebar's top area — logo/brand/workspace switcher. A child of `Sidebar`, not a prop —
 * pulled out and docked above the nav content regardless of where it appears among children. */
export function SidebarHeader({ children }: SidebarHeaderProps) {
  return <>{children}</>;
}

export interface SidebarFooterProps {
  /** Content rendered in the footer area, pinned below the nav rows. */
  children?: ReactNode;
}

/** Sidebar's bottom-pinned area — user profile, settings link, etc. A child of `Sidebar`, not a
 * prop — pulled out and docked below the nav content regardless of where it appears among children. */
export function SidebarFooter({ children }: SidebarFooterProps) {
  return <>{children}</>;
}

/** One row for the `items` shortcut — see `SidebarProps.items`. */
export interface SidebarMenuItemSpec {
  /** The row's label. */
  label: string;
  /** Icon name, e.g. "home" — see src/core/icons.ts for the available set. */
  icon?: string;
  /** The route this row stands for, e.g. "/settings". It is matched against the current URL to decide the
   * active row, and the row is rendered as a link to it (otherwise a `<button type="button">` with no click
   * behavior of its own). A nested URL ("/settings/billing") still activates the "/settings" row. */
  path?: string;
  /** @deprecated Use `path`. Still read as a fallback when `path` is not set. */
  href?: string;
  /** Highlights this row as the current page/section — tinted with the parent Sidebar's own `color`.
   * `Sidebar` always manages the actual selection itself: clicking any row (with or without `path`)
   * updates it immediately, and a row's `path` is matched against the current URL on load/back-forward
   * -navigation — no router wiring needed for the common case. Setting `active: true` on a row is a
   * *default*, not a lock: it seeds the initial selection (useful with no matching `path`), and if you
   * keep recomputing it from your own external state (e.g. a router's current route, recalculated on
   * every render like the demo app's own nav), it keeps winning on every change too — but a one-time
   * `active: true` that never changes again won't keep overriding later clicks. For `disabled` per
   * row, compose `<SidebarMenuItem>` directly instead. */
  active?: boolean;
}

/** A labeled group of rows for the `items` shortcut — see `SidebarProps.items`. */
export interface SidebarMenuCategorySpec {
  /** Section heading shown above this group's rows. */
  category: string;
  items: SidebarMenuItemSpec[];
}

export interface SidebarProps {
  /** Nav content, plus optionally a <SidebarHeader> and/or <SidebarFooter> among the children —
   * order doesn't matter, they're pulled out and docked to the top/bottom; everything else renders
   * as the scrollable nav body (compose it with List/ListItem, links, etc). */
  children?: ReactNode;
  /** Simple string header label — a lighter-weight alternative to composing a `<SidebarHeader>`
   * child when you just need a name/logo-label pair with no custom markup. A `<SidebarHeader>` child,
   * if also given, takes precedence over this. Pair with `headerIcon` for a leading icon. */
  header?: string;
  /** Icon name shown before `header`, e.g. "zap" — see src/core/icons.ts for the available set. Has
   * no effect without `header`. For anything beyond a single named icon (an image, a custom SVG),
   * compose it directly into a `<SidebarHeader>` child instead. */
  headerIcon?: string;
  /** Simple string footer label — a lighter-weight alternative to composing a `<SidebarFooter>`
   * child. A `<SidebarFooter>` child, if also given, takes precedence over this. */
  footer?: string;
  /** A simple, data-driven nav list — a lighter-weight alternative to composing `<SidebarMenuItem>`s
   * directly when every row is just a label + icon with no per-item onClick/disabled state (compose
   * `<SidebarMenuItem>` yourself for that instead). Mix in `{ category, items }` entries for labeled,
   * collapsible section groups — each one defaults open if it's the first group or contains an
   * `active` row, and toggles independently after that (not a controlled prop; local UI state, like
   * the built-in collapse toggle's hover state). Rendered above any `children`, automatically
   * matched to this Sidebar's own `collapsed`/`color`/`variant`. Which row is active is also
   * self-determined by default (see `SidebarMenuItemSpec.active`) — each row's `path` is matched
   * against the current URL, no router wiring needed. */
  items?: (SidebarMenuItemSpec | SidebarMenuCategorySpec)[];
  /** Label of the `items` row that should start active, as a lighter-weight alternative to adding
   * `active: true` to the row itself (handy when the same `items` list is reused in more than one
   * place with a different default, or built from data you don't want to mutate). Purely an initial
   * default — after the first render it behaves exactly like a click already happened, i.e. plain
   * self-managed selection from then on. A row's own `active` field (if any row sets it) and a
   * matching `path` against the current URL both take priority over this when present. Has no effect
   * on rows composed directly via `children`. */
  defaultActiveItem?: string;
  /** Pixel width when expanded (default: 256). */
  width?: number;
  /** CSS height (default: "100vh") — a full-viewport-height rail, the common case for a docked
   * app-shell sidebar. `h-full`/100% would need every ancestor up the chain to have an explicit
   * height set, which isn't the case in most real layouts — pass e.g. "100%" yourself if this
   * Sidebar instead lives inside an already-sized flex/grid container and should fill that instead. */
  height?: string | number;
  /** Sticks to the top of its scroll container (default: false) — same idea as Navbar's own `sticky`.
   * A 100vh-tall Sidebar placed in the page's ordinary document flow *below* something else (e.g. a
   * `<Navbar>` docked above it, the common "navbar on top, sidebar+content below" app-shell shape)
   * pushes the page taller than the viewport by that something-else's own height — without `sticky`,
   * scrolling the page scrolls the Sidebar away with it instead of leaving it in place. Pass `sticky`
   * to pin it at the viewport's top edge instead once you scroll past whatever's above it, so it then
   * stays fully visible on screen for the rest of the page, same as a real app-shell sidebar should.
   * If it's inside a flex row instead (e.g. alongside a `<main>` that scrolls on its own), give that
   * `<main>` its own `overflow-y-auto` and leave `height="100%"` on this Sidebar (see `height` above)
   * — `sticky` isn't needed there, since the Sidebar already never scrolls out of its own container. */
  sticky?: boolean;
  /** Collapses to an icon-only rail (default: false) — composed `children` (nav rows, a
   * `<SidebarHeader>`) are still rendered as given; it's up to the consumer to pass icon-only
   * content for those (pair `header` with `headerIcon`, or branch on `collapsed` yourself for
   * directly-composed nav rows/`SidebarMenuItem`s). A `<SidebarFooter>` (or the `footer` shortcut)
   * has no icon-only equivalent, so it fades out automatically instead while collapsed. Leave unset
   * manage this itself — the built-in `collapsible` toggle then works with zero extra wiring. Pass
   * this explicitly only if something outside `Sidebar` also needs to drive/observe the collapsed
   * state (e.g. a hamburger button elsewhere in your app); once passed, it becomes a fully
   * controlled prop and you're responsible for updating it via `onCollapsedChange`. */
  collapsed?: boolean;
  /**
   * Visual theme (default: "light"):
   * - "bordered"/"elevated" both float as a detached card instead of docking to a screen edge
   *   — kept as separate names since each still has its own distinct panel look on top of that shared
   *   shape: "bordered" has a thick `color`-tinted border, shadow, and rounded corners (see
   *   `color`/`borderWidth`); "elevated" has that same shadow and rounded corners but no border —
   *   depth from the shadow alone, Material-card style.
   *   Both are self-contained — an inset backdrop is included automatically (padding +
   *   a light tint of the theme accent) so the panel always reads correctly (rounded corners) with no wrapper markup
   *   needed on your end.
   * - "minimal" — no background/border at all, blends into the page (no backdrop added, by design —
   *   that's the whole point of this one).
   * - "gradient" — a top-to-bottom gradient built from `color` (600 → 700).
   */
  variant?: SidebarVariant;
  /** Accent color (default: "accent" — follows the theme accent) — one of the built-in ColorNames, or any other CSS color value
   * (e.g. "#7c3aed" from a color-wheel picker) for a fully custom accent, unconstrained by the fixed
   * palette. For "gradient" it's the gradient itself (600→700-equivalent; a custom hex gets a
   * programmatically darkened second stop); for "bordered" it tints the panel's own border (has no
   * effect on "elevated", which has no border to tint); it always also tints the
   * built-in toggle button's hover state — pair it with the same value on your own active nav-item
   * styling for a coordinated look. */
  color?: ColorName | (string & {});
  /** Second color of the "gradient" variant: a `ColorName` or any CSS color such as "#ec4899" (default: a darker shade of `color`). */
  gradientTo?: ColorName | (string & {});
  /** Direction of the "gradient" variant: "to-right" | "to-left" | "to-bottom" | "to-top" | "to-br" | "to-bl" | "to-tr" | "to-tl" (default: "to-bottom"). */
  gradientDirection?: GradientDirection;
  /** "bordered"'s own border thickness in px (default: 2). Has no effect on any other variant —
   * "elevated" has no border at all (shadow-only), and every other variant's border is a fixed-width
   * neutral divider, not an adjustable, colored one. */
  borderWidth?: number;
  /** Shows a built-in collapse/expand toggle button, inline at the start of the header row (with a
   * divider before any `<SidebarHeader>` content) — while collapsed it takes over that row on its
   * own. Works standalone with no other props needed — `Sidebar` tracks its own collapsed state
   * internally unless you pass `collapsed` yourself (see above). */
  collapsible?: boolean;
  /** Called whenever the collapsed state changes — whether toggled by the built-in button in
   * uncontrolled mode, or requested while `collapsed` is a controlled prop. Optional either way;
   * only needed if something outside `Sidebar` cares about the current state. */
  onCollapsedChange?: (collapsed: boolean) => void;
  /** Called with the full `items` row object whenever the active row changes — a click, a URL match
   * on mount/back-forward-navigation, or a row's `active` field changing to point elsewhere (see
   * `SidebarMenuItemSpec.active`). Use this to read which item is active without tracking it yourself,
   * e.g. to drive your own router's navigation or to sync active state elsewhere in your app. Not
   * called for rows composed directly via `children` (only the data-driven `items` shortcut has a
   * "current item" concept). */
  onActiveItemChange?: (item: SidebarMenuItemSpec) => void;
  /** Called with a row's `path` when it is clicked, so your router can navigate without a page reload
   * (e.g. React Router's `navigate`). Without it, `Sidebar` changes the URL itself with `history.pushState`
   * and fires a `popstate` event, which routers that watch the history pick up — still no reload. Modified
   * clicks (Ctrl/Cmd/Shift, middle button) and paths on another origin keep the browser's normal link
   * behaviour. */
  onNavigate?: (path: string, item: SidebarMenuItemSpec) => void;
  /** Enter transition: "fade" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "zoom" | "zoom-out" | "flip" | "blur" | "bounce" | "rotate" | "drop" | "skew" (default: none). Respects `prefers-reduced-motion`. */
  transition?: TransitionVariant;
  /** Enter transition duration in ms (default: 450). */
  transitionDuration?: number;
  /** Delay before the enter transition starts, in ms (default: 0) — handy for staggering. */
  transitionDelay?: number;
  /** Enter/exit transition of the tooltips shown in the collapsed rail and on the collapse button: "fade" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "zoom" | "zoom-out" | "flip" | "blur" | "bounce" | "rotate" | "drop" | "skew" (default: "bounce"). */
  tooltipTransition?: TransitionVariant;
  /** Enter/exit duration in ms of those same tooltips (default: 450). */
  tooltipTransitionDuration?: number;
  /** Color of those same tooltips — a ColorName, or "neutral" for the theme-inverted bubble (default: "accent"). */
  tooltipColor?: ColorName | "neutral";
  /** Extra class name(s) appended to the root element. */
  className?: string;
  /** Per-part class overrides — merged after (and win over) the built-in styling. */
  classNames?: {
    root?: string;
    header?: string;
    body?: string;
    footer?: string;
    toggle?: string;
  };
}

const VARIANT_CLASSES: Record<SidebarVariant, string> = {
  light: "bg-surface text-fg border-r border-border",
  // `text-white/70` — same idle color SidebarMenuItem gives its own nav rows for `dark` (see
  // `idleClass`) — so the header/footer (and any consumer-composed `<SidebarHeader>`/`<SidebarFooter>`,
  // both plain, colorless spans that rely on inheriting this) read as one consistent surface instead of
  // the header falling back to the browser's default (near-black, invisible against `bg-slate-900`) text
  // color. "gradient" doesn't need this — it already carries their own `text-white` below.
  dark: "bg-accent-950 border-r border-accent-900 text-white/70",
  // "bordered" and "elevated" both float as a detached card (see `isDetachedPanel`) rather
  // than docking to a screen edge — kept as separate `variant` names since each still has its own
  // distinct panel look (colored border / shadow-only / transparent) on top of that shared
  // shape. "elevated" deliberately carries no border — shadow-lg alone does the "floating card" job,
  // Material-style — so it stays visually distinct from "bordered" instead of duplicating it.
  bordered: "bg-surface text-fg border-2 border-border-strong rounded-xl shadow-lg",
  elevated: "bg-surface text-fg rounded-xl shadow-lg",
  minimal: "bg-transparent text-fg",
  gradient: "text-white border-r border-white/10",
};

const VARIANT_DIVIDER_CLASSES: Record<SidebarVariant, string> = {
  light: "border-border",
  dark: "border-accent-900",
  bordered: "border-border",
  elevated: "border-border",
  minimal: "border-border",
  gradient: "border-white/15",
};

// "bordered"'s defining feature is its border, so unlike every other variant it tints that border
// with the Sidebar's own `color` — same "300" shade every ColorName's own outline-style border already
// uses elsewhere in the library (see core/tokens.ts's colorClasses), for consistency. "elevated" has
// no border to tint, so it doesn't use this map.
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

// Built-in scrollbar for the nav list, shipped with the component (rendered as a <style> next to the
// panel) so it works the same in React, inside a Web Component's shadow root, and without theme.css.
// "Hairline" look: a 2px hairline track with a slim round-ended accent thumb on it, inset 44px top and
// bottom. The thumb widens from 4px to 8px when the pointer is on it and deepens on grab. It auto-hides:
// invisible at rest, fading in only while the list is scrolled (`data-scrolling`, set by the body's
// onScroll and cleared after a short idle) or while the pointer is on the scrollbar itself (so it can be
// grabbed) — and is drawn only while the list overflows. The thumb's length is set by the browser (it
// scales with how much content overflows), so it is a capsule rather than a fixed dot. The 10px track is
// always reserved (`scrollbar-gutter: stable`, with the body's right padding dropped to match) so rows
// never shift. Firefox gets the standard thin scrollbar.
const SIDEBAR_SCROLLBAR_CSS = `
.lojee-sidebar-scroll { scrollbar-gutter: stable; }
@supports selector(::-webkit-scrollbar) {
  .lojee-sidebar-scroll::-webkit-scrollbar { width: 10px; }
  .lojee-sidebar-scroll::-webkit-scrollbar-track {
    margin: 44px 0;
    background-color: transparent;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 2px 100%;
    transition: background-color 0.3s ease;
  }
  .lojee-sidebar-scroll::-webkit-scrollbar-thumb {
    border: 3px solid transparent;
    border-radius: 999px;
    background-clip: padding-box;
    background-color: transparent;
    min-height: 20px;
    transition: background-color 0.3s ease;
  }
  .lojee-sidebar-scroll[data-scrolling]::-webkit-scrollbar-track,
  .lojee-sidebar-scroll::-webkit-scrollbar-track:hover {
    background-image: linear-gradient(color-mix(in srgb, currentColor 16%, transparent), color-mix(in srgb, currentColor 16%, transparent));
  }
  .lojee-sidebar-scroll[data-scrolling]::-webkit-scrollbar-thumb {
    background-color: var(--color-accent-500);
  }
  .lojee-sidebar-scroll::-webkit-scrollbar-thumb:hover {
    border-width: 1px;
    background-color: var(--color-accent-500);
  }
  .lojee-sidebar-scroll::-webkit-scrollbar-thumb:active {
    border-width: 1px;
    background-color: var(--color-accent-600);
  }
}
@supports not selector(::-webkit-scrollbar) {
  .lojee-sidebar-scroll { scrollbar-width: thin; scrollbar-color: transparent transparent; transition: scrollbar-color 0.3s ease; }
  .lojee-sidebar-scroll[data-scrolling] { scrollbar-color: var(--color-accent-500) transparent; }
}
`;

const TOGGLE_BUTTON_CLASSES =
  "flex h-8 w-8 shrink-0 items-center justify-center rounded-md border transition-colors";

export function Sidebar({
  children,
  header,
  headerIcon,
  footer,
  items,
  defaultActiveItem,
  width = 256,
  height = "100vh",
  sticky = false,
  collapsed: collapsedProp,
  variant = "light",
  color = "accent",
  gradientTo,
  gradientDirection = "to-bottom",
  borderWidth,
  collapsible = false,
  onCollapsedChange,
  onActiveItemChange,
  onNavigate,
  transition,
  transitionDuration,
  transitionDelay,
  tooltipTransition = "bounce",
  tooltipTransitionDuration,
  tooltipColor = "accent",
  className,
  classNames,
}: SidebarProps) {
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({});
  // Uncontrolled by default (`collapsedProp` left unset) so the built-in `collapsible` toggle works
  // with zero external wiring — only falls back to a fully consumer-driven value once `collapsed` is
  // actually passed, same controlled/uncontrolled split as a plain <input>.
  const [uncontrolledCollapsed, setUncontrolledCollapsed] = useState(false);
  const isCollapsedControlled = collapsedProp !== undefined;
  const collapsed = isCollapsedControlled ? collapsedProp : uncontrolledCollapsed;
  const toggleLabel = collapsed ? "Expand sidebar" : "Collapse sidebar";

  const toggleCollapsed = () => {
    const next = !collapsed;
    if (!isCollapsedControlled) setUncontrolledCollapsed(next);
    onCollapsedChange?.(next);
  };
  let headerContent: ReactNode;
  let footerContent: ReactNode;
  const bodyChildren: ReactNode[] = [];

  Children.forEach(children, (child) => {
    if (isValidElement(child) && child.type === SidebarHeader) {
      headerContent = (child.props as SidebarHeaderProps).children;
    } else if (isValidElement(child) && child.type === SidebarFooter) {
      footerContent = (child.props as SidebarFooterProps).children;
    } else {
      bodyChildren.push(child);
    }
  });

  // `header`/`footer`/`items` are a lighter-weight, data-driven alternative to composing
  // <SidebarHeader>/<SidebarFooter>/<SidebarMenuItem> directly — only used as a fallback when the
  // consumer didn't already compose the real thing, which always wins.
  if (headerContent == null && (header != null || headerIcon != null)) {
    headerContent = (
      <span className="flex min-w-0 items-center gap-2.5">
        {headerIcon && <Icon name={headerIcon} size={18} className="shrink-0" />}
        {header != null && !collapsed && <span className="truncate">{header}</span>}
      </span>
    );
  }
  if (footerContent == null && footer != null) {
    footerContent = <span className="truncate text-sm font-medium">{footer}</span>;
  }
  // `dark` mirrors what a consumer composing their own <SidebarMenuItem>s is already told to pass
  // alongside a dark-background variant, for a coordinated active/hover look. `vividActive` further
  // strengthens the active row specifically for "gradient" (not "dark") — that sits on an
  // already-colorful surface where the usual subtle overlay is much easier to lose.
  const dark = variant === "dark" || variant === "gradient";
  const vividActive = variant === "gradient";
  const colorIsNamed = isColorName(color);
  // Always self-manages which `items` row is highlighted — clicking a row updates it immediately, no
  // external state required. A row's own `active: true` is read as an *initial/updated default*, not
  // a permanent lock: it seeds the very first render (mount), and re-syncs again any time it actually
  // *changes* to point at a different row (e.g. a router recomputing `active` on every render as the
  // route changes, exactly like the demo app's own nav) — but a `active: true` that's simply been set
  // once and never changes again doesn't keep re-asserting itself, so clicking around still works.
  // `findActiveLabel` additionally matches each row's `path` against the current URL on mount and on
  // browser back/forward, taking priority as the more specific signal when both are present.
  const flatItems = items?.flatMap((entry) => ("category" in entry ? entry.items : [entry])) ?? [];
  const explicitActiveLabel = flatItems.find((item) => item.active)?.label;
  const [selectedLabel, setSelectedLabel] = useState<string | undefined>(() =>
    (typeof window === "undefined" ? undefined : findActiveLabel(flatItems, window.location.pathname)) ??
    explicitActiveLabel ??
    defaultActiveItem
  );
  // Adjusts `selectedLabel` during render (React's own recommended pattern for "sync state when a
  // prop changes", https://react.dev/reference/react/useState#storing-information-from-previous-renders
  // — not an effect, so this doesn't cost an extra render/frame) whenever `explicitActiveLabel`'s
  // *value* actually changes between renders (not merely whenever `items` gets a new array reference).
  // This is what lets a genuinely reactive `active` (driven by a router recomputing it every render)
  // keep winning on every change, while a static one-time `active: true` only ever applies once, on
  // mount, and never fights a later click again.
  const [prevExplicitActiveLabel, setPrevExplicitActiveLabel] = useState(explicitActiveLabel);
  if (explicitActiveLabel !== prevExplicitActiveLabel) {
    setPrevExplicitActiveLabel(explicitActiveLabel);
    if (explicitActiveLabel !== undefined) setSelectedLabel(explicitActiveLabel);
  }
  const flatItemsRef = useRef(flatItems);
  useEffect(() => {
    flatItemsRef.current = flatItems;
  });
  useEffect(() => {
    if (typeof window === "undefined") return;
    const syncToUrl = () => setSelectedLabel(findActiveLabel(flatItemsRef.current, window.location.pathname));
    window.addEventListener("popstate", syncToUrl);
    return () => window.removeEventListener("popstate", syncToUrl);
  }, []);
  // Reports the active item via `onActiveItemChange` for every reason `selectedLabel` changes —
  // initial URL/active match, browser back/forward, a route-driven `active` change, or a click — one
  // place instead of duplicating the call at each trigger site.
  useEffect(() => {
    if (selectedLabel === undefined) return;
    const item = flatItemsRef.current.find((i) => i.label === selectedLabel);
    if (item) onActiveItemChange?.(item);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- onActiveItemChange intentionally excluded: it's a callback prop, not reactive state, and including it would re-fire this effect on every render whenever the consumer passes a new inline function.
  }, [selectedLabel]);
  // A single shared "pill" slides between rows instead of each row cross-fading its own background —
  // identical reasoning to Navbar's own sliding pill (see NavbarItem's `activeStyle` doc for the full
  // case for it). Only `top`/`height` ever need measuring, unlike Navbar's `left`/`width` — every row
  // is already `w-full` regardless of `collapsed`, so the pill only ever needs `inset-x-0` to match.
  // `itemNodesRef` holds each rendered row's real DOM node (keyed by label) purely so this effect can
  // measure it; `navRef` is the positioned ancestor those measurements are made relative to.
  const navRef = useRef<HTMLElement>(null);
  // Auto-hiding scrollbar: flag the body as scrolling, clear it after a short idle (see SIDEBAR_SCROLLBAR_CSS).
  const scrollIdleRef = useRef<number>(0);
  useEffect(() => () => window.clearTimeout(scrollIdleRef.current), []);
  const handleBodyScroll = (e: UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    el.setAttribute("data-scrolling", "");
    window.clearTimeout(scrollIdleRef.current);
    scrollIdleRef.current = window.setTimeout(() => el.removeAttribute("data-scrolling"), 900);
  };
  const itemNodesRef = useRef<Record<string, HTMLElement | null>>({});
  const [pillRect, setPillRect] = useState<{ top: number; height: number } | null>(null);
  // A row inside a currently-closed category never has a real visible position to pin the pill to —
  // `getBoundingClientRect()` on it still reports its normal, "as if open" box even once its category's
  // grid track is resting at `0fr` (an ancestor's `overflow-hidden` clips what paints, but never changes
  // what a descendant itself reports as its own layout box) — so without this, the pill would keep
  // floating at that stale, invisible position instead of hiding until its row is visible again.
  const closedCategoryLabels = new Set<string>();
  items?.forEach((entry, index) => {
    if (!("category" in entry)) return;
    const defaultOpen = index === 0 || entry.items.some((item) => item.active);
    const isOpen = collapsed || (openCategories[entry.category] ?? defaultOpen);
    if (!isOpen) entry.items.forEach((item) => closedCategoryLabels.add(item.label));
  });
  useLayoutEffect(() => {
    const measure = () => {
      const container = navRef.current;
      const activeEl =
        selectedLabel && !closedCategoryLabels.has(selectedLabel) ? itemNodesRef.current[selectedLabel] : null;
      if (!container || !activeEl) {
        setPillRect(null);
        return;
      }
      // Layout offsets, not bounding rects: a transform from an enter transition ("bounce" starts at scale 0.3) would skew the rect.
      const box = layoutBox(activeEl, container);
      setPillRect({ top: box.top, height: box.height });
    };
    measure();
    // `collapsed`/`openCategories` both reflow the rows below them (the rail's own width transition,
    // a category's own height transition) — re-measuring on either keeps the pill honest about where
    // the active row actually ends up, rather than animating toward a now-stale position.
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- closedCategoryLabels is a fresh Set every render, derived purely from collapsed/openCategories/items, which are already listed below.
  }, [selectedLabel, items, collapsed, openCategories]);
  const renderItemRow = (item: SidebarMenuItemSpec, key: string) => (
    <SidebarMenuItem
      key={key}
      ref={(el) => {
        itemNodesRef.current[item.label] = el;
      }}
      icon={item.icon}
      href={rowPath(item)}
      active={selectedLabel === item.label}
      activeStyle="text"
      // A unique value per row — see SidebarMenuItem's own `slotName` doc for why: every generated
      // row shares this single Sidebar's shadow root, so their internal label slots would otherwise
      // all be unnamed together and collide.
      slotName={`sidebar-item-label-${key}`}
      collapsed={collapsed}
      color={color}
      dark={dark}
      vividActive={vividActive}
      tooltipTransition={tooltipTransition}
      tooltipTransitionDuration={tooltipTransitionDuration}
      tooltipColor={tooltipColor}
      onClick={(event) => {
        setSelectedLabel(item.label);
        const path = rowPath(item);
        if (path) navigateInApp(event, path, item, onNavigate);
      }}
    >
      {item.label}
    </SidebarMenuItem>
  );
  const itemRows = items && items.length > 0 && (
    <nav ref={navRef} className="relative space-y-1.5">
      {pillRect && (
        <div
          aria-hidden
          className={cx(
            "pointer-events-none absolute inset-x-0 rounded-lg transition-[top,height,background-color,box-shadow] duration-200 ease-[cubic-bezier(.4,0,.2,1)]",
            sidebarActiveFillClasses(color, dark, vividActive)
          )}
          {...activeMarker("fill", color, colorIsNamed, dark, {
            top: pillRect.top,
            height: pillRect.height,
            ...(!colorIsNamed && !dark && { backgroundColor: color }),
          })}
        />
      )}
      {items.map((entry, index) => {
        if (!("category" in entry)) return renderItemRow(entry, `${entry.label}-${index}`);
        // Not a controlled prop — each group's open/closed state is purely local UI state, same
        // spirit as the built-in toggle button's hover state. Defaults open for the first group or
        // one containing the current page, so a fresh load never hides where you already are.
        const defaultOpen = index === 0 || entry.items.some((item) => item.active);
        const isOpen = collapsed || (openCategories[entry.category] ?? defaultOpen);
        return (
          <div key={entry.category}>
            {/* Collapsed: the category label gives way to a thin divider between groups (the label stays
                for screen readers via `sr-only`; the icon-only rail always shows every item regardless of
                each group's open/closed state). */}
            {collapsed && index > 0 && (
              <div aria-hidden className={cx("mx-2 my-2 border-t", dark ? "border-white/15" : "border-border")} />
            )}
            <button
              type="button"
              onClick={() => setOpenCategories((prev) => ({ ...prev, [entry.category]: !isOpen }))}
              aria-expanded={isOpen}
              className={cx(
                "flex w-full items-center justify-between gap-1 px-3 pb-1 pt-3 text-xs font-medium tracking-wide transition-colors",
                dark ? "text-white/50" : "text-fg-subtle",
                collapsed && "sr-only"
              )}
            >
              <span className="truncate">{entry.category}</span>
              <Icon name="chevron-down" size={14} className={cx("shrink-0 transition-transform duration-200", !isOpen && "-rotate-90")} />
            </button>
            <div className="grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(.4,0,.2,1)]" style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}>
              <div className="space-y-0.5 overflow-hidden">
                {entry.items.map((item, itemIndex) => renderItemRow(item, `${entry.category}-${itemIndex}`))}
              </div>
            </div>
          </div>
        );
      })}
    </nav>
  );

  // "bordered"/"elevated" are all detached-panel looks — their border/shadow/rounded corners
  // only read correctly against a sized backdrop (a card flush against the
  // page edge just looks clipped/flat). Rather than expecting every consumer to wrap this themselves,
  // the backdrop is built into the root box here (padding carved out of the same width/height, via
  // border-box), with the actual panel nested one level in. Every other variant keeps the single-div
  // structure below.
  const isDetachedPanel = variant === "bordered" || variant === "elevated";
  // That backdrop's own p-3 padding (12px a side) eats into the collapsed rail's width from both
  // sides — added back here so the icon-only rail itself still gets the full COLLAPSED_WIDTH, instead
  // of shrinking to a cramped 48px once the padding is subtracted.
  const collapsedWidth = isDetachedPanel ? COLLAPSED_WIDTH + DETACHED_PANEL_PADDING * 2 : COLLAPSED_WIDTH;

  // Only "bordered" ties its border to `color`/`borderWidth` — "elevated" has no border at all
  // (shadow-only), and
  // every other variant's border is a fixed-width neutral divider, not an adjustable, colored one.
  // `borderWidth` needs an inline style regardless of `color`, since Tailwind can't generate a class
  // for an arbitrary runtime pixel value the way it can for one of the 12 fixed ColorNames.
  const hasAccentBorder = variant === "bordered";
  const borderedAccentClass = hasAccentBorder && colorIsNamed ? DETACHED_PANEL_ACCENT_BORDER[color] : undefined;
  const borderedAccentStyle: CSSProperties | undefined =
    hasAccentBorder
      ? {
          ...(!colorIsNamed && { borderColor: color }),
          ...(borderWidth !== undefined && { borderWidth: `${borderWidth}px` }),
        }
      : undefined;
  const style: CSSProperties = {
    width: collapsed ? collapsedWidth : width,
    height,
    transitionTimingFunction: "cubic-bezier(.4, 0, .2, 1)",
    // The second stop defaults to a darker shade of `color`: 600 → 700 for a named color (700 is the darkest
    // shade every ColorName's `colorClasses` entry references, so Tailwind always emits its variable), and
    // a programmatic darkening for a custom one.
    ...(variant === "gradient" && {
      backgroundImage: linearGradient(color, gradientTo ?? (colorIsNamed ? `var(--color-${color}-700)` : darkenHex(color)), gradientDirection),
    }),
    // Only for a custom color: a named ColorName's hover tint comes from
    // TOGGLE_HOVER_TEXT below via a real Tailwind class instead, since that
    // also covers browsers/situations where arbitrary CSS custom properties
    // in a Tailwind arbitrary-value selector might not be desired.
  } as CSSProperties;
  const toggleClasses = cx(
    TOGGLE_BUTTON_CLASSES,
    // Idle color matches SidebarMenuItem's own idle nav-item text color exactly (same "dark" split),
    // instead of a fixed neutral gray that used to look mismatched against white-ish nav item text on
    // "dark"/"gradient".
    dark ? "text-white/70" : "text-fg-muted",
    VARIANT_DIVIDER_CLASSES[variant]
  );
  // The built-in toggle takes over the header row's only slot while
  // collapsed (there's no room for it alongside the header content in a
  // 72px rail) — but only when it's actually rendering something there to
  // take over from. A consumer driving `collapsed` externally without
  // `collapsible` (no built-in button at all) still gets to show their own
  // icon-only header content while collapsed, same as before.
  const hideHeaderContent = collapsed && collapsible;

  const panelContent = (
    <>
      <style>{SIDEBAR_SCROLLBAR_CSS}</style>
      {(collapsible || headerContent != null) && (
        <div
          className={cx(
            // h-16 = the Navbar's height, so a Sidebar header and a Navbar line up across the top of an app without any overrides.
            "flex h-16 shrink-0 items-center border-b px-3 transition-[gap] duration-300 ease-[cubic-bezier(.4,0,.2,1)]",
            hideHeaderContent ? "gap-0" : "gap-2",
            VARIANT_DIVIDER_CLASSES[variant],
            // Expanded, no header content at all (no `header`/`headerIcon`, no composed
            // `<SidebarHeader>`): the toggle button is then this row's *only* child, with no
            // `flex-1` header-content div left to push it to the far edge (see below) — `justify-end`
            // stands in for that so it still lands at the row's right edge instead of its left one.
            collapsed ? "justify-center" : headerContent == null && "justify-end",
            classNames?.header
          )}
        >
          {/* Header content first (flex-1 pushes it to the left), toggle at
              the row's own right edge — scoped to inside this component
              since there's no external header to anchor it to here. The row's
              own `gap` (not just the content's width/opacity) has to collapse
              to 0 in step with `hideHeaderContent` too — otherwise the header
              content's wrapper div still reserves a `gap-2` slot next to the
              toggle button even once it's animated down to zero width, which
              nudges the button a few pixels off-center instead of dead
              center in the collapsed rail. */}
          {headerContent != null && (
            // A `grid-template-columns` 1fr/0fr transition (not a plain
            // conditional unmount) so the content shrinks away in step with
            // the panel's own width animation instead of popping out
            // instantly — works for arbitrary consumer content since, unlike
            // `max-width`, it doesn't need to know the content's actual
            // width to animate smoothly down to zero.
            <div
              className={cx("grid min-w-0 transition-[grid-template-columns,opacity] duration-300 ease-[cubic-bezier(.4,0,.2,1)]", !collapsed && "flex-1")}
              style={{ gridTemplateColumns: hideHeaderContent ? "0fr" : "1fr", opacity: hideHeaderContent ? 0 : 1 }}
            >
              <div className="min-w-0 overflow-hidden truncate">
                <slot name="header">{headerContent}</slot>
              </div>
            </div>
          )}
          {collapsible && (
            <>
              <Tooltip content={toggleLabel} position="right" transition={tooltipTransition} transitionDuration={tooltipTransitionDuration} color={tooltipColor} portal>
                <button
                  type="button"
                  onClick={toggleCollapsed}
                  aria-label={toggleLabel}
                  className={cx(toggleClasses, classNames?.toggle)}
                >
                  <Icon name="panel-left" size={16} />
                </button>
              </Tooltip>
            </>
          )}
        </div>
      )}
      {/* Always scrollable, expanded or collapsed — a collapsed icon-only
          rail with many items still needs to scroll. This used to be
          conditional on `!collapsed` because `overflow-y-auto` clips
          absolutely-positioned descendants on BOTH axes (not just the
          scrolling one), which would cut off a ListItem `tooltip` trying to
          escape to the right — but that's fixed at the source now
          (ListItem's tooltip portals itself out of this container instead
          of relying on CSS overflow to escape it), so scrolling no longer
          has to be sacrificed for it. */}
      <div onScroll={handleBodyScroll} className={cx("lojee-sidebar-scroll flex-1 overflow-y-auto py-2 pl-2 pr-0", classNames?.body)}>
        <slot>
          {itemRows}
          {bodyChildren}
        </slot>
      </div>
      {footerContent != null && (
        <div
          className={cx("shrink-0 border-t p-4", VARIANT_DIVIDER_CLASSES[variant], classNames?.footer)}
        >
          {/* Unlike header (paired with `headerIcon`), footer has no icon-only fallback to switch
              to while collapsed — a 72px rail can't fit a name/email row, so it fades away instead
              of truncating to an unreadable sliver. Same grid-template-columns 1fr/0fr technique as
              the header's content, so it shrinks in step with the panel's own width animation. */}
          <div
            className="grid min-w-0 transition-[grid-template-columns,opacity] duration-300 ease-[cubic-bezier(.4,0,.2,1)]"
            style={{ gridTemplateColumns: collapsed ? "0fr" : "1fr", opacity: collapsed ? 0 : 1 }}
          >
            <div className="min-w-0 overflow-hidden truncate">
              <slot name="footer">{footerContent}</slot>
            </div>
          </div>
        </div>
      )}
    </>
  );

  return (
    <div
      className={cx(
        "relative flex flex-col transition-[width] duration-300",
        // `self-start` stops a sticky flex item from stretching to match a taller row sibling (e.g. a
        // `<main>` full of content) — cross-axis `stretch` is the flex default, and would otherwise
        // fight the explicit `height` this component already sets via `style` below.
        sticky && "sticky top-0 z-40 self-start",
        isDetachedPanel && "p-3",
        // "bordered"/"elevated" keep a neutral backdrop ("bordered"'s own panel already carries
        // `color` via its border; "elevated" has no border/color of its own at all, so there's nothing
        // for the backdrop to echo either way).
        isDetachedPanel && "bg-[color-mix(in_srgb,var(--color-accent-500)_8%,var(--color-surface))]",
        !isDetachedPanel && VARIANT_CLASSES[variant],
        motionClass(transition),
        className,
        classNames?.root
      )}
      style={{ ...style, ...motionStyle(transitionDuration, transitionDelay) }}
    >
      {isDetachedPanel ? (
        <div
          className={cx("flex min-h-0 flex-1 flex-col", VARIANT_CLASSES[variant], borderedAccentClass)}
          style={borderedAccentStyle}
        >
          {panelContent}
        </div>
      ) : (
        panelContent
      )}
    </div>
  );
}
