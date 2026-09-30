import type { ReactNode } from "react";
import { cx } from "../../../core/tokens";

export type ListVariant = "plain" | "divided" | "bordered";

export interface ListProps {
  /** Renders an <ol> instead of a <ul> (default: false). */
  ordered?: boolean;
  /** Row styling: "plain" (default) | "divided" (dividers between rows) | "bordered" (dividers plus a rounded outer border). */
  variant?: ListVariant;
  /** List rows, typically ListItem elements. */
  children?: ReactNode;
  /** Extra class name(s) applied to the root element. */
  className?: string;
  /** Per-part class overrides — merged after (and win over) the built-in styling. */
  classNames?: {
    root?: string;
  };
}

const VARIANT_CLASSES: Record<ListVariant, string> = {
  plain: "",
  divided: "divide-y divide-border",
  bordered: "divide-y divide-border rounded-lg border border-border overflow-hidden",
};

export function List({ ordered = false, variant = "plain", children, className, classNames }: ListProps) {
  const Tag = ordered ? "ol" : "ul";
  return (
    <Tag className={cx("list-none", VARIANT_CLASSES[variant], className, classNames?.root)}>
      <slot>{children}</slot>
    </Tag>
  );
}
