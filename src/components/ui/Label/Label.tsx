import type { LabelHTMLAttributes, ReactNode } from "react";
import { cx } from "../../../core/tokens";
import { motionClass, motionStyle, type TransitionVariant } from "../../../core/motion";

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  /** Appends a required (*) marker after the label text (default: false). */
  required?: boolean;
  /** Label text/content. */
  children?: ReactNode;
  /** Enter transition: "fade" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "zoom" | "zoom-out" | "flip" | "blur" | "bounce" | "rotate" | "drop" | "skew" (default: none). Respects `prefers-reduced-motion`. */
  transition?: TransitionVariant;
  /** Enter transition duration in ms (default: 450). */
  transitionDuration?: number;
  /** Delay before the enter transition starts, in ms (default: 0) — handy for staggering. */
  transitionDelay?: number;
  /** Extra class name(s) applied to the root element. */
  className?: string;
  /** Per-part class overrides — merged after (and win over) the built-in styling. */
  classNames?: { root?: string; required?: string };
}

export function Label({ required = false, children, transition, transitionDuration, transitionDelay, className, classNames, style, ...rest }: LabelProps) {
  return (
    <label
      className={cx("block text-sm font-medium text-fg-muted", motionClass(transition), className, classNames?.root)}
      style={{ ...style, ...motionStyle(transitionDuration, transitionDelay) }}
      {...rest}
    >
      <slot>{children}</slot>
      {required && (
        <span className={cx("ml-0.5 text-rose-500", classNames?.required)} aria-hidden="true">
          *
        </span>
      )}
    </label>
  );
}
