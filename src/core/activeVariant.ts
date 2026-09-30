// How "active" items (the current page in a Sidebar/Navbar, the current Pagination page, the selected
// segment…) are drawn: a solid fill, just an outline, or a soft tint. It is a theme setting — carried by
// `data-active-variant` next to `data-theme` / `data-accent` — and the look itself lives in theme.css, keyed
// off the marker attributes below, so it also works inside web-component shadow roots.
import type { CSSProperties } from "react";

export type ActiveVariant = "solid" | "outline" | "soft";

export const ACTIVE_VARIANTS: { value: ActiveVariant; label: string }[] = [
  { value: "solid", label: "Solid" },
  { value: "outline", label: "Outline" },
  { value: "soft", label: "Soft" },
];

/** The slide used by every moving "active" pill/underline (Sidebar, Navbar, NavigationMenu, Tabs, Pagination,
 * BottomNavigation): same properties, duration and easing, so switching the active item feels identical everywhere. */
export const ACTIVE_PILL_TRANSITION =
  "transition-[left,top,width,height,background-color,box-shadow] duration-200 ease-[cubic-bezier(.4,0,.2,1)]";

/** Text color change on the item itself, in step with the pill's slide. */
export const ACTIVE_ITEM_TRANSITION = "transition-[color,background-color,box-shadow] duration-200 ease-[cubic-bezier(.4,0,.2,1)]";

export const DEFAULT_ACTIVE_VARIANT: ActiveVariant = "solid";

export function isActiveVariant(v: unknown): v is ActiveVariant {
  return v === "solid" || v === "outline" || v === "soft";
}

/** The color an outline/soft active item is drawn in: a named color's 600 shade, or a custom CSS color as-is. */
export function activeAccent(color: string, isNamed: boolean): string {
  return isNamed ? `var(--color-${color}-600)` : color;
}

/**
 * Props that mark an element as an active item so theme.css can restyle it for the outline / soft variants
 * (a no-op for "solid", which keeps each component's own classes).
 * - `kind: "fill"` — the element that carries the active *background* (a row, or Navbar/Sidebar's sliding pill).
 * - `kind: "text"` — an item whose fill is drawn by something else (the sliding pill): only its text color changes.
 * - `dark` — the surface behind it is dark (dark/gradient/glass variants), so the text stays white.
 */
export function activeMarker(
  kind: "fill" | "text",
  color: string,
  isNamed: boolean,
  dark = false,
  style?: CSSProperties
) {
  return {
    [kind === "fill" ? "data-active-fill" : "data-active-text"]: "",
    ...(dark && { "data-active-dark": "" }),
    style: { ...style, ["--ac" as string]: activeAccent(color, isNamed) } as CSSProperties,
  };
}

/**
 * Styling for a component that pins its own active variant (a `variant` prop) instead of following the
 * theme's `data-active-variant`. Returns classes/styles for the active *fill* element and the active *text*.
 * For "solid" the caller supplies its own fill classes (`solidFillClass`) so custom colors keep working.
 */
export function explicitActive(variant: ActiveVariant, color: string, isNamed: boolean, solidFillClass: string) {
  const ac = activeAccent(color, isNamed);
  if (variant === "solid") {
    return {
      fillClass: solidFillClass,
      fillStyle: (isNamed ? {} : { backgroundColor: color }) as CSSProperties,
      textClass: "text-white",
      textStyle: {} as CSSProperties,
    };
  }
  const text = { color: `color-mix(in srgb, ${ac} 72%, var(--lojee-fg))` } as CSSProperties;
  return variant === "outline"
    ? { fillClass: "bg-transparent", fillStyle: { boxShadow: `inset 0 0 0 1.5px ${ac}` } as CSSProperties, textClass: "", textStyle: text }
    : { fillClass: "", fillStyle: { backgroundColor: `color-mix(in srgb, ${ac} 16%, transparent)` } as CSSProperties, textClass: "", textStyle: text };
}
