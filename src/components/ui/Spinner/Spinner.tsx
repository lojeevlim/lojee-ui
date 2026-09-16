import { Loader2 } from "lucide-react";
import { cx, type ColorName } from "../../../core/tokens";

export type SpinnerSize = "xs" | "sm" | "md" | "lg" | "xl";
export type SpinnerVariant = "circle" | "dots";

export interface SpinnerProps {
  size?: SpinnerSize;
  color?: ColorName;
  variant?: SpinnerVariant;
  className?: string;
  /** Accessible label for screen readers (spinners carry no visible text). */
  label?: string;
}

const CIRCLE_PX: Record<SpinnerSize, number> = { xs: 14, sm: 16, md: 20, lg: 28, xl: 36 };

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

export function Spinner({ size = "md", color = "slate", variant = "circle", className, label }: SpinnerProps) {
  if (variant === "dots") {
    return (
      <span
        className={cx("inline-flex items-center", DOT_GAP[size], className)}
        role={label ? "status" : undefined}
        aria-label={label}
      >
        <span className={cx("animate-bounce rounded-full [animation-delay:-0.3s]", DOT_SIZE[size], BG_COLOR[color] || BG_COLOR.slate)} />
        <span className={cx("animate-bounce rounded-full [animation-delay:-0.15s]", DOT_SIZE[size], BG_COLOR[color] || BG_COLOR.slate)} />
        <span className={cx("animate-bounce rounded-full", DOT_SIZE[size], BG_COLOR[color] || BG_COLOR.slate)} />
      </span>
    );
  }

  return (
    <Loader2
      size={CIRCLE_PX[size]}
      className={cx("animate-spin", TEXT_COLOR[color] || TEXT_COLOR.slate, className)}
      role={label ? "status" : undefined}
      aria-label={label}
    />
  );
}
