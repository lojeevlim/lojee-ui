import type { ReactNode } from "react";
import { cx } from "../../../core/tokens";

export type GridCols = 1 | 2 | 3 | 4 | 6 | 12;
export type GridGap = "sm" | "md" | "lg";

export interface GridProps {
  cols?: GridCols;
  gap?: GridGap;
  children?: ReactNode;
  className?: string;
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

export function Grid({ cols = 3, gap = "md", children, className, classNames }: GridProps) {
  return (
    <div className={cx("grid", COLS_CLASSES[cols], GAP_CLASSES[gap], className, classNames?.root)}>
      <slot>{children}</slot>
    </div>
  );
}
