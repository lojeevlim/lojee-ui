import { useEffect, useRef, useState } from "react";
import { cx, type ColorName } from "../../../core/tokens";
import { Icon } from "../Icons/Icon";

export interface MultiSelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface MultiSelectProps {
  /** The selectable options; each has a display `label`, a unique `value`, and an optional `disabled` flag. */
  options: MultiSelectOption[];
  /** Controlled — array of selected `value`s. */
  value: string[];
  /** Called with the new array of selected `value`s whenever an option is toggled or a chip's remove button is clicked; the consumer must store it back into `value`. */
  onChange?: (value: string[]) => void;
  /** Shown in the trigger when `value` is empty. */
  placeholder?: string;
  /** Chip background / selected-option accent color (default: accent — follows the theme). */
  color?: ColorName;
  /** Extra CSS class(es) added to the root element, merged before `classNames.root`. */
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
  slate: "bg-surface-muted text-fg-muted",
  gray: "bg-surface-muted text-fg-muted",
  indigo: "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300",
  accent: "bg-accent-100 text-accent-700 dark:bg-accent-500/20 dark:text-accent-300",
  violet: "bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-300",
  blue: "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300",
  cyan: "bg-cyan-100 text-cyan-700 dark:bg-cyan-500/20 dark:text-cyan-300",
  emerald: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300",
  teal: "bg-teal-100 text-teal-700 dark:bg-teal-500/20 dark:text-teal-300",
  amber: "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300",
  orange: "bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-300",
  rose: "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300",
  pink: "bg-pink-100 text-pink-700 dark:bg-pink-500/20 dark:text-pink-300",
};

const OPTION_ACCENT_CLASSES: Record<ColorName, string> = {
  slate: "text-fg",
  gray: "text-fg-muted",
  indigo: "text-indigo-700 dark:text-indigo-300",
  accent: "text-accent-700 dark:text-accent-300",
  violet: "text-violet-700 dark:text-violet-300",
  blue: "text-blue-700 dark:text-blue-300",
  cyan: "text-cyan-700 dark:text-cyan-300",
  emerald: "text-emerald-700 dark:text-emerald-300",
  teal: "text-teal-700 dark:text-teal-300",
  amber: "text-amber-700 dark:text-amber-300",
  orange: "text-orange-700 dark:text-orange-300",
  rose: "text-rose-700 dark:text-rose-300",
  pink: "text-pink-700 dark:text-pink-300",
};

export function MultiSelect({
  options,
  value,
  onChange,
  placeholder = "Select...",
  color = "accent",
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
          "flex min-h-10 w-full cursor-pointer flex-wrap items-center gap-1.5 rounded-md border border-border-strong px-2 py-1.5 text-left outline-none transition-colors focus:border-fg-subtle focus:ring-2 focus:ring-fg-subtle/20",
          classNames?.trigger
        )}
      >
        {selectedOptions.length === 0 && <span className="text-sm text-fg-subtle">{placeholder}</span>}
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
        <Icon name="chevron-down" size={16} className="ml-auto shrink-0 text-fg-subtle" />
      </div>

      {open && (
        <div
          role="listbox"
          aria-multiselectable="true"
          className={cx(
            "absolute z-10 mt-1 w-full max-h-60 overflow-y-auto rounded-lg border border-border bg-surface py-1 shadow-lg",
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
                  "flex w-full items-center gap-2 px-3 py-1.5 text-left text-sm text-fg-muted hover:bg-surface-muted disabled:cursor-not-allowed disabled:opacity-40",
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
