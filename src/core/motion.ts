// Shared enter/exit transitions and hover effects — the `transition`, `transitionDuration`, `transitionDelay`
// and `hoverEffect` props. The keyframes and hover styles live in theme.css (`.lojee-tr-*`, `.lojee-hv-*`);
// this file only maps the props onto class names and CSS variables.
//
// Enter: the element animates in when it mounts. Exit: for components that mount and unmount with an `open`
// prop, put `data-state="open" | "closed"` on the element (see motionState) and keep it mounted for the
// exit duration (see usePresence) — the same motion then plays in reverse.

import type { CSSProperties } from "react";
import { cx } from "./tokens";

export const TRANSITIONS = [
  "fade",
  "slide-up",
  "slide-down",
  "slide-left",
  "slide-right",
  "zoom",
  "zoom-out",
  "flip",
  "blur",
  "bounce",
  "rotate",
  "drop",
  "skew",
] as const;
export type TransitionVariant = (typeof TRANSITIONS)[number];

export const HOVER_EFFECTS = ["lift", "scale", "press", "tilt", "ring", "glow", "shine"] as const;
export type HoverEffect = (typeof HOVER_EFFECTS)[number];

/** Default enter/exit duration in ms. */
export const DEFAULT_TRANSITION_MS = 450;

/** Class names to add to the element's root. */
export function motionClass(transition?: TransitionVariant, hoverEffect?: HoverEffect): string | undefined {
  if (!transition && !hoverEffect) return undefined;
  return cx(
    transition && `lojee-tr lojee-tr-${transition}`,
    hoverEffect && `lojee-hv lojee-hv-${hoverEffect}`,
    // The shine streak is an absolutely-positioned ::after, so its host has to be positioned.
    hoverEffect === "shine" && "relative"
  );
}

/** Duration/delay CSS variables (ms). Merge into the root's `style`. */
export function motionStyle(transitionDuration?: number, transitionDelay?: number): CSSProperties | undefined {
  if (transitionDuration === undefined && transitionDelay === undefined) return undefined;
  return {
    ...(transitionDuration !== undefined && { "--lojee-tr-duration": `${transitionDuration}ms` }),
    ...(transitionDelay !== undefined && { "--lojee-tr-delay": `${transitionDelay}ms` }),
  } as CSSProperties;
}

/** `data-state` for an element that opens and closes: spread it onto the root so the exit transition plays. */
export function motionState(open: boolean): { "data-state": "open" | "closed" } {
  return { "data-state": open ? "open" : "closed" };
}
