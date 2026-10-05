import { isValidElement, useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Select } from "../Select/Select";
import { ArrowDown, ArrowUp, ChevronsUpDown, Info, LayoutGrid, Rows3 } from "lucide-react";
import { cx, type ColorName } from "../../../core/tokens";
import { useValue } from "../../../core/useValue";
import { Avatar } from "../Avatar/Avatar";
import { Badge } from "../Badge/Badge";
import { Image } from "../Image/Image";
import { Rating } from "../Rating/Rating";
import { Button } from "../Buttons/Button";
import { getTooltipPortalRoot, TOOLTIP_PORTAL_Z_CLASS } from "../../../core/tooltipPortal";
import { getIcon } from "../../../core/icons";
import { DotScroll } from "../DotScroll/DotScroll";
import { motionClass, motionStyle, type TransitionVariant } from "../../../core/motion";

/** How a cell's value is drawn when the column has no `render`. */
export type TableCellType = "text" | "user" | "badges" | "progress" | "payment" | "status" | "rating" | "image" | "link" | "avatars" | "currency" | "date";

export interface TableColumn<T> {
  /** Name of the field this column reads from each row, e.g. "email". It is also what sorting and inline editing use. */
  key: string;
  /** Text (or any React node) shown in the header cell. */
  header: ReactNode;
  /** Draws the cell yourself: gets the whole row and returns any React node — an Avatar, a Badge, a Button… React only (a Web Component can't take a function; use `type` there). When set it wins over `type`, and the cell isn't editable inline. */
  render?: (row: T) => ReactNode;
  /** Text alignment of the header and the cells: "left" (default), "center" or "right". */
  align?: "left" | "center" | "right";
  /** How the cell value is drawn, with no code: "text" (default), "user", "badges", "progress", "payment", "status", "rating", "image", "link", "avatars", "currency" or "date". Each type reads a specific shape of value from the row — see TableUserCell, TableBadgeCell, TableProgressCell, TablePaymentCell, TableStatusCell, TableRatingCell, TableImageCell, TableLinkCell, TableAvatarsCell, TableCurrencyCell and TableDateCell. Works in React and in the Web Component. */
  type?: TableCellType;
  /** Shows sort arrows in the header and sorts by this column when clicked: ascending, then descending, then cleared (default: false). Numbers sort as numbers and text sorts naturally; a user sorts by name, a payment by its last digits and a badge list by its first label. */
  sortable?: boolean;
  /** Column width, any CSS length, e.g. "28%" or "12rem" (default: sized by its content). */
  width?: string;
}

/** The value of a `type: "user"` cell: an avatar with a name and, underneath, a handle. */
export interface TableUserCell {
  /** The person's name, shown in bold. Initials are made from it when there is no `avatar`. */
  name: string;
  /** A second line under the name, e.g. "@alicesmith" or an email address. */
  handle?: string;
  /** Image URL of the avatar. When omitted (or it fails to load) the initials are shown instead. */
  avatar?: string;
}

/** The value of a `type: "payment"` cell: a card logo followed by the masked number. */
export interface TablePaymentCell {
  /** "visa" or "mastercard" draw the brand logo; any other text shows its first letters in a small chip. */
  brand: string;
  /** The last digits of the card number. Only the last two are shown, as "Ends in ****-**18". */
  last4: string | number;
  /** Optional extra detail, such as "Primary card". When set an info icon appears whose tooltip shows it. */
  note?: string;
}

/** One tag of a `type: "badges"` cell. The cell value is an array of these, or of plain strings. */
export interface TableBadgeCell {
  /** The tag text. */
  label: string;
  /** Tag colour: one of the built-in colour names ("indigo", "amber", "rose", "emerald", "violet", "cyan", …). When omitted the table cycles through a set so neighbouring tags differ. */
  color?: ColorName;
}

/** The value of a `type: "progress"` cell. Either this object or just the number. */
export interface TableProgressCell {
  /** How far along, from 0 to 100. Values outside the range are clamped. The bar's fill follows the theme accent and the percentage is written beside it. */
  value: number;
}

/** The value of a `type: "status"` cell: a coloured pill with a dot. Either this object or just the text. */
export interface TableStatusCell {
  /** The status text, e.g. "Paid" or "Pending". */
  label: string;
  /** Pill colour (a built-in colour name). When omitted it is chosen from the text: words like active, paid, done or online are green; pending, invited or draft amber; failed, suspended, overdue or offline red; anything else follows the theme accent. */
  color?: ColorName;
}

/** The value of a `type: "rating"` cell: read-only stars. Either this object or just the number. */
export interface TableRatingCell {
  /** The rating, from 0 up to `max`. Half values (4.5) draw half a star. */
  value: number;
  /** How many stars there are (default: 5). */
  max?: number;
}

/** The value of a `type: "image"` cell: a rounded thumbnail with a title and, underneath, a subtitle — good for products and files. */
export interface TableImageCell {
  /** Image URL of the thumbnail. If it can't be loaded a neutral placeholder is shown. */
  src?: string;
  /** The main line, in bold. Also used as the image's alt text. */
  title: string;
  /** A second, smaller line, e.g. a SKU or a category. */
  subtitle?: string;
}

/** The value of a `type: "link"` cell: a text link in the theme accent. Either this object or just the URL (which is then also the text). */
export interface TableLinkCell {
  /** Where it goes. */
  href: string;
  /** The link text (default: the URL). */
  label?: string;
  /** Opens in a new tab (default: false). */
  external?: boolean;
}

/** One person in a `type: "avatars"` cell. The cell value is an array of these — drawn as overlapping avatars, with "+N" after the first five. */
export interface TableAvatarsCell {
  /** The person's name: initials are made from it, and it is the avatar's tooltip. */
  name: string;
  /** Image URL. When omitted the initials are shown. */
  avatar?: string;
}

/** The value of a `type: "currency"` cell: a formatted amount, aligned for easy scanning. Either this object or just the number (in US dollars). */
export interface TableCurrencyCell {
  /** The amount. */
  value: number;
  /** ISO 4217 code such as "USD", "EUR" or "PHP" (default: "USD"). */
  currency?: string;
}

