import { cx, type ColorName } from "../../../core/tokens";
import { Icon } from "../Icons/Icon";

export type StatTrend = "up" | "down" | "neutral";

export interface StatProps {
  label: string;
  value: string | number;
  /** Trend text, e.g. "12.5%" — shown next to an up/down arrow icon when `trend` isn't "neutral". */
  change?: string;
  /** Default: "neutral" (no arrow/color, just plain `change` text if given). */
  trend?: StatTrend;
  /** Icon name, e.g. "zap" — see src/core/icons.ts for the available set. Shown in a small colored square. */
  icon?: string;
  /** Accent color for the icon square (default: "slate"). Trend arrows use a fixed green/red — an
   * up=good/down=bad signal independent of `color` — only the icon square follows `color`. */
  color?: ColorName;
  className?: string;
  classNames?: {
    root?: string;
    icon?: string;
    label?: string;
    value?: string;
    change?: string;
  };
}

const ICON_SQUARE_CLASSES: Record<ColorName, string> = {
  slate: "bg-slate-100 text-slate-600",
  gray: "bg-gray-100 text-gray-600",
  indigo: "bg-indigo-100 text-indigo-600",
  violet: "bg-violet-100 text-violet-600",
  blue: "bg-blue-100 text-blue-600",
  cyan: "bg-cyan-100 text-cyan-600",
  emerald: "bg-emerald-100 text-emerald-600",
  teal: "bg-teal-100 text-teal-600",
  amber: "bg-amber-100 text-amber-600",
  orange: "bg-orange-100 text-orange-600",
  rose: "bg-rose-100 text-rose-600",
  pink: "bg-pink-100 text-pink-600",
};

const TREND_CLASSES: Record<StatTrend, string> = {
  up: "text-emerald-600",
  down: "text-rose-600",
  neutral: "text-slate-500",
};

export function Stat({ label, value, change, trend = "neutral", icon, color = "slate", className, classNames }: StatProps) {
  return (
    <div className={cx("rounded-xl border border-slate-200 bg-white p-5", className, classNames?.root)}>
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
      <p className={cx("text-sm text-slate-500", classNames?.label)}>{label}</p>
      <p className={cx("mt-1 text-2xl font-semibold text-slate-900", classNames?.value)}>{value}</p>
      {change && (
        <div className={cx("mt-2 flex items-center gap-1 text-sm font-medium", TREND_CLASSES[trend], classNames?.change)}>
          {trend !== "neutral" && <Icon name={trend === "up" ? "arrow-up" : "arrow-down"} size={14} />}
          <span>{change}</span>
        </div>
      )}
    </div>
  );
}
