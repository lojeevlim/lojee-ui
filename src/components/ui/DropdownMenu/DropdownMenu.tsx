import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { cx } from "../../../core/tokens";

export type DropdownMenuAlign = "start" | "end";

export interface DropdownMenuProps {
  trigger: ReactNode;
  align?: DropdownMenuAlign;
  children?: ReactNode;
  className?: string;
  classNames?: {
    root?: string;
    menu?: string;
  };
}

export function DropdownMenu({ trigger, align = "start", children, className, classNames }: DropdownMenuProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handlePointerDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={cx("relative inline-block", className, classNames?.root)}>
      <span aria-haspopup="menu" aria-expanded={open} onClick={() => setOpen((prev) => !prev)}>
        <slot name="trigger">{trigger}</slot>
      </span>

      {open && (
        <div
          role="menu"
          // A click on any menu item bubbles up here and closes the menu —
          // this also works once wrapped as a Web Component, since a click
          // is a composed event that crosses the shadow boundary. A
          // disabled item's <button> never fires a click at all, so it
          // never closes the menu, with no extra handling needed.
          onClick={() => setOpen(false)}
          className={cx(
            "absolute z-10 mt-1.5 min-w-[10rem] overflow-hidden rounded-lg border border-slate-200 bg-white py-1 shadow-lg",
            align === "end" ? "right-0" : "left-0",
            classNames?.menu
          )}
        >
          <slot>{children}</slot>
        </div>
      )}
    </div>
  );
}
