import { highlightCode } from "../../core/highlightCode";
import { useState } from "react";
import { useGlassLighting } from "../../core/glassLighting";

type Area = "top" | "side" | "main" | "footer";
type Box = [x: number, y: number, w: number, h: number];

interface Preset {
  name: string;
  matrix: Area[][];
  boxes: Record<Area, Box>;
}

// Positions are percentages of the stage, so switching presets animates left / top / width / height.
const PRESETS: Preset[] = [
  {
    name: "Sidebar first",
    matrix: [["side", "top"], ["side", "main"], ["side", "footer"]],
    boxes: { side: [0, 0, 22, 100], top: [24, 0, 76, 14], main: [24, 16, 76, 68], footer: [24, 86, 76, 14] },
  },
  {
    name: "Top bar first",
    matrix: [["top", "top"], ["side", "main"], ["side", "footer"]],
    boxes: { top: [0, 0, 100, 14], side: [0, 16, 22, 84], main: [24, 16, 76, 68], footer: [24, 86, 76, 14] },
  },
  {
    name: "Classic",
    matrix: [["top", "top"], ["side", "main"], ["footer", "footer"]],
    boxes: { top: [0, 0, 100, 14], side: [0, 16, 22, 68], main: [24, 16, 76, 68], footer: [0, 86, 100, 14] },
  },
  {
    name: "Right rail",
    matrix: [["top", "side"], ["main", "side"], ["footer", "side"]],
    boxes: { top: [0, 0, 76, 14], main: [0, 16, 76, 68], footer: [0, 86, 76, 14], side: [78, 0, 22, 100] },
  },
];

const AREA_STYLE: Record<Area, string> = {
  top: "border-accent-500/50 bg-accent-500/15 text-accent-700 dark:text-accent-300",
  side: "border-accent-600/60 bg-accent-600 text-white",
  main: "border-border-strong bg-surface text-fg",
  footer: "border-accent-500/40 bg-accent-500/10 text-accent-700 dark:text-accent-300",
};

/** Interactive App-layout schematic: pick a preset and the four regions glide to their new places. */
export default function LayoutLab() {
  const [i, setI] = useState(0);
  const [lightRef, lightAttrs] = useGlassLighting<HTMLDivElement>("scroll");
  const p = PRESETS[i];

  return (
    <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
      {/* Glass frame (same as Card variant="glass"): a frosted accent-tinted halo 10px outside the card. overflow-hidden, padding and the grid texture move to an inner wrapper so the halo isn't clipped; the card's fill moves to ::after. */}
      <div ref={lightRef} {...lightAttrs} className="relative isolate aspect-[16/10] rounded-2xl border border-border before:pointer-events-none before:absolute before:-inset-2.5 before:-z-20 before:rounded-[calc(var(--radius-2xl)+10px)] before:border before:border-accent-500/20 before:bg-accent-500/[0.07] before:backdrop-blur-2xl before:content-[''] after:pointer-events-none after:absolute after:inset-0 after:-z-10 after:rounded-[inherit] after:bg-surface-muted after:content-['']">
        <div className="lp-grid-fine relative h-full w-full overflow-hidden rounded-[inherit] p-3">
          <div className="relative h-full w-full">
            {(Object.keys(p.boxes) as Area[]).map((area) => {
              const [x, y, w, h] = p.boxes[area];
              return (
                <div
                  key={area}
                  className={`absolute flex items-center justify-center overflow-hidden rounded-lg border-2 text-xs font-semibold shadow-sm transition-all duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)] ${AREA_STYLE[area]}`}
                  style={{ left: `${x}%`, top: `${y}%`, width: `${w}%`, height: `${h}%` }}
                >
                  <div className="flex w-full flex-col items-center gap-1.5 px-2">
                    <span className="font-mono">{`<${area[0].toUpperCase()}${area.slice(1)} />`}</span>
                    {area === "main" && (
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
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          {PRESETS.map((pr, idx) => (
            <button
              key={pr.name}
              type="button"
              onClick={() => setI(idx)}
              className={`rounded-lg border px-3 py-2 text-left text-sm font-medium transition-all duration-200 ${
                idx === i ? "border-accent-600 bg-accent-600 text-white shadow-md" : "border-border text-fg-muted hover:-translate-y-0.5 hover:bg-surface-muted"
              }`}
            >
              {pr.name}
            </button>
          ))}
        </div>
        <pre className="overflow-x-auto rounded-xl border border-border bg-surface-muted p-4 font-mono text-[12px] leading-relaxed text-fg"><code>{highlightCode(`<App layout={[
${p.matrix.map((row) => `  [${row.map((c) => `"${c}"`).join(", ")}],`).join("\n")}
]}>
  <Top>…</Top>
  <Side>…</Side>
  <Main>…</Main>
  <Footer>…</Footer>
</App>`)}</code></pre>
        <p className="text-xs text-fg-subtle">A layout is just a matrix of region names. Below a breakpoint the side region collapses into a drawer automatically.</p>
      </div>
    </div>
  );
}
