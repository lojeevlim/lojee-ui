import { cx, type ColorName } from "../../../core/tokens";
import { motionClass, motionStyle, type TransitionVariant, type HoverEffect } from "../../../core/motion";

export interface RangeSliderProps {
  /** Lowest selectable value (default: 0). */
  min?: number;
  /** Highest selectable value (default: 100). */
  max?: number;
  /** Increment between selectable values (default: 1). */
  step?: number;
  /** Controlled `[low, high]` tuple of the two thumbs' current values. */
  value: [number, number];
  /** Called with the new `[low, high]` tuple whenever either thumb is moved; the consumer must store it back into `value`. */
  onChange?: (value: [number, number]) => void;
  /** Color of the filled range between the thumbs (default: "accent" — follows the theme accent). */
  color?: ColorName;
  /** Shows the current "low – high" text below the slider (default: false). */
  showValue?: boolean;
  /** Enter transition: "fade" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "zoom" | "zoom-out" | "flip" | "blur" | "bounce" | "rotate" | "drop" | "skew" (default: none). Respects `prefers-reduced-motion`. */
  transition?: TransitionVariant;
  /** Enter transition duration in ms (default: 450). */
  transitionDuration?: number;
  /** Delay before the enter transition starts, in ms (default: 0) — handy for staggering. */
  transitionDelay?: number;
  /** Effect while hovering a thumb (the sliding buttons — never the whole slider): "lift" | "scale" | "press" | "tilt" | "ring" | "glow" | "shine" (default: none). */
  hoverEffect?: HoverEffect;
  /** Extra CSS class(es) added to the root element, merged before `classNames.root`. */
  className?: string;
  /** Per-part class overrides — merged after (and win over) the built-in styling. */
  classNames?: { root?: string; track?: string; range?: string; thumb?: string; value?: string };
}

const RANGE_BG: Record<ColorName, string> = {
  slate: "bg-slate-500",
  gray: "bg-gray-500",
  indigo: "bg-indigo-500",
  accent: "bg-accent-500",
  violet: "bg-violet-500",
  blue: "bg-blue-500",
  cyan: "bg-cyan-500",
  emerald: "bg-emerald-500",
  teal: "bg-teal-500",
  amber: "bg-amber-500",
  orange: "bg-orange-500",
  rose: "bg-rose-500",
  pink: "bg-pink-500",
};

// Each of the two inputs spans the whole range and only its thumb takes pointer events; the pill thumb is drawn by `.lojee-range` in theme.css.
const INPUT_CLASSES =
  "lojee-range pointer-events-none absolute w-full [&::-webkit-slider-thumb]:pointer-events-auto [&::-moz-range-thumb]:pointer-events-auto";

export function RangeSlider({
  min = 0,
  max = 100,
  step = 1,
  value,
  onChange,
  color = "accent",
  showValue = false,
  transition,
  transitionDuration,
  transitionDelay,
  hoverEffect,
  className,
  classNames,
}: RangeSliderProps) {
  const [low, high] = value;
  const span = max - min || 1;
  const lowP = (low - min) / span;
  const highP = (high - min) / span;
  // The pill thumb is 44px wide, so a thumb's centre runs from 22px to (width − 22px) — the fill follows that, not 0–100%.
  const at = (p: number) => `calc(22px + (100% - 44px) * ${p})`;

  return (
    <div
      className={cx("w-full", motionClass(transition), className, classNames?.root)}
      style={motionStyle(transitionDuration, transitionDelay)}
    >
      <div className="relative flex h-6 items-center">
        <div className={cx("absolute h-1.5 w-full rounded-full bg-border", classNames?.track)} />
        <div
          className={cx("absolute h-1.5 rounded-full", RANGE_BG[color], classNames?.range)}
          style={{ left: at(lowP), right: at(1 - highP) }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={low}
          onChange={(e) => onChange?.([Math.min(Number(e.target.value), high), high])}
          data-thumb-hover={hoverEffect}
          className={cx(INPUT_CLASSES, classNames?.thumb)}
          // When both thumbs sit at the top end, the low one has to be on top or it could never be dragged back.
          style={{ zIndex: low > min + span / 2 ? 2 : 1 }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={high}
          onChange={(e) => onChange?.([low, Math.max(Number(e.target.value), low)])}
          data-thumb-hover={hoverEffect}
          className={cx(INPUT_CLASSES, classNames?.thumb)}
        />
      </div>
      {showValue && (
        <div className={cx("mt-2 text-sm tabular-nums text-fg-muted", classNames?.value)}>
          {low} – {high}
        </div>
      )}
    </div>
  );
}
