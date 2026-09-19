import type { ReactNode } from "react";
import { cx } from "../../../core/tokens";

export type RadioGroupOrientation = "vertical" | "horizontal";

export interface RadioGroupProps {
  orientation?: RadioGroupOrientation;
  children?: ReactNode;
  className?: string;
  classNames?: {
    root?: string;
  };
}

// A pure layout wrapper — no state coordination. Native <input type="radio">
// elements already coordinate exclusivity via a shared `name` attribute, so
// consumers give each Radio in a group the same `name` prop themselves,
// exactly like plain HTML forms.
export function RadioGroup({ orientation = "vertical", children, className, classNames }: RadioGroupProps) {
  return (
    <div
      role="radiogroup"
      className={cx(orientation === "vertical" ? "flex flex-col gap-2" : "flex flex-wrap gap-4", className, classNames?.root)}
    >
      <slot>{children}</slot>
    </div>
  );
}