/** The value of a `type: "date"` cell is an ISO date string ("2026-10-02"), a timestamp in milliseconds, or a Date — shown as "Oct 2, 2026". Invalid dates are shown as written. */
export type TableDateCell = string | number | Date;

export interface TableSort {
  key: string;
  direction: "asc" | "desc";
}

export type TableVariant = "default" | "lined" | "card";
export type TableResponsive = "scroll" | "stack";
export type TableView = "table" | "grid";
/** How row actions are shown: "buttons" (one icon button per action) or "menu" (a single three-dot button that opens a dropdown). */
export type TableActionsVariant = "buttons" | "menu";
export type TableRowKey = string | number;

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
  /** Column definitions — each has a `key` (the field read from each row) and a `header`, plus optional `type` (built-in cells: user, payment, badges, progress), `render(row)` (any component, React only), `align`, `sortable` and `width`. See TableColumn below for every option and the value each `type` expects. */
  columns: TableColumn<T>[];
  /** Rows to display, one object per row. */
  data: T[];
  /** Look: "default", "lined" (roomy rows with thin dividers and a plain header — good for people, payments and progress), or "card" (rounded, raised container) (default: "default"). */
  variant?: TableVariant;
  /** Cell padding/text size: "sm", "md" or "lg" (default: "md"). */
  size?: TableSize;
  /** Adds a checkbox column at the start so several rows can be selected, with a select-all checkbox in the header (default: false). */
  selectable?: boolean;
  /** The selected rows, as their keys (see `rowKey`). Also settable from outside; the table keeps its own selection otherwise. */
  selected?: TableRowKey[];
  /** Field that uniquely identifies a row, used for `selected` (default: the row's position). */
  rowKey?: string;
  /** Called with the selected keys and rows whenever the selection changes. */
  onSelectionChange?: (keys: TableRowKey[], rows: T[]) => void;
  /** Called when a sortable column header is clicked, with the new sort (or null when sorting is cleared). */
  onSortChange?: (sort: TableSort | null) => void;
  /** How the table adapts when it gets narrower than about 36rem (measured on the table itself, not the screen, so it also works inside a sidebar or modal): "stack" (default) turns every row into a card with each cell labelled by its column header, automatically; "scroll" keeps the columns and scrolls sideways instead. */
  responsive?: TableResponsive;
  /** Shows the rows as a "table" (default) or as a "grid" of cards — one card per row, built from the same columns. Also settable from outside; the table keeps its own view otherwise. */
  view?: TableView;
  /** Adds a table / grid switch above the rows so people can change the view themselves (default: false). In the grid view the same bar offers a "Sort by" menu for sortable columns. */
  viewToggle?: boolean;
  /** Called with "table" or "grid" when the view is switched. */
  onViewChange?: (view: TableView) => void;
  /** Highlights the row under the pointer (default: true). */
  hoverable?: boolean;
  /** Text shown when there are no rows (default: "No results"). */
  emptyMessage?: string;
  /** Shades every other row for readability (default: false). */
  striped?: boolean;
  /** Draws an outer border and dividers between rows and columns (default: false). */
  bordered?: boolean;
  /** Row actions — adds a right-aligned final column with one small icon button per action. Data-driven, so it works from the Web Component too (use `onAction` / the `action` event). */
  actions?: TableAction[];
  /** "buttons" | "menu" — show each action as an icon button (default), or fold them into one three-dot button that opens a dropdown menu. */
  actionsVariant?: TableActionsVariant;
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

// Padding per size and look. The "lined" look is deliberately roomier — it is made for rows that hold an avatar, tags or a bar.
const PADDING_CLASSES: Record<TableVariant, Record<TableSize, string>> = {
  default: { sm: "px-3 py-2", md: "px-4 py-3", lg: "px-6 py-4" },
  card: { sm: "px-4 py-2.5", md: "px-5 py-3.5", lg: "px-6 py-4" },
  lined: { sm: "px-4 py-3", md: "px-6 py-4", lg: "px-8 py-6" },
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
const SKELETON_WIDTHS = ["w-24", "w-16", "w-20", "w-28", "w-14"];

const ALIGN_JUSTIFY: Record<"left" | "center" | "right", string> = {
  left: "justify-start",
  center: "justify-center",
  right: "justify-end",
};

/** Three-dot button with a dropdown of the row actions. The list is drawn in a fixed layer (like tooltips), so the table's own scroll area can't clip it. */
function RowMenu({ actions, rowLabel, onSelect }: { actions: TableAction[]; rowLabel: string; onSelect: (action: TableAction) => void }) {
  const triggerRef = useRef<HTMLSpanElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [anchor, setAnchor] = useState<{ rect: DOMRect; root: Element | DocumentFragment; up: boolean } | null>(null);
  const close = () => setAnchor(null);

  const toggle = () => {
    const el = triggerRef.current;
    if (!el || anchor) return close();
    const rect = el.getBoundingClientRect();
    const height = actions.length * 36 + 12;
    setAnchor({ rect, root: getTooltipPortalRoot(el), up: rect.bottom + height + 8 > window.innerHeight && rect.top > height + 8 });
  };

  useEffect(() => {
    if (!anchor) return;
    const down = (e: MouseEvent) => {
      const path = e.composedPath();
      if (menuRef.current && path.includes(menuRef.current)) return;
      if (triggerRef.current && path.includes(triggerRef.current)) return;
      close();
    };
    const key = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("mousedown", down);
    window.addEventListener("keydown", key);
    window.addEventListener("scroll", close, { capture: true, passive: true });
    window.addEventListener("resize", close);
    return () => {
      document.removeEventListener("mousedown", down);
      window.removeEventListener("keydown", key);
      window.removeEventListener("scroll", close, { capture: true });
      window.removeEventListener("resize", close);
    };
  }, [anchor]);

  return (
    <>
      <span ref={triggerRef} title="Actions" className="inline-flex">
        <Button variant="soft" size="sm" iconOnly icon="more-vertical" label={`Actions for ${rowLabel}`} aria-haspopup="menu" aria-expanded={!!anchor} onClick={toggle} />
      </span>
      {anchor &&
        createPortal(
          <div
            ref={menuRef}
            role="menu"
            className={cx("pointer-events-auto fixed min-w-[11rem] overflow-hidden rounded-xl border border-border bg-surface p-1 shadow-xl", TOOLTIP_PORTAL_Z_CLASS)}
            style={{
              left: Math.max(8, anchor.rect.right - 176),
              ...(anchor.up ? { bottom: window.innerHeight - anchor.rect.top + 6 } : { top: anchor.rect.bottom + 6 }),
            }}
          >
            {actions.map((action) => {
              const Ico = getIcon(action.icon);
              return (
                <button
                  key={action.value ?? action.label}
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    close();
                    onSelect(action);
                  }}
                  className={cx(
                    "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm transition-colors",
                    action.color === "danger" ? "text-rose-600 hover:bg-rose-500/10 dark:text-rose-400" : "text-fg hover:bg-surface-muted"
                  )}
                >
                  {Ico && <Ico size={15} className="shrink-0 opacity-70" />}
                  {action.label}
                </button>
              );
            })}
          </div>,
          anchor.root
        )}
    </>
  );
}

