import { createPortal } from "react-dom";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import type { CSSProperties, ReactNode, Ref } from "react";
import { cx, isColorName, type ColorName } from "../../../core/tokens";
import { getIcon } from "../../../core/icons";
import { sidebarActiveFillClasses } from "./sidebarActiveStyles";
import { activeMarker } from "../../../core/activeVariant";
import { motionClass, motionStyle, type TransitionVariant, type HoverEffect } from "../../../core/motion";
import {
  useTooltipPortal,
  tooltipPortalPositionStyle,
  TOOLTIP_PORTAL_Z_CLASS,
  type TooltipPortalPosition,
} from "../../../core/tooltipPortal";

// When `collapsed` isn't passed explicitly, mirror the nearest ancestor <l-sidebar>'s own
// `collapsed` attribute instead of requiring every single item to be wired up individually. This
// only ever finds anything in real Web Component usage — `l-sidebar-menu-item` nested inside
// `l-sidebar` are both ordinary elements in the same light DOM, so a plain `.closest()` from this
// item's own host element reaches it directly, no cross-shadow-boundary trickery needed. r2wc always
// reflects a boolean prop back onto its host as a real "true"/"false" attribute, so it's there to
// read and to watch. Plain React usage has no such tag to find, so passing `collapsed` explicitly
// there still works exactly as it always did.
//
// `forwardedRef` is merged in here (not left for the caller to combine separately) since Sidebar's own
// `items` shortcut needs a real DOM ref per row too, to measure it for its sliding pill (see
// Sidebar.tsx's `renderItemRow`) — this hook already owns the one ref this component ever attaches to
// its root element, so merging happens once, in the one place that needs to know about both.
function useAncestorCollapsed(explicit: boolean | undefined, forwardedRef: Ref<HTMLElement> | undefined) {
  const rootRef = useRef<HTMLElement | null>(null);
  const [auto, setAuto] = useState(false);

  // React's own blessed way to forward a ref this hook also needs to read itself, rather than this
  // code writing to `forwardedRef.current` directly — `rootRef` still attaches straight to the JSX
  // element below as always; this just mirrors that same node onto whatever ref Sidebar's own `items`
  // shortcut passed in, once, since the attached DOM node never changes across this component's life.
  useImperativeHandle(forwardedRef, () => rootRef.current as HTMLElement, []);

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
  /** Called with no arguments when the row is clicked (not called while `disabled`). */
  onClick?: () => void;
  /** Highlights this row as the current page/section (default: false). */
  active?: boolean;
  /** Disables the row so it can't be clicked or focused and renders dimmed (default: false). */
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
  /** Accent color for the active state (default: "accent" — follows the theme accent) — one of the built-in ColorNames, or any
   * other CSS color value; pair it with the same `color` you gave the parent Sidebar. */
  color?: ColorName | (string & {});
  /** How `active` renders (default: "fill"): "fill" colors this row's own background/ring, the usual
   * self-contained look; "text" only switches text color/weight and leaves the background transparent
   * — pass this when something else already supplies the active fill, e.g. Sidebar's own `items`
   * shortcut, which slides one shared pill behind whichever row is active instead of coloring each
   * row's own background (a continuous slide reads far smoother than every row cross-fading its own
   * background independently — see Navbar's identical `NavbarItem.activeStyle` for the full
   * reasoning). Composing `<SidebarMenuItem>` directly still defaults to "fill", since there is no
   * such shared pill to rely on outside that shortcut. */
  activeStyle?: "fill" | "text";
  /** Advanced/rarely-needed: the internal `<slot>` this label renders into is unnamed by default (so
   * a standalone `<l-sidebar-menu-item>My Label</l-sidebar-menu-item>` just works, the same as any
   * plain default slot) — pass a unique value only if you're rendering several `SidebarMenuItem`s that
   * end up sharing one *other* element's shadow root (the way Sidebar's own `items` shortcut does),
   * where multiple unnamed slots in that single root would otherwise all compete for the same
   * unassigned/whitespace light-DOM text nodes (see Navbar's identical `NavbarItem.slotName` for the
   * full reasoning). Has no effect on anything other than which `<slot>` this label lives in. */
  slotName?: string;
  /** Enter transition: "fade" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "zoom" | "zoom-out" | "flip" | "blur" | "bounce" | "rotate" | "drop" | "skew" (default: none). Respects `prefers-reduced-motion`. */
  transition?: TransitionVariant;
  /** Enter transition duration in ms (default: 450). */
  transitionDuration?: number;
  /** Delay before the enter transition starts, in ms (default: 0) — handy for staggering. */
  transitionDelay?: number;
  /** Effect while hovering: "lift" | "scale" | "press" | "tilt" | "ring" | "glow" | "shine" (default: none). */
  hoverEffect?: HoverEffect;
  /** Extra class name(s) appended to the root element. */
  className?: string;
  /** Per-part class overrides — merged after (and win over) the built-in styling. */
  classNames?: {
    root?: string;
    icon?: string;
    label?: string;
    tooltip?: string;
  };
}

