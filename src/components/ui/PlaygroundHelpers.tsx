// Shared bits for every per-component *Playground.tsx (demo-only, alongside
// ShowcaseHelpers.tsx) — the interactive "try it" panel behind the floating
// Playground button, one per component in App.tsx's SHOWCASES map.
import { useState } from "react";
import type { ReactNode } from "react";
import { Check, Copy } from "lucide-react";
import { COLORS, type ColorName } from "../../core/tokens";
import { cx, swatchClasses } from "./playgroundUtils";
import { CODE_FRAMEWORK_LABEL, useCodeFramework, type CodeFramework } from "../../core/codeFramework";
import type { CodeBlockVariants } from "./CodeBlock";

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

// Preference order when the globally-selected framework has no example yet.
const FALLBACK_ORDER: CodeFramework[] = ["react", "js", "vue", "angular"];

// The pinned "generated code + copy button" strip at the bottom of every
// playground modal. Like CodeBlock (showcase pages), it re-generates from the
// current control state on every render, but per the globally-selected
// framework (Header's dropdown) instead of always React JSX.
export function CodeBar({ code, variants }: { code?: string; variants?: CodeBlockVariants }) {
  const { framework } = useCodeFramework();
  const [copied, setCopied] = useState(false);

  const allVariants: CodeBlockVariants = code !== undefined ? { react: code, ...variants } : { ...variants };
  const activeFramework =
    allVariants[framework] !== undefined ? framework : FALLBACK_ORDER.find((f) => allVariants[f] !== undefined);
  const activeCode = activeFramework ? allVariants[activeFramework] : undefined;
  const isFallback = activeFramework !== undefined && activeFramework !== framework;

  const handleCopy = async () => {
    if (!activeCode) return;
    try {
      await navigator.clipboard.writeText(activeCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable in this context — silently ignore */
    }
  };

  return (
    <div className="sticky bottom-0 -mx-6 -mb-6 mt-2 border-t border-slate-200 bg-white/95 px-6 py-4 backdrop-blur">
      {isFallback && (
        <p className="mb-2 text-xs text-amber-600">
          No {CODE_FRAMEWORK_LABEL[framework]} example yet for this one — showing {CODE_FRAMEWORK_LABEL[activeFramework!]}.
        </p>
      )}
      <div className="relative rounded-lg bg-slate-900 p-4 pr-24">
        <pre className="overflow-x-auto text-xs leading-relaxed text-slate-100">
          <code>{activeCode}</code>
        </pre>
        {activeCode && (
          <button
            type="button"
            onClick={handleCopy}
            className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-md bg-white/10 px-2.5 py-1.5 text-xs font-medium text-white transition-colors hover:bg-white/20"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? "Copied" : "Copy"}
          </button>
        )}
      </div>
    </div>
  );
}

export function PlaygroundLayout({
  preview,
  children,
  code,
  variants,
}: {
  preview: ReactNode;
  children: ReactNode;
  code?: string;
  variants?: CodeBlockVariants;
}) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex min-h-[180px] items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50 p-10">
        {preview}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">{children}</div>
      <CodeBar code={code} variants={variants} />
    </div>
  );
}
