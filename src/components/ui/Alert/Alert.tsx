import type { ReactNode } from "react";
import { cx } from "../../../core/tokens";
import { Icon } from "../Icons/Icon";
import { getIcon } from "../../../core/icons";

export type AlertVariant = "info" | "success" | "warning" | "error";

export interface AlertProps {
  /** Visual/semantic tone (default: "info"). */
  variant?: AlertVariant;
  title?: ReactNode;
  /** The description/body. */
  children: ReactNode;
  /** Icon name to override the variant's default icon, or `false` to hide the icon entirely. */
  icon?: string | false;
  closable?: boolean;
  onClose?: () => void;
  className?: string;
  /** Per-part class overrides — merged after (and win over) the built-in styling. */
  classNames?: {
    root?: string;
    icon?: string;
    title?: string;
    description?: string;
    closeButton?: string;
  };
}

const DEFAULT_ICON: Record<AlertVariant, string> = {
  info: "info",
  success: "circle-check",
  warning: "triangle-alert",
  error: "circle-x",
};

const VARIANT_CLASSES: Record<AlertVariant, string> = {
  info: "border-blue-200 bg-blue-50 text-blue-800",
  success: "border-emerald-200 bg-emerald-50 text-emerald-800",
  warning: "border-amber-200 bg-amber-50 text-amber-800",
  error: "border-rose-200 bg-rose-50 text-rose-800",
};

const ICON_COLOR_CLASSES: Record<AlertVariant, string> = {
  info: "text-blue-500",
  success: "text-emerald-500",
  warning: "text-amber-500",
  error: "text-rose-500",
};

export function Alert({
  variant = "info",
  title,
  children,
  icon,
  closable = false,
  onClose,
  className,
  classNames,
}: AlertProps) {
  const iconName = icon === false ? undefined : icon || DEFAULT_ICON[variant];
  // getIcon() always returns the same stable, module-level-imported
  // component reference for a given name, so this never actually causes a
  // remount — the lint rule can't verify that statically, hence the disable
  // (only relevant here so we can decide whether to render the icon slot at
  // all before handing the name off to <Icon>).
  const hasIcon = Boolean(iconName && getIcon(iconName));

  return (
    <div
      role="alert"
      className={cx(
        "flex gap-3 rounded-lg border p-4",
        VARIANT_CLASSES[variant],
        className,
        classNames?.root
      )}
    >
      {hasIcon && iconName && (
        <Icon name={iconName} size={20} className={cx("mt-0.5 shrink-0", ICON_COLOR_CLASSES[variant], classNames?.icon)} />
      )}
      <div className="min-w-0 flex-1">
        {title && (
          <div className={cx("text-sm font-semibold", classNames?.title)}>
            <slot name="title">{title}</slot>
          </div>
        )}
        <div className={cx("text-sm", title ? "mt-1" : "", classNames?.description)}>
          <slot>{children}</slot>
        </div>
      </div>
      {closable && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Dismiss"
          className={cx(
            "-mt-1 -mr-1 shrink-0 rounded-md p-1 opacity-60 transition-opacity hover:opacity-100",
            classNames?.closeButton
          )}
        >
          <Icon name="x" size={16} />
        </button>
      )}
    </div>
  );
}
