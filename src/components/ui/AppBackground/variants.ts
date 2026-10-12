import type { AppBackgroundVariant } from "./AppBackground";

/** Every built-in AppBackground variant, in display order. */
export const APP_BACKGROUND_VARIANTS: AppBackgroundVariant[] = [
  "side-glow",
  "top-glow",
  "bottom-glow",
  "pinch-glow",
  "horizon",
  "aurora",
  "spotlight",
  "mesh",
  "vortex",
  "embers",
  "waves",
  "grid",
  "dots",
];

/** Variants that draw drifting points of light, which the `motes` prop can switch off. */
export const APP_BACKGROUND_HAS_MOTES: AppBackgroundVariant[] = ["side-glow", "top-glow", "bottom-glow", "pinch-glow", "embers"];
