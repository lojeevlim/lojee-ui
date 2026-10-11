import { useEffect, useRef, useState, type ChangeEventHandler, type FocusEventHandler, type FormEventHandler, type InputHTMLAttributes } from "react";
import { cx } from "../../../core/tokens";
import { motionClass, motionStyle, type TransitionVariant, type HoverEffect } from "../../../core/motion";
import { Icon } from "../Icons/Icon";
import { commitInputValue, useDismiss } from "../DatePicker/fieldPopover";

export type TimePickerSize = "sm" | "md" | "lg";

export interface TimePickerProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  /** The value was committed — the native change event (the web component's `update` event, detail = the new value). */
  onChange?: ChangeEventHandler<HTMLInputElement>;
  /** Called as the user edits — the native input event (the web component's `input` event, detail = the current value). */
  onInput?: FormEventHandler<HTMLInputElement>;
  /** Called when the field gains focus — the native focus event (the web component's `focus` event). */
  onFocus?: FocusEventHandler<HTMLInputElement>;
  /** Called when the field fails validation (e.g. `required` and empty) — the native invalid event (the web component's `invalid` event, detail = the message). */
  onInvalid?: FormEventHandler<HTMLInputElement>;
  /** Input height/text size: "sm", "md" or "lg" (default: "md"). */
  size?: TimePickerSize;
  /** Applies error styling (rose border and focus ring) to flag invalid input (default: false). */
  invalid?: boolean;
  /** Enter transition: "fade" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "zoom" | "zoom-out" | "flip" | "blur" | "bounce" | "rotate" | "drop" | "skew" (default: none). Respects `prefers-reduced-motion`. */
  transition?: TransitionVariant;
  /** Enter transition duration in ms (default: 450). */
  transitionDuration?: number;
  /** Delay before the enter transition starts, in ms (default: 0) — handy for staggering. */
  transitionDelay?: number;
  /** Effect while hovering: "lift" | "scale" | "press" | "tilt" | "ring" | "glow" | "shine" (default: none). */
  hoverEffect?: HoverEffect;
  /** Extra class name(s) appended to the root element. */
  className?: string;
  /** Per-part class overrides — merged after (and win over) the built-in styling. */
  classNames?: { root?: string; input?: string; icon?: string };
}

const SIZE_CLASSES: Record<TimePickerSize, string> = {
  sm: "h-8 pl-9 pr-2.5 text-sm",
  md: "h-10 pl-9 pr-3 text-sm",
  lg: "h-12 pl-9 pr-4 text-base",
};

const ICON_PX: Record<TimePickerSize, number> = { sm: 14, md: 16, lg: 18 };

const BASE_CLASSES =
  "w-full rounded-md border border-border-strong bg-surface text-fg outline-none transition-colors focus:border-fg-subtle focus:ring-2 focus:ring-fg-subtle/20 disabled:cursor-not-allowed disabled:opacity-50";

const INVALID_CLASSES = "border-rose-400 focus:border-rose-500 focus:ring-rose-500/20";


const HOURS = Array.from({ length: 12 }, (_, i) => i + 1);
const MINUTES = Array.from({ length: 60 }, (_, i) => i);
const pad = (n: number) => String(n).padStart(2, "0");

/** "HH:MM" (24h, an input's value) → the 12-hour parts the panel shows. */
function parseTime(value: string | undefined) {
  const m = /^(\d{1,2}):(\d{2})/.exec(value ?? "");
  if (!m) return null;
  const h24 = Number(m[1]);
  return { hour: h24 % 12 || 12, minute: Number(m[2]), pm: h24 >= 12 };
}

const toValue = (hour: number, minute: number, pm: boolean) => `${pad((hour % 12) + (pm ? 12 : 0))}:${pad(minute)}`;

function Column({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div role="listbox" aria-label={label} className="flex max-h-52 flex-col gap-0.5 overflow-y-auto px-1 [scrollbar-width:thin]">
      {children}
    </div>
  );
}

function Cell({ selected, onClick, children }: { selected: boolean; onClick: () => void; children: React.ReactNode }) {
  const ref = useRef<HTMLButtonElement>(null);
  // Bring the chosen value into view when the panel opens or the value changes.
  useEffect(() => {
    if (selected) ref.current?.scrollIntoView({ block: "nearest" });
  }, [selected]);
  return (
    <button
      ref={ref}
      type="button"
      role="option"
      aria-selected={selected}
      onClick={onClick}
      className={cx(
        "h-8 min-w-[2.75rem] rounded-md px-2 text-sm tabular-nums transition-colors",
        selected ? "bg-accent-600 font-semibold text-white" : "text-fg-muted hover:bg-surface-muted hover:text-fg"
      )}
    >
      {children}
    </button>
  );
}

