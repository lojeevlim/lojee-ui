import { useLayoutEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { cx } from "../../../core/tokens";
import { Icon } from "../Icons/Icon";

export interface NavigationMenuItem {
  label: string;
  href?: string;
  icon?: string;
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

export type NavigationMenuOrientation = "horizontal" | "vertical";

// Data-driven (array-of-items prop) rather than a compound `<NavigationMenuItem>`
// child component — same reasoning as Tabs: once wrapped as a Web Component via
// r2wc, arbitrary light-DOM children can't be inspected across the shadow
// boundary, so a plain data array is the only shape that works identically in
// both the React and Web Component builds. (A separate `NavigationMenuItem`
// component would also collide with this exported `NavigationMenuItem` type.)
export interface NavigationMenuProps {
  items: NavigationMenuItem[];
  orientation?: NavigationMenuOrientation;
  /** Called whenever a (non-disabled) item is selected/clicked. */
  onChange?: (index: number, item: NavigationMenuItem) => void;
  className?: string;
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
  onChange,
  className,
  classNames,
}: NavigationMenuProps) {
  const hasContent = items.some((item) => item.content != null);
  const initialIndex = Math.max(
    0,
    items.findIndex((item) => item.active)
  );
  const [internalIndex, setInternalIndex] = useState(initialIndex);
  const activeIndex = hasContent ? internalIndex : items.findIndex((item) => item.active);

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

  const nav = (
    <nav className={cx(hasContent ? "shrink-0" : className, hasContent ? undefined : classNames?.root)}>
      <div className={ORIENTATION_CLASSES[orientation]}>
        <span
          aria-hidden="true"
          className={cx(
            "absolute rounded-md bg-slate-100 transition-all duration-200 ease-out",
            classNames?.indicator
          )}
          style={indicatorStyle}
        />
        {items.map((item, i) => {
          const active = i === activeIndex;
          const itemClasses = cx(
            "relative z-10 flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm transition-colors",
            active ? cx("font-medium text-slate-900", classNames?.activeItem) : "text-slate-600 hover:text-slate-900",
            item.disabled && "opacity-40 pointer-events-none",
            classNames?.item
          );
          const label = (
            <>
              {item.icon && <Icon name={item.icon} size={16} />}
              {item.label}
            </>
          );

          const select = () => {
            if (item.disabled) return;
            onChange?.(i, item);
            if (hasContent) setInternalIndex(i);
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
        className,
        classNames?.root
      )}
    >
      {nav}
      <div className={cx(orientation === "vertical" ? "min-w-0 flex-1" : undefined, classNames?.content)}>
        {items[internalIndex]?.content}
      </div>
    </div>
  );
}
