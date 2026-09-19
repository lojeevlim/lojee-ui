import { Loader2 } from "lucide-react";
import { cx, type ColorName } from "../../../core/tokens";

export type SpinnerSize = "xs" | "sm" | "md" | "lg" | "xl";
export type SpinnerVariant = "circle" | "dots" | "ring" | "bars" | "pulse";

export interface SpinnerProps {
  size?: SpinnerSize;
  color?: ColorName;
  variant?: SpinnerVariant;
  className?: string;
  /** Accessible label for screen readers (spinners carry no visible text). */
  label?: string;
  /** Per-part class overrides — merged after (and win over) the built-in styling. */
  classNames?: {
    root?: string;
    /** Each dot, for the "dots" variant. */
    dot?: string;
    /** Each bar, for the "bars" variant. */
    bar?: string;
  };
}

const CIRCLE_PX: Record<SpinnerSize, number> = { xs: 14, sm: 16, md: 20, lg: 28, xl: 36 };

const PULSE_PX: Record<SpinnerSize, number> = { xs: 10, sm: 12, md: 14, lg: 18, xl: 22 };

const DOT_SIZE: Record<SpinnerSize, string> = {
  xs: "h-1 w-1",
  sm: "h-1.5 w-1.5",
  md: "h-2 w-2",
  lg: "h-2.5 w-2.5",
  xl: "h-3 w-3",
};

const DOT_GAP: Record<SpinnerSize, string> = {
  xs: "gap-0.5",
  sm: "gap-1",
  md: "gap-1",
  lg: "gap-1.5",
  xl: "gap-2",
};

const BAR_SIZE: Record<SpinnerSize, string> = {
  xs: "w-0.5 h-2.5",
  sm: "w-0.5 h-3.5",
  md: "w-1 h-4",
  lg: "w-1 h-5",
  xl: "w-1.5 h-7",
};

const RING_BORDER_WIDTH: Record<SpinnerSize, string> = {
  xs: "border-2",
  sm: "border-2",
  md: "border-[3px]",
  lg: "border-4",
  xl: "border-4",
};

const TEXT_COLOR: Record<ColorName, string> = {
  slate: "text-slate-600",
  gray: "text-gray-600",
  indigo: "text-indigo-600",
  violet: "text-violet-600",
  blue: "text-blue-600",
  cyan: "text-cyan-600",
  emerald: "text-emerald-600",
  teal: "text-teal-600",
  amber: "text-amber-500",
  orange: "text-orange-600",
  rose: "text-rose-600",
  pink: "text-pink-600",
};

const BG_COLOR: Record<ColorName, string> = {
  slate: "bg-slate-600",
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

// The spinning arc on top of the "ring" variant's static gray track.
const RING_TOP_COLOR: Record<ColorName, string> = {
  slate: "border-t-slate-600",
  gray: "border-t-gray-600",
  indigo: "border-t-indigo-600",
  violet: "border-t-violet-600",
  blue: "border-t-blue-600",
  cyan: "border-t-cyan-600",
  emerald: "border-t-emerald-600",
  teal: "border-t-teal-600",
  amber: "border-t-amber-500",
  orange: "border-t-orange-600",
  rose: "border-t-rose-600",
  pink: "border-t-pink-600",
};

export function Spinner({ size = "md", color = "slate", variant = "circle", className, classNames, label }: SpinnerProps) {
  if (variant === "dots") {
    return (
      <span
        className={cx("inline-flex items-center", DOT_GAP[size], className, classNames?.root)}
        role={label ? "status" : undefined}
        aria-label={label}
      >
        <span className={cx("animate-bounce rounded-full [animation-delay:-0.3s]", DOT_SIZE[size], BG_COLOR[color] || BG_COLOR.slate, classNames?.dot)} />
        <span className={cx("animate-bounce rounded-full [animation-delay:-0.15s]", DOT_SIZE[size], BG_COLOR[color] || BG_COLOR.slate, classNames?.dot)} />
        <span className={cx("animate-bounce rounded-full", DOT_SIZE[size], BG_COLOR[color] || BG_COLOR.slate, classNames?.dot)} />
      </span>
    );
  }

  if (variant === "bars") {
    return (
      <span
        className={cx("inline-flex items-end", DOT_GAP[size], className, classNames?.root)}
        role={label ? "status" : undefined}
        aria-label={label}
      >
        <span className={cx("animate-bounce rounded-sm [animation-delay:-0.3s]", BAR_SIZE[size], BG_COLOR[color] || BG_COLOR.slate, classNames?.bar)} />
        <span className={cx("animate-bounce rounded-sm [animation-delay:-0.15s]", BAR_SIZE[size], BG_COLOR[color] || BG_COLOR.slate, classNames?.bar)} />
        <span className={cx("animate-bounce rounded-sm", BAR_SIZE[size], BG_COLOR[color] || BG_COLOR.slate, classNames?.bar)} />
      </span>
    );
  }

  if (variant === "ring") {
    const px = CIRCLE_PX[size];
    return (
      <span
        className={cx(
          "inline-block animate-spin rounded-full border-slate-200",
          RING_BORDER_WIDTH[size],
          RING_TOP_COLOR[color] || RING_TOP_COLOR.slate,
          className,
          classNames?.root
        )}
        style={{ width: px, height: px }}
        role={label ? "status" : undefined}
        aria-label={label}
      />
    );
  }

  if (variant === "pulse") {
    const px = PULSE_PX[size];
    return (
      <span
        className={cx("relative inline-flex", className, classNames?.root)}
        style={{ width: px, height: px }}
        role={label ? "status" : undefined}
        aria-label={label}
      >
        <span className={cx("absolute h-full w-full animate-ping rounded-full opacity-75", BG_COLOR[color] || BG_COLOR.slate)} />
        <span className={cx("relative h-full w-full rounded-full", BG_COLOR[color] || BG_COLOR.slate)} />
      </span>
    );
  }

  return (
    <Loader2
      size={CIRCLE_PX[size]}
      className={cx("animate-spin", TEXT_COLOR[color] || TEXT_COLOR.slate, className, classNames?.root)}
      role={label ? "status" : undefined}
      aria-label={label}
    />
  );
}