export function TimePicker({ size = "md", invalid = false, className, classNames, transition, transitionDuration, transitionDelay, hoverEffect, ...rest }: TimePickerProps) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  // Tracks the field's value (typed, picked, or set by the parent) so the panel can show it without reading the DOM during render.
  const [typed, setTyped] = useState(String(rest.value ?? rest.defaultValue ?? ""));
  const value = rest.value !== undefined ? String(rest.value) : typed;
  const { onChange, onInput, ...inputRest } = rest;
  useDismiss(open, rootRef, () => setOpen(false));
  const current = parseTime(value);
  const set = (next: Partial<{ hour: number; minute: number; pm: boolean }>) => {
    const base = current ?? { hour: 12, minute: 0, pm: false };
    const t = { ...base, ...next };
    commitInputValue(inputRef.current, toValue(t.hour, t.minute, t.pm));
  };
  return (
    <span ref={rootRef} className={cx("relative inline-flex w-full items-center", motionClass(transition, hoverEffect), className, classNames?.root)} style={motionStyle(transitionDuration, transitionDelay)}>
      <Icon
        name="clock"
        size={ICON_PX[size]}
        className={cx("pointer-events-none absolute left-3 text-fg-subtle", classNames?.icon)}
      />
      <input
        ref={inputRef}
        type="time"
        // The browser's own time popup is replaced by the panel below, so its indicator is hidden.
        className={cx(BASE_CLASSES, SIZE_CLASSES[size], "pr-10 [&::-webkit-calendar-picker-indicator]:hidden", invalid && INVALID_CLASSES, classNames?.input)}
        {...inputRest}
        onChange={(e) => {
          setTyped(e.target.value);
          onChange?.(e);
        }}
        onInput={(e) => {
          setTyped((e.target as HTMLInputElement).value);
          onInput?.(e);
        }}
      />
      <button
        type="button"
        disabled={rest.disabled}
        onClick={() => setOpen((o) => !o)}
        aria-label="Open time picker"
        aria-expanded={open}
        className="absolute right-2 rounded p-1 text-fg-subtle transition-colors hover:bg-surface-muted hover:text-fg disabled:pointer-events-none disabled:opacity-50"
      >
        <Icon name="clock" size={ICON_PX[size]} />
      </button>
      {open && (
        <div className="absolute left-0 top-full z-50 mt-1.5 w-max rounded-xl border border-border bg-surface p-2 shadow-xl">
          <div className="flex gap-1">
            <Column label="Hour">
              {HOURS.map((h) => (
                <Cell key={h} selected={current?.hour === h} onClick={() => set({ hour: h })}>
                  {pad(h)}
                </Cell>
              ))}
            </Column>
            <Column label="Minute">
              {MINUTES.map((m) => (
                <Cell key={m} selected={current?.minute === m} onClick={() => set({ minute: m })}>
                  {pad(m)}
                </Cell>
              ))}
            </Column>
            <Column label="AM or PM">
              {[false, true].map((pm) => (
                <Cell key={String(pm)} selected={current?.pm === pm} onClick={() => set({ pm })}>
                  {pm ? "PM" : "AM"}
                </Cell>
              ))}
            </Column>
          </div>
          <div className="mt-2 flex items-center justify-between border-t border-border px-1 pt-2 text-sm">
            <button type="button" onClick={() => { commitInputValue(inputRef.current, ""); setOpen(false); }} className="rounded-md px-2 py-1 text-fg-subtle transition-colors hover:bg-surface-muted hover:text-fg">
              Clear
            </button>
            <button
              type="button"
              onClick={() => {
                const d = new Date();
                commitInputValue(inputRef.current, `${pad(d.getHours())}:${pad(d.getMinutes())}`);
              }}
              className="rounded-md px-2 py-1 text-accent-600 transition-colors hover:bg-surface-muted dark:text-accent-400"
            >
              Now
            </button>
            <button type="button" onClick={() => setOpen(false)} className="rounded-md bg-accent-600 px-3 py-1 font-medium text-white transition-colors hover:bg-accent-700">
              Done
            </button>
          </div>
        </div>
      )}
    </span>
  );
}
