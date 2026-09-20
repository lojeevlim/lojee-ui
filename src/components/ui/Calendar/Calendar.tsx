import { useState } from "react";
import { cx, type ColorName } from "../../../core/tokens";
import { Icon } from "../Icons/Icon";

export interface CalendarEvent {
  /** ISO date string "YYYY-MM-DD". */
  date: string;
  label?: string;
  color?: ColorName;
}

export interface CalendarProps {
  /** Month being displayed, as "YYYY-MM-DD" or "YYYY-MM" (only year+month matter). Uncontrolled
   * (internal state, defaulting to today's month) unless both `month` and `onMonthChange` are given. */
  month?: string;
  onMonthChange?: (month: string) => void;
  /** Selected date "YYYY-MM-DD". Uncontrolled (internal state) unless both `selected` and `onSelect`
   * are given. */
  selected?: string;
  onSelect?: (date: string) => void;
  /** Dates with a small colored dot marker under the day number. */
  events?: CalendarEvent[];
  /** Accent color for the selected-day fill and today's outline (default "indigo"). */
  color?: ColorName;
  className?: string;
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
  slate: "bg-slate-900 text-white",
  gray: "bg-gray-700 text-white",
  indigo: "bg-indigo-600 text-white",
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

const TODAY_RING: Record<ColorName, string> = {
  slate: "ring-slate-400",
  gray: "ring-gray-400",
  indigo: "ring-indigo-400",
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
  color = "indigo",
  className,
  classNames,
}: CalendarProps) {
  const monthControlled = month !== undefined && onMonthChange !== undefined;
  const [internalMonth, setInternalMonth] = useState(() => parseYearMonth(month));
  const { year, month: monthIndex } = monthControlled ? parseYearMonth(month) : internalMonth;

  const selectedControlled = selected !== undefined && onSelect !== undefined;
  const [internalSelected, setInternalSelected] = useState<string | undefined>(selected);
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

  const today = new Date();
  const todayISO = toISODate(today.getFullYear(), today.getMonth(), today.getDate());

  const eventsByDate = new Map<string, CalendarEvent[]>();
  for (const ev of events) {
    const list = eventsByDate.get(ev.date) ?? [];
    list.push(ev);
    eventsByDate.set(ev.date, list);
  }

  const cells = buildGrid(year, monthIndex);

  return (
    <div className={cx("w-full max-w-xs select-none text-slate-900", className, classNames?.root)}>
      <div className={cx("mb-3 flex items-center justify-between", classNames?.header)}>
        <button
          type="button"
          onClick={() => goToMonth(shiftMonth(year, monthIndex, -1))}
          aria-label="Previous month"
          className="flex h-7 w-7 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
        >
          <Icon name="chevron-left" size={16} />
        </button>
        <span className="text-sm font-semibold text-slate-900">
          {MONTH_NAMES[monthIndex]} {year}
        </span>
        <button
          type="button"
          onClick={() => goToMonth(shiftMonth(year, monthIndex, 1))}
          aria-label="Next month"
          className="flex h-7 w-7 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
        >
          <Icon name="chevron-right" size={16} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-y-1 text-center">
        {WEEKDAYS.map((wd) => (
          <span key={wd} className={cx("text-xs font-medium text-slate-400", classNames?.weekday)}>
            {wd}
          </span>
        ))}
        {cells.map((cell) => {
          const isSelected = cell.inMonth && cell.date === selectedDate;
          const isToday = cell.inMonth && cell.date === todayISO;
          const dayEvents = eventsByDate.get(cell.date) ?? [];

          return (
            <button
              key={cell.date}
              type="button"
              disabled={!cell.inMonth}
              onClick={() => cell.inMonth && selectDate(cell.date)}
              className={cx(
                "mx-auto flex h-9 w-9 flex-col items-center justify-center gap-0.5 rounded-full text-sm transition-colors",
                !cell.inMonth && "cursor-default text-slate-300",
                cell.inMonth && !isSelected && "text-slate-700 hover:bg-slate-100",
                isSelected && cx(SELECTED_BG[color], classNames?.selectedDay),
                isToday && !isSelected && cx("ring-1 ring-inset", TODAY_RING[color]),
                classNames?.day
              )}
            >
              <span>{cell.day}</span>
              {cell.inMonth && dayEvents.length > 0 && (
                <span className="flex items-center gap-0.5">
                  {dayEvents.slice(0, 3).map((ev, i) => (
                    <span key={i} className={cx("h-1 w-1 rounded-full", isSelected ? "bg-white" : EVENT_DOT[ev.color ?? color])} />
                  ))}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
