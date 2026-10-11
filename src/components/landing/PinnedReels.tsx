import { lazy, Suspense, useEffect, useRef, useState } from "react";
import ParticleTrail from "./ParticleTrail";
import { Heading } from "./HomeSections";
import { useStepSnap } from "./useStepSnap";
import { useCountUp } from "./hooks";
import { COMPONENT_MENU } from "../../constant/component_menu";
import { ACCENTS, PRESET_ACCENTS } from "../../core/theme";
import { ANIMATED_VARIANTS } from "../../core/animated";
import { TRANSITIONS } from "../../core/motion";

const HeroPremium = lazy(() => import("./HeroPremium"));

const STEPS = 6; // how many times the reels pause to let you look at the cards
const HOLD = 0.4; // share of each step spent standing still
const smooth = (x: number) => x * x * (3 - 2 * x);

const TOTAL_COMPONENTS = new Set(COMPONENT_MENU.filter((g) => g.items?.length).flatMap((g) => g.items!.map((i) => i.label))).size;

function Stat({ target, suffix = "", label, active }: { target: number; suffix?: string; label: string; active: boolean }) {
  const n = useCountUp(target, active);
  return (
    <div className="px-1 py-2.5 text-center md:px-3 md:py-4">
      <p className="lp-clay-text lp-stat-num text-xl tabular-nums md:text-3xl">
        <span className="lp-clay-shaded">
          <span className="lp-clay-ink">
            {n}
            {suffix}
          </span>
        </span>
      </p>
      <span className="mx-auto mt-1.5 block h-px w-5 bg-gradient-to-r from-transparent via-accent-500 to-transparent" aria-hidden="true" />
      <p className="mt-1.5 font-mono text-[8px] uppercase leading-tight tracking-[0.1em] text-fg-subtle md:text-[9px] md:tracking-[0.18em]">{label}</p>
    </div>
  );
}

// Where the reels stand still: during the hold at the start of each step, and at the very end.
const REST = [...Array.from({ length: STEPS }, (_, i) => (i + HOLD / 2) / STEPS), 1];

/** Scroll progress 0..1 → the same progress, but with a stop after every step. */
function withStops(p: number) {
  const s = Math.min(STEPS, Math.max(0, p * STEPS));
  const i = Math.min(STEPS - 1, Math.floor(s));
  const f = s - i;
  const moving = Math.min(1, Math.max(0, (f - HOLD) / (1 - HOLD)));
  return (i + smooth(moving)) / STEPS;
}

/** The live component cards. The stage pins to the screen while you scroll; the two reels move only with the scroll and stop after every step, so each group of cards can be looked at (or used). */
export default function PinnedReels() {
  const track = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const progress = useRef(0);
  useStepSnap(track, stage, REST);
  // The stats row above the cards appears once the stage has pinned and the scrolling through the cards has begun.
  const [started, setStarted] = useState(false);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = track.current;
    const card = stage.current;
    if (!el || !card) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const top = parseFloat(getComputedStyle(card).top) || 0;
      const span = Math.max(1, r.height - card.offsetHeight);
      const raw = Math.min(1, Math.max(0, (top - r.top) / span));
      progress.current = withStops(raw);
      const on = raw > 0.004;
      if (on !== startedRef.current) {
        startedRef.current = on;
        setStarted(on);
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true, capture: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll, { capture: true });
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section className="relative isolate mx-auto max-w-[100vw] pt-16 md:pt-24">
      <ParticleTrail />
      <div className="px-5">
        <Heading eyebrow="Real components" title="Forms, data and feedback that just work" body="Everything here is the library itself — live and interactive. Scroll to move through the cards; it stops after each group so you can try them." />
      </div>
      <div ref={track} style={{ height: `${STEPS * 60 + 60}vh` }}>
        <div ref={stage} className="sticky top-[max(5rem,calc(50vh-15rem))] z-20 flex items-center md:top-[max(5rem,calc(50vh-19rem))]">
          <div className="w-full">
            {/* The clay stat numbers are lit by this filter (see .lp-clay-text in landing.css). */}
            <svg width="0" height="0" aria-hidden className="pointer-events-none absolute">
              <filter id="lp-clay-soft" x="-20%" y="-35%" width="140%" height="190%" colorInterpolationFilters="sRGB">
                <feGaussianBlur in="SourceAlpha" stdDeviation="3.2" result="bump" />
                <feDiffuseLighting in="bump" surfaceScale="2" diffuseConstant="1" lightingColor="#fff" result="diffuse">
                  <feDistantLight azimuth="233" elevation="52" />
                </feDiffuseLighting>
                <feComposite in="SourceGraphic" in2="diffuse" operator="arithmetic" k1="1.22" k2="0" k3="0" k4="0" result="shaded" />
                <feComposite in="shaded" in2="SourceAlpha" operator="in" result="body" />
                <feMerge>
                  <feMergeNode in="body" />
                </feMerge>
              </filter>
            </svg>
            <div className={`mx-auto max-w-3xl px-4 pb-4 pt-2 md:px-5 md:pb-6 md:pt-4 transition-all duration-700 ease-out ${started ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-3 opacity-0"}`}>
              <div
                data-spill-target
                className="relative grid grid-cols-4 overflow-hidden rounded-2xl border border-border bg-surface/60 shadow-xl shadow-black/5 md:rounded-3xl [&>div]:border-border [&>div:not(:last-of-type)]:border-r"
              >
                <Stat active={started} target={TOTAL_COMPONENTS} suffix="+" label="Components" />
                <Stat active={started} target={TRANSITIONS.length} label="Enter transitions" />
                <Stat active={started} target={ANIMATED_VARIANTS.length} label="Attention effects" />
                <Stat active={started} target={ACCENTS.length + PRESET_ACCENTS.length} suffix="+" label="Accent colors" />
                <span data-hero-spill aria-hidden="true" className="pointer-events-none absolute inset-0" />
              </div>
            </div>
            <Suspense fallback={<div className="min-h-[30rem]" />}>
              <HeroPremium progress={progress} />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
}