const firstText = (row: unknown): string => {
  const v = Object.values((row ?? {}) as Record<string, unknown>).find((x) => typeof x === "string" || typeof x === "number");
  return v == null ? "row" : String(v);
};

// A shimmering block of any size — the skeleton cells below are built from these so each one takes the same space as the real cell.
function Shimmer({ className }: { className: string }) {
  return (
    <span className={cx("relative block shrink-0 overflow-hidden bg-surface-muted", className)}>
      <span className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent motion-reduce:animate-none dark:via-white/10" />
    </span>
  );
}

/** Placeholder for a cell while loading, shaped like the real cell of that `type` so the rows keep their height and spacing. */
function SkeletonCell({ type, seed }: { type?: TableCellType; seed: number }) {
  const w = SKELETON_WIDTHS[seed % SKELETON_WIDTHS.length];
  switch (type) {
    case "user":
      return (
        <div className="flex items-center gap-3.5">
          <Shimmer className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Shimmer className="h-3.5 w-20 rounded" />
            <Shimmer className="h-3 w-16 rounded" />
          </div>
        </div>
      );
    case "image":
      return (
        <div className="flex items-center gap-3.5">
          <Shimmer className="h-12 w-12 rounded-lg" />
          <div className="space-y-2">
            <Shimmer className="h-3.5 w-28 rounded" />
            <Shimmer className="h-3 w-16 rounded" />
          </div>
        </div>
      );
    case "payment":
      return (
        <div className="flex items-center gap-3.5">
          <Shimmer className="h-8 w-12 rounded-md" />
          <Shimmer className="h-4 w-[7.75rem] rounded" />
        </div>
      );
    case "badges":
      return (
        <div className="flex items-center gap-2">
          <Shimmer className="h-5 w-10 rounded-md" />
          <Shimmer className="h-5 w-12 rounded-md" />
        </div>
      );
    case "status":
      return <Shimmer className="h-5 w-16 rounded-md" />;
    case "progress":
      return (
        <div className="flex min-w-32 items-center gap-3">
          <Shimmer className="h-2.5 flex-1 rounded-full" />
          <Shimmer className="h-3 w-9 rounded" />
        </div>
      );
    case "avatars":
      return (
        <div className="flex -space-x-2">
          {[0, 1, 2].map((i) => (
            <Shimmer key={i} className="h-8 w-8 rounded-full ring-2 ring-surface" />
          ))}
        </div>
      );
    case "rating":
      return <Shimmer className="h-4 w-24 rounded" />;
    default:
      return (
        <div className="flex min-h-5 items-center">
          <Shimmer className={cx("h-4 rounded", w)} />
        </div>
      );
  }
}

// ---------------------------------------------------------------------------
// Built-in cell types
// ---------------------------------------------------------------------------

const TAG_COLORS: ColorName[] = ["indigo", "amber", "rose", "emerald", "violet", "cyan"];

const isObject = (v: unknown): v is Record<string, unknown> => typeof v === "object" && v !== null && !Array.isArray(v) && !isValidElement(v);

function UserCell({ value }: { value: unknown }) {
  const user: Partial<TableUserCell> = isObject(value) ? (value as Partial<TableUserCell>) : { name: String(value ?? "") };
  const name = user.name ?? "";
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
  return (
    <div className="flex items-center gap-3.5">
      <Avatar src={user.avatar} alt={name} initials={initials || "?"} size="lg" />
      <div className="min-w-0 leading-tight">
        <div className="truncate font-semibold text-fg">{name}</div>
        {user.handle && <div className="mt-0.5 truncate text-fg-subtle">{user.handle}</div>}
      </div>
    </div>
  );
}

function BadgesCell({ value }: { value: unknown }) {
  const items: TableBadgeCell[] = (Array.isArray(value) ? value : value == null ? [] : [value]).map((item, i) =>
    isObject(item) ? { label: String(item.label ?? ""), color: item.color as ColorName | undefined } : { label: String(item), color: TAG_COLORS[i % TAG_COLORS.length] }
  );
  return (
    <div className="flex flex-wrap items-center gap-2">
      {items.map((tag, i) => (
        <Badge key={`${tag.label}-${i}`} variant="soft" color={tag.color ?? TAG_COLORS[i % TAG_COLORS.length]} label={tag.label} />
      ))}
    </div>
  );
}

function ProgressCell({ value }: { value: unknown }) {
  const raw = isObject(value) ? Number(value.value) : Number(value);
  const pct = Number.isFinite(raw) ? Math.max(0, Math.min(100, raw)) : 0;
  return (
    <div className="flex min-w-32 items-center gap-3">
      <div role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} className="h-2.5 flex-1 overflow-hidden rounded-full bg-surface-muted">
        <div className="h-full rounded-full bg-accent-600 transition-[width] duration-500" style={{ width: `${pct}%` }} />
      </div>
      <span className="w-9 text-right text-xs font-medium tabular-nums text-fg-muted">{Math.round(pct)}%</span>
    </div>
  );
}

