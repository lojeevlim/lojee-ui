import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { cx } from "../../../core/tokens";
import { motionClass, motionState, motionStyle, DEFAULT_TRANSITION_MS, type TransitionVariant } from "../../../core/motion";
import { usePresence } from "../../../core/usePresence";

export type DropdownMenuAlign = "start" | "end";

export interface DropdownMenuProps {
  /** Element that toggles the menu when clicked. */
  trigger: ReactNode;
  /** Which edge of the trigger the menu aligns to: "start" (default) | "end". */
  align?: DropdownMenuAlign;
  /** Menu content, typically DropdownMenuItem elements; closes on item click, outside click, or Escape. */
  children?: ReactNode;
  /** Enter/exit transition for the menu: "fade" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "zoom" | "zoom-out" | "flip" | "blur" | "bounce" | "rotate" | "drop" | "skew" (default: none). Respects `prefers-reduced-motion`. */
  transition?: TransitionVariant;
  /** Transition duration in ms (default: 450). */
  transitionDuration?: number;
  /** Delay before the enter transition starts, in ms (default: 0). */
  transitionDelay?: number;
  /** Extra class name(s) applied to the root element. */
  className?: string;
  /** Per-part class overrides — merged after (and win over) the built-in styling. */
  classNames?: {
    root?: string;
    menu?: string;
  };
}

export function DropdownMenu({
  trigger,
  align = "start",
  children,
  transition,
  transitionDuration,
  transitionDelay,
  className,
  classNames,
}: DropdownMenuProps) {
  const [open, setOpen] = useState(false);
  // With a `transition` the panel stays mounted for the exit; without one it unmounts immediately, as before.
  const { mounted } = usePresence(open, transition ? (transitionDuration ?? DEFAULT_TRANSITION_MS) + (transitionDelay ?? 0) : 0);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handlePointerDown = (e: MouseEvent) => {
      // composedPath, not contains(e.target): from a document listener a click inside a web component's shadow root is
      // retargeted to the host element, which would look like an outside click.
      if (rootRef.current && !e.composedPath().includes(rootRef.current)) setOpen(false);
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
    <div ref={rootRef} className={cx("relative inline-block", className, classNames?.root)}>
      <span aria-haspopup="menu" aria-expanded={open} onClick={() => setOpen((prev) => !prev)}>
        <slot name="trigger">{trigger}</slot>
      </span>

      {(transition ? mounted : open) && (
        <div
          role="menu"
          // A click on any menu item bubbles up here and closes the menu —
          // this also works once wrapped as a Web Component, since a click
          // is a composed event that crosses the shadow boundary. A
          // disabled item's <button> never fires a click at all, so it
          // never closes the menu, with no extra handling needed.
          onClick={() => setOpen(false)}
          className={cx(
            "absolute z-10 mt-1.5 min-w-[10rem] overflow-hidden rounded-lg border border-border bg-surface py-1 shadow-lg",
            align === "end" ? "right-0" : "left-0",
            motionClass(transition),
            classNames?.menu
          )}
          style={motionStyle(transitionDuration, transitionDelay)}
          {...motionState(open)}
        >
          <slot>{children}</slot>
        </div>
      )}
    </div>
  );
}
