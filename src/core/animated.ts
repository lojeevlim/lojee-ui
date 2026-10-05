// Shared "attention animation" support for Button, Badge, Avatar, Card, Alert, Stat and ProfileCard.
// The keyframes and overlay styles live in theme.css (`.lojee-anim-*`); this file only maps the
// `animation` / `pulseColor` / `pulseGradientTo` props onto class names, CSS variables and overlay spans.
//
// `animation` takes one effect or several to combine: `animation="particles"`, `animation={["particles", "tail", "pulse"]}`,
// or on a web component a list in one attribute — `animation="particles tail pulse"` (spaces, commas or "+" all work).

import type { CSSProperties } from "react";
import { isColorName } from "./tokens";

export const ANIMATED_VARIANTS = ["glow", "pulse", "sweep", "bounce", "float", "wiggle", "border-spin", "particles", "tail"] as const;
export type AnimatedVariant = (typeof ANIMATED_VARIANTS)[number];
/** One effect, a list of effects to combine, or (for web components) a delimited string such as "particles tail". */
export type AnimatedProp = AnimatedVariant | readonly AnimatedVariant[] | (string & {});

/** Effects that animate the element itself — only one can run at a time (the first listed wins). */
const ROOT_ANIMATIONS: Partial<Record<AnimatedVariant, string>> = {
  glow: "lojee-anim-glow",
  bounce: "lojee-anim-bounce",
  float: "lojee-anim-float",
  wiggle: "lojee-anim-wiggle",
};

/** Effects drawn by an extra overlay element — these stack freely with each other and with one element animation. */
const OVERLAY_VARIANTS: readonly AnimatedVariant[] = ["pulse", "sweep", "border-spin", "particles", "tail"];

const toCssColor = (c: string) => (isColorName(c) ? `var(--color-${c}-500)` : c);

/** Normalizes the `animation` prop to a de-duplicated list of known effects. */
export function parseAnimated(prop?: AnimatedProp): AnimatedVariant[] {
  if (!prop) return [];
  const parts = typeof prop === "string" ? prop.split(/[\s,+]+/) : [...prop];
  const known = parts.filter((p): p is AnimatedVariant => (ANIMATED_VARIANTS as readonly string[]).includes(p));
  return [...new Set(known)];
}

/** Class names to add to the animated element's root. */
export function animatedClass(prop?: AnimatedProp): string | undefined {
  const list = parseAnimated(prop);
  if (!list.length) return undefined;
  const root = list.map((v) => ROOT_ANIMATIONS[v]).find(Boolean);
  const overlay = list.some((v) => OVERLAY_VARIANTS.includes(v));
  return [root, overlay ? "relative" : undefined].filter(Boolean).join(" ") || undefined;
}

/** CSS variables carrying the animation colors; `fallback` is the component's own color. Merge into the root's `style`. */
export function animatedStyle(
  prop: AnimatedProp | undefined,
  fallback: string,
  pulseColor?: string,
  pulseGradientTo?: string
): CSSProperties | undefined {
  if (!parseAnimated(prop).length) return undefined;
  const from = toCssColor(pulseColor ?? fallback);
  return {
    "--lojee-anim-from": from,
    "--lojee-anim-to": pulseGradientTo ? toCssColor(pulseGradientTo) : from,
    // How strong the second (outer) pulse ring is: only a gradient pulse has one, so a solid pulse is the single Playground-style ring.
    "--lojee-anim-to-a": pulseGradientTo ? "55%" : "0%",
  } as CSSProperties;
}
