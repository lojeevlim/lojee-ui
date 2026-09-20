import type { LabelHTMLAttributes, ReactNode } from "react";
import { cx } from "../../../core/tokens";

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  children?: ReactNode;
  className?: string;
  /** Per-part class overrides — merged after (and win over) the built-in styling. */
  classNames?: { root?: string; required?: string };
}

export function Label({ required = false, children, className, classNames, ...rest }: LabelProps) {
  return (
    <label className={cx("block text-sm font-medium text-slate-700", className, classNames?.root)} {...rest}>
      <slot>{children}</slot>
      {required && (
        <span className={cx("ml-0.5 text-rose-500", classNames?.required)} aria-hidden="true">
          *
        </span>
      )}
    </label>
  );
}
