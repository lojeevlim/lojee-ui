import { useState, type ReactNode } from "react";
import { cx } from "../../../core/tokens";
import { Button } from "../Buttons/Button";
import { motionClass, motionStyle, type TransitionVariant } from "../../../core/motion";

export interface TableColumn<T> {
  key: string;
  header: ReactNode;
  render?: (row: T) => ReactNode;
  align?: "left" | "center" | "right";
}

export interface TableAction {
  /** Visible name — used as the button's tooltip and accessible label. */
  label: string;
  /** Icon name, e.g. "pencil" — see src/core/icons.ts for the available set. */
  icon?: string;
  /** Optional identifier passed back with the action (defaults to the label when you need one). */
  value?: string;
  /** "default" or "danger" (destructive color) (default: "default"). */
  color?: "default" | "danger";
}

export type TableSize = "sm" | "md" | "lg";

// Fully data-driven (columns + data props), not compound children — this
// also gets wrapped as a Web Component via r2wc, which can't forward or
// inspect light-DOM children projected across a shadow boundary, so a
// "figure out rows/columns from arbitrary <Table.Row>/<Table.Cell> children"
// compound API isn't viable once wrapped.
export interface TableProps<T> {
  /** Column definitions — each has a `key` (field read from the row), a `header`, an optional `render(row)` for custom cell content, and optional `align`. */
  columns: TableColumn<T>[];
  /** Rows to display, one object per row. */
  data: T[];
  /** Cell padding/text size: "sm", "md" or "lg" (default: "md"). */
  size?: TableSize;
  /** Shades every other row for readability (default: false). */
  striped?: boolean;
  /** Draws an outer border and dividers between rows and columns (default: false). */
  bordered?: boolean;
  /** Row actions — adds a right-aligned final column with one small icon button per action. Data-driven, so it works from the Web Component too (use `onAction` / the `action` event). */
  actions?: TableAction[];
  /** Header text of the actions column (default: "Actions"). */
  actionsHeader?: string;
  /** Called when a row action is clicked, with the action and its row. For built-ins it runs after the change: "delete" gets the removed row, "duplicate" gets the original row, and "edit" fires on Save with the updated row (Cancel and starting an edit don't fire it). */
  onAction?: (action: TableAction, row: T) => void;
  /** Handle `actions` whose value is "delete", "duplicate" or "edit" inside the table (default: true). Set false to only receive `onAction` and manage rows yourself. */
  builtInActions?: boolean;
  /** Called with the updated rows after a built-in delete, duplicate or edit-save. */
  onDataChange?: (rows: T[]) => void;
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
  /** Extra class name(s) appended to the root element. */
  className?: string;
  /** Per-part class overrides — merged after (and win over) the built-in styling. */
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

interface Entry<T> {
  id: number;
  row: T;
}

interface Store<T> {
  source: T[];
  entries: Entry<T>[];
  nextId: number;
  fresh: number | null;
}

function seed<T>(source: T[]): Store<T> {
  return { source, entries: source.map((row, id) => ({ id, row })), nextId: source.length, fresh: null };
}

function sameContent(a: unknown, b: unknown): boolean {
  try {
    return JSON.stringify(a) === JSON.stringify(b);
  } catch {
    return false;
  }
}

export function Table<T>({ columns, data, size = "md", striped = false, bordered = false, actions, actionsHeader = "Actions", onAction, builtInActions = true, onDataChange, loading = false, skeletonRows = 5, className, classNames, transition, transitionDuration, transitionDelay }: TableProps<T>) {
  const paddingClass = PADDING_CLASSES[size];
  const textClass = TEXT_CLASSES[size];
  const hasActions = !!actions && actions.length > 0;

  // Working copy of the rows (derive-state-from-props: re-seed when `data` changes).
  const [store, setStore] = useState<Store<T>>(() => seed(data));
  const [editing, setEditing] = useState<{ id: number; draft: Record<string, string> } | null>(null);
  if (store.source !== data && !sameContent(store.source, data)) {
    setStore(seed(data));
    setEditing(null);
  }
  const rows: Entry<T>[] = hasActions && builtInActions ? store.entries : data.map((row, id) => ({ id, row }));

  const commit = (entries: Entry<T>[], fresh: number | null, nextId = store.nextId) => {
    setStore({ ...store, entries, fresh, nextId });
    onDataChange?.(entries.map((e) => e.row));
  };

  const runAction = (action: TableAction, entry: Entry<T>) => {
    if (builtInActions && action.value === "delete") {
      commit(store.entries.filter((e) => e.id !== entry.id), null);
      if (editing?.id === entry.id) setEditing(null);
    } else if (builtInActions && action.value === "duplicate") {
      const index = store.entries.findIndex((e) => e.id === entry.id);
      const copy = { id: store.nextId, row: { ...entry.row } };
      commit([...store.entries.slice(0, index + 1), copy, ...store.entries.slice(index + 1)], copy.id, store.nextId + 1);
    } else if (builtInActions && action.value === "edit") {
      const draft: Record<string, string> = {};
      for (const column of columns) {
        if (!column.render) draft[column.key] = String((entry.row as Record<string, unknown>)[column.key] ?? "");
      }
      setEditing({ id: entry.id, draft });
      return;
    }
    onAction?.(action, entry.row);
  };

  const saveEdit = () => {
    if (!editing) return;
    const entry = store.entries.find((e) => e.id === editing.id);
    if (!entry) return;
    const updated = { ...entry.row } as Record<string, unknown>;
    for (const column of columns) {
      if (column.render) continue;
      const original = updated[column.key];
      const text = editing.draft[column.key] ?? "";
      if (String(original ?? "") === text) continue;
      updated[column.key] = typeof original === "number" && text.trim() !== "" && !Number.isNaN(Number(text)) ? Number(text) : text;
    }
    const next = updated as T;
    commit(store.entries.map((e) => (e.id === entry.id ? { ...e, row: next } : e)), null);
    setEditing(null);
    const editAction = actions?.find((a) => a.value === "edit");
    if (editAction) onAction?.(editAction, next);
  };

  return (
    <div
      className={cx("overflow-x-auto", motionClass(transition), className, classNames?.root)}
      style={motionStyle(transitionDuration, transitionDelay)}
    >
      <table className={cx("w-full", bordered && "border border-border")} aria-busy={loading || undefined}>
        <thead>
          <tr className={cx(bordered && "divide-x divide-border")}>
            {columns.map((column) => (
              <th
                key={column.key}
                className={cx(
                  "bg-surface-muted text-xs font-semibold uppercase tracking-wide text-fg-subtle",
                  paddingClass,
                  ALIGN_CLASSES[column.align ?? "left"],
                  classNames?.header
                )}
              >
                {column.header}
              </th>
            ))}
            {hasActions && (
              <th className={cx("bg-surface-muted text-right text-xs font-semibold uppercase tracking-wide text-fg-subtle", paddingClass, classNames?.header)}>
                {actionsHeader}
              </th>
            )}
          </tr>
        </thead>
        <tbody
          className={cx(
            bordered && "divide-y divide-border",
            striped && "[&>tr:nth-child(even)]:bg-surface-muted"
          )}
        >
          {loading
            ? Array.from({ length: Math.max(0, skeletonRows) }, (_, rowIndex) => (
                <tr key={rowIndex} className={cx(bordered && "divide-x divide-border", classNames?.row)}>
                  {columns.map((column, colIndex) => (
                    <td key={column.key} className={cx(paddingClass, textClass, classNames?.cell)}>
                      <div className={cx("flex", ALIGN_JUSTIFY[column.align ?? "left"])}>
                        <SkeletonBar widthClass={SKELETON_WIDTHS[(rowIndex + colIndex * 2) % SKELETON_WIDTHS.length]} />
                      </div>
                    </td>
                  ))}
                  {hasActions && (
                    <td className={cx(paddingClass, textClass, classNames?.cell)}>
                      <div className="flex justify-end">
                        <SkeletonBar widthClass="w-10" />
                      </div>
                    </td>
                  )}
                </tr>
              ))
            : rows.map(({ id, row }) => {
                const isEditing = editing?.id === id;
                return (
                <tr key={id} className={cx(bordered && "divide-x divide-border", id === store.fresh && motionClass("fade"), classNames?.row)}>
                  {columns.map((column, colIndex) => (
                    <td
                      key={column.key}
                      className={cx(paddingClass, textClass, ALIGN_CLASSES[column.align ?? "left"], classNames?.cell)}
                    >
                      {isEditing && !column.render ? (
                        <input
                          type="text"
                          autoFocus={colIndex === 0 || undefined}
                          aria-label={typeof column.header === "string" ? column.header : column.key}
                          value={editing.draft[column.key] ?? ""}
                          onChange={(e) => setEditing({ ...editing, draft: { ...editing.draft, [column.key]: e.target.value } })}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") saveEdit();
                            else if (e.key === "Escape") setEditing(null);
                          }}
                          className={cx(
                            "w-full rounded-md border border-border bg-surface px-2 py-1 text-sm text-fg outline-none focus:border-fg-subtle focus:ring-2 focus:ring-border",
                            ALIGN_CLASSES[column.align ?? "left"]
                          )}
                        />
                      ) : column.render ? (
                        column.render(row)
                      ) : (
                        String((row as Record<string, unknown>)[column.key])
                      )}
                    </td>
                  ))}
                  {hasActions && (
                    <td className={cx(paddingClass, textClass, "text-right", classNames?.cell)}>
                      <div className="flex justify-end gap-1">
                        {isEditing ? (
                          <>
                            <span title="Save" className="inline-flex">
                              <Button variant="ghost" size="sm" iconOnly icon="check" label="Save" onClick={saveEdit} />
                            </span>
                            <span title="Cancel" className="inline-flex">
                              <Button variant="ghost" size="sm" iconOnly icon="x" label="Cancel" onClick={() => setEditing(null)} />
                            </span>
                          </>
                        ) : (
                          actions.map((action) => (
                            <span key={action.value ?? action.label} title={action.label} className="inline-flex">
                              <Button
                                variant="ghost"
                                size="sm"
                                iconOnly
                                icon={action.icon}
                                label={action.label}
                                className={cx(
                                  action.color === "danger" &&
                                    "text-red-600 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-950/40 dark:hover:text-red-300"
                                )}
                                onClick={() => runAction(action, { id, row })}
                              />
                            </span>
                          ))
                        )}
                      </div>
                    </td>
                  )}
                </tr>
                );
              })}
        </tbody>
      </table>
    </div>
  );
}
