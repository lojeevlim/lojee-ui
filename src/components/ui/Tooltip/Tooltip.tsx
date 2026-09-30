import type { ReactNode } from "react";
import { colorClasses, cx, nonInteractive, type ColorName } from "../../../core/tokens";

export type TooltipPosition = "top" | "bottom" | "left" | "right";

export interface TooltipProps {
  /** What the tooltip bubble displays. */
  content: ReactNode;
  /** The trigger element the tooltip is attached to; hovering it shows the bubble. */
  children: ReactNode;
  /** Which side of the trigger the bubble appears on: "top", "bottom", "left" or "right" (default: "top"). */
  position?: TooltipPosition;
  /** Show delay in ms, snapped to the nearest Tailwind `delay-*` utility. */
  delayMs?: number;
  /** Bubble background/text color — same palette as Button (default: "accent", which follows the theme's accent color), or "neutral" for the theme-inverted bubble (dark in light mode, light in dark mode). */
  color?: ColorName | "neutral";
  /** Extra class name(s) appended to the root element. */
  className?: string;
  /** Per-part class overrides — merged after (and win over) the built-in styling. */
  classNames?: {
    root?: string;
    bubble?: string;
  };
}

// Arrow: a small rotated square on the edge facing the trigger. `bg-inherit` makes it take the bubble's own color.
const ARROW_CLASSES: Record<TooltipPosition, string> = {
  top: "-bottom-1 left-1/2 -translate-x-1/2",
  bottom: "-top-1 left-1/2 -translate-x-1/2",
  left: "-right-1 top-1/2 -translate-y-1/2",
  right: "-left-1 top-1/2 -translate-y-1/2",
};

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
export function Tooltip({
  content,
  children,
  position = "top",
  delayMs = 150,
  color = "accent",
  className,
  classNames,
}: TooltipProps) {
  const bubbleColor = color === "neutral" ? "bg-fg text-surface" : nonInteractive((colorClasses[color] || colorClasses.slate).solid);

  return (
    <span className={cx("group relative inline-block", className, classNames?.root)}>
      <slot>{children}</slot>
      <span
        role="tooltip"
        className={cx(
          // Soft bubble: rounded, medium-weight text, a real shadow, and a small fade + scale-in (also on keyboard focus).
          "pointer-events-none absolute z-50 whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium opacity-0 shadow-lg scale-95 transition-[opacity,scale] duration-200 group-hover:scale-100 group-hover:opacity-100 group-focus-within:scale-100 group-focus-within:opacity-100",
          bubbleColor,
          closestDelayClass(delayMs),
          POSITION_CLASSES[position],
          classNames?.bubble
        )}
      >
        {content}
        <span aria-hidden="true" className={cx("absolute h-2 w-2 rotate-45 bg-inherit", ARROW_CLASSES[position])} />
      </span>
    </span>
  );
}
