// Small presentational helpers shared by every component's showcase/ demo
// (not part of the shipped library — demo-only, alongside CodeBlock.tsx).
import { useState } from "react";
import type { ReactNode } from "react";

export interface SectionLabelProps {
  children: ReactNode;
  sub?: ReactNode;
}

export function SectionLabel({ children, sub }: SectionLabelProps) {
  return (
    <div className="mb-4">
      <h2 className="text-lg font-semibold text-fg">{children}</h2>
      {sub && <p className="text-sm text-fg-subtle mt-0.5">{sub}</p>}
    </div>
  );
}

export interface RowProps {
  children: ReactNode;
}

export function Row({ children }: RowProps) {
  return <div className="flex flex-wrap items-center gap-3">{children}</div>;
}

// A live preview for the "Transitions" sections: enter transitions only play when an element mounts, so this
// re-mounts its children whenever "Replay" is pressed. Items sit in an evenly-spaced grid.
const GRID_COLS = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-2 sm:grid-cols-3",
  4: "grid-cols-2 sm:grid-cols-4",
} as const;

export interface TransitionPreviewProps {
  children: ReactNode;
  /** Columns from `sm` up (default: 4). */
  cols?: keyof typeof GRID_COLS;
  /** "inline" lays small, naturally-sized elements (badges, avatars, buttons) out in a wrapping row instead of a grid. */
  layout?: "grid" | "inline";
  /** Replaces the default grid column classes (e.g. "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3") — for a different responsive breakpoint than `cols` gives. */
  gridClassName?: string;
}

export function TransitionPreview({ children, cols = 4, layout = "grid", gridClassName }: TransitionPreviewProps) {
  const [run, setRun] = useState(0);
  return (
    <div className="mb-4">
      <div className="mb-3 flex justify-end">
        <button
          type="button"
          onClick={() => setRun((n) => n + 1)}
          className="rounded-md bg-surface-muted px-3 py-1 text-xs font-medium text-fg-muted transition-colors hover:bg-border"
        >
          Replay
        </button>
      </div>
      <div key={run} className={layout === "inline" ? "flex flex-wrap items-center gap-3" : `grid items-start gap-4 ${gridClassName ?? GRID_COLS[cols]}`}>
        {children}
      </div>
    </div>
  );
}
