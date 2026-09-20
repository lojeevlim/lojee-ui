import type { ReactNode } from "react";
import { cx } from "../../../core/tokens";

export type FooterVariant = "light" | "dark" | "minimal";

export interface FooterProps {
  /** Main content area — link columns, etc. */
  children?: ReactNode;
  /** Bottom bar content — copyright, legal links. Rendered below a top border. */
  bottom?: ReactNode;
  /**
   * Visual theme (default: "light"):
   * - "dark" — slate-900 background, muted light text for the bottom bar.
   * - "minimal" — no background at all, blends into the page.
   */
  variant?: FooterVariant;
  className?: string;
  classNames?: {
    root?: string;
    content?: string;
    bottom?: string;
  };
}

const VARIANT_BG: Record<FooterVariant, string> = {
  light: "bg-slate-50",
  dark: "bg-slate-900",
  minimal: "bg-transparent",
};

const VARIANT_BOTTOM_BORDER: Record<FooterVariant, string> = {
  light: "border-slate-200",
  dark: "border-slate-800",
  minimal: "border-slate-200",
};

const VARIANT_BOTTOM_TEXT: Record<FooterVariant, string> = {
  light: "text-slate-500",
  dark: "text-slate-400",
  minimal: "text-slate-500",
};

export function Footer({ children, bottom, variant = "light", className, classNames }: FooterProps) {
  return (
    <footer className={cx("px-6 py-10", VARIANT_BG[variant], className, classNames?.root)}>
      {children != null && (
        <div className={cx("grid grid-cols-2 gap-8 sm:grid-cols-4", classNames?.content)}>
          <slot>{children}</slot>
        </div>
      )}
      {bottom != null && (
        <div
          className={cx(
            "mt-8 border-t pt-6 text-sm",
            VARIANT_BOTTOM_BORDER[variant],
            VARIANT_BOTTOM_TEXT[variant],
            classNames?.bottom
          )}
        >
          <slot name="bottom">{bottom}</slot>
        </div>
      )}
    </footer>
  );
}
