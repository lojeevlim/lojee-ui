// Per-breakpoint class sets for <App>. Tailwind only generates classes it can read as complete literals, so
// each container-query variant is spelled out here instead of being built from `collapseBelow` at runtime.
export type AppBreakpoint = "md" | "lg" | "xl" | "2xl" | "3xl";

/** Tailwind container-query widths (px) — where each `@…:` variant below starts applying. */
export const APP_BREAKPOINT_PX: Record<AppBreakpoint, number> = { md: 448, lg: 512, xl: 576, "2xl": 672, "3xl": 768 };

export interface AppBreakpointClasses {
  grid: string;
  top: string;
  side: string;
  main: string;
  footer: string;
  /** Hides an element (e.g. the menu button) once the grid layout is showing. */
  hideAbove: string;
}

export const APP_BREAKPOINTS: Record<AppBreakpoint, AppBreakpointClasses> = {
  "md": {
    grid: "flex h-full min-h-0 w-full flex-col @md:grid @md:[grid-template-areas:var(--app-areas)] @md:[grid-template-columns:var(--app-cols)] @md:[grid-template-rows:var(--app-rows)]",
    top: "order-1 min-w-0 @md:order-none @md:[grid-area:top]",
    side: "@md:static @md:z-auto @md:w-fit @md:max-w-none @md:translate-x-0 @md:shadow-none @md:[grid-area:side]",
    main: "order-3 min-h-0 min-w-0 flex-1 overflow-auto @md:order-none @md:[grid-area:main]",
    footer: "order-4 min-w-0 @md:order-none @md:[grid-area:footer]",
    hideAbove: "@md:hidden",
  },
  "lg": {
    grid: "flex h-full min-h-0 w-full flex-col @lg:grid @lg:[grid-template-areas:var(--app-areas)] @lg:[grid-template-columns:var(--app-cols)] @lg:[grid-template-rows:var(--app-rows)]",
    top: "order-1 min-w-0 @lg:order-none @lg:[grid-area:top]",
    side: "@lg:static @lg:z-auto @lg:w-fit @lg:max-w-none @lg:translate-x-0 @lg:shadow-none @lg:[grid-area:side]",
    main: "order-3 min-h-0 min-w-0 flex-1 overflow-auto @lg:order-none @lg:[grid-area:main]",
    footer: "order-4 min-w-0 @lg:order-none @lg:[grid-area:footer]",
    hideAbove: "@lg:hidden",
  },
  "xl": {
    grid: "flex h-full min-h-0 w-full flex-col @xl:grid @xl:[grid-template-areas:var(--app-areas)] @xl:[grid-template-columns:var(--app-cols)] @xl:[grid-template-rows:var(--app-rows)]",
    top: "order-1 min-w-0 @xl:order-none @xl:[grid-area:top]",
    side: "@xl:static @xl:z-auto @xl:w-fit @xl:max-w-none @xl:translate-x-0 @xl:shadow-none @xl:[grid-area:side]",
    main: "order-3 min-h-0 min-w-0 flex-1 overflow-auto @xl:order-none @xl:[grid-area:main]",
    footer: "order-4 min-w-0 @xl:order-none @xl:[grid-area:footer]",
    hideAbove: "@xl:hidden",
  },
  "2xl": {
    grid: "flex h-full min-h-0 w-full flex-col @2xl:grid @2xl:[grid-template-areas:var(--app-areas)] @2xl:[grid-template-columns:var(--app-cols)] @2xl:[grid-template-rows:var(--app-rows)]",
    top: "order-1 min-w-0 @2xl:order-none @2xl:[grid-area:top]",
    side: "@2xl:static @2xl:z-auto @2xl:w-fit @2xl:max-w-none @2xl:translate-x-0 @2xl:shadow-none @2xl:[grid-area:side]",
    main: "order-3 min-h-0 min-w-0 flex-1 overflow-auto @2xl:order-none @2xl:[grid-area:main]",
    footer: "order-4 min-w-0 @2xl:order-none @2xl:[grid-area:footer]",
    hideAbove: "@2xl:hidden",
  },
  "3xl": {
    grid: "flex h-full min-h-0 w-full flex-col @3xl:grid @3xl:[grid-template-areas:var(--app-areas)] @3xl:[grid-template-columns:var(--app-cols)] @3xl:[grid-template-rows:var(--app-rows)]",
    top: "order-1 min-w-0 @3xl:order-none @3xl:[grid-area:top]",
    side: "@3xl:static @3xl:z-auto @3xl:w-fit @3xl:max-w-none @3xl:translate-x-0 @3xl:shadow-none @3xl:[grid-area:side]",
    main: "order-3 min-h-0 min-w-0 flex-1 overflow-auto @3xl:order-none @3xl:[grid-area:main]",
    footer: "order-4 min-w-0 @3xl:order-none @3xl:[grid-area:footer]",
    hideAbove: "@3xl:hidden",
  },
};