// Brand marks keep their official colours — the one place a table hardcodes colour.
function CardLogo({ brand }: { brand: string }) {
  const b = brand.toLowerCase();
  return (
    <span className="flex h-8 w-12 items-center justify-center rounded-md border border-border bg-surface shadow-sm" aria-label={brand}>
      {b === "mastercard" ? (
        <svg width="26" height="16" viewBox="0 0 26 16" aria-hidden>
          <circle cx="9" cy="8" r="7" fill="#eb001b" />
          <circle cx="17" cy="8" r="7" fill="#f79e1b" fillOpacity="0.95" />
        </svg>
      ) : b === "visa" ? (
        <span className="text-[13px] font-extrabold italic tracking-tight text-[#1a1f71] dark:text-[#8aa0ff]">VISA</span>
      ) : (
        <span className="text-[10px] font-semibold uppercase text-fg-muted">{brand.slice(0, 4)}</span>
      )}
    </span>
  );
}

function PaymentCell({ value }: { value: unknown }) {
  const pay: Partial<TablePaymentCell> = isObject(value) ? (value as Partial<TablePaymentCell>) : { last4: String(value ?? "") };
  return (
    <div className="flex items-center gap-3.5">
      <CardLogo brand={pay.brand ?? "card"} />
      <span className="whitespace-nowrap font-medium text-fg">Ends in ****-**{String(pay.last4 ?? "").slice(-2)}</span>
      {pay.note && (
        <span title={pay.note} className="inline-flex text-fg-subtle" aria-label={pay.note}>
          <Info size={16} />
        </span>
      )}
    </div>
  );
}

const STATUS_GOOD = /^(active|paid|done|complete|completed|success|online|approved|delivered|shipped|open)$/i;
const STATUS_WARN = /^(pending|invited|draft|processing|review|waiting|trial|scheduled)$/i;
const STATUS_BAD = /^(failed|suspended|overdue|offline|rejected|error|cancelled|canceled|blocked|expired)$/i;

function StatusCell({ value }: { value: unknown }) {
  const status: Partial<TableStatusCell> = isObject(value) ? (value as Partial<TableStatusCell>) : { label: String(value ?? "") };
  const label = status.label ?? "";
  const color: ColorName = status.color ?? (STATUS_GOOD.test(label) ? "emerald" : STATUS_WARN.test(label) ? "amber" : STATUS_BAD.test(label) ? "rose" : "accent");
  return <Badge variant="soft" color={color} label={label} icon={undefined} />;
}

function RatingCell({ value }: { value: unknown }) {
  const rating = isObject(value) ? { value: Number(value.value), max: Number(value.max) || 5 } : { value: Number(value), max: 5 };
  return <Rating value={Number.isFinite(rating.value) ? rating.value : 0} max={rating.max} allowHalf readOnly size="sm" />;
}

function ImageCell({ value }: { value: unknown }) {
  const img: Partial<TableImageCell> = isObject(value) ? (value as Partial<TableImageCell>) : { title: String(value ?? "") };
  return (
    <div className="flex items-center gap-3.5">
      <div className="w-12 shrink-0">
        <Image src={img.src} alt={img.title ?? ""} ratio="1/1" rounded="lg" />
      </div>
      <div className="min-w-0 leading-tight">
        <div className="truncate font-semibold text-fg">{img.title}</div>
        {img.subtitle && <div className="mt-0.5 truncate text-fg-subtle">{img.subtitle}</div>}
      </div>
    </div>
  );
}

function LinkCell({ value }: { value: unknown }) {
  const link: Partial<TableLinkCell> = isObject(value) ? (value as Partial<TableLinkCell>) : { href: String(value ?? "") };
  return (
    <a
      href={link.href}
      target={link.external ? "_blank" : undefined}
      rel={link.external ? "noopener noreferrer" : undefined}
      className="whitespace-nowrap font-medium text-accent-700 underline-offset-2 hover:underline dark:text-accent-400"
    >
      {link.label ?? link.href}
    </a>
  );
}

function AvatarsCell({ value }: { value: unknown }) {
  const people: TableAvatarsCell[] = (Array.isArray(value) ? value : []).map((p) => (isObject(p) ? (p as unknown as TableAvatarsCell) : { name: String(p) }));
  const shown = people.slice(0, 5);
  const extra = people.length - shown.length;
  return (
    <div className="flex items-center">
      <div className="flex -space-x-2">
        {shown.map((p, i) => (
          <span key={`${p.name}-${i}`} title={p.name} className="inline-flex rounded-full ring-2 ring-surface">
            <Avatar src={p.avatar} alt={p.name} initials={p.name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]?.toUpperCase()).join("")} size="sm" />
          </span>
        ))}
        {extra > 0 && (
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-surface-muted text-xs font-medium text-fg-muted ring-2 ring-surface">+{extra}</span>
        )}
      </div>
    </div>
  );
}

function CurrencyCell({ value }: { value: unknown }) {
  const money = isObject(value) ? { value: Number(value.value), currency: String(value.currency ?? "USD") } : { value: Number(value), currency: "USD" };
  let text = String(value ?? "");
  try {
    if (Number.isFinite(money.value)) text = new Intl.NumberFormat("en-US", { style: "currency", currency: money.currency }).format(money.value);
  } catch {
    /* unknown currency code: show the number as written */
  }
  return <span className="font-medium tabular-nums text-fg">{text}</span>;
}

function DateCell({ value }: { value: unknown }) {
  const date = value instanceof Date ? value : new Date(value as string | number);
  const text = Number.isNaN(date.getTime()) ? String(value ?? "") : date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  return <span className="whitespace-nowrap text-fg-muted">{text}</span>;
}

/** What to compare when sorting a column — the value itself, or the readable part of a structured one. */
function sortValue(value: unknown, type: TableCellType | undefined): string | number {
  if (type === "date") {
    const t = (value instanceof Date ? value : new Date(value as string | number)).getTime();
    return Number.isNaN(t) ? 0 : t;
  }
  if (typeof value === "number") return value;
  if (isObject(value)) {
    const v =
      type === "user"
        ? value.name
        : type === "payment"
          ? value.last4
          : type === "image"
            ? value.title
            : type === "link"
              ? (value.label ?? value.href)
              : (value.value ?? value.label ?? value.name);
    return typeof v === "number" ? v : String(v ?? "");
  }
  if (Array.isArray(value)) return type === "avatars" ? value.length : String(isObject(value[0]) ? (value[0].label ?? value[0].name) : (value[0] ?? ""));
  return String(value ?? "");
}

