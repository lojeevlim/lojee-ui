import { useEffect, useId, useRef } from "react";
import type { CSSProperties, PointerEvent, ReactNode } from "react";
import { cx } from "../../../core/tokens";

export type AppBackgroundSide = "left" | "right" | "both";

/** The built-in backgrounds. All of them follow the theme accent and light / dark mode. */
export type AppBackgroundVariant =
  | "side-glow"
  | "top-glow"
  | "bottom-glow"
  | "pinch-glow"
  | "horizon"
  | "aurora"
  | "spotlight"
  | "mesh"
  | "vortex"
  | "embers"
  | "waves"
  | "grid"
  | "dots";

export interface AppBackgroundProps {
  /** Which background to draw (default: "side-glow"): "side-glow", "top-glow", "bottom-glow", "pinch-glow", "horizon", "aurora", "spotlight", "mesh", "vortex", "embers", "waves", "grid" or "dots". */
  variant?: AppBackgroundVariant;
  /** Let the background move: drifting blobs, rising embers, flowing waves (default: true). Always off for users who prefer reduced motion. */
  animated?: boolean;
  /** "side-glow" only: which edge(s) the light comes in from — "both" (default), "left" or "right". */
  side?: AppBackgroundSide;
  /** Glow variants ("side-glow", "top-glow", "bottom-glow", "pinch-glow", "embers"): small points of light drifting through the light (default: true). */
  motes?: boolean;
  /**
   * Fade amount from 0 (fully shown) to 1 (gone); "side-glow" also spreads out from the tip as it fades. Controlled by you — e.g. from a scroll position. When omitted, the value is inherited from a `--sp` CSS variable on an ancestor (so a parent can drive it), and is 0 if there is none.
   */
  progress?: number;
  /**
   * Reacts to the pointer, only around the pointer (default: true). Embers swell and glow as the pointer comes near; horizon releases sparks;
   * moving the pointer through any variant bends it like smoke a hand is passed through (motes and all), and it flows back. On top of that horizon
   * releases sparks, embers swell near the pointer, and grid and dots follow it. Off for users who prefer reduced motion.
   */
  hover?: boolean;
  /** Fades the light out by itself as the page scrolls past it (default: false). Ignored when `progress` is set. */
  scrollFade?: boolean;
  /** "side-glow", "top-glow", "bottom-glow": thickness of each wedge as a share of the container, e.g. "23%" (default: 23% for side-glow, 38% for top / bottom; a little less on small screens). */
  width?: string;
  /** Extra class name(s) applied to the root element — give it a size, a background color, padding… */
  className?: string;
  /** Content drawn on top of the background. The root is already `relative isolate overflow-hidden`, so there is nothing else to add. */
  children?: ReactNode;
}

// Motes drifting along each wedge: they start spread across the wide outer edge and are drawn toward the tip, dimming out as they reach it. Positions are in % of the wedge box (see .lojee-glow-mote in theme.css); the numbers are fixed so server and client markup match.
const MOTES = Array.from({ length: 36 }, (_, i) => {
  const r = (k: number) => {
    const v = Math.sin((i + 1) * 12.9898 + k * 78.233) * 43758.5453;
    return v - Math.floor(v);
  };
  const x0 = r(1) * 14;
  // The wedge's top and bottom edges at x0, so a mote always starts inside the shape (viewBox 400x900, edges from y 50 / 850 at x 0 to y 372 / 528 at x 318).
  const edge = ((x0 * 4) / 318) * 322;
  const top = (50 + edge) / 9 + 3;
  const bottom = (850 - edge) / 9 - 3;
  const y0 = top + r(2) * (bottom - top);
  const tx = 70 + r(3) * 9;
  const ty = 47 + r(4) * 6;
  return { x0, y0, dx: tx - x0, dy: ty - y0, size: 2 + r(5) * 2.5, dur: 5 + r(6) * 4, delay: -r(7) * 9 };
});

type Edge = "left" | "right" | "top" | "bottom";

// The wedge's outline, drawn pointing in from the left; the top / bottom ones are the same shape with x and y swapped.
const SHAPE_H = "M0 50 L318 372 Q392 450 318 528 L0 850 Z";
const SHAPE_V = "M50 0 L372 318 Q450 392 528 318 L850 0 Z";

