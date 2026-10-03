import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import type { KeyboardEvent, SelectHTMLAttributes } from "react";
import { cx } from "../../../core/tokens";
import { Icon } from "../Icons/Icon";
import { usePresence } from "../../../core/usePresence";
import { motionClass, motionState, motionStyle, DEFAULT_TRANSITION_MS, type TransitionVariant, type HoverEffect } from "../../../core/motion";

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export type SelectSize = "sm" | "md" | "lg";

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  /** The choices shown in the list (and mirrored as `<option>`s of a hidden native `<select>` for forms); each has a `label`, a `value` and an optional `disabled` flag. */
  options: SelectOption[];
  /** Hidden, disabled prompt option shown while nothing is selected; also makes the select start with no selection. */
  placeholder?: string;
  /** Control height and text size: "sm", "md" (default) or "lg". */
  size?: SelectSize;
  /** Icon name shown at the start of the field, e.g. "code" — see src/core/icons.ts for the available set (default: none). */
  icon?: string;
  /** Marks the field as invalid with a rose border/focus ring (default: false). */
  invalid?: boolean;
  /** Enter/exit transition for the dropdown list: "fade" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "zoom" | "zoom-out" | "flip" | "blur" | "bounce" | "rotate" | "drop" | "skew" (default: none). Respects `prefers-reduced-motion`. */
  transition?: TransitionVariant;
  /** Enter/exit transition duration for the list in ms (default: 450). */
  transitionDuration?: number;
  /** Delay before the list's enter transition starts, in ms (default: 0) — handy for staggering. */
  transitionDelay?: number;
  /** Effect while hovering: "lift" | "scale" | "press" | "tilt" | "ring" | "glow" | "shine" (default: none). */
  hoverEffect?: HoverEffect;
  /** Extra CSS class(es) added to the root element, merged before `classNames.root`. */
  className?: string;
  /** Per-part class overrides — merged after (and win over) the built-in styling. */
  classNames?: { root?: string; select?: string; icon?: string; leadingIcon?: string; menu?: string; option?: string };
}

const SIZE_CLASSES: Record<SelectSize, string> = {
  sm: "h-8 pl-2.5 text-sm",
  md: "h-10 pl-3 text-sm",
  lg: "h-12 pl-4 text-base",
};

const ICON_PX: Record<SelectSize, number> = { sm: 14, md: 16, lg: 18 };

// Left padding that makes room for the leading icon.
const ICON_PAD: Record<SelectSize, string> = { sm: "pl-8", md: "pl-9", lg: "pl-11" };
const ICON_LEFT: Record<SelectSize, string> = { sm: "left-2.5", md: "left-3", lg: "left-4" };

const BASE_CLASSES =
  "flex w-full items-center rounded-md border border-border-strong bg-surface pr-9 text-left text-fg outline-none transition-colors focus:border-fg-subtle focus:ring-2 focus:ring-fg-subtle/20 disabled:cursor-not-allowed disabled:opacity-50";

const INVALID_CLASSES = "border-rose-400 focus:border-rose-500 focus:ring-rose-500/20";

