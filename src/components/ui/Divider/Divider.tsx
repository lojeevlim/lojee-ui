import { useRef } from "react";
import type { KeyboardEvent, PointerEvent, ReactNode } from "react";
import { cx, type ColorName } from "../../../core/tokens";

export type DividerOrientation = "horizontal" | "vertical";

export interface DividerProps {
  orientation?: DividerOrientation;
  /** Centered text (e.g. "OR") — only meaningful for horizontal, non-resizable dividers. */
  label?: string;
  children?: ReactNode;
  color?: ColorName;
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
  slate: "border-slate-200",
  gray: "border-gray-200",
  indigo: "border-indigo-200",
  violet: "border-violet-200",
  blue: "border-blue-200",
  cyan: "border-cyan-200",
  emerald: "border-emerald-200",
  teal: "border-teal-200",
  amber: "border-amber-200",
  orange: "border-orange-200",
  rose: "border-rose-200",
  pink: "border-pink-200",
};

export function Divider({
  orientation = "horizontal",
  label,
  children,
  color = "slate",
  className,
  resizable = false,
  onResize,
  step = 10,
  classNames,
}: DividerProps) {
  const borderClass = BORDER_COLOR[color] || BORDER_COLOR.slate;
  const content = children ?? label;
  const isVertical = orientation === "vertical";
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
          className,
          classNames?.root
        )}
        {...dragHandleProps}
      >
        <span
          className={cx(
            "w-px border-l transition-colors",
            borderClass,
            resizable && "group-hover:border-slate-400 group-focus-visible:border-slate-500",
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
          className,
          classNames?.root
        )}
        {...dragHandleProps}
      >
        <span
          className={cx(
            "h-px w-full border-t transition-colors",
            borderClass,
            "group-hover:border-slate-400 group-focus-visible:border-slate-500",
            classNames?.line
          )}
        />
      </span>
    );
  }

  if (content == null) {
    return <hr role="separator" className={cx("border-t", borderClass, className, classNames?.root)} />;
  }

  return (
    <div role="separator" className={cx("flex items-center gap-3 text-xs font-medium text-slate-400", className, classNames?.root)}>
      <span className={cx("h-px flex-1 border-t", borderClass, classNames?.line)} />
      <slot>
        <span className={classNames?.label}>{content}</span>
      </slot>
      <span className={cx("h-px flex-1 border-t", borderClass, classNames?.line)} />
    </div>
  );
}
