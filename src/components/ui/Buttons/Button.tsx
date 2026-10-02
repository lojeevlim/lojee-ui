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
  isColorName,
  customButtonStyle,
  shapeClasses,
  BASE_BUTTON_CLASSES,
  type ColorName,
  type ButtonVariant,
  type Size,
  type Shape,
} from "../../../core/tokens";
import { getIcon } from "../../../core/icons";
import { animatedClass, animatedStyle, type AnimatedVariant } from "../../../core/animated";
import { AnimatedOverlay } from "../../../core/AnimatedOverlay";
import { motionClass, motionStyle, type TransitionVariant, type HoverEffect } from "../../../core/motion";

export interface ButtonProps {
  /** Attention animation: "glow" | "pulse" | "sweep" | "bounce" | "float" | "wiggle" | "border-spin" (default: none). Respects `prefers-reduced-motion`. */
  animated?: AnimatedVariant;
  /** Color of the animation (pulse ring, glow, spinning border): a `ColorName` or any CSS color (default: the component's own color). */
  pulseColor?: ColorName | (string & {});
  /** Second color — turns the pulse ring and spinning border into a gradient from `pulseColor` to this (default: solid `pulseColor`). */
  pulseGradientTo?: ColorName | (string & {});
  /** Visual style: "solid", "outline", "ghost", "soft", "link", "dashed", "destructive", "destructive-soft", "destructive-outline", "gradient" or "glass" (default: "solid"). */
  variant?: ButtonVariant;
  /** Button color: a built-in `ColorName` (default: "accent", which follows the theme accent) or any CSS color such as "#8b5cf6"; ignored by the destructive variants. */
  color?: ColorName | (string & {});
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
  /** Enter transition: "fade" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "zoom" | "zoom-out" | "flip" | "blur" | "bounce" | "rotate" | "drop" | "skew" (default: none). Respects `prefers-reduced-motion`. */
  transition?: TransitionVariant;
  /** Enter transition duration in ms (default: 450). */
  transitionDuration?: number;
  /** Delay before the enter transition starts, in ms (default: 0) — handy for staggering. */
  transitionDelay?: number;
  /** Effect while hovering: "lift" | "scale" | "press" | "tilt" | "ring" | "glow" | "shine" (default: none). */
  hoverEffect?: HoverEffect;
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
  animated,
  pulseColor,
  pulseGradientTo,
  transition,
  transitionDuration,
  transitionDelay,
  hoverEffect,
}: ButtonProps) {
  // getIcon() always returns the same stable, module-level-imported
  // component reference for a given name, so this never actually causes a
  // remount — the lint rule can't verify that statically, hence the disable.
  const Icon = getIcon(icon);
  const base = BASE_BUTTON_CLASSES;

  let variantClass;
  let gradientStyle: CSSProperties | undefined;
  const custom = !isColorName(color) && !variant.startsWith("destructive");
  if (custom) {
    // Any CSS color: a few inline variables plus literal classes (see customButtonStyle).
    const c = customButtonStyle(variant, color);
    variantClass = variant === "gradient" ? cx(GRADIENT_CLASSES, c.className) : c.className;
    gradientStyle = c.style;
  } else if (variant === "destructive") {
    variantClass = destructiveClasses.solid;
  } else if (variant === "destructive-soft") {
    variantClass = destructiveClasses.soft;
  } else if (variant === "destructive-outline") {
    variantClass = destructiveClasses.outline;
  } else if (variant === "gradient") {
    const named = color as ColorName;
    const toColor = gradientTo ?? defaultGradientPartner[named] ?? "violet";
    variantClass = GRADIENT_CLASSES;
    gradientStyle = {
      backgroundImage: `linear-gradient(to right, var(--color-${named}-600), var(--color-${toColor}-600))`,
    };
  } else if (variant === "glass") {
    const colorSet = colorClasses[color as ColorName] || colorClasses.slate;
    variantClass = cx(colorSet.soft, "backdrop-blur-md border border-white/60 dark:border-white/10 shadow-sm");
  } else {
    const colorSet = colorClasses[color as ColorName] || colorClasses.slate;
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
      style={{ ...gradientStyle, ...animatedStyle(animated, color, pulseColor, pulseGradientTo), ...motionStyle(transitionDuration, transitionDelay) }}
      aria-label={iconOnly ? label : undefined}
      aria-haspopup={ariaHaspopup}
      aria-expanded={ariaExpanded}
      className={cx(base, variantClass, sizeClass, shapeClass, badge != null && "relative", animatedClass(animated), motionClass(transition, hoverEffect), className, classNames?.root)}
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
      <AnimatedOverlay variant={animated} />
    </button>
  );
}
