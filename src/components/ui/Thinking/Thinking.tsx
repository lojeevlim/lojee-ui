import { useEffect, useState } from "react";
import { cx, type ColorName } from "../../../core/tokens";
import { motionClass, motionStyle, type TransitionVariant } from "../../../core/motion";

export type ThinkingVariant = "dots" | "wave" | "orb" | "shimmer";
export type ThinkingSize = "sm" | "md" | "lg";

export interface ThinkingProps {
  /** Text next to the indicator (default: "Thinking"). Ignored while `steps` is set. */
  label?: string;
  /** Indicator style: "dots" (bouncing dots), "wave" (audio-style bars), "orb" (pulsing gradient orb) or "shimmer" (the label itself glows in a sweep) (default: "dots"). */
  variant?: ThinkingVariant;
  /** "sm" | "md" | "lg" (default: "md"). */
  size?: ThinkingSize;
  /** Color of the indicator, one of the built-in ColorNames (default: "accent" — follows the theme accent). */
  color?: ColorName;
  /** Status lines to cycle through, e.g. ["Reading the file", "Planning", "Writing the answer"] — replaces `label` and loops every `stepInterval` ms. */
  steps?: string[];
  /** How long each step stays on screen, in ms (default: 2200). */
  stepInterval?: number;
  /** Appends a running timer — "Thinking · 4s" (default: false). */
  showElapsed?: boolean;
  /** Enter transition: "fade" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "zoom" | "zoom-out" | "flip" | "blur" | "bounce" | "rotate" | "drop" | "skew" (default: none). Respects `prefers-reduced-motion`. */
  transition?: TransitionVariant;
  /** Enter transition duration in ms (default: 450). */
  transitionDuration?: number;
  /** Delay before the enter transition starts, in ms (default: 0). */
  transitionDelay?: number;
  /** Extra class name(s) applied to the root element. */
  className?: string;
  /** Per-part class overrides — merged after (and win over) the built-in styling. */
  classNames?: {
    root?: string;
    indicator?: string;
    label?: string;
  };
}

const TEXT_COLOR: Record<ColorName, string> = {
  slate: "text-fg-muted",
  gray: "text-fg-muted",
  indigo: "text-indigo-600",
  accent: "text-accent-600",
  violet: "text-violet-600",
  blue: "text-blue-600",
  cyan: "text-cyan-600",
  emerald: "text-emerald-600",
  teal: "text-teal-600",
  amber: "text-amber-500",
  orange: "text-orange-600",
  rose: "text-rose-600",
  pink: "text-pink-600",
};

const DOT: Record<ThinkingSize, string> = { sm: "h-1.5 w-1.5", md: "h-2 w-2", lg: "h-2.5 w-2.5" };
const BAR: Record<ThinkingSize, string> = { sm: "h-3 w-0.5", md: "h-4 w-[3px]", lg: "h-5 w-1" };
const ORB: Record<ThinkingSize, string> = { sm: "h-4 w-4", md: "h-5 w-5", lg: "h-7 w-7" };
const TEXT: Record<ThinkingSize, string> = { sm: "text-xs", md: "text-sm", lg: "text-base" };

// A mask band that slides across the text, so the label brightens and dims without changing its color.
const SWEEP_MASK = "[mask-image:linear-gradient(100deg,#000_35%,rgba(0,0,0,0.3)_50%,#000_65%)] [-webkit-mask-image:linear-gradient(100deg,#000_35%,rgba(0,0,0,0.3)_50%,#000_65%)] [mask-size:250%_100%] [-webkit-mask-size:250%_100%]";

/** An AI "thinking" indicator — animated dots, wave bars, an orb or a shimmering label, with optional rotating status lines and a timer. */
export function Thinking({
  label = "Thinking",
  variant = "dots",
  size = "md",
  color = "accent",
  steps,
  stepInterval = 2200,
  showElapsed = false,
  transition,
  transitionDuration,
  transitionDelay,
  className,
  classNames,
}: ThinkingProps) {
  const [step, setStep] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const stepCount = steps?.length ?? 0;

  useEffect(() => {
    if (stepCount < 2) return;
    const id = setInterval(() => setStep((i) => (i + 1) % stepCount), Math.max(400, stepInterval));
    return () => clearInterval(id);
  }, [stepCount, stepInterval]);

  useEffect(() => {
    if (!showElapsed) return;
    const start = Date.now();
    const id = setInterval(() => setElapsed(Math.floor((Date.now() - start) / 1000)), 1000);
    return () => {
      clearInterval(id);
      setElapsed(0);
    };
  }, [showElapsed]);

  const tint = TEXT_COLOR[color] || TEXT_COLOR.accent;
  const text = stepCount > 0 ? steps![step % stepCount] : label;

  const indicator =
    variant === "wave" ? (
      <span className={cx("flex items-center gap-0.5", classNames?.indicator)} aria-hidden="true">
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className={cx("origin-center rounded-full bg-current animate-think-wave motion-reduce:animate-none", BAR[size])} style={{ animationDelay: `${i * 0.12}s` }} />
        ))}
      </span>
    ) : variant === "orb" ? (
      <span
        className={cx("block rounded-full bg-[radial-gradient(circle_at_30%_30%,white,currentColor_65%)] animate-think-orb motion-reduce:animate-none", ORB[size], classNames?.indicator)}
        aria-hidden="true"
      />
    ) : variant === "dots" ? (
      <span className={cx("flex items-center gap-1", classNames?.indicator)} aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <span key={i} className={cx("rounded-full bg-current animate-think-dot motion-reduce:animate-none", DOT[size])} style={{ animationDelay: `${i * 0.18}s` }} />
        ))}
      </span>
    ) : null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={cx("inline-flex items-center gap-2.5", tint, motionClass(transition), className, classNames?.root)}
      style={motionStyle(transitionDuration, transitionDelay)}
    >
      {indicator}
      <span className={cx("font-medium", TEXT[size], variant === "shimmer" ? cx(SWEEP_MASK, "animate-think-sweep motion-reduce:animate-none") : "text-fg-muted", classNames?.label)}>
        {text}
      </span>
      {showElapsed && <span className={cx("tabular-nums text-fg-subtle", TEXT[size])}>· {elapsed}s</span>}
    </div>
  );
}
