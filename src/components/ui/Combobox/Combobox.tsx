import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { cx } from "../../../core/tokens";
import { Icon } from "../Icons/Icon";

export interface ComboboxOption {
  label: string;
  value: string;
}

export interface ComboboxProps {
  options: ComboboxOption[];
  /** Controlled selected value. */
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  /** Per-part class overrides — merged after (and win over) the built-in styling. */
  classNames?: {
    root?: string;
    input?: string;
    menu?: string;
    option?: string;
    activeOption?: string;
  };
}

export function Combobox({ options, value, onChange, placeholder, className, classNames }: ComboboxProps) {
  const [inputValue, setInputValue] = useState(() => options.find((o) => o.value === value)?.label ?? "");
  const [open, setOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);

  // Re-sync the visible text from `value` whenever it changes externally,
  // without reaching for an effect (React's recommended "adjusting state
  // during render" pattern — avoids the extra render an effect would cause).
  const [syncedValue, setSyncedValue] = useState(value);
  if (value !== syncedValue) {
    setSyncedValue(value);
    setInputValue(options.find((o) => o.value === value)?.label ?? "");
  }

  useEffect(() => {
    if (!open) return;
    const handlePointerDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const handleKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  const filtered = inputValue
    ? options.filter((o) => o.label.toLowerCase().includes(inputValue.toLowerCase()))
    : options;
  const safeHighlighted = filtered.length ? Math.min(highlightedIndex, filtered.length - 1) : 0;

  const selectOption = (option: ComboboxOption) => {
    onChange?.(option.value);
    setInputValue(option.label);
    setOpen(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setHighlightedIndex((i) => (filtered.length ? (Math.min(i, filtered.length - 1) + 1) % filtered.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setOpen(true);
      setHighlightedIndex((i) =>
        filtered.length ? (Math.min(i, filtered.length - 1) - 1 + filtered.length) % filtered.length : 0
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      const option = filtered[safeHighlighted];
      if (option) selectOption(option);
    }
  };

  return (
    <div ref={rootRef} className={cx("relative w-full", className, classNames?.root)}>
      <span className="relative flex w-full items-center">
        <Icon name="search" size={16} className="pointer-events-none absolute left-3 text-slate-400" />
        <input
          type="text"
          value={inputValue}
          placeholder={placeholder}
          onFocus={() => setOpen(true)}
          onChange={(e) => {
            setInputValue(e.target.value);
            setOpen(true);
            setHighlightedIndex(0);
          }}
          onKeyDown={handleKeyDown}
          className={cx(
            "w-full rounded-md border border-slate-300 bg-white py-2 pl-9 pr-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-colors focus:border-slate-500 focus:ring-2 focus:ring-slate-500/20",
            classNames?.input
          )}
        />
      </span>

      {open && (
        <div
          role="listbox"
          className={cx(
            "absolute z-10 mt-1 w-full max-h-60 overflow-y-auto rounded-lg border border-slate-200 bg-white py-1 shadow-lg",
            classNames?.menu
          )}
        >
          {filtered.length === 0 && <div className="px-3 py-1.5 text-sm text-slate-400">No results</div>}
          {filtered.map((o, i) => (
            <button
              key={o.value}
              type="button"
              role="option"
              aria-selected={o.value === value}
              onMouseEnter={() => setHighlightedIndex(i)}
              onClick={() => selectOption(o)}
              className={cx(
                "flex w-full items-center gap-2 px-3 py-1.5 text-left text-sm text-slate-700",
                i === safeHighlighted && "bg-slate-100",
                i === safeHighlighted && classNames?.activeOption,
                classNames?.option
              )}
            >
              <span className="flex h-4 w-4 shrink-0 items-center justify-center">
                {o.value === value && <Icon name="check" size={14} />}
              </span>
              {o.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
