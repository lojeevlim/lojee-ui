// Framework-agnostic design tokens shared by the React components
// (src/components/ui) and the Web Components (src/elements). Plain data —
// no React, no Lit — so both surfaces render pixel-identical output from
// one source of truth.

import type { CSSProperties } from "react";
import { twMerge } from "tailwind-merge";

export const COLORS = [
  { name: "Slate", base: "slate" },
  { name: "Gray", base: "gray" },
  { name: "Indigo", base: "indigo" },
  { name: "Violet", base: "violet" },
  { name: "Blue", base: "blue" },
  { name: "Cyan", base: "cyan" },
  { name: "Emerald", base: "emerald" },
  { name: "Teal", base: "teal" },
  { name: "Amber", base: "amber" },
  { name: "Orange", base: "orange" },
  { name: "Rose", base: "rose" },
  { name: "Pink", base: "pink" },
] as const;

export const colorClasses = {
  slate: {
    solid: "bg-fg text-surface hover:bg-fg-muted active:bg-fg-muted focus-visible:ring-fg-muted",
    outline: "border border-border-strong text-fg hover:bg-surface-muted active:bg-border focus-visible:ring-fg-muted",
    ghost: "text-fg hover:bg-surface-muted active:bg-border focus-visible:ring-fg-muted",
    soft: "bg-surface-muted text-fg hover:bg-border active:bg-border-strong focus-visible:ring-fg-muted",
    link: "text-fg hover:text-fg-muted underline underline-offset-4 focus-visible:ring-fg-muted",
    dashed: "border border-dashed border-border-strong text-fg hover:bg-surface-muted active:bg-border focus-visible:ring-fg-muted",
  },
  gray: {
    solid: "bg-gray-600 text-white hover:bg-gray-500 active:bg-gray-700 focus-visible:ring-gray-500",
    outline: "border border-border-strong text-fg-muted hover:bg-surface-muted active:bg-border focus-visible:ring-gray-500",
    ghost: "text-fg-muted hover:bg-surface-muted active:bg-border focus-visible:ring-gray-500",
    soft: "bg-surface-muted text-fg-muted hover:bg-border active:bg-border-strong focus-visible:ring-gray-500",
    link: "text-fg-muted hover:text-fg underline underline-offset-4 focus-visible:ring-gray-500",
    dashed: "border border-dashed border-border-strong text-fg-muted hover:bg-surface-muted active:bg-border focus-visible:ring-gray-500",
  },
  indigo: {
    solid: "bg-indigo-600 text-white hover:bg-indigo-500 active:bg-indigo-700 focus-visible:ring-indigo-500",
    outline: "border border-indigo-300 text-indigo-700 hover:bg-indigo-50 active:bg-indigo-100 focus-visible:ring-indigo-500 dark:border-indigo-700 dark:text-indigo-300 dark:hover:bg-indigo-950/40 dark:active:bg-indigo-950/60",
    ghost: "text-indigo-700 hover:bg-indigo-50 active:bg-indigo-100 focus-visible:ring-indigo-500 dark:text-indigo-300 dark:hover:bg-indigo-950/40 dark:active:bg-indigo-950/60",
    soft: "bg-indigo-100 text-indigo-700 hover:bg-indigo-200 active:bg-indigo-300 focus-visible:ring-indigo-500 dark:bg-indigo-950/50 dark:text-indigo-300 dark:hover:bg-indigo-900/60 dark:active:bg-indigo-900/80",
    link: "text-indigo-600 hover:text-indigo-500 underline underline-offset-4 focus-visible:ring-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300",
    dashed: "border border-dashed border-indigo-300 text-indigo-700 hover:bg-indigo-50 active:bg-indigo-100 focus-visible:ring-indigo-500 dark:border-indigo-700 dark:text-indigo-300 dark:hover:bg-indigo-950/40 dark:active:bg-indigo-950/60",
  },
  violet: {
    solid: "bg-violet-600 text-white hover:bg-violet-500 active:bg-violet-700 focus-visible:ring-violet-500",
    outline: "border border-violet-300 text-violet-700 hover:bg-violet-50 active:bg-violet-100 focus-visible:ring-violet-500 dark:border-violet-700 dark:text-violet-300 dark:hover:bg-violet-950/40 dark:active:bg-violet-950/60",
    ghost: "text-violet-700 hover:bg-violet-50 active:bg-violet-100 focus-visible:ring-violet-500 dark:text-violet-300 dark:hover:bg-violet-950/40 dark:active:bg-violet-950/60",
    soft: "bg-violet-100 text-violet-700 hover:bg-violet-200 active:bg-violet-300 focus-visible:ring-violet-500 dark:bg-violet-950/50 dark:text-violet-300 dark:hover:bg-violet-900/60 dark:active:bg-violet-900/80",
    link: "text-violet-600 hover:text-violet-500 underline underline-offset-4 focus-visible:ring-violet-500 dark:text-violet-400 dark:hover:text-violet-300",
    dashed: "border border-dashed border-violet-300 text-violet-700 hover:bg-violet-50 active:bg-violet-100 focus-visible:ring-violet-500 dark:border-violet-700 dark:text-violet-300 dark:hover:bg-violet-950/40 dark:active:bg-violet-950/60",
  },
  blue: {
    solid: "bg-blue-600 text-white hover:bg-blue-500 active:bg-blue-700 focus-visible:ring-blue-500",
    outline: "border border-blue-300 text-blue-700 hover:bg-blue-50 active:bg-blue-100 focus-visible:ring-blue-500 dark:border-blue-700 dark:text-blue-300 dark:hover:bg-blue-950/40 dark:active:bg-blue-950/60",
    ghost: "text-blue-700 hover:bg-blue-50 active:bg-blue-100 focus-visible:ring-blue-500 dark:text-blue-300 dark:hover:bg-blue-950/40 dark:active:bg-blue-950/60",
    soft: "bg-blue-100 text-blue-700 hover:bg-blue-200 active:bg-blue-300 focus-visible:ring-blue-500 dark:bg-blue-950/50 dark:text-blue-300 dark:hover:bg-blue-900/60 dark:active:bg-blue-900/80",
    link: "text-blue-600 hover:text-blue-500 underline underline-offset-4 focus-visible:ring-blue-500 dark:text-blue-400 dark:hover:text-blue-300",
    dashed: "border border-dashed border-blue-300 text-blue-700 hover:bg-blue-50 active:bg-blue-100 focus-visible:ring-blue-500 dark:border-blue-700 dark:text-blue-300 dark:hover:bg-blue-950/40 dark:active:bg-blue-950/60",
  },
  cyan: {
    solid: "bg-cyan-600 text-white hover:bg-cyan-500 active:bg-cyan-700 focus-visible:ring-cyan-500",
    outline: "border border-cyan-300 text-cyan-700 hover:bg-cyan-50 active:bg-cyan-100 focus-visible:ring-cyan-500 dark:border-cyan-700 dark:text-cyan-300 dark:hover:bg-cyan-950/40 dark:active:bg-cyan-950/60",
    ghost: "text-cyan-700 hover:bg-cyan-50 active:bg-cyan-100 focus-visible:ring-cyan-500 dark:text-cyan-300 dark:hover:bg-cyan-950/40 dark:active:bg-cyan-950/60",
    soft: "bg-cyan-100 text-cyan-700 hover:bg-cyan-200 active:bg-cyan-300 focus-visible:ring-cyan-500 dark:bg-cyan-950/50 dark:text-cyan-300 dark:hover:bg-cyan-900/60 dark:active:bg-cyan-900/80",
    link: "text-cyan-600 hover:text-cyan-500 underline underline-offset-4 focus-visible:ring-cyan-500 dark:text-cyan-400 dark:hover:text-cyan-300",
    dashed: "border border-dashed border-cyan-300 text-cyan-700 hover:bg-cyan-50 active:bg-cyan-100 focus-visible:ring-cyan-500 dark:border-cyan-700 dark:text-cyan-300 dark:hover:bg-cyan-950/40 dark:active:bg-cyan-950/60",
  },
  emerald: {
    solid: "bg-emerald-600 text-white hover:bg-emerald-500 active:bg-emerald-700 focus-visible:ring-emerald-500",
    outline: "border border-emerald-300 text-emerald-700 hover:bg-emerald-50 active:bg-emerald-100 focus-visible:ring-emerald-500 dark:border-emerald-700 dark:text-emerald-300 dark:hover:bg-emerald-950/40 dark:active:bg-emerald-950/60",
    ghost: "text-emerald-700 hover:bg-emerald-50 active:bg-emerald-100 focus-visible:ring-emerald-500 dark:text-emerald-300 dark:hover:bg-emerald-950/40 dark:active:bg-emerald-950/60",
    soft: "bg-emerald-100 text-emerald-700 hover:bg-emerald-200 active:bg-emerald-300 focus-visible:ring-emerald-500 dark:bg-emerald-950/50 dark:text-emerald-300 dark:hover:bg-emerald-900/60 dark:active:bg-emerald-900/80",
    link: "text-emerald-600 hover:text-emerald-500 underline underline-offset-4 focus-visible:ring-emerald-500 dark:text-emerald-400 dark:hover:text-emerald-300",
    dashed: "border border-dashed border-emerald-300 text-emerald-700 hover:bg-emerald-50 active:bg-emerald-100 focus-visible:ring-emerald-500 dark:border-emerald-700 dark:text-emerald-300 dark:hover:bg-emerald-950/40 dark:active:bg-emerald-950/60",
  },
  teal: {
    solid: "bg-teal-600 text-white hover:bg-teal-500 active:bg-teal-700 focus-visible:ring-teal-500",
    outline: "border border-teal-300 text-teal-700 hover:bg-teal-50 active:bg-teal-100 focus-visible:ring-teal-500 dark:border-teal-700 dark:text-teal-300 dark:hover:bg-teal-950/40 dark:active:bg-teal-950/60",
    ghost: "text-teal-700 hover:bg-teal-50 active:bg-teal-100 focus-visible:ring-teal-500 dark:text-teal-300 dark:hover:bg-teal-950/40 dark:active:bg-teal-950/60",
    soft: "bg-teal-100 text-teal-700 hover:bg-teal-200 active:bg-teal-300 focus-visible:ring-teal-500 dark:bg-teal-950/50 dark:text-teal-300 dark:hover:bg-teal-900/60 dark:active:bg-teal-900/80",
    link: "text-teal-600 hover:text-teal-500 underline underline-offset-4 focus-visible:ring-teal-500 dark:text-teal-400 dark:hover:text-teal-300",
    dashed: "border border-dashed border-teal-300 text-teal-700 hover:bg-teal-50 active:bg-teal-100 focus-visible:ring-teal-500 dark:border-teal-700 dark:text-teal-300 dark:hover:bg-teal-950/40 dark:active:bg-teal-950/60",
  },
  amber: {
    solid: "bg-amber-500 text-white hover:bg-amber-400 active:bg-amber-600 focus-visible:ring-amber-500",
    outline: "border border-amber-300 text-amber-700 hover:bg-amber-50 active:bg-amber-100 focus-visible:ring-amber-500 dark:border-amber-700 dark:text-amber-300 dark:hover:bg-amber-950/40 dark:active:bg-amber-950/60",
    ghost: "text-amber-700 hover:bg-amber-50 active:bg-amber-100 focus-visible:ring-amber-500 dark:text-amber-300 dark:hover:bg-amber-950/40 dark:active:bg-amber-950/60",
    soft: "bg-amber-100 text-amber-700 hover:bg-amber-200 active:bg-amber-300 focus-visible:ring-amber-500 dark:bg-amber-950/50 dark:text-amber-300 dark:hover:bg-amber-900/60 dark:active:bg-amber-900/80",
    link: "text-amber-600 hover:text-amber-500 underline underline-offset-4 focus-visible:ring-amber-500 dark:text-amber-400 dark:hover:text-amber-300",
    dashed: "border border-dashed border-amber-300 text-amber-700 hover:bg-amber-50 active:bg-amber-100 focus-visible:ring-amber-500 dark:border-amber-700 dark:text-amber-300 dark:hover:bg-amber-950/40 dark:active:bg-amber-950/60",
  },
  orange: {
    solid: "bg-orange-600 text-white hover:bg-orange-500 active:bg-orange-700 focus-visible:ring-orange-500",
    outline: "border border-orange-300 text-orange-700 hover:bg-orange-50 active:bg-orange-100 focus-visible:ring-orange-500 dark:border-orange-700 dark:text-orange-300 dark:hover:bg-orange-950/40 dark:active:bg-orange-950/60",
    ghost: "text-orange-700 hover:bg-orange-50 active:bg-orange-100 focus-visible:ring-orange-500 dark:text-orange-300 dark:hover:bg-orange-950/40 dark:active:bg-orange-950/60",
    soft: "bg-orange-100 text-orange-700 hover:bg-orange-200 active:bg-orange-300 focus-visible:ring-orange-500 dark:bg-orange-950/50 dark:text-orange-300 dark:hover:bg-orange-900/60 dark:active:bg-orange-900/80",
    link: "text-orange-600 hover:text-orange-500 underline underline-offset-4 focus-visible:ring-orange-500 dark:text-orange-400 dark:hover:text-orange-300",
    dashed: "border border-dashed border-orange-300 text-orange-700 hover:bg-orange-50 active:bg-orange-100 focus-visible:ring-orange-500 dark:border-orange-700 dark:text-orange-300 dark:hover:bg-orange-950/40 dark:active:bg-orange-950/60",
  },
  rose: {
    solid: "bg-rose-600 text-white hover:bg-rose-500 active:bg-rose-700 focus-visible:ring-rose-500",
    outline: "border border-rose-300 text-rose-700 hover:bg-rose-50 active:bg-rose-100 focus-visible:ring-rose-500 dark:border-rose-700 dark:text-rose-300 dark:hover:bg-rose-950/40 dark:active:bg-rose-950/60",
    ghost: "text-rose-700 hover:bg-rose-50 active:bg-rose-100 focus-visible:ring-rose-500 dark:text-rose-300 dark:hover:bg-rose-950/40 dark:active:bg-rose-950/60",
    soft: "bg-rose-100 text-rose-700 hover:bg-rose-200 active:bg-rose-300 focus-visible:ring-rose-500 dark:bg-rose-950/50 dark:text-rose-300 dark:hover:bg-rose-900/60 dark:active:bg-rose-900/80",
    link: "text-rose-600 hover:text-rose-500 underline underline-offset-4 focus-visible:ring-rose-500 dark:text-rose-400 dark:hover:text-rose-300",
    dashed: "border border-dashed border-rose-300 text-rose-700 hover:bg-rose-50 active:bg-rose-100 focus-visible:ring-rose-500 dark:border-rose-700 dark:text-rose-300 dark:hover:bg-rose-950/40 dark:active:bg-rose-950/60",
  },
  pink: {
    solid: "bg-pink-600 text-white hover:bg-pink-500 active:bg-pink-700 focus-visible:ring-pink-500",
    outline: "border border-pink-300 text-pink-700 hover:bg-pink-50 active:bg-pink-100 focus-visible:ring-pink-500 dark:border-pink-700 dark:text-pink-300 dark:hover:bg-pink-950/40 dark:active:bg-pink-950/60",
    ghost: "text-pink-700 hover:bg-pink-50 active:bg-pink-100 focus-visible:ring-pink-500 dark:text-pink-300 dark:hover:bg-pink-950/40 dark:active:bg-pink-950/60",
    soft: "bg-pink-100 text-pink-700 hover:bg-pink-200 active:bg-pink-300 focus-visible:ring-pink-500 dark:bg-pink-950/50 dark:text-pink-300 dark:hover:bg-pink-900/60 dark:active:bg-pink-900/80",
    link: "text-pink-600 hover:text-pink-500 underline underline-offset-4 focus-visible:ring-pink-500 dark:text-pink-400 dark:hover:text-pink-300",
    dashed: "border border-dashed border-pink-300 text-pink-700 hover:bg-pink-50 active:bg-pink-100 focus-visible:ring-pink-500 dark:border-pink-700 dark:text-pink-300 dark:hover:bg-pink-950/40 dark:active:bg-pink-950/60",
  },
  accent: {
    solid: "bg-accent-600 text-white hover:bg-accent-500 active:bg-accent-700 focus-visible:ring-accent-500",
    outline: "border border-accent-300 text-accent-700 hover:bg-accent-50 active:bg-accent-100 focus-visible:ring-accent-500 dark:border-accent-700 dark:text-accent-300 dark:hover:bg-accent-950/40 dark:active:bg-accent-950/60",
    ghost: "text-accent-700 hover:bg-accent-50 active:bg-accent-100 focus-visible:ring-accent-500 dark:text-accent-300 dark:hover:bg-accent-950/40 dark:active:bg-accent-950/60",
    soft: "bg-accent-100 text-accent-700 hover:bg-accent-200 active:bg-accent-300 focus-visible:ring-accent-500 dark:bg-accent-950/50 dark:text-accent-300 dark:hover:bg-accent-900/60 dark:active:bg-accent-900/80",
    link: "text-accent-600 hover:text-accent-500 underline underline-offset-4 focus-visible:ring-accent-500 dark:text-accent-400 dark:hover:text-accent-300",
    dashed: "border border-dashed border-accent-300 text-accent-700 hover:bg-accent-50 active:bg-accent-100 focus-visible:ring-accent-500 dark:border-accent-700 dark:text-accent-300 dark:hover:bg-accent-950/40 dark:active:bg-accent-950/60",
  },
};

