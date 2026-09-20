import type { ReactNode } from "react";
import { cx } from "../../../core/tokens";

export type ListVariant = "plain" | "divided" | "bordered";

export interface ListProps {
  ordered?: boolean;
  variant?: ListVariant;
  children?: ReactNode;
  className?: string;
  classNames?: {
    root?: string;
  };
}

const VARIANT_CLASSES: Record<ListVariant, string> = {
  plain: "",
  divided: "divide-y divide-slate-200",
  bordered: "divide-y divide-slate-200 rounded-lg border border-slate-200 overflow-hidden",
};

export function List({ ordered = false, variant = "plain", children, className, classNames }: ListProps) {
  const Tag = ordered ? "ol" : "ul";
  return (
    <Tag className={cx("list-none", VARIANT_CLASSES[variant], className, classNames?.root)}>
      <slot>{children}</slot>
    </Tag>
  );
}
