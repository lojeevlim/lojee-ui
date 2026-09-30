import type { InputHTMLAttributes, ReactNode } from "react";
import { cx, type ColorName } from "../../../core/tokens";

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  /** Text or node rendered beside the radio; omit for a bare radio. */
  label?: ReactNode;
  /** Selected dot/border color (default: accent — follows the theme). */
  color?: ColorName;
  /** Extra CSS class(es) added to the wrapping `<label>`, merged before `classNames.root`. */
  className?: string;
  /** Per-part class overrides — merged after (and win over) the built-in styling. */
  classNames?: {
    root?: string;
    dot?: string;
    label?: string;
  };
}

const BORDER: Record<ColorName, string> = {
  slate: "peer-checked:border-slate-900 dark:peer-checked:border-slate-200",
  gray: "peer-checked:border-gray-600",
  indigo: "peer-checked:border-indigo-600",
  accent: "peer-checked:border-accent-600",
  violet: "peer-checked:border-violet-600",
  blue: "peer-checked:border-blue-600",
  cyan: "peer-checked:border-cyan-600",
  emerald: "peer-checked:border-emerald-600",
  teal: "peer-checked:border-teal-600",
  amber: "peer-checked:border-amber-500",
  orange: "peer-checked:border-orange-600",
  rose: "peer-checked:border-rose-600",
  pink: "peer-checked:border-pink-600",
};

const FILL: Record<ColorName, string> = {
  slate: "bg-slate-900 dark:bg-slate-200",
  gray: "bg-gray-600",
  indigo: "bg-indigo-600",
  accent: "bg-accent-600",
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

export function Radio({ label, color = "accent", className, classNames, ...rest }: RadioProps) {
  return (
    <label
      className={cx(
        "inline-flex items-center gap-2 text-sm text-fg-muted",
        rest.disabled && "opacity-40 pointer-events-none",
        className,
        classNames?.root
      )}
    >
      <span className="relative inline-flex h-4 w-4 shrink-0">
        {/* Native radios sharing the same `name` (passed via ...rest, part of
            InputHTMLAttributes) are made mutually exclusive by the browser
            itself — no React state/coordination needed here. The ring and
            dot below are direct siblings of the input (not nested inside one
            another) so Tailwind's `peer-checked:` sibling selector — which
            only matches siblings sharing the input's own parent — reaches
            both of them. */}
        <input type="radio" className="peer sr-only" {...rest} />
        <span
          className={cx(
            "absolute inset-0 rounded-full border border-border-strong transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-fg-subtle/30",
            BORDER[color]
          )}
        />
        <span
          className={cx(
            "absolute inset-0 m-auto h-2 w-2 rounded-full opacity-0 transition-opacity peer-checked:opacity-100",
            FILL[color],
            classNames?.dot
          )}
        />
      </span>
      {label && <span className={classNames?.label}>{label}</span>}
    </label>
  );
}
