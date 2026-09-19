import { colorClasses, cx, nonInteractive, type ColorName } from "../../../core/tokens";
import { Icon } from "../Icons/Icon";

// Controlled like Divider's resizable/onResize: Pagination owns no page
// state itself, just renders `page` and reports intent via `onPageChange`.
// It's also data-driven (page/totalPages numbers) rather than compound
// children for the same shadow-DOM reason as Table — once wrapped as a Web
// Component via r2wc, arbitrary light-DOM children can't be inspected or
// cloned across the shadow boundary.
export interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  siblingCount?: number;
  color?: ColorName;
  className?: string;
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

const ITEM_BASE_CLASSES = "flex h-8 w-8 items-center justify-center rounded-md text-sm font-medium transition-colors";
const INACTIVE_CLASSES = "text-slate-600 hover:bg-slate-100";
const NAV_BUTTON_CLASSES = "disabled:opacity-40 disabled:pointer-events-none";

export function Pagination({ page, totalPages, onPageChange, siblingCount = 1, color = "slate", className, classNames }: PaginationProps) {
  const items = getPageItems(page, totalPages, siblingCount);
  const activeClasses = nonInteractive(colorClasses[color]?.solid ?? colorClasses.slate.solid);

  return (
    <nav aria-label="Pagination" className={cx(className, classNames?.root)}>
      <ul className="flex items-center gap-1">
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
                aria-current={item === page ? "page" : undefined}
                onClick={() => onPageChange?.(item)}
                className={cx(
                  ITEM_BASE_CLASSES,
                  item === page ? activeClasses : INACTIVE_CLASSES,
                  classNames?.item,
                  item === page && classNames?.activeItem
                )}
              >
                {item}
              </button>
            </li>
          ) : (
            <li key={item}>
              <span aria-hidden="true" className={cx(ITEM_BASE_CLASSES, "text-slate-400", classNames?.item)}>
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
