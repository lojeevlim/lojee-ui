import { forwardRef } from "react";
import type { CSSProperties, ReactNode, Ref } from "react";
import { cx, isColorName, type ColorName } from "../../../core/tokens";
import { getIcon } from "../../../core/icons";
import { navbarActiveFillClasses } from "./navbarActiveStyles";
import { activeMarker } from "../../../core/activeVariant";
import { motionClass, motionStyle, type TransitionVariant, type HoverEffect } from "../../../core/motion";

export interface NavbarItemProps {
  /** Icon name, e.g. "home" — see src/core/icons.ts for the available set. */
  icon?: string;
  /** The link's label. */
  children?: ReactNode;
  /** Renders as a link when set; otherwise a `<button type="button">`. */
  href?: string;
  /** Called with no arguments when the item is clicked. */
  onClick?: () => void;
  /** Highlights this as the current page/section (default: false). */
  active?: boolean;
  /** Prevents interaction and dims the item (default: false). */
  disabled?: boolean;
  /** Use the translucent active/hover treatment made for dark surfaces (default: false) — pass `true`
   * alongside a Navbar `variant="dark"/"gradient"`. */
  dark?: boolean;
  /** Strengthens the active link's background/ring beyond `dark`'s usual subtle overlay (default:
   * false) — pass `true` alongside a Navbar `variant="gradient"` specifically (not "dark"),
   * since those sit on a translucent or already-colorful surface where the normal overlay is much
   * easier to lose than it is against "dark"'s plain, solid fill. Has no effect when `dark` is false. */
  vividActive?: boolean;
  /** Accent color for the active state (default: "accent" — follows the theme accent) — one of the built-in ColorNames, or any
   * other CSS color value; pair it with the same `color` you gave the parent Navbar. */
  color?: ColorName | (string & {});
  /** How `active` renders (default: "fill"): "fill" colors this item's own background/ring, the usual
   * self-contained look; "text" only switches text color/weight and leaves the background transparent
   * — pass this when something else already supplies the active fill, e.g. Navbar's own `items`
   * shortcut, which slides one shared pill behind whichever link is active instead of coloring each
   * link's own background (a continuous slide reads far smoother than every link cross-fading its own
   * background independently). Composing `<NavbarItem>` directly still defaults to "fill", since there
   * is no such shared pill to rely on outside that shortcut. */
  activeStyle?: "fill" | "text";
  /** Advanced/rarely-needed: the internal `<slot>` this label renders into is unnamed by default (so
   * a standalone `<l-navbar-item>My Label</l-navbar-item>` just works, the same as any plain default
   * slot) — pass a unique value only if you're rendering several `NavbarItem`s that end up sharing one
   * *other* element's shadow root (the way Navbar's own `items` shortcut does), where multiple unnamed
   * slots in that single root would otherwise all compete for the same unassigned/whitespace light-DOM
   * text nodes (see this component's own `content` for the full reasoning). Has no effect on anything
   * other than which `<slot>` this label's fallback content lives in. */
  slotName?: string;
  /** Enter transition: "fade" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "zoom" | "zoom-out" | "flip" | "blur" | "bounce" | "rotate" | "drop" | "skew" (default: none). Respects `prefers-reduced-motion`. */
  transition?: TransitionVariant;
  /** Enter transition duration in ms (default: 450). */
  transitionDuration?: number;
  /** Delay before the enter transition starts, in ms (default: 0) — handy for staggering. */
  transitionDelay?: number;
  /** Effect while hovering: "lift" | "scale" | "press" | "tilt" | "ring" | "glow" | "shine" (default: none). */
  hoverEffect?: HoverEffect;
  /** Extra CSS class(es) added to the item's root element, merged before `classNames.root`. */
  className?: string;
  /** Per-part class overrides — merged after (and win over) the built-in styling. */
  classNames?: {
    root?: string;
    icon?: string;
    label?: string;
  };
}

