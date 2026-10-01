import type { ReactNode } from "react";
import { cx } from "../../../core/tokens";
import { motionClass, motionStyle, type TransitionVariant } from "../../../core/motion";

export type ListVariant = "plain" | "divided" | "bordered";

export interface ListProps {
  /** Renders an <ol> instead of a <ul> (default: false). */
  ordered?: boolean;
  /** Row styling: "plain" (default) | "divided" (dividers between rows) | "bordered" (dividers plus a rounded outer border). */
  variant?: ListVariant;
  /** Enter transition: "fade" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "zoom" | "zoom-out" | "flip" | "blur" | "bounce" | "rotate" | "drop" | "skew" (default: none). Respects `prefers-reduced-motion`. */
  transition?: TransitionVariant;
  /** Enter transition duration in ms (default: 450). */
  transitionDuration?: number;
  /** Delay before the enter transition starts, in ms (default: 0) — handy for staggering. */
  transitionDelay?: number;
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

export function List({ ordered = false, variant = "plain", children, className, classNames, transition, transitionDuration, transitionDelay }: ListProps) {
  const Tag = ordered ? "ol" : "ul";
  return (
    <Tag
      className={cx("list-none", VARIANT_CLASSES[variant], motionClass(transition), className, classNames?.root)}
      style={motionStyle(transitionDuration, transitionDelay)}
    >
      <slot>{children}</slot>
    </Tag>
  );
}
