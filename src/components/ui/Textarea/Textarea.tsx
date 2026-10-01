import type { TextareaHTMLAttributes } from "react";
import { cx } from "../../../core/tokens";
import { motionClass, motionStyle, type TransitionVariant, type HoverEffect } from "../../../core/motion";

export type TextareaResize = "none" | "vertical" | "both";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
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
      className={cx(
        BASE_CLASSES,
        RESIZE_CLASSES[resize],
        invalid && INVALID_CLASSES,
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
