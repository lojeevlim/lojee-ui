import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import { cx } from "../../../core/tokens";
import { motionClass, motionStyle, type TransitionVariant, type HoverEffect } from "../../../core/motion";
import { Icon } from "../Icons/Icon";
import { Checkbox } from "../Checkbox/Checkbox";

export interface DataGridColumn<T> {
  /** Unique column id; also the row property read for the cell value when no `render` is given. */
  key: string;
  /** Header cell content. */
  header: ReactNode;
  /** Custom cell renderer, called with the row — defaults to `String(row[key])`. */
  render?: (row: T) => ReactNode;
  /** Horizontal alignment of header and cells: "left" (default) | "center" | "right". */
  align?: "left" | "center" | "right";
  /** Enables click-to-sort on this column's header. */
  sortable?: boolean;
  /** Value to sort by — defaults to the raw `row[key]` value if omitted. */
  sortValue?: (row: T) => string | number;
}

export type DataGridSize = "sm" | "md" | "lg";

type SortState = { key: string; direction: "asc" | "desc" } | null;

// Fully data-driven (columns + data props), not compound children — same
// reasoning as Table: once wrapped as a Web Component via r2wc, arbitrary
// light-DOM children can't be inspected across the shadow boundary. Sorting
// and selection are internal state (not props) since neither needs to cross
// that boundary except as an outgoing `onSelectionChange` event.
export interface DataGridProps<T> {
  /** Column definitions, in display order. */
  columns: DataGridColumn<T>[];
  /** Row objects to render, one table row each. */
  data: T[];
  /** Cell padding/text size: "sm" | "md" | "lg". Defaults to "md". */
  size?: DataGridSize;
  /** Shades every other body row (default: false). */
  striped?: boolean;
  /** Draws an outer border and dividers between rows and cells (default: false). */
  bordered?: boolean;
  /** Adds a checkbox column — select-all in the header, per-row in the body. */
  selectable?: boolean;
  /** Row identity for selection tracking — defaults to the row's array index. */
  getRowId?: (row: T, index: number) => string | number;
  /** Fires whenever the selection changes (when `selectable`), with the array of currently selected rows in display (sorted) order. */
  onSelectionChange?: (selectedRows: T[]) => void;
  /** Shows shimmering skeleton rows in place of the data while true (default: false). The header stays visible. */
  loading?: boolean;
  /** Number of skeleton rows shown while `loading` (default: 5). */
  skeletonRows?: number;
  /** Enter transition: "fade" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "zoom" | "zoom-out" | "flip" | "blur" | "bounce" | "rotate" | "drop" | "skew" (default: none). Respects `prefers-reduced-motion`. */
  transition?: TransitionVariant;
  /** Enter transition duration in ms (default: 450). */
  transitionDuration?: number;
  /** Delay before the enter transition starts, in ms (default: 0) — handy for staggering. */
  transitionDelay?: number;
  /** Effect while hovering: "lift" | "scale" | "press" | "tilt" | "ring" | "glow" | "shine" (default: none). */
  hoverEffect?: HoverEffect;
  /** Extra class name(s) applied to the root element. */
  className?: string;
  /** Per-part class overrides — merged after (and win over) the built-in styling. */
  classNames?: {
    root?: string;
    header?: string;
    row?: string;
    cell?: string;
    checkbox?: string;
  };
}

const PADDING_CLASSES: Record<DataGridSize, string> = {
  sm: "px-3 py-2",
  md: "px-4 py-3",
  lg: "px-6 py-4",
};

const TEXT_CLASSES: Record<DataGridSize, string> = {
  sm: "text-sm",
  md: "text-sm",
  lg: "text-base",
};

const ALIGN_CLASSES: Record<"left" | "center" | "right", string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

// Bar widths vary by column and row so the skeleton doesn't read as a grid of identical blocks.
const SKELETON_WIDTHS = ["w-3/4", "w-1/2", "w-2/3", "w-5/6", "w-2/5"];

const ALIGN_JUSTIFY: Record<"left" | "center" | "right", string> = {
  left: "justify-start",
  center: "justify-center",
  right: "justify-end",
};

// The sweep overlay is absolutely positioned inside the bar, so the bar needs `relative overflow-hidden`.
function SkeletonBar({ widthClass }: { widthClass: string }) {
  return (
    <span className={cx("relative block h-4 overflow-hidden rounded bg-surface-muted", widthClass)}>
      <span className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent motion-reduce:animate-none dark:via-white/10" />
    </span>
  );
}

