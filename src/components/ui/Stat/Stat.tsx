import { cx, type ColorName } from "../../../core/tokens";
import { Icon } from "../Icons/Icon";

export type StatTrend = "up" | "down" | "neutral";

export interface StatProps {
  /** Caption describing the metric, e.g. "Total revenue". */
  label: string;
  /** The headline metric value, shown prominently; a number or preformatted string. */
  value: string | number;
  /** Trend text, e.g. "12.5%" — shown next to an up/down arrow icon when `trend` isn't "neutral". */
  change?: string;
  /** Default: "neutral" (no arrow/color, just plain `change` text if given). */
  trend?: StatTrend;
  /** Icon name, e.g. "zap" — see src/core/icons.ts for the available set. Shown in a small colored square. */
  icon?: string;
  /** Accent color for the icon square (default: "accent" — follows the theme accent). Trend arrows use a fixed green/red — an
   * up=good/down=bad signal independent of `color` — only the icon square follows `color`. */
  color?: ColorName;
  /** Extra class name(s) appended to the root element. */
  className?: string;
  /** Per-part class overrides — merged after (and win over) the built-in styling. */
  classNames?: {
    root?: string;
    icon?: string;
    label?: string;
    value?: string;
    change?: string;
  };
}

const ICON_SQUARE_CLASSES: Record<ColorName, string> = {
  slate: "bg-surface-muted text-fg-muted",
  gray: "bg-surface-muted text-fg-muted",
  indigo: "bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-300",
  accent: "bg-accent-100 text-accent-600 dark:bg-accent-500/20 dark:text-accent-300",
  violet: "bg-violet-100 text-violet-600 dark:bg-violet-500/20 dark:text-violet-300",
  blue: "bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-300",
  cyan: "bg-cyan-100 text-cyan-600 dark:bg-cyan-500/20 dark:text-cyan-300",
  emerald: "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-300",
  teal: "bg-teal-100 text-teal-600 dark:bg-teal-500/20 dark:text-teal-300",
  amber: "bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-300",
  orange: "bg-orange-100 text-orange-600 dark:bg-orange-500/20 dark:text-orange-300",
  rose: "bg-rose-100 text-rose-600 dark:bg-rose-500/20 dark:text-rose-300",
  pink: "bg-pink-100 text-pink-600 dark:bg-pink-500/20 dark:text-pink-300",
};

const TREND_CLASSES: Record<StatTrend, string> = {
  up: "text-emerald-600 dark:text-emerald-400",
  down: "text-rose-600 dark:text-rose-400",
  neutral: "text-fg-subtle",
};

export function Stat({ label, value, change, trend = "neutral", icon, color = "accent", className, classNames }: StatProps) {
  return (
    <div className={cx("rounded-xl border border-border bg-surface p-5", className, classNames?.root)}>
      {icon && (
        <div
          className={cx(
            "mb-3 flex h-9 w-9 items-center justify-center rounded-lg",
            ICON_SQUARE_CLASSES[color],
            classNames?.icon
          )}
        >
          <Icon name={icon} size={18} />
        </div>
      )}
      <p className={cx("text-sm text-fg-subtle", classNames?.label)}>{label}</p>
      <p className={cx("mt-1 text-2xl font-semibold text-fg", classNames?.value)}>{value}</p>
      {change && (
        <div className={cx("mt-2 flex items-center gap-1 text-sm font-medium", TREND_CLASSES[trend], classNames?.change)}>
          {trend !== "neutral" && <Icon name={trend === "up" ? "arrow-up" : "arrow-down"} size={14} />}
          <span>{change}</span>
        </div>
      )}
    </div>
  );
}
