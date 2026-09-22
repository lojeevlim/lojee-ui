import type { CSSProperties, ReactNode } from "react";
import { cx, isColorName, type ColorName } from "../../../core/tokens";

// Darkens a "#rrggbb" hex color for the second stop of a custom gradient — same role Tailwind's
// 600→700 step plays for a named ColorName. Mirrors Sidebar's/Navbar's own `darkenHex` — kept as its
// own copy here rather than a shared import, matching how this file's other color maps below are also
// kept local instead of centralized.
function darkenHex(hex: string, factor = 0.82): string {
  const match = /^#?([0-9a-f]{6})$/i.exec(hex);
  if (!match) return hex;
  const value = parseInt(match[1], 16);
  const channel = (shift: number) => Math.max(0, Math.min(255, Math.round(((value >> shift) & 255) * factor)));
  return `#${[16, 8, 0].map((shift) => channel(shift).toString(16).padStart(2, "0")).join("")}`;
}

export type HeaderVariant = "light" | "dark" | "bordered" | "elevated" | "minimal" | "gradient" | "glass";

export interface HeaderProps {
  title: ReactNode;
  description?: ReactNode;
  /** Optional content above the title, e.g. a <Breadcrumbs> trail. */
  breadcrumbs?: ReactNode;
  /** Right-side content — action buttons. */
  actions?: ReactNode;
  /**
   * Visual theme (default: "light"), identical set to Sidebar/Navbar:
   * - "bordered"/"elevated"/"glass" all float as a detached card instead of sitting flush in the page's
   *   content flow — kept as separate names since each still has its own distinct look on top of that
   *   shared shape: "bordered" has a thick `color`-tinted border, shadow, and rounded corners (see
   *   `color`/`borderWidth`); "elevated" has that same shadow and rounded corners but no border — depth
   *   from the shadow alone, Material-card style; "glass" is a faint, colorless `bg-white/10` tint plus
   *   `backdrop-blur-2xl` — a real frosted-glass look, not a solid tinted panel. `color` tints "glass"'s
   *   backdrop (the padded space around the card) instead of the card itself, since `backdrop-blur` can
   *   only ever blur what's behind it *within this same component* — its own backdrop, never your page
   *   — so a fully colorless card would camouflage against a backdrop of the same color, with no
   *   contrast left to reveal its rounded corners or shadow. All three are self-contained — an inset
   *   backdrop is included automatically (padding + `bg-zinc-100`, or `color` for "glass") so the card
   *   always reads correctly (rounded corners, blur) with no wrapper markup needed on your end.
   * - "dark" — slate-900 background, title/description switch to white/white-ish.
   * - "minimal" — no background/border at all, blends fully into the page (unlike "light", which keeps
   *   a white background and bottom divider).
   * - "gradient" — a left-to-right gradient built from `color` (600 → 700).
   */
  variant?: HeaderVariant;
  /** Accent color (default: "slate") — one of the built-in ColorNames, or any other CSS color value
   * (e.g. "#7c3aed" from a color-wheel picker) for a fully custom accent, unconstrained by the fixed
   * palette. For "gradient" it's the gradient itself (600→700-equivalent; a custom hex gets a
   * programmatically darkened second stop); for "bordered" it tints the card's own border (has no
   * effect on "elevated", which has no border to tint); for "glass" — which has no background color of
   * its own — it tints the backdrop around the card instead, since that's the only part of it that can
   * carry a color at all. Has no effect on "light"/"dark"/"minimal". */
  color?: ColorName | (string & {});
  /** "bordered"'s own border thickness in px (default: 2). Has no effect on any other variant. */
  borderWidth?: number;
  className?: string;
  classNames?: {
    root?: string;
    breadcrumbs?: string;
    title?: string;
    description?: string;
    actions?: string;
  };
}

const VARIANT_CLASSES: Record<HeaderVariant, string> = {
  light: "bg-white border-b border-slate-200",
  dark: "bg-slate-900 border-b border-slate-800",
  // "bordered", "elevated", and "glass" all float as a detached card (see `isDetachedPanel`) rather
  // than sitting flush in the page's own content flow — kept as separate `variant` names since each
  // still has its own distinct look (colored border / shadow-only / frosted-transparent) on top of
  // that shared shape. "elevated" deliberately carries no border — shadow-lg alone does the "floating
  // card" job, Material-style — so it stays visually distinct from "bordered" instead of duplicating it.
  bordered: "bg-white border-2 border-slate-300 rounded-xl shadow-lg",
  elevated: "bg-white rounded-xl shadow-lg",
  minimal: "bg-transparent",
  gradient: "text-white",
  // Same frosted-glass treatment as Sidebar's/Navbar's own "glass" — see Sidebar.tsx for the full
  // reasoning on `bg-white/10`/`backdrop-blur-2xl`/the arbitrary shadow value.
  glass: "bg-white/10 backdrop-blur-2xl border border-white/10 rounded-xl shadow-[0_0_60px_-8px_rgba(0,0,0,0.45)]",
};

const VARIANT_TITLE_TEXT: Record<HeaderVariant, string> = {
  light: "text-slate-900",
  dark: "text-white",
  bordered: "text-slate-900",
  elevated: "text-slate-900",
  minimal: "text-slate-900",
  gradient: "text-white",
  glass: "text-white",
};

const VARIANT_DESCRIPTION_TEXT: Record<HeaderVariant, string> = {
  light: "text-slate-500",
  dark: "text-white/60",
  bordered: "text-slate-500",
  elevated: "text-slate-500",
  minimal: "text-slate-500",
  gradient: "text-white/70",
  glass: "text-white/70",
};