// Default second color when a gradient is used without an explicit `gradientTo`.
export const defaultGradientPartner: Partial<Record<string, string>> = {
  indigo: "violet",
  rose: "orange",
  emerald: "teal",
  blue: "cyan",
};

export const GRADIENT_CLASSES = "text-white shadow-sm transition-opacity hover:opacity-90 focus-visible:ring-slate-400";

export const sizeClasses = {
  xs: "text-xs px-2.5 py-1.5 gap-1 rounded-md",
  sm: "text-sm px-3 py-1.5 gap-1.5 rounded-md",
  md: "text-sm px-4 py-2 gap-2 rounded-lg",
  lg: "text-base px-5 py-2.5 gap-2 rounded-lg",
  xl: "text-base px-6 py-3 gap-2.5 rounded-xl",
  full: "w-full text-sm px-4 py-2 gap-2 rounded-lg",
};

export const iconOnlySizeClasses = {
  xs: "p-1.5 rounded-md",
  sm: "p-2 rounded-md",
  md: "p-2.5 rounded-lg",
  lg: "p-3 rounded-lg",
  xl: "p-3.5 rounded-xl",
  full: "p-2.5 rounded-lg",
};

export const iconSize = {
  xs: 14,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  full: 16,
};

export function cx(...classes: (string | false | null | undefined)[]): string {
  return twMerge(classes.filter(Boolean).join(" "));
}

