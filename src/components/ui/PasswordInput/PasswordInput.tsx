import { INPUT_VARIANT_CLASSES, INPUT_VARIANT_INVALID_CLASSES, type InputVariant } from "../../../core/inputVariants";
import { useState } from "react";
import type { ChangeEventHandler, FocusEventHandler, FormEventHandler, InputHTMLAttributes } from "react";
import { cx } from "../../../core/tokens";
import { motionClass, motionStyle, type TransitionVariant, type HoverEffect } from "../../../core/motion";
import { Icon } from "../Icons/Icon";

export type PasswordInputSize = "sm" | "md" | "lg";

export interface PasswordInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  /** The value was committed — the native change event (the web component's `update` event, detail = the new value). */
  onChange?: ChangeEventHandler<HTMLInputElement>;
  /** Called as the user edits — the native input event (the web component's `input` event, detail = the current value). */
  onInput?: FormEventHandler<HTMLInputElement>;
  /** Called when the field gains focus — the native focus event (the web component's `focus` event). */
  onFocus?: FocusEventHandler<HTMLInputElement>;
  /** Called when the field fails validation (e.g. `required` and empty) — the native invalid event (the web component's `invalid` event, detail = the message). */
  onInvalid?: FormEventHandler<HTMLInputElement>;
  /** Control height and text size: "sm", "md" (default) or "lg". */
  size?: PasswordInputSize;
  /** Look of the field: "outline" | "filled" | "underline" | "soft" | "plain" (default: "outline"). */
  variant?: InputVariant;
  /** Marks the field as invalid — rose border/focus ring and `aria-invalid` (default: false). */
  invalid?: boolean;
  /** Enter transition: "fade" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "zoom" | "zoom-out" | "flip" | "blur" | "bounce" | "rotate" | "drop" | "skew" (default: none). Respects `prefers-reduced-motion`. */
  transition?: TransitionVariant;
  /** Enter transition duration in ms (default: 450). */
  transitionDuration?: number;
  /** Delay before the enter transition starts, in ms (default: 0) — handy for staggering. */
  transitionDelay?: number;
  /** Effect while hovering: "lift" | "scale" | "press" | "tilt" | "ring" | "glow" | "shine" (default: none). */
  hoverEffect?: HoverEffect;
  /** Extra CSS class(es) added to the root element, merged before `classNames.root`. */
  className?: string;
  /** Per-part class overrides — merged after (and win over) the built-in styling. */
  classNames?: { root?: string; input?: string; toggleButton?: string };
}

const SIZE_CLASSES: Record<PasswordInputSize, string> = {
  sm: "h-8 px-2.5 text-sm",
  md: "h-10 px-3 text-sm",
  lg: "h-12 px-4 text-base",
};

const ICON_PX: Record<PasswordInputSize, number> = { sm: 14, md: 16, lg: 18 };

const BASE_CLASSES =
  "w-full rounded-md border border-border-strong bg-surface text-fg placeholder:text-fg-subtle outline-none transition-colors focus:border-fg-subtle focus:ring-2 focus:ring-fg-subtle/20 disabled:cursor-not-allowed disabled:opacity-50";

const INVALID_CLASSES = "border-rose-400 focus:border-rose-500 focus:ring-rose-500/20";

// A plain `Input` with `trailingIcon` isn't enough here — that icon is
// decorative (`pointer-events-none`), but this needs a real clickable
// toggle, so it's its own component with the same visual base as
// Input/SearchInput/DatePicker rather than a variant of Input.
export function PasswordInput({ variant = "outline", size = "md", invalid = false, className, classNames, transition, transitionDuration, transitionDelay, hoverEffect, ...rest }: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <span className={cx("relative inline-flex w-full items-center", motionClass(transition, hoverEffect), className, classNames?.root)} style={motionStyle(transitionDuration, transitionDelay)}>
      <input
        type={visible ? "text" : "password"}
        aria-invalid={invalid || undefined}
        data-input-variant={variant}
        className={cx(
          BASE_CLASSES,
          SIZE_CLASSES[size],
          INPUT_VARIANT_CLASSES[variant],
          "pr-9",
          invalid && INVALID_CLASSES,
          invalid && INPUT_VARIANT_INVALID_CLASSES[variant],
          classNames?.input
        )}
        {...rest}
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? "Hide password" : "Show password"}
        aria-pressed={visible}
        className={cx(
          "pointer-events-auto absolute right-3 text-fg-subtle transition-colors hover:text-fg-muted",
          classNames?.toggleButton
        )}
      >
        <Icon name={visible ? "eye-off" : "eye"} size={ICON_PX[size]} />
      </button>
    </span>
  );
}
