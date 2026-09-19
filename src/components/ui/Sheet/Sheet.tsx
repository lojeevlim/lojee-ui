import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { X } from "lucide-react";
import { cx } from "../../../core/tokens";

export interface SheetProps {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  children?: ReactNode;
  className?: string;
  /** Per-part class overrides — merged after (and win over) the built-in styling. */
  classNames?: {
    root?: string;
    overlay?: string;
    /** The sliding panel itself (root className is a shorthand for this). */
    panel?: string;
    handle?: string;
    header?: string;
    title?: string;
    closeButton?: string;
    body?: string;
  };
}

export function Sheet({ open, onClose, title, children, className, classNames }: SheetProps) {
  const [entered, setEntered] = useState(false);
  const [prevOpen, setPrevOpen] = useState(open);

  if (open !== prevOpen) {
    setPrevOpen(open);
    setEntered(false);
  }

  useEffect(() => {
    if (!open) return;
    const frame = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(frame);
  }, [open]);

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
    <div className={cx("fixed inset-0 z-[100]", classNames?.root)} role="dialog" aria-modal="true">
      {/* No portal: when this is wrapped as a Web Component it's mounted inside a
          Shadow DOM alongside an injected <style> tag with Tailwind's compiled
          CSS — portaling to document.body would escape that root and render
          unstyled, so the panel is just plain nested JSX like Modal. */}
      <div className={cx("absolute inset-0 bg-black/40 backdrop-blur-sm", classNames?.overlay)} onClick={onClose} />
      <div
        className={cx(
          "fixed bottom-0 left-0 right-0 flex max-h-[80vh] flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl ring-1 ring-black/5 transition-transform duration-300 ease-out",
          entered ? "translate-y-0" : "translate-y-full",
          className,
          classNames?.panel
        )}
      >
        <div className="flex shrink-0 justify-center pt-3">
          <div className={cx("mx-auto h-1 w-10 rounded-full bg-slate-300", classNames?.handle)} />
        </div>
        <div
          className={cx("flex shrink-0 items-center justify-between border-b border-slate-200 px-6 py-4", classNames?.header)}
        >
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
