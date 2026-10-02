import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUp, ChevronDown, GripVertical, LayoutGrid, List, MoreVertical, Plus, Search, X } from "lucide-react";
import { cx, type ColorName } from "../../../core/tokens";
import { motionClass, motionStyle, type TransitionVariant } from "../../../core/motion";
import { useValue } from "../../../core/useValue";
import { Badge } from "../Badge/Badge";
import { getIcon } from "../../../core/icons";

export type GridViewMode = "grid" | "list";

/** "default" is a plain browsable grid; "draggable" lets the cards be reordered by dragging (or with the arrow keys on the handle). */
export type GridViewVariant = "default" | "draggable";

/** A labelled value, shown as a big number in `stats` or a small detail in `fields`. */
export interface GridViewValue {
  /** Small caption above the value, e.g. "Balance Due". */
  label: string;
  /** The value shown. Text such as "$12,099" or "08/08/2022" also sorts as a number or a date. */
  value: string | number;
}

export interface GridViewTag {
  /** Text of the tag. */
  label: string;
  /** Tag colour (default: chosen from the word — "Accepted" is green, "Pending" amber, "Overdue" red). */
  color?: ColorName;
}

export interface GridViewItem {
  /** Unique id of the card (default: its position). */
  id?: string | number;
  /** The card heading. */
  title: string;
  /** Smaller line under the heading. */
  subtitle?: string;
  /** A coloured tag under the heading, e.g. a status. Plain text picks its colour from the word. */
  tag?: string | GridViewTag;
  /** Headline numbers, shown large at the top of the card. */
  stats?: GridViewValue[];
  /** Smaller labelled details, shown below the numbers in two columns. */
  fields?: GridViewValue[];
}

export interface GridViewAction {
  /** Menu text. */
  label: string;
  /** Value reported by `onAction`. */
  value: string;
  /** Icon name, e.g. "pencil" — see src/core/icons.ts. */
  icon?: string;
  /** "danger" tints the entry red. */
  color?: "danger";
}

export interface GridViewSortOption {
  /** What to sort by: "title", or the `label` of one of the stats / fields (e.g. "Value", "Due Date"). */
  key: string;
  /** Text shown in the menu (default: the key). */
  label?: string;
}

export interface GridViewProps {
  /** The cards. */
  items: GridViewItem[];
  /** How the items are laid out: "grid" (cards, default) or "list" (rows). Also follows changes from outside. */
  view?: GridViewMode;
  /** "default" | "draggable" — "draggable" adds a grip to each card so the order can be changed by drag and drop (default: "default"). Reordering pauses while a search or sort is active. */
  variant?: GridViewVariant;
  /** Shows the grid / list switch in the toolbar (default: true). */
  viewToggle?: boolean;
  /** Shows the search box (default: true). Matches the title, subtitle, tag and every value. */
  searchable?: boolean;
  /** Placeholder of the search box (default: "Search"). */
  searchPlaceholder?: string;
  /** Adds a "Sort by" menu with these options. */
  sortOptions?: GridViewSortOption[];
  /** Per-card menu (the three dots). Choosing an entry calls `onAction`. */
  actions?: GridViewAction[];
  /** Text of the primary button at the end of the toolbar. Leave empty to hide the button. */
  createLabel?: string;
  /** Smallest width of a card in grid view, in px (default: 270). More columns appear as the space allows. */
  minItemWidth?: number;
  /** Shows shimmering placeholder cards while true (default: false). */
  loading?: boolean;
  /** Number of placeholder cards while `loading` (default: 6). */
  skeletonCount?: number;
  /** Text shown when nothing matches (default: "Nothing to show"). */
  emptyMessage?: string;
  /** Called with "grid" or "list" when the view is switched. */
  onViewChange?: (view: GridViewMode) => void;
  /** Called with the items in their new order after a drag and drop (or an arrow-key move) in the "draggable" variant. */
  onReorder?: (items: GridViewItem[]) => void;
  /** Called with the card when it is clicked. */
  onItemClick?: (item: GridViewItem) => void;
  /** Called with `{ action, item }` when a card-menu entry is chosen. */
  onAction?: (detail: { action: GridViewAction; item: GridViewItem }) => void;
  /** Called when the primary button is clicked. */
  onCreate?: () => void;
  /** Called with the text whenever the search box changes. */
  onSearchChange?: (query: string) => void;
  /** Enter transition: "fade" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "zoom" | "zoom-out" | "flip" | "blur" | "bounce" | "rotate" | "drop" | "skew" (default: none). Respects `prefers-reduced-motion`. */
  transition?: TransitionVariant;
  /** Enter transition duration in ms (default: 450). */
  transitionDuration?: number;
  /** Delay before the enter transition starts, in ms (default: 0). */
  transitionDelay?: number;
  /** Extra class name(s) applied to the root element. */
  className?: string;
  /** Per-part class overrides — merged after (and win over) the built-in styling. */
  classNames?: { root?: string; toolbar?: string; card?: string; title?: string };
}

