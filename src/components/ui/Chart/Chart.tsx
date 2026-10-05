import { useId } from "react";
import { cx, COLOR_HEX, type ColorName } from "../../../core/tokens";
import { useProgress } from "../../../core/useCountUp";
import { useDesign } from "../../../core/useDesign";
import { motionClass, motionStyle, type TransitionVariant, type HoverEffect } from "../../../core/motion";

// Claymorphism follows the ProgressBar: shapes sit in pressed-in slots/tracks and are filled flat with just a thin highlight rim and a soft,
// short shadow (no heavy tube shading). It is plain SVG — a faint diagonal sheen, a rim that catches the light — so it renders the same in
// every browser. The shapes only get these under the Claymorphism design; Bento keeps the flat shapes.
const CLAY_SHADOW = "drop-shadow(1px 2px 2px rgb(74 86 136 / 0.22))";

function useClayDefs(on: boolean): { drop: string; sheen: string; rim: string; gloss: string; defs: React.JSX.Element | null } {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const sheen = `lojee-sheen-${uid}`;
  const rim = `lojee-rim-${uid}`;
  const gloss = `lojee-gloss-${uid}`;
  const drop = `lojee-drop-${uid}`;
  return {
    drop,
    sheen,
    rim,
    gloss,
    defs: on ? (
      <defs>
        {/* The active-item shadow (5px 7px 14px), in viewBox units. */}
        <filter id={drop} filterUnits="userSpaceOnUse" x={-40} y={-40} width={VIEW_W + 80} height={VIEW_H + 80}>
          <feDropShadow dx={4} dy={6} stdDeviation={6} floodColor="rgb(84 96 150)" floodOpacity={0.3} />
        </filter>
        <linearGradient id={sheen} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.25" />
          <stop offset="0.4" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.62" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.14" />
        </linearGradient>
        <linearGradient id={gloss} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.6" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={rim} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="0.45" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.6" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.12" />
        </linearGradient>
      </defs>
    ) : null,
  };
}

export type ChartType = "bar" | "line" | "donut";
/** "default" draws the shapes only; "values" also prints each data value on the chart (above every bar and point, and in the donut legend and centre). */
export type ChartVariant = "default" | "values";

export interface ChartDataPoint {
  label: string;
  value: number;
  /** Per-point color override (default: the chart's own `color` prop). Mainly useful for donut segments. */
  color?: ColorName;
}

// Fully data-driven (a `data` array prop), not compound children — same
// reasoning as Table/Stepper: once wrapped as a Web Component via r2wc,
// light-DOM children can't be inspected across the shadow boundary, so a
// plain data array is the only shape that works identically in both the
// React and Web Component builds.
export interface ChartProps {
  /** "bar" | "line" | "donut" (default: "bar"). */
  type?: ChartType;
  /** The data points to plot, in order — each with a `label`, a numeric `value` and an optional `color`. */
  data: ChartDataPoint[];
  /** Pixel height of the chart area (width always fills its container). */
  height?: number;
  /** Default color for points that don't set their own `color`. */
  color?: ColorName;
  /** "default" | "values" — "values" prints each data value on the chart: above every bar and line point, and with its share plus the total for a donut (default: "default"). */
  variant?: ChartVariant;
  /** Shows each point's label under the plot (bar/line) or as a legend (donut). */
  showLabels?: boolean;
  /** Grows the data in from zero when the chart mounts — bars rise, the line climbs, donut slices sweep round and the legend numbers count up (default: true — set false for a static chart). Respects `prefers-reduced-motion`. */
  countUp?: boolean;
  /** Duration of the count-up in ms (default: 1200). */
  countUpDuration?: number;
  /** Enter transition: "fade" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "zoom" | "zoom-out" | "flip" | "blur" | "bounce" | "rotate" | "drop" | "skew" (default: none). Respects `prefers-reduced-motion`. */
  transition?: TransitionVariant;
  /** Enter transition duration in ms (default: 450). */
  transitionDuration?: number;
  /** Delay before the enter transition starts, in ms (default: 0) — handy for staggering. */
  transitionDelay?: number;
  /** Effect while hovering: "lift" | "scale" | "press" | "tilt" | "ring" | "glow" | "shine" (default: none). */
  hoverEffect?: HoverEffect;
  /** Extra class names applied to the root element. */
  className?: string;
  /** Per-part class overrides (`root`, `svg`, `label`) — merged after the built-in styling. */
  classNames?: {
    root?: string;
    svg?: string;
    label?: string;
  };
}

