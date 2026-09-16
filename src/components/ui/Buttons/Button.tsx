import { Loader2 } from "lucide-react";
import type { ReactNode, MouseEventHandler, CSSProperties } from "react";
import {
  colorClasses,
  destructiveClasses,
  defaultGradientPartner,
  GRADIENT_CLASSES,
  sizeClasses,
  iconOnlySizeClasses,
  iconSize,
  cx,
  shapeClasses,
  BASE_BUTTON_CLASSES,
  type ColorName,
  type ButtonVariant,
  type Size,
  type Shape,
} from "../../../core/tokens";
import { getIcon } from "../../../core/icons";

export interface ButtonProps {
  variant?: ButtonVariant;
  color?: ColorName;
  /** Second color for the gradient variant (defaults to a matching preset partner). */
  gradientTo?: ColorName;
  size?: Size;
  shape?: Shape;
  disabled?: boolean;
  loading?: boolean;
  /** Icon name, e.g. "settings" — see src/core/icons.ts for the available set. */
  icon?: string;
  /** Render as an icon-only button (no visible text) — label becomes the accessible name. */
  iconOnly?: boolean;
  iconPosition?: "left" | "right";
  /** Visible text (simple alternative to children) and the accessible name when iconOnly. */
  label?: string;
  /** Small overlay badge, e.g. a notification count. */
  badge?: ReactNode;
  children?: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  className?: string;
}

export function Button({
  variant = "solid",
  color = "slate",
  gradientTo,
  size = "md",
  shape = "default",
  disabled = false,
  loading = false,
  icon,
  iconOnly = false,
  iconPosition = "left",
  label,
  badge,
  children,
  onClick,
  type = "button",
  className,
}: ButtonProps) {
  // getIcon() always returns the same stable, module-level-imported
  // component reference for a given name, so this never actually causes a
  // remount — the lint rule can't verify that statically, hence the disable.
  const Icon = getIcon(icon);
  const base = BASE_BUTTON_CLASSES;

  let variantClass;
  let gradientStyle: CSSProperties | undefined;
  if (variant === "destructive") {
    variantClass = destructiveClasses.solid;
  } else if (variant === "destructive-soft") {
    variantClass = destructiveClasses.soft;
  } else if (variant === "destructive-outline") {
    variantClass = destructiveClasses.outline;
  } else if (variant === "gradient") {
    const toColor = gradientTo ?? defaultGradientPartner[color] ?? "violet";
    variantClass = GRADIENT_CLASSES;
    gradientStyle = {
      backgroundImage: `linear-gradient(to right, var(--color-${color}-600), var(--color-${toColor}-600))`,
    };
  } else if (variant === "glass") {
    const colorSet = colorClasses[color] || colorClasses.slate;
    variantClass = cx(colorSet.soft, "backdrop-blur-md border border-white/60 shadow-sm");
  } else {
    const colorSet = colorClasses[color] || colorClasses.slate;
    variantClass = colorSet[variant] || colorSet.solid;
  }

  const sizeClass = iconOnly ? iconOnlySizeClasses[size] : sizeClasses[size] || sizeClasses.md;
  const shapeClass = shapeClasses[shape] || "";
  const content = children ?? label;

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      style={gradientStyle}
      aria-label={iconOnly ? label : undefined}
      className={cx(base, className, variantClass, sizeClass, shapeClass, badge != null && "relative")}
    >
      {loading && <Loader2 size={iconSize[size]} className="animate-spin" />}
      {/* eslint-disable-next-line react-hooks/static-components -- see comment above `const Icon` */}
      {!loading && Icon && (iconOnly || iconPosition === "left") && <Icon size={iconSize[size]} />}
      {!iconOnly && <slot>{content}</slot>}
      {/* eslint-disable-next-line react-hooks/static-components -- see comment above `const Icon` */}
      {!loading && Icon && !iconOnly && iconPosition === "right" && <Icon size={iconSize[size]} />}
      {badge && (
        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-semibold text-white">
          {badge}
        </span>
      )}
    </button>
  );
}
