import type { InputHTMLAttributes } from "react";
import { cx } from "../../../core/tokens";
import { Icon } from "../Icons/Icon";

export type SearchInputSize = "sm" | "md" | "lg";

export interface SearchInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  size?: SearchInputSize;
  /** Called when the clear (x) button is clicked — only rendered when `value` is truthy and this is provided. */
  onClear?: () => void;
  className?: string;
  /** Per-part class overrides — merged after (and win over) the built-in styling. */
  classNames?: { root?: string; input?: string; icon?: string; clearButton?: string };
}

const SIZE_CLASSES: Record<SearchInputSize, string> = {
  sm: "h-8 px-2.5 text-sm",
  md: "h-10 px-3 text-sm",
  lg: "h-12 px-4 text-base",
};

const ICON_PX: Record<SearchInputSize, number> = { sm: 14, md: 16, lg: 18 };

const BASE_CLASSES =
  "w-full rounded-md border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 outline-none transition-colors focus:border-slate-500 focus:ring-2 focus:ring-slate-500/20 disabled:cursor-not-allowed disabled:opacity-50";

export function SearchInput({ size = "md", onClear, value, className, classNames, ...rest }: SearchInputProps) {
  const showClear = Boolean(value) && Boolean(onClear);

  return (
    <span className={cx("relative inline-flex w-full items-center", className, classNames?.root)}>
      <Icon
        name="search"
        size={ICON_PX[size]}
        className={cx("pointer-events-none absolute left-3 text-slate-400", classNames?.icon)}
      />
      <input
        type="text"
        value={value}
        className={cx(BASE_CLASSES, SIZE_CLASSES[size], "pl-9", showClear && "pr-9", classNames?.input)}
        {...rest}
      />
      {showClear && (
        <button
          type="button"
          onClick={onClear}
          aria-label="Clear search"
          className={cx("pointer-events-auto absolute right-3 text-slate-400 hover:text-slate-600", classNames?.clearButton)}
        >
          <Icon name="x" size={14} />
        </button>
      )}
    </span>
  );
}