export const NavbarItem = forwardRef<HTMLAnchorElement | HTMLButtonElement, NavbarItemProps>(function NavbarItem(
  {
    icon,
    children,
    href,
    onClick,
    active = false,
    disabled = false,
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
  ref
) {
  const Icon = getIcon(icon);
  const colorIsNamed = isColorName(color);

  const activeClass = cx("text-white", activeStyle === "fill" && navbarActiveFillClasses(color, dark, vividActive));
  const idleClass = dark ? "text-white/70 hover:bg-white/5 hover:text-white" : "text-fg-muted hover:bg-surface-muted hover:text-fg";

  const itemClasses = cx(
    // `justify-center` only matters when an ancestor stretches this item beyond its own content width
    // (Navbar's `items` shortcut does exactly that, so every generated link shares the row's width
    // equally — see Navbar.tsx's own `auto-cols-fr`) — a naturally-sized item has no extra space to
    // justify, so this is a no-op for any other composition.
    // `font-medium` applies unconditionally (not just while `active`, the way it briefly did) — bold
    // text is measurably wider than normal-weight text at the same size, and since every link shares
    // an equal-width `auto-cols-fr` column sized to whichever link's content is currently widest,
    // switching which link is bold reflows *every* column's width, not just the one that changed —
    // exactly the "other links shift when I click one" symptom this was reported as. A constant weight
    // removes that variable entirely; the sliding pill (or, without it, the color/background change
    // alone) already carries the active/idle distinction on its own.
    // `transition-colors` alone left the active/idle swap looking like a hard cut — it only covers
    // color/background-color, not the `shadow-md`/`ring-*` that `vividActive` pops in and out
    // instantly. Naming `box-shadow` alongside them (ring utilities compose into that same property)
    // gets everything animating together instead of colors easing in while the ring/shadow snap. Same
    // `cubic-bezier(.4,0,.2,1)` "ease" curve as the rest of the library's motion (see e.g. Sidebar.tsx)
    // — plain `ease-out` read noticeably less smooth by comparison. Kept in sync with Navbar's own
    // sliding pill duration (see Navbar.tsx's `itemRows`) so the text-color swap and the pill's slide
    // finish together instead of visibly drifting apart.
    "relative inline-flex items-center justify-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-[color,background-color,box-shadow] duration-200 ease-[cubic-bezier(.4,0,.2,1)]",
    disabled && "pointer-events-none opacity-50",
    active ? activeClass : idleClass,
    motionClass(transition, hoverEffect),
    className,
    classNames?.root
  );
  const itemStyle: CSSProperties | undefined =
    active && activeStyle === "fill" && !colorIsNamed ? { backgroundColor: dark ? undefined : color } : undefined;

  // Marks the active item so theme.css can redraw it for the outline / soft active-item variants.
  const baseItemProps = active ? activeMarker(activeStyle === "fill" ? "fill" : "text", color, colorIsNamed, dark, itemStyle) : { style: itemStyle };
  const mStyle = motionStyle(transitionDuration, transitionDelay);
  const itemProps = mStyle ? { ...baseItemProps, style: { ...baseItemProps.style, ...mStyle } } : baseItemProps;

  const content = (
    <>
      {Icon && <Icon size={16} className={cx("shrink-0", classNames?.icon)} />}
      <span className={classNames?.label}>
        {/* `slotName` defaults to unset, i.e. the plain default `<slot>` — right for a standalone
            `<l-navbar-item>My Label</l-navbar-item>`, where light-DOM text with no `slot` attribute of
            its own is exactly what a default slot is for. Navbar's own `items` shortcut, though,
            renders several `NavbarItem`s into *its* single shared shadow root (this component has no
            shadow boundary of its own in that context) — with more than one *unnamed* slot in the same
            root, the incidental whitespace text nodes between a consumer's own HTML tags (themselves
            unassigned/default-slot light-DOM children of the whole `<l-navbar>`) all silently get
            vacuumed into whichever unnamed slot appears first in the tree, wiping out its fallback
            content with nothing but whitespace — even though `children` was a real value the whole
            time. Navbar.tsx passes a unique `slotName` per generated item specifically to sidestep
            that collision; nothing unnamed can ever match a named slot, whitespace included. */}
        <slot name={slotName}>{children}</slot>
      </span>
    </>
  );

  return href ? (
    <a
      ref={ref as Ref<HTMLAnchorElement>}
      href={href}
      aria-disabled={disabled}
      aria-current={active ? "page" : undefined}
      className={itemClasses}
      {...itemProps}
      onClick={onClick}
    >
      {content}
    </a>
  ) : (
    <button
      ref={ref as Ref<HTMLButtonElement>}
      type="button"
      disabled={disabled}
      aria-current={active ? "page" : undefined}
      className={itemClasses}
      {...itemProps}
      onClick={onClick}
    >
      {content}
    </button>
  );
});