/** One glowing wedge pointing in from an edge. The right / bottom ones are the left / top ones mirrored; the fill follows the theme accent. */
function Wedge({ edge, motes, width, className, shape: showShape = true, even = false }: { edge: Edge; motes: boolean; width?: string; className?: string; shape?: boolean; even?: boolean }) {
  const id = `lojee-glow-${edge}${even ? "-even" : ""}`; // (ids are shared page-wide, so the evenly shaded copy needs its own)
  const v = edge === "top" || edge === "bottom";
  const shape = v ? SHAPE_V : SHAPE_H;
  const place = { left: "top-0 left-0 h-full w-[24%] md:w-[23%]", right: "lojee-glow-right top-0 right-0 h-full w-[24%] md:w-[23%]", top: "left-0 top-0 w-full h-[34%] md:h-[38%]", bottom: "lojee-glow-bottom bottom-0 left-0 w-full h-[34%] md:h-[38%]" }[edge];
  return (
    <div className={cx("lojee-glow-wrap pointer-events-none absolute opacity-40 md:opacity-100", className ?? place)} style={width ? (v ? { height: width } : { width }) : undefined}>
      {motes && (
        <div className={cx("lojee-glow-motes absolute inset-0", v && "lojee-glow-v")} aria-hidden="true">
          {MOTES.map((m, i) => (
            <span
              key={i}
              className="lojee-glow-mote"
              style={{ left: `${v ? m.y0 : m.x0}%`, top: `${v ? m.x0 : m.y0}%`, width: m.size, height: m.size, "--dx": v ? m.dy : m.dx, "--dy": v ? m.dx : m.dy, animationDuration: `${m.dur}s`, animationDelay: `${m.delay}s` } as CSSProperties}
            />
          ))}
        </div>
      )}
      {showShape && (
        <svg viewBox={v ? "0 0 900 400" : "0 0 400 900"} preserveAspectRatio="none" aria-hidden="true" className={cx("lojee-glow h-full w-full overflow-visible", v && "lojee-glow-v")}>
          <defs>
            {/* Body: dark and transparent at the outer edge, warming through the accent toward the tip. */}
            <linearGradient id={`${id}-fill`} x1="0" y1="0" x2={v ? 0 : 1} y2={v ? 1 : 0}>
              <stop offset="0" style={{ stopColor: "var(--color-accent-950)", stopOpacity: 0 }} />
              <stop offset="0.38" style={{ stopColor: "var(--color-accent-900)", stopOpacity: 0.1 }} />
              <stop offset="0.68" style={{ stopColor: "var(--color-accent-600)", stopOpacity: 0.36 }} />
              <stop offset="0.9" style={{ stopColor: "var(--color-accent-400)", stopOpacity: 0.78 }} />
              <stop offset="1" style={{ stopColor: "var(--color-accent-300)", stopOpacity: 0.92 }} />
            </linearGradient>
            {/* Volume: lit from above, shaded below, so the wedge reads as a solid, slightly rounded form rather than a flat shape. */}
            <linearGradient id={`${id}-volume`} x1="0" y1="0" x2={v ? 1 : 0} y2={v ? 0 : 1}>
            {even ? (
              <>
                {/* the same shading on both sides: a little shade toward both edges and none in the middle (so no band shows inside the opening) */}
                <stop offset="0" style={{ stopColor: "var(--color-accent-950)", stopOpacity: 0.3 }} />
                <stop offset="0.28" style={{ stopColor: "var(--color-accent-950)", stopOpacity: 0 }} />
                <stop offset="0.72" style={{ stopColor: "var(--color-accent-950)", stopOpacity: 0 }} />
                <stop offset="1" style={{ stopColor: "var(--color-accent-950)", stopOpacity: 0.3 }} />
              </>
            ) : (
              <>
                <stop offset="0" style={{ stopColor: "var(--color-accent-100)", stopOpacity: 0.3 }} />
                <stop offset="0.42" style={{ stopColor: "var(--color-accent-200)", stopOpacity: 0 }} />
                <stop offset="0.58" style={{ stopColor: "var(--color-accent-950)", stopOpacity: 0 }} />
                <stop offset="1" style={{ stopColor: "var(--color-accent-950)", stopOpacity: 0.4 }} />
              </>
            )}
          </linearGradient>
            {/* The core of light at the tip, and a wider bloom that spills past it into the page. */}
            <radialGradient id={`${id}-core`} cx="0.5" cy="0.5" r="0.5">
              <stop offset="0" style={{ stopColor: "var(--color-accent-100)", stopOpacity: 0.95 }} />
              <stop offset="0.4" style={{ stopColor: "var(--color-accent-300)", stopOpacity: 0.6 }} />
              <stop offset="1" style={{ stopColor: "var(--color-accent-400)", stopOpacity: 0 }} />
            </radialGradient>
            <radialGradient id={`${id}-bloom`} cx="0.5" cy="0.5" r="0.5">
              <stop offset="0" style={{ stopColor: "var(--color-accent-400)", stopOpacity: 0.42 }} />
              <stop offset="0.55" style={{ stopColor: "var(--color-accent-500)", stopOpacity: 0.14 }} />
              <stop offset="1" style={{ stopColor: "var(--color-accent-500)", stopOpacity: 0 }} />
            </radialGradient>
            <clipPath id={`${id}-clip`}>
              <path d={shape} />
            </clipPath>
          </defs>
          {v ? <ellipse cx="450" cy="338" rx="300" ry="230" fill={`url(#${id}-bloom)`} /> : <ellipse cx="338" cy="450" rx="230" ry="300" fill={`url(#${id}-bloom)`} />}
          <path d={shape} fill={`url(#${id}-fill)`} />
          <path d={shape} fill={`url(#${id}-volume)`} />
          <g clipPath={`url(#${id}-clip)`}>{v ? <ellipse cx="450" cy="318" rx="190" ry="150" fill={`url(#${id}-core)`} /> : <ellipse cx="318" cy="450" rx="150" ry="190" fill={`url(#${id}-core)`} />}</g>
        </svg>
      )}
    </div>
  );
}

