import type { ReactNode } from "react";
import { cx } from "../../../core/tokens";

export type CardVariant = "outline" | "elevated" | "soft" | "ghost";
export type CardPadding = "none" | "sm" | "md" | "lg";

export interface CardProps {
  variant?: CardVariant;
  padding?: CardPadding;
  hoverable?: boolean;
  title?: ReactNode;
  footer?: ReactNode;
  children?: ReactNode;
  className?: string;
  classNames?: { root?: string; title?: string; body?: string; footer?: string };
}

const VARIANT_CLASSES: Record<CardVariant, string> = {
  outline: "border border-slate-200 bg-white",
  elevated: "bg-white shadow-md",
  soft: "bg-slate-50",
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
        hoverable && variant === "outline" && "hover:border-slate-300",
        className,
        classNames?.root
      )}
    >
      {title != null && <h3 className={cx("text-base font-semibold text-slate-900 mb-2", classNames?.title)}>{title}</h3>}
      <div className={classNames?.body}>
        <slot>{children}</slot>
      </div>
      {footer != null && (
        <div className={cx("border-t border-slate-200 mt-4 pt-4", classNames?.footer)}>{footer}</div>
      )}
    </div>
  );
}
