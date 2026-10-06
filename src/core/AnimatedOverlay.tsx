import { useEffect, useRef, type CSSProperties } from "react";
import { parseAnimated, type AnimatedProp } from "./animated";

// One shared scroll tracker for every "particles" / "tail" overlay on the page: a single passive capture listener that sees the scroll of
// the window AND of any scrolling container (a docs page's panel, a modal body…), so each overlay reacts to whatever scrolls it.
// It reports whether that is scrolling, which way and how fast, so a screen full of animated elements costs one listener.
type ScrollInfo = { scrolling: boolean; dir: "down" | "up"; tail: number };
type Subscriber = (info: ScrollInfo, target: EventTarget | null) => void;
const subscribers = new Set<Subscriber>();
let tracking = false;
function trackScroll() {
  if (tracking || typeof document === "undefined") return;
  tracking = true;
  const last = new WeakMap<object, number>();
  let idle = 0;
  // Scroll events don't bubble, but they can be caught in the capture phase on the document.
  document.addEventListener(
    "scroll",
    (e) => {
      const t = e.target;
      const pos = t === document ? window.scrollY : t instanceof Element ? t.scrollTop : 0;
      // The first scroll event seen for a target counts from the top (where nearly every scroller starts).
      const prev = last.get(t as object) ?? 0;
      last.set(t as object, pos);
      const delta = pos - prev;
      if (delta === 0) return;
      const info: ScrollInfo = { scrolling: true, dir: delta > 0 ? "down" : "up", tail: Math.min(120, 30 + Math.abs(delta) * 2.4) };
      subscribers.forEach((fn) => fn(info, t));
      window.clearTimeout(idle);
      idle = window.setTimeout(() => subscribers.forEach((fn) => fn({ ...info, scrolling: false }, null)), 240);
    },
    { capture: true, passive: true }
  );
}

/** Keeps `data-dir` / `data-scrolling` / `--lojee-tail` on the overlay in step with the scroll of whatever contains it (or the page). */
function usePageScroll(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    trackScroll();
    const apply: Subscriber = (info, target) => {
      const el = ref.current;
      if (!el) return;
      if (info.scrolling && target && target !== document && !(target instanceof Node && target.contains(el))) return;
      el.setAttribute("data-dir", info.dir);
      el.style.setProperty("--lojee-tail", `${info.tail}px`);
      if (info.scrolling) el.setAttribute("data-scrolling", "");
      else el.removeAttribute("data-scrolling");
    };
    subscribers.add(apply);
    return () => {
      subscribers.delete(apply);
    };
  }, [ref]);
}

// A fixed crowd of ambient particles, laid out once: each starts on the element's edge (an ellipse around it), drifts outward along its own
// direction and distance, and has its own size and delay. Deterministic (no Math.random), so server and client render the same markup.
const AMBIENT = 120;
const rand = (i: number, k: number) => {
  const x = Math.sin(i * 12.9898 + k * 78.233) * 43758.5453;
  return x - Math.floor(x);
};
const AMBIENT_SPARKS = Array.from({ length: AMBIENT }, (_, i) => {
  const a = (i / AMBIENT) * Math.PI * 2 + (rand(i, 1) - 0.5) * 0.5;
  const reach = 16 + rand(i, 2) * 38;
  return {
    left: `${50 + Math.cos(a) * 50}%`,
    top: `${50 + Math.sin(a) * 52}%`,
    "--dx": `${(Math.cos(a) * reach).toFixed(1)}px`,
    "--dy": `${(Math.sin(a) * reach).toFixed(1)}px`,
    "--d": `${(rand(i, 3) * 2).toFixed(2)}s`,
    "--sz": `${(3 + rand(i, 4) * 3.5).toFixed(1)}px`,
  } as CSSProperties;
});

/** "particles": specks drift off the element all the time and shoot out faster while the page scrolls; clicking it sends out one pulse —
 *  a thin ripple ring with two fainter echoes behind it, plus a crowd of specks bursting outward, like the dotted scrollbar's end burst. */
