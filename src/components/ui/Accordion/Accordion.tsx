import type { ReactNode } from "react";
import { cx } from "../../../core/tokens";

export interface AccordionProps {
  children?: ReactNode;
  className?: string;
  classNames?: {
    root?: string;
  };
}

export function Accordion({ children, className, classNames }: AccordionProps) {
  return (
    <div className={cx("divide-y divide-slate-200 rounded-lg border border-slate-200 overflow-hidden", className, classNames?.root)}>
      <slot>{children}</slot>
    </div>
  );
}