export const shapeClasses = {
  default: "", // uses the rounding baked into sizeClasses
  pill: "!rounded-full",
  square: "!rounded-none",
};

export const BASE_BUTTON_CLASSES =
  "inline-flex items-center justify-center font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ring-offset-surface disabled:opacity-40 disabled:pointer-events-none select-none";

export const destructiveClasses = {
  solid: "bg-red-600 text-white hover:bg-red-500 active:bg-red-700 focus-visible:ring-red-500",
  outline: "border border-red-300 text-red-700 hover:bg-red-50 active:bg-red-100 focus-visible:ring-red-500 dark:border-red-700 dark:text-red-300 dark:hover:bg-red-950/40 dark:active:bg-red-950/60",
  soft: "bg-red-100 text-red-700 hover:bg-red-200 active:bg-red-300 focus-visible:ring-red-500 dark:bg-red-950/50 dark:text-red-300 dark:hover:bg-red-900/60 dark:active:bg-red-900/80",
};

export type ColorName = keyof typeof colorClasses;
export type ColorVariant = keyof typeof colorClasses.slate;
export type ButtonVariant =
  | ColorVariant
  | "destructive"
  | "destructive-soft"
  | "destructive-outline"
  | "gradient"
  | "glass";
export type Size = keyof typeof sizeClasses;
export type Shape = keyof typeof shapeClasses;

