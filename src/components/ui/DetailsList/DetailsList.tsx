import { useState, type ReactNode } from "react";
import { cx } from "../../../core/tokens";
import { motionClass, motionStyle, type TransitionVariant } from "../../../core/motion";
import { Icon } from "../Icons/Icon";

export interface DetailsListField {
  /** Field name, shown in monospace. */
  name: string;
  /** Type of the field, shown in the accent colour. */
  type?: string;
  /** What the field holds. */
  description?: string;
}

export interface DetailsListItem {
  /** Row title, shown in monospace (e.g. an event or method name). */
  title: string;
  /** One-line summary shown beside the title. */
  description?: string;
  /** Paragraph shown when the row is open. */
  body?: string;
  /** Small table of fields (name, type, description) shown when the row is open. */
  fields?: DetailsListField[];
  /** A code sample shown when the row is open. */
  code?: string;
  /** Custom content shown when the row is open (React only). */
  content?: ReactNode;
  /** Start this row expanded (default: collapsed). */
  open?: boolean;
}

export interface DetailsListProps {
  /** The rows, in display order. */
  items: DetailsListItem[];
  /** Lets only one row stay open at a time (default: false). */
  exclusive?: boolean;
  /** Enter transition: "fade" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "zoom" | "zoom-out" | "flip" | "blur" | "bounce" | "rotate" | "drop" | "skew" (default: none). Respects `prefers-reduced-motion`. */
  transition?: TransitionVariant;
  /** Enter transition duration in ms (default: 450). */
  transitionDuration?: number;
  /** Delay before the enter transition starts, in ms (default: 0). */
  transitionDelay?: number;
  /** Extra class name(s) applied to the root element. */
  className?: string;
  /** Per-part class overrides — merged after (and win over) the built-in styling. */
  classNames?: { root?: string; item?: string; summary?: string; body?: string };
}

/** An expandable list of rows — a title and summary that open to a description, a fields table and a code sample. */
export function DetailsList({ items, exclusive = false, transition, transitionDuration, transitionDelay, className, classNames }: DetailsListProps) {
  const [openKeys, setOpenKeys] = useState<Set<string>>(() => new Set(items.filter((i) => i.open).map((i) => i.title)));
  const toggle = (key: string) =>
    setOpenKeys((prev) => {
      const next = new Set(exclusive ? [...prev].filter((k) => k === key) : prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });

  return (
    <div
      className={cx("divide-y divide-border overflow-hidden rounded-xl border border-border bg-surface shadow-sm", motionClass(transition), className, classNames?.root)}
      style={motionStyle(transitionDuration, transitionDelay)}
    >
      {items.map((item) => {
        const isOpen = openKeys.has(item.title);
        return (
          <div key={item.title} className={classNames?.item}>
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => toggle(item.title)}
              className={cx(
                "flex w-full cursor-pointer items-center gap-2.5 px-4 py-3 text-left text-sm transition-colors hover:bg-surface-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent-500/40",
                classNames?.summary
              )}
            >
              <Icon name="chevron-right" size={14} className={cx("shrink-0 text-fg-subtle transition-transform duration-300 ease-out", isOpen && "rotate-90")} />
              <code className="shrink-0 font-mono text-[13px] font-medium text-fg">{item.title}</code>
              {item.description && <span className="truncate text-fg-subtle">{item.description}</span>}
            </button>
            <div
              className={cx(
                "grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              )}
              aria-hidden={!isOpen}
              inert={!isOpen}
            >
              <div className="min-h-0 overflow-hidden">
                <div className={cx("space-y-3 border-t border-border bg-surface-muted/30 px-4 py-3 pl-10", classNames?.body)}>
                  {item.body && <p className="text-sm text-fg-muted">{item.body}</p>}
                  {item.fields && item.fields.length > 0 && (
                    <div className="overflow-x-auto rounded-lg border border-border bg-surface">
                      <table className="w-full min-w-[420px] text-left text-xs">
                        <thead className="bg-surface-muted text-[11px] uppercase tracking-wide text-fg-subtle">
                          <tr>
                            <th className="px-2.5 py-1.5 font-medium">Field</th>
                            <th className="px-2.5 py-1.5 font-medium">Type</th>
                            <th className="px-2.5 py-1.5 font-medium">Description</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                          {item.fields.map((f) => (
                            <tr key={f.name} className="align-top">
                              <td className="whitespace-nowrap px-2.5 py-1.5 font-mono text-fg">{f.name}</td>
                              <td className="px-2.5 py-1.5 font-mono text-accent-600 dark:text-accent-400">{f.type ?? "—"}</td>
                              <td className="px-2.5 py-1.5 text-fg-muted">{f.description || "—"}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                  {item.code && (
                    <pre className="overflow-x-auto rounded-lg border border-dashed border-border-strong bg-surface p-3 text-xs leading-relaxed text-fg">
                      <code>{item.code}</code>
                    </pre>
                  )}
                  {item.content}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
