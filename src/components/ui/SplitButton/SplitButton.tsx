import { useEffect, useRef } from "react";
import type { MouseEventHandler, ReactNode } from "react";
import type { ColorVariant, ColorName, Shape, Size } from "../../../core/tokens";
import { cx, shapeClasses } from "../../../core/tokens";
import { Button } from "../Buttons/Button";
import { motionClass, motionState, motionStyle, DEFAULT_TRANSITION_MS, type TransitionVariant, type HoverEffect } from "../../../core/motion";
import { usePresence } from "../../../core/usePresence";
import { useOpen } from "../../../core/useOpen";

export type SplitButtonAlign = "start" | "center" | "end" | "left" | "right";

// Same names as ThemeSwitcher's `align` ("left" / "right" also work, as start / end).
const MENU_ALIGN: Record<SplitButtonAlign, string> = {
  start: "left-0",
  left: "left-0",
  center: "left-1/2 -translate-x-1/2",
  end: "right-0",
  right: "right-0",
};

export interface SplitButtonProps {
  /** Icon name, e.g. "check" — see src/core/icons.ts for the available set. */
  icon?: string;
  /** Text of the main action button (also used to build the default menu accessible name). */
  label: string;
  /** Called with the click event when the main action button is clicked. */
  onClick?: MouseEventHandler<HTMLButtonElement>;
  /** Called with the click event when the chevron trigger is clicked, before the menu (if any) toggles. */
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
  /** Visual style shared by both halves: "solid", "outline", "ghost", "soft", "link" or "dashed" (default: "solid"). */
  variant?: ColorVariant;
  /** Button color: a built-in `ColorName` (default: "accent", which follows the theme accent) or any CSS color such as "#8b5cf6". */
  color?: ColorName | (string & {});
  /** "xs" | "sm" | "md" | "lg" | "xl" | "full" (default: "md"). */
  size?: Size;
  /**
   * Corner treatment for the whole group (default keeps the built-in
   * rounded-lg look). The two inner buttons always render as `shape="square"`
   * themselves — the group's outer container does the rounding, via
   * `overflow-hidden`, so the divider between them stays a straight edge.
   */
  shape?: Shape;
  /** Where the dropdown menu (which always opens below the button) lines up with it: "start" (left edges together), "center", or "end" (right edges together). "left" / "right" also work, as start / end. Default: "end". */
  align?: SplitButtonAlign;
  /** Controlled open state of the menu — omit to let the trigger open and close it. Handy to keep the menu showing in docs or screenshots. */
  open?: boolean;
  /** Called when the menu asks to open or close (the trigger, selecting an item, a click outside, Escape). */
  onOpenChange?: (open: boolean) => void;
  /** Disables both the main button and the chevron trigger (default: false). */
  disabled?: boolean;
  /** Enter transition for the button group — also the enter/exit transition for the menu panel: "fade" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "zoom" | "zoom-out" | "flip" | "blur" | "bounce" | "rotate" | "drop" | "skew" (default: none). Respects `prefers-reduced-motion`. */
  transition?: TransitionVariant;
  /** Enter transition duration in ms (default: 450). */
  transitionDuration?: number;
  /** Delay before the enter transition starts, in ms (default: 0) — handy for staggering. */
  transitionDelay?: number;
  /** Effect while hovering: "lift" | "scale" | "press" | "tilt" | "ring" | "glow" | "shine" (default: none). */
  hoverEffect?: HoverEffect;
  /** Extra class names applied to the button group element. */
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
  color = "accent",
  size = "md",
  shape = "default",
  align = "end",
  open: openProp,
  onOpenChange,
  disabled = false,
  className,
  classNames,
  transition,
  transitionDuration,
  transitionDelay,
  hoverEffect,
}: SplitButtonProps) {
  const [open, setOpen] = useOpen(openProp, onOpenChange);
  const rootRef = useRef<HTMLDivElement>(null);
  const hasMenu = children != null;
  // With a `transition` the menu stays mounted for the exit; without one it unmounts immediately, as before.
  const { mounted: menuMounted } = usePresence(open, transition ? (transitionDuration ?? DEFAULT_TRANSITION_MS) : 0);

  useEffect(() => {
    if (!open) return;
    const handlePointerDown = (e: MouseEvent) => {
      // composedPath, not contains(e.target): from a document listener a click inside a web component's shadow root is
      // retargeted to the host element, which would look like an outside click.
      if (rootRef.current && !e.composedPath().includes(rootRef.current)) setOpen(false);
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
  }, [open, setOpen]);

  return (
    <div ref={rootRef} className="relative inline-block">
      <div
        className={cx(
          "inline-flex rounded-lg shadow-sm overflow-hidden",
          shapeClasses[shape],
          motionClass(transition, hoverEffect),
          className,
          classNames?.root
        )}
        style={motionStyle(transitionDuration, transitionDelay)}
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

      {menuMounted && hasMenu && (
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
            "absolute z-10 mt-1.5 min-w-[10rem] overflow-hidden rounded-lg border border-border bg-surface py-1 shadow-lg",
            MENU_ALIGN[align] ?? MENU_ALIGN.end,
            motionClass(transition),
            classNames?.menu
          )}
          style={motionStyle(transitionDuration)}
          {...motionState(open)}
        >
          {/* Named, so a Web Component's <l-split-button-menu-item>s (which assign themselves slot="menu") never land in the main button's own <slot>. */}
          <slot name="menu">{children}</slot>
        </div>
      )}
    </div>
  );
}
