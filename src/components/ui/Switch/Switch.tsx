import type { InputHTMLAttributes, ReactNode } from "react";
import { cx, type ColorName } from "../../../core/tokens";

export type SwitchSize = "sm" | "md" | "lg";

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  label?: ReactNode;
  size?: SwitchSize;
  /** "On" track color (default: slate). */
  color?: ColorName;
  className?: string;
  /** Per-part class overrides — merged after (and win over) the built-in styling. */
  classNames?: {
    root?: string;
    track?: string;
    thumb?: string;
    label?: string;
  };
}

const TRACK_SIZE: Record<SwitchSize, string> = {
  sm: "h-5 w-9",
  md: "h-6 w-11",
  lg: "h-7 w-13",
};

const THUMB_SIZE: Record<SwitchSize, string> = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
};

const ON_BG: Record<ColorName, string> = {
  slate: "peer-checked:bg-slate-900",
  gray: "peer-checked:bg-gray-600",
  indigo: "peer-checked:bg-indigo-600",
  violet: "peer-checked:bg-violet-600",
  blue: "peer-checked:bg-blue-600",
  cyan: "peer-checked:bg-cyan-600",
  emerald: "peer-checked:bg-emerald-600",
  teal: "peer-checked:bg-teal-600",
  amber: "peer-checked:bg-amber-500",
  orange: "peer-checked:bg-orange-600",
  rose: "peer-checked:bg-rose-600",
  pink: "peer-checked:bg-pink-600",
};

const RING: Record<ColorName, string> = {
  slate: "peer-focus-visible:ring-slate-500/30",
  gray: "peer-focus-visible:ring-gray-500/30",
  indigo: "peer-focus-visible:ring-indigo-500/30",
  violet: "peer-focus-visible:ring-violet-500/30",
  blue: "peer-focus-visible:ring-blue-500/30",
  cyan: "peer-focus-visible:ring-cyan-500/30",
  emerald: "peer-focus-visible:ring-emerald-500/30",
  teal: "peer-focus-visible:ring-teal-500/30",
  amber: "peer-focus-visible:ring-amber-500/30",
  orange: "peer-focus-visible:ring-orange-500/30",
  rose: "peer-focus-visible:ring-rose-500/30",
  pink: "peer-focus-visible:ring-pink-500/30",
};

export function Switch({ label, size = "md", color = "slate", className, classNames, ...rest }: SwitchProps) {
  return (
    <label
      className={cx(
        "inline-flex items-center gap-2 text-sm text-slate-700",
        rest.disabled && "opacity-40 pointer-events-none",
        className,
        classNames?.root
      )}
    >
      <span className={cx("relative inline-flex shrink-0", TRACK_SIZE[size])}>
        {/* The track and thumb below are direct siblings of the input (not
            nested inside one another) so Tailwind's `peer-checked:` sibling
            selector — which only matches siblings sharing the input's own
            parent — reaches both of them. */}
        <input type="checkbox" role="switch" className="peer sr-only" {...rest} />
        <span
          className={cx(
            "absolute inset-0 rounded-full bg-slate-200 transition-colors peer-focus-visible:ring-2",
            ON_BG[color],
            RING[color],
            classNames?.track
          )}
        />
        <span
          className={cx(
            "absolute top-0.5 left-0.5 rounded-full bg-white shadow transition-transform peer-checked:translate-x-full",
            THUMB_SIZE[size],
            classNames?.thumb
          )}
        />
      </span>
      {label && <span className={classNames?.label}>{label}</span>}
    </label>
  );
}