export const SidebarMenuItem = forwardRef<HTMLAnchorElement | HTMLButtonElement, SidebarMenuItemProps>(
  function SidebarMenuItem(
    {
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
      color = "accent",
      activeStyle = "fill",
      slotName,
      transition,
      transitionDuration,
      transitionDelay,
      hoverEffect,
      className,
      classNames,
    },
    forwardedRef
  ) {
    const Icon = getIcon(icon);
    const colorIsNamed = isColorName(color);
    const { collapsed, rootRef } = useAncestorCollapsed(collapsedProp, forwardedRef);
    const { ref: triggerRef, state: tooltipState, show, hide } = useTooltipPortal<HTMLAnchorElement>();

    const activeClass = cx(
      "font-medium text-white",
      activeStyle === "fill" && sidebarActiveFillClasses(color, dark, vividActive)
    );
    const idleClass = dark ? "text-white/70 hover:bg-white/5 hover:text-white" : "text-fg-muted hover:bg-surface-muted hover:text-fg";

    const rowClasses = cx(
      "relative flex items-center rounded-lg text-sm transition-[color,background-color,box-shadow] duration-200 ease-[cubic-bezier(.4,0,.2,1)]",
      collapsed ? "w-full justify-center px-1 py-2" : "w-full gap-2.5 px-3 py-2.5",
      disabled && "pointer-events-none opacity-50",
      active ? activeClass : idleClass,
      motionClass(transition, hoverEffect),
      className,
      classNames?.root
    );
    const rowStyle: CSSProperties | undefined =
      active && activeStyle === "fill" && !colorIsNamed ? { backgroundColor: dark ? undefined : color } : undefined;

    // Marks the active row so theme.css can redraw it for the outline / soft active-item variants.
    const baseRowProps = active ? activeMarker(activeStyle === "fill" ? "fill" : "text", color, colorIsNamed, dark, rowStyle) : { style: rowStyle };
    const mStyle = motionStyle(transitionDuration, transitionDelay);
    const rowProps = mStyle ? { ...baseRowProps, style: { ...baseRowProps.style, ...mStyle } } : baseRowProps;

    const iconEl = Icon && (
      // eslint-disable-next-line react-hooks/static-components -- getIcon() always returns the same stable component reference for a given name
      <Icon size={18} className={cx("shrink-0", classNames?.icon)} />
    );

    const content = collapsed ? (
      <span
        ref={triggerRef}
        className="flex w-full min-w-0 flex-col items-center gap-1"
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
      >
        {iconEl}
        {/* A small label under the icon, so the rail is still readable at a glance (the tooltip below
            stays for names too long to fit). */}
        <span className={cx("block w-full truncate text-center text-[10px] leading-none tracking-tight", classNames?.label)}>
          <slot name={slotName}>{children}</slot>
        </span>
        {tooltipState &&
          children != null &&
          createPortal(
            <span
              role="tooltip"
              style={{ position: "fixed", ...tooltipPortalPositionStyle(tooltipState.rect, tooltipPosition) }}
              className={cx(
                "pointer-events-none whitespace-nowrap rounded-md bg-accent-600 px-2 py-1 text-xs font-medium text-white shadow-lg",
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
          <slot name={slotName}>{children}</slot>
        </span>
      </>
    );

    return href ? (
      <a
        ref={rootRef as Ref<HTMLAnchorElement>}
        href={href}
        aria-disabled={disabled}
        aria-current={active ? "page" : undefined}
        className={rowClasses}
        {...rowProps}
        onClick={onClick}
      >
        {content}
      </a>
    ) : (
      <button
        ref={rootRef as Ref<HTMLButtonElement>}
        type="button"
        disabled={disabled}
        aria-current={active ? "page" : undefined}
        className={rowClasses}
        {...rowProps}
        onClick={onClick}
      >
        {content}
      </button>
    );
  }
);
