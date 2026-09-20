import type { InputHTMLAttributes, ReactNode } from "react";
import { cx, type ColorName } from "../../../core/tokens";
import { getIcon } from "../../../core/icons";

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  label?: ReactNode;
  /** Checked background color (default: slate). */
  color?: ColorName;
  className?: string;
  /** Per-part class overrides — merged after (and win over) the built-in styling. */
  classNames?: {
    root?: string;
    box?: string;
    label?: string;
  };
}

const CHECKED_BG: Record<ColorName, string> = {
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

export function Checkbox({ label, color = "slate", className, classNames, ...rest }: CheckboxProps) {
  // getIcon() always returns the same stable, module-level-imported
  // component reference for a given name, so this never actually causes a
  // remount — the lint rule can't verify that statically, hence the disable.
  const CheckIcon = getIcon("check");
  return (
    <label
      className={cx(
        "inline-flex items-center gap-2 text-sm text-slate-700",
        rest.disabled && "opacity-40 pointer-events-none",
        className,
        classNames?.root
      )}
    >
      <span className="relative inline-flex h-4 w-4 shrink-0">
        {/* The box and icon below are direct siblings of the input (not
            nested inside one another) so Tailwind's `peer-checked:` sibling
            selector — which only matches siblings sharing the input's own
            parent — reaches both of them. */}
        <input type="checkbox" className="peer sr-only" {...rest} />
        <span
          className={cx(
            "absolute inset-0 rounded border border-slate-300 bg-white transition-colors peer-checked:border-transparent peer-focus-visible:ring-2 peer-focus-visible:ring-slate-500/30",
            CHECKED_BG[color],
            classNames?.box
          )}
        />
        {/* eslint-disable-next-line react-hooks/static-components -- see comment above `const CheckIcon` */}
        {CheckIcon && <CheckIcon size={12} className="absolute inset-0 m-auto text-white opacity-0 transition-opacity peer-checked:opacity-100" />}
      </span>
      {label && <span className={classNames?.label}>{label}</span>}
    </label>
  );
}
