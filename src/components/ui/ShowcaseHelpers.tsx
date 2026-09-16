// Small presentational helpers shared by every component's showcase/ demo
// (not part of the shipped library — demo-only, alongside CodeBlock.tsx).
import type { ReactNode } from "react";

export interface SectionLabelProps {
  children: ReactNode;
  sub?: ReactNode;
}

export function SectionLabel({ children, sub }: SectionLabelProps) {
  return (
    <div className="mb-4">
      <h2 className="text-lg font-semibold text-slate-900">{children}</h2>
      {sub && <p className="text-sm text-slate-500 mt-0.5">{sub}</p>}
    </div>
  );
}

export interface RowProps {
  children: ReactNode;
}

export function Row({ children }: RowProps) {
  return <div className="flex flex-wrap items-center gap-3">{children}</div>;
}
