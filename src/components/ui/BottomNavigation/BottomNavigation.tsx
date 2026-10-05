import { Fragment, useEffect, useLayoutEffect, useRef, useState } from "react";
import { cx, isColorName, type ColorName } from "../../../core/tokens";
import { ACTIVE_ITEM_TRANSITION, ACTIVE_PILL_TRANSITION, activeAccent, activeMarker, explicitActive, type ActiveVariant } from "../../../core/activeVariant";
import { navbarActiveFillClasses } from "../Navbar/navbarActiveStyles";
import { Icon } from "../Icons/Icon";
import { motionClass, motionStyle, type TransitionVariant, type HoverEffect } from "../../../core/motion";

export interface BottomNavigationItem {
  icon: string;
  label: string;
  /** Renders the tab as an `<a>` when set (otherwise a `<button type="button">`). */
  href?: string;
  /** Marks this tab as the current one. `BottomNavigation` always manages the selection itself: clicking a
   * tab updates it immediately, and a tab's `href` is matched against the current URL on load and on
   * back/forward navigation — no router wiring needed. Setting `active: true` is a *default*, not a lock,
   * exactly like Sidebar's and Navbar's `active` (they share the same seed-vs-lock behavior). */
  active?: boolean;
  /** e.g. a small count, shown as a dot/number on the icon. */
  badge?: string;
}

// Determines which item matches the current URL — the same logic as Sidebar's / Navbar's own
// `findActiveLabel`, kept as its own copy like theirs (an exact `href` wins; otherwise the longest `href`
// the path starts with; "/" only ever matches exactly).
function findActiveLabel(items: BottomNavigationItem[], pathname: string): string | undefined {
  let bestMatch: BottomNavigationItem | undefined;
  for (const item of items) {
    if (!item.href) continue;
    if (item.href === pathname) return item.label;
    if (item.href !== "/" && pathname.startsWith(item.href)) {
      if (!bestMatch || item.href.length > bestMatch.href!.length) bestMatch = item;
    }
  }
  return bestMatch?.label;
}

// Data-driven (array-of-items prop) rather than compound children — same
// reasoning as Tabs/NavigationMenu: once wrapped as a Web Component via
// r2wc, arbitrary light-DOM children can't be inspected across the shadow
// boundary, so a plain data array is the only shape that works identically
// in both the React and Web Component builds.
export interface BottomNavigationProps {
  /** The tabs to display, in order — each with an icon, label, optional `href` and optional badge. */
  items: BottomNavigationItem[];
  /** Color of the active tab (default: "accent", which follows the theme accent) — one of the built-in
   * ColorNames, or any other CSS color value. Same as Navbar / Sidebar. */
  color?: ColorName | (string & {});
  /** How the active tab is drawn: "solid", "outline" or "soft" fill, or "text" — no fill at all, only the
   * icon and label are highlighted in `color`. Leave it out to follow the theme's active-item style
   * (`ThemeProvider`'s `defaultActiveVariant`, default "solid"; the theme never picks "text"). */
  variant?: ActiveVariant | "text";
  /** Only an initial default (see `BottomNavigationItem.active`): which tab starts selected when nothing
   * else — a matching `href`, an `active: true` entry — already determines it. */
  defaultActiveItem?: string;
  /** Called with the full item whenever the active tab changes — a click, a URL match on
   * mount/back-forward navigation, or an item's `active` field changing to point elsewhere. */
  onActiveItemChange?: (item: BottomNavigationItem) => void;
  /** Called on every tab click, with the clicked item and its index — including a click on the tab that is already active (which
   * `onActiveItemChange` does not report). The web component's `itemclick` event (detail = the item). */
  onItemClick?: (item: BottomNavigationItem, index: number) => void;
  /** Shows only the icons — the labels are hidden (they stay as each tab's accessible name and tooltip). Default: false. */
  iconOnly?: boolean;
  /** Icon name of a floating action button raised above the middle of the bar (e.g. "plus"). Setting it shows the button and splits the tabs around it. */
  fabIcon?: string;
  /** Accessible name / tooltip of the floating button (default: "Action"). */
  fabLabel?: string;
  /** Called when the floating button is pressed (the web component's `fabclick` event). */
  onFabClick?: () => void;
  /** Enter transition: "fade" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "zoom" | "zoom-out" | "flip" | "blur" | "bounce" | "rotate" | "drop" | "skew" (default: none). Respects `prefers-reduced-motion`. */
  transition?: TransitionVariant;
  /** Enter transition duration in ms (default: 450). */
  transitionDuration?: number;
  /** Delay before the enter transition starts, in ms (default: 0) — handy for staggering. */
  transitionDelay?: number;
  /** Effect while hovering: "lift" | "scale" | "press" | "tilt" | "ring" | "glow" | "shine" (default: none). Applied to each tab. */
  hoverEffect?: HoverEffect;
  /** Extra class names applied to the root bar. */
  className?: string;
  /** Per-part class overrides (`root`, `item`, `activeItem`, `icon`, `label`, `badge`) — merged after the built-in styling. */
  classNames?: {
    root?: string;
    item?: string;
    activeItem?: string;
    icon?: string;
    label?: string;
    badge?: string;
  };
}

