import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { cx, isColorName, type ColorName } from "../../../core/tokens";
import { Icon } from "../Icons/Icon";
import { motionClass, motionState, motionStyle, DEFAULT_TRANSITION_MS, type TransitionVariant, type HoverEffect } from "../../../core/motion";
import { activeAccent } from "../../../core/activeVariant";
import { usePresence } from "../../../core/usePresence";

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
  /** Color of the selected chips, checks, selected-option highlight and focus ring: a named color or any CSS color string such as "#7c3aed" (default: "accent" — follows the theme accent). */
  color?: ColorName | (string & {});
  /** Enter/exit transition for the dropdown panel: "fade" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "zoom" | "zoom-out" | "flip" | "blur" | "bounce" | "rotate" | "drop" | "skew" (default: none). Respects `prefers-reduced-motion`. */
  transition?: TransitionVariant;
  /** Enter/exit transition duration for the dropdown panel in ms (default: 450). */
  transitionDuration?: number;
  /** Delay before the dropdown panel's enter transition starts, in ms (default: 0). */
  transitionDelay?: number;
  /** Effect while hovering the field: "lift" | "scale" | "press" | "tilt" | "ring" | "glow" | "shine" (default: none). */
  hoverEffect?: HoverEffect;
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

// Every color-dependent part reads `--ac` (set on the root from `color`): a named color's 600 shade, or the custom
// CSS color as-is. Tints are mixed in the browser, so any CSS color works and light / dark both stay readable.
const CHIP_STYLE: CSSProperties = {
  backgroundColor: "color-mix(in srgb, var(--ac) 16%, transparent)",
  color: "color-mix(in srgb, var(--ac) 72%, var(--lojee-fg))",
};
const OPTION_SELECTED_STYLE: CSSProperties = {
  backgroundColor: "color-mix(in srgb, var(--ac) 10%, transparent)",
  color: "color-mix(in srgb, var(--ac) 72%, var(--lojee-fg))",
};

export function MultiSelect({
  options,
  value,
  onChange,
  placeholder = "Select...",
  color = "accent",
  transition,
  transitionDuration,
  transitionDelay,
  hoverEffect,
  className,
  classNames,
}: MultiSelectProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  // With a `transition` the panel stays mounted for the exit; without one it unmounts immediately, as before.
  const { mounted } = usePresence(open, transition ? (transitionDuration ?? DEFAULT_TRANSITION_MS) + (transitionDelay ?? 0) : 0);

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
    <div
      ref={rootRef}
      className={cx("relative w-full", className, classNames?.root)}
      style={{ ["--ac" as string]: activeAccent(color, isColorName(color)) } as CSSProperties}
    >
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
          "flex min-h-10 w-full cursor-pointer flex-wrap items-center gap-1.5 rounded-md border border-border-strong px-2 py-1.5 text-left outline-none transition-colors focus:border-[var(--ac)] focus:ring-2 focus:ring-[color-mix(in_srgb,var(--ac)_28%,transparent)]",
          motionClass(undefined, hoverEffect),
          classNames?.trigger
        )}
      >
        {selectedOptions.length === 0 && <span className="text-sm text-fg-subtle">{placeholder}</span>}
        {selectedOptions.map((o) => (
          <span
            key={o.value}
            className={cx("inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-xs", classNames?.tag)}
            style={CHIP_STYLE}
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

      {mounted && (
        <div
          role="listbox"
          aria-multiselectable="true"
          className={cx(
            "absolute z-10 mt-1 w-full max-h-60 overflow-y-auto rounded-lg border border-border bg-surface py-1 shadow-lg",
            motionClass(transition),
            classNames?.menu
          )}
          style={motionStyle(transitionDuration, transitionDelay)}
          {...motionState(open)}
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
                  classNames?.option
                )}
                style={selected ? OPTION_SELECTED_STYLE : undefined}
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
