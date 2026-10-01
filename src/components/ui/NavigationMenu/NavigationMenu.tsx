import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { cx, isColorName, type ColorName } from "../../../core/tokens";
import { ACTIVE_ITEM_TRANSITION, ACTIVE_PILL_TRANSITION, activeMarker, explicitActive, type ActiveVariant } from "../../../core/activeVariant";
import { navbarActiveFillClasses } from "../Navbar/navbarActiveStyles";
import { Icon } from "../Icons/Icon";
import { motionClass, motionStyle, type TransitionVariant, type HoverEffect } from "../../../core/motion";

export interface NavigationMenuItem {
  label: string;
  href?: string;
  icon?: string;
  /** Marks this item as the current one. `NavigationMenu` always manages the selection itself — clicking an item
   * updates it immediately, and an item's `href` is matched against the current URL on load and on back/forward
   * navigation, so no wiring is needed. Setting `active: true` is a *default*, not a lock, exactly like Sidebar's and
   * Navbar's `active`. */
  active?: boolean;
  disabled?: boolean;
  /**
   * Associated content for this item. When ANY item in the list has `content`,
   * NavigationMenu manages which item is selected internally (like Tabs) and
   * renders the selected item's content next to (vertical) or below
   * (horizontal) the nav — handy for a settings-page nav + panel layout.
   * When no item has `content`, the menu stays a plain, externally-controlled
   * link list (its usual role as real site navigation).
   */
  content?: ReactNode;
}

// Which item matches the current URL — the same logic as Sidebar's / Navbar's own `findActiveLabel` (an exact
// `href` wins; otherwise the longest `href` the path starts with; "/" only ever matches exactly).
function findActiveLabel(items: NavigationMenuItem[], pathname: string): string | undefined {
  let bestMatch: NavigationMenuItem | undefined;
  for (const item of items) {
    if (!item.href) continue;
    if (item.href === pathname) return item.label;
    if (item.href !== "/" && pathname.startsWith(item.href)) {
      if (!bestMatch || item.href.length > bestMatch.href!.length) bestMatch = item;
    }
  }
  return bestMatch?.label;
}

export type NavigationMenuOrientation = "horizontal" | "vertical";

// Data-driven (array-of-items prop) rather than a compound `<NavigationMenuItem>`
// child component — same reasoning as Tabs: once wrapped as a Web Component via
// r2wc, arbitrary light-DOM children can't be inspected across the shadow
// boundary, so a plain data array is the only shape that works identically in
// both the React and Web Component builds. (A separate `NavigationMenuItem`
// component would also collide with this exported `NavigationMenuItem` type.)
export interface NavigationMenuProps {
  /** The menu entries, in display order; each has a `label` and optionally `href`, `icon`, `active`, `disabled` and `content`. */
  items: NavigationMenuItem[];
  /** Layout direction of the menu: "horizontal" (default) or "vertical". */
  orientation?: NavigationMenuOrientation;
  /** Color of the active item (default: "accent" — follows the theme accent) — one of the built-in ColorNames (including "accent", which
   * follows the theme accent), or any other CSS color value. Same as Navbar / Sidebar. */
  color?: ColorName | (string & {});
  /** How the active item is drawn: "solid", "outline" or "soft". Leave it out to follow the theme's
   * active-item style (`ThemeProvider`'s `defaultActiveVariant`, default "solid"). */
  variant?: ActiveVariant;
  /** Only an initial default (see `NavigationMenuItem.active`): which item starts selected when nothing else —
   * a matching `href`, an `active: true` entry — already determines it. */
  defaultActiveItem?: string;
  /** Called with the full item whenever the active item changes — a click, a URL match on mount/back-forward
   * navigation, or an item's `active` field changing to point elsewhere. Same as Sidebar / Navbar. */
  onActiveItemChange?: (item: NavigationMenuItem) => void;
  /** Called whenever a (non-disabled) item is clicked, with its index and data. */
  onChange?: (index: number, item: NavigationMenuItem) => void;
  /** Enter transition: "fade" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "zoom" | "zoom-out" | "flip" | "blur" | "bounce" | "rotate" | "drop" | "skew" (default: none). Respects `prefers-reduced-motion`. */
  transition?: TransitionVariant;
  /** Enter transition duration in ms (default: 450). */
  transitionDuration?: number;
  /** Delay before the enter transition starts, in ms (default: 0) — handy for staggering. */
  transitionDelay?: number;
  /** Effect while hovering: "lift" | "scale" | "press" | "tilt" | "ring" | "glow" | "shine" (default: none). Applied to each menu item. */
  hoverEffect?: HoverEffect;
  /** Extra CSS class(es) added to the root element, merged before `classNames.root`. */
  className?: string;
  /** Per-part class overrides — merged after (and win over) the built-in styling. */
  classNames?: {
    root?: string;
    item?: string;
    activeItem?: string;
    indicator?: string;
    content?: string;
  };
}

const ORIENTATION_CLASSES: Record<NavigationMenuOrientation, string> = {
  horizontal: "relative flex items-center gap-1",
  vertical: "relative flex flex-col gap-1",
};