const VIEW_W = 400;
const VIEW_H = 200;
// Headroom above the tallest bar/point so it doesn't touch the very top edge.
const TOP_PADDING = VIEW_H * 0.12;

function LabelRow({ data, className }: { data: ChartDataPoint[]; className?: string }) {
  return (
    <div className={cx("mt-2 flex justify-between text-xs text-fg-subtle", className)}>
      {data.map((point, i) => (
        <span key={i} className="truncate px-0.5 text-center" style={{ flexBasis: 0, flexGrow: 1 }}>
          {point.label}
        </span>
      ))}
    </div>
  );
}

// "accent" follows the theme's brand color (CSS var) instead of a fixed hex.
const hex = (c: ColorName) => (c === "accent" ? "var(--lojee-accent-600)" : COLOR_HEX[c]);

// Value tags are HTML laid over the SVG (the SVG is stretched with preserveAspectRatio="none", which would distort text).
function ValueTag({ x, y, value, progress }: { x: number; y: number; value: number; progress: number }) {
  return (
    <span
      className="pointer-events-none absolute -translate-x-1/2 -translate-y-full pb-1 text-xs font-semibold tabular-nums text-fg"
      style={{ left: `${(x / VIEW_W) * 100}%`, top: `${(y / VIEW_H) * 100}%` }}
    >
      {Math.round(value * progress)}
    </span>
  );
}

function BarChart({ data, color, height, svgClassName, progress, showValues, clay }: { data: ChartDataPoint[]; color: ColorName; height: number; svgClassName?: string; progress: number; showValues: boolean; clay: boolean }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  const gap = VIEW_W / data.length / 4;
  const barWidth = VIEW_W / data.length - gap;
  const g = useClayDefs(clay);
  const radius = clay ? 12 : 4;

  return (
    <div className="relative">
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      preserveAspectRatio="none"
      className={cx("w-full", svgClassName)}
      style={{ height, ...(clay ? { overflow: "visible" } : null) }}
      role="img"
      aria-label="Bar chart"
    >
      {g.defs}
      {/* Clay: a pressed-in slot behind each bar for it to rise out of. */}
      {clay &&
        data.map((_, i) => (
          <rect key={`slot-${i}`} x={i * (barWidth + gap) + gap / 2} y={0} width={barWidth} height={VIEW_H} rx={radius} fill="currentColor" className="text-fg/[0.06]" />
        ))}
      {data.map((point, i) => {
        const barHeight = (point.value / max) * (VIEW_H - TOP_PADDING) * progress;
        const x = i * (barWidth + gap) + gap / 2;
        const y = VIEW_H - barHeight;
        return (
          <g key={i} filter={clay && barHeight > 2 ? `url(#${g.drop})` : undefined}>
            <rect x={x} y={y} width={barWidth} height={barHeight} rx={radius} fill={hex(point.color ?? color)}>
              <title>
                {point.label}: {point.value}
              </title>
            </rect>
            {clay && barHeight > 2 && (
              <>
                <rect x={x} y={y} width={barWidth} height={barHeight} rx={radius} fill={`url(#${g.sheen})`} pointerEvents="none" />
                <rect x={x + 1.5} y={y + 1.5} width={Math.max(0, barWidth - 3)} height={Math.max(0, barHeight - 3)} rx={Math.max(0, radius - 1.5)} fill="none" stroke={`url(#${g.rim})`} strokeWidth={3} vectorEffect="non-scaling-stroke" pointerEvents="none" />
                <rect x={x} y={y} width={barWidth} height={Math.min(barHeight, 40)} rx={radius} fill={`url(#${g.gloss})`} opacity={0.35} pointerEvents="none" />
              </>
            )}
          </g>
        );
      })}
    </svg>
    {showValues &&
      data.map((point, i) => {
        const barHeight = (point.value / max) * (VIEW_H - TOP_PADDING) * progress;
        return <ValueTag key={i} x={i * (barWidth + gap) + gap / 2 + barWidth / 2} y={VIEW_H - barHeight} value={point.value} progress={progress} />;
      })}
    </div>
  );
}

// Keeps the first/last point's marker circle (r=4) fully inside the
// viewBox — without this, points at x=0/x=VIEW_W get their outer half
// clipped by the SVG's default overflow:hidden, and `preserveAspectRatio="none"`
// stretches that clipped sliver into a thin shard instead of a clean circle.
const LINE_PADDING_X = 8;

