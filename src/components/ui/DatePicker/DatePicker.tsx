import { useRef, useState, type ChangeEventHandler, type FocusEventHandler, type FormEventHandler, type InputHTMLAttributes } from "react";
import { cx } from "../../../core/tokens";
import { motionClass, motionStyle, type TransitionVariant, type HoverEffect } from "../../../core/motion";
import { Icon } from "../Icons/Icon";
import { Calendar } from "../Calendar/Calendar";
import { commitInputValue, useDismiss } from "./fieldPopover";

export type DatePickerSize = "sm" | "md" | "lg";
export type DatePickerVariant = "outline" | "filled" | "underline";

export interface DatePickerProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  /** The value was committed — the native change event (the web component's `update` event, detail = the new value). */
  onChange?: ChangeEventHandler<HTMLInputElement>;
  /** Called as the user edits — the native input event (the web component's `input` event, detail = the current value). */
  onInput?: FormEventHandler<HTMLInputElement>;
  /** Called when the field gains focus — the native focus event (the web component's `focus` event). */
  onFocus?: FocusEventHandler<HTMLInputElement>;
  /** Called when the field fails validation (e.g. `required` and empty) — the native invalid event (the web component's `invalid` event, detail = the message). */
  onInvalid?: FormEventHandler<HTMLInputElement>;
  /** Control height and text size: "sm" | "md" | "lg". Defaults to "md". */
  size?: DatePickerSize;
  /** Visual style: "outline" (default) | "filled" | "underline". */
  variant?: DatePickerVariant;
  /** Applies error (rose) styling when true (default: false). */
  invalid?: boolean;
  /** Shows a clear (×) button when `value` is set — only meaningful for controlled usage. */
  onClear?: () => void;
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
  classNames?: { root?: string; input?: string; icon?: string; clearButton?: string };
}

const SIZE_CLASSES: Record<DatePickerSize, string> = {
  sm: "h-8 pl-9 pr-2.5 text-sm",
  md: "h-10 pl-9 pr-3 text-sm",
  lg: "h-12 pl-9 pr-4 text-base",
};

const ICON_PX: Record<DatePickerSize, number> = { sm: 14, md: 16, lg: 18 };

const VARIANT_CLASSES: Record<DatePickerVariant, string> = {
  outline: "rounded-md border border-border-strong bg-surface focus-within:border-slate-500 focus-within:ring-2 focus-within:ring-slate-500/20",
  filled: "rounded-md border border-transparent bg-surface-muted focus-within:border-border-strong focus-within:bg-surface focus-within:ring-2 focus-within:ring-slate-500/20",
  underline: "rounded-none border-b-2 border-border-strong bg-transparent focus-within:border-fg",
};

const INVALID_CLASSES = "border-rose-400 focus-within:border-rose-500 focus-within:ring-rose-500/20";

export function DatePicker({
  size = "md",
  variant = "outline",
  invalid = false,
  onClear,
  className,
  classNames,
  transition,
  transitionDuration,
  transitionDelay,
  hoverEffect,
  ...rest
}: DatePickerProps) {
  const showClear = !!rest.value && !!onClear;
  const rootRef = useRef<HTMLSpanElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  // Tracks the field's value (typed, picked, or set by the parent) so the panel can show it without reading the DOM during render.
  const [typed, setTyped] = useState(String(rest.value ?? rest.defaultValue ?? ""));
  const value = rest.value !== undefined ? String(rest.value) : typed;
  const { onChange, onInput, ...inputRest } = rest;
  useDismiss(open, rootRef, () => setOpen(false));
  const pick = (date: string) => {
    commitInputValue(inputRef.current, date);
    setOpen(false);
  };
  return (
    <span
      ref={rootRef}
      className={cx(
        "group relative inline-flex w-full items-center text-fg outline-none transition-colors",
        VARIANT_CLASSES[variant],
        invalid && INVALID_CLASSES,
        motionClass(transition, hoverEffect),
        className,
        classNames?.root
      )}
      style={motionStyle(transitionDuration, transitionDelay)}
    >
      <Icon
        name="calendar"
        size={ICON_PX[size]}
        className={cx(
          "pointer-events-none absolute left-3 text-fg-subtle transition-colors group-focus-within:text-fg-muted",
          classNames?.icon
        )}
      />
      <input
        ref={inputRef}
        type="date"
        className={cx(
          // The browser's own calendar popup is replaced by the Calendar panel below, so its indicator is hidden.
          "w-full bg-transparent pr-10 outline-none disabled:cursor-not-allowed disabled:opacity-50 [&::-webkit-calendar-picker-indicator]:hidden",
          SIZE_CLASSES[size],
          showClear && "pr-16",
          classNames?.input
        )}
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
        aria-label="Open calendar"
        aria-expanded={open}
        className="absolute right-2 rounded p-1 text-fg-subtle transition-colors hover:bg-surface-muted hover:text-fg disabled:pointer-events-none disabled:opacity-50"
      >
        <Icon name="calendar" size={ICON_PX[size]} />
      </button>
      {open && (
        <div className="absolute left-0 top-full z-50 mt-1.5 w-max rounded-xl border border-border bg-surface p-3 shadow-xl">
          <Calendar
            footer
            month={value || undefined}
            selected={value || undefined}
            onSelect={pick}
          />
        </div>
      )}
      {showClear && (
        <button
          type="button"
          onClick={onClear}
          aria-label="Clear date"
          className={cx(
            "absolute right-9 rounded p-0.5 text-fg-subtle transition-colors hover:bg-surface-muted hover:text-fg-muted",
            classNames?.clearButton
          )}
        >
          <Icon name="x" size={ICON_PX[size] - 2} />
        </button>
      )}
    </span>
  );
}
