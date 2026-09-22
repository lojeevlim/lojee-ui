import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode, RefObject } from "react";
import { cx, isColorName, type ColorName } from "../../../core/tokens";
import { getIcon } from "../../../core/icons";
import {
  useTooltipPortal,
  tooltipPortalPositionStyle,
  TOOLTIP_PORTAL_Z_CLASS,
  type TooltipPortalPosition,
} from "../../../core/tooltipPortal";

// A solid active-state fill per accent color — kept as its own map (not
// derived from Button's colorClasses) since a nav row's "selected" look
// (plain bg + white text, no hover/active/focus-ring variants) doesn't match
// any single Button variant closely enough to reuse directly.
const ACTIVE_BG: Record<ColorName, string> = {
  slate: "bg-slate-900",
  gray: "bg-gray-700",
  indigo: "bg-indigo-600",
  violet: "bg-violet-600",
  blue: "bg-blue-600",
  cyan: "bg-cyan-600",
  emerald: "bg-emerald-600",
  teal: "bg-teal-600",
  amber: "bg-amber-500",
  orange: "bg-orange-600",
  rose: "bg-rose-600",
  pink: "bg-pink-600",
};

// Translucent version for dark-ish backgrounds (`dark` prop true — pass this
// alongside Sidebar's variant="dark"/"gradient"/"glass") — a solid ACTIVE_BG
// color would clash with an already-dark or already-colored surface.
const DARK_ACTIVE_BG: Record<ColorName, string> = {
  slate: "bg-white/10",
  gray: "bg-white/10",
  indigo: "bg-indigo-500/25",
  violet: "bg-violet-500/25",
  blue: "bg-blue-500/25",
  cyan: "bg-cyan-500/25",
  emerald: "bg-emerald-500/25",
  teal: "bg-teal-500/25",
  amber: "bg-amber-500/25",
  orange: "bg-orange-500/25",
  rose: "bg-rose-500/25",
  pink: "bg-pink-500/25",
};

// Stronger version of the above, for `vividActive` (Sidebar's variant="gradient"/"glass" — but not
// "dark") — those two sit on a translucent or already-colorful surface, where DARK_ACTIVE_BG's subtle
// overlay is much easier to lose than it is against "dark"'s plain, solid near-black fill.
const VIVID_ACTIVE_BG: Record<ColorName, string> = {
  slate: "bg-white/35",
  gray: "bg-white/35",
  indigo: "bg-indigo-500/65",
  violet: "bg-violet-500/65",
  blue: "bg-blue-500/65",
  cyan: "bg-cyan-500/65",
  emerald: "bg-emerald-500/65",
  teal: "bg-teal-500/65",
  amber: "bg-amber-500/65",
  orange: "bg-orange-500/65",
  rose: "bg-rose-500/65",
  pink: "bg-pink-500/65",
};

// When `collapsed` isn't passed explicitly, mirror the nearest ancestor <l-sidebar>'s own
// `collapsed` attribute instead of requiring every single item to be wired up individually. This
// only ever finds anything in real Web Component usage — `l-sidebar-menu-item` nested inside
// `l-sidebar` are both ordinary elements in the same light DOM, so a plain `.closest()` from this
// item's own host element reaches it directly, no cross-shadow-boundary trickery needed. r2wc always
// reflects a boolean prop back onto its host as a real "true"/"false" attribute, so it's there to
// read and to watch. Plain React usage has no such tag to find, so passing `collapsed` explicitly
// there still works exactly as it always did.
function useAncestorCollapsed(explicit: boolean | undefined) {
  const rootRef = useRef<HTMLElement>(null);
  const [auto, setAuto] = useState(false);

  useEffect(() => {
    if (explicit !== undefined) return;
    const root = rootRef.current?.getRootNode();
    const host = root instanceof ShadowRoot ? root.host : null;
    const sidebar = host?.closest("l-sidebar");
    if (!sidebar) return;

    const sync = () => setAuto(sidebar.getAttribute("collapsed") === "true");
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(sidebar, { attributes: true, attributeFilter: ["collapsed"] });
    return () => observer.disconnect();
  }, [explicit]);

  return { collapsed: explicit ?? auto, rootRef };
}

// Slides+fades the label away instead of yanking it out on the spot, so a row
// still reads as one continuous motion while its parent Sidebar animates
// between expanded/collapsed widths.
function labelSlideStyle(hidden: boolean): CSSProperties {
  return {
    display: "inline-block",
    overflow: "hidden",
    opacity: hidden ? 0 : 1,
    maxWidth: hidden ? 0 : 200,
    transform: hidden ? "translateX(-6px)" : "translateX(0)",
    transition: "opacity .15s ease, transform .2s cubic-bezier(.4,0,.2,1), max-width .2s cubic-bezier(.4,0,.2,1)",
  };
}

