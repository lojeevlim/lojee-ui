import type { ReactNode } from "react";
import { cx } from "../../../core/tokens";

export interface TableColumn<T> {
  key: string;
  header: ReactNode;
  render?: (row: T) => ReactNode;
  align?: "left" | "center" | "right";
}

export type TableSize = "sm" | "md" | "lg";

// Fully data-driven (columns + data props), not compound children — this
// also gets wrapped as a Web Component via r2wc, which can't forward or
// inspect light-DOM children projected across a shadow boundary, so a
// "figure out rows/columns from arbitrary <Table.Row>/<Table.Cell> children"
// compound API isn't viable once wrapped.
export interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  size?: TableSize;
  striped?: boolean;
  bordered?: boolean;
  className?: string;
  classNames?: { root?: string; header?: string; row?: string; cell?: string };
}

const PADDING_CLASSES: Record<TableSize, string> = {
  sm: "px-3 py-2",
  md: "px-4 py-3",
  lg: "px-6 py-4",
};

const TEXT_CLASSES: Record<TableSize, string> = {
  sm: "text-sm",
  md: "text-sm",
  lg: "text-base",
};

const ALIGN_CLASSES: Record<"left" | "center" | "right", string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

export function Table<T>({ columns, data, size = "md", striped = false, bordered = false, className, classNames }: TableProps<T>) {
  const paddingClass = PADDING_CLASSES[size];
  const textClass = TEXT_CLASSES[size];

  return (
    <div className={cx("overflow-x-auto", className, classNames?.root)}>
      <table className={cx("w-full", bordered && "border border-slate-200")}>
        <thead>
          <tr className={cx(bordered && "divide-x divide-slate-200")}>
            {columns.map((column) => (
              <th
                key={column.key}
                className={cx(
                  "bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500",
                  paddingClass,
                  ALIGN_CLASSES[column.align ?? "left"],
                  classNames?.header
                )}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody
          className={cx(
            bordered && "divide-y divide-slate-200",
            striped && "[&>tr:nth-child(even)]:bg-slate-50"
          )}
        >
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className={cx(bordered && "divide-x divide-slate-200", classNames?.row)}>
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={cx(paddingClass, textClass, ALIGN_CLASSES[column.align ?? "left"], classNames?.cell)}
                >
                  {column.render ? column.render(row) : String((row as Record<string, unknown>)[column.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
