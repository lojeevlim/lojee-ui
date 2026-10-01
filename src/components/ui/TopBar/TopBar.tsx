import { useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { cx, isColorName, type ColorName } from "../../../core/tokens";
import { activeAccent } from "../../../core/activeVariant";
import { Icon } from "../Icons/Icon";
import { motionClass, motionStyle, type TransitionVariant, type HoverEffect } from "../../../core/motion";

export interface TopBarAction {
  /** Icon name, e.g. "bell" — see src/core/icons.ts for the available set. */
  icon: string;
  /** Accessible name (also the tooltip) — the button is icon-only. */
  label: string;
  /** A small count on the icon, e.g. unread notifications. */
  badge?: string;
  /** Renders the action as a link when set. */
  href?: string;
  disabled?: boolean;
}

export type TopBarVariant = "light" | "accent" | "minimal" | "elevated";
export type TopBarSize = "sm" | "md" | "lg";

// Data-driven `actions` (like Tabs / BottomNavigation) so the same shape works in the React and Web Component builds;
// `leading` / `children` / `trailing` are the free-form slots for anything else.
export interface TopBarProps {
  /** Page or app title. */
  title?: ReactNode;
  /** Smaller line under the title. */
  subtitle?: ReactNode;
  /** Shows a back arrow before the title and calls this when it is pressed. */
  onBack?: () => void;
  /** Force the back arrow on or off. Defaults to on when `onBack` is given; the Web Component always has an `onBack`
   * (its `back` event), so there it is `back="true"` that shows the arrow. With `back` on and no `onBack`, pressing it
   * goes back in the browser history. */
  back?: boolean;
  /** Built-in menu button (a hamburger) at the very start — e.g. to open a sidebar. Shown when `onMenuClick` is given
   * (or `menu` is true; on the Web Component set `menu="true"` and listen for the `menuclick` event). */
  menu?: boolean;
  /** Called with no arguments when the built-in menu (hamburger) button is pressed. */
  onMenuClick?: () => void;
  /** Accessible name of the menu button (default: "Menu"). */
  menuLabel?: string;
  /** Built-in search: adds a search button that opens a search field in the bar. Enter submits (`onSearch`), typing
   * reports (`onSearchChange`), Escape or the close button dismisses it. */
  search?: boolean;
  /** Placeholder text of the search field opened by `search`. */
  searchPlaceholder?: string;
  /** Called with the query string when the user presses Enter in the search field. */
  onSearch?: (query: string) => void;
  /** Called with the current query string on every keystroke in the search field. */
  onSearchChange?: (query: string) => void;
  /** Accessible name of the back button (default: "Back"). */
  backLabel?: string;
  /** Free-form content at the very start — a logo, a menu toggle, an avatar. */
  leading?: ReactNode;
  /** Centered/flexible content between the title and the actions — a search field, tabs, breadcrumbs. */
  children?: ReactNode;
  /** Icon buttons at the end of the bar. */
  actions?: TopBarAction[];
  /** Called with the pressed action and its index. */
  onActionClick?: (action: TopBarAction, index: number) => void;
  /** Free-form content after the actions — an avatar, a button. */
  trailing?: ReactNode;
  /**
   * Look of the bar (default: "light"):
   * - "light" — the page surface with a bottom border.
   * - "elevated" — the page surface with a shadow instead of a border.
   * - "minimal" — no background, blends into the page.
   * - "accent" — a solid `color` background with white text (the theme's accent by default).
   */
  variant?: TopBarVariant;
  /** Background color for `variant="accent"` (default: "accent", which follows the theme's accent color) — one of the
   * built-in ColorNames, or any other CSS color value. Ignored by the other variants. */
  color?: ColorName | (string & {});
  /** Bar height: "sm" 48px, "md" 56px (default), "lg" 64px. */
  size?: TopBarSize;
  /** Sticks to the top of its scroll container (default: false). */
  sticky?: boolean;
  /** Enter transition: "fade" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "zoom" | "zoom-out" | "flip" | "blur" | "bounce" | "rotate" | "drop" | "skew" (default: none). Respects `prefers-reduced-motion`. */
  transition?: TransitionVariant;
  /** Enter transition duration in ms (default: 450). */
  transitionDuration?: number;
  /** Delay before the enter transition starts, in ms (default: 0) — handy for staggering. */
  transitionDelay?: number;
  /** Effect while hovering: "lift" | "scale" | "press" | "tilt" | "ring" | "glow" | "shine" (default: none). Applied to the bar's icon buttons (menu, back, search, actions). */
  hoverEffect?: HoverEffect;
  /** Extra class name(s) appended to the root element. */
  className?: string;
  /** Per-part class overrides — merged after (and win over) the built-in styling. */
  classNames?: {
    root?: string;
    title?: string;
    subtitle?: string;
    center?: string;
    actions?: string;
    action?: string;
    badge?: string;
  };
}

const VARIANT_CLASSES: Record<TopBarVariant, string> = {
  light: "bg-surface text-fg border-b border-border",
  elevated: "bg-surface text-fg shadow-md",
  minimal: "bg-transparent text-fg",
  accent: "bg-[var(--ac)] text-white",
};

const SUBTITLE_CLASSES: Record<TopBarVariant, string> = {
  light: "text-fg-subtle",
  elevated: "text-fg-subtle",
  minimal: "text-fg-subtle",
  accent: "text-white/70",
};

const BUTTON_CLASSES: Record<TopBarVariant, string> = {
  light: "text-fg-muted hover:bg-surface-muted hover:text-fg",
  elevated: "text-fg-muted hover:bg-surface-muted hover:text-fg",
  minimal: "text-fg-muted hover:bg-surface-muted hover:text-fg",
  accent: "text-white/80 hover:bg-white/15 hover:text-white",
};

const SIZE_CLASSES: Record<TopBarSize, string> = {
  sm: "h-12 px-3",
  md: "h-14 px-4",
  lg: "h-16 px-5",
};

const ICON_BUTTON = "relative flex h-9 w-9 shrink-0 items-center justify-center rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ac,var(--color-accent-500))]";

export function TopBar({
  title,
  subtitle,
  onBack,
  back,
  backLabel = "Back",
  menu,
  onMenuClick,
  menuLabel = "Menu",
  search = false,
  searchPlaceholder = "Search…",
  onSearch,
  onSearchChange,
  leading,
  children,
  actions,
  onActionClick,
  trailing,
  variant = "light",
  color = "accent",
  size = "md",
  sticky = false,
  transition,
  transitionDuration,
  transitionDelay,
  hoverEffect,
  className,
  classNames,
}: TopBarProps) {
  const style =
    variant === "accent" ? ({ ["--ac" as string]: activeAccent(color, isColorName(color)) } as CSSProperties) : undefined;
  const buttonClass = cx(ICON_BUTTON, BUTTON_CLASSES[variant], motionClass(undefined, hoverEffect), classNames?.action);

  // Built-in search field: opens in place of the center content.
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const closeSearch = () => {
    setSearchOpen(false);
    if (query) {
      setQuery("");
      onSearchChange?.("");
    }
  };

  return (
    <header
      style={{ ...style, ...motionStyle(transitionDuration, transitionDelay) }}
      className={cx(
        "flex w-full items-center gap-3",
        SIZE_CLASSES[size],
        VARIANT_CLASSES[variant],
        sticky && "sticky top-0 z-40",
        motionClass(transition),
        className,
        classNames?.root
      )}
    >
      {(menu ?? onMenuClick != null) && (
        <button type="button" aria-label={menuLabel} onClick={() => onMenuClick?.()} className={buttonClass}>
          <Icon name="menu" size={18} />
        </button>
      )}
      {(back ?? onBack != null) && (
        <button
          type="button"
          aria-label={backLabel}
          // No handler given: go back in the browser history.
          onClick={() => (onBack ? onBack() : window.history.back())}
          className={buttonClass}
        >
          <Icon name="arrow-left" size={18} />
        </button>
      )}
      <slot name="leading">{leading}</slot>
      {(title != null || subtitle != null) && (
        <div className="min-w-0 leading-tight">
          <div className={cx("truncate text-sm font-semibold", classNames?.title)}>
            <slot name="title">{title}</slot>
          </div>
          {subtitle != null && (
            <div className={cx("truncate text-xs", SUBTITLE_CLASSES[variant], classNames?.subtitle)}>
              <slot name="subtitle">{subtitle}</slot>
            </div>
          )}
        </div>
      )}
      <div className={cx("flex min-w-0 flex-1 items-center justify-center", classNames?.center)}>
        {searchOpen ? (
          <input
            type="search"
            autoFocus
            value={query}
            placeholder={searchPlaceholder}
            aria-label={searchPlaceholder}
            onChange={(e) => {
              setQuery(e.target.value);
              onSearchChange?.(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") onSearch?.(query);
              if (e.key === "Escape") closeSearch();
            }}
            className={cx(
              "w-full max-w-md rounded-md border px-3 py-1.5 text-sm outline-none focus:ring-2",
              variant === "accent"
                ? "border-white/30 bg-white/15 text-white placeholder:text-white/60 focus:ring-white/50"
                : "border-border-strong bg-surface-muted text-fg placeholder:text-fg-subtle focus:ring-accent-500"
            )}
          />
        ) : (
          <slot>{children}</slot>
        )}
      </div>
      <div className={cx("flex shrink-0 items-center gap-1", classNames?.actions)}>
        {search && (
          <button
            type="button"
            aria-label={searchOpen ? "Close search" : "Search"}
            aria-expanded={searchOpen}
            onClick={() => (searchOpen ? closeSearch() : setSearchOpen(true))}
            className={buttonClass}
          >
            <Icon name={searchOpen ? "x" : "search"} size={18} />
          </button>
        )}
        {actions?.map((action, i) => {
          const content = (
            <>
              <Icon name={action.icon} size={18} />
              {action.badge !== undefined && (
                <span
                  className={cx(
                    "absolute right-0.5 top-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-medium leading-none text-white",
                    classNames?.badge
                  )}
                >
                  {action.badge}
                </span>
              )}
            </>
          );
          return action.href ? (
            <a
              key={`${action.label}-${i}`}
              href={action.href}
              aria-label={action.label}
              title={action.label}
              aria-disabled={action.disabled}
              className={cx(buttonClass, action.disabled && "pointer-events-none opacity-40")}
              onClick={() => onActionClick?.(action, i)}
            >
              {content}
            </a>
          ) : (
            <button
              key={`${action.label}-${i}`}
              type="button"
              aria-label={action.label}
              title={action.label}
              disabled={action.disabled}
              className={cx(buttonClass, action.disabled && "opacity-40")}
              onClick={() => onActionClick?.(action, i)}
            >
              {content}
            </button>
          );
        })}
        <slot name="trailing">{trailing}</slot>
      </div>
    </header>
  );
}
