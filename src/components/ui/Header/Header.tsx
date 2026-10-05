import type { CSSProperties, ReactNode } from "react";
import { linearGradient, type GradientDirection } from "../../../core/gradient";
import { cx, isColorName, type ColorName } from "../../../core/tokens";
import { motionClass, motionStyle, type TransitionVariant } from "../../../core/motion";

// Darkens a "#rrggbb" hex color for the second stop of a custom gradient — same role Tailwind's
// 600→700 step plays for a named ColorName. Mirrors Sidebar's/Navbar's own `darkenHex` — kept as its
// own copy here rather than a shared import, matching how this file's other color maps below are also
// kept local instead of centralized.
function darkenHex(hex: string, factor = 0.82): string {
  const match = /^#?([0-9a-f]{6})$/i.exec(hex);
  // Not a "#rrggbb" (e.g. a `var(...)`/`rgb(...)` value) — mix toward black instead.
  if (!match) return `color-mix(in srgb, ${hex}, black ${Math.round((1 - factor) * 100)}%)`;
  const value = parseInt(match[1], 16);
  const channel = (shift: number) => Math.max(0, Math.min(255, Math.round(((value >> shift) & 255) * factor)));
  return `#${[16, 8, 0].map((shift) => channel(shift).toString(16).padStart(2, "0")).join("")}`;
}

export type HeaderVariant = "light" | "dark" | "bordered" | "elevated" | "minimal" | "gradient";

export interface HeaderProps {
  /** Main heading content. */
  title: ReactNode;
  /** Secondary text shown below the title. */
  description?: ReactNode;
  /** Optional content above the title, e.g. a <Breadcrumbs> trail. */
  breadcrumbs?: ReactNode;
  /** Right-side content — action buttons. */
  actions?: ReactNode;
  /**
   * Visual theme (default: "light"), identical set to Sidebar/Navbar:
   * - "bordered"/"elevated" both float as a detached card instead of sitting flush in the page's
   *   content flow — kept as separate names since each still has its own distinct look on top of that
   *   shared shape: "bordered" has a thick `color`-tinted border, shadow, and rounded corners (see
   *   `color`/`borderWidth`); "elevated" has that same shadow and rounded corners but no border — depth
   *   from the shadow alone, Material-card style.
   *   Both are self-contained — an inset backdrop is included automatically (padding + `bg-surface-muted`)
   *   so the card always reads correctly (rounded corners) with no wrapper markup needed on your end.
   * - "dark" — a deep shade of the theme accent (accent-950), title/description switch to white/white-ish.
   * - "minimal" — no background/border at all, blends fully into the page (unlike "light", which keeps
   *   a white background and bottom divider).
   * - "gradient" — a left-to-right gradient built from `color` (600 → 700).
   */
  variant?: HeaderVariant;
  /** Accent color (default: "accent" — follows the theme accent) — one of the built-in ColorNames, or any other CSS color value
   * (e.g. "#7c3aed" from a color-wheel picker) for a fully custom accent, unconstrained by the fixed
   * palette. For "gradient" it's the gradient itself (600→700-equivalent; a custom hex gets a
   * programmatically darkened second stop); for "bordered" it tints the card's own border (has no
   * effect on "elevated", which has no border to tint). Has no effect on "light"/"dark"/"minimal". */
  color?: ColorName | (string & {});
  /** Second color of the "gradient" variant: a `ColorName` or any CSS color such as "#ec4899" (default: a darker shade of `color`). */
  gradientTo?: ColorName | (string & {});
  /** Direction of the "gradient" variant: "to-right" | "to-left" | "to-bottom" | "to-top" | "to-br" | "to-bl" | "to-tr" | "to-tl" (default: "to-right"). */
  gradientDirection?: GradientDirection;
  /** "bordered"'s own border thickness in px (default: 2). Has no effect on any other variant. */
  borderWidth?: number;
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
    breadcrumbs?: string;
    title?: string;
    description?: string;
    actions?: string;
  };
}

const VARIANT_CLASSES: Record<HeaderVariant, string> = {
  light: "bg-surface border-b border-border",
  dark: "bg-accent-950 border-b border-white/10",
  // "bordered" and "elevated" both float as a detached card (see `isDetachedPanel`) rather
  // than sitting flush in the page's own content flow — kept as separate `variant` names since each
  // still has its own distinct look (colored border / shadow-only) on top of
  // that shared shape. "elevated" deliberately carries no border — shadow-lg alone does the "floating
  // card" job, Material-style — so it stays visually distinct from "bordered" instead of duplicating it.
  bordered: "bg-surface border-2 border-border-strong rounded-xl shadow-lg",
  elevated: "bg-surface rounded-xl shadow-lg",
  minimal: "bg-transparent",
  gradient: "text-white",
};

