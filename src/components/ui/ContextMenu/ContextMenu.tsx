import { useEffect, useRef, useState } from "react";
import type { MouseEvent as ReactMouseEvent, ReactNode } from "react";
import { cx } from "../../../core/tokens";

export interface ContextMenuProps {
  children: ReactNode;
  menu?: ReactNode;
  className?: string;
  classNames?: {
    root?: string;
    menu?: string;
  };
}

export function ContextMenu({ children, menu, className, classNames }: ContextMenuProps) {
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
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

  const handleContextMenu = (e: ReactMouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setCoords({ x: e.clientX, y: e.clientY });
    setOpen(true);
  };

  return (
    <div ref={rootRef} onContextMenu={handleContextMenu} className={cx("inline-block", className, classNames?.root)}>
      <slot>{children}</slot>

      {open && (
        <div
          role="menu"
          style={{ left: coords.x, top: coords.y }}
          // A click on any menu item bubbles up here and closes the menu —
          // this also works once wrapped as a Web Component, since a click
          // is a composed event that crosses the shadow boundary. A
          // disabled item's <button> never fires a click at all, so it
          // never closes the menu, with no extra handling needed.
          onClick={() => setOpen(false)}
          className={cx(
            "fixed z-10 min-w-[10rem] overflow-hidden rounded-lg border border-slate-200 bg-white py-1 shadow-lg",
            classNames?.menu
          )}
        >
          <slot name="menu">{menu}</slot>
        </div>
      )}
    </div>
  );
}
