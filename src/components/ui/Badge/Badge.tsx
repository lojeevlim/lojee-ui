import type { ReactNode } from "react";
import { colorClasses, cx, nonInteractive, solidBg, type ColorName } from "../../../core/tokens";
import { getIcon } from "../../../core/icons";
import { animatedClass, animatedStyle, type AnimatedVariant } from "../../../core/animated";
import { AnimatedOverlay } from "../../../core/AnimatedOverlay";
import { motionClass, motionStyle, type TransitionVariant, type HoverEffect } from "../../../core/motion";

export type BadgeVariant = "solid" | "outline" | "soft";
export type BadgeSize = "sm" | "md" | "lg";

export interface BadgeProps {
  /** Attention animation: "glow" | "pulse" | "sweep" | "bounce" | "float" | "wiggle" | "border-spin" (default: none). Respects `prefers-reduced-motion`. */
  animated?: AnimatedVariant;
  /** Color of the animation (pulse ring, glow, spinning border): a `ColorName` or any CSS color (default: the component's own color). */
  pulseColor?: ColorName | (string & {});
  /** Second color — turns the pulse ring and spinning border into a gradient from `pulseColor` to this (default: solid `pulseColor`). */
  pulseGradientTo?: ColorName | (string & {});
  /** Enter transition: "fade" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "zoom" | "zoom-out" | "flip" | "blur" | "bounce" | "rotate" | "drop" | "skew" (default: none). Respects `prefers-reduced-motion`. */
  transition?: TransitionVariant;
  /** Enter transition duration in ms (default: 450). */
  transitionDuration?: number;
  /** Delay before the enter transition starts, in ms (default: 0) — handy for staggering. */
  transitionDelay?: number;
  /** Effect while hovering: "lift" | "scale" | "press" | "tilt" | "ring" | "glow" | "shine" (default: none). */
  hoverEffect?: HoverEffect;
  /** "solid" | "outline" | "soft" — filled, bordered or tinted look (default: "soft"). */
  variant?: BadgeVariant;
  /** Badge color, one of the built-in `ColorName`s (default: "accent", which follows the theme accent). */
  color?: ColorName;
  /** "sm" | "md" | "lg" (default: "md"). */
  size?: BadgeSize;
  /** Icon name, e.g. "check" — see src/core/icons.ts for the available set. */
  icon?: string;
  /** Render as a small filled dot with no text — for minimal status indicators. */
  dot?: boolean;
  /** Visible text (simple alternative to children). */
  label?: string;
  /** Badge content; takes precedence over `label` when both are given. */
  children?: ReactNode;
  /** Extra class names applied to the root element. */
  className?: string;
  /** Per-part class overrides — merged after (and win over) the built-in styling. */
  classNames?: {
    root?: string;
    icon?: string;
  };
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
  color = "accent",
  size = "md",
  icon,
  dot = false,
  label,
  children,
  className,
  classNames,
  animated,
  pulseColor,
  pulseGradientTo,
  transition,
  transitionDuration,
  transitionDelay,
  hoverEffect,
}: BadgeProps) {
  const colorSet = colorClasses[color] || colorClasses.slate;

  if (dot) {
    return (
      <span
        className={cx(
          "inline-block rounded-full",
          solidBg(colorSet.solid),
          DOT_SIZE[size],
          animatedClass(animated),
          motionClass(transition, hoverEffect),
          className,
          classNames?.root
        )}
        style={{ ...animatedStyle(animated, color, pulseColor, pulseGradientTo), ...motionStyle(transitionDuration, transitionDelay) }}
        data-badge="dot"
        role={label ? "status" : undefined}
        aria-label={label}
      >
        <AnimatedOverlay variant={animated} />
      </span>
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
        animatedClass(animated),
        motionClass(transition, hoverEffect),
        className,
        classNames?.root
      )}
      style={{ ...animatedStyle(animated, color, pulseColor, pulseGradientTo), ...motionStyle(transitionDuration, transitionDelay) }}
      data-badge={variant}
    >
      {/* eslint-disable-next-line react-hooks/static-components -- see comment above `const Icon` */}
      {Icon && <Icon size={ICON_PX[size]} className={classNames?.icon} />}
      <slot>{content}</slot>
      <AnimatedOverlay variant={animated} />
    </span>
  );
}
