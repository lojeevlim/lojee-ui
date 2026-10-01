import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { cx, type ColorName } from "../../../core/tokens";
import { Icon } from "../Icons/Icon";
import { Button } from "../Buttons/Button";
import { motionClass, motionStyle, type TransitionVariant, type HoverEffect } from "../../../core/motion";

export interface CalendarEvent {
  /** ISO date string "YYYY-MM-DD". */
  date: string;
  label?: string;
  color?: ColorName;
}

export type CalendarVariant = "inline" | "modal";

/** "2026-03-03" → "Tue, Mar 3, 2026". */
function formatDate(iso: string | undefined): string {
  if (!iso) return "No date selected";
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric", year: "numeric" });
}

export type CalendarSelectionMode = "single" | "range";

export interface CalendarRange {
  /** "YYYY-MM-DD". */
  start?: string;
  /** "YYYY-MM-DD" — undefined while only the first date of the range has been picked. */
  end?: string;
}

/** {start, end} → "Mar 3 – Mar 9, 2026" (or just the start while the range is incomplete). */
function formatRange(range: CalendarRange): string {
  if (!range.start) return "No range selected";
  if (!range.end) return `${formatDate(range.start)} – …`;
  const fmt = (iso: string, withYear: boolean) => {
    const [y, m, d] = iso.split("-").map(Number);
    return new Date(y, m - 1, d).toLocaleDateString(undefined, { month: "short", day: "numeric", ...(withYear && { year: "numeric" }) });
  };
  return `${fmt(range.start, false)} – ${fmt(range.end, true)}`;
}

export interface CalendarProps {
  /** Month being displayed, as "YYYY-MM-DD" or "YYYY-MM" (only year+month matter). Uncontrolled
   * (internal state, defaulting to today's month) unless both `month` and `onMonthChange` are given. */
  month?: string;
  /** Called with the first day of the newly shown month as "YYYY-MM-DD" when the user navigates to another month. */
  onMonthChange?: (month: string) => void;
  /** Selected date "YYYY-MM-DD". Uncontrolled (internal state) unless both `selected` and `onSelect`
   * are given. */
  selected?: string;
  /** Called with the clicked date as "YYYY-MM-DD" when a day is picked (or with "" when the selection is cleared), in single-selection mode. */
  onSelect?: (date: string) => void;
  /** Dates with a small colored dot marker under the day number. */
  events?: CalendarEvent[];
  /** Accent color for the selected-day fill and today's outline (default "accent"). */
  color?: ColorName;
  /** Initial selected date "YYYY-MM-DD" when `selected` isn't given. */
  defaultSelected?: string;
  /** "single" (default) picks one date; "range" picks a start and an end date — click once for the start, again for
   * the end (clicking an earlier date swaps them; a third click starts over). */
  selectionMode?: CalendarSelectionMode;
  /** Range mode: the selected range. Uncontrolled (internal state) unless both `selectedRange` and `onRangeSelect` are given. */
  selectedRange?: CalendarRange;
  /** Range mode: initial range when `selectedRange` isn't given. */
  defaultRange?: CalendarRange;
  /** Range mode: called on every click — first with only `start`, then with both `start` and `end`; `{}` when cleared. */
  onRangeSelect?: (range: CalendarRange) => void;
  /**
   * Layout (default "inline"):
   * - "inline" — just the month grid.
   * - "modal" — styled like a dialog: a header showing the selected date in large type, the grid, and Cancel / Select
   *   buttons. Pass `open` (+ `onClose`) to show it as a real overlay dialog; without `open` it renders in place.
   */
  variant?: CalendarVariant;
  /** Caption above the selected date in the "modal" header (default "Select date"). */
  title?: string;
  /** Overlay mode for `variant="modal"`: show / hide the dialog. Leave undefined to render the panel in place. */
  open?: boolean;
  /** Called when the overlay should close (backdrop click, Escape, Cancel or Select). */
  onClose?: () => void;
  /** "modal" footer: called when Select is pressed, with the selected date — or, in range mode, `undefined` and the range as the second argument (the Web Component's `confirm` event carries only the first argument, so read the range from the last `rangeselect` event there). */
  onConfirm?: (date: string | undefined, range?: CalendarRange) => void;
  /** "modal" footer: called when Cancel is pressed. */
  onCancel?: () => void;
  /** Text of the confirm button in the "modal" footer (default: "Select"). */
  confirmLabel?: string;
  /** Text of the cancel button in the "modal" footer (default: "Cancel"). */
  cancelLabel?: string;
  /** Built-in footer for the inline layout: the selected date, plus "Today" and "Clear" buttons. Always shown in "modal". */
  footer?: boolean;
  /** Enter transition: "fade" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "zoom" | "zoom-out" | "flip" | "blur" | "bounce" | "rotate" | "drop" | "skew" (default: none). Respects `prefers-reduced-motion`. */
  transition?: TransitionVariant;
  /** Enter transition duration in ms (default: 450). */
  transitionDuration?: number;
  /** Delay before the enter transition starts, in ms (default: 0) — handy for staggering. */
  transitionDelay?: number;
  /** Effect while hovering: "lift" | "scale" | "press" | "tilt" | "ring" | "glow" | "shine" (default: none). */
  hoverEffect?: HoverEffect;
  /** Extra class names applied to the root element. */
  className?: string;
  /** Per-part class overrides (`root`, `header`, `weekday`, `day`, `selectedDay`) — merged after the built-in styling. */
  classNames?: {
    root?: string;
    header?: string;
    weekday?: string;
    day?: string;
    selectedDay?: string;
  };
}

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const SELECTED_BG: Record<ColorName, string> = {
  slate: "bg-fg text-surface",
  gray: "bg-gray-700 text-white",
  indigo: "bg-indigo-600 text-white",
  accent: "bg-accent-600 text-white",
  violet: "bg-violet-600 text-white",
  blue: "bg-blue-600 text-white",
  cyan: "bg-cyan-600 text-white",
  emerald: "bg-emerald-600 text-white",
  teal: "bg-teal-600 text-white",
  amber: "bg-amber-500 text-white",
  orange: "bg-orange-600 text-white",
  rose: "bg-rose-600 text-white",
  pink: "bg-pink-600 text-white",
};

