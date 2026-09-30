import type { InputHTMLAttributes } from "react";
import { cx } from "../../../core/tokens";
import { Icon } from "../Icons/Icon";

export type TimePickerSize = "sm" | "md" | "lg";

export interface TimePickerProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  /** Input height/text size: "sm", "md" or "lg" (default: "md"). */
  size?: TimePickerSize;
  /** Applies error styling (rose border and focus ring) to flag invalid input (default: false). */
  invalid?: boolean;
  /** Extra class name(s) appended to the root element. */
  className?: string;
  /** Per-part class overrides — merged after (and win over) the built-in styling. */
  classNames?: { root?: string; input?: string; icon?: string };
}

const SIZE_CLASSES: Record<TimePickerSize, string> = {
  sm: "h-8 pl-9 pr-2.5 text-sm",
  md: "h-10 pl-9 pr-3 text-sm",
  lg: "h-12 pl-9 pr-4 text-base",
};

const ICON_PX: Record<TimePickerSize, number> = { sm: 14, md: 16, lg: 18 };

const BASE_CLASSES =
  "w-full rounded-md border border-border-strong bg-surface text-fg outline-none transition-colors focus:border-fg-subtle focus:ring-2 focus:ring-fg-subtle/20 disabled:cursor-not-allowed disabled:opacity-50";

const INVALID_CLASSES = "border-rose-400 focus:border-rose-500 focus:ring-rose-500/20";

export function TimePicker({ size = "md", invalid = false, className, classNames, ...rest }: TimePickerProps) {
  return (
    <span className={cx("relative inline-flex w-full items-center", className, classNames?.root)}>
      <Icon
        name="clock"
        size={ICON_PX[size]}
        className={cx("pointer-events-none absolute left-3 text-fg-subtle", classNames?.icon)}
      />
      <input
        type="time"
        className={cx(BASE_CLASSES, SIZE_CLASSES[size], invalid && INVALID_CLASSES, classNames?.input)}
        {...rest}
      />
    </span>
  );
}
