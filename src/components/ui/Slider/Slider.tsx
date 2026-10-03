import { useState, type ChangeEvent, type CSSProperties, type InputHTMLAttributes } from "react";
import { cx, type ColorName } from "../../../core/tokens";
import { motionClass, motionStyle, type TransitionVariant, type HoverEffect } from "../../../core/motion";

export interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  /** Color of the filled part of the track (default: "accent" — follows the theme accent). */
  color?: ColorName;
  /** Shows the current numeric value in a label beside the slider, kept in sync in both controlled and uncontrolled use (default: false). */
  showValue?: boolean;
  /** Enter transition: "fade" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "zoom" | "zoom-out" | "flip" | "blur" | "bounce" | "rotate" | "drop" | "skew" (default: none). Respects `prefers-reduced-motion`. */
  transition?: TransitionVariant;
  /** Enter transition duration in ms (default: 450). */
  transitionDuration?: number;
  /** Delay before the enter transition starts, in ms (default: 0) — handy for staggering. */
  transitionDelay?: number;
  /** Effect while hovering the thumb (the sliding button — never the whole slider): "lift" | "scale" | "press" | "tilt" | "ring" | "glow" | "shine" (default: none). */
  hoverEffect?: HoverEffect;
  /** Extra class name(s) appended to the root element. */
  className?: string;
  /** Per-part class overrides — merged after (and win over) the built-in styling. */
  classNames?: { root?: string; input?: string; value?: string };
}

// Fill color of the track up to the thumb — "slate" uses the foreground color, so it is dark in light mode and light in dark mode.
const FILL: Record<ColorName, string> = {
  slate: "var(--color-fg)",
  gray: "var(--color-gray-600)",
  indigo: "var(--color-indigo-600)",
  accent: "var(--color-accent-600)",
  violet: "var(--color-violet-600)",
  blue: "var(--color-blue-600)",
  cyan: "var(--color-cyan-600)",
  emerald: "var(--color-emerald-600)",
  teal: "var(--color-teal-600)",
  amber: "var(--color-amber-500)",
  orange: "var(--color-orange-600)",
  rose: "var(--color-rose-600)",
  pink: "var(--color-pink-600)",
};

// The thumb (a raised pill with two dimples) and the filled track are drawn by `.lojee-slider` in theme.css.
const BASE_CLASSES = "lojee-slider w-full disabled:cursor-not-allowed disabled:opacity-50";

export function Slider({
  color = "accent",
  showValue = false,
  transition,
  transitionDuration,
  transitionDelay,
  hoverEffect,
  className,
  classNames,
  value,
  defaultValue,
  onChange,
  style,
  ...rest
}: SliderProps) {
  // `defaultValue` alone is uncontrolled from React's point of view, so
  // reading it for `showValue`'s label would freeze the label at the
  // initial value — the DOM updates on drag, but nothing re-renders. Track
  // the live value ourselves whenever the consumer isn't already
  // controlling it, so the label stays in sync either way.
  const isControlled = value !== undefined;
  const min = rest.min !== undefined ? Number(rest.min) : 0;
  const max = rest.max !== undefined ? Number(rest.max) : 100;
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue ?? Math.round((min + max) / 2));
  const currentValue = isControlled ? value : uncontrolledValue;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) setUncontrolledValue(e.target.value);
    onChange?.(e);
  };

  // How far along the track the thumb is (0–1); the CSS fills the track up to it.
  const pct = max > min ? Math.min(1, Math.max(0, (Number(currentValue) - min) / (max - min))) : 0;
  const trackVars = { "--slider-p": pct, "--slider-fill": FILL[color] ?? FILL.accent } as CSSProperties;

  const input = (
    <input
      type="range"
      value={currentValue}
      onChange={handleChange}
      className={cx(BASE_CLASSES, showValue ? "flex-1" : "w-full", classNames?.input)}
      data-thumb-hover={hoverEffect}
      style={{ ...trackVars, ...style }}
      {...rest}
    />
  );

  // The hover effect belongs to the thumb (data-thumb-hover on the input), so the root only gets the enter transition.
  const rootMotion = motionClass(transition);
  const rootStyle = motionStyle(transitionDuration, transitionDelay);

  if (!showValue) {
    return (
      <span className={cx("inline-flex w-full items-center", rootMotion, className, classNames?.root)} style={rootStyle}>
        {input}
      </span>
    );
  }

  return (
    <div className={cx("flex items-center gap-3", rootMotion, className, classNames?.root)} style={rootStyle}>
      {input}
      <span className={cx("text-sm tabular-nums text-fg-muted", classNames?.value)}>{currentValue}</span>
    </div>
  );
}