export interface SidebarMenuItemProps {
  /** Icon name, e.g. "home" — see src/core/icons.ts for the available set. */
  icon?: string;
  /** The row's label. */
  children?: ReactNode;
  /** Renders as a link when set; otherwise a `<button type="button">`. */
  href?: string;
  onClick?: () => void;
  /** Highlights this row as the current page/section (default: false). */
  active?: boolean;
  disabled?: boolean;
  /**
   * Narrows to an icon-only row and shows `children` in a fly-out tooltip instead. Leave this unset
   * to have it mirror the nearest ancestor `<l-sidebar>`'s own `collapsed` state automatically (Web
   * Component usage only — nothing to configure). In plain React, where there's no such DOM ancestor
   * to detect, it just defaults to `false`; pass Sidebar's own `collapsed` value here explicitly.
   */
  collapsed?: boolean;
  /** Tooltip placement while `collapsed` (default: "right" — the usual fly-out direction for a
   * left-docked collapsed rail). */
  tooltipPosition?: TooltipPortalPosition;
  /** Use the translucent active/hover treatment made for dark surfaces (default: false) — pass
   * `true` alongside a Sidebar `variant="dark"/"gradient"/"glass"`. */
  dark?: boolean;
  /** Strengthens the active row's background/ring beyond `dark`'s usual subtle overlay (default:
   * false) — pass `true` alongside a Sidebar `variant="gradient"/"glass"` specifically (not "dark"),
   * since those sit on a translucent or already-colorful surface where the normal overlay is much
   * easier to lose than it is against "dark"'s plain, solid fill. Has no effect when `dark` is false. */
  vividActive?: boolean;
  /** Accent color for the active state (default: "slate") — one of the built-in ColorNames, or any
   * other CSS color value; pair it with the same `color` you gave the parent Sidebar. */
  color?: ColorName | (string & {});
  className?: string;
  classNames?: {
    root?: string;
    icon?: string;
    label?: string;
    tooltip?: string;
  };
}

export function SidebarMenuItem({
  icon,
  children,
  href,
  onClick,
  active = false,
  disabled = false,
  collapsed: collapsedProp,
  tooltipPosition = "right",
  dark = false,
  vividActive = false,
  color = "slate",
  className,
  classNames,
}: SidebarMenuItemProps) {
  const Icon = getIcon(icon);
  const colorIsNamed = isColorName(color);
  const { collapsed, rootRef } = useAncestorCollapsed(collapsedProp);
  const { ref: triggerRef, state: tooltipState, show, hide } = useTooltipPortal<HTMLAnchorElement>();

  const activeClass = dark
    ? cx(
        colorIsNamed ? (vividActive ? VIVID_ACTIVE_BG[color] : DARK_ACTIVE_BG[color]) : vividActive ? "bg-white/35" : "bg-white/10",
        "font-medium text-white",
        // Extra edge definition on top of the stronger fill — a translucent/gradient surface doesn't
        // give the active row a contrasting opaque background to read against the way "dark"'s plain
        // fill does, so the ring/shadow does some of that job instead.
        vividActive && "shadow-md ring-1 ring-inset ring-white/40"
      )
    : colorIsNamed
      ? `${ACTIVE_BG[color]} font-medium text-white shadow-sm`
      : "font-medium text-white shadow-sm";
  const idleClass = dark ? "text-white/70 hover:bg-white/5 hover:text-white" : "text-slate-600 hover:bg-slate-100";

  const rowClasses = cx(
    "flex items-center rounded-lg text-sm transition-colors",
    collapsed ? "w-full justify-center px-2 py-2.5" : "w-full gap-2.5 px-3 py-2.5",
    disabled && "pointer-events-none opacity-50",
    active ? activeClass : idleClass,
    className,
    classNames?.root
  );
  const rowStyle: CSSProperties | undefined =
    active && !colorIsNamed ? { backgroundColor: dark ? undefined : color } : undefined;

  const iconEl = Icon && (
    // eslint-disable-next-line react-hooks/static-components -- getIcon() always returns the same stable component reference for a given name
    <Icon size={18} className={cx("shrink-0", classNames?.icon)} />
  );

  const content = collapsed ? (
    <span
      ref={triggerRef}
      className="flex"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {iconEl}
      {tooltipState &&
        children != null &&
        createPortal(
          <span
            role="tooltip"
            style={{ position: "fixed", ...tooltipPortalPositionStyle(tooltipState.rect, tooltipPosition) }}
            className={cx(
              "pointer-events-none whitespace-nowrap rounded-md bg-slate-900 px-2 py-1 text-xs font-medium text-white shadow-lg",
              TOOLTIP_PORTAL_Z_CLASS,
              classNames?.tooltip
            )}
          >
            {children}
          </span>,
          tooltipState.root
        )}
    </span>
  ) : (
    <>
      {iconEl}
      <span className={cx("truncate", classNames?.label)} style={labelSlideStyle(false)}>
        <slot>{children}</slot>
      </span>
    </>
  );

  return href ? (
    <a
      ref={rootRef as RefObject<HTMLAnchorElement>}
      href={href}
      aria-disabled={disabled}
      aria-current={active ? "page" : undefined}
      className={rowClasses}
      style={rowStyle}
      onClick={onClick}
    >
      {content}
    </a>
  ) : (
    <button
      ref={rootRef as RefObject<HTMLButtonElement>}
      type="button"
      disabled={disabled}
      aria-current={active ? "page" : undefined}
      className={rowClasses}
      style={rowStyle}
      onClick={onClick}
    >
      {content}
    </button>
  );
}
