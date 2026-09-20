import { Children, isValidElement } from "react";
import type { CSSProperties, ReactNode } from "react";
import { cx, isColorName, type ColorName } from "../../../core/tokens";
import { Icon } from "../Icons/Icon";
import { Tooltip } from "../Tooltip/Tooltip";

// Darkens a "#rrggbb" hex color for the second stop of a custom gradient —
// the same role Tailwind's 600→700 step plays for a named ColorName. Only
// meaningful for hex input (the native color-wheel picker's format); an
// arbitrary CSS color keyword passed as a custom color renders as a flat
// fill instead of a gradient rather than fail outright.
function darkenHex(hex: string, factor = 0.82): string {
  const match = /^#?([0-9a-f]{6})$/i.exec(hex);
  if (!match) return hex;
  const value = parseInt(match[1], 16);
  const channel = (shift: number) => Math.max(0, Math.min(255, Math.round(((value >> shift) & 255) * factor)));
  return `#${[16, 8, 0].map((shift) => channel(shift).toString(16).padStart(2, "0")).join("")}`;
}

export type SidebarVariant = "light" | "dark" | "bordered" | "elevated" | "minimal" | "gradient" | "glass";

// Width of the icon-only rail when `collapsed`. 64px looks right for the
// icon itself but leaves almost no breathing room around it once the
// surrounding body/nav padding a consumer typically adds is subtracted —
// 72px keeps the rail feeling compact while giving nav items enough room
// not to need near-zero horizontal padding to avoid overflowing it.
const COLLAPSED_WIDTH = 72;

export interface SidebarHeaderProps {
  children?: ReactNode;
}

/** Sidebar's top area — logo/brand/workspace switcher. A child of `Sidebar`, not a prop —
 * pulled out and docked above the nav content regardless of where it appears among children. */
export function SidebarHeader({ children }: SidebarHeaderProps) {
  return <>{children}</>;
}

export interface SidebarFooterProps {
  children?: ReactNode;
}

/** Sidebar's bottom-pinned area — user profile, settings link, etc. A child of `Sidebar`, not a
 * prop — pulled out and docked below the nav content regardless of where it appears among children. */
export function SidebarFooter({ children }: SidebarFooterProps) {
  return <>{children}</>;
}

export interface SidebarProps {
  /** Nav content, plus optionally a <SidebarHeader> and/or <SidebarFooter> among the children —
   * order doesn't matter, they're pulled out and docked to the top/bottom; everything else renders
   * as the scrollable nav body (compose it with List/ListItem, links, etc). */
  children?: ReactNode;
  /** Pixel width when expanded (default: 256). */
  width?: number;
  /** Collapses to an icon-only rail (default: false) — when true, `children` (including any
   * <SidebarHeader>/<SidebarFooter>) are still rendered; it's up to the consumer to pass icon-only
   * content, this prop just narrows the container. */
  collapsed?: boolean;
  /**
   * Visual theme (default: "light"):
   * - "bordered"/"elevated" — detached-panel looks (full border, rounded corners) for a sidebar that
   *   floats inside a page instead of docking to a screen edge.
   * - "minimal" — no background/border at all, blends into the page.
   * - "gradient" — a top-to-bottom gradient built from `color` (600 → 700).
   * - "glass" — a frosted dark panel (backdrop blur over translucent slate-900).
   */
  variant?: SidebarVariant;
  /** Accent color (default: "slate") — one of the built-in ColorNames, or any other CSS color value
   * (e.g. "#7c3aed" from a color-wheel picker) for a fully custom accent, unconstrained by the fixed
   * palette. For "gradient" it's the gradient itself (600→700-equivalent; a custom hex gets a
   * programmatically darkened second stop); otherwise it tints the built-in toggle button's hover
   * state — pair it with the same value on your own active nav-item styling for a coordinated look. */
  color?: ColorName | (string & {});
  /** Shows a built-in collapse/expand toggle button, inline at the start of the header row (with a
   * divider before any `<SidebarHeader>` content) — while collapsed it takes over that row on its
   * own. `collapsed` stays a controlled prop — this only reports the requested change via
   * `onCollapsedChange`. */
  collapsible?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  className?: string;
  classNames?: {
    root?: string;
    header?: string;
    body?: string;
    footer?: string;
    toggle?: string;
  };
}

const VARIANT_CLASSES: Record<SidebarVariant, string> = {
  light: "bg-white border-r border-slate-200",
  dark: "bg-slate-900 border-r border-slate-800",
  bordered: "bg-white border-2 border-slate-300 rounded-xl",
  elevated: "bg-white border border-slate-100 shadow-lg rounded-xl",
  minimal: "bg-transparent",
  gradient: "text-white border-r border-white/10",
  glass: "bg-slate-900/70 backdrop-blur-xl border-r border-white/10 text-white",
};

const VARIANT_DIVIDER_CLASSES: Record<SidebarVariant, string> = {
  light: "border-slate-200",
  dark: "border-slate-800",
  bordered: "border-slate-200",
  elevated: "border-slate-100",
  minimal: "border-slate-100",
  gradient: "border-white/15",
  glass: "border-white/10",
};

const TOGGLE_BUTTON_CLASSES =
  "flex h-8 w-8 shrink-0 items-center justify-center rounded-md border text-slate-400 transition-colors";

const TOGGLE_HOVER_TEXT: Record<ColorName, string> = {
  slate: "hover:text-slate-700",
  gray: "hover:text-gray-700",
  indigo: "hover:text-indigo-600",
  violet: "hover:text-violet-600",
  blue: "hover:text-blue-600",
  cyan: "hover:text-cyan-600",
  emerald: "hover:text-emerald-600",
  teal: "hover:text-teal-600",
  amber: "hover:text-amber-600",
  orange: "hover:text-orange-600",
  rose: "hover:text-rose-600",
  pink: "hover:text-pink-600",
};

