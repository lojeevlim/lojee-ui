import { useState } from "react";
import { Copy, Check, ChevronDown } from "lucide-react";
import { highlightCode } from "../../core/highlightCode";
import { closeCustomElements } from "../../core/htmlCode";
import { CODE_FRAMEWORK_LABEL, useCodeFramework, type CodeFramework } from "../../core/codeFramework";

export type CodeBlockVariants = Partial<Record<CodeFramework, string>>;

export interface CodeBlockProps {
  /** Back-compat shorthand for `variants.react` — most existing call sites only pass this. */
  code?: string;
  /** Per-framework source, e.g. `{ react: "...", vue: "...", angular: "...", js: "..." }`. */
  variants?: CodeBlockVariants;
  /** Start with the code showing instead of collapsed behind "View code" (default: false). */
  defaultOpen?: boolean;
}

// Preference order when the globally-selected framework has no example yet.
const FALLBACK_ORDER: CodeFramework[] = ["react", "js", "vue", "angular"];

export default function CodeBlock({ code, variants, defaultOpen = false }: CodeBlockProps) {
  const { framework } = useCodeFramework();
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(defaultOpen);

  const allVariants: CodeBlockVariants = code !== undefined ? { react: code, ...variants } : { ...variants };

  const activeFramework =
    allVariants[framework] !== undefined ? framework : FALLBACK_ORDER.find((f) => allVariants[f] !== undefined);
  const rawCode = activeFramework ? allVariants[activeFramework] : undefined;
  // The plain-HTML tab never shows self-closed custom elements (invalid HTML) — see core/htmlCode.ts.
  const activeCode = rawCode !== undefined && activeFramework === "js" ? closeCustomElements(rawCode) : rawCode;
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
    <div className="mt-4 overflow-hidden rounded-lg border border-dashed border-border-strong bg-surface-muted">
      <div className="flex items-center justify-between gap-2 px-4 py-2.5">
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="flex items-center gap-1.5 text-xs font-medium text-fg-muted transition-colors hover:text-fg"
        >
          <ChevronDown size={14} className={`transition-transform ${expanded ? "" : "-rotate-90"}`} />
          {expanded ? "Hide code" : "View code"}
        </button>
        {expanded && activeCode && (
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 rounded-md bg-fg/10 px-2.5 py-1.5 text-xs font-medium text-fg transition-colors hover:bg-fg/20"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? "Copied" : "Copy"}
          </button>
        )}
      </div>
      {expanded && (
        <>
          {isFallback && (
            <p className="px-4 pb-2 text-xs text-amber-600 dark:text-amber-400">
              No {CODE_FRAMEWORK_LABEL[framework]} example yet for this one — showing{" "}
              {CODE_FRAMEWORK_LABEL[activeFramework!]}.
            </p>
          )}
          {activeCode && (
            <pre className="overflow-x-auto px-4 pb-4 text-xs leading-relaxed text-fg">
              <code>{highlightCode(activeCode)}</code>
            </pre>
          )}
        </>
      )}
    </div>
  );
}
