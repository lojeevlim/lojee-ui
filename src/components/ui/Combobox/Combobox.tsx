import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { cx } from "../../../core/tokens";
import { Icon } from "../Icons/Icon";
import { motionClass, motionState, motionStyle, DEFAULT_TRANSITION_MS, type TransitionVariant, type HoverEffect } from "../../../core/motion";
import { usePresence } from "../../../core/usePresence";

export interface ComboboxOption {
  label: string;
  value: string;
}

export interface ComboboxProps {
  /** The selectable options; typing in the input filters them by case-insensitive label match. */
  options: ComboboxOption[];
  /** Controlled selected value. */
  value?: string;
  /** Called with the chosen option's `value` when the user selects an option by click or Enter. */
  onChange?: (value: string) => void;
  /** Placeholder text shown in the input while it is empty. */
  placeholder?: string;
  /** Enter/exit transition for the dropdown panel: "fade" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "zoom" | "zoom-out" | "flip" | "blur" | "bounce" | "rotate" | "drop" | "skew" (default: none). Respects `prefers-reduced-motion`. */
  transition?: TransitionVariant;
  /** Enter/exit transition duration for the dropdown panel in ms (default: 450). */
  transitionDuration?: number;
  /** Delay before the dropdown panel's enter transition starts, in ms (default: 0). */
  transitionDelay?: number;
  /** Effect while hovering the field: "lift" | "scale" | "press" | "tilt" | "ring" | "glow" | "shine" (default: none). */
  hoverEffect?: HoverEffect;
  /** Extra class names applied to the root element. */
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

export function Combobox({
  options,
  value,
  onChange,
  placeholder,
  transition,
  transitionDuration,
  transitionDelay,
  hoverEffect,
  className,
  classNames,
}: ComboboxProps) {
  const [inputValue, setInputValue] = useState(() => options.find((o) => o.value === value)?.label ?? "");
  const [open, setOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  // With a `transition` the panel stays mounted for the exit; without one it unmounts immediately, as before.
  const { mounted } = usePresence(open, transition ? (transitionDuration ?? DEFAULT_TRANSITION_MS) + (transitionDelay ?? 0) : 0);

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
      // composedPath, not contains(e.target): from a document listener a click inside a web component's shadow root is
      // retargeted to the host element, which would look like an outside click.
      if (rootRef.current && !e.composedPath().includes(rootRef.current)) setOpen(false);
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
      <span className={cx("relative flex w-full items-center rounded-md", motionClass(undefined, hoverEffect))}>
        <Icon name="search" size={16} className="pointer-events-none absolute left-3 text-fg-subtle" />
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
            "w-full rounded-md border border-border-strong bg-surface py-2 pl-9 pr-3 text-sm text-fg placeholder:text-fg-subtle outline-none transition-colors focus:border-slate-500 focus:ring-2 focus:ring-slate-500/20",
            classNames?.input
          )}
        />
      </span>

      {mounted && (
        <div
          role="listbox"
          className={cx(
            "absolute z-10 mt-1 w-full max-h-60 overflow-y-auto rounded-lg border border-border bg-surface py-1 shadow-lg",
            motionClass(transition),
            classNames?.menu
          )}
          style={motionStyle(transitionDuration, transitionDelay)}
          {...motionState(open)}
        >
          {filtered.length === 0 && <div className="px-3 py-1.5 text-sm text-fg-subtle">No results</div>}
          {filtered.map((o, i) => (
            <button
              key={o.value}
              type="button"
              role="option"
              aria-selected={o.value === value}
              onMouseEnter={() => setHighlightedIndex(i)}
              onClick={() => selectOption(o)}
              className={cx(
                "flex w-full items-center gap-2 px-3 py-1.5 text-left text-sm text-fg-muted",
                i === safeHighlighted && "bg-surface-muted",
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