export function BottomNavigation({
  items,
  color = "accent",
  variant,
  iconOnly = false,
  fabIcon,
  fabLabel = "Action",
  onFabClick,
  defaultActiveItem,
  onActiveItemChange,
  onItemClick,
  transition,
  transitionDuration,
  transitionDelay,
  hoverEffect,
  className,
  classNames,
}: BottomNavigationProps) {
  const colorIsNamed = isColorName(color);
  // Always self-manages which tab is highlighted — identical logic/reasoning to Navbar's own `selectedLabel`
  // (see Navbar.tsx / Sidebar.tsx for the full "seed vs. lock" explanation).
  const explicitActiveLabel = items.find((item) => item.active)?.label;
  const [selectedLabel, setSelectedLabel] = useState<string | undefined>(
    () =>
      (typeof window === "undefined" ? undefined : findActiveLabel(items, window.location.pathname)) ??
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
    // Only follow the URL when it actually matches an item: a link like href="#" fires `popstate` on click without
    // matching anything, and that must not clear the selection the click just made.
    const syncToUrl = () => {
      const match = findActiveLabel(itemsRef.current, window.location.pathname);
      if (match !== undefined) setSelectedLabel(match);
    };
    window.addEventListener("popstate", syncToUrl);
    return () => window.removeEventListener("popstate", syncToUrl);
  }, []);
  useEffect(() => {
    if (selectedLabel === undefined) return;
    const item = itemsRef.current.find((i) => i.label === selectedLabel);
    if (item) onActiveItemChange?.(item);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- onActiveItemChange intentionally excluded: it's a callback prop, not reactive state, and including it would re-fire this effect on every render whenever the consumer passes a new inline function.
  }, [selectedLabel]);

  // One pill slides to the active tab (same slide as Sidebar / Navbar) instead of each tab repainting its own
  // background — measured from the active tab's real box, re-measured on resize.
  const barRef = useRef<HTMLDivElement>(null);
  const tabNodes = useRef<Record<string, HTMLElement | null>>({});
  const [pill, setPill] = useState<{ left: number; width: number; top: number; height: number } | null>(null);
  useLayoutEffect(() => {
    const measure = () => {
      const el = selectedLabel ? tabNodes.current[selectedLabel] : null;
      setPill(el ? { left: el.offsetLeft, width: el.offsetWidth, top: el.offsetTop, height: el.offsetHeight } : null);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [selectedLabel, items]);

  const solidFill = navbarActiveFillClasses(color, false, false);
  const explicit =
    variant === "text"
      ? {
          fillClass: "",
          fillStyle: {},
          textClass: "font-semibold",
          textStyle: { color: `color-mix(in srgb, ${activeAccent(color, colorIsNamed)} 82%, var(--lojee-fg))` },
        }
      : variant
        ? explicitActive(variant, color, colorIsNamed, solidFill)
        : null;

  return (
    <div
      ref={barRef}
      className={cx("relative flex items-center justify-around gap-1 px-2 py-2", !fabIcon && "border-t border-border bg-surface", motionClass(transition), className, classNames?.root)}
      style={motionStyle(transitionDuration, transitionDelay)}
    >
      {fabIcon && (
        // The bar's surface when there is a floating button: the same bar, but with a round notch scooped out of its top edge (smooth
        // shoulders on both sides) for the button to sit in. Drawn as left | notch | right so the middle can follow a curve.
        <div aria-hidden data-bn-surface="" className="pointer-events-none absolute inset-0 flex">
          <div className="flex-1 border-t border-border bg-surface" />
          <div className="flex w-[120px] shrink-0 flex-col">
            <svg viewBox="0 0 120 44" className="block h-[44px] w-[120px] overflow-visible" data-bn-notch="">
              <defs>
                <filter id="lojee-bn-notch-blur" x="-10%" y="-40%" width="120%" height="180%">
                  <feGaussianBlur stdDeviation="2" />
                </filter>
              </defs>
              {/* A soft shadow the bar's edge casts into the notch: a blurred stroke along the scoop, mostly hidden under the bar's fill. */}
              <path
                data-bn-notch-shadow=""
                d="M18.2,0 A8,8 0 0 1 26.16,7.24 A34,34 0 0 0 93.84,7.24 A8,8 0 0 1 101.8,0"
                fill="none"
                strokeWidth="4"
                filter="url(#lojee-bn-notch-blur)"
                className="stroke-black/10"
              />
              <path d="M0,0 L18.2,0 A8,8 0 0 1 26.16,7.24 A34,34 0 0 0 93.84,7.24 A8,8 0 0 1 101.8,0 L120,0 L120,44.5 L0,44.5 Z" className="fill-surface" />
              <path d="M0,0.5 L18.2,0.5 A8,8 0 0 1 26.16,7.74 A34,34 0 0 0 93.84,7.74 A8,8 0 0 1 101.8,0.5 L120,0.5" fill="none" strokeWidth="1" className="stroke-border" />
            </svg>
            <div className="-mt-px flex-1 bg-surface" />
          </div>
          <div className="flex-1 border-t border-border bg-surface" />
        </div>
      )}
      {pill && variant !== "text" && (
        <span
          aria-hidden
          className={cx("pointer-events-none absolute rounded-xl", ACTIVE_PILL_TRANSITION, explicit ? explicit.fillClass : solidFill)}
          {...(explicit
            ? { style: { ...pill, ...explicit.fillStyle } }
            : activeMarker("fill", color, colorIsNamed, false, { ...pill, ...(!colorIsNamed ? { backgroundColor: color } : {}) }))}
        />
      )}
      {items.map((item, i) => {
        const active = item.label === selectedLabel;
        const itemClasses = cx(
          "relative z-10 flex min-w-0 flex-1 flex-col items-center gap-0.5 rounded-xl px-2 text-[11px]",
          iconOnly ? "py-3" : "py-2.5",
          ACTIVE_ITEM_TRANSITION,
          active
            ? cx(explicit ? explicit.textClass : "text-white", classNames?.activeItem)
            : "text-fg-subtle hover:text-fg-muted",
          motionClass(undefined, hoverEffect),
          classNames?.item
        );
        // The pill above carries the fill; the tab itself only switches its text color. theme.css redraws both for
        // the theme's active style unless a `variant` pins one here.
        const activeProps = active ? (explicit ? { style: explicit.textStyle } : activeMarker("text", color, colorIsNamed)) : {};
        const content = (
          <>
            <span className={cx("relative", classNames?.icon)}>
              <Icon name={item.icon} size={iconOnly ? 22 : 18} />
              {item.badge !== undefined && (
                <span
                  className={cx(
                    "absolute -right-2 -top-1.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-medium leading-none text-white",
                    classNames?.badge
                  )}
                >
                  {item.badge}
                </span>
              )}
            </span>
            {!iconOnly && <span className={cx("max-w-full truncate", classNames?.label)}>{item.label}</span>}
          </>
        );
        const tab = item.href ? (
          <a
            key={`${item.label}-${i}`}
            ref={(el) => {
              tabNodes.current[item.label] = el;
            }}
            href={item.href}
            aria-current={active ? "page" : undefined}
            aria-label={iconOnly ? item.label : undefined}
            title={iconOnly ? item.label : undefined}
            className={itemClasses}
            {...activeProps}
            onClick={() => {
              setSelectedLabel(item.label);
              onItemClick?.(item, i);
            }}
          >
            {content}
          </a>
        ) : (
          <button
            key={`${item.label}-${i}`}
            ref={(el) => {
              tabNodes.current[item.label] = el;
            }}
            type="button"
            aria-current={active ? "page" : undefined}
            aria-label={iconOnly ? item.label : undefined}
            title={iconOnly ? item.label : undefined}
            className={itemClasses}
            {...activeProps}
            onClick={() => {
              setSelectedLabel(item.label);
              onItemClick?.(item, i);
            }}
          >
            {content}
          </button>
        );
        // With a floating button, a gap in the middle of the row leaves room for it.
        return fabIcon && i === Math.ceil(items.length / 2) ? (
          <Fragment key={`${item.label}-${i}`}>
            <span aria-hidden className="w-16 shrink-0" />
            {tab}
          </Fragment>
        ) : (
          tab
        );
      })}
      {fabIcon && (
        <>
          <button
            type="button"
            data-bn-fab=""
            aria-label={fabLabel}
            title={fabLabel}
            onClick={() => onFabClick?.()}
            className="absolute -top-6 left-1/2 z-20 flex size-14 -translate-x-1/2 items-center justify-center rounded-full text-white shadow-lg transition-transform duration-200 hover:-translate-y-0.5 active:scale-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[color-mix(in_srgb,var(--ac)_35%,transparent)]"
            style={{ backgroundColor: activeAccent(color, colorIsNamed), ["--ac" as string]: activeAccent(color, colorIsNamed) }}
          >
            <Icon name={fabIcon} size={26} />
          </button>
        </>
      )}
    </div>
  );
}
