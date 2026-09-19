import { useEffect } from "react";
import type { ReactNode } from "react";
import { cx } from "../../../core/tokens";
import { Icon } from "../Icons/Icon";
import { getIcon } from "../../../core/icons";

export type ToastVariant = "info" | "success" | "warning" | "error";
export type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export interface ToastProps {
  open: boolean;
  onClose: () => void;
  /** Visual/semantic tone (default: "info"). */
  variant?: ToastVariant;
  title?: ReactNode;
  /** The description/body. */
  children?: ReactNode;
  /** Auto-dismiss after this many ms; 0 or omitted disables auto-dismiss. Default: 4000. */
  duration?: number;
  /** Screen anchor (default: "bottom-right"). */
  position?: ToastPosition;
  /** Icon name to override the variant's default icon, or `false` to hide the icon entirely. */
  icon?: string | false;
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

const DEFAULT_ICON: Record<ToastVariant, string> = {
  info: "info",
  success: "circle-check",
  warning: "triangle-alert",
  error: "circle-x",
};

const VARIANT_CLASSES: Record<ToastVariant, string> = {
  info: "border-blue-200 bg-blue-50 text-blue-800",
  success: "border-emerald-200 bg-emerald-50 text-emerald-800",
  warning: "border-amber-200 bg-amber-50 text-amber-800",
  error: "border-rose-200 bg-rose-50 text-rose-800",
};

const ICON_COLOR_CLASSES: Record<ToastVariant, string> = {
  info: "text-blue-500",
  success: "text-emerald-500",
  warning: "text-amber-500",
  error: "text-rose-500",
};

const POSITION_CLASSES: Record<ToastPosition, string> = {
  "top-left": "top-4 left-4",
  "top-center": "top-4 left-1/2 -translate-x-1/2",
  "top-right": "top-4 right-4",
  "bottom-left": "bottom-4 left-4",
  "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
  "bottom-right": "bottom-4 right-4",
};

export function Toast({
  open,
  onClose,
  variant = "info",
  title,
  children,
  duration = 4000,
  position = "bottom-right",
  icon,
  className,
  classNames,
}: ToastProps) {
  useEffect(() => {
    if (!open || !duration) return;
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [open, duration, onClose]);

  if (!open) return null;

  const iconName = icon === false ? undefined : icon || DEFAULT_ICON[variant];
  const hasIcon = Boolean(iconName && getIcon(iconName));

  return (
    <div className={cx("fixed z-[100] w-full max-w-sm px-4 sm:px-0", POSITION_CLASSES[position])}>
      <div
        role="status"
        aria-live="polite"
        className={cx(
          "flex gap-3 rounded-lg border p-4 shadow-lg",
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
          {children && (
            <div className={cx("text-sm", title ? "mt-1" : "", classNames?.description)}>
              <slot>{children}</slot>
            </div>
          )}
        </div>
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
      </div>
    </div>
  );
}
