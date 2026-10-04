import type { ReactNode } from "react";
import { ListItem } from "./ListItem";
import { cx } from "../../../core/tokens";
import { motionClass, motionStyle, type TransitionVariant } from "../../../core/motion";

export type ListVariant = "plain" | "divided" | "bordered";

/** One row of a List's `items` — a plain string, or an object with the row's label and optional icon. */
export type ListItemSpec = string | { label: ReactNode; icon?: string };

export interface ListProps {
  /** Renders an <ol> instead of a <ul> (default: false). */
  ordered?: boolean;
  /** Row styling: "plain" (default) | "divided" (dividers between rows) | "bordered" (dividers plus a rounded outer border). */
  variant?: ListVariant;
  /** Content of a gray header bar above the rows (a title, a count, a button …) — no column labels. When set, the list is drawn as one rounded, bordered card with the header on top. */
  header?: ReactNode;
  /** Enter transition: "fade" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "zoom" | "zoom-out" | "flip" | "blur" | "bounce" | "rotate" | "drop" | "skew" (default: none). Respects `prefers-reduced-motion`. */
  transition?: TransitionVariant;
  /** Enter transition duration in ms (default: 450). */
  transitionDuration?: number;
  /** Delay before the enter transition starts, in ms (default: 0) — handy for staggering. */
  transitionDelay?: number;
  /** Rows as data — `["Overview", "Settings"]` or `[{ label: "Overview", icon: "home" }, …]` — instead of ListItem children; works the same in React and as a Web Component (`items` property / JSON attribute). Rendered before any `children`. */
  items?: ListItemSpec[];
  /** List rows, typically ListItem elements. */
  children?: ReactNode;
  /** Extra class name(s) applied to the root element. */
  className?: string;
  /** Per-part class overrides — merged after (and win over) the built-in styling. */
  classNames?: {
    root?: string;
    header?: string;
    list?: string;
  };
}

const VARIANT_CLASSES: Record<ListVariant, string> = {
  plain: "",
  divided: "divide-y divide-border",
  bordered: "divide-y divide-border rounded-xl border border-border overflow-hidden",
};

function rows(items?: ListItemSpec[]) {
  return items?.map((it, i) => (typeof it === "string" ? <ListItem key={i}>{it}</ListItem> : <ListItem key={i} icon={it.icon}>{it.label}</ListItem>));
}

export function List({ ordered = false, variant = "plain", header, items, children, className, classNames, transition, transitionDuration, transitionDelay }: ListProps) {
  const Tag = ordered ? "ol" : "ul";
  if (header != null) {
    return (
      <div
        className={cx("overflow-hidden rounded-xl border border-border bg-surface", motionClass(transition), className, classNames?.root)}
        style={motionStyle(transitionDuration, transitionDelay)}
      >
        <div className={cx("border-b border-border bg-surface-muted px-3 py-2 text-xs font-medium uppercase tracking-wide text-fg-subtle", classNames?.header)}>
          <slot name="header">{header}</slot>
        </div>
        <Tag className={cx("list-none divide-y divide-border", classNames?.list)}>
          {rows(items)}
          <slot>{children}</slot>
        </Tag>
      </div>
    );
  }
  return (
    <Tag
      className={cx("list-none", VARIANT_CLASSES[variant], motionClass(transition), className, classNames?.root)}
      style={motionStyle(transitionDuration, transitionDelay)}
    >
      {rows(items)}
      <slot>{children}</slot>
    </Tag>
  );
}
