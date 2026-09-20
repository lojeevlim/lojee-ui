import type { InputHTMLAttributes } from "react";
import { cx } from "../../../core/tokens";
import { Icon } from "../Icons/Icon";

export type DatePickerSize = "sm" | "md" | "lg";
export type DatePickerVariant = "outline" | "filled" | "underline";

export interface DatePickerProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  size?: DatePickerSize;
  variant?: DatePickerVariant;
  invalid?: boolean;
  /** Shows a clear (×) button when `value` is set — only meaningful for controlled usage. */
  onClear?: () => void;
  className?: string;
  classNames?: { root?: string; input?: string; icon?: string; clearButton?: string };
}

const SIZE_CLASSES: Record<DatePickerSize, string> = {
  sm: "h-8 pl-9 pr-2.5 text-sm",
  md: "h-10 pl-9 pr-3 text-sm",
  lg: "h-12 pl-9 pr-4 text-base",
};

const ICON_PX: Record<DatePickerSize, number> = { sm: 14, md: 16, lg: 18 };

const VARIANT_CLASSES: Record<DatePickerVariant, string> = {
  outline: "rounded-md border border-slate-300 bg-white focus-within:border-slate-500 focus-within:ring-2 focus-within:ring-slate-500/20",
  filled: "rounded-md border border-transparent bg-slate-100 focus-within:border-slate-300 focus-within:bg-white focus-within:ring-2 focus-within:ring-slate-500/20",
  underline: "rounded-none border-b-2 border-slate-300 bg-transparent focus-within:border-slate-900",
};

const INVALID_CLASSES = "border-rose-400 focus-within:border-rose-500 focus-within:ring-rose-500/20";

export function DatePicker({
  size = "md",
  variant = "outline",
  invalid = false,
  onClear,
  className,
  classNames,
  ...rest
}: DatePickerProps) {
  const showClear = !!rest.value && !!onClear;
  return (
    <span
      className={cx(
        "group relative inline-flex w-full items-center text-slate-900 outline-none transition-colors",
        VARIANT_CLASSES[variant],
        invalid && INVALID_CLASSES,
        className,
        classNames?.root
      )}
    >
      <Icon
        name="calendar"
        size={ICON_PX[size]}
        className={cx(
          "pointer-events-none absolute left-3 text-slate-400 transition-colors group-focus-within:text-slate-600",
          classNames?.icon
        )}
      />
      <input
        type="date"
        className={cx(
          "w-full bg-transparent outline-none disabled:cursor-not-allowed disabled:opacity-50",
          SIZE_CLASSES[size],
          showClear && "pr-8",
          classNames?.input
        )}
        {...rest}
      />
      {showClear && (
        <button
          type="button"
          onClick={onClear}
          aria-label="Clear date"
          className={cx(
            "absolute right-2.5 rounded p-0.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600",
            classNames?.clearButton
          )}
        >
          <Icon name="x" size={ICON_PX[size] - 2} />
        </button>
      )}
    </span>
  );
}
