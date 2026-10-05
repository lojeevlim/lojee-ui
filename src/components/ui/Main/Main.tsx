import type { ReactNode } from "react";
import { cx } from "../../../core/tokens";
import { APP_BREAKPOINTS } from "../AppLayout/breakpoints";
import { useAppLayout } from "../AppLayout/appLayoutContext";
import { DotScroll } from "../DotScroll/DotScroll";

export type MainPadding = "none" | "sm" | "md" | "lg" | "xl";

// Literal classes so Tailwind can see them.
const MAIN_PADDING: Record<MainPadding, string> = { none: "p-0", sm: "p-6", md: "p-8", lg: "p-12", xl: "p-20" };

export interface MainProps {
  children?: ReactNode;
  /** Extra class names for the panel, e.g. `p-0` or `rounded-none` to override a default. */
  className?: string;
  /** Space between the panel's edge and its content, on all four sides: "none" | "sm" (24px) | "md" (32px) | "lg" (48px) | "xl" (80px) (default: "md"). */
  padding?: MainPadding;
}

export function Main({ children, className, padding = "md" }: MainProps) {
  const { breakpoint } = useAppLayout();
  // The built-in page panel: a rounded surface (light/dark follows the theme) floating on the App's tinted
  // background, inset by a margin, with `padding` inside. Every part is a default — a `className` (e.g.
  // `rounded-none`, `bg-transparent m-0`) overrides it. The panel scrolls inside a DotScroll (the glowing-dot scrollbar,
  // or the native one when the theme says `scrollbar="native"`), so the scrollbar sits on the panel's own edge and the
  // padding scrolls with the content.
  return (
    <main className={cx("m-2 overflow-hidden rounded-xl bg-surface md:m-3", APP_BREAKPOINTS[breakpoint].main.replace("overflow-auto", "overflow-hidden"), className)}>
      <DotScroll className="h-full" viewportClassName={MAIN_PADDING[padding] ?? MAIN_PADDING.md}>
        {children}
      </DotScroll>
    </main>
  );
}
