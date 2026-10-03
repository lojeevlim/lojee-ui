import { isColorName } from "./tokens";

export type GradientDirection = "to-right" | "to-left" | "to-bottom" | "to-top" | "to-br" | "to-bl" | "to-tr" | "to-tl";

export const GRADIENT_DIRECTIONS: GradientDirection[] = ["to-right", "to-left", "to-bottom", "to-top", "to-br", "to-bl", "to-tr", "to-tl"];

const ANGLE: Record<GradientDirection, string> = {
  "to-right": "to right",
  "to-left": "to left",
  "to-bottom": "to bottom",
  "to-top": "to top",
  "to-br": "to bottom right",
  "to-bl": "to bottom left",
  "to-tr": "to top right",
  "to-tl": "to top left",
};

/** A named color resolves to its 600 shade; anything else is used as the CSS color it already is. */
export const gradientStop = (c: string) => (isColorName(c) ? `var(--color-${c}-600)` : c);

/** `linear-gradient(...)` from `from` to `to` (each a ColorName or any CSS color), running in `direction`. */
export function linearGradient(from: string, to: string, direction: GradientDirection = "to-right"): string {
  return `linear-gradient(${ANGLE[direction] ?? ANGLE["to-right"]}, ${gradientStop(from)}, ${gradientStop(to)})`;
}
