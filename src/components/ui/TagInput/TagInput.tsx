import { useState } from "react";
import type { FocusEvent, FormEvent, KeyboardEvent } from "react";
import { X } from "lucide-react";
import { colorClasses, cx, nonInteractive, type ColorName } from "../../../core/tokens";
import { useValue } from "../../../core/useValue";

export interface TagInputProps {
  /** The current tags. Also settable from outside; the input keeps its own list otherwise, so it works with nothing wired up. */
  value?: string[];
  /** Placeholder shown while there are no tags and nothing is typed (default: "Add a tag…"). */
  placeholder?: string;
  /** Most tags allowed; once reached, typing is disabled (default: no limit). */
  maxTags?: number;
  /** Allow the same tag twice (default: false — a repeat is ignored). */
  allowDuplicates?: boolean;
  /** Tag color: a built-in ColorName (default: "accent"). */
  color?: ColorName;
  /** Red border for error states (default: false). */
  invalid?: boolean;
  /** Disables the input and the remove buttons (default: false). */
  disabled?: boolean;
  /** Called with the full list of tags whenever a tag is added or removed. */
  onChange?: (tags: string[]) => void;
  /** Called when the field gains focus — the native focus event (the web component's `focus` event, detail = the value). */
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
  /** Called as the user edits the field — the native input event (the web component's `input` event, detail = the value). */
  onInput?: (e: FormEvent<HTMLInputElement>) => void;
  /** Called when the field fails validation — the native invalid event (the web component's `invalid` event, detail = the message). */
  onInvalid?: (e: FormEvent<HTMLInputElement>) => void;
  /** Extra class name(s) appended to the root element. */
  className?: string;
  /** Per-part class overrides — merged after (and win over) the built-in styling. */
  classNames?: { root?: string; tag?: string; input?: string };
}

/** A text field that turns what you type into removable tags — Enter or a comma adds one, Backspace on an empty field removes the last. */
export function TagInput({
  value,
  placeholder = "Add a tag…",
  maxTags,
  allowDuplicates = false,
  color = "accent",
  invalid = false,
  disabled = false,
  onChange,
  onFocus,
  onInput,
  onInvalid,
  className,
  classNames,
}: TagInputProps) {
  const [tags, setTags] = useValue<string[]>(value, []);
  const [draft, setDraft] = useState("");
  const full = maxTags !== undefined && tags.length >= maxTags;
  const tagColor = nonInteractive((colorClasses[color] || colorClasses.accent).soft);

  const commit = (next: string[]) => {
    setTags(next);
    onChange?.(next);
  };
  const add = (raw: string) => {
    const text = raw.trim();
    setDraft("");
    if (!text || full) return;
    if (!allowDuplicates && tags.includes(text)) return;
    commit([...tags, text]);
  };
  const remove = (index: number) => commit(tags.filter((_, i) => i !== index));

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      add(draft);
    } else if (e.key === "Backspace" && draft === "" && tags.length > 0) {
      remove(tags.length - 1);
    }
  };

  return (
    <div
      className={cx(
        "flex min-h-10 w-full flex-wrap items-center gap-1.5 rounded-md border bg-surface px-2 py-1.5 transition-colors focus-within:ring-2",
        invalid ? "border-rose-400 focus-within:border-rose-500 focus-within:ring-rose-500/20" : "border-border-strong focus-within:border-slate-500 focus-within:ring-slate-500/20",
        disabled && "cursor-not-allowed opacity-50",
        className,
        classNames?.root
      )}
    >
      {tags.map((tag, i) => (
        <span key={`${tag}-${i}`} className={cx("inline-flex items-center gap-1 rounded-md py-0.5 pl-2 pr-1 text-sm font-medium", tagColor, classNames?.tag)}>
          {tag}
          <button
            type="button"
            disabled={disabled}
            aria-label={`Remove ${tag}`}
            onClick={() => remove(i)}
            className="flex h-4 w-4 items-center justify-center rounded opacity-60 transition-opacity hover:opacity-100 disabled:pointer-events-none"
          >
            <X size={12} />
          </button>
        </span>
      ))}
      <input
        value={draft}
        disabled={disabled || full}
        onChange={(e) => setDraft(e.target.value)}
        onFocus={onFocus}
        onInput={onInput}
        onInvalid={onInvalid}
        onKeyDown={onKeyDown}
        onBlur={() => add(draft)}
        placeholder={tags.length === 0 ? placeholder : full ? "" : undefined}
        aria-invalid={invalid || undefined}
        aria-label="Add a tag"
        className={cx("min-w-24 flex-1 bg-transparent px-1 py-0.5 text-sm text-fg outline-none placeholder:text-fg-subtle disabled:cursor-not-allowed", classNames?.input)}
      />
    </div>
  );
}
