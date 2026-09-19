import type { SelectHTMLAttributes } from "react";
import { cx } from "../../../core/tokens";
import { Icon } from "../Icons/Icon";

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export type SelectSize = "sm" | "md" | "lg";

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  options: SelectOption[];
  placeholder?: string;
  size?: SelectSize;
  invalid?: boolean;
  className?: string;
  classNames?: { root?: string; select?: string; icon?: string };
}

const SIZE_CLASSES: Record<SelectSize, string> = {
  sm: "h-8 pl-2.5 text-sm",
  md: "h-10 pl-3 text-sm",
  lg: "h-12 pl-4 text-base",
};

const ICON_PX: Record<SelectSize, number> = { sm: 14, md: 16, lg: 18 };

const BASE_CLASSES =
  "w-full appearance-none rounded-md border border-slate-300 bg-white pr-9 text-slate-900 outline-none transition-colors focus:border-slate-500 focus:ring-2 focus:ring-slate-500/20 disabled:cursor-not-allowed disabled:opacity-50";

const INVALID_CLASSES = "border-rose-400 focus:border-rose-500 focus:ring-rose-500/20";

export function Select({
  options,
  placeholder,
  size = "md",
  invalid = false,
  className,
  classNames,
  ...rest
}: SelectProps) {
  return (
    <span className={cx("relative inline-flex w-full items-center", className, classNames?.root)}>
      <select
        className={cx(BASE_CLASSES, SIZE_CLASSES[size], invalid && INVALID_CLASSES, classNames?.select)}
        defaultValue={placeholder ? "" : undefined}
        {...rest}
      >
        {placeholder && (
          <option value="" disabled hidden>
            {placeholder}
          </option>
        )}
        {options.map((o) => (
          <option key={o.value} value={o.value} disabled={o.disabled}>
            {o.label}
          </option>
        ))}
      </select>
      <Icon
        name="chevron-down"
        size={ICON_PX[size]}
        className={cx("pointer-events-none absolute right-3 text-slate-400", classNames?.icon)}
      />
    </span>
  );
}
