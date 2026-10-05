import { useRef } from "react";
import type { KeyboardEvent, PointerEvent, ReactNode } from "react";
import { cx, type ColorName } from "../../../core/tokens";
import { motionClass, motionStyle, type TransitionVariant } from "../../../core/motion";

export type DividerOrientation = "horizontal" | "vertical";

/** Look of the drag handle on a `resizable` divider. */
export type DividerHandleVariant = "grip" | "dots" | "arrows" | "circle" | "bar" | "pill";

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
   * arrow keys when focused), with a small grip pill in the middle of the line to show it can be dragged. It reports movement via `onResize` — it does
   * NOT own any size state itself, so the consumer decides how to apply the
   * delta (e.g. to a panel's width/height), same as a headless split-pane
   * handle.
   */
  resizable?: boolean;
  /**
   * Look of the drag handle when `resizable`: "grip" (default, two rows of dots), "dots" (three dots), "arrows" (a
   * round button with direction chevrons), "circle" (a round button with a single dot), "bar" (a short thick bar) or
   * "pill" (a plain pill). Under the clay design the handle renders as a puffy clay button.
   */
  handleVariant?: DividerHandleVariant;
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
    /** The grab handle in the middle of a `resizable` divider. */
    handle?: string;
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

// The handle in the middle of a resizable divider: a small button-like pill so it is obvious the line can be
// dragged. Purely visual — the whole divider is the drag target. `data-divider-handle` is the hook for the clay look.
function GripHandle({ vertical, variant, className }: { vertical: boolean; variant: DividerHandleVariant; className?: string }) {
  const round = variant === "arrows" || variant === "circle";
  const size = round
    ? "size-6"
    : variant === "bar"
      ? vertical ? "h-8 w-1.5" : "h-1.5 w-8"
      : variant === "dots"
        ? vertical ? "h-6 w-4" : "h-4 w-6"
        : variant === "pill"
          ? vertical ? "h-8 w-3" : "h-3 w-8"
          : vertical ? "h-10 w-4" : "h-4 w-10";
  const dot = "size-[3px] rounded-full bg-fg-subtle/70 transition-colors duration-200 group-hover:bg-accent-500 group-active:bg-white group-focus-visible:bg-accent-500";
  const stroke = "text-fg-subtle transition-colors duration-200 group-hover:text-accent-500 group-active:text-white group-focus-visible:text-accent-500";
  return (
    <span
      aria-hidden
      data-divider-handle={variant}
      className={cx(
        // A soft top-lit gradient pill: hairline border, a fine drop shadow and an inner highlight so it reads as a raised grip.
        "pointer-events-none absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-gradient-to-b from-surface to-surface-muted",
        "shadow-[0_1px_2px_rgb(0_0_0/0.08),inset_0_1px_0_rgb(255_255_255/0.75)] dark:shadow-[0_1px_2px_rgb(0_0_0/0.4),inset_0_1px_0_rgb(255_255_255/0.08)]",
        "transition-[scale,box-shadow,border-color,background-color] duration-200 ease-out",
        // Hover: a touch larger with an accent-tinted edge. Drag / keyboard focus: fills with the accent and glows.
        "group-hover:scale-105 group-hover:border-accent-300 group-hover:shadow-[0_2px_8px_rgb(0_0_0/0.14),inset_0_1px_0_rgb(255_255_255/0.75)]",
        "group-active:scale-110 group-active:border-accent-600 group-active:from-accent-500 group-active:to-accent-600 group-active:shadow-[0_0_0_4px_color-mix(in_srgb,var(--color-accent-500)_25%,transparent)]",
        "group-focus-visible:border-accent-600 group-focus-visible:shadow-[0_0_0_4px_color-mix(in_srgb,var(--color-accent-500)_25%,transparent)]",
        size,
        className
      )}
    >
      {variant === "grip" && (
        <span className={cx("grid gap-[3px]", vertical ? "grid-cols-2" : "grid-flow-col grid-rows-2")}>
          {Array.from({ length: 6 }, (_, i) => <span key={i} className={dot} />)}
        </span>
      )}
      {variant === "dots" && (
        <span className={cx("flex gap-[3px]", vertical && "flex-col")}>
          {Array.from({ length: 3 }, (_, i) => <span key={i} className={dot} />)}
        </span>
      )}
      {variant === "circle" && <span className={dot} />}
      {variant === "arrows" && (
        <svg viewBox="0 0 16 16" className={cx("size-4", stroke)} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          {vertical ? <path d="M5.5 5 3 8l2.5 3M10.5 5 13 8l-2.5 3" /> : <path d="M5 5.5 8 3l3 2.5M5 10.5 8 13l3-2.5" />}
        </svg>
      )}
    </span>
  );
}

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
  handleVariant = "grip",
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
          "group relative inline-flex h-full shrink-0 items-stretch justify-center",
          resizable ? "w-4 cursor-col-resize touch-none select-none" : "w-px",
          tr,
          className,
          classNames?.root
        )}
        style={trStyle}
        {...dragHandleProps}
      >
        <span
          data-divider-line=""
          className={cx(
            "w-px border-l transition-colors",
            borderClass,
            resizable && "group-hover:border-border-strong group-focus-visible:border-slate-500",
            classNames?.line
          )}
        />
        {resizable && <GripHandle vertical variant={handleVariant} className={classNames?.handle} />}
      </span>
    );
  }

  if (resizable) {
    return (
      <span
        role="separator"
        aria-orientation="horizontal"
        className={cx(
          "group relative flex h-4 w-full cursor-row-resize touch-none select-none items-center",
          tr,
          className,
          classNames?.root
        )}
        style={trStyle}
        {...dragHandleProps}
      >
        <span
          data-divider-line=""
          className={cx(
            "h-px w-full border-t transition-colors",
            borderClass,
            "group-hover:border-border-strong group-focus-visible:border-slate-500",
            classNames?.line
          )}
        />
        <GripHandle vertical={false} variant={handleVariant} className={classNames?.handle} />
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