// Soft band drawn behind the days between a range's start and end.
const RANGE_BG: Record<ColorName, string> = {
  slate: "bg-fg/10",
  gray: "bg-gray-500/15",
  indigo: "bg-indigo-500/15",
  accent: "bg-accent-500/15",
  violet: "bg-violet-500/15",
  blue: "bg-blue-500/15",
  cyan: "bg-cyan-500/15",
  emerald: "bg-emerald-500/15",
  teal: "bg-teal-500/15",
  amber: "bg-amber-500/20",
  orange: "bg-orange-500/15",
  rose: "bg-rose-500/15",
  pink: "bg-pink-500/15",
};

const TODAY_RING: Record<ColorName, string> = {
  slate: "ring-border-strong",
  gray: "ring-border-strong",
  indigo: "ring-indigo-400",
  accent: "ring-accent-400",
  violet: "ring-violet-400",
  blue: "ring-blue-400",
  cyan: "ring-cyan-400",
  emerald: "ring-emerald-400",
  teal: "ring-teal-400",
  amber: "ring-amber-400",
  orange: "ring-orange-400",
  rose: "ring-rose-400",
  pink: "ring-pink-400",
};

const EVENT_DOT: Record<ColorName, string> = {
  slate: "bg-slate-500",
  gray: "bg-gray-500",
  indigo: "bg-indigo-500",
  accent: "bg-accent-500",
  violet: "bg-violet-500",
  blue: "bg-blue-500",
  cyan: "bg-cyan-500",
  emerald: "bg-emerald-500",
  teal: "bg-teal-500",
  amber: "bg-amber-500",
  orange: "bg-orange-500",
  rose: "bg-rose-500",
  pink: "bg-pink-500",
};

function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

// month here is 0-indexed (JS Date convention).
function toISODate(year: number, month: number, day: number): string {
  return `${year}-${pad2(month + 1)}-${pad2(day)}`;
}

// Parses "YYYY-MM-DD"/"YYYY-MM" as LOCAL calendar values — never through
// `new Date(string)`, which parses as UTC and can silently shift the
// displayed day depending on the viewer's timezone.
function parseYearMonth(value: string | undefined): { year: number; month: number } {
  if (!value) {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() };
  }
  const [y, m] = value.split("-").map(Number);
  return { year: y, month: (m ?? 1) - 1 };
}

function shiftMonth(year: number, month: number, delta: number): { year: number; month: number } {
  const total = year * 12 + month + delta;
  return { year: Math.floor(total / 12), month: ((total % 12) + 12) % 12 };
}

interface DayCell {
  date: string;
  day: number;
  inMonth: boolean;
}

