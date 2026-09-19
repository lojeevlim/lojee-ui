import { useEffect } from "react";
import type { ReactNode } from "react";
import { X } from "lucide-react";
import { cx } from "../../core/tokens";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  children: ReactNode;
  className?: string;
  /** Per-part class overrides — merged after (and win over) the built-in styling. */
  classNames?: {
    /** The dialog panel itself (root className is a shorthand for this). */
    root?: string;
    overlay?: string;
    header?: string;
    title?: string;
    closeButton?: string;
    body?: string;
  };
}

export default function Modal({ open, onClose, title, children, className, classNames }: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div
        className={cx("absolute inset-0 bg-black/40 backdrop-blur-sm", classNames?.overlay)}
        onClick={onClose}
      />
      <div
        className={cx(
          "relative flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5",
          className,
          classNames?.root
        )}
      >
        <div className={cx("flex shrink-0 items-center justify-between border-b border-slate-200 px-6 py-4", classNames?.header)}>
          <h2 className={cx("text-base font-semibold text-slate-900", classNames?.title)}>
            <slot name="title">{title}</slot>
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className={cx(
              "rounded-md p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700",
              classNames?.closeButton
            )}
          >
            <X size={18} />
          </button>
        </div>
        <div className={cx("overflow-y-auto p-6", classNames?.body)}>
          <slot>{children}</slot>
        </div>
      </div>
    </div>
  );
}
