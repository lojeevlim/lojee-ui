import type { ReactNode } from "react";
import { colorClasses, cx, nonInteractive, solidBg, type ColorName } from "../../../core/tokens";
import { getIcon } from "../../../core/icons";

export type BadgeVariant = "solid" | "outline" | "soft";
export type BadgeSize = "sm" | "md" | "lg";

export interface BadgeProps {
  variant?: BadgeVariant;
  color?: ColorName;
  size?: BadgeSize;
  /** Icon name, e.g. "check" — see src/core/icons.ts for the available set. */
  icon?: string;
  /** Render as a small filled dot with no text — for minimal status indicators. */
  dot?: boolean;
  /** Visible text (simple alternative to children). */
  label?: string;
  children?: ReactNode;
  className?: string;
}

const SIZE_CLASSES: Record<BadgeSize, string> = {
  sm: "text-[11px] px-1.5 py-0.5 gap-1 rounded-md",
  md: "text-xs px-2 py-0.5 gap-1 rounded-md",
  lg: "text-sm px-2.5 py-1 gap-1.5 rounded-lg",
};

const ICON_PX: Record<BadgeSize, number> = { sm: 11, md: 12, lg: 14 };

const DOT_SIZE: Record<BadgeSize, string> = {
  sm: "h-1.5 w-1.5",
  md: "h-2 w-2",
  lg: "h-2.5 w-2.5",
};

export function Badge({
  variant = "soft",
  color = "slate",
  size = "md",
  icon,
  dot = false,
  label,
  children,
  className,
}: BadgeProps) {
  const colorSet = colorClasses[color] || colorClasses.slate;

  if (dot) {
    return (
      <span
        className={cx("inline-block rounded-full", solidBg(colorSet.solid), DOT_SIZE[size], className)}
        role={label ? "status" : undefined}
        aria-label={label}
      />
    );
  }

  // getIcon() always returns the same stable, module-level-imported
  // component reference for a given name, so this never actually causes a
  // remount — the lint rule can't verify that statically, hence the disable.
  const Icon = getIcon(icon);
  const variantClass = nonInteractive(colorSet[variant] || colorSet.soft);
  const content = children ?? label;

  return (
    <span
      className={cx(
        "inline-flex items-center font-medium whitespace-nowrap",
        variantClass,
        SIZE_CLASSES[size],
        className
      )}
    >
      {/* eslint-disable-next-line react-hooks/static-components -- see comment above `const Icon` */}
      {Icon && <Icon size={ICON_PX[size]} />}
      <slot>{content}</slot>
    </span>
  );
}
