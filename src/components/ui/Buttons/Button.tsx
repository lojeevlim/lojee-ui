import { Loader2 } from "lucide-react";
import type { AriaAttributes, ReactNode, MouseEventHandler, CSSProperties } from "react";
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
  /** Visual style: "solid", "outline", "ghost", "soft", "link", "dashed", "destructive", "destructive-soft", "destructive-outline", "gradient" or "glass" (default: "solid"). */
  variant?: ButtonVariant;
  /** Button color, one of the built-in `ColorName`s (default: "accent", which follows the theme accent); ignored by the destructive variants. */
  color?: ColorName;
  /** Second color for the gradient variant (defaults to a matching preset partner). */
  gradientTo?: ColorName;
  /** "xs" | "sm" | "md" | "lg" | "xl" | "full" (full width) (default: "md"). */
  size?: Size;
  /** "default" (size-based rounding), "pill" or "square" (default: "default"). */
  shape?: Shape;
  /** Disables the button and dims it (default: false). */
  disabled?: boolean;
  /** Shows a spinner in place of the icon and disables the button while true (default: false). */
  loading?: boolean;
  /** Icon name, e.g. "settings" — see src/core/icons.ts for the available set. */
  icon?: string;
  /** Render as an icon-only button (no visible text) — label becomes the accessible name. */
  iconOnly?: boolean;
  /** Which side of the text the icon appears on: "left" or "right" (default: "left"); ignored when `iconOnly`. */
  iconPosition?: "left" | "right";
  /** Visible text (simple alternative to children) and the accessible name when iconOnly. */
  label?: string;
  /** Small overlay badge, e.g. a notification count. */
  badge?: ReactNode;
  /** Button content; takes precedence over `label` when both are given. */
  children?: ReactNode;
  /** Called with the click event when the button is clicked (not fired while disabled or loading). */
  onClick?: MouseEventHandler<HTMLButtonElement>;
  /** Native button type: "button", "submit" or "reset" (default: "button"). */
  type?: "button" | "submit" | "reset";
  /** For a button that toggles a disclosure (menu, listbox, etc.) it doesn't own itself. */
  "aria-haspopup"?: AriaAttributes["aria-haspopup"];
  /** Whether the disclosure this button controls is currently open (controlled by the parent). */
  "aria-expanded"?: boolean;
  /** Extra class names applied to the button element. */
  className?: string;
  /** Per-part class overrides — merged after (and win over) the built-in styling. */
  classNames?: {
    root?: string;
    icon?: string;
    badge?: string;
  };
}

export function Button({
  variant = "solid",
  color = "accent",
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
  "aria-haspopup": ariaHaspopup,
  "aria-expanded": ariaExpanded,
  className,
  classNames,
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
    variantClass = cx(colorSet.soft, "backdrop-blur-md border border-white/60 dark:border-white/10 shadow-sm");
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
      aria-haspopup={ariaHaspopup}
      aria-expanded={ariaExpanded}
      className={cx(base, variantClass, sizeClass, shapeClass, badge != null && "relative", className, classNames?.root)}
    >
      {loading && <Loader2 size={iconSize[size]} className="animate-spin" />}
      {/* eslint-disable-next-line react-hooks/static-components -- see comment above `const Icon` */}
      {!loading && Icon && (iconOnly || iconPosition === "left") && <Icon size={iconSize[size]} className={classNames?.icon} />}
      {!iconOnly && <slot>{content}</slot>}
      {/* eslint-disable-next-line react-hooks/static-components -- see comment above `const Icon` */}
      {!loading && Icon && !iconOnly && iconPosition === "right" && <Icon size={iconSize[size]} className={classNames?.icon} />}
      {badge && (
        <span
          className={cx(
            "absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-semibold text-white",
            classNames?.badge
          )}
        >
          {badge}
        </span>
      )}
    </button>
  );
}
