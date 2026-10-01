// Shared "attention animation" support for Button, Badge, Avatar, Card, Alert, Stat and ProfileCard.
// The keyframes and overlay styles live in theme.css (`.lojee-anim-*`); this file only maps the
// `animated` / `pulseColor` / `pulseGradientTo` props onto class names, CSS variables and overlay spans.

import type { CSSProperties } from "react";
import { isColorName } from "./tokens";

export const ANIMATED_VARIANTS = ["glow", "pulse", "sweep", "bounce", "float", "wiggle", "border-spin"] as const;
export type AnimatedVariant = (typeof ANIMATED_VARIANTS)[number];

const ROOT_CLASS: Record<AnimatedVariant, string> = {
  glow: "lojee-anim-glow",
  pulse: "relative",
  sweep: "relative",
  bounce: "lojee-anim-bounce",
  float: "lojee-anim-float",
  wiggle: "lojee-anim-wiggle",
  "border-spin": "relative",
};

const toCssColor = (c: string) => (isColorName(c) ? `var(--color-${c}-500)` : c);

/** Class names to add to the animated element's root. */
export function animatedClass(variant?: AnimatedVariant): string | undefined {
  return variant ? ROOT_CLASS[variant] : undefined;
}

/** CSS variables carrying the animation colors; `fallback` is the component's own color. Merge into the root's `style`. */
export function animatedStyle(
  variant: AnimatedVariant | undefined,
  fallback: string,
  pulseColor?: string,
  pulseGradientTo?: string
): CSSProperties | undefined {
  if (!variant) return undefined;
  const from = toCssColor(pulseColor ?? fallback);
  return {
    "--lojee-anim-from": from,
    "--lojee-anim-to": pulseGradientTo ? toCssColor(pulseGradientTo) : from,
  } as CSSProperties;
}
