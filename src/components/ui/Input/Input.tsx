import type { InputHTMLAttributes } from "react";
import { cx } from "../../../core/tokens";
import { Icon } from "../Icons/Icon";

export type InputSize = "sm" | "md" | "lg";

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: InputSize;
  invalid?: boolean;
  /** Icon name, e.g. "mail" — see src/core/icons.ts for the available set. */
  leadingIcon?: string;
  /** Icon name, e.g. "eye" — see src/core/icons.ts for the available set. */
  trailingIcon?: string;
  className?: string;
  /** Per-part class overrides — merged after (and win over) the built-in styling. */
  classNames?: { root?: string; input?: string; icon?: string };
}

const SIZE_CLASSES: Record<InputSize, string> = {
  sm: "h-8 px-2.5 text-sm",
  md: "h-10 px-3 text-sm",
  lg: "h-12 px-4 text-base",
};

const ICON_PX: Record<InputSize, number> = { sm: 14, md: 16, lg: 18 };

const BASE_CLASSES =
  "w-full rounded-md border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 outline-none transition-colors focus:border-slate-500 focus:ring-2 focus:ring-slate-500/20 disabled:cursor-not-allowed disabled:opacity-50";

const INVALID_CLASSES = "border-rose-400 focus:border-rose-500 focus:ring-rose-500/20";

export function Input({
  size = "md",
  invalid = false,
  leadingIcon,
  trailingIcon,
  className,
  classNames,
  ...rest
}: InputProps) {
  const inputClasses = cx(
    BASE_CLASSES,
    SIZE_CLASSES[size],
    invalid && INVALID_CLASSES,
    leadingIcon && "pl-9",
    trailingIcon && "pr-9"
  );

  if (!leadingIcon && !trailingIcon) {
    return (
      <input
        aria-invalid={invalid || undefined}
        className={cx(inputClasses, className, classNames?.root, classNames?.input)}
        {...rest}
      />
    );
  }

  return (
    <span className={cx("relative inline-flex w-full items-center", className, classNames?.root)}>
      {leadingIcon && (
        <Icon
          name={leadingIcon}
          size={ICON_PX[size]}
          className={cx("pointer-events-none absolute left-3 text-slate-400", classNames?.icon)}
        />
      )}
      <input aria-invalid={invalid || undefined} className={cx(inputClasses, classNames?.input)} {...rest} />
      {trailingIcon && (
        <Icon
          name={trailingIcon}
          size={ICON_PX[size]}
          className={cx("pointer-events-none absolute right-3 text-slate-400", classNames?.icon)}
        />
      )}
    </span>
  );
}
