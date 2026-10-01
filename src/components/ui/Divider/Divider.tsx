import { useRef } from "react";
import type { KeyboardEvent, PointerEvent, ReactNode } from "react";
import { cx, type ColorName } from "../../../core/tokens";
import { motionClass, motionStyle, type TransitionVariant } from "../../../core/motion";

export type DividerOrientation = "horizontal" | "vertical";

export interface DividerProps {
  /** "horizontal" (default) draws a full-width line; "vertical" draws a full-height line. */
  orientation?: DividerOrientation;
  /** Centered text (e.g. "OR") — only meaningful for horizontal, non-resizable dividers. */
  label?: string;
  /** Custom centered content shown in place of `label` on a labeled horizontal divider. */
  children?: ReactNode;
  /** Line color: a built-in ColorName (default: "accent"). */
  color?: ColorName;
  /** Enter transition: "fade" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "zoom" | "zoom-out" | "flip" | "blur" | "bounce" | "rotate" | "drop" | "skew" (default: none). Respects `prefers-reduced-motion`. */
  transition?: TransitionVariant;
  /** Enter transition duration in ms (default: 450). */
  transitionDuration?: number;
  /** Delay before the enter transition starts, in ms (default: 0) — handy for staggering. */
  transitionDelay?: number;
  /** Extra class name(s) applied to the root element. */
  className?: string;
  /**
   * Turns the divider into a draggable resize handle (mouse/touch drag, or
   * arrow keys when focused). It reports movement via `onResize` — it does
   * NOT own any size state itself, so the consumer decides how to apply the
   * delta (e.g. to a panel's width/height), same as a headless split-pane
   * handle.
   */
  resizable?: boolean;
  /** Called with the pointer/keyboard movement in px (positive = right/down). */
  onResize?: (deltaPx: number) => void;
  /** Keyboard step size in px when resizable (default 10). */
  step?: number;
  /** Per-part class overrides — merged after (and win over) the built-in styling. */
  classNames?: {
    root?: string;
    /** The line segment(s) either side of a labeled divider, or the sole line otherwise. */
    line?: string;
    /** The centered label/content, when present. */
    label?: string;
  };
}

const BORDER_COLOR: Record<ColorName, string> = {
  slate: "border-border",
  gray: "border-border",
  indigo: "border-indigo-200 dark:border-indigo-800",
  accent: "border-accent-200 dark:border-accent-800",
  violet: "border-violet-200 dark:border-violet-800",
  blue: "border-blue-200 dark:border-blue-800",
  cyan: "border-cyan-200 dark:border-cyan-800",
  emerald: "border-emerald-200 dark:border-emerald-800",
  teal: "border-teal-200 dark:border-teal-800",
  amber: "border-amber-200 dark:border-amber-800",
  orange: "border-orange-200 dark:border-orange-800",
  rose: "border-rose-200 dark:border-rose-800",
  pink: "border-pink-200 dark:border-pink-800",
};

export function Divider({
  orientation = "horizontal",
  label,
  children,
  color = "accent",
  className,
  transition,
  transitionDuration,
  transitionDelay,
  resizable = false,
  onResize,
  step = 10,
  classNames,
}: DividerProps) {
  const borderClass = BORDER_COLOR[color] || BORDER_COLOR.slate;
  const content = children ?? label;
  const isVertical = orientation === "vertical";
  const tr = motionClass(transition);
  const trStyle = motionStyle(transitionDuration, transitionDelay);
  const dragOrigin = useRef<{ x: number; y: number } | null>(null);

  const handlePointerDown = (e: PointerEvent<HTMLSpanElement>) => {
    if (!resizable) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    dragOrigin.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: PointerEvent<HTMLSpanElement>) => {
    if (!resizable || !dragOrigin.current) return;
    const delta = isVertical ? e.clientX - dragOrigin.current.x : e.clientY - dragOrigin.current.y;
    if (delta !== 0) {
      onResize?.(delta);
      dragOrigin.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handlePointerUp = (e: PointerEvent<HTMLSpanElement>) => {
    if (!resizable) return;
    e.currentTarget.releasePointerCapture(e.pointerId);
    dragOrigin.current = null;
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLSpanElement>) => {
    if (!resizable) return;
    const increaseKey = isVertical ? "ArrowRight" : "ArrowDown";
    const decreaseKey = isVertical ? "ArrowLeft" : "ArrowUp";
    if (e.key === increaseKey) {
      e.preventDefault();
      onResize?.(step);
    } else if (e.key === decreaseKey) {
      e.preventDefault();
      onResize?.(-step);
    }
  };

  const dragHandleProps = resizable
    ? {
        tabIndex: 0,
        onPointerDown: handlePointerDown,
        onPointerMove: handlePointerMove,
        onPointerUp: handlePointerUp,
        onKeyDown: handleKeyDown,
      }
    : {};

  if (isVertical) {
    return (
      <span
        role="separator"
        aria-orientation="vertical"
        className={cx(
          "group inline-flex h-full shrink-0 items-stretch justify-center",
          resizable ? "w-3 cursor-col-resize touch-none select-none" : "w-px",
          tr,
          className,
          classNames?.root
        )}
        style={trStyle}
        {...dragHandleProps}
      >
        <span
          className={cx(
            "w-px border-l transition-colors",
            borderClass,
            resizable && "group-hover:border-border-strong group-focus-visible:border-slate-500",
            classNames?.line
          )}
        />
      </span>
    );
  }

  if (resizable) {
    return (
      <span
        role="separator"
        aria-orientation="horizontal"
        className={cx(
          "group flex h-3 w-full cursor-row-resize touch-none select-none items-center",
          tr,
          className,
          classNames?.root
        )}
        style={trStyle}
        {...dragHandleProps}
      >
        <span
          className={cx(
            "h-px w-full border-t transition-colors",
            borderClass,
            "group-hover:border-border-strong group-focus-visible:border-slate-500",
            classNames?.line
          )}
        />
      </span>
    );
  }

  if (content == null) {
    return <hr role="separator" className={cx("border-t", borderClass, tr, className, classNames?.root)} style={trStyle} />;
  }

  return (
    <div role="separator" className={cx("flex items-center gap-3 text-xs font-medium text-fg-subtle", tr, className, classNames?.root)} style={trStyle}>
      <span className={cx("h-px flex-1 border-t", borderClass, classNames?.line)} />
      <slot>
        <span className={classNames?.label}>{content}</span>
      </slot>
      <span className={cx("h-px flex-1 border-t", borderClass, classNames?.line)} />
    </div>
  );
}
