// Tiny dependency-free syntax highlighter for the docs' code samples (JSX / TS / HTML / CSS-ish).
// One regex pass that splits code into typed tokens; colors are theme-aware Tailwind classes, so
// they read well on both the light and dark code block backgrounds.
import type { ReactNode } from "react";

type TokenType = "comment" | "string" | "tag" | "attr" | "keyword" | "number" | "punct";

const TOKEN_CLASS: Record<TokenType, string> = {
  comment: "italic text-fg-subtle",
  string: "text-emerald-700 dark:text-emerald-300",
  tag: "text-rose-600 dark:text-rose-400",
  attr: "text-amber-700 dark:text-amber-300",
  keyword: "text-violet-600 dark:text-violet-400",
  number: "text-orange-600 dark:text-orange-400",
  punct: "text-fg-muted",
};

// Order matters: earlier groups win at the same position (comments/strings before anything inside them).
const TOKEN_RE = new RegExp(
  [
    String.raw`(\/\*[\s\S]*?\*\/|\/\/[^\n]*|<!--[\s\S]*?-->)`, // 1 comment
    String.raw`("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|` + "`(?:\\\\.|[^`\\\\])*`" + ")", // 2 string
    String.raw`(<\/?[A-Za-z][\w.:-]*)`, // 3 tag
    String.raw`([A-Za-z_:@][\w:.-]*(?==(?!=)))`, // 4 attribute name (`name=`)
    String.raw`(\b(?:import|from|export|default|const|let|var|function|return|type|interface|new|as|if|else|true|false|null|undefined|class|extends|async|await|script|module)\b)`, // 5 keyword
    String.raw`(\b\d+(?:\.\d+)?\b)`, // 6 number
    String.raw`([{}()\[\]<>\/=;,])`, // 7 punctuation
  ].join("|"),
  "g"
);

const GROUP_TYPES: TokenType[] = ["comment", "string", "tag", "attr", "keyword", "number", "punct"];

export function highlightCode(code: string): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  let key = 0;
  for (const m of code.matchAll(TOKEN_RE)) {
    const start = m.index ?? 0;
    if (start > last) out.push(code.slice(last, start));
    const type = GROUP_TYPES[m.findIndex((g, i) => i > 0 && g !== undefined) - 1];
    out.push(
      <span key={key++} className={TOKEN_CLASS[type]}>
        {m[0]}
      </span>
    );
    last = start + m[0].length;
  }
  if (last < code.length) out.push(code.slice(last));
  return out;
}
