import { useEffect, useRef, useState, type ReactNode } from "react";
import { spotlight } from "./hooks";

// Every hero card is the same height and one of three widths, so the three reels read as tidy rows.
const WIDTHS = new Set(["w-64", "w-72", "w-80"]);
const MIN_SCALE = 0.5;

/** Shrinks content that is taller or wider than its box (never below MIN_SCALE) so big components fit a small card; short content is left alone. */
function Fit({ children }: { children: ReactNode }) {
  const box = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const measured = useRef(false);

  useEffect(() => {
    const b = box.current;
    const i = inner.current;
    if (!b || !i) return;
    // Measure once, at full size, after the first layout (and again after images / fonts settle).
    const measure = () => {
      if (measured.current) return;
      const need = i.offsetHeight;
      const have = b.clientHeight;
      if (need <= 0 || have <= 0) return;
      measured.current = true;
      const byHeight = need > have ? have / need : 1;
      const byWidth = i.scrollWidth > b.clientWidth + 1 ? b.clientWidth / i.scrollWidth : 1;
      setScale(Math.max(MIN_SCALE, Math.min(byHeight, byWidth)));
      ro.disconnect();
    };
    const ro: ResizeObserver = new ResizeObserver(measure);
    ro.observe(i);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={box} className={scale < 1 ? "h-full overflow-hidden" : "h-full"}>
      <div ref={inner} style={scale < 1 ? { width: `${100 / scale}%`, transform: `scale(${scale})`, transformOrigin: "0 0" } : undefined}>
        {children}
      </div>
    </div>
  );
}

/** One captioned, live component inside the hero reel. `w` is a Tailwind width class — w-64 (default), w-72 or w-80; anything wider is capped at w-80. */
export function HeroCard({ name, children, w = "w-64" }: { name: string; children: ReactNode; w?: string }) {
  return (
    <div
      onPointerMove={spotlight}
      data-hero-card={name}
      className={`lp-spot relative hover:z-10 ${WIDTHS.has(w) ? w : "w-80"} flex h-52 shrink-0 flex-col rounded-2xl border border-border bg-surface p-4 shadow-lg shadow-black/5 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1.5 hover:scale-[1.03] hover:border-accent-500 hover:shadow-xl hover:shadow-accent-500/20`}
    >
      <p className="relative mb-3 shrink-0 font-mono text-[10px] uppercase tracking-wider text-fg-subtle">{name}</p>
      <div className="relative min-h-0 flex-1">
        <Fit>{children}</Fit>
      </div>
    </div>
  );
}
