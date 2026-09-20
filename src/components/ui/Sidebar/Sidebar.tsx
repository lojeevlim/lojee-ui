import { Children, isValidElement } from "react";
import type { CSSProperties, ReactNode } from "react";
import { cx, type ColorName } from "../../../core/tokens";
import { Icon } from "../Icons/Icon";
import { Tooltip } from "../Tooltip/Tooltip";

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
  /** Accent color (default: "slate"). For "gradient" it's the gradient itself; otherwise it tints the
   * built-in toggle button's hover state — pair it with the same color on your own active nav-item
   * styling for a coordinated look. */
  color?: ColorName;
  /** Shows a built-in collapse/expand toggle button, anchored to the same spot on the panel's
   * edge in both states. `collapsed` stays a controlled prop — this only reports the requested
   * change via `onCollapsedChange`. */
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

// Both the inline (expanded) and floating (collapsed) toggle buttons share
// this exact shell — same circular white pill either way — so collapsing
// reads as one control handing off to another, not two different designs.
const TOGGLE_BUTTON_CLASSES =
  "flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-400 shadow-sm transition-all duration-200 hover:scale-110 hover:shadow-md active:scale-95";

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

  const style: CSSProperties = {
    width: collapsed ? COLLAPSED_WIDTH : width,
    transitionTimingFunction: "cubic-bezier(.4, 0, .2, 1)",
    ...(variant === "gradient" && {
      // 600 → 700, not a deeper shade like 900: Tailwind v4 only emits a
      // `--color-{name}-{shade}` variable for shades an actual utility class
      // already references somewhere in the build, and 700 is the darkest
      // shade every ColorName's `colorClasses` entry uses (its `active:`
      // state) — a shade with no referencing utility resolves to an empty
      // custom property, silently breaking the whole `linear-gradient()`.
      backgroundImage: `linear-gradient(to bottom, var(--color-${color}-600), var(--color-${color}-700))`,
    }),
  };
  const toggleClasses = cx(TOGGLE_BUTTON_CLASSES, TOGGLE_HOVER_TEXT[color]);

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
      {headerContent != null && (
        <div
          className={cx(
            "flex shrink-0 items-center gap-2 border-b p-4",
            VARIANT_DIVIDER_CLASSES[variant],
            collapsed && "justify-center",
            classNames?.header
          )}
        >
          {/* `flex-1` only while expanded — keeping it while collapsed would
              stretch this div to the full row width, pinning its content
              (typically just a small logo mark) to the left instead of
              letting the row's `justify-center` actually center it. */}
          <div className={cx("min-w-0 truncate", !collapsed && "flex-1")}>
            <slot name="header">{headerContent}</slot>
          </div>
        </div>
      )}
      {/* One toggle button, always in this same spot (half outside the
          panel, like a drawer handle) whether expanded or collapsed — only
          its icon rotates and its tooltip/label swap. Living inline in the
          header instead would mean it moves (or gets squeezed out) as the
          header shrinks to icon-only, which reads as two different controls
          rather than one you can keep clicking in place. */}
      {collapsible && (
        <Tooltip content={collapsed ? "Expand sidebar" : "Collapse sidebar"} position="right">
          <button
            type="button"
            onClick={() => onCollapsedChange?.(!collapsed)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className={cx("absolute -right-3 top-14 z-10", toggleClasses, classNames?.toggle)}
          >
            <Icon name="chevron-left" size={14} className={cx("transition-transform duration-300", collapsed && "rotate-180")} />
          </button>
        </Tooltip>
      )}
      {/* `overflow-y-auto` only applies when expanded — any `overflow` value
          other than `visible` clips absolutely-positioned children on BOTH
          axes (not just the scrolling one), which would cut off a Tooltip
          (e.g. ListItem's `tooltip` prop) trying to escape to the right.
          Collapsed is exactly when tooltips are needed (labels are hidden),
          so this trades scrolling for an unclipped tooltip in that state —
          a reasonable swap for a narrow icon-only rail. */}
      <div className={cx("flex-1 p-2", !collapsed && "overflow-y-auto", classNames?.body)}>
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
