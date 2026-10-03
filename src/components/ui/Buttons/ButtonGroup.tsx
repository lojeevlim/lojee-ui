import { useEffect, useRef, type ReactNode } from "react";
import { cx, shapeClasses, type Shape } from "../../../core/tokens";
import { motionClass, motionStyle, type TransitionVariant, type HoverEffect } from "../../../core/motion";

export interface ButtonGroupItemClick {
  /** Position of the clicked button within the group, starting at 0. */
  index: number;
  /** Text of the clicked button (empty for an icon-only button — then its `aria-label` is used when it has one). */
  label: string;
}

export interface ButtonGroupProps {
  /** The buttons (e.g. `Button` or `SegmentButton`) to join into one connected group. */
  children: ReactNode;
  /**
   * Corner treatment for the whole group (default keeps the built-in
   * rounded-lg look). Individual segments stay square themselves — the
   * group's outer container does the rounding, via `overflow-hidden`.
   */
  shape?: Shape;
  /** Called when one of the group's buttons is clicked, with its `index` and `label` — one handler for the whole group instead of one per button. Not called for a disabled button. */
  onItemClick?: (item: ButtonGroupItemClick) => void;
  /** Enter transition: "fade" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "zoom" | "zoom-out" | "flip" | "blur" | "bounce" | "rotate" | "drop" | "skew" (default: none). Respects `prefers-reduced-motion`. */
  transition?: TransitionVariant;
  /** Enter transition duration in ms (default: 450). */
  transitionDuration?: number;
  /** Delay before the enter transition starts, in ms (default: 0) — handy for staggering. */
  transitionDelay?: number;
  /** Effect while hovering: "lift" | "scale" | "press" | "tilt" | "ring" | "glow" | "shine" (default: none). */
  hoverEffect?: HoverEffect;
  /** Extra class names applied to the root element. */
  className?: string;
  /** Per-part class overrides — merged after (and win over) the built-in styling. */
  classNames?: {
    root?: string;
  };
}

export function ButtonGroup({ children, shape = "default", onItemClick, className, classNames, transition, transitionDuration, transitionDelay, hoverEffect }: ButtonGroupProps) {
  const root = useRef<HTMLDivElement>(null);

  // One listener for the whole group: find which button the click came from. Buttons are the slot's children in React and its
  // assigned (light-DOM) elements in the Web Component, so both are checked. It is a native listener, not React's `onClick`:
  // React finds the target by walking up parent nodes, and a slotted light-DOM button is not under this element's shadow tree.
  useEffect(() => {
    const el = root.current;
    if (!el || !onItemClick) return;
    const handleClick = (e: MouseEvent) => {
      const slot = el.querySelector("slot");
      let items: Element[] = slot ? slot.assignedElements({ flatten: true }) : [];
      if (items.length === 0) items = slot ? Array.from(slot.children) : Array.from(el.children);
      const path = e.composedPath();
      const index = items.findIndex((item) => path.includes(item));
      if (index < 0) return;
      const item = items[index] as HTMLElement;
      const button = item.matches("button") ? (item as HTMLButtonElement) : item.querySelector("button");
      if (button?.disabled) return;
      onItemClick({ index, label: (item.textContent ?? "").trim() || item.getAttribute("aria-label") || button?.getAttribute("aria-label") || "" });
    };
    el.addEventListener("click", handleClick);
    return () => el.removeEventListener("click", handleClick);
  }, [onItemClick]);

  return (
    <div
      ref={root}
      className={cx(
        "inline-flex rounded-lg border border-border overflow-hidden divide-x divide-border",
        shapeClasses[shape],
        motionClass(transition, hoverEffect),
        className,
        classNames?.root
      )}
      style={motionStyle(transitionDuration, transitionDelay)}
    >
      <slot>{children}</slot>
    </div>
  );
}
