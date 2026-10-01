import type { ReactNode } from "react";
import { cx, type ColorName } from "../../../core/tokens";
import { animatedClass, animatedStyle, type AnimatedVariant } from "../../../core/animated";
import { motionClass, motionStyle, type TransitionVariant, type HoverEffect } from "../../../core/motion";
import { AnimatedOverlay } from "../../../core/AnimatedOverlay";

export type CardVariant = "outline" | "elevated" | "soft" | "ghost";
export type CardPadding = "none" | "sm" | "md" | "lg";

export interface CardProps {
  /** Attention animation: "glow" | "pulse" | "sweep" | "bounce" | "float" | "wiggle" | "border-spin" (default: none). Respects `prefers-reduced-motion`. */
  animated?: AnimatedVariant;
  /** Color of the animation (pulse ring, glow, spinning border): a `ColorName` or any CSS color (default: the component's own color). */
  pulseColor?: ColorName | (string & {});
  /** Second color — turns the pulse ring and spinning border into a gradient from `pulseColor` to this (default: solid `pulseColor`). */
  pulseGradientTo?: ColorName | (string & {});
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
  /** Enter transition: "fade" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "zoom" | "zoom-out" | "flip" | "blur" | "bounce" | "rotate" | "drop" | "skew" (default: none). Respects `prefers-reduced-motion`. */
  transition?: TransitionVariant;
  /** Enter transition duration in ms (default: 450). */
  transitionDuration?: number;
  /** Delay before the enter transition starts, in ms (default: 0) — handy for staggering a row of cards. */
  transitionDelay?: number;
  /** Effect while hovering: "lift" | "scale" | "press" | "tilt" | "ring" | "glow" | "shine" (default: none). */
  hoverEffect?: HoverEffect;
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
  animated,
  pulseColor,
  pulseGradientTo,
  transition,
  transitionDuration,
  transitionDelay,
  hoverEffect,
}: CardProps) {
  return (
    <div
      className={cx(
        "rounded-xl",
        VARIANT_CLASSES[variant],
        PADDING_CLASSES[padding],
        hoverable && "transition-shadow hover:shadow-lg",
        hoverable && variant === "outline" && "hover:border-border-strong",
        animatedClass(animated),
        motionClass(transition, hoverEffect),
        className,
        classNames?.root
      )}
      style={{ ...animatedStyle(animated, "accent", pulseColor, pulseGradientTo), ...motionStyle(transitionDuration, transitionDelay) }}
    >
      {title != null && <h3 className={cx("text-base font-semibold text-fg mb-2", classNames?.title)}>{title}</h3>}
      <div className={classNames?.body}>
        <slot>{children}</slot>
      </div>
      {footer != null && (
        <div className={cx("border-t border-border mt-4 pt-4", classNames?.footer)}>{footer}</div>
      )}
      <AnimatedOverlay variant={animated} />
    </div>
  );
}