// Several non-interactive surfaces (Badge, Tooltip's bubble) want the same
// solid color as a Button but without the hover/active/focus-visible states
// baked into `colorClasses` — strip those, or just pull the bg-* class out.
export function nonInteractive(classString: string): string {
  return classString
    .split(" ")
    .filter((c) => !c.startsWith("hover:") && !c.startsWith("active:") && !c.startsWith("focus-visible:"))
    .join(" ");
}

export function solidBg(classString: string): string {
  return classString.split(" ").find((c) => c.startsWith("bg-")) ?? "bg-slate-900";
}

// A fixed hex approximation of each ColorName's 600-shade, matched by eye to
// the Tailwind palette this library otherwise draws from via `colorClasses`
// — for the rare surface (an SVG fill, a native `<input type="color">`
// picker) that needs a real color value instead of a Tailwind class.
export const COLOR_HEX: Record<ColorName, string> = {
  slate: "#475569",
  gray: "#4b5563",
  indigo: "#4f46e5",
  violet: "#7c3aed",
  blue: "#2563eb",
  cyan: "#0891b2",
  emerald: "#059669",
  teal: "#0d9488",
  amber: "#d97706",
  orange: "#ea580c",
  rose: "#e11d48",
  pink: "#db2777",
  accent: "#4f46e5",
};

