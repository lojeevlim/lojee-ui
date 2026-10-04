import { INPUT_VARIANT_CLASSES, INPUT_VARIANT_INVALID_CLASSES, type InputVariant } from "../../../core/inputVariants";
import type { ChangeEventHandler, FocusEventHandler, FormEventHandler, TextareaHTMLAttributes } from "react";
import { cx } from "../../../core/tokens";
import { motionClass, motionStyle, type TransitionVariant, type HoverEffect } from "../../../core/motion";

export type TextareaResize = "none" | "vertical" | "both";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** The value was committed — the native change event (the web component's `update` event, detail = the new value). */
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
  /** Called as the user edits — the native input event (the web component's `input` event, detail = the current value). */
  onInput?: FormEventHandler<HTMLTextAreaElement>;
  /** Called when the field gains focus — the native focus event (the web component's `focus` event). */
  onFocus?: FocusEventHandler<HTMLTextAreaElement>;
  /** Called when the field fails validation (e.g. `required` and empty) — the native invalid event (the web component's `invalid` event, detail = the message). */
  onInvalid?: FormEventHandler<HTMLTextAreaElement>;
  /** Look of the field: "outline" | "filled" | "underline" | "soft" (default: "outline"). */
  variant?: InputVariant;
  /** Applies error styling (rose border and focus ring) to flag invalid input (default: false). */
  invalid?: boolean;
  /** User resize handle: "none", "vertical" or "both" (default: "vertical"). */
  resize?: TextareaResize;
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
  classNames?: { root?: string };
}

const RESIZE_CLASSES: Record<TextareaResize, string> = {
  none: "resize-none",
  vertical: "resize-y",
  both: "resize",
};

const BASE_CLASSES =
  "w-full min-h-[80px] rounded-md border border-border-strong bg-surface px-3 py-2 text-fg placeholder:text-fg-subtle outline-none transition-colors focus:border-fg-subtle focus:ring-2 focus:ring-fg-subtle/20 disabled:cursor-not-allowed disabled:opacity-50";

const INVALID_CLASSES = "border-rose-400 focus:border-rose-500 focus:ring-rose-500/20";

export function Textarea({
  variant = "outline",
  invalid = false,
  resize = "vertical",
  transition,
  transitionDuration,
  transitionDelay,
  hoverEffect,
  className,
  classNames,
  style,
  ...rest
}: TextareaProps) {
  return (
    <textarea
      data-input-variant={variant}
      className={cx(
        BASE_CLASSES,
        RESIZE_CLASSES[resize],
        INPUT_VARIANT_CLASSES[variant],
        invalid && INVALID_CLASSES,
        invalid && INPUT_VARIANT_INVALID_CLASSES[variant],
        // A <textarea> can't host the hover "shine" streak (it needs an ::after), so that effect is skipped here.
        motionClass(transition, hoverEffect === "shine" ? undefined : hoverEffect),
        className,
        classNames?.root
      )}
      style={{ ...style, ...motionStyle(transitionDuration, transitionDelay) }}
      {...rest}
    />
  );
}