function LineChart({ data, color, height, svgClassName, progress, showValues, clay }: { data: ChartDataPoint[]; color: ColorName; height: number; svgClassName?: string; progress: number; showValues: boolean; clay: boolean }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  const plotWidth = VIEW_W - LINE_PADDING_X * 2;
  const stepX = data.length > 1 ? plotWidth / (data.length - 1) : 0;
  const points = data.map((point, i) => {
    const x = data.length > 1 ? LINE_PADDING_X + i * stepX : VIEW_W / 2;
    const y = VIEW_H - (point.value / max) * (VIEW_H - TOP_PADDING) * progress;
    return { x, y, point };
  });
  const strokeColor = hex(color);
  const pts = points.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <div className="relative">
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      preserveAspectRatio="none"
      className={cx("w-full", svgClassName)}
      style={{ height, ...(clay ? { filter: CLAY_SHADOW } : null) }}
      role="img"
      aria-label="Line chart"
    >
      <polyline
        points={pts}
        fill="none"
        stroke={strokeColor}
        strokeWidth={clay ? 5 : 2}
        strokeLinejoin="round"
        strokeLinecap="round"
        vectorEffect={clay ? "non-scaling-stroke" : undefined}
      />
      {/* Clay: a thin light line along the top edge of the tube. */}
      {clay && (
        <polyline points={pts} fill="none" stroke="#fff" strokeOpacity={0.4} strokeWidth={1.5} strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" transform="translate(-0.5 -1.5)" pointerEvents="none" />
      )}
      {!clay &&
        points.map(({ x, y, point }, i) => (
          <circle key={i} cx={x} cy={y} r={4} fill={hex(point.color ?? color)} stroke="var(--lojee-surface)" strokeWidth={1.5}>
            <title>
              {point.label}: {point.value}
            </title>
          </circle>
        ))}
    </svg>
    {/* Clay: round, glossy beads (HTML, so they stay perfectly round however the chart is stretched). */}
    {clay &&
      points.map(({ x, y, point }, i) => {
        const c = hex(point.color ?? color);
        return (
          <span
            key={i}
            title={`${point.label}: ${point.value}`}
            className="absolute h-[14px] w-[14px] rounded-full"
            style={{
              left: `${(x / VIEW_W) * 100}%`,
              top: `${(y / VIEW_H) * 100}%`,
              transform: "translate(-50%, -50%)",
              backgroundColor: c,
              boxShadow: "1px 2px 4px rgb(74 86 136 / 0.35), inset 1px 1px 2px rgb(255 255 255 / 0.4), inset -1px -2px 3px rgb(0 0 0 / 0.18)",
              border: "2px solid var(--color-surface)",
            }}
          />
        );
      })}
    {showValues && points.map(({ x, y, point }, i) => <ValueTag key={i} x={x} y={y - (clay ? 14 : 6)} value={point.value} progress={progress} />)}
    </div>
  );
}

const DONUT_SIZE = 160;
const DONUT_RADIUS = 60;
const DONUT_STROKE = 22;
const DONUT_CIRCUMFERENCE = 2 * Math.PI * DONUT_RADIUS;

/** A concentric arc at `radius` covering the same angle as a segment drawn at `base` (its dash length and offset scale with the radius). */
function ClayArc({ radius, base, length, offset, stroke, opacity, width }: { radius: number; base: number; length: number; offset: number; stroke: string; opacity: number; width: number }) {
  const k = radius / base;
  const circumference = 2 * Math.PI * radius;
  return (
    <circle
      cx={DONUT_SIZE / 2}
      cy={DONUT_SIZE / 2}
      r={radius}
      fill="none"
      stroke={stroke}
      strokeOpacity={opacity}
      strokeWidth={width}
      strokeDasharray={`${length * k} ${circumference - length * k}`}
      strokeDashoffset={offset * k}
      pointerEvents="none"
    />
  );
}

