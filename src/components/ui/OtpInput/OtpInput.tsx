import { useRef } from "react";
import type { ClipboardEvent, FocusEvent, FormEvent, KeyboardEvent } from "react";
import { cx } from "../../../core/tokens";
import { useValue } from "../../../core/useValue";

export type OtpInputSize = "sm" | "md" | "lg";
export type OtpInputType = "numeric" | "alphanumeric";

export interface OtpInputProps {
  /** How many boxes (default: 6). */
  length?: number;
  /** The code typed so far. Also settable from outside; the input keeps its own value otherwise. */
  value?: string;
  /** What may be typed: "numeric" (digits only, default) or "alphanumeric" (letters and digits). */
  type?: OtpInputType;
  /** Shows dots instead of the characters, like a password (default: false). */
  mask?: boolean;
  /** Focuses the first box on mount (default: false). */
  autoFocus?: boolean;
  /** Box size: "sm" | "md" | "lg" (default: "md"). */
  size?: OtpInputSize;
  /** Red borders for error states (default: false). */
  invalid?: boolean;
  /** Disables every box (default: false). */
  disabled?: boolean;
  /** Called with the code so far whenever a character is typed, pasted or deleted. */
  onChange?: (value: string) => void;
  /** Called once with the full code when every box is filled. */
  onComplete?: (value: string) => void;
  /** Called when the field gains focus — the native focus event (the web component's `focus` event, detail = the value). */
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
  /** Called as the user edits the field — the native input event (the web component's `input` event, detail = the value). */
  onInput?: (e: FormEvent<HTMLInputElement>) => void;
  /** Called when the field fails validation — the native invalid event (the web component's `invalid` event, detail = the message). */
  onInvalid?: (e: FormEvent<HTMLInputElement>) => void;
  /** Extra class name(s) appended to the root element. */
  className?: string;
  /** Per-part class overrides — merged after (and win over) the built-in styling. */
  classNames?: { root?: string; box?: string };
}

const SIZE: Record<OtpInputSize, string> = { sm: "h-9 w-8 text-base", md: "h-12 w-10 text-lg", lg: "h-14 w-12 text-xl" };

/** One box per character for verification codes: typing moves forward, Backspace moves back, and a pasted code fills every box. */
export function OtpInput({
  length = 6,
  value,
  type = "numeric",
  mask = false,
  autoFocus = false,
  size = "md",
  invalid = false,
  disabled = false,
  onChange,
  onFocus,
  onInput: onFieldInput, // the native input event (the digit handler below is also called onInput)
  onInvalid,
  onComplete,
  className,
  classNames,
}: OtpInputProps) {
  const count = Math.max(1, Math.floor(length));
  const [code, setCode] = useValue<string>(value, "");
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const allowed = type === "numeric" ? /[0-9]/ : /[a-zA-Z0-9]/;
  const clean = (s: string) => Array.from(s).filter((c) => allowed.test(c)).join("");

  const update = (next: string) => {
    const trimmed = next.slice(0, count);
    setCode(trimmed);
    onChange?.(trimmed);
    if (trimmed.length === count) onComplete?.(trimmed);
  };
  const focus = (i: number) => refs.current[Math.max(0, Math.min(count - 1, i))]?.focus();

  const onInput = (i: number, raw: string) => {
    const chars = clean(raw);
    if (!chars) return;
    const next = (code.slice(0, i) + chars + code.slice(i + chars.length)).slice(0, count);
    update(next);
    focus(i + chars.length);
  };
  const onKeyDown = (i: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      if (code[i]) update(code.slice(0, i) + code.slice(i + 1));
      else if (i > 0) {
        update(code.slice(0, i - 1) + code.slice(i));
        focus(i - 1);
      }
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      focus(i - 1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      focus(i + 1);
    }
  };
  const onPaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const chars = clean(e.clipboardData.getData("text"));
    if (!chars) return;
    update(chars);
    focus(chars.length);
  };

  return (
    <div role="group" aria-label="Verification code" className={cx("inline-flex gap-2", className, classNames?.root)}>
      {Array.from({ length: count }, (_, i) => (
        <input
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          value={code[i] ?? ""}
          inputMode={type === "numeric" ? "numeric" : "text"}
          type={mask ? "password" : "text"}
          autoComplete={i === 0 ? "one-time-code" : "off"}
          autoFocus={autoFocus && i === 0}
          maxLength={count}
          disabled={disabled}
          aria-label={`Digit ${i + 1} of ${count}`}
          aria-invalid={invalid || undefined}
          onChange={(e) => onInput(i, e.target.value)}
          onKeyDown={(e) => onKeyDown(i, e)}
          onPaste={onPaste}
          onFocus={(e) => {
            e.currentTarget.select();
            onFocus?.(e);
          }}
          onInput={onFieldInput}
          onInvalid={onInvalid}
          className={cx(
            "rounded-md border bg-surface text-center font-medium text-fg outline-none transition-colors focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50",
            SIZE[size],
            invalid ? "border-rose-400 focus:border-rose-500 focus:ring-rose-500/20" : "border-border-strong focus:border-slate-500 focus:ring-slate-500/20",
            classNames?.box
          )}
        />
      ))}
    </div>
  );
}