function ParticlesOverlay() {
  const ref = useRef<HTMLSpanElement>(null);
  usePageScroll(ref);
  useEffect(() => {
    const host = ref.current?.parentElement;
    const el = ref.current;
    if (!host || !el) return;
    let timer = 0;
    // A click sends out ONE pulse, like the dotted scrollbar's end burst: a ripple ring expands from the element while a crowd of particles flies
    // out of its edge. Each particle is a short-lived element with its own start point on the element's edge,
    // direction, distance, size and delay (set as CSS variables), removed once its animation has played.
    const BURST = 70;
    const onClick = () => {
      const r = host.getBoundingClientRect();
      for (let i = 0; i < BURST; i++) {
        const a = Math.random() * Math.PI * 2;
        const dist = 26 + Math.random() * 62;
        const p = document.createElement("i");
        p.className = "lojee-anim-burst";
        p.style.setProperty("--x", `${r.width / 2 + Math.cos(a) * r.width * 0.46}px`);
        p.style.setProperty("--y", `${r.height / 2 + Math.sin(a) * r.height * 0.46}px`);
        p.style.setProperty("--dx", `${Math.cos(a) * dist}px`);
        p.style.setProperty("--dy", `${Math.sin(a) * dist}px`);
        p.style.setProperty("--sz", `${2 + Math.random() * 4.5}px`);
        p.style.setProperty("--dl", `${Math.random() * 0.07}s`);
        el.appendChild(p);
        window.setTimeout(() => p.remove(), 1500);
      }
      el.removeAttribute("data-click");
      void el.offsetWidth; // restart the specks' pulse on a quick second click
      el.setAttribute("data-click", "");
      window.clearTimeout(timer);
      timer = window.setTimeout(() => el.removeAttribute("data-click"), 1000);
    };
    host.addEventListener("click", onClick);
    return () => {
      host.removeEventListener("click", onClick);
      window.clearTimeout(timer);
    };
  }, []);
  return (
    <span ref={ref} aria-hidden="true" className="lojee-anim-particles" data-dir="down">
      <b className="lojee-anim-click" />
      <b className="lojee-anim-click lojee-anim-click-2" />
      <b className="lojee-anim-click lojee-anim-click-3" />
      {AMBIENT_SPARKS.map((style, i) => (
        <i key={i} className="lojee-anim-spark" style={style} />
      ))}
    </span>
  );
}

/** "tail": while the page scrolls, a soft comet tail streams out behind the element (opposite to the way it appears to move), longer
 *  the faster you scroll — the same trail the dotted scrollbar's dot leaves. */
function TailOverlay() {
  const ref = useRef<HTMLSpanElement>(null);
  usePageScroll(ref);
  return (
    <span ref={ref} aria-hidden="true" className="lojee-anim-tailwrap" data-dir="down">
      <b className="lojee-anim-tail" />
      <u className="lojee-anim-tail-core" />
    </span>
  );
}

/** Overlays for the effects that need an extra element (pulse, sweep, border-spin, particles, tail). Render as the root's last child.
 *  Several can be combined — pass the same value as the root's `animation` prop. */
export function AnimatedOverlay({ variant }: { variant?: AnimatedProp }) {
  const list = parseAnimated(variant);
  if (!list.length) return null;
  return (
    <>
      {list.includes("pulse") && <span aria-hidden="true" className="lojee-anim-ring" />}
      {list.includes("border-spin") && (
        <span aria-hidden="true" className="lojee-anim-border">
          <span />
        </span>
      )}
      {list.includes("sweep") && (
        <span aria-hidden="true" className="lojee-anim-clip">
          <span />
        </span>
      )}
      {list.includes("tail") && <TailOverlay />}
      {list.includes("particles") && <ParticlesOverlay />}
    </>
  );
}