function buildGrid(year: number, month: number): DayCell[] {
  const startWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = new Date(year, month, 0).getDate();
  const { year: py, month: pm } = shiftMonth(year, month, -1);
  const { year: ny, month: nm } = shiftMonth(year, month, 1);

  const cells: DayCell[] = [];
  for (let i = 0; i < startWeekday; i++) {
    const day = prevMonthDays - startWeekday + 1 + i;
    cells.push({ date: toISODate(py, pm, day), day, inMonth: false });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ date: toISODate(year, month, d), day: d, inMonth: true });
  }
  let nextDay = 1;
  while (cells.length < 42) {
    cells.push({ date: toISODate(ny, nm, nextDay), day: nextDay, inMonth: false });
    nextDay++;
  }
  return cells;
}

export function Calendar({
  month,
  onMonthChange,
  selected,
  onSelect,
  events = [],
  color = "accent",
  defaultSelected,
  selectionMode = "single",
  selectedRange,
  defaultRange,
  onRangeSelect,
  variant = "inline",
  title = "Select date",
  open,
  onClose,
  onConfirm,
  onCancel,
  confirmLabel = "Select",
  cancelLabel = "Cancel",
  footer = false,
  className,
  classNames,
  transition,
  transitionDuration,
  transitionDelay,
  hoverEffect,
}: CalendarProps) {
  const monthControlled = month !== undefined && onMonthChange !== undefined;
  const [internalMonth, setInternalMonth] = useState(() => parseYearMonth(month));
  const { year, month: monthIndex } = monthControlled ? parseYearMonth(month) : internalMonth;

  const selectedControlled = selected !== undefined && onSelect !== undefined;
  const [internalSelected, setInternalSelected] = useState<string | undefined>(selected ?? defaultSelected);
  const selectedDate = selectedControlled ? selected : internalSelected;

  const goToMonth = (next: { year: number; month: number }) => {
    if (monthControlled) {
      onMonthChange!(toISODate(next.year, next.month, 1));
    } else {
      setInternalMonth(next);
    }
  };

  const selectDate = (date: string) => {
    if (selectedControlled) {
      onSelect!(date);
    } else {
      setInternalSelected(date);
      onSelect?.(date);
    }
  };

  const isRange = selectionMode === "range";
  const rangeControlled = selectedRange !== undefined && onRangeSelect !== undefined;
  const [internalRange, setInternalRange] = useState<CalendarRange>(selectedRange ?? defaultRange ?? {});
  const range = rangeControlled ? selectedRange : internalRange;

  const pickRange = (date: string) => {
    let next: CalendarRange;
    if (!range.start || range.end) next = { start: date };
    else if (date < range.start) next = { start: date, end: range.start };
    else next = { start: range.start, end: date };
    if (!rangeControlled) setInternalRange(next);
    onRangeSelect?.(next);
  };

  // Overlay mode: Escape closes.
  useEffect(() => {
    if (open !== true) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const today = new Date();
  const todayISO = toISODate(today.getFullYear(), today.getMonth(), today.getDate());

  const eventsByDate = new Map<string, CalendarEvent[]>();
  for (const ev of events) {
    const list = eventsByDate.get(ev.date) ?? [];
    list.push(ev);
    eventsByDate.set(ev.date, list);
  }

  const cells = buildGrid(year, monthIndex);

  // Built-in selected-date functions: jump to today and select it, or clear the selection.
  const selectToday = () => {
    goToMonth({ year: today.getFullYear(), month: today.getMonth() });
    selectDate(todayISO);
  };
  const clearSelection = () => {
    if (isRange) {
      if (!rangeControlled) setInternalRange({});
      onRangeSelect?.({});
      return;
    }
    if (selectedControlled) onSelect!("");
    else {
      setInternalSelected(undefined);
      onSelect?.("");
    }
  };

  const body = (
    <>
      <div className={cx("mb-3 flex items-center justify-between", classNames?.header)}>
        <button
          type="button"
          onClick={() => goToMonth(shiftMonth(year, monthIndex, -1))}
          aria-label="Previous month"
          className="flex h-7 w-7 items-center justify-center rounded-md text-fg-subtle transition-colors hover:bg-surface-muted hover:text-fg-muted"
        >
          <Icon name="chevron-left" size={16} />
        </button>
        <span className="text-sm font-semibold text-fg">
          {MONTH_NAMES[monthIndex]} {year}
        </span>
        <button
          type="button"
          onClick={() => goToMonth(shiftMonth(year, monthIndex, 1))}
          aria-label="Next month"
          className="flex h-7 w-7 items-center justify-center rounded-md text-fg-subtle transition-colors hover:bg-surface-muted hover:text-fg-muted"
        >
          <Icon name="chevron-right" size={16} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-y-1 text-center">
        {WEEKDAYS.map((wd) => (
          <span key={wd} className={cx("text-xs font-medium text-fg-subtle", classNames?.weekday)}>
            {wd}
          </span>
        ))}
        {cells.map((cell) => {
          const isRangeStart = isRange && cell.inMonth && cell.date === range.start;
          const isRangeEnd = isRange && cell.inMonth && cell.date === range.end;
          const isSelected = isRange ? isRangeStart || isRangeEnd : cell.inMonth && cell.date === selectedDate;
          const inBand =
            isRange && cell.inMonth && !!range.start && !!range.end && cell.date >= range.start && cell.date <= range.end;
          const isToday = cell.inMonth && cell.date === todayISO;
          const dayEvents = eventsByDate.get(cell.date) ?? [];

          const button = (
            <button
              key={cell.date}
              type="button"
              disabled={!cell.inMonth}
              onClick={() => cell.inMonth && (isRange ? pickRange(cell.date) : selectDate(cell.date))}
              className={cx(
                "mx-auto flex h-9 w-9 flex-col items-center justify-center gap-0.5 rounded-full text-sm transition-colors",
                !cell.inMonth && "cursor-default text-border-strong",
                cell.inMonth && !isSelected && "text-fg-muted hover:bg-surface-muted",
                isSelected && cx(SELECTED_BG[color], classNames?.selectedDay),
                isToday && !isSelected && cx("ring-1 ring-inset", TODAY_RING[color]),
                classNames?.day
              )}
            >
              <span>{cell.day}</span>
              {cell.inMonth && dayEvents.length > 0 && (
                <span className="flex items-center gap-0.5">
                  {dayEvents.slice(0, 3).map((ev, i) => (
                    <span key={i} className={cx("h-1 w-1 rounded-full", isSelected ? "bg-current" : EVENT_DOT[ev.color ?? color])} />
                  ))}
                </span>
              )}
            </button>
          );
          if (!isRange) return button;
          // Range mode: a full-width cell carries the band, rounded at the start / end of the range.
          return (
            <div
              key={cell.date}
              className={cx(
                inBand && RANGE_BG[color],
                inBand && range.start !== range.end && isRangeStart && "rounded-l-full",
                inBand && range.start !== range.end && isRangeEnd && "rounded-r-full"
              )}
            >
              {button}
            </div>
          );
        })}
      </div>
    </>
  );

  const buttonColor: ColorName = color;
  const summary = isRange ? formatRange(range) : formatDate(selectedDate || undefined);
  const hasSelection = isRange ? !!range.start : !!selectedDate;
  const footerBar: ReactNode = (
    <div className="mt-3 flex items-center justify-between gap-2 border-t border-border pt-3">
      <span className="min-w-0 truncate text-xs text-fg-subtle">{summary}</span>
      <span className="flex shrink-0 gap-1">
        {!isRange && <Button size="sm" variant="ghost" color={buttonColor} label="Today" onClick={selectToday} />}
        <Button size="sm" variant="ghost" color={buttonColor} label="Clear" disabled={!hasSelection} onClick={clearSelection} />
      </span>
    </div>
  );

  if (variant !== "modal") {
    return (
      <div
        className={cx("w-full max-w-xs select-none text-fg", motionClass(transition, hoverEffect), className, classNames?.root)}
        style={motionStyle(transitionDuration, transitionDelay)}
      >
        {body}
        {footer && footerBar}
      </div>
    );
  }

  // "modal": a dialog-styled panel — header with the selected date, the grid, Cancel / Select.
  const panel = (
    <div
      role="dialog"
      aria-label={title}
      className={cx(
        "relative w-full max-w-xs select-none overflow-hidden rounded-2xl bg-surface text-fg shadow-2xl ring-1 ring-black/5",
        motionClass(transition, hoverEffect),
        className,
        classNames?.root
      )}
      style={motionStyle(transitionDuration, transitionDelay)}
    >
      <div className="border-b border-border bg-accent-500/10 px-5 py-4">
        <p className="text-xs font-medium uppercase tracking-wide text-fg-subtle">{title}</p>
        <p className="mt-1 font-semibold text-fg">{summary}</p>
      </div>
      <div className="p-4">{body}</div>
      <div className="flex justify-end gap-2 border-t border-border px-4 py-3">
        <Button
          variant="ghost"
          color="slate"
          label={cancelLabel}
          onClick={() => {
            onCancel?.();
            onClose?.();
          }}
        />
        <Button
          color={buttonColor}
          label={confirmLabel}
          disabled={isRange ? !range.start || !range.end : !selectedDate}
          onClick={() => {
            onConfirm?.(isRange ? undefined : selectedDate || undefined, isRange ? range : undefined);
            onClose?.();
          }}
        />
      </div>
    </div>
  );

  if (open === undefined) return panel;
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" role="presentation">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      {panel}
    </div>
  );
}