function CellContent({ type, value }: { type: TableCellType | undefined; value: unknown }) {
  if (isValidElement(value)) return <>{value}</>; // a ready-made React node
  if (type === "user") return <UserCell value={value} />;
  if (type === "badges") return <BadgesCell value={value} />;
  if (type === "progress") return <ProgressCell value={value} />;
  if (type === "payment") return <PaymentCell value={value} />;
  if (type === "status") return <StatusCell value={value} />;
  if (type === "rating") return <RatingCell value={value} />;
  if (type === "image") return <ImageCell value={value} />;
  if (type === "link") return <LinkCell value={value} />;
  if (type === "avatars") return <AvatarsCell value={value} />;
  if (type === "currency") return <CurrencyCell value={value} />;
  if (type === "date") return <DateCell value={value} />;
  return <>{String(value ?? "")}</>;
}

// The row/header checkbox: a native input underneath (keyboard + screen readers) with a themed box on top.
function SelectBox({ checked, indeterminate = false, label, onChange }: { checked: boolean; indeterminate?: boolean; label: string; onChange: (next: boolean) => void }) {
  const on = checked || indeterminate;
  return (
    <label className="relative inline-flex h-[18px] w-[18px] cursor-pointer items-center justify-center">
      <input
        type="checkbox"
        aria-label={label}
        checked={checked}
        ref={(el) => {
          if (el) el.indeterminate = indeterminate;
        }}
        onChange={(e) => onChange(e.target.checked)}
        className="peer sr-only"
      />
      <span
        className={cx(
          "absolute inset-0 rounded-md border shadow-sm transition-all duration-150 peer-focus-visible:ring-2 peer-focus-visible:ring-accent-500/40",
          on ? "border-accent-600 bg-accent-600" : "border-border-strong bg-surface hover:border-accent-500"
        )}
      />
      {checked && !indeterminate && (
        <svg viewBox="0 0 12 12" className="relative h-3 w-3 text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="m2.5 6.2 2.4 2.4 4.6-5" />
        </svg>
      )}
      {indeterminate && <span className="relative h-0.5 w-2 rounded-full bg-white" />}
    </label>
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

// "stack": below ~36rem of the table's own width every row becomes a card and each cell shows its column name. Literal
// class strings (Tailwind only sees complete literals); they are added only when `responsive="stack"`.
const STACK = {
  root: "@container",
  table: "@max-xl:block",
  thead: "@max-xl:sr-only",
  tbody: "@max-xl:block @max-xl:space-y-3 @max-xl:p-3",
  tr: "@max-xl:block @max-xl:rounded-xl @max-xl:border @max-xl:border-border @max-xl:p-2 @max-xl:shadow-sm @max-xl:last:border-b",
  td: "@max-xl:flex @max-xl:items-center @max-xl:justify-between @max-xl:gap-4 @max-xl:px-3 @max-xl:py-2 @max-xl:text-right @max-xl:before:max-w-[40%] @max-xl:before:text-left @max-xl:before:text-xs @max-xl:before:font-semibold @max-xl:before:text-fg-subtle @max-xl:before:content-[attr(data-label)]",
};

export function Table<T>({
  columns,
  data,
  variant = "default",
  size = "md",
  selectable = false,
  selected: selectedProp,
  rowKey,
  onSelectionChange,
  onSortChange,
  responsive = "stack",
  view: viewProp,
  viewToggle = false,
  onViewChange,
  hoverable = true,
  emptyMessage = "No results",
  striped = false,
  bordered = false,
  actions,
  actionsHeader = "Actions",
  actionsVariant = "buttons",
  onAction,
  builtInActions = true,
  onDataChange,
  loading = false,
  skeletonRows = 5,
  className,
  classNames,
  transition,
  transitionDuration,
  transitionDelay,
}: TableProps<T>) {
  const look: TableVariant = variant === "lined" || variant === "card" ? variant : "default";
  const paddingClass = PADDING_CLASSES[look][size] ?? PADDING_CLASSES[look].md;
  const textClass = TEXT_CLASSES[size];
  const hasActions = !!actions && actions.length > 0;
  const lined = look === "lined";
  const stack = responsive === "stack";
  const labelOf = (column: TableColumn<T>) => (typeof column.header === "string" ? column.header : column.key);

  // Working copy of the rows (derive-state-from-props: re-seed when `data` changes).
  const [store, setStore] = useState<Store<T>>(() => seed(data));
  const [editing, setEditing] = useState<{ id: number; draft: Record<string, string> } | null>(null);
  const [sort, setSort] = useState<TableSort | null>(null);
  const [view, setViewState] = useValue<TableView>(viewProp === "grid" || viewProp === "table" ? viewProp : undefined, "table");
  const grid = view === "grid";
  const [selection, setSelection] = useValue<TableRowKey[]>(selectedProp, []);
  if (store.source !== data && !sameContent(store.source, data)) {
    setStore(seed(data));
    setEditing(null);
  }
  const baseRows: Entry<T>[] = hasActions && builtInActions ? store.entries : data.map((row, id) => ({ id, row }));

  const rows = (() => {
    if (!sort) return baseRows;
    const column = columns.find((c) => c.key === sort.key);
    const dir = sort.direction === "asc" ? 1 : -1;
    return [...baseRows].sort((a, b) => {
      const av = sortValue((a.row as Record<string, unknown>)[sort.key], column?.type);
      const bv = sortValue((b.row as Record<string, unknown>)[sort.key], column?.type);
      if (typeof av === "number" && typeof bv === "number") return (av - bv) * dir;
      return String(av).localeCompare(String(bv), undefined, { numeric: true, sensitivity: "base" }) * dir;
    });
  })();

  // Rows to copy the layout from while loading (none on a first load — the skeleton then sizes itself).
  const template = rows.length > 0 ? rows : null;
  const keyOf = (entry: Entry<T>): TableRowKey => (rowKey ? ((entry.row as Record<string, unknown>)[rowKey] as TableRowKey) : entry.id);
  const selectedSet = new Set(selection);
  const allKeys = rows.map(keyOf);
  const selectedCount = allKeys.filter((k) => selectedSet.has(k)).length;
  const allSelected = rows.length > 0 && selectedCount === rows.length;

  const changeSelection = (next: TableRowKey[]) => {
    setSelection(next);
    const keep = new Set(next);
    onSelectionChange?.(next, baseRows.filter((e) => keep.has(keyOf(e))).map((e) => e.row));
  };
  const toggleRow = (entry: Entry<T>, on: boolean) => {
    const key = keyOf(entry);
    changeSelection(on ? [...selection.filter((k) => k !== key), key] : selection.filter((k) => k !== key));
  };
  const toggleAll = (on: boolean) => changeSelection(on ? [...new Set([...selection, ...allKeys])] : selection.filter((k) => !allKeys.includes(k)));

  const cycleSort = (key: string) => {
    const next: TableSort | null = !sort || sort.key !== key ? { key, direction: "asc" } : sort.direction === "asc" ? { key, direction: "desc" } : null;
    setSort(next);
    onSortChange?.(next);
  };

  const commit = (entries: Entry<T>[], fresh: number | null, nextId = store.nextId) => {
    setStore({ ...store, entries, fresh, nextId });
    onDataChange?.(entries.map((e) => e.row));
  };

  const runAction = (action: TableAction, entry: Entry<T>) => {
    if (builtInActions && action.value === "delete") {
      commit(store.entries.filter((e) => e.id !== entry.id), null);
      if (editing?.id === entry.id) setEditing(null);
      if (selectedSet.has(keyOf(entry))) changeSelection(selection.filter((k) => k !== keyOf(entry)));
    } else if (builtInActions && action.value === "duplicate") {
      const index = store.entries.findIndex((e) => e.id === entry.id);
      const copy = { id: store.nextId, row: { ...entry.row } };
      commit([...store.entries.slice(0, index + 1), copy, ...store.entries.slice(index + 1)], copy.id, store.nextId + 1);
    } else if (builtInActions && action.value === "edit") {
      const draft: Record<string, string> = {};
      for (const column of columns) {
        const value = (entry.row as Record<string, unknown>)[column.key];
        if (!column.render && (!column.type || column.type === "text")) draft[column.key] = String(value ?? "");
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
      if (column.render || (column.type && column.type !== "text")) continue;
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

  const thBase = cx(
    lined ? "bg-surface-muted/40 text-sm font-semibold text-fg" : "bg-surface-muted/70 text-xs font-semibold uppercase tracking-wide text-fg-subtle",
    paddingClass,
    classNames?.header
  );
  const rowBorder = lined || look === "card" ? "border-b border-border last:border-b-0" : "border-b border-border/60 last:border-b-0";
  const colCount = columns.length + (selectable ? 1 : 0) + (hasActions ? 1 : 0);

  const setView = (next: TableView) => {
    setViewState(next);
    onViewChange?.(next);
  };

  // The content of one cell — shared by the table rows and the grid cards.
  const renderCell = (column: TableColumn<T>, entry: Entry<T>, colIndex: number): ReactNode => {
    const { id, row } = entry;
    const isEditing = editing?.id === id;
    const value = (row as Record<string, unknown>)[column.key];
    const editable = !column.render && (!column.type || column.type === "text");
    if (isEditing && editable && editing) {
      return (
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
      );
    }
    return column.render ? column.render(row) : <CellContent type={column.type} value={value} />;
  };

  // The row-action buttons (or Save / Cancel while a row is being edited) — shared by the table and the grid.
  const renderActions = (entry: Entry<T>): ReactNode => (
    <div className="flex justify-end gap-1">
      {editing?.id === entry.id ? (
        <>
          <span title="Save" className="inline-flex">
            <Button variant="soft" size="sm" iconOnly icon="check" label="Save" onClick={saveEdit} />
          </span>
          <span title="Cancel" className="inline-flex">
            <Button variant="soft" size="sm" iconOnly icon="x" label="Cancel" onClick={() => setEditing(null)} />
          </span>
        </>
      ) : actionsVariant === "menu" ? (
        <RowMenu actions={actions ?? []} rowLabel={firstText(entry.row)} onSelect={(action) => runAction(action, entry)} />
      ) : (
        actions?.map((action) => (
          <span key={action.value ?? action.label} title={action.label} className="inline-flex">
            <Button
              variant="soft"
              size="sm"
              iconOnly
              icon={action.icon}
              label={action.label}
              className={cx(
                action.color === "danger" &&
                  "bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 dark:bg-red-950/40 dark:text-red-400 dark:hover:bg-red-950/70 dark:hover:text-red-300"
              )}
              onClick={() => runAction(action, entry)}
            />
          </span>
        ))
      )}
    </div>
  );

  const sortable = columns.filter((c) => c.sortable);
  const showBar = viewToggle || (grid && sortable.length > 0);
  const [titleColumn, ...detailColumns] = columns;

  return (
    <div
      className={cx(
        stack && STACK.root,
        look === "card" && "overflow-hidden rounded-xl border border-border bg-surface shadow-sm",
        look === "lined" && "bg-surface",
        motionClass(transition),
        className,
        classNames?.root
      )}
      style={motionStyle(transitionDuration, transitionDelay)}
    >
      <DotScroll axis="x">
      {selectable && selectedCount > 0 && (
        <div className="flex items-center justify-between gap-3 border-b border-border bg-accent-500/[0.07] px-4 py-2 text-sm">
          <span className="font-medium text-fg">{selectedCount} selected</span>
          <button
            type="button"
            onClick={() => changeSelection(selection.filter((k) => !allKeys.includes(k)))}
            className="text-xs font-medium text-accent-700 underline-offset-2 hover:underline dark:text-accent-400"
          >
            Clear selection
          </button>
        </div>
      )}
      {selectable && stack && !grid && rows.length > 0 && (
        <label className="hidden items-center gap-3 border-b border-border px-4 py-2.5 text-sm font-medium text-fg-muted @max-xl:flex">
          <SelectBox checked={allSelected} indeterminate={selectedCount > 0 && !allSelected} label="Select all rows" onChange={toggleAll} />
          Select all
        </label>
      )}
      {showBar && (
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-2.5">
          <div className="flex items-center gap-2">
            {grid && sortable.length > 0 && (
              <>
                <div className="w-48">
                  <Select
                    size="sm"
                    aria-label="Sort by"
                    placeholder="Sort by"
                    value={sort?.key ?? ""}
                    options={[{ label: "No sorting", value: "none" }, ...sortable.map((c) => ({ label: `Sort by ${labelOf(c)}`, value: c.key }))]}
                    onChange={(e) => {
                      const key = e.target.value;
                      const next: TableSort | null = key && key !== "none" ? { key, direction: sort?.direction ?? "asc" } : null;
                      setSort(next);
                      onSortChange?.(next);
                    }}
                  />
                </div>
                {sort && (
                  <button
                    type="button"
                    aria-label={sort.direction === "asc" ? "Ascending — switch to descending" : "Descending — switch to ascending"}
                    onClick={() => {
                      const next: TableSort = { key: sort.key, direction: sort.direction === "asc" ? "desc" : "asc" };
                      setSort(next);
                      onSortChange?.(next);
                    }}
                    className="flex h-8 w-8 items-center justify-center rounded-md border border-border-strong bg-surface text-fg-muted transition-colors hover:text-fg"
                  >
                    {sort.direction === "asc" ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                  </button>
                )}
              </>
            )}
          </div>
          {viewToggle && (
            <div role="group" aria-label="View" className="inline-flex rounded-lg border border-border bg-surface-muted/60 p-0.5">
              {([
                { key: "table", label: "Table view", icon: <Rows3 size={16} /> },
                { key: "grid", label: "Grid view", icon: <LayoutGrid size={16} /> },
              ] as const).map((v) => (
                <button
                  key={v.key}
                  type="button"
                  aria-pressed={view === v.key}
                  aria-label={v.label}
                  title={v.label}
                  onClick={() => setView(v.key)}
                  className={cx(
                    "flex h-8 w-8 items-center justify-center rounded-md transition-all duration-150",
                    view === v.key ? "bg-surface text-accent-700 shadow-sm dark:text-accent-400" : "text-fg-subtle hover:text-fg"
                  )}
                >
                  {v.icon}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
      {grid ? (
        loading ? (
          <div className="grid gap-4 p-4 [grid-template-columns:repeat(auto-fill,minmax(17rem,1fr))]" aria-busy>
            {Array.from({ length: Math.max(0, skeletonRows) }, (_, i) => (
              <div key={i} className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-4 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">{titleColumn && <SkeletonCell type={titleColumn.render ? undefined : titleColumn.type} seed={i} />}</div>
                  {selectable && <Shimmer className="h-[18px] w-[18px] rounded-md" />}
                </div>
                {detailColumns.length > 0 && (
                  <dl className="space-y-2.5 border-t border-border pt-3">
                    {detailColumns.map((column, j) => (
                      <div key={column.key} className="flex items-center justify-between gap-4 text-sm">
                        <dt className="shrink-0 text-xs font-semibold text-fg-subtle">{labelOf(column)}</dt>
                        <dd className="flex min-w-0 justify-end text-right text-fg">
                          <SkeletonCell type={column.render ? undefined : column.type} seed={i + j * 2 + 1} />
                        </dd>
                      </div>
                    ))}
                  </dl>
                )}
                {hasActions && (
                  <div className="border-t border-border pt-3">
                    <div className="flex justify-end gap-1">
                      {(actionsVariant === "menu" ? [{ label: "menu" }] : (actions ?? [])).map((a) => (
                        <Shimmer key={(a as TableAction).value ?? a.label} className="h-8 w-8 rounded-md" />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : rows.length === 0 ? (
          <div className="py-12 text-center text-sm text-fg-subtle">{emptyMessage}</div>
        ) : (
          <div className="grid gap-4 p-4 [grid-template-columns:repeat(auto-fill,minmax(17rem,1fr))]">
            {rows.map((entry) => {
              const isSelected = selectable && selectedSet.has(keyOf(entry));
              return (
                <div
                  key={entry.id}
                  aria-selected={selectable ? isSelected : undefined}
                  className={cx(
                    "flex flex-col gap-3 rounded-xl border bg-surface p-4 shadow-sm transition-all duration-150",
                    isSelected ? "border-accent-500 bg-accent-500/[0.05] ring-1 ring-accent-500/40" : "border-border hover:shadow-md",
                    entry.id === store.fresh && motionClass("fade"),
                    classNames?.row
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1 text-fg">{titleColumn && renderCell(titleColumn, entry, 0)}</div>
                    {selectable && <SelectBox checked={isSelected} label="Select row" onChange={(on) => toggleRow(entry, on)} />}
                  </div>
                  {detailColumns.length > 0 && (
                    <dl className="space-y-2.5 border-t border-border pt-3">
                      {detailColumns.map((column, i) => (
                        <div key={column.key} className="flex items-center justify-between gap-4 text-sm">
                          <dt className="shrink-0 text-xs font-semibold text-fg-subtle">{labelOf(column)}</dt>
                          <dd className="flex min-w-0 justify-end text-right text-fg">{renderCell(column, entry, i + 1)}</dd>
                        </div>
                      ))}
                    </dl>
                  )}
                  {hasActions && <div className="border-t border-border pt-3">{renderActions(entry)}</div>}
                </div>
              );
            })}
          </div>
        )
      ) : (
      <table className={cx("w-full border-collapse", stack && STACK.table, bordered && (stack ? "border border-border @max-xl:border-0" : "border border-border"))} aria-busy={loading || undefined}>
        <thead className={cx(stack && STACK.thead)}>
          <tr className={cx("border-b border-border", bordered && (stack ? "divide-x divide-border @max-xl:divide-x-0" : "divide-x divide-border"))}>
            {selectable && (
              <th className={cx(thBase, "w-12 !pr-0")} style={{ width: 48 }}>
                <SelectBox checked={allSelected} indeterminate={selectedCount > 0 && !allSelected} label="Select all rows" onChange={toggleAll} />
              </th>
            )}
            {columns.map((column) => {
              const active = sort?.key === column.key;
              const align = column.align ?? "left";
              return (
                <th
                  key={column.key}
                  aria-sort={column.sortable ? (active ? (sort!.direction === "asc" ? "ascending" : "descending") : "none") : undefined}
                  className={cx(thBase, ALIGN_CLASSES[align])}
                  style={column.width ? { width: column.width } : undefined}
                >
                  {column.sortable ? (
                    <button
                      type="button"
                      onClick={() => cycleSort(column.key)}
                      className={cx("group/sort inline-flex items-center gap-2 rounded-md transition-colors hover:text-fg", ALIGN_JUSTIFY[align], active && "text-fg")}
                    >
                      {column.header}
                      {active ? (
                        sort!.direction === "asc" ? (
                          <ArrowUp size={14} className="text-accent-600 dark:text-accent-400" />
                        ) : (
                          <ArrowDown size={14} className="text-accent-600 dark:text-accent-400" />
                        )
                      ) : (
                        <ChevronsUpDown size={14} className="text-fg-subtle/70 transition-colors group-hover/sort:text-fg-muted" />
                      )}
                    </button>
                  ) : (
                    column.header
                  )}
                </th>
              );
            })}
            {hasActions && <th className={cx(thBase, "text-right")}>{actionsHeader}</th>}
          </tr>
        </thead>
        <tbody className={cx(stack && STACK.tbody, striped && "[&>tr:nth-child(even)]:bg-surface-muted/50")}>
          {loading ? (
            Array.from({ length: Math.max(0, skeletonRows) }, (_, rowIndex) => (
              <tr key={rowIndex} className={cx(rowBorder, stack && STACK.tr, bordered && (stack ? "divide-x divide-border @max-xl:divide-x-0" : "divide-x divide-border"), classNames?.row)}>
                {selectable && (
                  <td data-label="" className={cx(paddingClass, "w-12 !pr-0", stack && STACK.td, stack && "@max-xl:w-auto @max-xl:justify-start @max-xl:!py-1 @max-xl:!pr-3 @max-xl:before:hidden")}>
                    <Shimmer className="h-[18px] w-[18px] rounded-md" />
                  </td>
                )}
                {columns.map((column, colIndex) => (
                  <td key={column.key} data-label={labelOf(column)} className={cx(paddingClass, textClass, "text-fg", stack && STACK.td, classNames?.cell)}>
                    {/* With rows already present the real cell is laid out too (hidden) so the columns keep their exact width. */}
                    <div className="relative">
                      {template && (
                        <div aria-hidden className={cx("invisible flex", ALIGN_JUSTIFY[column.align ?? "left"])}>
                          {renderCell(column, template[rowIndex % template.length], colIndex)}
                        </div>
                      )}
                      <div className={cx("flex items-center", template && "absolute inset-0", ALIGN_JUSTIFY[column.align ?? "left"])}>
                        <SkeletonCell type={column.render ? undefined : column.type} seed={rowIndex + colIndex * 2} />
                      </div>
                    </div>
                  </td>
                ))}
                {hasActions && (
                  <td data-label={actionsHeader} className={cx(paddingClass, textClass, "text-right", stack && STACK.td, classNames?.cell)}>
                    <div className="relative">
                      {template && (
                        <div aria-hidden className="invisible">
                          {renderActions(template[rowIndex % template.length])}
                        </div>
                      )}
                      <div className={cx("flex items-center justify-end gap-1", template && "absolute inset-0")}>
                        {(actionsVariant === "menu" ? [{ label: "menu" }] : (actions ?? [])).map((a) => (
                          <Shimmer key={(a as TableAction).value ?? a.label} className="h-8 w-8 rounded-md" />
                        ))}
                      </div>
                    </div>
                  </td>
                )}
              </tr>
            ))
          ) : rows.length === 0 ? (
            <tr>
              <td colSpan={colCount} className={cx(paddingClass, "py-12 text-center text-sm text-fg-subtle")}>
                {emptyMessage}
              </td>
            </tr>
          ) : (
            rows.map((entry) => {
              const { id } = entry;
              const isSelected = selectable && selectedSet.has(keyOf(entry));
              return (
                <tr
                  key={id}
                  aria-selected={selectable ? isSelected : undefined}
                  className={cx(
                    rowBorder,
                    stack && STACK.tr,
                    "transition-colors duration-150",
                    bordered && (stack ? "divide-x divide-border @max-xl:divide-x-0" : "divide-x divide-border"),
                    stack && !isSelected && "@max-xl:bg-surface",
                    hoverable && !isSelected && "hover:bg-surface-muted/60",
                    isSelected && "bg-accent-500/[0.07]",
                    isSelected && stack && "@max-xl:border-accent-500/40 @max-xl:bg-accent-500/[0.07]",
                    id === store.fresh && motionClass("fade"),
                    classNames?.row
                  )}
                >
                  {selectable && (
                    <td data-label="" className={cx(paddingClass, "w-12 !pr-0", stack && STACK.td, stack && "@max-xl:w-auto @max-xl:justify-start @max-xl:!py-1 @max-xl:!pr-3 @max-xl:before:hidden")}>
                      <SelectBox checked={isSelected} label="Select row" onChange={(on) => toggleRow(entry, on)} />
                    </td>
                  )}
                  {columns.map((column, colIndex) => (
                    <td key={column.key} data-label={labelOf(column)} className={cx(paddingClass, textClass, ALIGN_CLASSES[column.align ?? "left"], "text-fg", stack && STACK.td, classNames?.cell)}>
                      {renderCell(column, entry, colIndex)}
                    </td>
                  ))}
                  {hasActions && (
                    <td data-label={actionsHeader} className={cx(paddingClass, textClass, "text-right", stack && STACK.td, classNames?.cell)}>
                      {renderActions(entry)}
                    </td>
                  )}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
      )}
      </DotScroll>
    </div>
  );
}
