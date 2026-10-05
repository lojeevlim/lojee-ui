import { useEffect } from "react";
import type { ReactNode } from "react";
import { X } from "lucide-react";
import { cx } from "../../core/tokens";
import { motionClass, motionState, motionStyle, DEFAULT_TRANSITION_MS, type TransitionVariant, type HoverEffect } from "../../core/motion";
import { usePresence } from "../../core/usePresence";
import { DotScroll } from "./DotScroll/DotScroll";

export interface ModalProps {
  /** Whether the modal is shown (controlled) — renders nothing when false. */
  open: boolean;
  /** Called with no arguments when the user presses Escape, clicks the overlay, or clicks the close button; the consumer should set `open` to false. */
  onClose: () => void;
  /** Content of the header title, rendered next to the close button. */
  title?: ReactNode;
  /** Body content, rendered in the scrollable area below the header. */
  children: ReactNode;
  /** Enter/exit transition for the dialog: "fade" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "zoom" | "zoom-out" | "flip" | "blur" | "bounce" | "rotate" | "drop" | "skew" (default: none). Respects `prefers-reduced-motion`. */
  transition?: TransitionVariant;
  /** Enter/exit transition duration in ms (default: 450). */
  transitionDuration?: number;
  /** Delay before the enter transition starts, in ms (default: 0). */
  transitionDelay?: number;
  /** Effect while hovering the panel: "lift" | "scale" | "press" | "tilt" | "ring" | "glow" | "shine" (default: none). */
  hoverEffect?: HoverEffect;
  /** Extra CSS class(es) added to the dialog panel (same target as `classNames.root`). */
  className?: string;
  /** Per-part class overrides — merged after (and win over) the built-in styling. */
  classNames?: {
    /** The dialog panel itself (root className is a shorthand for this). */
    root?: string;
    overlay?: string;
    header?: string;
    title?: string;
    closeButton?: string;
    body?: string;
  };
}

export default function Modal({
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
}: ModalProps) {
  // With a `transition` the modal stays mounted for the exit; without one it unmounts immediately, as before.
  const { mounted } = usePresence(open, transition ? (transitionDuration ?? DEFAULT_TRANSITION_MS) + (transitionDelay ?? 0) : 0);
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div
        className={cx("absolute inset-0 bg-black/40 backdrop-blur-sm", transition && "lojee-tr lojee-tr-fade", classNames?.overlay)}
        style={motionStyle(transitionDuration)}
        {...motionState(open)}
        onClick={onClose}
      />
      <div
        className={cx(
          "relative flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-surface shadow-2xl ring-1 ring-black/5",
          motionClass(transition, hoverEffect),
          className,
          classNames?.root
        )}
        style={motionStyle(transitionDuration, transitionDelay)}
        {...motionState(open)}
      >
        <div className={cx("flex shrink-0 items-center justify-between border-b border-border px-6 py-4", classNames?.header)}>
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
