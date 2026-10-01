import type { InputHTMLAttributes } from "react";
import { cx } from "../../../core/tokens";
import { motionClass, motionStyle, type TransitionVariant, type HoverEffect } from "../../../core/motion";
import { Icon } from "../Icons/Icon";

export type SearchInputSize = "sm" | "md" | "lg";

export interface SearchInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  /** Control height and text size: "sm", "md" (default) or "lg". */
  size?: SearchInputSize;
  /** Called when the clear (x) button is clicked — only rendered when `value` is truthy and this is provided. */
  onClear?: () => void;
  /** Enter transition: "fade" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "zoom" | "zoom-out" | "flip" | "blur" | "bounce" | "rotate" | "drop" | "skew" (default: none). Respects `prefers-reduced-motion`. */
  transition?: TransitionVariant;
  /** Enter transition duration in ms (default: 450). */
  transitionDuration?: number;
  /** Delay before the enter transition starts, in ms (default: 0) — handy for staggering. */
  transitionDelay?: number;
  /** Effect while hovering: "lift" | "scale" | "press" | "tilt" | "ring" | "glow" | "shine" (default: none). */
  hoverEffect?: HoverEffect;
  /** Extra CSS class(es) added to the root element, merged before `classNames.root`. */
  className?: string;
  /** Per-part class overrides — merged after (and win over) the built-in styling. */
  classNames?: { root?: string; input?: string; icon?: string; clearButton?: string };
}

const SIZE_CLASSES: Record<SearchInputSize, string> = {
  sm: "h-8 px-2.5 text-sm",
  md: "h-10 px-3 text-sm",
  lg: "h-12 px-4 text-base",
};

const ICON_PX: Record<SearchInputSize, number> = { sm: 14, md: 16, lg: 18 };

const BASE_CLASSES =
  "w-full rounded-md border border-border-strong bg-surface text-fg placeholder:text-fg-subtle outline-none transition-colors focus:border-fg-subtle focus:ring-2 focus:ring-fg-subtle/20 disabled:cursor-not-allowed disabled:opacity-50";

export function SearchInput({ size = "md", onClear, value, className, classNames, transition, transitionDuration, transitionDelay, hoverEffect, ...rest }: SearchInputProps) {
  const showClear = Boolean(value) && Boolean(onClear);

  return (
    <span className={cx("relative inline-flex w-full items-center", motionClass(transition, hoverEffect), className, classNames?.root)} style={motionStyle(transitionDuration, transitionDelay)}>
      <Icon
        name="search"
        size={ICON_PX[size]}
        className={cx("pointer-events-none absolute left-3 text-fg-subtle", classNames?.icon)}
      />
      <input
        type="text"
        value={value}
        className={cx(BASE_CLASSES, SIZE_CLASSES[size], "pl-9", showClear && "pr-9", classNames?.input)}
        {...rest}
      />
      {showClear && (
        <button
          type="button"
          onClick={onClear}
          aria-label="Clear search"
          className={cx("pointer-events-auto absolute right-3 text-fg-subtle hover:text-fg-muted", classNames?.clearButton)}
        >
          <Icon name="x" size={14} />
        </button>
      )}
    </span>
  );
}