/** A fixed pseudo-random number for item `i`, stream `k` (same on server and client). */
const rnd = (i: number, k: number) => {
  const v = Math.sin((i + 1) * 91.3458 + k * 47.853) * 43758.5453;
  return v - Math.floor(v);
};
const range = (n: number) => Array.from({ length: n }, (_, i) => i);
const px = (v: number, k: number, i: number) => `${(rnd(i, k) * v).toFixed(2)}`;

// Motes of "pinch-glow": they climb the dome along its curve, from the base corners all the way up to the tip: all of them inside the glowing band (between its inner and outer edge). The bent
// dome's tip stands above the wedge's box, so each follows a few points along the curve; positions are in % of the wedge's box (x across, y down; negative is above it) and what is stored is
// each point as an offset from where the particle starts.
const PINCH_CURVE_OUT = [[6, 100], [12, 66], [21, 24], [35, -26], [49.5, -52]]; // the left half of the outside of the curve (the right half is its mirror image)
const PINCH_CURVE_IN = [[17, 100], [19, 70], [27, 30], [40, -20], [49.5, -46]]; // and of the inside
const PINCH_SIDE_MOTES = range(44).map((i) => {
  const left = i % 2 === 0;
  const w = 0.2 + rnd(i, 10) * 0.6; // where across the glowing band it travels: 0 is its inner edge, 1 its outer edge, so it always stays inside the rounded body
  const j = () => (rnd(i, 8) - 0.5) * 1.6; // a little scatter around its line
  const pts = PINCH_CURVE_OUT.map(([ox, oy], k) => {
    const [ix, iy] = PINCH_CURVE_IN[k];
    const x = ix + (ox - ix) * w;
    const y = iy + (oy - iy) * w;
    const last = k === PINCH_CURVE_OUT.length - 1;
    return [(left ? x : 100 - x) + (last ? (left ? -1 : 1) * rnd(i, 3) * 0.8 : j() * (k === 0 ? 2 : 1)), y + (k === 0 ? -rnd(i, 2) * 5 : last ? rnd(i, 4) * 2 : j())];
  });
  const [x0, y0] = pts[0];
  const off = (k: number) => [pts[k][0] - x0, pts[k][1] - y0];
  const [a1, a2, a3, a4] = [off(1), off(2), off(3), off(4)];
  return { x: x0, y: y0, a1, a2, a3, a4, size: 1 + rnd(i, 5) * 1.3, dur: 5.5 + rnd(i, 6) * 4, delay: -rnd(i, 7) * 10 };
});
const EMBERS = range(34).map((i) => ({ x: px(100, 1, i), size: 2 + rnd(i, 2) * 2.5, dur: 6 + rnd(i, 3) * 7, delay: -rnd(i, 4) * 12, sway: Math.round((rnd(i, 5) - 0.5) * 120) }));