const GOOD = /^(accepted|active|paid|done|complete|completed|success|online|approved|delivered|shipped|open)$/i;
const WARN = /^(pending|invited|draft|processing|review|waiting|trial|scheduled)$/i;
const BAD = /^(overdue|failed|suspended|offline|rejected|error|cancelled|canceled|blocked|expired)$/i;

function tagOf(tag: GridViewItem["tag"]): GridViewTag | null {
  if (!tag) return null;
  const t = typeof tag === "string" ? { label: tag } : tag;
  const color: ColorName = t.color ?? (GOOD.test(t.label) ? "emerald" : WARN.test(t.label) ? "amber" : BAD.test(t.label) ? "rose" : "accent");
  return { label: t.label, color };
}

const find = (list: GridViewValue[] | undefined, key: string) => list?.find((v) => v.label === key)?.value;

function sortValue(item: GridViewItem, key: string): string | number {
  const raw = key === "title" ? item.title : (find(item.stats, key) ?? find(item.fields, key) ?? (item as unknown as Record<string, unknown>)[key] ?? "");
  if (typeof raw === "number") return raw;
  const text = String(raw);
  if (/^\s*[^\d\s-]?\s*-?[\d,]+(\.\d+)?\s*%?\s*$/.test(text)) return Number(text.replace(/[^\d.-]/g, ""));
  if (/\d[/-]\d/.test(text) && !Number.isNaN(Date.parse(text))) return Date.parse(text);
  return text.toLowerCase();
}

const matches = (item: GridViewItem, q: string) => {
  const hay = [item.title, item.subtitle, tagOf(item.tag)?.label, ...(item.stats ?? []).map((s) => s.value), ...(item.fields ?? []).map((f) => f.value)];
  return hay.some((h) => h != null && String(h).toLowerCase().includes(q));
};

function useOutsideClose(open: boolean, close: () => void) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const down = (e: MouseEvent) => {
      if (ref.current && !e.composedPath().includes(ref.current)) close();
    };
    const key = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("mousedown", down);
    window.addEventListener("keydown", key);
    return () => {
      document.removeEventListener("mousedown", down);
      window.removeEventListener("keydown", key);
    };
  }, [open, close]);
  return ref;
}

