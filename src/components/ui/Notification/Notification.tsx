import type { ReactNode } from "react";
import { cx } from "../../../core/tokens";
import { Icon } from "../Icons/Icon";

export interface NotificationProps {
  /** Icon name, e.g. "bell" — see src/core/icons.ts for the available set (default: "bell"). */
  icon?: string;
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
  className,
  classNames,
}: NotificationProps) {
  return (
    <div
      className={cx(
        "flex gap-3 rounded-lg border border-slate-200 p-4",
        className,
        classNames?.root
      )}
    >
      <div
        className={cx(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600",
          classNames?.icon
        )}
      >
        <Icon name={icon} size={18} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start gap-1.5">
          {unread && <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" aria-hidden="true" />}
          <div className={cx("text-sm font-semibold text-slate-900", classNames?.title)}>
            <slot name="title">{title}</slot>
          </div>
        </div>
        {children && (
          <div className={cx("mt-1 text-sm text-slate-600", classNames?.description)}>
            <slot>{children}</slot>
          </div>
        )}
        {timestamp && <div className={cx("mt-1.5 text-xs text-slate-400", classNames?.timestamp)}>{timestamp}</div>}
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
            "-mt-1 -mr-1 h-fit shrink-0 rounded-md p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700",
            classNames?.dismissButton
          )}
        >
          <Icon name="x" size={16} />
        </button>
      )}
    </div>
  );
}
