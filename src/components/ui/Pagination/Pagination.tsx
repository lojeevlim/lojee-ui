import { useLayoutEffect, useRef, useState } from "react";
import { colorClasses, cx, isColorName, nonInteractive, type ColorName } from "../../../core/tokens";
import { ACTIVE_ITEM_TRANSITION, ACTIVE_PILL_TRANSITION, activeMarker } from "../../../core/activeVariant";
import { Icon } from "../Icons/Icon";

// Controlled like Divider's resizable/onResize: Pagination owns no page
// state itself, just renders `page` and reports intent via `onPageChange`.
// It's also data-driven (page/totalPages numbers) rather than compound
// children for the same shadow-DOM reason as Table — once wrapped as a Web
// Component via r2wc, arbitrary light-DOM children can't be inspected or
// cloned across the shadow boundary.
export interface PaginationProps {
  /** The current 1-based page number (controlled) — highlighted as active. */
  page: number;
  /** Total number of pages available. */
  totalPages: number;
  /** Called with the new 1-based page number when a page button, or the previous/next button, is clicked. */
  onPageChange?: (page: number) => void;
  /** How many page buttons to show on each side of the current page before collapsing into an ellipsis (default: 1). */
  siblingCount?: number;
  /** Color of the active page indicator (default: "accent" — follows the theme accent). */
  color?: ColorName;
  /** Extra CSS class(es) added to the root element, merged before `classNames.root`. */
  className?: string;
  /** Per-part class overrides — merged after (and win over) the built-in styling. */
  classNames?: { root?: string; item?: string; activeItem?: string };
}

type PageItem = number | "left-ellipsis" | "right-ellipsis";

function range(start: number, end: number): number[] {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

function getPageItems(page: number, totalPages: number, siblingCount: number): PageItem[] {
  const totalSlots = siblingCount * 2 + 5;
  if (totalPages <= totalSlots) return range(1, totalPages);

  const leftSibling = Math.max(page - siblingCount, 1);
  const rightSibling = Math.min(page + siblingCount, totalPages);

  const showLeftEllipsis = leftSibling > 2;
  const showRightEllipsis = rightSibling < totalPages - 1;

  if (!showLeftEllipsis && showRightEllipsis) {
    return [...range(1, 3 + siblingCount * 2), "right-ellipsis", totalPages];
  }

  if (showLeftEllipsis && !showRightEllipsis) {
    return [1, "left-ellipsis", ...range(totalPages - (2 + siblingCount * 2), totalPages)];
  }

  return [1, "left-ellipsis", ...range(leftSibling, rightSibling), "right-ellipsis", totalPages];
}

const ITEM_BASE_CLASSES = cx("flex h-8 w-8 items-center justify-center rounded-md text-sm font-medium", ACTIVE_ITEM_TRANSITION);
const INACTIVE_CLASSES = "text-fg-muted hover:bg-surface-muted";
const NAV_BUTTON_CLASSES = "disabled:opacity-40 disabled:pointer-events-none";

export function Pagination({ page, totalPages, onPageChange, siblingCount = 1, color = "accent", className, classNames }: PaginationProps) {
  const items = getPageItems(page, totalPages, siblingCount);
  const activeClasses = nonInteractive(colorClasses[color]?.solid ?? colorClasses.slate.solid);
  const colorIsNamed = isColorName(color);

  // One pill slides to the current page (same slide as Sidebar / Navbar) instead of each page button
  // repainting its own background. Measured from the active button's real box after every page change.
  const pageRefs = useRef<Record<number, HTMLButtonElement | null>>({});
  const [pill, setPill] = useState<{ left: number; top: number; width: number; height: number } | null>(null);
  useLayoutEffect(() => {
    const el = pageRefs.current[page];
    setPill(el ? { left: el.offsetLeft, top: el.offsetTop, width: el.offsetWidth, height: el.offsetHeight } : null);
  }, [page, totalPages, siblingCount]);

  return (
    <nav aria-label="Pagination" className={cx(className, classNames?.root)}>
      <ul className="relative flex items-center gap-1">
        {pill && (
          <li
            aria-hidden
            role="presentation"
            className={cx("pointer-events-none absolute rounded-md", ACTIVE_PILL_TRANSITION, activeClasses)}
            {...activeMarker("fill", color, colorIsNamed, false, pill)}
          />
        )}
        <li>
          <button
            type="button"
            aria-label="Previous page"
            disabled={page === 1}
            onClick={() => onPageChange?.(page - 1)}
            className={cx(ITEM_BASE_CLASSES, INACTIVE_CLASSES, NAV_BUTTON_CLASSES, classNames?.item)}
          >
            <Icon name="chevron-left" size={16} />
          </button>
        </li>

        {items.map((item) =>
          typeof item === "number" ? (
            <li key={item}>
              <button
                type="button"
                ref={(el) => {
                  pageRefs.current[item] = el;
                }}
                aria-current={item === page ? "page" : undefined}
                {...(item === page && activeMarker("text", color, colorIsNamed))}
                onClick={() => onPageChange?.(item)}
                className={cx(
                  ITEM_BASE_CLASSES,
                  "relative z-10",
                  item === page ? "text-white" : INACTIVE_CLASSES,
                  classNames?.item,
                  item === page && classNames?.activeItem
                )}
              >
                {item}
              </button>
            </li>
          ) : (
            <li key={item}>
              <span aria-hidden="true" className={cx(ITEM_BASE_CLASSES, "text-fg-subtle", classNames?.item)}>
                …
              </span>
            </li>
          )
        )}

        <li>
          <button
            type="button"
            aria-label="Next page"
            disabled={page === totalPages}
            onClick={() => onPageChange?.(page + 1)}
            className={cx(ITEM_BASE_CLASSES, INACTIVE_CLASSES, NAV_BUTTON_CLASSES, classNames?.item)}
          >
            <Icon name="chevron-right" size={16} />
          </button>
        </li>
      </ul>
    </nav>
  );
}
