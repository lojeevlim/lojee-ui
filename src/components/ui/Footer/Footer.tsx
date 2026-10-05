import type { CSSProperties, ReactNode } from "react";
import { cx, isColorName, type ColorName } from "../../../core/tokens";
import { activeAccent } from "../../../core/activeVariant";
import { motionClass, motionStyle, type TransitionVariant } from "../../../core/motion";

export interface FooterProps {
  /** Main content area — link columns, etc. */
  children?: ReactNode;
  /** Bottom bar content — copyright, legal links. Rendered below a top border. */
  bottom?: ReactNode;
  /** Fill color — one of the built-in ColorNames, or any other CSS color value (e.g. "#7c3aed"). The footer becomes a solid
   * `color` background with white text. Leave it unset for the neutral look (a soft muted-surface background). */
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

export function Footer({ children, bottom, color, transition, transitionDuration, transitionDelay, className, classNames }: FooterProps) {
  const filled = color !== undefined;
  return (
    <footer
      data-footer={filled ? "color" : "neutral"}
      style={{
        ...(filled && ({ ["--ac" as string]: activeAccent(color, isColorName(color)) } as CSSProperties)),
        ...motionStyle(transitionDuration, transitionDelay),
      }}
      className={cx("px-8 py-10", filled ? "bg-[var(--ac)] text-white" : "bg-surface-muted text-fg", motionClass(transition), className, classNames?.root)}
    >
      {children != null && (
        <div className={cx("grid grid-cols-2 gap-8 sm:grid-cols-4", classNames?.content)}>
          <slot>{children}</slot>
        </div>
      )}
      {bottom != null && (
        <div
          data-footer-bottom=""
          className={cx("mt-8 border-t pt-6 text-sm", filled ? "border-white/20 text-white/70" : "border-border text-fg-subtle", classNames?.bottom)}
        >
          <slot name="bottom">{bottom}</slot>
        </div>
      )}
    </footer>
  );
}
