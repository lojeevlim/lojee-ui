// Plain (non-component) helpers shared by every *Playground.tsx — split out
// from PlaygroundHelpers.tsx so that file can stay component-only (keeps
// Vite/React Fast Refresh happy).
import type { ColorName } from "../../core/tokens";

export function cx(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

export const swatchClasses: Record<ColorName, string> = {
  slate: "bg-slate-900",
  gray: "bg-gray-500",
  indigo: "bg-indigo-500",
  accent: "bg-accent-500",
  violet: "bg-violet-500",
  blue: "bg-blue-500",
  cyan: "bg-cyan-500",
  emerald: "bg-emerald-500",
  teal: "bg-teal-500",
  amber: "bg-amber-500",
  orange: "bg-orange-500",
  rose: "bg-rose-500",
  pink: "bg-pink-500",
};

/** Background of the "page" a docked component sits on inside a playground's preview window: the theme surface with a hint of the accent, so it follows the accent and light/dark mode and the component itself stands out against it. */
export const PREVIEW_PAGE_BG = "bg-[color-mix(in_srgb,var(--color-accent-500)_6%,var(--color-surface))]";
