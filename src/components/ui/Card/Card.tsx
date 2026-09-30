import type { ReactNode } from "react";
import { cx } from "../../../core/tokens";

export type CardVariant = "outline" | "elevated" | "soft" | "ghost";
export type CardPadding = "none" | "sm" | "md" | "lg";

export interface CardProps {
  /** "outline" | "elevated" | "soft" | "ghost" — border, shadow, muted background or no chrome (default: "outline"). */
  variant?: CardVariant;
  /** Inner spacing: "none" | "sm" | "md" | "lg" (default: "md"). */
  padding?: CardPadding;
  /** Adds a hover shadow (and stronger border on the outline variant) for clickable cards (default: false). */
  hoverable?: boolean;
  /** Optional heading rendered above the body. */
  title?: ReactNode;
  /** Optional content rendered below the body, separated by a top border. */
  footer?: ReactNode;
  /** The card's body content. */
  children?: ReactNode;
  /** Extra class names applied to the root element. */
  className?: string;
  /** Per-part class overrides (`root`, `title`, `body`, `footer`) — merged after the built-in styling. */
  classNames?: { root?: string; title?: string; body?: string; footer?: string };
}

const VARIANT_CLASSES: Record<CardVariant, string> = {
  outline: "border border-border bg-surface",
  elevated: "bg-surface shadow-md",
  soft: "bg-surface-muted",
  ghost: "bg-transparent",
};

const PADDING_CLASSES: Record<CardPadding, string> = {
  none: "p-0",
  sm: "p-3",
  md: "p-5",
  lg: "p-8",
};

export function Card({
  variant = "outline",
  padding = "md",
  hoverable = false,
  title,
  footer,
  children,
  className,
  classNames,
}: CardProps) {
  return (
    <div
      className={cx(
        "rounded-xl",
        VARIANT_CLASSES[variant],
        PADDING_CLASSES[padding],
        hoverable && "transition-shadow hover:shadow-lg",
        hoverable && variant === "outline" && "hover:border-border-strong",
        className,
        classNames?.root
      )}
    >
      {title != null && <h3 className={cx("text-base font-semibold text-fg mb-2", classNames?.title)}>{title}</h3>}
      <div className={classNames?.body}>
        <slot>{children}</slot>
      </div>
      {footer != null && (
        <div className={cx("border-t border-border mt-4 pt-4", classNames?.footer)}>{footer}</div>
      )}
    </div>
  );
}
