import { Children, cloneElement, isValidElement, useEffect, useRef, useState, type ReactElement, type ReactNode } from "react";
import { SegmentButton, type SegmentButtonProps } from "./SegmentButton";
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
  /** The group keeps its own selection: a click marks that segment active (in the theme color) and clears the others — no `active` state to manage (default: false). Leave it off for independent toggles such as Bold / Italic. */
  selectable?: boolean;
  /** `selectable` only: which segment starts active, by position from 0 (default: none). */
  defaultActive?: number;
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

// The group clips its segments to its rounded outline (`overflow-hidden`), which cut the corners off an active segment drawn as an outline
// (the theme's "Outline" active style is an inset ring). So the outer segments get the group's corner radius themselves — minus the 1px
// border — and the ring follows the curve. The radius travels as custom properties (they inherit into a segment's own shadow root, unlike
// `border-radius: inherit`); SegmentButton reads them. Covers React children (inside the <slot>) and slotted <l-segment-button>s (::slotted).
const GROUP_RADIUS: Record<Shape, string> = { default: "var(--radius-lg, 0.5rem)", pill: "9999px", square: "0px" };
const GROUP_CSS = `
.lojee-button-group > slot > :first-child, .lojee-button-group > slot::slotted(:first-child) { --seg-r-left: calc(var(--bg-r) - 1px); }
.lojee-button-group > slot > :last-child, .lojee-button-group > slot::slotted(:last-child) { --seg-r-right: calc(var(--bg-r) - 1px); }
`;

export function ButtonGroup({ children, shape = "default", selectable = false, defaultActive, onItemClick, className, classNames, transition, transitionDuration, transitionDelay, hoverEffect }: ButtonGroupProps) {
  const root = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<number | undefined>(defaultActive);
  const selectableRef = useRef(selectable);
  useEffect(() => {
    selectableRef.current = selectable;
  });

  // `selectable`: the clicked segment becomes the active one. React `SegmentButton` children get `active` through their props; slotted
  // `<l-segment-button>`s get it through their `active` property (the same two paths the click handler below walks).
  useEffect(() => {
    if (!selectable) return;
    const slot = root.current?.querySelector("slot");
    slot?.assignedElements({ flatten: true }).forEach((el, i) => {
      if ("active" in el) (el as HTMLElement & { active: boolean }).active = i === selected;
    });
  }, [selectable, selected]);

  // One listener for the whole group: find which button the click came from. Buttons are the slot's children in React and its
  // assigned (light-DOM) elements in the Web Component, so both are checked. It is a native listener, not React's `onClick`:
  // React finds the target by walking up parent nodes, and a slotted light-DOM button is not under this element's shadow tree.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
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
      if (selectableRef.current) setSelected(index);
      onItemClick?.({ index, label: (item.textContent ?? "").trim() || item.getAttribute("aria-label") || button?.getAttribute("aria-label") || "" });
    };
    el.addEventListener("click", handleClick);
    return () => el.removeEventListener("click", handleClick);
  }, [onItemClick]);

  const items =
    selectable && selected !== undefined
      ? Children.map(children, (child, i) => (isValidElement(child) && child.type === SegmentButton ? cloneElement(child as ReactElement<SegmentButtonProps>, { active: i === selected }) : child))
      : selectable
        ? Children.map(children, (child) => (isValidElement(child) && child.type === SegmentButton ? cloneElement(child as ReactElement<SegmentButtonProps>, { active: false }) : child))
        : children;

  return (
    <div
      ref={root}
      className={cx(
        "lojee-button-group inline-flex rounded-lg border border-border overflow-hidden divide-x divide-border",
        shapeClasses[shape],
        motionClass(transition, hoverEffect),
        className,
        classNames?.root
      )}
      style={{ ["--bg-r" as string]: GROUP_RADIUS[shape] ?? GROUP_RADIUS.default, ...motionStyle(transitionDuration, transitionDelay) }}
    >
      <style>{GROUP_CSS}</style>
      <slot>{items}</slot>
    </div>
  );
}
