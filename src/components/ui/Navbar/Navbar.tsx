import type { ReactNode } from "react";
import { cx } from "../../../core/tokens";

export type NavbarVariant = "light" | "dark" | "elevated";

export interface NavbarProps {
  /** Logo/brand area, left-most. */
  brand?: ReactNode;
  /** Nav links/content, typically rendered next to the brand. */
  children?: ReactNode;
  /** Right-side content — search, buttons, avatar, etc. */
  actions?: ReactNode;
  /** Sticks to the top of its scroll container (default: false). */
  sticky?: boolean;
  /** Bottom border (default: true). */
  bordered?: boolean;
  /**
   * Visual theme (default: "light"):
   * - "dark" — slate-900 background, brand text switches to white.
   * - "elevated" — white background with a soft shadow instead of relying on `bordered`.
   */
  variant?: NavbarVariant;
  className?: string;
  classNames?: {
    root?: string;
    brand?: string;
    links?: string;
    actions?: string;
  };
}

const VARIANT_BG: Record<NavbarVariant, string> = {
  light: "bg-white",
  dark: "bg-slate-900",
  elevated: "bg-white shadow-sm",
};

const VARIANT_BORDER: Record<NavbarVariant, string> = {
  light: "border-slate-200",
  dark: "border-slate-800",
  elevated: "border-slate-200",
};

const VARIANT_BRAND_TEXT: Record<NavbarVariant, string> = {
  light: "text-slate-900",
  dark: "text-white",
  elevated: "text-slate-900",
};

export function Navbar({
  brand,
  children,
  actions,
  sticky = false,
  bordered = true,
  variant = "light",
  className,
  classNames,
}: NavbarProps) {
  return (
    <nav
      className={cx(
        "flex items-center justify-between gap-4 px-6 py-3",
        VARIANT_BG[variant],
        sticky && "sticky top-0 z-40",
        bordered && cx("border-b", VARIANT_BORDER[variant]),
        className,
        classNames?.root
      )}
    >
      <div className="flex min-w-0 items-center gap-6">
        {brand != null && (
          <div className={cx("flex shrink-0 items-center gap-2 font-semibold", VARIANT_BRAND_TEXT[variant], classNames?.brand)}>
            <slot name="brand">{brand}</slot>
          </div>
        )}
        <div className={cx("flex items-center gap-6", classNames?.links)}>
          <slot>{children}</slot>
        </div>
      </div>
      {actions != null && (
        <div className={cx("flex shrink-0 items-center gap-3", classNames?.actions)}>
          <slot name="actions">{actions}</slot>
        </div>
      )}
    </nav>
  );
}
