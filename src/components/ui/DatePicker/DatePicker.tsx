import type { ChangeEventHandler, FocusEventHandler, FormEventHandler, InputHTMLAttributes } from "react";
import { cx } from "../../../core/tokens";
import { motionClass, motionStyle, type TransitionVariant, type HoverEffect } from "../../../core/motion";
import { Icon } from "../Icons/Icon";

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
  return (
    <span
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
        type="date"
        className={cx(
          "w-full bg-transparent outline-none disabled:cursor-not-allowed disabled:opacity-50",
          SIZE_CLASSES[size],
          showClear && "pr-8",
          classNames?.input
        )}
        {...rest}
      />
      {showClear && (
        <button
          type="button"
          onClick={onClear}
          aria-label="Clear date"
          className={cx(
            "absolute right-2.5 rounded p-0.5 text-fg-subtle transition-colors hover:bg-surface-muted hover:text-fg-muted",
            classNames?.clearButton
          )}
        >
          <Icon name="x" size={ICON_PX[size] - 2} />
        </button>
      )}
    </span>
  );
}
