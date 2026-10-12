import { useEffect, useId, useRef, type ReactNode, type RefObject } from "react";

export interface SmokeBendOptions {
  /** Turns the effect off (nothing is created, nothing runs). */
  enabled: boolean;
  /** The element that is bent (it gets the SVG filter while the bend is alive). */
  target: RefObject<HTMLElement | null>;
  /** The element whose size the pointer positions are measured in (usually the same one, or the one around it). */
  region: RefObject<HTMLElement | null>;
  /** Ease the bend to nothing very near the edges (the default is a little wider), for things that sit right at them. */
  edgeLight?: boolean;
  /** Soften the bend map, for thin or hard-edged shapes (lines, text, wedges), so the bent edges do not show steps. */
  soft?: boolean;
  /** Also blur the bent result slightly, to hide stair-steps on thin shapes such as text (costs one more filter pass). */
  smooth?: boolean;
}

interface Wake {
  gw: number;
  gh: number;
  vx: Float32Array;
  vy: Float32Array;
  edge: Float32Array;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  img: ImageData;
  raf: number;
}

/**
 * The "smoke" hover bend of AppBackground, as a hook so anything can use it. While the pointer moves over `region` it leaves a wake (a small field of push vectors) that an SVG
 * displacement filter on `target` uses to bend it like smoke a hand passes through; the wake fades, so the target flows back. The loop and the filter only run while something is left to relax.
 *
 * Returns `filter` (render it once, anywhere: an invisible <svg>), `push` (call it with the pointer's position in `region` and how far it moved since last time) and `leave` (call it when the
 * pointer leaves). Times are the pointer events' timeStamp.
 */
