import { cx, type ColorName } from "../../../core/tokens";
import type { CSSProperties, FocusEvent, FormEvent } from "react";
import { FILL, thumbMetrics, type SliderSize, type SliderThumbVariant, type SliderValuePlacement } from "../Slider/Slider";
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
  /** Shows the current values — below the slider as "low – high", or inside each thumb with `valuePlacement="thumb"` (default: false). */
  showValue?: boolean;
  /** Size of the thumbs (and track): "sm" | "md" | "lg" (default: "md"). */
  size?: SliderSize;
  /** Look of the thumbs: "pill" (default, two dimples), "circle" (round, one dimple), "bar" (a slim handle) or "solid" (filled with the slider color). */
  thumbVariant?: SliderThumbVariant;
  /** Where `showValue` puts the numbers: "side" (below the track, default) or "thumb" (inside each sliding button — best at size md or lg). */
  valuePlacement?: SliderValuePlacement;
  /** Enter transition: "fade" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "zoom" | "zoom-out" | "flip" | "blur" | "bounce" | "rotate" | "drop" | "skew" (default: none). Respects `prefers-reduced-motion`. */
  transition?: TransitionVariant;
  /** Enter transition duration in ms (default: 450). */
  transitionDuration?: number;
  /** Delay before the enter transition starts, in ms (default: 0) — handy for staggering. */
  transitionDelay?: number;
  /** Effect while hovering a thumb (the sliding buttons — never the whole slider): "lift" | "scale" | "press" | "tilt" | "ring" | "glow" | "shine" (default: none). */
  hoverEffect?: HoverEffect;
  /** Called when the field gains focus — the native focus event (the web component's `focus` event, detail = the value). */
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
  /** Called as the user edits the field — the native input event (the web component's `input` event, detail = the value). */
  onInput?: (e: FormEvent<HTMLInputElement>) => void;
  /** Called when the field fails validation — the native invalid event (the web component's `invalid` event, detail = the message). */
  onInvalid?: (e: FormEvent<HTMLInputElement>) => void;
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
  onFocus,
  onInput,
  onInvalid,
  color = "accent",
  showValue = false,
  size = "md",
  thumbVariant = "pill",
  valuePlacement = "side",
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
  const inThumb = showValue && valuePlacement === "thumb";
  const { h: thumbH, w: thumbW } = thumbMetrics(size, thumbVariant, inThumb);
  // A thumb's centre runs from half its width to (width − half its width) — the fill follows that, not 0–100%.
  const at = (p: number) => `calc(${thumbW / 2}px + (100% - ${thumbW}px) * ${p})`;
  const trackH = Math.round(thumbH * 0.3);
  const thumbProps = {
    "data-size": size,
    "data-thumb-variant": thumbVariant,
    "data-thumb-label": inThumb ? "" : undefined,
    "data-thumb-hover": hoverEffect,
  };
  const inputVars = { "--slider-fill": FILL[color] ?? FILL.accent } as CSSProperties;
  const label = (p: number, n: number) => (
    <span
      aria-hidden
      className={cx(
        "pointer-events-none absolute top-1/2 z-[3] -translate-x-1/2 -translate-y-1/2 select-none font-semibold leading-none tabular-nums",
        thumbVariant === "solid" && "text-white",
        classNames?.value
      )}
      style={{ left: at(p), fontSize: Math.round(thumbH * 0.42), color: thumbVariant === "solid" ? undefined : (FILL[color] ?? FILL.accent) }}
    >
      {n}
    </span>
  );

  return (
    <div
      className={cx("w-full", motionClass(transition), className, classNames?.root)}
      style={motionStyle(transitionDuration, transitionDelay)}
    >
      <div className="relative flex items-center" style={{ height: thumbH }}>
        <div data-range-track="" className={cx("absolute w-full rounded-full bg-border", classNames?.track)} style={{ height: trackH }} />
        <div
          data-range-fill=""
          className={cx("absolute rounded-full", RANGE_BG[color], classNames?.range)}
          style={{ left: at(lowP), right: at(1 - highP), height: trackH }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={low}
          onChange={(e) => onChange?.([Math.min(Number(e.target.value), high), high])}
          onFocus={onFocus}
          onInput={onInput}
          onInvalid={onInvalid}
          {...thumbProps}
          className={cx(INPUT_CLASSES, classNames?.thumb)}
          // When both thumbs sit at the top end, the low one has to be on top or it could never be dragged back.
          style={{ ...inputVars, zIndex: low > min + span / 2 ? 2 : 1 }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={high}
          onChange={(e) => onChange?.([low, Math.max(Number(e.target.value), low)])}
          onFocus={onFocus}
          onInput={onInput}
          onInvalid={onInvalid}
          {...thumbProps}
          className={cx(INPUT_CLASSES, classNames?.thumb)}
          style={inputVars}
        />
        {inThumb && label(lowP, low)}
        {inThumb && label(highP, high)}
      </div>
      {showValue && !inThumb && (
        <div className={cx("mt-2 text-sm tabular-nums text-fg-muted", classNames?.value)}>
          {low} – {high}
        </div>
      )}
    </div>
  );
}
