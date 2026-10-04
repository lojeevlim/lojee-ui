import { useState } from "react";
import { cx } from "../../../core/tokens";
import { useValue } from "../../../core/useValue";

export interface ColorPickerProps {
  /** The current color as "#rrggbb". Also settable from outside; the picker keeps its own value otherwise. */
  value?: string;
  /** Ready-made colors shown as swatches below the picker (default: a neutral-to-vivid set). */
  presets?: string[];
  /** Shows a text field for typing a hex code (default: true). */
  showInput?: boolean;
  /** Disables the picker (default: false). */
  disabled?: boolean;
  /** Called with the new "#rrggbb" color whenever it changes. */
  onChange?: (color: string) => void;
  /** Extra class name(s) appended to the root element. */
  className?: string;
  /** Per-part class overrides — merged after (and win over) the built-in styling. */
  classNames?: { root?: string; swatch?: string; input?: string };
}

const DEFAULT_PRESETS = ["#0f172a", "#6366f1", "#8b5cf6", "#ec4899", "#ef4444", "#f97316", "#eab308", "#22c55e", "#14b8a6", "#0ea5e9"];
const HEX = /^#[0-9a-fA-F]{6}$/;
const normalize = (v: string) => {
  const s = v.trim();
  const withHash = s.startsWith("#") ? s : `#${s}`;
  if (/^#[0-9a-fA-F]{3}$/.test(withHash)) return `#${[...withHash.slice(1)].map((c) => c + c).join("")}`.toLowerCase();
  return HEX.test(withHash) ? withHash.toLowerCase() : null;
};

/** Pick a color from the system picker, a row of presets, or by typing a hex code. */
export function ColorPicker({ value, presets = DEFAULT_PRESETS, showInput = true, disabled = false, onChange, className, classNames }: ColorPickerProps) {
  const [color, setColor] = useValue<string>(value && normalize(value) ? normalize(value)! : undefined, "#6366f1");
  const [draft, setDraft] = useState(color);
  const [prevColor, setPrevColor] = useState(color);
  if (color !== prevColor) {
    setPrevColor(color);
    setDraft(color);
  }

  const commit = (next: string) => {
    const n = normalize(next);
    if (!n) return;
    setColor(n);
    onChange?.(n);
  };

  return (
    <div className={cx("inline-flex flex-col gap-3", disabled && "pointer-events-none opacity-50", className, classNames?.root)}>
      <div className="flex items-center gap-2">
        <label
          className="relative h-10 w-10 shrink-0 cursor-pointer overflow-hidden rounded-lg border border-border-strong shadow-sm focus-within:ring-2 focus-within:ring-slate-500/30"
          style={{ backgroundColor: color }}
        >
          <input type="color" value={color} disabled={disabled} aria-label="Pick a color" onChange={(e) => commit(e.target.value)} className="absolute inset-0 h-full w-full cursor-pointer opacity-0" />
        </label>
        {showInput && (
          <input
            value={draft}
            disabled={disabled}
            spellCheck={false}
            aria-label="Hex color"
            onChange={(e) => setDraft(e.target.value)}
            onBlur={() => (normalize(draft) ? commit(draft) : setDraft(color))}
            onKeyDown={(e) => e.key === "Enter" && (normalize(draft) ? commit(draft) : setDraft(color))}
            className={cx("h-10 w-28 rounded-md border border-border-strong bg-surface px-3 font-mono text-sm uppercase text-fg outline-none transition-colors focus:border-slate-500 focus:ring-2 focus:ring-slate-500/20", classNames?.input)}
          />
        )}
      </div>
      {presets.length > 0 && (
        <div className="flex max-w-60 flex-wrap gap-1.5" role="listbox" aria-label="Preset colors" data-swatches>
          {presets.map((p) => {
            const selected = normalize(p) === color;
            return (
              <button
                key={p}
                type="button"
                role="option"
                aria-selected={selected}
                aria-label={p}
                disabled={disabled}
                onClick={() => commit(p)}
                className={cx(
                  "h-6 w-6 rounded-full border border-black/10 transition-transform hover:scale-110",
                  selected && "ring-2 ring-slate-500 ring-offset-2 ring-offset-surface",
                  classNames?.swatch
                )}
                style={{ backgroundColor: p }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
