import { startTransition, useEffect, useRef, useState, type ReactNode } from "react";
import { Card } from "../ui/Card/Card";

// Every hero card is the same size: the same height, and the width most of them asked for (w-80; anything wider was always capped to it, so it is the majority), so the reels read as tidy rows.
const CARD_WIDTH = "w-80";
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
    <div ref={box} className={scale < 1 ? "h-full [overflow:clip] [overflow-clip-margin:1rem]" : "h-full"}>
      <div ref={inner} style={scale < 1 ? { width: `${100 / scale}%`, transform: `scale(${scale})`, transformOrigin: "0 0" } : undefined}>
        {children}
      </div>
    </div>
  );
}

/** One captioned, live component inside the hero reel, drawn with the library's own glass `Card`, whose `lighting` prop lights its frame in dark mode. Every card has the same width, so the `w` prop is accepted for older call sites but no longer changes anything. */
export function HeroCard({ name, children }: { name: string; children: ReactNode; w?: string }) {
  // The reels hold a couple of hundred live components, doubled for the seamless loop, but only a handful are ever on screen. A card mounts its content only
  // while it is within about a screen of the viewport (the card has a fixed size, so nothing shifts), which keeps the number of live components, effects and
  // animations on the page small.
  const wrap = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  useEffect(() => {
    const el = wrap.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setNear(true);
      return;
    }
    // A card builds its content well before it scrolls into view (1400px ahead), and only tears it down again once it is far away (4000px), so
    // dragging a reel back and forth never shows a card that is blank for a moment.
    const mount = new IntersectionObserver(([e]) => e.isIntersecting && setNear(true), { rootMargin: "0px 1400px 0px 1400px" });
    const unmount = new IntersectionObserver(([e]) => !e.isIntersecting && startTransition(() => setNear(false)), { rootMargin: "0px 4000px 0px 4000px" });
    mount.observe(el);
    unmount.observe(el);
    return () => {
      mount.disconnect();
      unmount.disconnect();
    };
  }, []);
  return (
    // The wrapper only makes room for the Card's frosted-glass frame, which sits 10px outside the card (64px of padding cancelled by a -64px margin, so the layout and the card size are unchanged, and a fixed 28rem × 21rem box so the cards occupy exactly the same space whether or not content-visibility is currently skipping them — a size that changed as cards scrolled in and out shifted the whole row; it also leaves room for the Card's own lighting glow, which content-visibility's paint containment would otherwise cut off as a hard square — hence pointer-events only on the Card),
    // and carries the content-visibility below (its paint containment would clip the frame if it were on the Card itself). No hover lift / scale effects: the card only sinks when pressed.
    // content-visibility:auto skips layout / paint / animations of the cards that are off screen (most of a reel at any time), which cuts the
    // hero's idle main-thread work by ~4x. The cards have a fixed size, so nothing shifts; the reels fade out at both edges, hiding the entry.
    <div ref={wrap} data-hero-card={name} className="pointer-events-none relative z-20 -m-16 h-[21rem] w-[28rem] shrink-0 p-16 transition-transform duration-150 active:scale-[0.98] [content-visibility:auto] [contain-intrinsic-size:28rem_21rem]">
      <Card
        variant="glass"
        lighting="press"
        padding="none"
        className={`${CARD_WIDTH} pointer-events-auto flex h-52 flex-col !rounded-2xl !p-4 shadow-lg shadow-black/5 before:!rounded-[calc(var(--radius-2xl)+10px)] before:!backdrop-blur-none`}
        classNames={{ body: "flex min-h-0 flex-1 flex-col" }}
      >
        <p className="relative mb-3 shrink-0 font-mono text-[10px] uppercase tracking-wider text-fg-subtle">{name}</p>
        <div className="relative min-h-0 flex-1 [overflow:clip] [overflow-clip-margin:1rem]">
          {near && <Fit>{children}</Fit>}
        </div>
      </Card>
    </div>
  );
}
