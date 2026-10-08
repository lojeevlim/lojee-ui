import { startTransition, useEffect, useRef, useState, type ReactNode } from "react";
import { Card } from "../ui/Card/Card";

// Every hero card is the same size: the same height, and the width most of them asked for (w-80; anything wider was always capped to it, so it is the majority), so the reels read as tidy rows.
const CARD_WIDTH = "w-80";
const MIN_SCALE = 0.5;

/** Shrinks content that is taller or wider than its box (never below MIN_SCALE) so big components fit a small card; short content is left alone. */
function Fit({ children, clip }: { children: ReactNode; clip: boolean }) {
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
    <div ref={box} className={scale < 1 && clip ? "h-full overflow-hidden" : "h-full"}>
      <div ref={inner} style={scale < 1 ? { width: `${100 / scale}%`, transform: `scale(${scale})`, transformOrigin: "0 0" } : undefined}>
        {children}
      </div>
    </div>
  );
}

/** How far (px) the light of a glowing card reaches onto the cards around it. */
const SPILL_REACH = 260;
/** How long (ms) the light takes to ease out after the card is released. */
const SPILL_FADE = 450;

/**
 * While a hero card is pressed (and glowing), the cards near it (and the stats bar above them), in the same row or the other one, pick up some of its light. It is recomputed every frame from
 * where the cards are right now (the other row keeps gliding), so it follows the glowing card instead of sticking to a card that has moved on: each card gets the
 * glow's position relative to itself (--lx / --ly, usually outside the card) and how strong it is there (--li, 0 at SPILL_REACH), and its overlay paints a radial
 * gradient from that point, so only the part of the card facing the glowing one is lit. After the release the light eases out over SPILL_FADE ms.
 */
function spillLight(source: HTMLElement) {
  const cards = [...document.querySelectorAll<HTMLElement>("[data-hero-card], [data-spill-target]")].filter((el) => el !== source);
  let held = true;
  let releasedAt = 0;
  let raf = 0;
  const frame = (now: number) => {
    const fade = held ? 1 : 1 - (now - releasedAt) / SPILL_FADE;
    const s = source.getBoundingClientRect();
    for (const el of cards) {
      const r = el.getBoundingClientRect();
      let k = 0;
      if (fade > 0 && r.right > 0 && r.left < window.innerWidth) {
        // The light leaves the glowing card at the point of its frame nearest to this card's centre.
        const lx = Math.min(Math.max(r.left + r.width / 2, s.left), s.right);
        const ly = Math.min(Math.max(r.top + r.height / 2, s.top), s.bottom);
        // distance from that point to the nearest point of this card
        const dx = Math.max(r.left - lx, 0, lx - r.right);
        const dy = Math.max(r.top - ly, 0, ly - r.bottom);
        k = Math.max(0, 1 - Math.hypot(dx, dy) / SPILL_REACH) * fade;
        if (k > 0) {
          el.style.setProperty("--lx", `${(lx - r.left).toFixed(0)}px`);
          el.style.setProperty("--ly", `${(ly - r.top).toFixed(0)}px`);
          el.style.setProperty("--li", k.toFixed(3));
        }
      }
      if (k > 0) el.setAttribute("data-spill", "");
      else el.removeAttribute("data-spill");
    }
    if (held || fade > 0) raf = requestAnimationFrame(frame);
  };
  const release = () => {
    held = false;
    releasedAt = performance.now();
    window.removeEventListener("pointerup", release);
    window.removeEventListener("pointercancel", release);
  };
  window.addEventListener("pointerup", release);
  window.addEventListener("pointercancel", release);
  cancelAnimationFrame(raf);
  raf = requestAnimationFrame(frame);
}

/** One captioned, live component inside the hero reel, drawn with the library's own glass `Card`, whose `lighting` prop lights its frame in dark mode. Every card has the same width, so the `w` prop is accepted for older call sites but no longer changes anything. */
export function HeroCard({ name, children, overflowVisible = false }: { name: string; children: ReactNode; w?: string; overflowVisible?: boolean }) {
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
    // No hover lift / scale effects: the card only sinks when pressed. The wrapper adds no padding or negative margin, so it never overlaps the neighbouring rows.
    <div ref={wrap} data-hero-card={name} onPointerDown={(e) => spillLight(e.currentTarget)} className="pointer-events-none relative z-20 shrink-0 transition-transform duration-150 active:scale-[0.98]">
      <Card
        variant="glass"
        lighting="press"
        padding="none"
        className={`${CARD_WIDTH} pointer-events-auto flex h-52 flex-col !rounded-2xl !p-4 shadow-lg shadow-black/5 before:!rounded-[calc(var(--radius-2xl)+10px)] before:!backdrop-blur-none`}
        classNames={{ body: "flex min-h-0 flex-1 flex-col" }}
      >
        <p className="relative mb-3 shrink-0 font-mono text-[10px] uppercase tracking-wider text-fg-subtle">{name}</p>
        <div className={`relative min-h-0 flex-1 ${overflowVisible ? "" : "overflow-hidden"}`}>
          {near && <Fit clip={!overflowVisible}>{children}</Fit>}
        </div>
      </Card>
      <span data-hero-spill aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-2xl" />
    </div>
  );
}
