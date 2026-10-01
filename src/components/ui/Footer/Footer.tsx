import type { CSSProperties, ReactNode } from "react";
import { cx, isColorName, type ColorName } from "../../../core/tokens";
import { activeAccent } from "../../../core/activeVariant";
import { motionClass, motionStyle, type TransitionVariant } from "../../../core/motion";

export type FooterVariant = "light" | "dark" | "minimal" | "accent";

export interface FooterProps {
  /** Main content area — link columns, etc. */
  children?: ReactNode;
  /** Bottom bar content — copyright, legal links. Rendered below a top border. */
  bottom?: ReactNode;
  /**
   * Visual theme (default: "light"):
   * - "dark" — slate-900 background, muted light text for the bottom bar.
   * - "minimal" — no background at all, blends into the page.
   * - "accent" — a solid `color` background with white text; `color` defaults to the theme's accent, so it
   *   changes with the accent picker.
   */
  variant?: FooterVariant;
  /** Background color for `variant="accent"` (default: "accent", which follows the theme's accent color) — one of
   * the built-in ColorNames, or any other CSS color value. Ignored by the other variants. */
  color?: ColorName | (string & {});
  /** Enter transition: "fade" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "zoom" | "zoom-out" | "flip" | "blur" | "bounce" | "rotate" | "drop" | "skew" (default: none). Respects `prefers-reduced-motion`. */
  transition?: TransitionVariant;
  /** Enter transition duration in ms (default: 450). */
  transitionDuration?: number;
  /** Delay before the enter transition starts, in ms (default: 0) — handy for staggering. */
  transitionDelay?: number;
  /** Extra class name(s) applied to the root element. */
  className?: string;
  /** Per-part class overrides — merged after (and win over) the built-in styling. */
  classNames?: {
    root?: string;
    content?: string;
    bottom?: string;
  };
}

const VARIANT_BG: Record<FooterVariant, string> = {
  light: "bg-surface-muted text-fg",
  dark: "bg-slate-900",
  minimal: "bg-transparent text-fg",
  accent: "bg-[var(--ac)] text-white",
};

const VARIANT_BOTTOM_BORDER: Record<FooterVariant, string> = {
  light: "border-border",
  dark: "border-slate-800",
  minimal: "border-border",
  accent: "border-white/20",
};

const VARIANT_BOTTOM_TEXT: Record<FooterVariant, string> = {
  light: "text-fg-subtle",
  dark: "text-slate-400",
  minimal: "text-fg-subtle",
  accent: "text-white/70",
};

export function Footer({ children, bottom, variant = "light", color = "accent", transition, transitionDuration, transitionDelay, className, classNames }: FooterProps) {
  return (
    <footer
      style={{
        ...(variant === "accent" && ({ ["--ac" as string]: activeAccent(color, isColorName(color)) } as CSSProperties)),
        ...motionStyle(transitionDuration, transitionDelay),
      }}
      className={cx("px-6 py-10", VARIANT_BG[variant], motionClass(transition), className, classNames?.root)}
    >
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
