import { cx } from "../../../core/tokens";
import { motionClass, motionStyle, type TransitionVariant } from "../../../core/motion";

export type SkeletonVariant = "text" | "rect" | "circle";
export type SkeletonAnimation = "pulse" | "shimmer" | "wave" | "none";

export interface SkeletonProps {
  /** Shape: "text" (a line of text, default), "rect" (a block) or "circle" (an avatar). */
  variant?: SkeletonVariant;
  /** Width: any CSS length or a number of px (default: fills its container; a circle uses `size`). */
  width?: string | number;
  /** Height: any CSS length or a number of px (default: one text line for "text", 80px for "rect"). */
  height?: string | number;
  /** Diameter of a "circle" in px (default: 40). */
  size?: number;
  /** For "text": how many lines to draw. The last one is shorter, like real text (default: 1). */
  lines?: number;
  /** How it shows that something is loading: "pulse" (default), "shimmer" (a light sweep), "wave" (like "pulse" but each text line is staggered so several lines ripple — a single block looks the same as "pulse") or "none". Respects `prefers-reduced-motion`. */
  animation?: SkeletonAnimation;
  /** Enter transition: "fade" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "zoom" | "zoom-out" | "flip" | "blur" | "bounce" | "rotate" | "drop" | "skew" (default: none). Respects `prefers-reduced-motion`. */
  transition?: TransitionVariant;
  /** Enter transition duration in ms (default: 450). */
  transitionDuration?: number;
  /** Delay before the enter transition starts, in ms (default: 0). */
  transitionDelay?: number;
  /** Extra class name(s) appended to the root element. */
  className?: string;
  /** Per-part class overrides — merged after (and win over) the built-in styling. */
  classNames?: { root?: string; line?: string };
}

const px = (v: string | number | undefined) => (typeof v === "number" ? `${v}px` : v);

// Literal class strings so Tailwind can see them.
const ANIMATION: Record<SkeletonAnimation, string> = {
  pulse: "motion-safe:animate-pulse",
  wave: "motion-safe:animate-pulse",
  shimmer: "relative overflow-hidden before:absolute before:inset-0 before:[transform:translateX(-100%)] before:bg-gradient-to-r before:from-transparent before:via-white/40 dark:before:via-white/10 before:to-transparent motion-safe:before:animate-[lojee-shimmer_1.4s_infinite]",
  none: "",
};

/** A grey placeholder in the shape of content that is still loading — text lines, a block, or an avatar. */
export function Skeleton({
  variant = "text",
  width,
  height,
  size = 40,
  lines = 1,
  animation = "pulse",
  transition,
  transitionDuration,
  transitionDelay,
  className,
  classNames,
}: SkeletonProps) {
  const anim = ANIMATION[animation] ?? ANIMATION.pulse;
  const base = cx("block bg-border", anim, classNames?.line);
  const motion = cx(motionClass(transition), className, classNames?.root);
  const style = motionStyle(transitionDuration, transitionDelay);

  if (variant === "circle") {
    return <span aria-hidden data-skeleton="circle" className={cx(base, "shrink-0 rounded-full", motion)} style={{ width: size, height: size, ...style }} />;
  }
  if (variant === "rect") {
    return <span aria-hidden data-skeleton="rect" className={cx(base, "rounded-lg", motion)} style={{ width: px(width) ?? "100%", height: px(height) ?? 80, ...style }} />;
  }
  const count = Math.max(1, Math.floor(lines));
  return (
    <span aria-hidden className={cx("block space-y-2", motion)} style={{ width: px(width) ?? "100%", ...style }}>
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          data-skeleton="text"
          className={cx(base, "rounded-md")}
          style={{ height: px(height) ?? 14, width: count > 1 && i === count - 1 ? "60%" : "100%", ...(animation === "wave" && { animationDelay: `${i * 150}ms` }) }}
        />
      ))}
    </span>
  );
}
