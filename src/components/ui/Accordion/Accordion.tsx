import type { ReactNode } from "react";
import { cx } from "../../../core/tokens";

export interface AccordionProps {
  /** The `AccordionItem` elements to render, stacked in a single bordered container. */
  children?: ReactNode;
  /** Extra class names applied to the accordion's root element. */
  className?: string;
  /** Per-part class overrides (`root`) — merged after the built-in styling. */
  classNames?: {
    root?: string;
  };
}

export function Accordion({ children, className, classNames }: AccordionProps) {
  return (
    <div className={cx("divide-y divide-border rounded-lg border border-border overflow-hidden", className, classNames?.root)}>
      <slot>{children}</slot>
    </div>
  );
}