// The open list is a themed listbox drawn by the component (not the browser's native <option> popup, which is
// painted by the OS and ignores the page's light / dark mode). A visually hidden native <select> mirrors the value so
// the field still participates in forms (name / required / reset) and fires a real `change` event.
export function Select({
  options,
  placeholder,
  icon,
  size = "md",
  invalid = false,
  transition,
  transitionDuration,
  transitionDelay,
  hoverEffect,
  className,
  classNames,
  id,
  style,
  autoFocus,
  onFocus,
  onBlur,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  "aria-describedby": ariaDescribedBy,
  ...rest
}: SelectProps) {
  const listId = useId();
  const rootRef = useRef<HTMLSpanElement>(null);
  const selectRef = useRef<HTMLSelectElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const controlled = rest.value !== undefined;
  const [inner, setInner] = useState("");
  const { mounted } = usePresence(open, transition ? (transitionDuration ?? DEFAULT_TRANSITION_MS) + (transitionDelay ?? 0) : 0);

  // Uncontrolled: adopt whatever the native select resolved as its initial value (defaultValue, placeholder or first option),
  // and follow form resets.
  useLayoutEffect(() => {
    if (selectRef.current) setInner(selectRef.current.value);
  }, []);
  useEffect(() => {
    const form = selectRef.current?.form;
    if (!form) return;
    const onReset = () => setTimeout(() => selectRef.current && setInner(selectRef.current.value));
    form.addEventListener("reset", onReset);
    return () => form.removeEventListener("reset", onReset);
  }, []);

  const current = controlled ? String(rest.value) : inner;
  const selected = options.find((o) => o.value === current);

  useEffect(() => {
    if (!open) return;
    // composedPath so clicks inside a Web Component's shadow root aren't mistaken for outside clicks.
    const onDown = (e: MouseEvent) => {
      if (rootRef.current && !e.composedPath().includes(rootRef.current)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  useEffect(() => {
    if (open && active >= 0) listRef.current?.querySelector<HTMLElement>(`[data-index="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [open, active]);

  const enabled = (from: number, dir: 1 | -1) => {
    for (let i = from; i >= 0 && i < options.length; i += dir) if (!options[i].disabled) return i;
    return -1;
  };

  const openList = () => {
    if (rest.disabled) return;
    setActive(selected ? options.indexOf(selected) : enabled(0, 1));
    setOpen(true);
  };

  const choose = (index: number) => {
    const o = options[index];
    if (!o || o.disabled) return;
    const sel = selectRef.current;
    if (sel && sel.value !== o.value) {
      sel.value = o.value;
      setInner(o.value);
      sel.dispatchEvent(new Event("change", { bubbles: true })); // React's onChange (and native listeners) fire from this
    }
    setOpen(false);
    (rootRef.current?.querySelector("button[aria-haspopup]") as HTMLElement | null)?.focus();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Tab") return setOpen(false);
    if (!open) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
        e.preventDefault();
        openList();
      }
      return;
    }
    if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const n = enabled(active + 1, 1);
      if (n >= 0) setActive(n);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const n = enabled(active - 1, -1);
      if (n >= 0) setActive(n);
    } else if (e.key === "Home") {
      e.preventDefault();
      setActive(enabled(0, 1));
    } else if (e.key === "End") {
      e.preventDefault();
      setActive(enabled(options.length - 1, -1));
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      choose(active);
    } else if (e.key.length === 1) {
      const n = options.findIndex((o, i) => i > active && !o.disabled && o.label.toLowerCase().startsWith(e.key.toLowerCase()));
      const first = n >= 0 ? n : options.findIndex((o) => !o.disabled && o.label.toLowerCase().startsWith(e.key.toLowerCase()));
      if (first >= 0) setActive(first);
    }
  };

  return (
    <span
      ref={rootRef}
      className={cx("relative inline-flex w-full items-center", motionClass(undefined, hoverEffect), className, classNames?.root)}
      style={style}
    >
      <select ref={selectRef} tabIndex={-1} aria-hidden="true" defaultValue={placeholder && !controlled ? "" : undefined} className="pointer-events-none absolute inset-0 h-full w-full opacity-0" {...rest}>
        {placeholder && <option value="" disabled hidden>{placeholder}</option>}
        {options.map((o) => (
          <option key={o.value} value={o.value} disabled={o.disabled}>
            {o.label}
          </option>
        ))}
      </select>
      <button
        type="button"
        id={id}
        autoFocus={autoFocus}
        disabled={rest.disabled}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-invalid={invalid || undefined}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={onKeyDown}
        onFocus={onFocus as never}
        onBlur={onBlur as never}
        className={cx(BASE_CLASSES, SIZE_CLASSES[size], icon && ICON_PAD[size], invalid && INVALID_CLASSES, classNames?.select)}
      >
        <span className={cx("min-w-0 flex-1 truncate", !selected && "text-fg-subtle")}>{selected ? selected.label : (placeholder ?? "")}</span>
      </button>
      {icon && <Icon name={icon} size={ICON_PX[size]} className={cx("pointer-events-none absolute text-fg-subtle", ICON_LEFT[size], classNames?.leadingIcon)} />}
      <Icon
        name="chevron-down"
        size={ICON_PX[size]}
        className={cx("pointer-events-none absolute right-3 text-fg-subtle transition-transform", open && "rotate-180", classNames?.icon)}
      />
      {mounted && (
        <div
          ref={listRef}
          id={listId}
          role="listbox"
          className={cx(
            "absolute left-0 top-full z-20 mt-1 max-h-60 w-full overflow-y-auto rounded-lg border border-border bg-surface py-1 text-fg shadow-lg",
            motionClass(transition),
            classNames?.menu
          )}
          style={motionStyle(transitionDuration, transitionDelay)}
          {...motionState(open)}
        >
          {options.map((o, i) => {
            const isSel = o.value === current;
            return (
              <div
                key={o.value}
                role="option"
                data-index={i}
                aria-selected={isSel}
                aria-disabled={o.disabled || undefined}
                onMouseEnter={() => !o.disabled && setActive(i)}
                onClick={() => choose(i)}
                className={cx(
                  "flex cursor-pointer items-center gap-2 px-3 py-1.5 text-sm",
                  i === active && "bg-surface-muted",
                  isSel ? "font-medium text-accent-700 dark:text-accent-300" : "text-fg-muted",
                  o.disabled && "cursor-not-allowed opacity-40",
                  classNames?.option
                )}
              >
                <span className="flex h-4 w-4 shrink-0 items-center justify-center">{isSel && <Icon name="check" size={14} />}</span>
                {o.label}
              </div>
            );
          })}
        </div>
      )}
    </span>
  );
}
