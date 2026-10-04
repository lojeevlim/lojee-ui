import { useState } from "react";
import { colorClasses, cx, type ColorName } from "../../../core/tokens";
import { animatedClass, animatedStyle, type AnimatedVariant } from "../../../core/animated";
import { AnimatedOverlay } from "../../../core/AnimatedOverlay";
import { motionClass, motionStyle, type TransitionVariant, type HoverEffect } from "../../../core/motion";

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";
export type AvatarShape = "circle" | "square";
export type AvatarStatus = "online" | "offline" | "busy" | "away";

export interface AvatarProps {
  /** Attention animation: "glow" | "pulse" | "sweep" | "bounce" | "float" | "wiggle" | "border-spin" (default: none). Respects `prefers-reduced-motion`. */
  animated?: AnimatedVariant;
  /** Color of the animation (pulse ring, glow, spinning border): a `ColorName` or any CSS color (default: the component's own color). */
  pulseColor?: ColorName | (string & {});
  /** Second color — turns the pulse ring and spinning border into a gradient from `pulseColor` to this (default: solid `pulseColor`). */
  pulseGradientTo?: ColorName | (string & {});
  /** Enter transition: "fade" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "zoom" | "zoom-out" | "flip" | "blur" | "bounce" | "rotate" | "drop" | "skew" (default: none). Respects `prefers-reduced-motion`. */
  transition?: TransitionVariant;
  /** Enter transition duration in ms (default: 450). */
  transitionDuration?: number;
  /** Delay before the enter transition starts, in ms (default: 0) — handy for staggering. */
  transitionDelay?: number;
  /** Effect while hovering: "lift" | "scale" | "press" | "tilt" | "ring" | "glow" | "shine" (default: none). */
  hoverEffect?: HoverEffect;
  /** Image URL; falls back to `initials` when omitted or if the image fails to load. */
  src?: string;
  /** Alternative text for the image (default: ""). */
  alt?: string;
  /** Fallback text shown when there's no image, or the image fails to load. */
  initials?: string;
  /** "xs" | "sm" | "md" | "lg" | "xl" — 24, 32, 40, 48 or 64 px (default: "md"). */
  size?: AvatarSize;
  /** "circle" or "square" (rounded corners) (default: "circle"). */
  shape?: AvatarShape;
  /** Shows a presence dot at the bottom-right corner: "online", "offline", "busy" or "away"; omit for no dot. */
  status?: AvatarStatus;
  /** Background color for the initials fallback. */
  color?: ColorName;
  /** Extra class names applied to the root element. */
  className?: string;
  /** Per-part class overrides — merged after (and win over) the built-in styling. */
  classNames?: {
    root?: string;
    image?: string;
    fallback?: string;
    status?: string;
  };
}

const SIZE_PX: Record<AvatarSize, number> = { xs: 24, sm: 32, md: 40, lg: 48, xl: 64 };

const TEXT_SIZE: Record<AvatarSize, string> = {
  xs: "text-[10px]",
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
  xl: "text-lg",
};

const STATUS_CLASSES: Record<AvatarStatus, string> = {
  online: "bg-emerald-500",
  offline: "bg-slate-400",
  busy: "bg-rose-500",
  away: "bg-amber-500",
};

const STATUS_DOT_SIZE: Record<AvatarSize, string> = {
  xs: "h-1.5 w-1.5",
  sm: "h-2 w-2",
  md: "h-2.5 w-2.5",
  lg: "h-3 w-3",
  xl: "h-3.5 w-3.5",
};

export function Avatar({
  src,
  alt = "",
  initials,
  size = "md",
  shape = "circle",
  status,
  color = "accent",
  className,
  classNames,
  animated,
  pulseColor,
  pulseGradientTo,
  transition,
  transitionDuration,
  transitionDelay,
  hoverEffect,
}: AvatarProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const px = SIZE_PX[size];
  const shapeClass = shape === "circle" ? "rounded-full" : "rounded-lg";
  const showImage = src && !imageFailed;

  return (
    <span
      className={cx(
        "relative inline-flex shrink-0 items-center justify-center",
        (animated || hoverEffect) && shapeClass,
        animatedClass(animated),
        motionClass(transition, hoverEffect),
        className,
        classNames?.root
      )}
      style={{ width: px, height: px, ...animatedStyle(animated, color, pulseColor, pulseGradientTo), ...motionStyle(transitionDuration, transitionDelay) }}
    >
      {/* Clips the image/fallback to the avatar's shape — kept off the root
          span so the status dot below (a sibling, not a child of this) isn't
          clipped along with it when it overlaps the corner. */}
      <span data-avatar-clip className={cx("flex h-full w-full items-center justify-center overflow-hidden", shapeClass)}>
        {showImage ? (
          <img
            src={src}
            alt={alt}
            className={cx("h-full w-full object-cover", classNames?.image)}
            onError={() => setImageFailed(true)}
          />
        ) : (
          <span
            className={cx(
              "flex h-full w-full items-center justify-center font-medium uppercase",
              TEXT_SIZE[size],
              (colorClasses[color] || colorClasses.slate).soft,
              classNames?.fallback
            )}
          >
            {initials}
          </span>
        )}
      </span>
      {status && (
        <span
          className={cx(
            "absolute right-0 bottom-0 rounded-full ring-2 ring-surface",
            STATUS_CLASSES[status],
            STATUS_DOT_SIZE[size],
            classNames?.status
          )}
          data-avatar-status
          aria-label={status}
        />
      )}
      <AnimatedOverlay variant={animated} />
    </span>
  );
}
