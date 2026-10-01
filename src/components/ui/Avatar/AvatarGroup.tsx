import type { ReactNode } from "react";
import { cx } from "../../../core/tokens";
import { motionClass, motionStyle, type TransitionVariant } from "../../../core/motion";

export interface AvatarGroupProps {
  /** The `Avatar` elements to display, overlapped in a row. */
  children: ReactNode;
  /** Enter transition: "fade" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "zoom" | "zoom-out" | "flip" | "blur" | "bounce" | "rotate" | "drop" | "skew" (default: none). Respects `prefers-reduced-motion`. */
  transition?: TransitionVariant;
  /** Enter transition duration in ms (default: 450). */
  transitionDuration?: number;
  /** Delay before the enter transition starts, in ms (default: 0) — handy for staggering. */
  transitionDelay?: number;
  /** Extra class names applied to the root element. */
  className?: string;
  /** Per-part class overrides — merged after (and win over) the built-in styling. */
  classNames?: {
    root?: string;
  };
}

// Pure CSS overlap (negative margin + a white ring on each direct child) —
// no JS inspection of `children`, so it works unmodified once wrapped as a
// Web Component (r2wc doesn't forward `children`; content arrives via the
// native <slot> instead, same as ButtonGroup).
export function AvatarGroup({ children, className, classNames, transition, transitionDuration, transitionDelay }: AvatarGroupProps) {
  return (
    <div
      className={cx("flex -space-x-2 [&>*]:ring-2 [&>*]:ring-surface", motionClass(transition), className, classNames?.root)}
      style={motionStyle(transitionDuration, transitionDelay)}
    >
      <slot>{children}</slot>
    </div>
  );
}
