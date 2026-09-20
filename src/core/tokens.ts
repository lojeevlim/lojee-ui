// Framework-agnostic design tokens shared by the React components
// (src/components/ui) and the Web Components (src/elements). Plain data —
// no React, no Lit — so both surfaces render pixel-identical output from
// one source of truth.

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
    solid: "bg-slate-900 text-white hover:bg-slate-700 active:bg-slate-800 focus-visible:ring-slate-500",
    outline: "border border-slate-300 text-slate-900 hover:bg-slate-100 active:bg-slate-200 focus-visible:ring-slate-500",
    ghost: "text-slate-900 hover:bg-slate-100 active:bg-slate-200 focus-visible:ring-slate-500",
    soft: "bg-slate-100 text-slate-900 hover:bg-slate-200 active:bg-slate-300 focus-visible:ring-slate-500",
    link: "text-slate-900 hover:text-slate-600 underline underline-offset-4 focus-visible:ring-slate-500",
    dashed: "border border-dashed border-slate-300 text-slate-900 hover:bg-slate-100 active:bg-slate-200 focus-visible:ring-slate-500",
  },
  gray: {
    solid: "bg-gray-600 text-white hover:bg-gray-500 active:bg-gray-700 focus-visible:ring-gray-500",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-50 active:bg-gray-100 focus-visible:ring-gray-500",
    ghost: "text-gray-700 hover:bg-gray-50 active:bg-gray-100 focus-visible:ring-gray-500",
    soft: "bg-gray-100 text-gray-700 hover:bg-gray-200 active:bg-gray-300 focus-visible:ring-gray-500",
    link: "text-gray-600 hover:text-gray-500 underline underline-offset-4 focus-visible:ring-gray-500",
    dashed: "border border-dashed border-gray-300 text-gray-700 hover:bg-gray-50 active:bg-gray-100 focus-visible:ring-gray-500",
  },
  indigo: {
    solid: "bg-indigo-600 text-white hover:bg-indigo-500 active:bg-indigo-700 focus-visible:ring-indigo-500",
    outline: "border border-indigo-300 text-indigo-700 hover:bg-indigo-50 active:bg-indigo-100 focus-visible:ring-indigo-500",
    ghost: "text-indigo-700 hover:bg-indigo-50 active:bg-indigo-100 focus-visible:ring-indigo-500",
    soft: "bg-indigo-100 text-indigo-700 hover:bg-indigo-200 active:bg-indigo-300 focus-visible:ring-indigo-500",
    link: "text-indigo-600 hover:text-indigo-500 underline underline-offset-4 focus-visible:ring-indigo-500",
    dashed: "border border-dashed border-indigo-300 text-indigo-700 hover:bg-indigo-50 active:bg-indigo-100 focus-visible:ring-indigo-500",
  },
  violet: {
    solid: "bg-violet-600 text-white hover:bg-violet-500 active:bg-violet-700 focus-visible:ring-violet-500",
    outline: "border border-violet-300 text-violet-700 hover:bg-violet-50 active:bg-violet-100 focus-visible:ring-violet-500",
    ghost: "text-violet-700 hover:bg-violet-50 active:bg-violet-100 focus-visible:ring-violet-500",
    soft: "bg-violet-100 text-violet-700 hover:bg-violet-200 active:bg-violet-300 focus-visible:ring-violet-500",
    link: "text-violet-600 hover:text-violet-500 underline underline-offset-4 focus-visible:ring-violet-500",
    dashed: "border border-dashed border-violet-300 text-violet-700 hover:bg-violet-50 active:bg-violet-100 focus-visible:ring-violet-500",
  },
  blue: {
    solid: "bg-blue-600 text-white hover:bg-blue-500 active:bg-blue-700 focus-visible:ring-blue-500",
    outline: "border border-blue-300 text-blue-700 hover:bg-blue-50 active:bg-blue-100 focus-visible:ring-blue-500",
    ghost: "text-blue-700 hover:bg-blue-50 active:bg-blue-100 focus-visible:ring-blue-500",
    soft: "bg-blue-100 text-blue-700 hover:bg-blue-200 active:bg-blue-300 focus-visible:ring-blue-500",
    link: "text-blue-600 hover:text-blue-500 underline underline-offset-4 focus-visible:ring-blue-500",
    dashed: "border border-dashed border-blue-300 text-blue-700 hover:bg-blue-50 active:bg-blue-100 focus-visible:ring-blue-500",
  },
  cyan: {
    solid: "bg-cyan-600 text-white hover:bg-cyan-500 active:bg-cyan-700 focus-visible:ring-cyan-500",
    outline: "border border-cyan-300 text-cyan-700 hover:bg-cyan-50 active:bg-cyan-100 focus-visible:ring-cyan-500",
    ghost: "text-cyan-700 hover:bg-cyan-50 active:bg-cyan-100 focus-visible:ring-cyan-500",
    soft: "bg-cyan-100 text-cyan-700 hover:bg-cyan-200 active:bg-cyan-300 focus-visible:ring-cyan-500",
    link: "text-cyan-600 hover:text-cyan-500 underline underline-offset-4 focus-visible:ring-cyan-500",
    dashed: "border border-dashed border-cyan-300 text-cyan-700 hover:bg-cyan-50 active:bg-cyan-100 focus-visible:ring-cyan-500",
  },
  emerald: {
    solid: "bg-emerald-600 text-white hover:bg-emerald-500 active:bg-emerald-700 focus-visible:ring-emerald-500",
    outline: "border border-emerald-300 text-emerald-700 hover:bg-emerald-50 active:bg-emerald-100 focus-visible:ring-emerald-500",
    ghost: "text-emerald-700 hover:bg-emerald-50 active:bg-emerald-100 focus-visible:ring-emerald-500",
    soft: "bg-emerald-100 text-emerald-700 hover:bg-emerald-200 active:bg-emerald-300 focus-visible:ring-emerald-500",
    link: "text-emerald-600 hover:text-emerald-500 underline underline-offset-4 focus-visible:ring-emerald-500",
    dashed: "border border-dashed border-emerald-300 text-emerald-700 hover:bg-emerald-50 active:bg-emerald-100 focus-visible:ring-emerald-500",
  },
  teal: {
    solid: "bg-teal-600 text-white hover:bg-teal-500 active:bg-teal-700 focus-visible:ring-teal-500",
    outline: "border border-teal-300 text-teal-700 hover:bg-teal-50 active:bg-teal-100 focus-visible:ring-teal-500",
    ghost: "text-teal-700 hover:bg-teal-50 active:bg-teal-100 focus-visible:ring-teal-500",
    soft: "bg-teal-100 text-teal-700 hover:bg-teal-200 active:bg-teal-300 focus-visible:ring-teal-500",
    link: "text-teal-600 hover:text-teal-500 underline underline-offset-4 focus-visible:ring-teal-500",
    dashed: "border border-dashed border-teal-300 text-teal-700 hover:bg-teal-50 active:bg-teal-100 focus-visible:ring-teal-500",
  },
  amber: {
    solid: "bg-amber-500 text-white hover:bg-amber-400 active:bg-amber-600 focus-visible:ring-amber-500",
    outline: "border border-amber-300 text-amber-700 hover:bg-amber-50 active:bg-amber-100 focus-visible:ring-amber-500",
    ghost: "text-amber-700 hover:bg-amber-50 active:bg-amber-100 focus-visible:ring-amber-500",
    soft: "bg-amber-100 text-amber-700 hover:bg-amber-200 active:bg-amber-300 focus-visible:ring-amber-500",
    link: "text-amber-600 hover:text-amber-500 underline underline-offset-4 focus-visible:ring-amber-500",
    dashed: "border border-dashed border-amber-300 text-amber-700 hover:bg-amber-50 active:bg-amber-100 focus-visible:ring-amber-500",
  },
  orange: {
    solid: "bg-orange-600 text-white hover:bg-orange-500 active:bg-orange-700 focus-visible:ring-orange-500",
    outline: "border border-orange-300 text-orange-700 hover:bg-orange-50 active:bg-orange-100 focus-visible:ring-orange-500",
    ghost: "text-orange-700 hover:bg-orange-50 active:bg-orange-100 focus-visible:ring-orange-500",
    soft: "bg-orange-100 text-orange-700 hover:bg-orange-200 active:bg-orange-300 focus-visible:ring-orange-500",
    link: "text-orange-600 hover:text-orange-500 underline underline-offset-4 focus-visible:ring-orange-500",
    dashed: "border border-dashed border-orange-300 text-orange-700 hover:bg-orange-50 active:bg-orange-100 focus-visible:ring-orange-500",
  },
  rose: {
    solid: "bg-rose-600 text-white hover:bg-rose-500 active:bg-rose-700 focus-visible:ring-rose-500",
    outline: "border border-rose-300 text-rose-700 hover:bg-rose-50 active:bg-rose-100 focus-visible:ring-rose-500",
    ghost: "text-rose-700 hover:bg-rose-50 active:bg-rose-100 focus-visible:ring-rose-500",
    soft: "bg-rose-100 text-rose-700 hover:bg-rose-200 active:bg-rose-300 focus-visible:ring-rose-500",
    link: "text-rose-600 hover:text-rose-500 underline underline-offset-4 focus-visible:ring-rose-500",
    dashed: "border border-dashed border-rose-300 text-rose-700 hover:bg-rose-50 active:bg-rose-100 focus-visible:ring-rose-500",
  },
  pink: {
    solid: "bg-pink-600 text-white hover:bg-pink-500 active:bg-pink-700 focus-visible:ring-pink-500",
    outline: "border border-pink-300 text-pink-700 hover:bg-pink-50 active:bg-pink-100 focus-visible:ring-pink-500",
    ghost: "text-pink-700 hover:bg-pink-50 active:bg-pink-100 focus-visible:ring-pink-500",
    soft: "bg-pink-100 text-pink-700 hover:bg-pink-200 active:bg-pink-300 focus-visible:ring-pink-500",
    link: "text-pink-600 hover:text-pink-500 underline underline-offset-4 focus-visible:ring-pink-500",
    dashed: "border border-dashed border-pink-300 text-pink-700 hover:bg-pink-50 active:bg-pink-100 focus-visible:ring-pink-500",
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
  "inline-flex items-center justify-center font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-40 disabled:pointer-events-none select-none";

export const destructiveClasses = {
  solid: "bg-red-600 text-white hover:bg-red-500 active:bg-red-700 focus-visible:ring-red-500",
  outline: "border border-red-300 text-red-700 hover:bg-red-50 active:bg-red-100 focus-visible:ring-red-500",
  soft: "bg-red-100 text-red-700 hover:bg-red-200 active:bg-red-300 focus-visible:ring-red-500",
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
};

const NAMED_COLOR_SET = new Set<string>(COLORS.map((c) => c.base));

// Type guard distinguishing a built-in ColorName from an arbitrary custom
// color value (e.g. a hex string from a native color-wheel picker) — lets a
// component accept `ColorName | (string & {})` for a color prop and branch
// cleanly at runtime between "use the named Tailwind token" and "use this
// literal value directly".
export function isColorName(value: string): value is ColorName {
  return NAMED_COLOR_SET.has(value);
}