export function NavigationMenu({
  items,
  orientation = "horizontal",
  color = "accent",
  variant,
  defaultActiveItem,
  onActiveItemChange,
  onChange,
  transition,
  transitionDuration,
  transitionDelay,
  hoverEffect,
  className,
  classNames,
}: NavigationMenuProps) {
  const hasContent = items.some((item) => item.content != null);
  // Always self-manages which item is highlighted — identical logic/reasoning to Navbar's own `selectedLabel`
  // (see Navbar.tsx / Sidebar.tsx for the full "seed vs. lock" explanation of `active` / `defaultActiveItem`).
  const explicitActiveLabel = items.find((item) => item.active)?.label;
  const [selectedLabel, setSelectedLabel] = useState<string | undefined>(
    () =>
      (typeof window === "undefined" ? undefined : findActiveLabel(items, window.location.pathname)) ??
      explicitActiveLabel ??
      defaultActiveItem ??
      // A menu paired with content always shows one panel, so it starts on the first item.
      (hasContent ? items[0]?.label : undefined)
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
  const activeIndex = items.findIndex((item) => item.label === selectedLabel);

  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const [indicatorStyle, setIndicatorStyle] = useState<CSSProperties>({ opacity: 0 });

  // Slides a background "pill" behind the active item on every change — runs
  // in a layout effect so the very first measurement resolves before paint
  // (no visible entrance animation), while later clicks/prop changes DO
  // animate smoothly, since the browser has already painted the prior spot.
  useLayoutEffect(() => {
    const el = itemRefs.current[activeIndex];
    if (!el) {
      setIndicatorStyle((s) => ({ ...s, opacity: 0 }));
      return;
    }
    setIndicatorStyle(
      orientation === "vertical"
        ? { opacity: 1, top: el.offsetTop, height: el.offsetHeight, left: 0, right: 0 }
        : { opacity: 1, left: el.offsetLeft, width: el.offsetWidth, top: 0, bottom: 0 }
    );
  }, [activeIndex, orientation, items.length]);

  const colorIsNamed = isColorName(color);
  // Solid fill classes (shared with Navbar). With `variant` given we style the active item ourselves; without
  // it the item is marked and theme.css redraws it for whichever active style the theme has selected.
  const solidFill = navbarActiveFillClasses(color, false, false);
  const explicit = variant ? explicitActive(variant, color, colorIsNamed, solidFill) : null;

  const nav = (
    <nav
      className={cx(hasContent ? "shrink-0" : className, hasContent ? undefined : classNames?.root, !hasContent && motionClass(transition))}
      style={hasContent ? undefined : motionStyle(transitionDuration, transitionDelay)}
    >
      <div className={ORIENTATION_CLASSES[orientation]}>
        <span
          aria-hidden="true"
          className={cx(
            "absolute rounded-md",
            ACTIVE_PILL_TRANSITION,
            explicit ? explicit.fillClass : solidFill,
            classNames?.indicator
          )}
          {...(explicit
            ? { style: { ...indicatorStyle, ...explicit.fillStyle } }
            : activeMarker("fill", color, colorIsNamed, false, {
                ...indicatorStyle,
                ...(!colorIsNamed && { backgroundColor: color }),
              }))}
        />
        {items.map((item, i) => {
          const active = i === activeIndex;
          const itemClasses = cx(
            "relative z-10 flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm",
            ACTIVE_ITEM_TRANSITION,
            active
              ? cx("font-medium", explicit ? explicit.textClass : "text-white", classNames?.activeItem)
              : "text-fg-muted hover:text-fg",
            item.disabled && "opacity-40 pointer-events-none",
            motionClass(undefined, hoverEffect),
            classNames?.item
          );
          const label = (
            <>
              {item.icon && <Icon name={item.icon} size={16} />}
              {item.label}
            </>
          );

          // Active item: text color is drawn by the item, the fill by the sliding indicator above.
          const activeProps = active
            ? explicit
              ? { style: explicit.textStyle }
              : activeMarker("text", color, colorIsNamed)
            : {};

          const select = () => {
            if (item.disabled) return;
            onChange?.(i, item);
            setSelectedLabel(item.label);
          };

          // A real `href` with no paired content stays a genuine navigation
          // link (e.g. a site's main nav) — otherwise it behaves like a tab.
          if (item.href && !hasContent) {
            return (
              <a
                key={i}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                href={item.href}
                aria-current={active ? "page" : undefined}
                aria-disabled={item.disabled}
                className={itemClasses}
                {...activeProps}
                onClick={select}
              >
                {label}
              </a>
            );
          }

          return (
            <button
              key={i}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              type="button"
              aria-current={active ? "page" : undefined}
              disabled={item.disabled}
              className={itemClasses}
              {...activeProps}
              onClick={select}
            >
              {label}
            </button>
          );
        })}
      </div>
    </nav>
  );

  if (!hasContent) return nav;

  return (
    <div
      className={cx(
        orientation === "vertical" ? "flex items-start gap-6" : "flex flex-col gap-4",
        motionClass(transition),
        className,
        classNames?.root
      )}
      style={motionStyle(transitionDuration, transitionDelay)}
    >
      {nav}
      <div className={cx(orientation === "vertical" ? "min-w-0 flex-1" : undefined, classNames?.content)}>
        {items[activeIndex]?.content}
      </div>
    </div>
  );
}
