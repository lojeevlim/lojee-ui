import type { ReactNode } from "react";
import { cx } from "../../../core/tokens";

export type RadioGroupOrientation = "vertical" | "horizontal";

export interface RadioGroupProps {
  /** Stacking direction of the radios: "vertical" (default) or "horizontal" (wraps). */
  orientation?: RadioGroupOrientation;
  /** The `Radio` elements to lay out; give each the same `name` so the browser makes them mutually exclusive. */
  children?: ReactNode;
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
