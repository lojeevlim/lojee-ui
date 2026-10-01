import type { ReactNode } from "react";
import { cx } from "../../../core/tokens";
import { getIcon } from "../../../core/icons";
import { motionClass, motionStyle, type TransitionVariant } from "../../../core/motion";

export interface AccordionItemProps {
  /** Heading shown in the always-visible trigger row; clicking it expands or collapses the panel. */
  title: ReactNode;
  /** Shared value across sibling AccordionItems for native browser exclusive-open grouping (same mechanism as radio inputs' `name`) — the browser itself keeps only one open. Omit for an independently toggleable item. */
  name?: string;
  /** Whether the item starts expanded (uncontrolled — the browser owns the open state afterwards; default: false). */
  defaultOpen?: boolean;
  /** Disables interaction and dims the item so it cannot be toggled (default: false). */
  disabled?: boolean;
  /** Content of the collapsible panel, shown while the item is open. */
  children?: ReactNode;
  /** Enter transition: "fade" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "zoom" | "zoom-out" | "flip" | "blur" | "bounce" | "rotate" | "drop" | "skew" (default: none). Respects `prefers-reduced-motion`. */
  transition?: TransitionVariant;
  /** Enter transition duration in ms (default: 450). */
  transitionDuration?: number;
  /** Delay before the enter transition starts, in ms (default: 0) — handy for staggering. */
  transitionDelay?: number;
  /** Extra class names applied to the item's root element. */
  className?: string;
  /** Per-part class overrides (`root`, `trigger`, `icon`, `panel`) — merged after the built-in styling. */
  classNames?: {
    root?: string;
    trigger?: string;
    icon?: string;
    panel?: string;
  };
}

export function AccordionItem({ title, name, defaultOpen, disabled = false, children, transition, transitionDuration, transitionDelay, className, classNames }: AccordionItemProps) {
  // getIcon() always returns the same stable, module-level-imported
  // component reference for a given name, so this never actually causes a
  // remount — the lint rule can't verify that statically, hence the disable.
  const ChevronDownIcon = getIcon("chevron-down");
  return (
    // Built on native <details>/<summary> with a shared `name` — modern
    // browsers make same-named <details> elements mutually exclusive with
    // zero JS, which is the only way to coordinate sibling items once they
    // may arrive as separately-mounted Web Components with their own shadow
    // roots (see the constraint documented at the top of this component pair).
    <details
      name={name}
      open={defaultOpen}
      className={cx("lojee-accordion-item group", disabled && "pointer-events-none opacity-40", motionClass(transition), className, classNames?.root)}
      style={motionStyle(transitionDuration, transitionDelay)}
    >
      <summary
        className={cx(
          "flex cursor-pointer list-none items-center justify-between gap-2 px-4 py-3 text-sm font-medium text-fg [&::-webkit-details-marker]:hidden",
          classNames?.trigger
        )}
      >
        <slot name="title">{title}</slot>
        {/* eslint-disable-next-line react-hooks/static-components -- see comment above `const ChevronDownIcon` */}
        {ChevronDownIcon && <ChevronDownIcon size={16} className={cx("shrink-0 text-fg-subtle transition-transform group-open:rotate-180", classNames?.icon)} />}
      </summary>
      <div className={cx("px-4 pb-4 text-sm text-fg-muted", classNames?.panel)}>
        <slot>{children}</slot>
      </div>
    </details>
  );
}
