import type { ReactNode } from "react";
import { cx } from "../../../core/tokens";
import { motionClass, motionStyle, type TransitionVariant } from "../../../core/motion";

export type GridCols = 1 | 2 | 3 | 4 | 6 | 12;
export type GridGap = "sm" | "md" | "lg";

export interface GridProps {
  /** Number of columns at the widest breakpoint (1, 2, 3, 4, 6 or 12); fewer columns are used on narrow screens. Defaults to 3. */
  cols?: GridCols;
  /** Spacing between cells: "sm" | "md" | "lg". Defaults to "md". */
  gap?: GridGap;
  /** Enter transition: "fade" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "zoom" | "zoom-out" | "flip" | "blur" | "bounce" | "rotate" | "drop" | "skew" (default: none). Respects `prefers-reduced-motion`. */
  transition?: TransitionVariant;
  /** Enter transition duration in ms (default: 450). */
  transitionDuration?: number;
  /** Delay before the enter transition starts, in ms (default: 0) — handy for staggering. */
  transitionDelay?: number;
  /** Grid cells. */
  children?: ReactNode;
  /** Extra class name(s) applied to the root element. */
  className?: string;
  /** Per-part class overrides — merged after (and win over) the built-in styling. */
  classNames?: { root?: string };
}

const COLS_CLASSES: Record<GridCols, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
  4: "grid-cols-2 md:grid-cols-4",
  6: "grid-cols-2 sm:grid-cols-3 md:grid-cols-6",
  12: "grid-cols-4 sm:grid-cols-6 md:grid-cols-12",
};

const GAP_CLASSES: Record<GridGap, string> = {
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-6",
};

export function Grid({ cols = 3, gap = "md", children, className, classNames, transition, transitionDuration, transitionDelay }: GridProps) {
  return (
    <div
      className={cx("grid", COLS_CLASSES[cols], GAP_CLASSES[gap], motionClass(transition), className, classNames?.root)}
      style={motionStyle(transitionDuration, transitionDelay)}
    >
      <slot>{children}</slot>
    </div>
  );
}