function Menu({ trigger, label, align = "end", children }: { trigger: (open: boolean) => React.ReactNode; label: string; align?: "start" | "end"; children: (close: () => void) => React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  const ref = useOutsideClose(open, close);
  return (
    <div ref={ref} className="relative" onClick={(e) => e.stopPropagation()}>
      <button type="button" aria-label={label} aria-haspopup="menu" aria-expanded={open} onClick={() => setOpen((v) => !v)} className="contents">
        {trigger(open)}
      </button>
      {open && (
        <div role="menu" className={cx("absolute z-20 mt-1.5 min-w-[11rem] overflow-hidden rounded-xl border border-border bg-surface p-1 shadow-xl", align === "end" ? "right-0" : "left-0")}>
          {children(close)}
        </div>
      )}
    </div>
  );
}

function Bar({ w, h }: { w: string; h: string }) {
  return (
    <span className={cx("relative block shrink-0 overflow-hidden rounded bg-surface-muted", h, w)}>
      <span className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent motion-reduce:animate-none dark:via-white/10" />
    </span>
  );
}

/**
 * A loading placeholder shaped like a card — the same title, tag, numbers and details. Given an `item`, it is drawn over
 * an invisible copy of that item's real card (`overlay`), so every placeholder takes exactly the space of a real card.
 */
function SkeletonCard({ item, list, overlay }: { item?: GridViewItem; list: boolean; overlay: boolean }) {
  const stats = item ? (item.stats ?? []) : [{ label: "", value: "" }, { label: "", value: "" }];
  const fields = item ? (item.fields ?? []) : [{ label: "", value: "" }, { label: "", value: "" }, { label: "", value: "" }];
  const hasTag = item ? !!item.tag : true;
  const head = (
    <div className="min-w-0">
      <div className="flex h-6 items-center"><Bar w="w-40" h="h-4" /></div>
      {item?.subtitle && <div className="mt-0.5 flex h-5 items-center"><Bar w="w-28" h="h-3" /></div>}
      {hasTag && <div className="mt-2"><Bar w="w-16" h="h-5" /></div>}
    </div>
  );
  const stat = (i: number) => (
    <div key={i} className="min-w-0">
      <div className="flex h-4 items-center"><Bar w="w-16" h="h-3" /></div>
      <div className="mt-0.5 flex h-7 items-center"><Bar w="w-20" h="h-5" /></div>
    </div>
  );
  const field = (f: GridViewValue, i: number) => (
    <div key={i} className={cx("min-w-0", String(f.value).length > 14 && "col-span-2")}>
      <div className="flex h-4 items-center"><Bar w="w-14" h="h-3" /></div>
      <div className="mt-0.5 flex h-5 items-center"><Bar w={String(f.value).length > 14 ? "w-36" : "w-20"} h="h-3.5" /></div>
    </div>
  );
  const frame = cx("rounded-2xl border border-border bg-surface shadow-sm", overlay && "absolute inset-0 overflow-hidden");
  if (list) {
    return (
      <div className={cx(frame, "flex flex-wrap items-center gap-x-8 gap-y-3 px-5 py-4")}>
        <div className="w-full min-w-0 sm:w-56 sm:flex-none">{head}</div>
        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-8 gap-y-3">
          {stats.map((_, i) => stat(i))}
          {fields.map((_, i) => (
            <div key={i} className="min-w-0">
              <div className="flex h-4 items-center"><Bar w="w-14" h="h-3" /></div>
              <div className="mt-0.5 flex h-5 items-center"><Bar w="w-20" h="h-3.5" /></div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className={cx(frame, "flex flex-col p-5")}>
      {head}
      {stats.length > 0 && <div className="mt-5 grid grid-cols-2 gap-4">{stats.map((_, i) => stat(i))}</div>}
      {fields.length > 0 && <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3.5 border-t border-border pt-4">{fields.map(field)}</div>}
    </div>
  );
}

export function GridView({
  items,
  view: viewProp,
  variant = "default",
  viewToggle = true,
  searchable = true,
  searchPlaceholder = "Search",
  sortOptions,
  actions,
  createLabel,
  minItemWidth = 270,
  loading = false,
  skeletonCount = 6,
  emptyMessage = "Nothing to show",
  onViewChange,
  onReorder,
  onItemClick,
  onAction,
  onCreate,
  onSearchChange,
  transition,
  transitionDuration,
  transitionDelay,
  className,
  classNames,
}: GridViewProps) {
  const [view, setViewState] = useValue<GridViewMode>(viewProp === "grid" || viewProp === "list" ? viewProp : undefined, "grid");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<{ key: string; direction: "asc" | "desc" } | null>(null);
  const list = view === "list";

  const setView = (next: GridViewMode) => {
    setViewState(next);
    onViewChange?.(next);
  };
  const search = (q: string) => {
    setQuery(q);
    onSearchChange?.(q);
  };

  // Order the cards were dragged into, as ids; items not listed yet (new ones) keep their place at the end.
  const idOf = (item: GridViewItem, index: number) => String(item.id ?? index);
  const [order, setOrder] = useState<string[]>([]);
  const [drag, setDrag] = useState<{ id: string; over: string | null; after: boolean } | null>(null);
  const keyed = items.map((item, i) => ({ item, id: idOf(item, i) }));
  const rank = (id: string) => {
    const at = order.indexOf(id);
    return at === -1 ? Number.MAX_SAFE_INTEGER : at;
  };
  const ordered = order.length === 0 ? keyed : [...keyed].sort((a, b) => rank(a.id) - rank(b.id));
  const moveItem = (id: string, to: string, after: boolean) => {
    if (id === to) return;
    const ids = ordered.map((e) => e.id).filter((x) => x !== id);
    const at = ids.indexOf(to);
    ids.splice(at + (after ? 1 : 0), 0, id);
    setOrder(ids);
    const byId = new Map(keyed.map((e) => [e.id, e.item]));
    onReorder?.(ids.map((x) => byId.get(x)!));
  };

  const q = query.trim().toLowerCase();
  const canDrag = variant === "draggable" && !q && !sort;
  let shown = q ? ordered.map((e) => e.item).filter((i) => matches(i, q)) : ordered.map((e) => e.item);
  if (sort) {
    const dir = sort.direction === "asc" ? 1 : -1;
    shown = [...shown].sort((a, b) => {
      const av = sortValue(a, sort.key);
      const bv = sortValue(b, sort.key);
      return (typeof av === "number" && typeof bv === "number" ? av - bv : String(av).localeCompare(String(bv), undefined, { numeric: true })) * dir;
    });
  }

  const showToolbar = searchable || (sortOptions && sortOptions.length > 0) || viewToggle || !!createLabel;
  const activeSort = sortOptions?.find((o) => o.key === sort?.key);

  const kebab = (item: GridViewItem) =>
    actions && actions.length > 0 ? (
      <Menu
        label="More actions"
        trigger={(open) => (
          <span className={cx("flex h-8 w-8 items-center justify-center rounded-lg text-fg-subtle transition-colors hover:bg-surface-muted hover:text-fg", open && "bg-surface-muted text-fg")}>
            <MoreVertical size={16} />
          </span>
        )}
      >
        {(close) =>
          actions.map((action) => {
            const Ico = action.icon ? getIcon(action.icon) : null;
            return (
              <button
                key={action.value}
                type="button"
                role="menuitem"
                onClick={() => {
                  close();
                  onAction?.({ action, item });
                }}
                className={cx(
                  "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-left text-sm transition-colors",
                  action.color === "danger" ? "text-rose-600 hover:bg-rose-500/10 dark:text-rose-400" : "text-fg hover:bg-surface-muted"
                )}
              >
                {Ico && <Ico size={15} className="shrink-0 opacity-70" />}
                {action.label}
              </button>
            );
          })
        }
      </Menu>
    ) : null;

  const value = (v: GridViewValue, big: boolean) => (
    <div key={v.label} className={cx("min-w-0", big ? "" : "[&:has([data-long])]:col-span-2")}>
      <div className="truncate text-xs font-medium text-fg-subtle">{v.label}</div>
      <div data-long={!big && String(v.value).length > 14 ? "" : undefined} className={cx("mt-0.5 truncate tabular-nums text-fg", big ? "text-xl font-semibold tracking-tight" : "text-sm font-medium")}>{v.value}</div>
    </div>
  );

  const card = (item: GridViewItem, index: number) => {
    const tag = tagOf(item.tag);
    const clickable = !!onItemClick;
    const common = cx(
      "group relative rounded-2xl border border-border bg-surface shadow-sm transition-all duration-200",
      clickable && "cursor-pointer",
      "hover:-translate-y-0.5 hover:border-border-strong hover:shadow-lg motion-reduce:hover:translate-y-0",
      classNames?.card
    );
    const head = (
      <div className="min-w-0">
        <h3 className={cx("truncate text-base font-semibold leading-snug text-fg", classNames?.title)}>{item.title}</h3>
        {item.subtitle && <p className="mt-0.5 truncate text-sm text-fg-subtle">{item.subtitle}</p>}
        {tag && (
          <div className="mt-2">
            <Badge variant="soft" color={tag.color} size="sm" label={tag.label} />
          </div>
        )}
      </div>
    );
    const key = item.id ?? index;
    const id = keyed.find((e) => e.item === item)?.id ?? idOf(item, index);
    const dragging = drag?.id === id;
    const target = canDrag && drag && drag.over === id && drag.id !== id ? (drag.after ? "after" : "before") : null;
    const dnd = canDrag
      ? {
          draggable: true,
          onDragStart: (e: React.DragEvent) => {
            e.dataTransfer.effectAllowed = "move";
            e.dataTransfer.setData("text/plain", id);
            setDrag({ id, over: null, after: false });
          },
          onDragOver: (e: React.DragEvent) => {
            if (!drag) return;
            e.preventDefault();
            const box = e.currentTarget.getBoundingClientRect();
            const after = list ? e.clientY > box.top + box.height / 2 : e.clientX > box.left + box.width / 2;
            if (drag.over !== id || drag.after !== after) setDrag({ ...drag, over: id, after });
          },
          onDrop: (e: React.DragEvent) => {
            e.preventDefault();
            if (drag) moveItem(drag.id, id, drag.after);
            setDrag(null);
          },
          onDragEnd: () => setDrag(null),
        }
      : {};
    const grip = canDrag ? (
      <button
        type="button"
        aria-label={`Reorder ${item.title}`}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => {
          const back = e.key === "ArrowLeft" || e.key === "ArrowUp";
          const fwd = e.key === "ArrowRight" || e.key === "ArrowDown";
          if (!back && !fwd) return;
          e.preventDefault();
          const at = ordered.findIndex((x) => x.id === id);
          const neighbour = ordered[at + (back ? -1 : 1)];
          if (neighbour) moveItem(id, neighbour.id, fwd);
        }}
        className="-ml-1.5 flex h-8 w-6 shrink-0 cursor-grab touch-none items-center justify-center rounded-md text-fg-subtle transition-colors hover:bg-surface-muted hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500/40 active:cursor-grabbing"
      >
        <GripVertical size={16} />
      </button>
    ) : null;
    const dropBar = target ? (
      <span
        aria-hidden
        className={cx(
          "pointer-events-none absolute rounded-full bg-accent-500 ring-4 ring-accent-500/20",
          list ? "inset-x-3 h-1" : "inset-y-3 w-1",
          list ? (target === "before" ? "-top-2.5" : "-bottom-2.5") : target === "before" ? "-left-2.5" : "-right-2.5"
        )}
      />
    ) : null;
    if (list) {
      return (
        <div key={key} {...dnd} onClick={() => onItemClick?.(item)} className={cx(common, "flex flex-wrap items-center gap-x-8 gap-y-3 px-5 py-4", dragging && "scale-[0.98] opacity-40")}>
          {dropBar}
          {grip}
          <div className="w-full min-w-0 sm:w-56 sm:flex-none">{head}</div>
          <div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-8 gap-y-3">
            {item.stats?.map((s) => value(s, true))}
            {item.fields?.map((f) => value(f, false))}
          </div>
          {kebab(item)}
        </div>
      );
    }
    return (
      <div key={key} {...dnd} onClick={() => onItemClick?.(item)} className={cx(common, "flex flex-col p-5", dragging && "scale-[0.97] opacity-40")}>
        {dropBar}
        <span aria-hidden className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-accent-500/40 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
        <div className="flex items-start justify-between gap-3">
          {grip}
          <div className="min-w-0 flex-1">{head}</div>
          {kebab(item)}
        </div>
        {item.stats && item.stats.length > 0 && <div className="mt-5 grid grid-cols-2 gap-4">{item.stats.map((s) => value(s, true))}</div>}
        {item.fields && item.fields.length > 0 && (
          <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3.5 border-t border-border pt-4">{item.fields.map((f) => value(f, false))}</div>
        )}
      </div>
    );
  };

  const btn = "flex h-10 items-center gap-2 rounded-xl border border-border-strong bg-surface px-3.5 text-sm font-medium text-fg-muted shadow-sm transition-colors hover:text-fg";

  return (
    <div className={cx("space-y-4", motionClass(transition), className, classNames?.root)} style={motionStyle(transitionDuration, transitionDelay)}>
      {showToolbar && (
        <div className={cx("flex flex-wrap items-center gap-3", classNames?.toolbar)}>
          {searchable && (
            <label className="relative min-w-[12rem] flex-1 sm:max-w-xs">
              <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-fg-subtle" />
              <input
                type="text"
                value={query}
                onChange={(e) => search(e.target.value)}
                placeholder={searchPlaceholder}
                aria-label={searchPlaceholder}
                className="h-10 w-full rounded-xl border border-border-strong bg-surface pl-9 pr-8 text-sm text-fg shadow-sm outline-none transition-colors placeholder:text-fg-subtle focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20"
              />
              {query && (
                <button type="button" aria-label="Clear search" onClick={() => search("")} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-fg-subtle hover:text-fg">
                  <X size={14} />
                </button>
              )}
            </label>
          )}
          {sortOptions && sortOptions.length > 0 && (
            <Menu
              label="Sort by"
              align="start"
              trigger={() => (
                <span className={btn}>
                  {sort?.direction === "desc" ? <ArrowDown size={16} /> : <ArrowUp size={16} />}
                  {activeSort ? (activeSort.label ?? activeSort.key) : "Sort by"}
                  <ChevronDown size={14} className="opacity-60" />
                </span>
              )}
            >
              {(close) => (
                <>
                  {sortOptions.map((o) => {
                    const on = sort?.key === o.key;
                    return (
                      <button
                        key={o.key}
                        type="button"
                        role="menuitemradio"
                        aria-checked={on}
                        onClick={() => {
                          setSort(on ? { key: o.key, direction: sort!.direction === "asc" ? "desc" : "asc" } : { key: o.key, direction: "asc" });
                          close();
                        }}
                        className={cx("flex w-full items-center justify-between gap-3 rounded-lg px-2.5 py-1.5 text-left text-sm transition-colors hover:bg-surface-muted", on ? "font-semibold text-accent-700 dark:text-accent-400" : "text-fg")}
                      >
                        {o.label ?? o.key}
                        {on && (sort?.direction === "desc" ? <ArrowDown size={14} /> : <ArrowUp size={14} />)}
                      </button>
                    );
                  })}
                  {sort && (
                    <button type="button" onClick={() => { setSort(null); close(); }} className="mt-1 w-full rounded-lg border-t border-border px-2.5 py-1.5 text-left text-xs text-fg-subtle hover:text-fg">
                      Clear sorting
                    </button>
                  )}
                </>
              )}
            </Menu>
          )}
          <div className="ml-auto flex items-center gap-3">
            {viewToggle && (
              <div role="group" aria-label="View" className="inline-flex rounded-xl border border-border bg-surface-muted/60 p-1">
                {([
                  { key: "list", label: "List", icon: <List size={15} /> },
                  { key: "grid", label: "Grid", icon: <LayoutGrid size={15} /> },
                ] as const).map((v) => (
                  <button
                    key={v.key}
                    type="button"
                    aria-pressed={view === v.key}
                    onClick={() => setView(v.key)}
                    className={cx(
                      "flex h-8 items-center gap-1.5 rounded-lg px-3 text-xs font-semibold uppercase tracking-wide transition-all duration-150",
                      view === v.key ? "bg-surface text-fg shadow-sm" : "text-fg-subtle hover:text-fg"
                    )}
                  >
                    {v.icon}
                    <span className="max-sm:sr-only">{v.label}</span>
                  </button>
                ))}
              </div>
            )}
            {createLabel && (
              <button
                type="button"
                onClick={() => onCreate?.()}
                className="flex h-10 items-center gap-2 rounded-xl bg-accent-600 px-4 text-sm font-semibold text-white shadow-sm transition-all hover:bg-accent-700 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
              >
                <Plus size={16} />
                {createLabel}
              </button>
            )}
          </div>
        </div>
      )}

      <div
        className={cx("grid gap-4", list && "grid-cols-1")}
        style={list ? undefined : { gridTemplateColumns: `repeat(auto-fill, minmax(min(100%, ${minItemWidth}px), 1fr))` }}
        aria-busy={loading || undefined}
      >
        {loading
          ? Array.from({ length: Math.max(0, skeletonCount) }, (_, i) => {
              // Copy the layout of a real card when there are items, so the placeholders are exactly as big.
              const template = items.length > 0 ? items[i % items.length] : undefined;
              return template ? (
                <div key={i} className="relative">
                  <div aria-hidden className="invisible pointer-events-none">{card(template, i)}</div>
                  <SkeletonCard item={template} list={list} overlay />
                </div>
              ) : (
                <SkeletonCard key={i} list={list} overlay={false} />
              );
            })
          : shown.map((item, i) => card(item, i))}
      </div>

      {!loading && shown.length === 0 && (
        <div className="rounded-2xl border border-dashed border-border py-14 text-center text-sm text-fg-subtle">{emptyMessage}</div>
      )}
    </div>
  );
}