/** A wave outline `periods` * 2 half-waves wide, as a closed path filled down to the bottom of a 320-high box. */
const wavePath = (amp: number, base: number, halves: number, seg: number) => {
  let d = `M0 ${base} Q ${seg / 2} ${base - amp * 2} ${seg} ${base}`;
  for (let i = 1; i < halves; i++) d += ` T ${seg * (i + 1)} ${base}`;
  return `${d} L ${seg * halves} 320 L 0 320 Z`;
};
const WAVES = [
  { d: wavePath(26, 120, 8, 360), cls: "lojee-bg-wave-1" },
  { d: wavePath(20, 160, 8, 360), cls: "lojee-bg-wave-2" },
  { d: wavePath(15, 205, 8, 360), cls: "lojee-bg-wave-3" },
];

// Variants whose hover effect is made of little elements spawned along the pointer path: sparks off the horizon.
const FX_KIND: Partial<Record<AppBackgroundVariant, "spark">> = { horizon: "spark" };

// Variants that behave like smoke under the pointer: the pointer leaves a "wake" (a small vector field, see wakePush below) that an SVG displacement filter uses to bend the
// picture, and the wake fades away so the smoke flows back. The filter is only attached while the wake is alive.
const WAKE_VARIANTS: AppBackgroundVariant[] = ["side-glow", "top-glow", "bottom-glow", "pinch-glow", "horizon", "aurora", "spotlight", "mesh", "vortex", "embers", "waves", "grid", "dots"]; // every variant
// The glows sit right at the edges of the box (and are transparent there), so the push does not need to ease out toward the edges for them.
const EDGE_LIGHT: AppBackgroundVariant[] = ["side-glow", "top-glow", "bottom-glow", "pinch-glow"];
// Variants with hard-edged shapes (waves, glow wedges, thin lines): bending them would show the little grid of the push map as steps along the edges, so the map gets a slight blur.
const HARD_EDGES: AppBackgroundVariant[] = ["waves", "side-glow", "top-glow", "bottom-glow", "pinch-glow", "horizon", "grid", "dots"];
// Variants that read the pointer position from --mx / --my.
const FOLLOW_VARIANTS: AppBackgroundVariant[] = ["grid", "dots"];

/** Adds one spark (it removes itself when its animation ends) to `layer` at x / y px. */
function spawnSpark(layer: HTMLElement, x: number, y: number) {
  if (layer.childElementCount > 46) return;
  const rand = (a: number, b: number) => a + Math.random() * (b - a);
  const el = document.createElement("span");
  el.className = "lojee-fx-spark";
  el.style.left = `${x}px`;
  el.style.top = `${y}px`;
  el.style.setProperty("--s", `${rand(3, 6.5)}px`);
  el.style.setProperty("--rise", `${rand(70, 170)}px`);
  el.style.setProperty("--sway", `${rand(-34, 34)}px`);
  el.style.setProperty("--d", `${rand(1.8, 3)}s`);
  el.addEventListener("animationend", () => el.remove(), { once: true });
  layer.appendChild(el);
}

/**
 * The bend a pointer leaves when it rests in the light, held still: runs the same push and decay as the pointer's wake (see wakePush below) until it settles, and returns it as a
 * small PNG data URL for an SVG displacement filter. (cx, cy) is where the pointer rests, as a share of the box. It is made once per size, so showing it costs nothing per frame.
 */
