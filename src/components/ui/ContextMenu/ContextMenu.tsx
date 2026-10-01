import { useEffect, useRef, useState } from "react";
import type { MouseEvent as ReactMouseEvent, ReactNode } from "react";
import { cx } from "../../../core/tokens";
import { motionClass, motionState, motionStyle, DEFAULT_TRANSITION_MS, type TransitionVariant } from "../../../core/motion";
import { usePresence } from "../../../core/usePresence";

export interface ContextMenuProps {
  /** The area that opens the menu when right-clicked (the trigger region). */
  children: ReactNode;
  /** Menu content (typically DropdownMenuItem elements) shown at the pointer position on right-click; closes on item click, outside click, or Escape. */
  menu?: ReactNode;
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

export function ContextMenu({ children, menu, transition, transitionDuration, transitionDelay, className, classNames }: ContextMenuProps) {
  const [open, setOpen] = useState(false);
  // With a `transition` the panel stays mounted for the exit; without one it unmounts immediately, as before.
  const { mounted } = usePresence(open, transition ? (transitionDuration ?? DEFAULT_TRANSITION_MS) + (transitionDelay ?? 0) : 0);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const rootRef = useRef<HTMLDivElement>(null);

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

  const handleContextMenu = (e: ReactMouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setCoords({ x: e.clientX, y: e.clientY });
    setOpen(true);
  };

  return (
    <div ref={rootRef} onContextMenu={handleContextMenu} className={cx("inline-block", className, classNames?.root)}>
      <slot>{children}</slot>

      {(transition ? mounted : open) && (
        <div
          role="menu"
          style={{ left: coords.x, top: coords.y, ...motionStyle(transitionDuration, transitionDelay) }}
          {...motionState(open)}
          // A click on any menu item bubbles up here and closes the menu —
          // this also works once wrapped as a Web Component, since a click
          // is a composed event that crosses the shadow boundary. A
          // disabled item's <button> never fires a click at all, so it
          // never closes the menu, with no extra handling needed.
          onClick={() => setOpen(false)}
          className={cx(
            "fixed z-10 min-w-[10rem] overflow-hidden rounded-lg border border-border bg-surface py-1 shadow-lg",
            motionClass(transition),
            classNames?.menu
          )}
        >
          <slot name="menu">{menu}</slot>
        </div>
      )}
    </div>
  );
}
