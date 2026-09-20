import { cx, type ColorName } from "../../../core/tokens";

export type ProgressBarSize = "sm" | "md" | "lg";

export interface ProgressBarProps {
  /** 0–100 (or 0–max). Omit and set `indeterminate` for an unknown-duration loading bar. */
  value?: number;
  /** default 100 */
  max?: number;
  /** Controls track height (default: "md"). */
  size?: ProgressBarSize;
  /** default "slate" */
  color?: ColorName;
  /** Shows the percentage as text. */
  showLabel?: boolean;
  /** Diagonal-stripe texture on the filled bar. */
  striped?: boolean;
  /** Animated sweeping bar, ignores `value`. */
  indeterminate?: boolean;
  className?: string;
  /** Per-part class overrides — merged after (and win over) the built-in styling. */
  classNames?: {
    root?: string;
    track?: string;
    bar?: string;
    label?: string;
  };
}

const TRACK_HEIGHT: Record<ProgressBarSize, string> = {
  sm: "h-1.5",
  md: "h-2.5",
  lg: "h-4",
};

const BG_COLOR: Record<ColorName, string> = {
  slate: "bg-slate-900",
  gray: "bg-gray-600",
  indigo: "bg-indigo-600",
  violet: "bg-violet-600",
  blue: "bg-blue-600",
  cyan: "bg-cyan-600",
  emerald: "bg-emerald-600",
  teal: "bg-teal-600",
  amber: "bg-amber-500",
  orange: "bg-orange-600",
  rose: "bg-rose-600",
  pink: "bg-pink-600",
};

const STRIPE_CLASSES =
  "bg-[linear-gradient(45deg,rgba(255,255,255,0.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.15)_50%,rgba(255,255,255,0.15)_75%,transparent_75%,transparent)] bg-[length:1rem_1rem]";

export function ProgressBar({
  value,
  max = 100,
  size = "md",
  color = "slate",
  showLabel = false,
  striped = false,
  indeterminate = false,
  className,
  classNames,
}: ProgressBarProps) {
  const clamped = Math.min(max, Math.max(0, value ?? 0));
  const pct = max > 0 ? (clamped / max) * 100 : 0;
  const barColor = BG_COLOR[color] || BG_COLOR.slate;

  return (
    <div className={cx("w-full", className, classNames?.root)}>
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={indeterminate ? undefined : clamped}
        className={cx(
          "relative w-full overflow-hidden rounded-full bg-slate-100",
          TRACK_HEIGHT[size],
          classNames?.track
        )}
      >
        {indeterminate ? (
          <span
            className={cx(
              "absolute inset-y-0 left-0 w-1/3 animate-progress-indeterminate rounded-full",
              barColor,
              classNames?.bar
            )}
          />
        ) : (
          <span
            className={cx(
              "block h-full rounded-full transition-[width] duration-300 ease-out",
              barColor,
              striped && STRIPE_CLASSES,
              classNames?.bar
            )}
            style={{ width: `${pct}%` }}
          />
        )}
      </div>
      {showLabel && !indeterminate && (
        <div className={cx("mt-1 text-right text-xs text-slate-500", classNames?.label)}>{Math.round(pct)}%</div>
      )}
    </div>
  );
}
