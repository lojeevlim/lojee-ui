import type { ReactNode } from "react";
import { cx, shapeClasses, type Shape } from "../../../core/tokens";
import { motionClass, motionStyle, type TransitionVariant, type HoverEffect } from "../../../core/motion";

export interface ButtonGroupProps {
  /** The buttons (e.g. `Button` or `SegmentButton`) to join into one connected group. */
  children: ReactNode;
  /**
   * Corner treatment for the whole group (default keeps the built-in
   * rounded-lg look). Individual segments stay square themselves — the
   * group's outer container does the rounding, via `overflow-hidden`.
   */
  shape?: Shape;
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
  /** Per-part class overrides — merged after (and win over) the built-in styling. */
  classNames?: {
    root?: string;
  };
}

export function ButtonGroup({ children, shape = "default", className, classNames, transition, transitionDuration, transitionDelay, hoverEffect }: ButtonGroupProps) {
  return (
    <div
      className={cx(
        "inline-flex rounded-lg border border-border overflow-hidden divide-x divide-border",
        shapeClasses[shape],
        motionClass(transition, hoverEffect),
        className,
        classNames?.root
      )}
      style={motionStyle(transitionDuration, transitionDelay)}
    >
      <slot>{children}</slot>
    </div>
  );
}
