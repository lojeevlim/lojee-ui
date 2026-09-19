import type { ReactNode } from "react";
import { cx, shapeClasses, type Shape } from "../../../core/tokens";

export interface ButtonGroupProps {
  children: ReactNode;
  /**
   * Corner treatment for the whole group (default keeps the built-in
   * rounded-lg look). Individual segments stay square themselves — the
   * group's outer container does the rounding, via `overflow-hidden`.
   */
  shape?: Shape;
  className?: string;
  /** Per-part class overrides — merged after (and win over) the built-in styling. */
  classNames?: {
    root?: string;
  };
}

export function ButtonGroup({ children, shape = "default", className, classNames }: ButtonGroupProps) {
  return (
    <div
      className={cx(
        "inline-flex rounded-lg border border-slate-200 overflow-hidden divide-x divide-slate-200",
        shapeClasses[shape],
        className,
        classNames?.root
      )}
    >
      <slot>{children}</slot>
    </div>
  );
}
