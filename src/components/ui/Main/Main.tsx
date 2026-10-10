import type { ReactNode } from "react";
import { cx } from "../../../core/tokens";
import { APP_BREAKPOINTS } from "../AppLayout/breakpoints";
import { useAppLayout } from "../AppLayout/appLayoutContext";
import { DotScroll } from "../DotScroll/DotScroll";

export type MainPadding = "none" | "sm" | "md" | "lg" | "xl";

// Literal classes so Tailwind can see them.
const MAIN_PADDING: Record<MainPadding, string> = { none: "p-0", sm: "p-6", md: "p-8", lg: "p-12", xl: "p-20" };

export type MainMargin = "none" | "sm" | "md" | "lg" | "xl";
export type MainRounded = "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";

// Space between the panel and the App's edges (and its neighbours). "md" is the original responsive inset.
const MAIN_MARGIN: Record<MainMargin, string> = { none: "m-0", sm: "m-1", md: "m-2 md:m-3", lg: "m-4 md:m-6", xl: "m-6 md:m-10" };
const MAIN_ROUNDED: Record<MainRounded, string> = { none: "rounded-none", sm: "rounded-sm", md: "rounded-md", lg: "rounded-lg", xl: "rounded-xl", "2xl": "rounded-2xl", "3xl": "rounded-3xl" };

export interface MainProps {
  children?: ReactNode;
  /** Extra class names for the panel, e.g. `p-0` or `rounded-none` to override a default. */
  className?: string;
  /** Space between the panel's edge and its content, on all four sides: "none" | "sm" (24px) | "md" (32px) | "lg" (48px) | "xl" (80px) (default: "md"). */
  padding?: MainPadding;
  /** Space between the panel and the App's edges: "none" | "sm" (4px) | "md" (8px, 12px from the md breakpoint) | "lg" (16px, 24px) | "xl" (24px, 40px) (default: "md"). */
  margin?: MainMargin;
  /** Corner radius of the panel: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" (default: "xl"). */
  rounded?: MainRounded;
}

export function Main({ children, className, padding = "md", margin = "md", rounded = "xl" }: MainProps) {
  const { breakpoint } = useAppLayout();
  // The built-in page panel: a rounded surface (light/dark follows the theme) floating on the App's tinted
  // background, inset by a margin, with `padding` inside. Every part is a default — a `className` (e.g.
  // `rounded-none`, `bg-transparent m-0`) overrides it. The panel scrolls inside a DotScroll (the glowing-dot scrollbar,
  // or the native one when the theme says `scrollbar="native"`), so the scrollbar sits on the panel's own edge and the
  // padding scrolls with the content.
  return (
    <main className={cx("relative overflow-hidden bg-surface", MAIN_MARGIN[margin] ?? MAIN_MARGIN.md, MAIN_ROUNDED[rounded] ?? MAIN_ROUNDED.xl, APP_BREAKPOINTS[breakpoint].main.replace("overflow-auto", "overflow-hidden"), className)}>
      <DotScroll className="h-full" viewportClassName={MAIN_PADDING[padding] ?? MAIN_PADDING.md}>
        {children}
      </DotScroll>
      {/* A small fade at the panel's top and bottom edges: content softly melts into the panel colour instead of being cut off. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 z-10 h-8 bg-gradient-to-b from-surface to-transparent" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-8 bg-gradient-to-t from-surface to-transparent" />
    </main>
  );
}
