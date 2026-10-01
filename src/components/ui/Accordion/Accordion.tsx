import type { ReactNode } from "react";
import { cx } from "../../../core/tokens";
import { motionClass, motionStyle, type TransitionVariant, type HoverEffect } from "../../../core/motion";

export interface AccordionProps {
  /** The `AccordionItem` elements to render, stacked in a single bordered container. */
  children?: ReactNode;
  /** Enter transition: "fade" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "zoom" | "zoom-out" | "flip" | "blur" | "bounce" | "rotate" | "drop" | "skew" (default: none). Respects `prefers-reduced-motion`. */
  transition?: TransitionVariant;
  /** Enter transition duration in ms (default: 450). */
  transitionDuration?: number;
  /** Delay before the enter transition starts, in ms (default: 0) — handy for staggering. */
  transitionDelay?: number;
  /** Effect while hovering: "lift" | "scale" | "press" | "tilt" | "ring" | "glow" | "shine" (default: none). */
  hoverEffect?: HoverEffect;
  /** Extra class names applied to the accordion's root element. */
  className?: string;
  /** Per-part class overrides (`root`) — merged after the built-in styling. */
  classNames?: {
    root?: string;
  };
}

export function Accordion({ children, transition, transitionDuration, transitionDelay, hoverEffect, className, classNames }: AccordionProps) {
  return (
    <div className={cx("divide-y divide-border rounded-lg border border-border overflow-hidden", motionClass(transition, hoverEffect), className, classNames?.root)} style={motionStyle(transitionDuration, transitionDelay)}>
      <slot>{children}</slot>
    </div>
  );
}
