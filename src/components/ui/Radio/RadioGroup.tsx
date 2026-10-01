import type { ReactNode } from "react";
import { cx } from "../../../core/tokens";
import { motionClass, motionStyle, type TransitionVariant, type HoverEffect } from "../../../core/motion";

export type RadioGroupOrientation = "vertical" | "horizontal";

export interface RadioGroupProps {
  /** Stacking direction of the radios: "vertical" (default) or "horizontal" (wraps). */
  orientation?: RadioGroupOrientation;
  /** The `Radio` elements to lay out; give each the same `name` so the browser makes them mutually exclusive. */
  children?: ReactNode;
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
  classNames?: {
    root?: string;
  };
}

// A pure layout wrapper — no state coordination. Native <input type="radio">
// elements already coordinate exclusivity via a shared `name` attribute, so
// consumers give each Radio in a group the same `name` prop themselves,
// exactly like plain HTML forms.
export function RadioGroup({
  orientation = "vertical",
  children,
  transition,
  transitionDuration,
  transitionDelay,
  hoverEffect,
  className,
  classNames,
}: RadioGroupProps) {
  return (
    <div
      role="radiogroup"
      className={cx(
        orientation === "vertical" ? "flex flex-col gap-2" : "flex flex-wrap gap-4",
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
