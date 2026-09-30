// Small presentational pieces shared by the docs pages (Installation, Theming) — demo-only, not shipped.
import type { ReactNode } from "react";

export function Step({ n, title, children }: { n: number; title: string; children: ReactNode }) {
  return (
    <section className="flex gap-4">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent-600 text-xs font-semibold text-white">{n}</div>
      <div className="min-w-0 flex-1 space-y-3">
        <h2 className="text-lg font-semibold text-fg">{title}</h2>
        {children}
      </div>
    </section>
  );
}

export function P({ children }: { children: ReactNode }) {
  return <p className="text-sm leading-relaxed text-fg-muted">{children}</p>;
}

export function Code({ children }: { children: ReactNode }) {
  return <code className="rounded bg-surface-muted px-1 py-0.5 text-[12px] text-fg">{children}</code>;
}

export function ApiTable({ rows, head = ["Name", "Type / default", "Description"] }: { rows: string[][]; head?: string[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-left text-sm">
        <thead className="bg-surface-muted text-xs text-fg-subtle">
          <tr>
            {head.map((h) => (
              <th key={h} className="px-3 py-2 font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {rows.map((cells) => (
            <tr key={cells[0]}>
              {cells.map((c, i) => (
                <td
                  key={i}
                  className={
                    i === 0
                      ? "whitespace-nowrap px-3 py-2 font-mono text-[12px] text-fg"
                      : i === 1 && cells.length > 2
                        ? "whitespace-nowrap px-3 py-2 font-mono text-[12px] text-fg-muted"
                        : "px-3 py-2 text-fg-muted"
                  }
                >
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
