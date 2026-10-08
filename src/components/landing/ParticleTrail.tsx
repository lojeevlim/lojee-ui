import { useEffect, useRef } from "react";
import { isScrolling } from "./scrollState";

type Dust = { x: number; y: number; vx: number; vy: number; life: number; decay: number; size: number };

const MAX_DUST = 140;
/** Where the trail shows: the hero card reels and the hero heading. */
const ZONES = "[data-hero-track], .lp-clay-text";
/** Controls keep their own cursor and no trail. */
const INTERACTIVE = "input,textarea,select,button,a,label,[role='slider'],[role='tab'],[contenteditable]";

/**
 * A tail of fading particles in the theme accent colour that follows the mouse while it is over the hero reels or the hero heading.
 * One canvas over its parent element, drawn only while the pointer is in a zone or the tail is still fading. The native cursor stays.
 * Skipped for touch pointers and with reduced motion.
 */
export default function ParticleTrail() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const probe = useRef<HTMLSpanElement>(null);

  // Imperative canvas + native listeners, so the React tree never re-renders for it.
  useEffect(() => {
    const cv = canvas.current;
    const el = cv?.parentElement;
    const ctx = cv?.getContext("2d");
    if (!cv || !el || !ctx) return;
    const f = { hx: 0, hy: 0, tx: 0, ty: 0, px: 0, py: 0, on: false, press: false, raf: 0, last: 0, tick: 0, color: "#8b5cf6", glow: false, w: 0, h: 0, dpr: 1, dust: [] as Dust[] };

    const loop = (now: number) => {
      const dt = Math.min(48, now - (f.last || now));
      f.last = now;
      if (f.tick++ % 20 === 0 && probe.current) {
        f.color = getComputedStyle(probe.current).color;
        f.glow = document.documentElement.dataset.theme === "dark";
      }
      // The emitter eases after the pointer and sheds dust along its path (more when it moves faster, a burst while pressed).
      f.hx += (f.tx - f.hx) * 0.35;
      f.hy += (f.ty - f.hy) * 0.35;
      if (f.on && !isScrolling()) {
        const dist = Math.hypot(f.hx - f.px, f.hy - f.py);
        const n = Math.min(6, Math.floor(dist / 5) + (f.press ? 3 : 0) + (Math.random() < 0.25 ? 1 : 0));
        for (let i = 0; i < n && f.dust.length < MAX_DUST; i++) {
          const t = Math.random();
          const ang = Math.random() * Math.PI * 2;
          const sp = (f.press ? 0.06 : 0.018) + Math.random() * 0.03;
          f.dust.push({ x: f.px + (f.hx - f.px) * t + (Math.random() - 0.5) * 6, y: f.py + (f.hy - f.py) * t + (Math.random() - 0.5) * 6, vx: Math.cos(ang) * sp, vy: Math.sin(ang) * sp + 0.006, life: 1, decay: 0.0011 + Math.random() * 0.0011, size: 1.2 + Math.random() * 2.4 });
        }
      }
      f.px = f.hx;
      f.py = f.hy;
      ctx.setTransform(f.dpr, 0, 0, f.dpr, 0, 0);
      ctx.clearRect(0, 0, f.w, f.h);
      ctx.fillStyle = f.color;
      // Dark mode: the dust reads as light: additive blending plus a soft halo in its own colour.
      ctx.globalCompositeOperation = f.glow ? "lighter" : "source-over";
      ctx.shadowColor = f.color;
      ctx.shadowBlur = f.glow ? 14 : 0;
      for (let i = f.dust.length - 1; i >= 0; i--) {
        const d = f.dust[i];
        d.life -= d.decay * dt;
        if (d.life <= 0) { f.dust.splice(i, 1); continue; }
        d.x += d.vx * dt;
        d.y += d.vy * dt;
        ctx.globalAlpha = d.life * 0.9;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.size * (0.4 + d.life * 0.6), 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
      ctx.shadowBlur = 0;
      f.raf = f.on || f.dust.length ? requestAnimationFrame(loop) : 0;
      if (!f.raf) f.last = 0;
    };
    const wake = () => { if (!f.raf) f.raf = requestAnimationFrame(loop); };

    const size = () => {
      const r = el.getBoundingClientRect();
      f.dpr = Math.min(2, window.devicePixelRatio || 1);
      f.w = r.width;
      f.h = r.height;
      cv.width = Math.round(r.width * f.dpr);
      cv.height = Math.round(r.height * f.dpr);
    };
    size();
    const ro = new ResizeObserver(size);
    ro.observe(el);

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const t = e.target as HTMLElement;
      const on = !!t.closest(ZONES) && !t.closest(INTERACTIVE);
      const r = el.getBoundingClientRect();
      f.tx = e.clientX - r.left;
      f.ty = e.clientY - r.top;
      if (on && !f.on) { f.hx = f.px = f.tx; f.hy = f.py = f.ty; }
      f.on = on;
      if (on) wake();
    };
    const onLeave = () => { f.on = false; };
    const onDown = () => { f.press = true; wake(); };
    const onUp = () => { f.press = false; };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    el.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      ro.disconnect();
      cancelAnimationFrame(f.raf);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      el.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, []);

  return (
    <>
      {/* Resolves the theme accent to a real colour string for the canvas. */}
      <span ref={probe} aria-hidden="true" className="lp-trail-probe pointer-events-none absolute h-0 w-0" />
      <canvas ref={canvas} aria-hidden="true" className="pointer-events-none absolute inset-0 z-[60] h-full w-full [@media(hover:none)]:hidden" />
    </>
  );
}
