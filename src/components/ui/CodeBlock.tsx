import { useState } from "react";
import { Copy, Check, ChevronDown } from "lucide-react";
import { CODE_FRAMEWORK_LABEL, useCodeFramework, type CodeFramework } from "../../core/codeFramework";

export type CodeBlockVariants = Partial<Record<CodeFramework, string>>;

export interface CodeBlockProps {
  /** Back-compat shorthand for `variants.react` — most existing call sites only pass this. */
  code?: string;
  /** Per-framework source, e.g. `{ react: "...", vue: "...", angular: "...", js: "..." }`. */
  variants?: CodeBlockVariants;
}

// Preference order when the globally-selected framework has no example yet.
const FALLBACK_ORDER: CodeFramework[] = ["react", "js", "vue", "angular"];

export default function CodeBlock({ code, variants }: CodeBlockProps) {
  const { framework } = useCodeFramework();
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

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
    <div className="mt-4 overflow-hidden rounded-lg bg-slate-900">
      <div className="flex items-center justify-between gap-2 px-4 py-2.5">
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="flex items-center gap-1.5 text-xs font-medium text-slate-300 transition-colors hover:text-white"
        >
          <ChevronDown size={14} className={`transition-transform ${expanded ? "" : "-rotate-90"}`} />
          {expanded ? "Hide code" : "View code"}
        </button>
        {expanded && activeCode && (
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 rounded-md bg-white/10 px-2.5 py-1.5 text-xs font-medium text-white transition-colors hover:bg-white/20"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? "Copied" : "Copy"}
          </button>
        )}
      </div>
      {expanded && (
        <>
          {isFallback && (
            <p className="px-4 pb-2 text-xs text-amber-400">
              No {CODE_FRAMEWORK_LABEL[framework]} example yet for this one — showing{" "}
              {CODE_FRAMEWORK_LABEL[activeFramework!]}.
            </p>
          )}
          {activeCode && (
            <pre className="overflow-x-auto px-4 pb-4 text-xs leading-relaxed text-slate-100">
              <code>{activeCode}</code>
            </pre>
          )}
        </>
      )}
    </div>
  );
}
