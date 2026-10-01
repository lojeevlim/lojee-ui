import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { X } from "lucide-react";
import { cx } from "../../../core/tokens";
import { motionClass, motionState, motionStyle, DEFAULT_TRANSITION_MS, type TransitionVariant, type HoverEffect } from "../../../core/motion";
import { usePresence } from "../../../core/usePresence";

export type DrawerPosition = "left" | "right" | "top" | "bottom";

export interface DrawerProps {
  /** Whether the drawer is visible (controlled). */
  open: boolean;
  /** Fires when the user requests closing (overlay click or close button) — the consumer should set `open` to false. */
  onClose: () => void;
  /** Edge the drawer slides in from: "left" | "right" (default) | "top" | "bottom". */
  position?: DrawerPosition;
  /** Header title content; shown next to the close button. */
  title?: ReactNode;
  /** Drawer body content. */
  children?: ReactNode;
  /** Panel width (left/right) or height (top/bottom) as a CSS size, e.g. "320px". */
  size?: string;
  /** Enter/exit transition for the panel — replaces the default slide: "fade" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "zoom" | "zoom-out" | "flip" | "blur" | "bounce" | "rotate" | "drop" | "skew" (default: the built-in slide). Respects `prefers-reduced-motion`. */
  transition?: TransitionVariant;
  /** Transition duration in ms (default: 450). */
  transitionDuration?: number;
  /** Delay before the enter transition starts, in ms (default: 0). */
  transitionDelay?: number;
  /** Effect while hovering the panel: "lift" | "scale" | "press" | "tilt" | "ring" | "glow" | "shine" (default: none). */
  hoverEffect?: HoverEffect;
  /** Extra class name(s) applied to the root element. */
  className?: string;
  /** Per-part class overrides — merged after (and win over) the built-in styling. */
  classNames?: {
    root?: string;
    overlay?: string;
    /** The sliding panel itself (root className is a shorthand for this). */
    panel?: string;
    header?: string;
    title?: string;
    closeButton?: string;
    body?: string;
  };
}

const POSITION_CLASSES: Record<DrawerPosition, string> = {
  left: "left-0 top-0 h-full",
  right: "right-0 top-0 h-full",
  top: "left-0 top-0 w-full",
  bottom: "left-0 bottom-0 w-full",
};

const CLOSED_TRANSFORM: Record<DrawerPosition, string> = {
  left: "-translate-x-full",
  right: "translate-x-full",
  top: "-translate-y-full",
  bottom: "translate-y-full",
};

const DEFAULT_SIZE: Record<DrawerPosition, string> = {
  left: "320px",
  right: "320px",
  top: "40vh",
  bottom: "40vh",
};

export function Drawer({
  open,
  onClose,
  position = "right",
  title,
  children,
  size,
  transition,
  transitionDuration,
  transitionDelay,
  hoverEffect,
  className,
  classNames,
}: DrawerProps) {
  // With a `transition` the drawer stays mounted for the exit; without one it unmounts immediately, as before.
  const { mounted } = usePresence(open, transition ? (transitionDuration ?? DEFAULT_TRANSITION_MS) + (transitionDelay ?? 0) : 0);
  const [entered, setEntered] = useState(false);
  const [prevOpen, setPrevOpen] = useState(open);

  if (open !== prevOpen) {
    setPrevOpen(open);
    setEntered(false);
  }

  useEffect(() => {
    if (!open) return;
    const frame = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(frame);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!mounted) return null;

  const isHorizontal = position === "left" || position === "right";
  const resolvedSize = size ?? DEFAULT_SIZE[position];

  return (
    <div className={cx("fixed inset-0 z-[100]", classNames?.root)} role="dialog" aria-modal="true">
      {/* No portal: when this is wrapped as a Web Component it's mounted inside a
          Shadow DOM alongside an injected <style> tag with Tailwind's compiled
          CSS — portaling to document.body would escape that root and render
          unstyled, so the panel is just plain nested JSX like Modal. */}
      <div
        className={cx("absolute inset-0 bg-black/40 backdrop-blur-sm", transition && "lojee-tr lojee-tr-fade", classNames?.overlay)}
        style={motionStyle(transitionDuration)}
        {...motionState(open)}
        onClick={onClose}
      />
      <div
        className={cx(
          "fixed flex flex-col overflow-hidden bg-surface shadow-2xl ring-1 ring-black/5",
          // The default slide; a `transition` takes over instead.
          !transition && "transition-transform duration-300 ease-out",
          POSITION_CLASSES[position],
          !transition && (entered ? "translate-x-0 translate-y-0" : CLOSED_TRANSFORM[position]),
          motionClass(transition, hoverEffect),
          className,
          classNames?.panel
        )}
        style={{ ...(isHorizontal ? { width: resolvedSize } : { height: resolvedSize }), ...motionStyle(transitionDuration, transitionDelay) }}
        {...motionState(open)}
      >
        <div
          className={cx("flex shrink-0 items-center justify-between border-b border-border px-6 py-4", classNames?.header)}
        >
          <h2 className={cx("text-base font-semibold text-fg", classNames?.title)}>
            <slot name="title">{title}</slot>
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className={cx(
              "rounded-md p-1.5 text-fg-subtle transition-colors hover:bg-surface-muted hover:text-fg-muted",
              classNames?.closeButton
            )}
          >
            <X size={18} />
          </button>
        </div>
        <div className={cx("overflow-y-auto p-6", classNames?.body)}>
          <slot>{children}</slot>
        </div>
      </div>
    </div>
  );
}
