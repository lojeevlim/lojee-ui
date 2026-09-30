import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { cx, isColorName, type ColorName } from "../../../core/tokens";
import { ACTIVE_ITEM_TRANSITION, ACTIVE_PILL_TRANSITION, activeAccent, activeMarker, explicitActive, type ActiveVariant } from "../../../core/activeVariant";
import { navbarActiveFillClasses } from "../Navbar/navbarActiveStyles";
import { Icon } from "../Icons/Icon";

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
  defaultActiveItem,
  onActiveItemChange,
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
      className={cx("relative flex items-center justify-around gap-1 border-t border-border bg-surface px-2 py-2", className, classNames?.root)}
    >
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
          "relative z-10 flex min-w-0 flex-1 flex-col items-center gap-0.5 rounded-xl px-2 py-2.5 text-[11px]",
          ACTIVE_ITEM_TRANSITION,
          active
            ? cx(explicit ? explicit.textClass : "text-white", classNames?.activeItem)
            : "text-fg-subtle hover:text-fg-muted",
          classNames?.item
        );
        // The pill above carries the fill; the tab itself only switches its text color. theme.css redraws both for
        // the theme's active style unless a `variant` pins one here.
        const activeProps = active ? (explicit ? { style: explicit.textStyle } : activeMarker("text", color, colorIsNamed)) : {};
        const content = (
          <>
            <span className={cx("relative", classNames?.icon)}>
              <Icon name={item.icon} size={18} />
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
            <span className={cx("max-w-full truncate", classNames?.label)}>{item.label}</span>
          </>
        );
        return item.href ? (
          <a
            key={`${item.label}-${i}`}
            ref={(el) => {
              tabNodes.current[item.label] = el;
            }}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={itemClasses}
            {...activeProps}
            onClick={() => setSelectedLabel(item.label)}
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
            className={itemClasses}
            {...activeProps}
            onClick={() => setSelectedLabel(item.label)}
          >
            {content}
          </button>
        );
      })}
    </div>
  );
}
