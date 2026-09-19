import { useEffect, useRef, useState } from "react";
import type { MouseEventHandler, ReactNode } from "react";
import type { ColorVariant, ColorName, Shape, Size } from "../../../core/tokens";
import { cx, shapeClasses } from "../../../core/tokens";
import { Button } from "./Button";

export interface SplitButtonProps {
  /** Icon name, e.g. "check" — see src/core/icons.ts for the available set. */
  icon?: string;
  label: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  onMenuClick?: MouseEventHandler<HTMLButtonElement>;
  /** Accessible name for the chevron trigger; defaults to `${label} options`. */
  menuLabel?: string;
  /** Icon for the dropdown trigger — see src/core/icons.ts for the available set (default: "chevron-down"). */
  menuIcon?: string;
  /**
   * Dropdown content — one or more `SplitButtonMenuItem` children. When
   * present, clicking the trigger opens a menu listing them instead of (or
   * in addition to, if `onMenuClick` is also set) just firing a click
   * callback. Closes on selecting an item, outside click, or Escape.
   */
  children?: ReactNode;
  variant?: ColorVariant;
  color?: ColorName;
  size?: Size;
  /**
   * Corner treatment for the whole group (default keeps the built-in
   * rounded-lg look). The two inner buttons always render as `shape="square"`
   * themselves — the group's outer container does the rounding, via
   * `overflow-hidden`, so the divider between them stays a straight edge.
   */
  shape?: Shape;
  disabled?: boolean;
  className?: string;
  /** Per-part class overrides — merged after (and win over) the built-in styling. */
  classNames?: {
    root?: string;
    divider?: string;
    mainButton?: string;
    menuButton?: string;
    menu?: string;
  };
}

export function SplitButton({
  icon,
  label,
  onClick,
  onMenuClick,
  menuLabel,
  menuIcon = "chevron-down",
  children,
  variant = "solid",
  color = "slate",
  size = "md",
  shape = "default",
  disabled = false,
  className,
  classNames,
}: SplitButtonProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const hasMenu = children != null;

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
    <div ref={rootRef} className="relative inline-block">
      <div
        className={cx(
          "inline-flex rounded-lg shadow-sm overflow-hidden",
          shapeClasses[shape],
          className,
          classNames?.root
        )}
      >
        <Button
          variant={variant}
          color={color}
          size={size}
          shape="square"
          icon={icon}
          label={label}
          disabled={disabled}
          onClick={onClick}
          className={classNames?.mainButton}
        />
        <div className={cx("w-px self-stretch bg-white/20", classNames?.divider)} />
        <Button
          variant={variant}
          color={color}
          size={size}
          shape="square"
          icon={menuIcon}
          iconOnly
          label={menuLabel ?? `${label} options`}
          disabled={disabled}
          className={classNames?.menuButton}
          aria-haspopup={hasMenu ? "menu" : undefined}
          aria-expanded={hasMenu ? open : undefined}
          onClick={(e) => {
            // Stop the native click from also bubbling out as a plain "click"
            // (relevant once this is wrapped as a Web Component — two real
            // <button> elements otherwise both fire generic "click").
            e.stopPropagation();
            onMenuClick?.(e);
            if (hasMenu) setOpen((prev) => !prev);
          }}
        />
      </div>

      {open && hasMenu && (
        <div
          role="menu"
          aria-label={menuLabel ?? `${label} options`}
          // A click on any menu item bubbles up here and closes the menu —
          // this also works once wrapped as a Web Component, since a click
          // is a composed event that crosses the shadow boundary. A
          // disabled item's <button> never fires a click at all, so it
          // never closes the menu, with no extra handling needed.
          onClick={() => setOpen(false)}
          className={cx(
            "absolute right-0 z-10 mt-1.5 min-w-[10rem] overflow-hidden rounded-lg border border-slate-200 bg-white py-1 shadow-lg",
            classNames?.menu
          )}
        >
          <slot>{children}</slot>
        </div>
      )}
    </div>
  );
}
