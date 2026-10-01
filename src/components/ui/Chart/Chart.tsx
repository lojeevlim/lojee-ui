import { cx, COLOR_HEX, type ColorName } from "../../../core/tokens";
import { useProgress } from "../../../core/useCountUp";
import { motionClass, motionStyle, type TransitionVariant, type HoverEffect } from "../../../core/motion";

export type ChartType = "bar" | "line" | "donut";

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
  /** Shows each point's label under the plot (bar/line) or as a legend (donut). */
  showLabels?: boolean;
  /** Grows the data in from zero when the chart mounts — bars rise, the line climbs, donut slices sweep round and the legend numbers count up (default: false). Respects `prefers-reduced-motion`. */
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

function BarChart({ data, color, height, svgClassName, progress }: { data: ChartDataPoint[]; color: ColorName; height: number; svgClassName?: string; progress: number }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  const gap = VIEW_W / data.length / 4;
  const barWidth = VIEW_W / data.length - gap;

  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      preserveAspectRatio="none"
      className={cx("w-full", svgClassName)}
      style={{ height }}
      role="img"
      aria-label="Bar chart"
    >
      {data.map((point, i) => {
        const barHeight = (point.value / max) * (VIEW_H - TOP_PADDING) * progress;
        const x = i * (barWidth + gap) + gap / 2;
        const y = VIEW_H - barHeight;
        return (
          <rect key={i} x={x} y={y} width={barWidth} height={barHeight} rx={4} fill={hex(point.color ?? color)}>
            <title>
              {point.label}: {point.value}
            </title>
          </rect>
        );
      })}
    </svg>
  );
}

// Keeps the first/last point's marker circle (r=4) fully inside the
// viewBox — without this, points at x=0/x=VIEW_W get their outer half
// clipped by the SVG's default overflow:hidden, and `preserveAspectRatio="none"`
// stretches that clipped sliver into a thin shard instead of a clean circle.
const LINE_PADDING_X = 8;

function LineChart({ data, color, height, svgClassName, progress }: { data: ChartDataPoint[]; color: ColorName; height: number; svgClassName?: string; progress: number }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  const plotWidth = VIEW_W - LINE_PADDING_X * 2;
  const stepX = data.length > 1 ? plotWidth / (data.length - 1) : 0;
  const points = data.map((point, i) => {
    const x = data.length > 1 ? LINE_PADDING_X + i * stepX : VIEW_W / 2;
    const y = VIEW_H - (point.value / max) * (VIEW_H - TOP_PADDING) * progress;
    return { x, y, point };
  });
  const strokeColor = hex(color);

  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      preserveAspectRatio="none"
      className={cx("w-full", svgClassName)}
      style={{ height }}
      role="img"
      aria-label="Line chart"
    >
      <polyline
        points={points.map((p) => `${p.x},${p.y}`).join(" ")}
        fill="none"
        stroke={strokeColor}
        strokeWidth={2}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {points.map(({ x, y, point }, i) => (
        <circle key={i} cx={x} cy={y} r={4} fill={hex(point.color ?? color)} stroke="var(--lojee-surface)" strokeWidth={1.5}>
          <title>
            {point.label}: {point.value}
          </title>
        </circle>
      ))}
    </svg>
  );
}

const DONUT_SIZE = 160;
const DONUT_RADIUS = 60;
const DONUT_STROKE = 22;
const DONUT_CIRCUMFERENCE = 2 * Math.PI * DONUT_RADIUS;

function DonutChart({
  data,
  color,
  height,
  showLabels,
  svgClassName,
  labelClassName,
  progress,
}: {
  data: ChartDataPoint[];
  color: ColorName;
  height: number;
  showLabels: boolean;
  svgClassName?: string;
  labelClassName?: string;
  progress: number;
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
      <svg viewBox={`0 0 ${DONUT_SIZE} ${DONUT_SIZE}`} className={cx("shrink-0", svgClassName)} style={{ height, width: height }} role="img" aria-label="Donut chart">
        <g transform={`rotate(-90 ${DONUT_SIZE / 2} ${DONUT_SIZE / 2})`}>
          {segments.map(({ point, segmentLength, offset }, i) => (
            <circle
              key={i}
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
          ))}
        </g>
      </svg>
      {showLabels && (
        <ul className={cx("space-y-1.5 text-sm", labelClassName)}>
          {data.map((point, i) => (
            <li key={i} className="flex items-center gap-2 text-fg-muted">
              <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: hex(point.color ?? color) }} />
              <span className="font-medium text-fg">{point.label}</span>
              <span className="tabular-nums text-fg-subtle">{Math.round(point.value * progress)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function Chart({ type = "bar", data, height = 200, color = "accent", showLabels = true, countUp = false, countUpDuration, className, classNames, transition, transitionDuration, transitionDelay, hoverEffect }: ChartProps) {
  const progress = useProgress(countUp, countUpDuration);

  return (
    <div
      className={cx("w-full", motionClass(transition, hoverEffect), className, classNames?.root)}
      style={motionStyle(transitionDuration, transitionDelay)}
    >
      {type === "bar" && <BarChart data={data} color={color} height={height} svgClassName={classNames?.svg} progress={progress} />}
      {type === "line" && <LineChart data={data} color={color} height={height} svgClassName={classNames?.svg} progress={progress} />}
      {type === "donut" && (
        <DonutChart data={data} color={color} height={height} showLabels={showLabels} svgClassName={classNames?.svg} labelClassName={classNames?.label} progress={progress} />
      )}
      {showLabels && type !== "donut" && <LabelRow data={data} className={classNames?.label} />}
    </div>
  );
}