const VARIANT_TITLE_TEXT: Record<HeaderVariant, string> = {
  light: "text-fg",
  dark: "text-white",
  bordered: "text-fg",
  elevated: "text-fg",
  minimal: "text-fg",
  gradient: "text-white",
};

const VARIANT_DESCRIPTION_TEXT: Record<HeaderVariant, string> = {
  light: "text-fg-subtle",
  dark: "text-white/60",
  bordered: "text-fg-subtle",
  elevated: "text-fg-subtle",
  minimal: "text-fg-subtle",
  gradient: "text-white/70",
};

// "bordered"'s defining feature is its border, so unlike every other variant it tints that border with
// the Header's own `color` — same "300" shade every ColorName's own outline-style border already uses
// elsewhere in the library (see core/tokens.ts's colorClasses, and Sidebar's/Navbar's identical map),
// for consistency. "elevated" has no border to tint, so it doesn't use this map.
const DETACHED_PANEL_ACCENT_BORDER: Record<ColorName, string> = {
  slate: "border-border-strong",
  gray: "border-border-strong",
  indigo: "border-indigo-300 dark:border-indigo-700",
  accent: "border-accent-300 dark:border-accent-700",
  violet: "border-violet-300 dark:border-violet-700",
  blue: "border-blue-300 dark:border-blue-700",
  cyan: "border-cyan-300 dark:border-cyan-700",
  emerald: "border-emerald-300 dark:border-emerald-700",
  teal: "border-teal-300 dark:border-teal-700",
  amber: "border-amber-300 dark:border-amber-700",
  orange: "border-orange-300 dark:border-orange-700",
  rose: "border-rose-300 dark:border-rose-700",
  pink: "border-pink-300 dark:border-pink-700",
};

export function Header({
  title,
  description,
  breadcrumbs,
  actions,
  variant = "light",
  color = "accent",
  gradientTo,
  gradientDirection = "to-right",
  borderWidth,
  transition,
  transitionDuration,
  transitionDelay,
  className,
  classNames,
}: HeaderProps) {
  // Same "detached panel" concept as Sidebar/Navbar (see Sidebar's own `isDetachedPanel` for the full
  // reasoning) — "bordered"/"elevated" float as a card with an inset backdrop instead of
  // sitting flush in the page's content flow.
  const isDetachedPanel = variant === "bordered" || variant === "elevated";
  const colorIsNamed = isColorName(color);
  // Only "bordered" ties its border to `color`/`borderWidth` — "elevated" has no border at all
  // (shadow-only), and
  // every other variant's border is a fixed-width neutral divider, not an adjustable, colored one.
  const hasAccentBorder = variant === "bordered";
  const borderedAccentClass = hasAccentBorder && colorIsNamed ? DETACHED_PANEL_ACCENT_BORDER[color] : undefined;
  const borderedAccentStyle: CSSProperties | undefined = hasAccentBorder
    ? {
        ...(!colorIsNamed && { borderColor: color }),
        ...(borderWidth !== undefined && { borderWidth: `${borderWidth}px` }),
      }
    : undefined;
  const style: CSSProperties = {
    // The second stop defaults to a darker shade of `color`: 600 → 700 for a named color (700 is the darkest
    // shade every ColorName's `colorClasses` entry references, so Tailwind always emits its variable), and
    // a programmatic darkening for a custom one.
    ...(variant === "gradient" && {
      backgroundImage: linearGradient(color, gradientTo ?? (colorIsNamed ? `var(--color-${color}-700)` : darkenHex(color)), gradientDirection),
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
      data-header={variant}
      className={cx(
        "flex flex-col gap-1",
        isDetachedPanel ? "p-4" : hasFilledDockedBackground ? "px-6 py-4" : "pb-6",
        VARIANT_CLASSES[variant],
        isDetachedPanel && borderedAccentClass,
        motionClass(transition),
        className,
        classNames?.root
      )}
      style={{ ...(isDetachedPanel ? borderedAccentStyle : style), ...motionStyle(transitionDuration, transitionDelay) }}
    >
      {panelContent}
    </div>
  );

  if (!isDetachedPanel) return panel;

  return (
    <div className={cx("p-3", "bg-surface-muted")} style={style}>
      {panel}
    </div>
  );
}
