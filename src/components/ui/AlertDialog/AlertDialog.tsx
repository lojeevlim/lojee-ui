import { useEffect } from "react";
import type { ReactNode } from "react";
import { TriangleAlert, CircleHelp } from "lucide-react";
import { cx } from "../../../core/tokens";
import { Button } from "../Buttons/Button";

export type AlertDialogVariant = "default" | "destructive";

export interface AlertDialogProps {
  /** Whether the dialog is visible (controlled); nothing is rendered when false. */
  open: boolean;
  /** Called with no arguments when the dialog should close: on Cancel, on Confirm (after `onConfirm`), on overlay click, or on Escape. */
  onClose: () => void;
  /** Dialog heading. */
  title: ReactNode;
  /** Optional supporting text shown beneath the title. */
  description?: ReactNode;
  /** "default" or "destructive" — destructive uses a warning icon and a destructive confirm button (default: "default"). */
  variant?: AlertDialogVariant;
  /** Text of the confirm button (default: "Confirm"). */
  confirmLabel?: string;
  /** Text of the cancel button (default: "Cancel"). */
  cancelLabel?: string;
  /** Called with no arguments when the confirm button is clicked, just before `onClose` fires. */
  onConfirm?: () => void;
  /** Extra class names applied to the dialog panel. */
  className?: string;
  /** Per-part class overrides (`root`, `overlay`, `icon`, `title`, `description`, `footer`, `confirmButton`, `cancelButton`) — merged after the built-in styling. */
  classNames?: {
    root?: string;
    overlay?: string;
    icon?: string;
    title?: string;
    description?: string;
    footer?: string;
    confirmButton?: string;
    cancelButton?: string;
  };
}

export function AlertDialog({
  open,
  onClose,
  title,
  description,
  variant = "default",
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  className,
  classNames,
}: AlertDialogProps) {
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) return null;

  const handleCancel = () => onClose();
  const handleConfirm = () => {
    onConfirm?.();
    onClose();
  };

  const destructive = variant === "destructive";
  // getIcon() isn't used here since the icon is chosen by variant, not a
  // user-selectable name — same treatment Modal.tsx gives its close (X) icon.
  const Icon = destructive ? TriangleAlert : CircleHelp;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className={cx("absolute inset-0 bg-black/40 backdrop-blur-sm", classNames?.overlay)}
        onClick={onClose}
      />
      <div
        role="alertdialog"
        aria-modal="true"
        className={cx(
          "relative flex w-full max-w-md flex-col overflow-hidden rounded-2xl bg-surface p-6 shadow-2xl ring-1 ring-black/5",
          className,
          classNames?.root
        )}
      >
        <div
          className={cx(
            "flex h-10 w-10 items-center justify-center rounded-full",
            destructive ? "bg-rose-100 text-rose-600 dark:bg-rose-950/50 dark:text-rose-400" : "bg-surface-muted text-fg-muted",
            classNames?.icon
          )}
        >
          <Icon size={20} />
        </div>
        <h2 className={cx("mt-4 text-base font-semibold text-fg", classNames?.title)}>
          <slot name="title">{title}</slot>
        </h2>
        {description && (
          <p className={cx("mt-1.5 text-sm text-fg-subtle", classNames?.description)}>
            <slot>{description}</slot>
          </p>
        )}
        <div className={cx("mt-6 flex justify-end gap-2", classNames?.footer)}>
          <Button variant="outline" label={cancelLabel} onClick={handleCancel} className={classNames?.cancelButton} />
          <Button
            variant={destructive ? "destructive" : "solid"}
            label={confirmLabel}
            onClick={handleConfirm}
            className={classNames?.confirmButton}
          />
        </div>
      </div>
    </div>
  );
}