// `accent` isn't in COLORS (the swatch list) but is a real ColorName — without it here, components treated
// color="accent" as a custom CSS color and rendered no fill at all (white active text on nothing).
const NAMED_COLOR_SET = new Set<string>([...COLORS.map((c) => c.base), "accent"]);

// Type guard distinguishing a built-in ColorName from an arbitrary custom
// color value (e.g. a hex string from a native color-wheel picker) — lets a
// component accept `ColorName | (string & {})` for a color prop and branch
// cleanly at runtime between "use the named Tailwind token" and "use this
// literal value directly".
export function isColorName(value: string): value is ColorName {
  return NAMED_COLOR_SET.has(value);
}

// ---------------------------------------------------------------------------
// Custom (non-built-in) button colors
// ---------------------------------------------------------------------------

/** Readable text color (white or near-black) for a "#rgb" / "#rrggbb" background; white for anything it can't parse. */
function contrastText(color: string): string {
  const m = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(color.trim());
  if (!m) return "#ffffff";
  const hex = m[1].length === 3 ? [...m[1]].map((c) => c + c).join("") : m[1];
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b > 0.5 ? "#0f172a" : "#ffffff";
}

// Literal class strings (Tailwind only sees complete literals) driven by two CSS variables set inline: --btn-c, the color,
// and --btn-fg, the readable text color on a solid fill of it.
const CUSTOM_BUTTON_CLASSES: Record<string, string> = {
  solid: "bg-[var(--btn-c)] text-[var(--btn-fg)] hover:brightness-110 active:brightness-95 focus-visible:ring-[var(--btn-c)]",
  outline:
    "border border-[var(--btn-c)] text-[var(--btn-c)] hover:bg-[color-mix(in_srgb,var(--btn-c)_10%,transparent)] active:bg-[color-mix(in_srgb,var(--btn-c)_20%,transparent)] focus-visible:ring-[var(--btn-c)]",
  ghost:
    "text-[var(--btn-c)] hover:bg-[color-mix(in_srgb,var(--btn-c)_10%,transparent)] active:bg-[color-mix(in_srgb,var(--btn-c)_20%,transparent)] focus-visible:ring-[var(--btn-c)]",
  soft:
    "bg-[color-mix(in_srgb,var(--btn-c)_14%,transparent)] text-[var(--btn-c)] hover:bg-[color-mix(in_srgb,var(--btn-c)_22%,transparent)] active:bg-[color-mix(in_srgb,var(--btn-c)_30%,transparent)] focus-visible:ring-[var(--btn-c)]",
  link: "text-[var(--btn-c)] underline underline-offset-4 hover:opacity-80 focus-visible:ring-[var(--btn-c)]",
  dashed:
    "border border-dashed border-[var(--btn-c)] text-[var(--btn-c)] hover:bg-[color-mix(in_srgb,var(--btn-c)_10%,transparent)] active:bg-[color-mix(in_srgb,var(--btn-c)_20%,transparent)] focus-visible:ring-[var(--btn-c)]",
  glass:
    "bg-[color-mix(in_srgb,var(--btn-c)_14%,transparent)] text-[var(--btn-c)] backdrop-blur-md border border-white/60 dark:border-white/10 shadow-sm focus-visible:ring-[var(--btn-c)]",
  gradient: "text-[var(--btn-fg)] hover:brightness-110 active:brightness-95 focus-visible:ring-[var(--btn-c)]",
};

/** Classes and inline style for a Button in any CSS `color` (a hex from a color picker, an rgb()/hsl() value …) instead of a built-in name. */
export function customButtonStyle(variant: string, color: string): { className: string; style: CSSProperties } {
  const fg = contrastText(color);
  const style: Record<string, string> = { "--btn-c": color, "--btn-fg": fg };
  if (variant === "gradient") style.backgroundImage = `linear-gradient(to right, ${color}, color-mix(in srgb, ${color} 60%, black))`;
  return { className: CUSTOM_BUTTON_CLASSES[variant] ?? CUSTOM_BUTTON_CLASSES.solid, style: style as CSSProperties };
}
