import type { ButtonHTMLAttributes, MouseEventHandler } from "react";
import { colorClasses, cx, isColorName, nonInteractive, type ColorName } from "../../../core/tokens";
import { ACTIVE_ITEM_TRANSITION, activeMarker } from "../../../core/activeVariant";
import { getIcon } from "../../../core/icons";
import { motionClass, motionStyle, type TransitionVariant, type HoverEffect } from "../../../core/motion";

export interface SegmentButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Icon name, e.g. "bold" — see src/core/icons.ts for the available set. */
  icon?: string;
  /** Whether this segment is currently selected/pressed — highlights it and sets `aria-pressed` (default: false); controlled by the parent. */
  active?: boolean;
  /** Called with the click event when the segment is clicked. */
  onClick?: MouseEventHandler<HTMLButtonElement>;
  /** Highlight color when active — same palette as Button (default: accent — follows the theme). Inactive segments stay neutral. */
  color?: ColorName | (string & {});
  /** Enter transition: "fade" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "zoom" | "zoom-out" | "flip" | "blur" | "bounce" | "rotate" | "drop" | "skew" (default: none). Respects `prefers-reduced-motion`. */
  transition?: TransitionVariant;
  /** Enter transition duration in ms (default: 450). */
  transitionDuration?: number;
  /** Delay before the enter transition starts, in ms (default: 0) — handy for staggering. */
  transitionDelay?: number;
  /** Effect while hovering: "lift" | "scale" | "press" | "tilt" | "ring" | "glow" | "shine" (default: none). */
  hoverEffect?: HoverEffect;
  /** Per-part class overrides — merged after (and win over) the built-in styling. */
  classNames?: {
    root?: string;
    icon?: string;
  };
}

export function SegmentButton({
  icon,
  active = false,
  color = "accent",
  children,
  onClick,
  type = "button",
  className,
  classNames,
  transition,
  transitionDuration,
  transitionDelay,
  hoverEffect,
  style,
  ...rest
}: SegmentButtonProps) {
  // getIcon() always returns the same stable, module-level-imported
  // component reference for a given name, so this never actually causes a
  // remount — the lint rule can't verify that statically, hence the disable.
  const Icon = getIcon(icon);
  const named = isColorName(color);
  const activeClass = named ? nonInteractive((colorClasses[color] || colorClasses.slate).solid) : "text-white";
  return (
    <button
      type={type}
      onClick={onClick}
      aria-pressed={active}
      {...(active && activeMarker("fill", color, named))}
      className={cx(
        "inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium",
        ACTIVE_ITEM_TRANSITION,
        active ? activeClass : "bg-surface text-fg-muted hover:bg-surface-muted",
        motionClass(transition, hoverEffect),
        className,
        classNames?.root
      )}
      style={{ ...(active && !named ? { backgroundColor: color } : {}), ...style, ...motionStyle(transitionDuration, transitionDelay) }}
      {...rest}
    >
      {/* eslint-disable-next-line react-hooks/static-components -- see comment above `const Icon` */}
      {Icon && <Icon size={15} className={classNames?.icon} />}
      <slot>{children}</slot>
    </button>
  );
}
