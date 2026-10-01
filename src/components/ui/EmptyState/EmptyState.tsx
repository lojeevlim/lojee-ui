import type { ReactNode } from "react";
import { cx } from "../../../core/tokens";
import { Icon } from "../Icons/Icon";
import { StatusLayout } from "../internal/StatusLayout";
import type { TransitionVariant } from "../../../core/motion";

export interface EmptyStateProps {
  /** Icon name — see src/core/icons.ts for the available set (default: "folder"). */
  icon?: string;
  /** Heading text shown under the icon. */
  title: ReactNode;
  /** The description/body. */
  children?: ReactNode;
  /** e.g. a <Button>, rendered below the description. */
  action?: ReactNode;
  /** Enter transition: "fade" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "zoom" | "zoom-out" | "flip" | "blur" | "bounce" | "rotate" | "drop" | "skew" (default: none). Respects `prefers-reduced-motion`. */
  transition?: TransitionVariant;
  /** Enter transition duration in ms (default: 450). */
  transitionDuration?: number;
  /** Delay before the enter transition starts, in ms (default: 0) — handy for staggering. */
  transitionDelay?: number;
  /** Extra class name(s) applied to the root element. */
  className?: string;
  /** Per-part class overrides — merged after (and win over) the built-in styling. */
  classNames?: {
    root?: string;
    icon?: string;
    title?: string;
    description?: string;
    action?: string;
  };
}

export function EmptyState({ icon = "folder", title, children, action, transition, transitionDuration, transitionDelay, className, classNames }: EmptyStateProps) {
  return (
    <StatusLayout
      icon={
        <div
          className={cx(
            "flex h-14 w-14 items-center justify-center rounded-full bg-surface-muted text-fg-subtle",
            classNames?.icon
          )}
        >
          <Icon name={icon} size={28} />
        </div>
      }
      title={title}
      description={children}
      action={action}
      transition={transition}
      transitionDuration={transitionDuration}
      transitionDelay={transitionDelay}
      className={className}
      classNames={classNames}
    />
  );
}
