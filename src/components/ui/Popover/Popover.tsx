import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { cx } from "../../../core/tokens";

export type PopoverPosition = "top" | "bottom" | "left" | "right";

export interface PopoverProps {
  content: ReactNode;
  children: ReactNode;
  position?: PopoverPosition;
  className?: string;
  classNames?: {
    root?: string;
    panel?: string;
  };
}

const POSITION_CLASSES: Record<PopoverPosition, string> = {
  top: "bottom-full left-1/2 mb-2 -translate-x-1/2",
  bottom: "top-full left-1/2 mt-2 -translate-x-1/2",
  left: "right-full top-1/2 mr-2 -translate-y-1/2",
  right: "left-full top-1/2 ml-2 -translate-y-1/2",
};

export function Popover({ content, children, position = "bottom", className, classNames }: PopoverProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLSpanElement>(null);

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
    <span ref={rootRef} className={cx("relative inline-block", className, classNames?.root)}>
      <span onClick={() => setOpen((prev) => !prev)}>
        <slot>{children}</slot>
      </span>

      {open && (
        <div
          role="dialog"
          className={cx(
            "absolute z-10 rounded-lg border border-slate-200 bg-white p-4 shadow-lg",
            POSITION_CLASSES[position],
            classNames?.panel
          )}
        >
          <slot name="content">{content}</slot>
        </div>
      )}
    </span>
  );
}
