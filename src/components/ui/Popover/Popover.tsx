import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { cx } from "../../../core/tokens";
import { motionClass, motionState, motionStyle, DEFAULT_TRANSITION_MS, type TransitionVariant } from "../../../core/motion";
import { usePresence } from "../../../core/usePresence";

export type PopoverPosition = "top" | "bottom" | "left" | "right";

export interface PopoverProps {
  /** Content rendered inside the popover panel while it is open. */
  content: ReactNode;
  /** The trigger element; clicking it toggles the popover. */
  children: ReactNode;
  /** Which side of the trigger the panel appears on: "top", "bottom" (default), "left" or "right". */
  position?: PopoverPosition;
  /** Enter/exit transition for the panel: "fade" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "zoom" | "zoom-out" | "flip" | "blur" | "bounce" | "rotate" | "drop" | "skew" (default: none). Respects `prefers-reduced-motion`. */
  transition?: TransitionVariant;
  /** Transition duration in ms (default: 450). */
  transitionDuration?: number;
  /** Delay before the enter transition starts, in ms (default: 0). */
  transitionDelay?: number;
  /** Extra CSS class(es) added to the root element, merged before `classNames.root`. */
  className?: string;
  /** Per-part class overrides — merged after (and win over) the built-in styling. */
  classNames?: {
    root?: string;
    panel?: string;
  };
}

const POSITION_CLASSES: Record<PopoverPosition, string> = {
  top: "bottom-full left-1/2 mb-2 -translate-x-1/2",
  bottom: "top-full left-1/2 mt-2 -translate-x-1/2",
  left: "right-full top-1/2 mr-2 -translate-y-1/2",
  right: "left-full top-1/2 ml-2 -translate-y-1/2",
};

export function Popover({
  content,
  children,
  position = "bottom",
  transition,
  transitionDuration,
  transitionDelay,
  className,
  classNames,
}: PopoverProps) {
  const [open, setOpen] = useState(false);
  // With a `transition` the panel stays mounted for the exit; without one it unmounts immediately, as before.
  const { mounted } = usePresence(open, transition ? (transitionDuration ?? DEFAULT_TRANSITION_MS) + (transitionDelay ?? 0) : 0);
  const rootRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open) return;
    const handlePointerDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  return (
    <span ref={rootRef} className={cx("relative inline-block", className, classNames?.root)}>
      <span onClick={() => setOpen((prev) => !prev)}>
        <slot>{children}</slot>
      </span>

      {(transition ? mounted : open) && (
        <div
          role="dialog"
          className={cx(
            "absolute z-10 rounded-lg border border-border bg-surface p-4 shadow-lg",
            POSITION_CLASSES[position],
            motionClass(transition),
            classNames?.panel
          )}
          style={motionStyle(transitionDuration, transitionDelay)}
          {...motionState(open)}
        >
          <slot name="content">{content}</slot>
        </div>
      )}
    </span>
  );
}