export function useSmokeBend({ enabled, target, region, edgeLight = false, soft = false, smooth = false }: SmokeBendOptions): { filter: ReactNode; push: (x: number, y: number, dx: number, dy: number, time: number) => void; leave: () => void } {
  const id = `${useId().replace(/[^a-zA-Z0-9]/g, "")}wake`;
  const img = useRef<SVGFEImageElement>(null);
  const wake = useRef<Wake | null>(null);
  const hand = useRef({ x: 0, y: 0, inside: false, t: 0 });

  // The wake: one vector per cell of a small grid (64 wide), drawn into a tiny canvas that the filter reads as its displacement map. Each frame it decays a little, so the bend relaxes back
  // smoothly. The map is redrawn on every frame so the bend follows the pointer without any stepping; it is kept this small to make each frame cheap.
  const tick = (now: number) => {
    const w = wake.current;
    const el = target.current;
    if (!w || !el) return;
    w.raf = 0;
    const h = hand.current;
    if (h.inside && now - h.t < 450) stir(h.x, h.y, 0, 0, 0.07, false); // a hand resting in the smoke keeps a gap open for a moment
    const { vx, vy, edge, img: data } = w;
    let energy = 0;
    for (let i = 0; i < vx.length; i++) {
      const a = vx[i];
      const b = vy[i];
      if (a === 0 && b === 0) continue;
      vx[i] = a * 0.945;
      vy[i] = b * 0.945;
      const m = Math.abs(vx[i]) + Math.abs(vy[i]);
      if (m < 0.006) vx[i] = vy[i] = 0;
      else if (m > energy) energy = m;
    }
    // draw the field (the filter samples from where the smoke came from, so the encoded vector points the opposite way to the push)
    for (let i = 0; i < vx.length; i++) {
      data.data[i * 4] = 127.5 - vx[i] * edge[i] * 127.5;
      data.data[i * 4 + 1] = 127.5 - vy[i] * edge[i] * 127.5;
      data.data[i * 4 + 2] = 128;
      data.data[i * 4 + 3] = 255;
    }
    w.ctx.putImageData(data, 0, 0);
    const url = w.canvas.toDataURL();
    img.current?.setAttribute("href", url);
    img.current?.setAttributeNS("http://www.w3.org/1999/xlink", "href", url);
    if (energy > 0.03) w.raf = requestAnimationFrame(tick);
    else el.style.filter = "";
  };
  function stir(x: number, y: number, dx: number, dy: number, radial: number, schedule = true) {
    const box = region.current;
    const el = target.current;
    if (!box || !el) return;
    const W = box.clientWidth || 1;
    const H = box.clientHeight || 1;
    let w = wake.current;
    const gh0 = Math.max(32, Math.round((64 * H) / W));
    if (!w || Math.abs(w.gh - gh0) > 2) {
      const gw = 64;
      const gh = gh0;
      const canvas = document.createElement("canvas");
      canvas.width = gw;
      canvas.height = gh;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      // the push eases to nothing toward the edges, so the filter never samples from outside the box (which would leave a gap)
      const edge = new Float32Array(gw * gh);
      const ex = edgeLight ? 0.025 : 0.1;
      const ey = edgeLight ? 0.03 : 0.14;
      for (let j = 0; j < gh; j++) for (let i = 0; i < gw; i++) edge[j * gw + i] = Math.min(1, Math.min(i, gw - 1 - i) / (gw * ex), Math.min(j, gh - 1 - j) / (gh * ey));
      w = wake.current = { gw, gh, vx: new Float32Array(gw * gh), vy: new Float32Array(gw * gh), edge, canvas, ctx, img: ctx.createImageData(gw, gh), raf: 0 };
    }
    const { gw, gh, vx, vy } = w;
    const gx = (x / W) * gw;
    const gy = (y / H) * gh;
    const sigma = gw * 0.12;
    const speed = Math.hypot(dx, dy);
    const mx = speed ? dx / speed : 0;
    const my = speed ? dy / speed : 0;
    const drag = Math.min(1, speed / 26) * 0.55;
    const aspect = W / gw / (H / gh); // cells are not square on screen
    const x0 = Math.max(0, Math.floor(gx - sigma * 3));
    const x1 = Math.min(gw - 1, Math.ceil(gx + sigma * 3));
    const y0 = Math.max(0, Math.floor(gy - sigma * 3));
    const y1 = Math.min(gh - 1, Math.ceil(gy + sigma * 3));
    for (let j = y0; j <= y1; j++) {
      for (let i = x0; i <= x1; i++) {
        const ddx = i - gx;
        const ddy = (j - gy) * aspect;
        const d2 = ddx * ddx + ddy * ddy;
        const wt = Math.exp(-d2 / (2 * sigma * sigma));
        const d = Math.sqrt(d2) || 1;
        const k = j * gw + i;
        const rad = radial * Math.min(1, d / (sigma * 0.7)); // no push right at the centre, where its direction is undefined (it would pinch to a point)
        vx[k] = Math.max(-1, Math.min(1, vx[k] + wt * (mx * drag + (ddx / d) * rad)));
        vy[k] = Math.max(-1, Math.min(1, vy[k] + wt * (my * drag + (ddy / d) * rad)));
      }
    }
    if (!el.style.filter) el.style.filter = `url(#${id})`;
    if (schedule && !w.raf) w.raf = requestAnimationFrame(tick);
  }

  useEffect(
    () => () => {
      if (wake.current) cancelAnimationFrame(wake.current.raf);
    },
    []
  );

  const filter = enabled ? (
    <svg width="0" height="0" aria-hidden="true" className="absolute">
      <defs>
        <filter id={id} x="0" y="0" width="1" height="1" primitiveUnits="objectBoundingBox" colorInterpolationFilters="sRGB">
          <feImage ref={img} x="0" y="0" width="1" height="1" preserveAspectRatio="none" result="m0" />
          {soft && <feGaussianBlur in="m0" stdDeviation="0.011 0.02" result="map" />}
          <feDisplacementMap in="SourceGraphic" in2={soft ? "map" : "m0"} scale="0.28" xChannelSelector="R" yChannelSelector="G" result="bent" />
          {smooth && <feGaussianBlur in="bent" stdDeviation="0.0005 0.0025" />}
        </filter>
      </defs>
    </svg>
  ) : null;

  return {
    filter,
    push: (x, y, dx, dy, time) => {
      if (!enabled) return;
      const h = hand.current;
      h.x = x;
      h.y = y;
      h.inside = true;
      h.t = time;
      if (Math.hypot(dx, dy) > 1.5) stir(x, y, dx, dy, 0.06);
    },
    leave: () => {
      hand.current.inside = false;
    },
  };
}