// "bordered"'s defining feature is its border, so unlike every other variant it tints that border with
// the Header's own `color` — same "300" shade every ColorName's own outline-style border already uses
// elsewhere in the library (see core/tokens.ts's colorClasses, and Sidebar's/Navbar's identical map),
// for consistency. "elevated" has no border to tint, so it doesn't use this map.
const DETACHED_PANEL_ACCENT_BORDER: Record<ColorName, string> = {
  slate: "border-slate-300",
  gray: "border-gray-300",
  indigo: "border-indigo-300",
  violet: "border-violet-300",
  blue: "border-blue-300",
  cyan: "border-cyan-300",
  emerald: "border-emerald-300",
  teal: "border-teal-300",
  amber: "border-amber-300",
  orange: "border-orange-300",
  rose: "border-rose-300",
  pink: "border-pink-300",
};

// "glass" itself has no background color (see VARIANT_CLASSES) — its own backdrop, the space around
// the frosted card, is the only thing that can carry `color` for it, so it does instead. Same mid-tone
// (500) as Sidebar's/Navbar's identical map — this backdrop's whole job is to be visible color behind
// a translucent card, the opposite of a subtle divider/border tint.
const GLASS_BACKDROP: Record<ColorName, string> = {
  slate: "bg-slate-500",
  gray: "bg-gray-500",
  indigo: "bg-indigo-500",
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

export function Header({
  title,
  description,
  breadcrumbs,
  actions,
  variant = "light",
  color = "slate",
  borderWidth,
  className,
  classNames,
}: HeaderProps) {
  // Same "detached panel" concept as Sidebar/Navbar (see Sidebar's own `isDetachedPanel` for the full
  // reasoning) — "bordered"/"elevated"/"glass" float as a card with an inset backdrop instead of
  // sitting flush in the page's content flow.
  const isDetachedPanel = variant === "bordered" || variant === "elevated" || variant === "glass";
  const colorIsNamed = isColorName(color);
  // Only "bordered" ties its border to `color`/`borderWidth` — "elevated" has no border at all
  // (shadow-only), "glass" deliberately stays colorless (a real frosted-glass look has no tint), and
  // every other variant's border is a fixed-width neutral divider, not an adjustable, colored one.
  const hasAccentBorder = variant === "bordered";
  const borderedAccentClass = hasAccentBorder && colorIsNamed ? DETACHED_PANEL_ACCENT_BORDER[color] : undefined;
  const borderedAccentStyle: CSSProperties | undefined = hasAccentBorder
    ? {
        ...(!colorIsNamed && { borderColor: color }),
        ...(borderWidth !== undefined && { borderWidth: `${borderWidth}px` }),
      }
    : undefined;
  const isGlass = variant === "glass";
  // "glass"'s own backdrop (the padded space around the card, not the card itself) is what carries
  // `color` for it — a named ColorName gets a real Tailwind class; a custom value falls back to the
  // same inline-style approach used everywhere else in this component for arbitrary CSS colors.
  const glassBackdropClass = isGlass && colorIsNamed ? GLASS_BACKDROP[color] : undefined;
  const style: CSSProperties = {
    ...(isGlass && !colorIsNamed && { backgroundColor: color }),
    ...(variant === "gradient" && {
      backgroundImage: colorIsNamed
        ? // "to right", not Sidebar's "to bottom" — a page header reads left-to-right, not top-to-bottom.
          `linear-gradient(to right, var(--color-${color}-600), var(--color-${color}-700))`
        : `linear-gradient(to right, ${color}, ${darkenHex(color)})`,
    }),
  };

  const panelContent = (
    <>
      {breadcrumbs != null && (
        <div className={cx("mb-1", classNames?.breadcrumbs)}>
          <slot name="breadcrumbs">{breadcrumbs}</slot>
        </div>
      )}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h1 className={cx("text-xl font-semibold", VARIANT_TITLE_TEXT[variant], classNames?.title)}>
            <slot name="title">{title}</slot>
          </h1>
          {description != null && (
            <p className={cx("mt-1 text-sm", VARIANT_DESCRIPTION_TEXT[variant], classNames?.description)}>
              <slot name="description">{description}</slot>
            </p>
          )}
        </div>
        {actions != null && (
          <div className={cx("flex shrink-0 items-center gap-2", classNames?.actions)}>
            <slot name="actions">{actions}</slot>
          </div>
        )}
      </div>
    </>
  );

  // "dark"/"gradient" paint their own opaque/filled background all the way to the edge (unlike
  // "light"/"minimal", which are meant to blend into a page that already provides its own side
  // padding) — without side padding of their own, the title/description/actions end up flush against
  // that fill's edges instead of reading as a contained bar.
  const hasFilledDockedBackground = variant === "dark" || variant === "gradient";

  const panel = (
    <div
      className={cx(
        "flex flex-col gap-1",
        isDetachedPanel ? "p-4" : hasFilledDockedBackground ? "px-6 py-4" : "pb-6",
        VARIANT_CLASSES[variant],
        isDetachedPanel && borderedAccentClass,
        className,
        classNames?.root
      )}
      style={isDetachedPanel ? borderedAccentStyle : style}
    >
      {panelContent}
    </div>
  );

  if (!isDetachedPanel) return panel;

  return (
    <div className={cx("p-3", isGlass ? glassBackdropClass : "bg-zinc-100")} style={style}>
      {panel}
    </div>
  );
}
