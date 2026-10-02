import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { ReactNode } from "react";
import { colorClasses, cx, nonInteractive, type ColorName } from "../../../core/tokens";
import { motionClass, motionState, motionStyle, DEFAULT_TRANSITION_MS, type TransitionVariant } from "../../../core/motion";
import { usePresence } from "../../../core/usePresence";
import { TOOLTIP_PORTAL_Z_CLASS, tooltipPortalPositionStyle, useTooltipPortal } from "../../../core/tooltipPortal";

export type TooltipPosition = "top" | "bottom" | "left" | "right";

export interface TooltipProps {
  /** What the tooltip bubble displays. */
  content: ReactNode;
  /** The trigger element the tooltip is attached to; hovering it shows the bubble. */
  children: ReactNode;
  /** Which side of the trigger the bubble appears on: "top", "bottom", "left" or "right" (default: "top"). */
  position?: TooltipPosition;
  /** Bubble size: "xs" (tiny, 10px text), "sm" (compact, 11px), "md" (default, 12px), "lg" (roomier, 14px) or "xl" (large, 16px). */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /** Show delay in ms, snapped to the nearest Tailwind `delay-*` utility. */
  delayMs?: number;
  /** Bubble background/text color — same palette as Button (default: "accent", which follows the theme's accent color), or "neutral" for the theme-inverted bubble (dark in light mode, light in dark mode). */
  color?: ColorName | "neutral";
  /** Enter/exit transition for the bubble — replaces the default fade + scale: "fade" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "zoom" | "zoom-out" | "flip" | "blur" | "bounce" | "rotate" | "drop" | "skew" (default: the built-in fade + scale). Respects `prefers-reduced-motion`. */
  transition?: TransitionVariant;
  /** Enter/exit transition duration in ms (default: 450). */
  transitionDuration?: number;
  /** Delay before the enter transition starts, in ms (default: 0). */
  transitionDelay?: number;
  /** Render the bubble through a portal (a fixed-position layer outside the trigger's ancestors), so it is never clipped by a scrolling or `overflow: hidden` parent — e.g. inside a collapsed sidebar (default: false). */
  portal?: boolean;
  /** Keep the bubble showing ("active") whether or not the trigger is hovered or focused — for a hint that should be visible right away. Not supported together with `portal` (default: false). */
  open?: boolean;
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

// Literal class strings so Tailwind can see them.
const SIZE_CLASSES = {
  xs: "px-1.5 py-0.5 text-[10px]",
  sm: "px-2 py-1 text-[11px]",
  md: "px-3 py-1.5 text-xs",
  lg: "px-4 py-2 text-sm",
  xl: "px-5 py-2.5 text-base",
};

// Pure CSS show/hide (group-hover) — no useState, no positioning library.
// Fixed-offset placement only (no collision detection/auto-flip).
export function Tooltip({
  content,
  children,
  position = "top",
  size = "md",
  delayMs = 150,
  color = "accent",
  transition,
  transitionDuration,
  transitionDelay,
  portal = false,
  open = false,
  className,
  classNames,
}: TooltipProps) {
  const bubbleColor = color === "neutral" ? "bg-fg text-surface" : nonInteractive((colorClasses[color] || colorClasses.slate).solid);

  // With a `transition` the bubble is shown by JS state (hover/focus, after `delayMs`) and mounted only while
  // visible, so its exit can play. Without one, it's the pure-CSS group-hover bubble below, as before.
  const [shown, setShown] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const visible = shown || open;
  const { mounted } = usePresence(visible, (transitionDuration ?? DEFAULT_TRANSITION_MS) + (transitionDelay ?? 0));
  const show = () => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setShown(true), delayMs);
  };
  const hide = () => {
    clearTimeout(timer.current);
    setShown(false);
  };
  useEffect(() => () => clearTimeout(timer.current), []);

  // Portal mode: the trigger is measured on hover and the bubble is drawn in a fixed layer; the transition runs on an
  // inner element so its transform never fights the positioning transform.
  const { ref: triggerRef, state: portalState, show: showPortal, hide: hidePortal } = useTooltipPortal<HTMLSpanElement>();
  const portalOpen = portal && portalState !== null;
  const portalPresence = usePresence(portalOpen, (transitionDuration ?? DEFAULT_TRANSITION_MS) + (transitionDelay ?? 0));
  const [lastPortal, setLastPortal] = useState(portalState);
  if (portalState && portalState !== lastPortal) setLastPortal(portalState);

  if (portal) {
    const frozen = portalState ?? lastPortal;
    return (
      <span
        ref={triggerRef}
        className={cx("relative inline-block", className, classNames?.root)}
        onMouseEnter={showPortal}
        onMouseLeave={hidePortal}
        onFocus={showPortal}
        onBlur={hidePortal}
      >
        <slot>{children}</slot>
        {frozen &&
          portalPresence.mounted &&
          createPortal(
            <span
              className={cx("pointer-events-none fixed", TOOLTIP_PORTAL_Z_CLASS)}
              style={tooltipPortalPositionStyle(frozen.rect, position)}
            >
              <span
                role="tooltip"
                className={cx(
                  "relative block whitespace-nowrap rounded-lg font-medium shadow-lg",
                  SIZE_CLASSES[size] ?? SIZE_CLASSES.md,
                  bubbleColor,
                  motionClass(transition),
                  classNames?.bubble
                )}
                style={motionStyle(transitionDuration, transitionDelay)}
                {...(transition && motionState(portalOpen))}
              >
                {content}
                <span aria-hidden="true" className={cx("absolute h-2 w-2 rotate-45 bg-inherit", ARROW_CLASSES[position])} />
              </span>
            </span>,
            frozen.root
          )}
      </span>
    );
  }

  return (
    <span
      className={cx("group relative inline-block", className, classNames?.root)}
      {...(transition && { onMouseEnter: show, onMouseLeave: hide, onFocus: show, onBlur: hide })}
    >
      <slot>{children}</slot>
      {(!transition || mounted) && (
      <span
        role="tooltip"
        className={cx(
          // Soft bubble: rounded, medium-weight text, a real shadow, and a small fade + scale-in (also on keyboard focus).
          "pointer-events-none absolute z-50 whitespace-nowrap rounded-lg font-medium shadow-lg",
          SIZE_CLASSES[size] ?? SIZE_CLASSES.md,
          !transition &&
            (open
              ? "scale-100 opacity-100"
              : "opacity-0 scale-95 transition-[opacity,scale] duration-200 group-hover:scale-100 group-hover:opacity-100 group-focus-within:scale-100 group-focus-within:opacity-100"),
          bubbleColor,
          !transition && closestDelayClass(delayMs),
          POSITION_CLASSES[position],
          motionClass(transition),
          classNames?.bubble
        )}
        style={motionStyle(transitionDuration, transitionDelay)}
        {...(transition && motionState(visible))}
      >
        {content}
        <span aria-hidden="true" className={cx("absolute h-2 w-2 rotate-45 bg-inherit", ARROW_CLASSES[position])} />
      </span>
      )}
    </span>
  );
}
