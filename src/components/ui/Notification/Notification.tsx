import type { ReactNode } from "react";
import { cx } from "../../../core/tokens";
import { Icon } from "../Icons/Icon";
import { motionClass, motionStyle, type TransitionVariant, type HoverEffect } from "../../../core/motion";

export interface NotificationProps {
  /** Icon name, e.g. "bell" — see src/core/icons.ts for the available set (default: "bell"). */
  icon?: string;
  /** Bold heading line of the notification. */
  title: ReactNode;
  /** The description/body. */
  children?: ReactNode;
  /** Freeform display string, e.g. "2m ago" — not a real Date, just text. */
  timestamp?: string;
  /** Shows a small colored dot near the title. */
  unread?: boolean;
  /** Shows a close (x) button when provided. */
  onDismiss?: () => void;
  /** Optional row of action buttons/links below the description. */
  actions?: ReactNode;
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
  classNames?: {
    root?: string;
    icon?: string;
    title?: string;
    description?: string;
    timestamp?: string;
    dismissButton?: string;
    actions?: string;
  };
}

export function Notification({
  icon = "bell",
  title,
  children,
  timestamp,
  unread = false,
  onDismiss,
  actions,
  transition,
  transitionDuration,
  transitionDelay,
  hoverEffect,
  className,
  classNames,
}: NotificationProps) {
  return (
    <div
      className={cx(
        "flex gap-3 rounded-lg border border-border p-4",
        motionClass(transition, hoverEffect),
        className,
        classNames?.root
      )}
      style={motionStyle(transitionDuration, transitionDelay)}
    >
      <div
        className={cx(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface-muted text-fg-muted",
          classNames?.icon
        )}
      >
        <Icon name={icon} size={18} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start gap-1.5">
          {unread && <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500" aria-hidden="true" />}
          <div className={cx("text-sm font-semibold text-fg", classNames?.title)}>
            <slot name="title">{title}</slot>
          </div>
        </div>
        {children && (
          <div className={cx("mt-1 text-sm text-fg-muted", classNames?.description)}>
            <slot>{children}</slot>
          </div>
        )}
        {timestamp && <div className={cx("mt-1.5 text-xs text-fg-subtle", classNames?.timestamp)}>{timestamp}</div>}
        {actions && (
          <div className={cx("mt-3 flex flex-wrap items-center gap-2", classNames?.actions)}>
            <slot name="actions">{actions}</slot>
          </div>
        )}
      </div>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss"
          className={cx(
            "-mt-1 -mr-1 h-fit shrink-0 rounded-md p-1 text-fg-subtle transition-colors hover:bg-surface-muted hover:text-fg-muted",
            classNames?.dismissButton
          )}
        >
          <Icon name="x" size={16} />
        </button>
      )}
    </div>
  );
}