function restingBendUrl(cx: number, cy: number): string {
  // The map is laid out in shares of the box (not pixels) and does not depend on its size: the grid has the proportions of a box 2.1 times as wide as it is tall (so the cells are square there), and
  // for any other box everything just scales with it, the bend's width with the box's width and its height with the box's height. That keeps the dome, and the particle paths measured in the same shares, lined up at every size.
  const gw = 160;
  const gh = Math.round(gw / 2.1);
  const vx = new Float32Array(gw * gh);
  const vy = new Float32Array(gw * gh);
  const sigma = gw * 0.17; // 17% of the box width, whatever the grid's resolution
  const gx = cx * gw;
  const gy = cy * gh;
  for (let frame = 0; frame < 70; frame++) {
    for (let j = 0; j < gh; j++) {
      for (let i = 0; i < gw; i++) {
        const k = j * gw + i;
        vx[k] *= 0.955;
        vy[k] *= 0.955;
        const ddx = i - gx;
        const ddy = j - gy;
        const d2 = ddx * ddx + ddy * ddy;
        if (d2 > 9 * sigma * sigma) continue;
        const wt = Math.exp(-d2 / (2 * sigma * sigma));
        const d = Math.sqrt(d2) || 1;
        const rad = 0.1 * Math.min(1, d / (sigma * 0.7));
        vx[k] = Math.max(-1, Math.min(1, vx[k] + wt * (ddx / d) * rad));
        vy[k] = Math.max(-1, Math.min(1, vy[k] + wt * (ddy / d) * rad));
        if (j > gy) vy[k] = Math.min(vy[k], 0); // nothing is pushed downward below the resting point, which is what made a small second ring near the bottom
      }
    }
  }
  // make the bend exactly mirror-symmetric about the middle, so the dome is perfectly even left to right
  for (let j = 0; j < gh; j++) {
    for (let i = 0; i < gw / 2; i++) {
      const a = j * gw + i;
      const b = j * gw + (gw - 1 - i);
      const x = (vx[a] - vx[b]) / 2;
      const y = (vy[a] + vy[b]) / 2;
      vx[a] = x;
      vx[b] = -x;
      vy[a] = y;
      vy[b] = y;
    }
  }
  const canvas = document.createElement("canvas");
  canvas.width = gw;
  canvas.height = gh;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";
  const img = ctx.createImageData(gw, gh);
  for (let j = 0; j < gh; j++) {
    for (let i = 0; i < gw; i++) {
      const k = j * gw + i;
      const edge = Math.min(1, Math.min(i, gw - 1 - i) / (gw * 0.025), Math.min(j, gh - 1 - j) / (gh * 0.03));
      // the filter samples from where the light came from, so the encoded vector points the opposite way to the push
      img.data[k * 4] = 127.5 - vx[k] * edge * 127.5;
      img.data[k * 4 + 1] = 127.5 - vy[k] * edge * 127.5;
      img.data[k * 4 + 2] = 128;
      img.data[k * 4 + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  return canvas.toDataURL();
}

let pinchBendUrl: string | undefined;

/** The layer(s) of one variant. */
function Layers({ variant, side, motes, width, holdUrl }: { variant: AppBackgroundVariant; side: AppBackgroundSide; motes: boolean; width?: string; holdUrl: string }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  switch (variant) {
    case "aurora":
      return (
        <div className="lojee-bg lojee-bg-layer">
          {range(7).map((i) => (
            <span key={i} className="lojee-bg-blob" />
          ))}
        </div>
      );
    case "grid":
      return <div className="lojee-bg lojee-bg-layer lojee-bg-grid" />;
    case "dots":
      return <div className="lojee-bg lojee-bg-layer lojee-bg-dots" />;
    case "spotlight":
      return <div className="lojee-bg lojee-bg-layer lojee-bg-spot" />;
    case "mesh":
      return <div className="lojee-bg lojee-bg-layer lojee-bg-mesh" />;
    case "top-glow":
      return <Wedge edge="top" motes={motes} width={width} />;
    case "bottom-glow":
      return <Wedge edge="bottom" motes={motes} width={width} />;
    case "pinch-glow":
      return (
        <div className="lojee-bg-layer">
          {/* bottom-glow, bent the way a pointer resting in the light would bend it: the wedge shape alone goes through the filter (it is still, so it is drawn once) and the drifting motes stay unfiltered, which keeps them smooth */}
          {holdUrl && (
            <svg width="0" height="0" aria-hidden="true" className="absolute">
              <defs>
                <filter id={`${uid}hold`} x="0" y="0" width="1" height="1" primitiveUnits="objectBoundingBox" colorInterpolationFilters="sRGB">
                  <feImage href={holdUrl} xlinkHref={holdUrl} x="0" y="0" width="1" height="1" preserveAspectRatio="none" result="m0" />
                  <feGaussianBlur in="m0" stdDeviation="0.008 0.016" result="m" />
                  <feDisplacementMap in="SourceGraphic" in2="m" scale="0" xChannelSelector="R" yChannelSelector="G" result="bent">
                    {/* it eases in over a moment instead of appearing at once */}
                    <animate attributeName="scale" from="0" to="0.28" dur="1.8s" begin="0s" fill="freeze" calcMode="spline" keyTimes="0;1" keySplines="0.25 0.1 0.25 1" />
                  </feDisplacementMap>
                  <feGaussianBlur in="bent" stdDeviation="0.0028 0.007" />
                </filter>
              </defs>
            </svg>
          )}
          <div className="absolute inset-0" style={holdUrl ? { filter: `url(#${uid}hold)` } : undefined}>
            <Wedge edge="bottom" motes={false} even className="lojee-glow-bottom bottom-0 left-0 h-[38%] w-full" />
          </div>
          {motes && (
            <div className="lojee-pinch-sides" aria-hidden="true">
              {PINCH_SIDE_MOTES.map((m, i) => (
                <span key={i} className="lojee-pinch-mote" style={{ left: `${m.x}%`, top: `${m.y}%`, width: m.size, height: m.size, "--ax": `${m.a1[0]}cqw`, "--ay": `${m.a1[1]}cqh`, "--bx": `${m.a2[0]}cqw`, "--by": `${m.a2[1]}cqh`, "--cx": `${m.a3[0]}cqw`, "--cy": `${m.a3[1]}cqh`, "--dx": `${m.a4[0]}cqw`, "--dy": `${m.a4[1]}cqh`, animationDuration: `${m.dur}s`, animationDelay: `${m.delay}s` } as CSSProperties} />
              ))}
            </div>
          )}
        </div>
      );
    case "horizon":
      return (
        <div className="lojee-bg lojee-bg-layer lojee-bg-horizon">
          <span className="lojee-bg-horizon-bloom" />
          <span className="lojee-bg-horizon-arc" />
        </div>
      );
    case "vortex":
      return (
        <div className="lojee-bg lojee-bg-layer lojee-bg-vortex">
          <span className="lojee-bg-vortex-core" />
          <span className="lojee-bg-vortex-a" />
          <span className="lojee-bg-vortex-b" />
        </div>
      );
    case "embers":
      return (
        <div className="lojee-bg lojee-bg-layer lojee-bg-embers">
          <span className="lojee-bg-embers-glow" />
          {motes &&
            EMBERS.map((e, i) => (
              <span key={i} className="lojee-bg-ember" style={{ left: `${e.x}%`, width: e.size, height: e.size, animationDuration: `${e.dur}s`, animationDelay: `${e.delay}s`, "--sway": `${e.sway}px` } as CSSProperties} />
            ))}
        </div>
      );
    case "waves":
      return (
        <div className="lojee-bg lojee-bg-layer lojee-bg-waves">
          {WAVES.map((w, i) => (
            <svg key={i} viewBox="0 0 2880 320" preserveAspectRatio="none" className={`lojee-bg-wave ${w.cls}`} aria-hidden="true">
              <defs>
                <linearGradient id={`${uid}w${i}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" style={{ stopColor: "var(--color-accent-400)", stopOpacity: 0.55 - i * 0.12 }} />
                  <stop offset="1" style={{ stopColor: "var(--color-accent-700)", stopOpacity: 0.12 }} />
                </linearGradient>
              </defs>
              <path d={w.d} fill={`url(#${uid}w${i})`} />
            </svg>
          ))}
        </div>
      );
    default:
      return (
        <>
          {side !== "right" && <Wedge edge="left" motes={motes} width={width} />}
          {side !== "left" && <Wedge edge="right" motes={motes} width={width} />}
        </>
      );
  }
}

/**
 * A decorative background for an app, page or section, in a dozen designs — glowing light from the sides, top or bottom, a horizon, an aurora,
 * a spotlight, a mesh, a vortex, rising embers, waves, a grid or dots… Every variant follows the theme accent and light / dark mode.
 *
 * It is the container: the root is `relative isolate overflow-hidden`, the background sits behind and your `children` sit on top. Size and colour it with `className`.
 */
export function AppBackground({ variant = "side-glow", animated = true, hover = true, side = "both", motes = true, progress, scrollFade = false, width, className, children }: AppBackgroundProps) {
  const root = useRef<HTMLDivElement>(null);
  // Fade by scroll: as the page scrolls past this block (--sp 0 -> 1) the background eases out and fades away. --sp is set on the root, so your own content can use it too.
  useEffect(() => {
    const el = root.current;
    if (!el || !scrollFade || progress !== undefined) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const h = el.getBoundingClientRect().height || 1;
      el.style.setProperty("--sp", Math.min(1, Math.max(0, window.scrollY / (h * 0.85))).toFixed(3));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, [scrollFade, progress]);
  // Pointer handling. Everything here is kept cheap: one requestAnimationFrame per pointer move, reads before writes, and only transforms / custom properties that the
  // current variant actually uses.
  // "pinch-glow" holds the bend of a pointer resting low in the middle of the box. The map does not depend on the box's size, so it is made once and shared.
  const holdUrl = variant === "pinch-glow" && typeof document !== "undefined" ? (pinchBendUrl ??= restingBendUrl(0.5, 0.88)) : "";
  const raf = useRef(0);
  const fx = useRef<HTMLSpanElement>(null);
  const pos = useRef({ x: 0, y: 0, inside: false, sx: 0, sy: 0, t: 0, n: 0 });
  const fxKind = FX_KIND[variant];
  const bg = useRef<HTMLDivElement>(null);
  const wakeImg = useRef<SVGFEImageElement>(null);
  const wakeId = `${useId().replace(/[^a-zA-Z0-9]/g, "")}wake`;
  const wakeOn = hover && WAKE_VARIANTS.includes(variant);
  const wake = useRef<{ gw: number; gh: number; vx: Float32Array; vy: Float32Array; edge: Float32Array; canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D; img: ImageData; raf: number } | null>(null);
  const reduceMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // The wake: one vector per cell of a small grid (64 wide), drawn into a tiny canvas that the SVG filter reads as its displacement map. Each frame it decays a little, so the bend relaxes back
  // smoothly. The loop (and the filter itself) only runs while there is something left to relax, so a still pointer or an idle page costs nothing. The map is redrawn on every frame so the
  // bend follows the pointer without any stepping; it is kept this small to make each frame cheap. The background keeps moving (particles and all) while it is bent.
  const wakeTick = (now: number) => {
    const w = wake.current;
    const layer = bg.current;
    if (!w || !layer) return;
    w.raf = 0;
    const p = pos.current;
    if (p.inside && now - p.t < 450) wakePush(p.x, p.y, 0, 0, 0.07, false); // a hand resting in the smoke keeps a gap open for a moment
    const { vx, vy, edge, img } = w;
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
      img.data[i * 4] = 127.5 - vx[i] * edge[i] * 127.5;
      img.data[i * 4 + 1] = 127.5 - vy[i] * edge[i] * 127.5;
      img.data[i * 4 + 2] = 128;
      img.data[i * 4 + 3] = 255;
    }
    w.ctx.putImageData(img, 0, 0);
    const url = w.canvas.toDataURL();
    wakeImg.current?.setAttribute("href", url);
    wakeImg.current?.setAttributeNS("http://www.w3.org/1999/xlink", "href", url);
    if (energy > 0.03) w.raf = requestAnimationFrame(wakeTick);
    else layer.style.filter = "";
  };
  function wakePush(x: number, y: number, dx: number, dy: number, radial: number, schedule = true) {
    const el = root.current;
    const layer = bg.current;
    if (!el || !layer) return;
    const W = el.clientWidth || 1;
    const H = el.clientHeight || 1;
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
      const ex = EDGE_LIGHT.includes(variant) ? 0.025 : 0.1;
      const ey = EDGE_LIGHT.includes(variant) ? 0.03 : 0.14;
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
    if (!layer.style.filter) layer.style.filter = `url(#${wakeId})`;
    if (schedule && !w.raf) w.raf = requestAnimationFrame(wakeTick);
  }
  const emit = (x: number) => {
    const layer = fx.current;
    const el = root.current;
    if (fxKind !== "spark" || !layer || !el) return;
    // sparks leave the curve of the horizon's arc (a huge circle, 190% as wide as the box) right under the pointer
    const w = el.clientWidth;
    const R = w * 0.95;
    const off = Math.min(R - 1, Math.abs(x - w / 2));
    spawnSpark(layer, x, el.clientHeight * 0.8 + R - Math.sqrt(R * R - off * off));
  };
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = root.current;
    if (!hover || !el || raf.current) return;
    const { clientX, clientY } = e;
    raf.current = requestAnimationFrame(() => {
      raf.current = 0;
      const r = el.getBoundingClientRect();
      const x = clientX - r.left;
      const y = clientY - r.top;
      const p = pos.current;
      const dx = p.sx ? x - p.sx : 0;
      const dy = p.sx ? y - p.sy : 0;
      p.x = x;
      p.y = y;
      p.inside = true;
      p.t = performance.now();
      if (FOLLOW_VARIANTS.includes(variant)) {
        el.style.setProperty("--mx", `${((x / (r.width || 1)) * 100).toFixed(1)}%`);
        el.style.setProperty("--my", `${((y / (r.height || 1)) * 100).toFixed(1)}%`);
      }
      if (!reduceMotion()) {
        if (wakeOn && p.sx && Math.hypot(dx, dy) > 1.5) wakePush(x, y, dx, dy, 0.06);
        if (fxKind && Math.hypot(dx, dy) >= 20) emit(x);
      }
      p.sx = x;
      p.sy = y;
      // how near the pointer is to each particle (--n), at most ~30 times a second, and all reads before all writes
      const now = performance.now();
      if (now - p.n > 32) {
        p.n = now;
        const parts = el.querySelectorAll<HTMLElement>(".lojee-bg-ember");
        if (parts.length) {
          const reach = 90; // px
          const rects = Array.from(parts, (m) => m.getBoundingClientRect());
          parts.forEach((m, i) => {
            const b = rects[i];
            const d = Math.hypot(b.left + b.width / 2 - clientX, b.top + b.height / 2 - clientY);
            const n = Math.max(0, 1 - d / reach);
            if (n > 0 || m.style.getPropertyValue("--n")) m.style.setProperty("--n", n.toFixed(2));
          });
        }
      }
    });
  };
  const onEnter = () => {
    pos.current.inside = true;
    pos.current.sx = 0;
  };
  const onLeave = () => {
    const el = root.current;
    pos.current.inside = false;
    pos.current.sx = 0;
    if (!el) return;
    cancelAnimationFrame(raf.current);
    raf.current = 0;
    el.querySelectorAll<HTMLElement>(".lojee-bg-ember").forEach((m) => m.style.removeProperty("--n"));
  };
  // The horizon keeps releasing a spark now and then while the pointer rests on it.
  useEffect(() => {
    if (!hover || fxKind !== "spark") return;
    const id = window.setInterval(() => {
      const p = pos.current;
      if (p.inside && p.x && !reduceMotion()) emit(p.x);
    }, 260);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hover, fxKind]);
  useEffect(
    () => () => {
      if (wake.current) cancelAnimationFrame(wake.current.raf);
    },
    []
  );
  const style = progress !== undefined ? ({ "--sp": Math.min(1, Math.max(0, progress)) } as CSSProperties) : undefined;
  return (
    <div ref={root} data-app-background={variant} data-app-bg-static={animated ? undefined : ""} data-app-bg-hover={hover ? "" : undefined} onPointerMove={hover ? onMove : undefined} onPointerEnter={hover ? onEnter : undefined} onPointerLeave={hover ? onLeave : undefined} style={style} className={cx("relative isolate overflow-hidden", className)}>
      <div ref={bg} aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <Layers variant={variant} side={side} motes={motes} width={width} holdUrl={holdUrl} />
        {hover && fxKind && <span ref={fx} className="lojee-bg-fx" />}
      </div>
      {wakeOn && (
        <svg width="0" height="0" aria-hidden="true" className="absolute">
          <defs>
            <filter id={wakeId} x="0" y="0" width="1" height="1" primitiveUnits="objectBoundingBox" colorInterpolationFilters="sRGB">
              <feImage ref={wakeImg} x="0" y="0" width="1" height="1" preserveAspectRatio="none" result="m0" />
              {HARD_EDGES.includes(variant) && <feGaussianBlur in="m0" stdDeviation="0.011 0.02" result="map" />}
              <feDisplacementMap in="SourceGraphic" in2={HARD_EDGES.includes(variant) ? "map" : "m0"} scale="0.28" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>
        </svg>
      )}
      <slot>{children}</slot>
    </div>
  );
}
