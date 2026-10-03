// Demo-only (playground) schematic of an <App> layout. Not part of the shipped library.
// Drawn like the landing page's layout schematic: each region is one box that glides to its new place.
import type { AppSection, GridLayout } from "./appLayout";

const AREA_STYLE: Record<AppSection, string> = {
  top: "border-accent-500/50 bg-accent-500/15 text-accent-700 dark:text-accent-300",
  side: "border-accent-600/60 bg-accent-600 text-white",
  main: "border-border-strong bg-surface text-fg",
  footer: "border-accent-500/40 bg-accent-500/10 text-accent-700 dark:text-accent-300",
};

const LABEL: Record<AppSection, string> = { top: "Top", side: "Side", main: "Main", footer: "Footer" };
const SECTIONS: AppSection[] = ["top", "side", "main", "footer"];
const GAP = 8; // px between regions
// Like the real grid, the track holding Main flexes and the others stay slim.
const MAIN_WEIGHT = [3.4, 4.8] as const; // [column, row]

const GRID_BG = {
  backgroundImage:
    "linear-gradient(to right, color-mix(in srgb, var(--color-fg) 6%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in srgb, var(--color-fg) 6%, transparent) 1px, transparent 1px)",
  backgroundSize: "14px 14px",
};

/** Start / size of tracks `from`..`to` (inclusive) as a calc() over the stage, so left / top / width / height can animate. */
function span(weights: number[], from: number, to: number) {
  const total = weights.reduce((a, b) => a + b, 0);
  const before = weights.slice(0, from).reduce((a, b) => a + b, 0);
  const inside = weights.slice(from, to + 1).reduce((a, b) => a + b, 0);
  const free = `(100% - ${(weights.length - 1) * GAP}px)`;
  return {
    start: `calc(${free} * ${before / total} + ${from * GAP}px)`,
    size: `calc(${free} * ${inside / total} + ${(to - from) * GAP}px)`,
  };
}

export default function LayoutEditor({ layout, hidden = [] }: { layout: GridLayout; hidden?: AppSection[] }) {
  const cols = layout[0].length;
  const colW = Array.from({ length: cols }, (_, c) => (layout.some((row) => row[c] === "main") ? MAIN_WEIGHT[0] : 1));
  const rowW = layout.map((row) => (row.includes("main") ? MAIN_WEIGHT[1] : 1));

  return (
    <div className="relative aspect-[16/10] w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-surface-muted p-4" style={GRID_BG}>
      <div className="relative h-full w-full">
        {SECTIONS.map((section) => {
          const cells = layout.flatMap((row, r) => row.map((s, c) => (s === section ? [r, c] : null)).filter((x): x is number[] => !!x));
          if (!cells.length) return null;
          const rs = cells.map((x) => x[0]);
          const cs = cells.map((x) => x[1]);
          const y = span(rowW, Math.min(...rs), Math.max(...rs));
          const x = span(colW, Math.min(...cs), Math.max(...cs));
          const removed = hidden.includes(section);
          return (
            <div
              key={section}
              className={`absolute flex items-center justify-center overflow-hidden rounded-lg border-2 text-xs font-semibold shadow-sm transition-all duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)] ${AREA_STYLE[section]} ${removed ? "border-dashed opacity-40" : ""}`}
              style={{ left: x.start, top: y.start, width: x.size, height: y.size }}
            >
              <div className="flex w-full flex-col items-center gap-1.5 px-2">
                <span className="font-mono">{`<${LABEL[section]} />`}{removed ? " (removed)" : ""}</span>
                {section === "main" && (
                  <div className="w-full space-y-1.5 opacity-70">
                    <span className="block h-1.5 w-3/4 rounded-full bg-fg-subtle/40" />
                    <span className="block h-1.5 w-1/2 rounded-full bg-fg-subtle/40" />
                    <span className="block h-1.5 w-2/3 rounded-full bg-fg-subtle/40" />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
