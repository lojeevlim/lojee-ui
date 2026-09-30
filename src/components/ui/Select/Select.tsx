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
  /** The choices to render as `<option>`s; each has a `label`, a `value` and an optional `disabled` flag. */
  options: SelectOption[];
  /** Hidden, disabled prompt option shown while nothing is selected; also makes the select start with no selection. */
  placeholder?: string;
  /** Control height and text size: "sm", "md" (default) or "lg". */
  size?: SelectSize;
  /** Marks the field as invalid with a rose border/focus ring (default: false). */
  invalid?: boolean;
  /** Extra CSS class(es) added to the root element, merged before `classNames.root`. */
  className?: string;
  /** Per-part class overrides — merged after (and win over) the built-in styling. */
  classNames?: { root?: string; select?: string; icon?: string };
}

const SIZE_CLASSES: Record<SelectSize, string> = {
  sm: "h-8 pl-2.5 text-sm",
  md: "h-10 pl-3 text-sm",
  lg: "h-12 pl-4 text-base",
};

const ICON_PX: Record<SelectSize, number> = { sm: 14, md: 16, lg: 18 };

const BASE_CLASSES =
  "w-full appearance-none rounded-md border border-border-strong bg-surface pr-9 text-fg outline-none transition-colors focus:border-fg-subtle focus:ring-2 focus:ring-fg-subtle/20 disabled:cursor-not-allowed disabled:opacity-50";

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
        className={cx("pointer-events-none absolute right-3 text-fg-subtle", classNames?.icon)}
      />
    </span>
  );
}