export function Sidebar({
  children,
  width = 256,
  collapsed = false,
  variant = "light",
  color = "slate",
  collapsible = false,
  onCollapsedChange,
  className,
  classNames,
}: SidebarProps) {
  let headerContent: ReactNode;
  let footerContent: ReactNode;
  const bodyChildren: ReactNode[] = [];

  Children.forEach(children, (child) => {
    if (isValidElement(child) && child.type === SidebarHeader) {
      headerContent = (child.props as SidebarHeaderProps).children;
    } else if (isValidElement(child) && child.type === SidebarFooter) {
      footerContent = (child.props as SidebarFooterProps).children;
    } else {
      bodyChildren.push(child);
    }
  });

  const colorIsNamed = isColorName(color);
  const style: CSSProperties = {
    width: collapsed ? COLLAPSED_WIDTH : width,
    transitionTimingFunction: "cubic-bezier(.4, 0, .2, 1)",
    ...(variant === "gradient" && {
      backgroundImage: colorIsNamed
        ? // 600 → 700, not a deeper shade like 900: Tailwind v4 only emits a
          // `--color-{name}-{shade}` variable for shades an actual utility
          // class already references somewhere in the build, and 700 is the
          // darkest shade every ColorName's `colorClasses` entry uses (its
          // `active:` state) — a shade with no referencing utility resolves
          // to an empty custom property, silently breaking the gradient.
          `linear-gradient(to bottom, var(--color-${color}-600), var(--color-${color}-700))`
        : // A custom (non-ColorName) color has no 600/700 shade to reach for
          // — darken it programmatically instead, mirroring that same step.
          `linear-gradient(to bottom, ${color}, ${darkenHex(color)})`,
    }),
    // Only for a custom color: a named ColorName's hover tint comes from
    // TOGGLE_HOVER_TEXT below via a real Tailwind class instead, since that
    // also covers browsers/situations where arbitrary CSS custom properties
    // in a Tailwind arbitrary-value selector might not be desired.
    ...(!colorIsNamed && { "--sidebar-toggle-hover": color }),
  } as CSSProperties;
  const toggleClasses = cx(
    TOGGLE_BUTTON_CLASSES,
    VARIANT_DIVIDER_CLASSES[variant],
    colorIsNamed ? TOGGLE_HOVER_TEXT[color] : "hover:text-[var(--sidebar-toggle-hover)]"
  );
  // The built-in toggle takes over the header row's only slot while
  // collapsed (there's no room for it alongside the header content in a
  // 72px rail) — but only when it's actually rendering something there to
  // take over from. A consumer driving `collapsed` externally without
  // `collapsible` (no built-in button at all) still gets to show their own
  // icon-only header content while collapsed, same as before.
  const hideHeaderContent = collapsed && collapsible;

  return (
    <div
      className={cx(
        "relative flex h-full flex-col transition-[width] duration-300",
        VARIANT_CLASSES[variant],
        className,
        classNames?.root
      )}
      style={style}
    >
      {(collapsible || headerContent != null) && (
        <div
          className={cx(
            "flex shrink-0 items-center gap-2 border-b p-3",
            VARIANT_DIVIDER_CLASSES[variant],
            collapsed && "justify-center",
            classNames?.header
          )}
        >
          {/* Header content first (flex-1 pushes it to the left), toggle at
              the row's own right edge — scoped to inside this component
              since there's no external header to anchor it to here. */}
          {headerContent != null && (
            // A `grid-template-columns` 1fr/0fr transition (not a plain
            // conditional unmount) so the content shrinks away in step with
            // the panel's own width animation instead of popping out
            // instantly — works for arbitrary consumer content since, unlike
            // `max-width`, it doesn't need to know the content's actual
            // width to animate smoothly down to zero.
            <div
              className={cx("grid min-w-0 transition-[grid-template-columns,opacity] duration-300 ease-[cubic-bezier(.4,0,.2,1)]", !collapsed && "flex-1")}
              style={{ gridTemplateColumns: hideHeaderContent ? "0fr" : "1fr", opacity: hideHeaderContent ? 0 : 1 }}
            >
              <div className="min-w-0 overflow-hidden truncate">
                <slot name="header">{headerContent}</slot>
              </div>
            </div>
          )}
          {collapsible && (
            <Tooltip content={collapsed ? "Expand sidebar" : "Collapse sidebar"} position="right">
              <button
                type="button"
                onClick={() => onCollapsedChange?.(!collapsed)}
                aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                className={cx(toggleClasses, classNames?.toggle)}
              >
                <Icon name="panel-left" size={16} />
              </button>
            </Tooltip>
          )}
        </div>
      )}
      {/* Always scrollable, expanded or collapsed — a collapsed icon-only
          rail with many items still needs to scroll. This used to be
          conditional on `!collapsed` because `overflow-y-auto` clips
          absolutely-positioned descendants on BOTH axes (not just the
          scrolling one), which would cut off a ListItem `tooltip` trying to
          escape to the right — but that's fixed at the source now
          (ListItem's tooltip portals itself out of this container instead
          of relying on CSS overflow to escape it), so scrolling no longer
          has to be sacrificed for it. */}
      <div className={cx("flex-1 overflow-y-auto p-2", classNames?.body)}>
        <slot>{bodyChildren}</slot>
      </div>
      {footerContent != null && (
        <div
          className={cx("shrink-0 border-t p-4", VARIANT_DIVIDER_CLASSES[variant], classNames?.footer)}
        >
          <slot name="footer">{footerContent}</slot>
        </div>
      )}
    </div>
  );
}
