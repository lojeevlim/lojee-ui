import { useEffect, useRef, useState } from "react";
import { cx, type ColorName } from "../../../core/tokens";
import { Icon } from "../Icons/Icon";

export interface MultiSelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface MultiSelectProps {
  options: MultiSelectOption[];
  /** Controlled — array of selected `value`s. */
  value: string[];
  onChange?: (value: string[]) => void;
  /** Shown in the trigger when `value` is empty. */
  placeholder?: string;
  /** Chip background / selected-option accent color (default: slate). */
  color?: ColorName;
  className?: string;
  /** Per-part class overrides — merged after (and win over) the built-in styling. */
  classNames?: {
    root?: string;
    trigger?: string;
    tag?: string;
    menu?: string;
    option?: string;
  };
}

const CHIP_CLASSES: Record<ColorName, string> = {
  slate: "bg-slate-100 text-slate-700",
  gray: "bg-gray-100 text-gray-700",
  indigo: "bg-indigo-100 text-indigo-700",
  violet: "bg-violet-100 text-violet-700",
  blue: "bg-blue-100 text-blue-700",
  cyan: "bg-cyan-100 text-cyan-700",
  emerald: "bg-emerald-100 text-emerald-700",
  teal: "bg-teal-100 text-teal-700",
  amber: "bg-amber-100 text-amber-700",
  orange: "bg-orange-100 text-orange-700",
  rose: "bg-rose-100 text-rose-700",
  pink: "bg-pink-100 text-pink-700",
};

const OPTION_ACCENT_CLASSES: Record<ColorName, string> = {
  slate: "text-slate-900",
  gray: "text-gray-700",
  indigo: "text-indigo-700",
  violet: "text-violet-700",
  blue: "text-blue-700",
  cyan: "text-cyan-700",
  emerald: "text-emerald-700",
  teal: "text-teal-700",
  amber: "text-amber-700",
  orange: "text-orange-700",
  rose: "text-rose-700",
  pink: "text-pink-700",
};

export function MultiSelect({
  options,
  value,
  onChange,
  placeholder = "Select...",
  color = "slate",
  className,
  classNames,
}: MultiSelectProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handlePointerDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  const toggle = (optionValue: string) => {
    if (value.includes(optionValue)) {
      onChange?.(value.filter((v) => v !== optionValue));
    } else {
      onChange?.([...value, optionValue]);
    }
  };

  const selectedOptions = options.filter((o) => value.includes(o.value));

  return (
    <div ref={rootRef} className={cx("relative w-full", className, classNames?.root)}>
      {/* A <div role="button"> rather than a real <button> — it contains the
          chips' own remove <button>s, and interactive elements can't nest. */}
      <div
        role="button"
        tabIndex={0}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen((v) => !v);
          }
        }}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={cx(
          "flex min-h-10 w-full cursor-pointer flex-wrap items-center gap-1.5 rounded-md border border-slate-300 px-2 py-1.5 text-left outline-none transition-colors focus:border-slate-500 focus:ring-2 focus:ring-slate-500/20",
          classNames?.trigger
        )}
      >
        {selectedOptions.length === 0 && <span className="text-sm text-slate-400">{placeholder}</span>}
        {selectedOptions.map((o) => (
          <span
            key={o.value}
            className={cx("inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-xs", CHIP_CLASSES[color], classNames?.tag)}
          >
            {o.label}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                toggle(o.value);
              }}
              aria-label={`Remove ${o.label}`}
              className="inline-flex"
            >
              <Icon name="x" size={12} />
            </button>
          </span>
        ))}
        <Icon name="chevron-down" size={16} className="ml-auto shrink-0 text-slate-400" />
      </div>

      {open && (
        <div
          role="listbox"
          aria-multiselectable="true"
          className={cx(
            "absolute z-10 mt-1 w-full max-h-60 overflow-y-auto rounded-lg border border-slate-200 bg-white py-1 shadow-lg",
            classNames?.menu
          )}
        >
          {options.map((o) => {
            const selected = value.includes(o.value);
            return (
              <button
                key={o.value}
                type="button"
                role="option"
                aria-selected={selected}
                disabled={o.disabled}
                onClick={() => toggle(o.value)}
                className={cx(
                  "flex w-full items-center gap-2 px-3 py-1.5 text-left text-sm text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40",
                  selected && OPTION_ACCENT_CLASSES[color],
                  classNames?.option
                )}
              >
                <span className="flex h-4 w-4 shrink-0 items-center justify-center">
                  {selected && <Icon name="check" size={14} />}
                </span>
                {o.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
