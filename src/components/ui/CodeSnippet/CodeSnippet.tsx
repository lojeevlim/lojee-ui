import { cx } from "../../../core/tokens";
import { highlightCode } from "../../../core/highlightCode";
import { CopyButton } from "./CopyButton";

export interface CodeSnippetProps {
  /** The code to show. */
  code: string;
  /** Name of the language, shown in the header (e.g. "tsx", "bash"). Colouring covers JSX / TypeScript / HTML / CSS-style code. */
  language?: string;
  /** Short title shown in the header, e.g. a file name. */
  title?: string;
  /** Shows line numbers (default: false). */
  lineNumbers?: boolean;
  /** Shows the copy button (default: true). */
  copyable?: boolean;
  /** Extra class name(s) appended to the root element. */
  className?: string;
  /** Per-part class overrides — merged after (and win over) the built-in styling. */
  classNames?: { root?: string; header?: string; code?: string };
}

/** A code block with an optional file name and language, line numbers, syntax colouring and a copy button. */
export function CodeSnippet({ code, language, title, lineNumbers = false, copyable = true, className, classNames }: CodeSnippetProps) {
  const lines = code.replace(/\n$/, "").split("\n");
  const hasHeader = Boolean(title || language) || copyable;
  return (
    <div className={cx("overflow-hidden rounded-lg border border-border bg-surface-muted", className, classNames?.root)}>
      {hasHeader && (
        <div className={cx("flex items-center justify-between gap-3 border-b border-border px-3 py-1.5", classNames?.header)}>
          <span className="truncate text-xs font-medium text-fg-muted">
            {title}
            {title && language && <span className="mx-1.5 text-fg-subtle">·</span>}
            {language && <span className="font-mono text-fg-subtle">{language}</span>}
          </span>
          {copyable && <CopyButton text={code} iconOnly />}
        </div>
      )}
      <pre className={cx("overflow-x-auto p-4 text-xs leading-relaxed text-fg", classNames?.code)}>
        {lineNumbers ? (
          <code className="grid grid-cols-[auto_1fr] gap-x-4">
            <span aria-hidden className="select-none text-right text-fg-subtle">
              {lines.map((_, i) => (
                <span key={i} className="block">
                  {i + 1}
                </span>
              ))}
            </span>
            <span>{highlightCode(lines.join("\n"))}</span>
          </code>
        ) : (
          <code>{highlightCode(lines.join("\n"))}</code>
        )}
      </pre>
    </div>
  );
}