function DonutChart({
  data,
  color,
  height,
  showLabels,
  svgClassName,
  labelClassName,
  progress,
  showValues,
  clay,
}: {
  data: ChartDataPoint[];
  color: ColorName;
  height: number;
  showLabels: boolean;
  svgClassName?: string;
  labelClassName?: string;
  progress: number;
  showValues: boolean;
  clay: boolean;
}) {
  const total = data.reduce((sum, d) => sum + d.value, 0) || 1;
  // Precompute each segment's cumulative starting offset into a plain array
  // up front (rather than mutating a running-total variable inside the
  // render `.map` below), which the render-purity lint rule flags as unsafe.
  const segments: { point: ChartDataPoint; segmentLength: number; offset: number }[] = [];
  let cumulativeShare = 0;
  for (const point of data) {
    const share = point.value / total;
    // Slices sweep clockwise: each shows only the part of its arc the overall sweep (`progress` of the full ring) has reached.
    const start = cumulativeShare * DONUT_CIRCUMFERENCE;
    const full = share * DONUT_CIRCUMFERENCE;
    const visible = Math.max(0, Math.min(full, progress * DONUT_CIRCUMFERENCE - start));
    segments.push({ point, segmentLength: visible, offset: -start });
    cumulativeShare += share;
  }

  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-6" style={{ minHeight: height }}>
      <div className="relative shrink-0" style={{ height, width: height }}>
      <svg viewBox={`0 0 ${DONUT_SIZE} ${DONUT_SIZE}`} className={cx("shrink-0", svgClassName)} style={{ height, width: height, ...(clay ? { filter: CLAY_SHADOW } : null) }} role="img" aria-label="Donut chart">
        <g transform={`rotate(-90 ${DONUT_SIZE / 2} ${DONUT_SIZE / 2})`}>
          {/* Clay: the empty ring the segments sit in. */}
          {clay && <circle cx={DONUT_SIZE / 2} cy={DONUT_SIZE / 2} r={DONUT_RADIUS} fill="none" strokeWidth={DONUT_STROKE} stroke="currentColor" className="text-fg/[0.06]" />}
          {segments.map(({ point, segmentLength, offset }, i) => (
            <g key={i}>
              <circle
                cx={DONUT_SIZE / 2}
                cy={DONUT_SIZE / 2}
                r={DONUT_RADIUS}
                fill="none"
                stroke={hex(point.color ?? color)}
                strokeWidth={DONUT_STROKE}
                strokeDasharray={`${segmentLength} ${DONUT_CIRCUMFERENCE - segmentLength}`}
                strokeDashoffset={offset}
              >
                <title>
                  {point.label}: {point.value}
                </title>
              </circle>
              {/* Clay: a thin light line along the ring's outer edge and a faint shade along its inner edge. */}
              {clay && segmentLength > 0.5 && (
                <>
                  <ClayArc radius={DONUT_RADIUS + DONUT_STROKE / 2 - 1.5} base={DONUT_RADIUS} length={segmentLength} offset={offset} stroke="#fff" opacity={0.45} width={1.5} />
                  <ClayArc radius={DONUT_RADIUS - DONUT_STROKE / 2 + 1.5} base={DONUT_RADIUS} length={segmentLength} offset={offset} stroke="#000" opacity={0.12} width={1.5} />
                </>
              )}
            </g>
          ))}
        </g>
      </svg>
      {showValues && (
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-semibold tabular-nums text-fg">{Math.round(total * progress)}</span>
          <span className="text-xs text-fg-subtle">Total</span>
        </div>
      )}
      </div>
      {showLabels && (
        <ul className={cx("space-y-1.5 text-sm", labelClassName)}>
          {data.map((point, i) => (
            <li key={i} className="flex items-center gap-2 text-fg-muted">
              <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: hex(point.color ?? color) }} />
              <span className="font-medium text-fg">{point.label}</span>
              <span className={cx("tabular-nums", showValues ? "font-semibold text-fg" : "text-fg-subtle")}>{Math.round(point.value * progress)}</span>
              {showValues && <span className="tabular-nums text-xs text-fg-subtle">{Math.round((point.value / total) * 100)}%</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function Chart({ type = "bar", variant = "default", data, height = 200, color = "accent", showLabels = true, countUp = true, countUpDuration, className, classNames, transition, transitionDuration, transitionDelay, hoverEffect }: ChartProps) {
  const progress = useProgress(countUp, countUpDuration);
  const showValues = variant === "values";
  const [rootRef, design] = useDesign();
  const clay = design === "clay";

  return (
    <div
      ref={rootRef}
      data-chart=""
      className={cx("w-full", motionClass(transition, hoverEffect), className, classNames?.root)}
      style={motionStyle(transitionDuration, transitionDelay)}
    >
      {type === "bar" && <BarChart data={data} color={color} height={height} svgClassName={classNames?.svg} progress={progress} showValues={showValues} clay={clay} />}
      {type === "line" && <LineChart data={data} color={color} height={height} svgClassName={classNames?.svg} progress={progress} showValues={showValues} clay={clay} />}
      {type === "donut" && (
        <DonutChart data={data} color={color} height={height} showLabels={showLabels} svgClassName={classNames?.svg} labelClassName={classNames?.label} progress={progress} showValues={showValues} clay={clay} />
      )}
      {showLabels && type !== "donut" && <LabelRow data={data} className={classNames?.label} />}
    </div>
  );
}
