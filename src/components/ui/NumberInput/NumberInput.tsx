import { useState } from "react";
import type { FocusEvent, FormEvent, KeyboardEvent } from "react";
import { Minus, Plus } from "lucide-react";
import { cx } from "../../../core/tokens";
import { useValue } from "../../../core/useValue";

export type NumberInputSize = "sm" | "md" | "lg";

export interface NumberInputProps {
  /** The current number (omit for empty). Also settable from outside; the input keeps its own value otherwise. */
  value?: number;
  /** Smallest allowed value (default: no minimum). */
  min?: number;
  /** Largest allowed value (default: no maximum). */
  max?: number;
  /** How much the + / − buttons and the arrow keys change the value (default: 1). */
  step?: number;
  /** Decimal places to round to and show, e.g. 2 for prices (default: whatever you type). */
  precision?: number;
  /** Placeholder shown while empty. */
  placeholder?: string;
  /** Control height and text size: "sm" | "md" | "lg" (default: "md"). */
  size?: NumberInputSize;
  /** Red border for error states (default: false). */
  invalid?: boolean;
  /** Disables the field and its buttons (default: false). */
  disabled?: boolean;
  /** Called with the new number (or undefined when the field is cleared) whenever it changes. */
  onChange?: (value: number | undefined) => void;
  /** Called when the field gains focus — the native focus event (the web component's `focus` event, detail = the value). */
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
  /** Called as the user edits the field — the native input event (the web component's `input` event, detail = the value). */
  onInput?: (e: FormEvent<HTMLInputElement>) => void;
  /** Called when the field fails validation — the native invalid event (the web component's `invalid` event, detail = the message). */
  onInvalid?: (e: FormEvent<HTMLInputElement>) => void;
  /** Extra class name(s) appended to the root element. */
  className?: string;
  /** Per-part class overrides — merged after (and win over) the built-in styling. */
  classNames?: { root?: string; input?: string; button?: string };
}

const SIZE: Record<NumberInputSize, string> = { sm: "h-8 text-sm", md: "h-10 text-sm", lg: "h-12 text-base" };
const BUTTON_SIZE: Record<NumberInputSize, string> = { sm: "w-8", md: "w-10", lg: "w-12" };

/** A number field with − and + buttons, arrow-key stepping, and min / max / precision handling. */
export function NumberInput({
  value,
  min,
  max,
  step = 1,
  precision,
  placeholder,
  size = "md",
  invalid = false,
  disabled = false,
  onChange,
  onFocus,
  onInput,
  onInvalid,
  className,
  classNames,
}: NumberInputProps) {
  const [num, setNum] = useValue<number | undefined>(value, undefined);
  const [text, setText] = useState(() => (num === undefined ? "" : String(num)));
  const [prevNum, setPrevNum] = useState(num);
  // Keep the visible text in step with the number when it changes from outside (or via the buttons).
  if (num !== prevNum) {
    setPrevNum(num);
    setText(num === undefined ? "" : precision !== undefined ? num.toFixed(precision) : String(num));
  }

  const clamp = (n: number) => {
    let out = n;
    if (min !== undefined) out = Math.max(min, out);
    if (max !== undefined) out = Math.min(max, out);
    return precision !== undefined ? Number(out.toFixed(precision)) : out;
  };
  const commit = (n: number | undefined) => {
    setNum(n);
    onChange?.(n);
  };
  const stepBy = (dir: 1 | -1) => commit(clamp((num ?? (min ?? 0)) + dir * step));

  const finish = () => {
    const parsed = text.trim() === "" ? undefined : Number(text);
    if (parsed === undefined || Number.isNaN(parsed)) {
      setText(num === undefined ? "" : String(num));
      return;
    }
    const next = clamp(parsed);
    setText(precision !== undefined ? next.toFixed(precision) : String(next));
    if (next !== num) commit(next);
  };
  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      stepBy(1);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      stepBy(-1);
    } else if (e.key === "Enter") finish();
  };

  const atMin = min !== undefined && num !== undefined && num <= min;
  const atMax = max !== undefined && num !== undefined && num >= max;
  const btn = cx(
    "flex shrink-0 items-center justify-center text-fg-muted transition-colors disabled:cursor-not-allowed disabled:opacity-40",
    BUTTON_SIZE[size],
    classNames?.button
  );

  return (
    <div
      className={cx(
        "inline-flex w-full max-w-48 items-stretch overflow-hidden rounded-md border bg-surface transition-colors focus-within:ring-2",
        SIZE[size],
        invalid ? "border-rose-400 focus-within:border-rose-500 focus-within:ring-rose-500/20" : "border-border-strong focus-within:border-slate-500 focus-within:ring-slate-500/20",
        disabled && "cursor-not-allowed opacity-50",
        className,
        classNames?.root
      )}
    >
      <button type="button" aria-label="Decrease" disabled={disabled || atMin} onClick={() => stepBy(-1)} className={cx(btn, "border-r border-border")}>
        <Minus size={14} />
      </button>
      <input
        value={text}
        inputMode="decimal"
        role="spinbutton"
        aria-valuenow={num}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-invalid={invalid || undefined}
        disabled={disabled}
        placeholder={placeholder}
        onChange={(e) => setText(e.target.value)}
        onFocus={onFocus}
        onInput={onInput}
        onInvalid={onInvalid}
        onBlur={finish}
        onKeyDown={onKeyDown}
        className={cx("min-w-0 flex-1 bg-transparent px-2 text-center text-fg outline-none placeholder:text-fg-subtle disabled:cursor-not-allowed", classNames?.input)}
      />
      <button type="button" aria-label="Increase" disabled={disabled || atMax} onClick={() => stepBy(1)} className={cx(btn, "border-l border-border")}>
        <Plus size={14} />
      </button>
    </div>
  );
}
