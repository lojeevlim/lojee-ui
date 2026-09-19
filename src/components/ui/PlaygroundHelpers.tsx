// Shared bits for every per-component *Playground.tsx (demo-only, alongside
// ShowcaseHelpers.tsx) — the interactive "try it" panel behind the floating
// Playground button, one per component in App.tsx's SHOWCASES map.
import { useState } from "react";
import type { ReactNode } from "react";
import { Check, Copy } from "lucide-react";
import { COLORS, type ColorName } from "../../core/tokens";
import { cx, swatchClasses } from "./playgroundUtils";

export function OptionGroup<T extends string>({
  label,
  options,
  value,
  onChange,
  render,
}: {
  label: string;
  options: readonly T[];
  value: T;
  onChange: (value: T) => void;
  render?: (option: T) => ReactNode;
}) {
  return (
    <div>
      <span className="mb-1.5 block text-xs font-medium text-slate-500">{label}</span>
      <div className="flex flex-wrap gap-1.5">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={cx(
              "rounded-md px-2.5 py-1 text-xs font-medium capitalize transition-colors",
              value === option ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            )}
          >
            {render ? render(option) : option}
          </button>
        ))}
      </div>
    </div>
  );
}

export function ColorSwatches({
  label = "Color",
  value,
  onChange,
}: {
  label?: string;
  value: ColorName;
  onChange: (color: ColorName) => void;
}) {
  return (
    <div>
      <span className="mb-1.5 block text-xs font-medium text-slate-500">{label}</span>
      <div className="flex flex-wrap gap-1.5">
        {COLORS.map((c) => (
          <button
            key={c.base}
            type="button"
            onClick={() => onChange(c.base)}
            aria-label={c.name}
            title={c.name}
            className={cx(
              "h-6 w-6 rounded-full ring-2 ring-offset-2 transition-transform",
              swatchClasses[c.base],
              value === c.base ? "scale-110 ring-slate-900" : "ring-transparent hover:scale-105"
            )}
          />
        ))}
      </div>
    </div>
  );
}

// The pinned "generated code + copy button" strip at the bottom of every
// playground modal.
export function CodeBar({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable in this context — silently ignore */
    }
  };

  return (
    <div className="sticky bottom-0 -mx-6 -mb-6 mt-2 border-t border-slate-200 bg-white/95 px-6 py-4 backdrop-blur">
      <div className="relative rounded-lg bg-slate-900 p-4 pr-24">
        <pre className="overflow-x-auto text-xs leading-relaxed text-slate-100">
          <code>{code}</code>
        </pre>
        <button
          type="button"
          onClick={handleCopy}
          className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-md bg-white/10 px-2.5 py-1.5 text-xs font-medium text-white transition-colors hover:bg-white/20"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
    </div>
  );
}

export function PlaygroundLayout({ preview, children, code }: { preview: ReactNode; children: ReactNode; code: string }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex min-h-[180px] items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50 p-10">
        {preview}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">{children}</div>
      <CodeBar code={code} />
    </div>
  );
}
