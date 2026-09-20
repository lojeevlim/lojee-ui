import { useState } from "react";
import type { InputHTMLAttributes } from "react";
import { cx } from "../../../core/tokens";
import { Icon } from "../Icons/Icon";

export type PasswordInputSize = "sm" | "md" | "lg";

export interface PasswordInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  size?: PasswordInputSize;
  invalid?: boolean;
  className?: string;
  /** Per-part class overrides — merged after (and win over) the built-in styling. */
  classNames?: { root?: string; input?: string; toggleButton?: string };
}

const SIZE_CLASSES: Record<PasswordInputSize, string> = {
  sm: "h-8 px-2.5 text-sm",
  md: "h-10 px-3 text-sm",
  lg: "h-12 px-4 text-base",
};

const ICON_PX: Record<PasswordInputSize, number> = { sm: 14, md: 16, lg: 18 };

const BASE_CLASSES =
  "w-full rounded-md border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 outline-none transition-colors focus:border-slate-500 focus:ring-2 focus:ring-slate-500/20 disabled:cursor-not-allowed disabled:opacity-50";

const INVALID_CLASSES = "border-rose-400 focus:border-rose-500 focus:ring-rose-500/20";

// A plain `Input` with `trailingIcon` isn't enough here — that icon is
// decorative (`pointer-events-none`), but this needs a real clickable
// toggle, so it's its own component with the same visual base as
// Input/SearchInput/DatePicker rather than a variant of Input.
export function PasswordInput({ size = "md", invalid = false, className, classNames, ...rest }: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <span className={cx("relative inline-flex w-full items-center", className, classNames?.root)}>
      <input
        type={visible ? "text" : "password"}
        aria-invalid={invalid || undefined}
        className={cx(
          BASE_CLASSES,
          SIZE_CLASSES[size],
          "pr-9",
          invalid && INVALID_CLASSES,
          classNames?.input
        )}
        {...rest}
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? "Hide password" : "Show password"}
        aria-pressed={visible}
        className={cx(
          "pointer-events-auto absolute right-3 text-slate-400 transition-colors hover:text-slate-600",
          classNames?.toggleButton
        )}
      >
        <Icon name={visible ? "eye-off" : "eye"} size={ICON_PX[size]} />
      </button>
    </span>
  );
}
