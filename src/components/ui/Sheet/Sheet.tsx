import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { X } from "lucide-react";
import { cx } from "../../../core/tokens";
import { motionClass, motionState, motionStyle, DEFAULT_TRANSITION_MS, type TransitionVariant, type HoverEffect } from "../../../core/motion";
import { usePresence } from "../../../core/usePresence";
import { DotScroll } from "../DotScroll/DotScroll";

export interface SheetProps {
  /** Whether the sheet is shown (controlled) — renders nothing when false; slides up from the bottom when it becomes true. */
  open: boolean;
  /** Called with no arguments when the user presses Escape, clicks the overlay, or clicks the close button; the consumer should set `open` to false. */
  onClose: () => void;
  /** Content of the header title, rendered next to the close button. */
  title?: ReactNode;
  /** Body content, rendered in the scrollable area below the header. */
  children?: ReactNode;
  /** Enter/exit transition for the panel — replaces the default slide-up: "fade" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "zoom" | "zoom-out" | "flip" | "blur" | "bounce" | "rotate" | "drop" | "skew" (default: the built-in slide-up). Respects `prefers-reduced-motion`. */
  transition?: TransitionVariant;
  /** Transition duration in ms (default: 450). */
  transitionDuration?: number;
  /** Delay before the enter transition starts, in ms (default: 0). */
  transitionDelay?: number;
  /** Effect while hovering the panel: "lift" | "scale" | "press" | "tilt" | "ring" | "glow" | "shine" (default: none). */
  hoverEffect?: HoverEffect;
  /** Extra CSS class(es) added to the sliding panel (same target as `classNames.panel`). */
  className?: string;
  /** Per-part class overrides — merged after (and win over) the built-in styling. */
  classNames?: {
    root?: string;
    overlay?: string;
    /** The sliding panel itself (root className is a shorthand for this). */
    panel?: string;
    handle?: string;
    header?: string;
    title?: string;
    closeButton?: string;
    body?: string;
  };
}

export function Sheet({
  open,
  onClose,
  title,
  children,
  transition,
  transitionDuration,
  transitionDelay,
  hoverEffect,
  className,
  classNames,
}: SheetProps) {
  // With a `transition` the sheet stays mounted for the exit; without one it unmounts immediately, as before.
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

  if (!(transition ? mounted : open)) return null;

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
          "fixed bottom-0 left-0 right-0 flex max-h-[80vh] flex-col overflow-hidden rounded-t-2xl bg-surface shadow-2xl ring-1 ring-black/5 dark:ring-white/10",
          // The default slide-up; a `transition` takes over instead.
          !transition && "transition-transform duration-300 ease-out",
          !transition && (entered ? "translate-y-0" : "translate-y-full"),
          motionClass(transition, hoverEffect),
          className,
          classNames?.panel
        )}
        style={motionStyle(transitionDuration, transitionDelay)}
        {...motionState(open)}
      >
        <div className="flex shrink-0 justify-center pt-3">
          <div className={cx("mx-auto h-1 w-10 rounded-full bg-border-strong", classNames?.handle)} />
        </div>
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
        <DotScroll className="flex flex-col" viewportClassName={cx("min-h-0 flex-1 p-6", classNames?.body)}>
          <slot>{children}</slot>
        </DotScroll>
      </div>
    </div>
  );
}