export function DataGrid<T>({
  columns,
  data,
  size = "md",
  striped = false,
  bordered = false,
  selectable = false,
  getRowId,
  onSelectionChange,
  loading = false,
  skeletonRows = 5,
  className,
  classNames,
  transition,
  transitionDuration,
  transitionDelay,
  hoverEffect,
}: DataGridProps<T>) {
  const paddingClass = PADDING_CLASSES[size];
  const textClass = TEXT_CLASSES[size];

  const [sort, setSort] = useState<SortState>(null);
  const [selected, setSelected] = useState<Set<string | number>>(new Set());

  const rowId = (row: T, index: number): string | number => (getRowId ? getRowId(row, index) : index);

  const sortedData = useMemo(() => {
    if (!sort) return data;
    const column = columns.find((c) => c.key === sort.key);
    if (!column) return data;
    const valueOf = (row: T): string | number =>
      column.sortValue ? column.sortValue(row) : ((row as Record<string, unknown>)[column.key] as string | number);
    const copy = [...data];
    copy.sort((a, b) => {
      const av = valueOf(a);
      const bv = valueOf(b);
      if (av === bv) return 0;
      const cmp = av > bv ? 1 : -1;
      return sort.direction === "asc" ? cmp : -cmp;
    });
    return copy;
  }, [data, sort, columns]);

  const toggleSort = (key: string) => {
    setSort((prev) => {
      if (!prev || prev.key !== key) return { key, direction: "asc" };
      if (prev.direction === "asc") return { key, direction: "desc" };
      return null;
    });
  };

  const emitSelection = (next: Set<string | number>) => {
    setSelected(next);
    onSelectionChange?.(sortedData.filter((row, i) => next.has(rowId(row, i))));
  };

  const allSelected = selectable && sortedData.length > 0 && sortedData.every((row, i) => selected.has(rowId(row, i)));

  const toggleAll = () => {
    if (allSelected) {
      emitSelection(new Set());
    } else {
      emitSelection(new Set(sortedData.map((row, i) => rowId(row, i))));
    }
  };

  const toggleRow = (id: string | number) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    emitSelection(next);
  };

  return (
    <div
      className={cx("overflow-x-auto", motionClass(transition, hoverEffect), className, classNames?.root)}
      style={motionStyle(transitionDuration, transitionDelay)}
    >
      <table className={cx("w-full", bordered && "border border-border")} aria-busy={loading || undefined}>
        <thead>
          <tr className={cx(bordered && "divide-x divide-border")}>
            {selectable && (
              <th className={cx("w-10 bg-surface-muted text-center", paddingClass, classNames?.header)}>
                <Checkbox
                  aria-label="Select all rows"
                  checked={allSelected}
                  onChange={toggleAll}
                  classNames={{ root: cx("justify-center", classNames?.checkbox) }}
                />
              </th>
            )}
            {columns.map((column) => {
              const isSorted = sort?.key === column.key;
              return (
                <th
                  key={column.key}
                  className={cx(
                    "bg-surface-muted text-xs font-semibold uppercase tracking-wide text-fg-subtle",
                    paddingClass,
                    ALIGN_CLASSES[column.align ?? "left"],
                    classNames?.header
                  )}
                >
                  {column.sortable ? (
                    <button
                      type="button"
                      onClick={() => toggleSort(column.key)}
                      className={cx(
                        "inline-flex items-center gap-1 transition-colors hover:text-fg-muted",
                        column.align === "right" && "flex-row-reverse",
                        column.align === "center" && "justify-center"
                      )}
                    >
                      {column.header}
                      <Icon
                        name={isSorted && sort?.direction === "desc" ? "chevron-down" : "chevron-up"}
                        size={12}
                        className={cx("shrink-0 transition-opacity", isSorted ? "opacity-100" : "opacity-30")}
                      />
                    </button>
                  ) : (
                    column.header
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody
          className={cx(bordered && "divide-y divide-border", striped && "[&>tr:nth-child(even)]:bg-surface-muted")}
        >
          {loading &&
            Array.from({ length: Math.max(0, skeletonRows) }, (_, rowIndex) => (
              <tr key={`skeleton-${rowIndex}`} className={cx(bordered && "divide-x divide-border", classNames?.row)}>
                {selectable && (
                  <td className={cx("w-10", paddingClass)}>
                    <div className="flex justify-center">
                      <SkeletonBar widthClass="w-4" />
                    </div>
                  </td>
                )}
                {columns.map((column, colIndex) => (
                  <td key={column.key} className={cx(paddingClass, textClass, classNames?.cell)}>
                    <div className={cx("flex", ALIGN_JUSTIFY[column.align ?? "left"])}>
                      <SkeletonBar widthClass={SKELETON_WIDTHS[(rowIndex + colIndex * 2) % SKELETON_WIDTHS.length]} />
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          {!loading && sortedData.map((row, rowIndex) => {
            const id = rowId(row, rowIndex);
            const isSelected = selected.has(id);
            return (
              <tr
                key={id}
                className={cx(
                  bordered && "divide-x divide-border",
                  isSelected && "bg-surface-muted",
                  classNames?.row
                )}
              >
                {selectable && (
                  <td className={cx("w-10 text-center", paddingClass)}>
                    <Checkbox
                      aria-label="Select row"
                      checked={isSelected}
                      onChange={() => toggleRow(id)}
                      classNames={{ root: cx("justify-center", classNames?.checkbox) }}
                    />
                  </td>
                )}
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={cx(paddingClass, textClass, ALIGN_CLASSES[column.align ?? "left"], classNames?.cell)}
                  >
                    {column.render ? column.render(row) : String((row as Record<string, unknown>)[column.key])}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
