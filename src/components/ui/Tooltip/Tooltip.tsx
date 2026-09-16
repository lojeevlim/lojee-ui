import type { ReactNode } from "react";
import { colorClasses, cx, nonInteractive, type ColorName } from "../../../core/tokens";

export type TooltipPosition = "top" | "bottom" | "left" | "right";

export interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  position?: TooltipPosition;
  /** Show delay in ms, snapped to the nearest Tailwind `delay-*` utility. */
  delayMs?: number;
  /** Bubble background/text color — same palette as Button (default: slate). */
  color?: ColorName;
  className?: string;
}

const POSITION_CLASSES: Record<TooltipPosition, string> = {
  top: "bottom-full left-1/2 mb-2 -translate-x-1/2",
  bottom: "top-full left-1/2 mt-2 -translate-x-1/2",
  left: "right-full top-1/2 mr-2 -translate-y-1/2",
  right: "left-full top-1/2 ml-2 -translate-y-1/2",
};

// Tailwind ships fixed delay-* steps — snap an arbitrary ms value to the
// nearest one rather than requiring a JS timer. Classes must appear as
// literal strings for Tailwind's scanner to pick them up, so this is a
// lookup map rather than a `delay-${ms}` template (which it can't detect).
const DELAY_CLASSES: Record<number, string> = {
  0: "delay-0",
  75: "delay-75",
  100: "delay-100",
  150: "delay-150",
  200: "delay-200",
  300: "delay-300",
  500: "delay-500",
  700: "delay-700",
  1000: "delay-1000",
};

function closestDelayClass(ms: number): string {
  const steps = Object.keys(DELAY_CLASSES).map(Number);
  const closest = steps.reduce((a, b) => (Math.abs(b - ms) < Math.abs(a - ms) ? b : a));
  return DELAY_CLASSES[closest];
}

// Pure CSS show/hide (group-hover) — no useState, no positioning library.
// Fixed-offset placement only (no collision detection/auto-flip).
export function Tooltip({ content, children, position = "top", delayMs = 150, color = "slate", className }: TooltipProps) {
  const bubbleColor = nonInteractive((colorClasses[color] || colorClasses.slate).solid);

  return (
    <span className={cx("group relative inline-block", className)}>
      <slot>{children}</slot>
      <span
        role="tooltip"
        className={cx(
          "pointer-events-none absolute z-50 whitespace-nowrap rounded-md px-2 py-1 text-xs opacity-0 shadow-sm transition-opacity duration-150 group-hover:opacity-100",
          bubbleColor,
          closestDelayClass(delayMs),
          POSITION_CLASSES[position]
        )}
      >
        {content}
      </span>
    </span>
  );
}
