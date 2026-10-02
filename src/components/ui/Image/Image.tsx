import { useState } from "react";
import type { ReactNode } from "react";
import { cx } from "../../../core/tokens";
import { motionClass, motionStyle, type TransitionVariant, type HoverEffect } from "../../../core/motion";

export type ImageFit = "cover" | "contain" | "fill" | "none";
export type ImageRadius = "none" | "sm" | "md" | "lg" | "xl" | "full";
export type ImageRatio = "auto" | "1/1" | "4/3" | "3/2" | "16/9" | "21/9";

export interface ImageProps {
  /** Image URL (or data URI). While it loads a soft shimmer is shown; if it fails, `fallback` is shown instead. */
  src?: string;
  /** Alternative text for screen readers (default: ""). Describe the picture, or leave empty for a purely decorative one. */
  alt?: string;
  /** Width of the frame: any CSS length or a number of px (default: fills its container). */
  width?: string | number;
  /** Height of the frame: any CSS length or a number of px (default: from `ratio`, otherwise the image's own). */
  height?: string | number;
  /** Fixed shape of the frame: "auto" (the image's own proportions, default), "1/1", "4/3", "3/2", "16/9" or "21/9". The image is fitted into it with `fit`. */
  ratio?: ImageRatio;
  /** How the picture fills the frame: "cover" (crop to fill, default), "contain" (show all, letterboxed), "fill" (stretch) or "none". */
  fit?: ImageFit;
  /** Corner rounding: "none" | "sm" | "md" | "lg" | "xl" | "full" (default: "lg"). */
  rounded?: ImageRadius;
  /** "lazy" (default) loads the image only when it nears the viewport; "eager" loads it immediately — use eager for images above the fold. */
  loading?: "lazy" | "eager";
  /** Hides the border drawn around the frame (default: false). */
  borderless?: boolean;
  /** Short text shown under the image (default: none). */
  caption?: string;
  /** Content shown in place of the image when it can't be loaded or has no `src` (default: a neutral "image unavailable" placeholder). */
  fallback?: ReactNode;
  /** Called once the image has loaded. */
  onLoad?: () => void;
  /** Called when the image fails to load. */
  onError?: () => void;
  /** Enter transition: "fade" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "zoom" | "zoom-out" | "flip" | "blur" | "bounce" | "rotate" | "drop" | "skew" (default: none). Respects `prefers-reduced-motion`. */
  transition?: TransitionVariant;
  /** Enter transition duration in ms (default: 450). */
  transitionDuration?: number;
  /** Delay before the enter transition starts, in ms (default: 0) — handy for staggering. */
  transitionDelay?: number;
  /** Effect while hovering: "lift" | "scale" | "press" | "tilt" | "ring" | "glow" | "shine" (default: none). */
  hoverEffect?: HoverEffect;
  /** Extra class name(s) appended to the root element. */
  className?: string;
  /** Per-part class overrides — merged after (and win over) the built-in styling. */
  classNames?: {
    root?: string;
    frame?: string;
    image?: string;
    caption?: string;
  };
}

// Literal class strings so Tailwind can see them.
const FIT_CLASSES: Record<ImageFit, string> = { cover: "object-cover", contain: "object-contain", fill: "object-fill", none: "object-none" };
const RADIUS_CLASSES: Record<ImageRadius, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-full",
};
const RATIO_CLASSES: Record<ImageRatio, string> = {
  auto: "",
  "1/1": "aspect-square",
  "4/3": "aspect-[4/3]",
  "3/2": "aspect-[3/2]",
  "16/9": "aspect-video",
  "21/9": "aspect-[21/9]",
};

const px = (v: string | number | undefined) => (typeof v === "number" ? `${v}px` : v);

/** A picture with the details handled for you: lazy loading, a shimmer while it loads, a fade-in once it has, a fallback if it fails, and a fixed frame shape. */
export function Image({
  src,
  alt = "",
  width,
  height,
  ratio = "auto",
  fit = "cover",
  rounded = "lg",
  loading = "lazy",
  borderless = false,
  caption,
  fallback,
  onLoad,
  onError,
  transition,
  transitionDuration,
  transitionDelay,
  hoverEffect,
  className,
  classNames,
}: ImageProps) {
  // Tracks which `src` has loaded / failed, so a new `src` starts over without an effect.
  const [status, setStatus] = useState<{ src?: string; state: "loading" | "loaded" | "error" }>({ src, state: "loading" });
  const [prevSrc, setPrevSrc] = useState(src);
  if (src !== prevSrc) {
    setPrevSrc(src);
    setStatus({ src, state: "loading" });
  }
  const state = !src ? "error" : status.state;

  const frameStyle = { width: px(width), height: px(height) };
  const ratioClass = RATIO_CLASSES[ratio] ?? "";

  return (
    <figure className={cx("m-0 inline-block max-w-full", !width && "w-full", motionClass(transition, hoverEffect), className, classNames?.root)} style={motionStyle(transitionDuration, transitionDelay)}>
      <div
        className={cx(
          "relative overflow-hidden bg-surface-muted",
          RADIUS_CLASSES[rounded] ?? RADIUS_CLASSES.lg,
          !borderless && "border border-border",
          ratioClass,
          classNames?.frame
        )}
        style={frameStyle}
      >
        {state === "loading" && (
          <span aria-hidden className="absolute inset-0 animate-pulse bg-gradient-to-r from-surface-muted via-border to-surface-muted" />
        )}
        {src && state !== "error" && (
          <img
            // A cached image can finish before React attaches `onLoad`, so also settle from the element itself.
            ref={(el) => {
              if (el && el.complete && el.naturalWidth > 0) setStatus((st) => (st.state === "loading" ? { src, state: "loaded" } : st));
            }}
            src={src}
            alt={alt}
            loading={loading}
            decoding="async"
            onLoad={() => {
              setStatus({ src, state: "loaded" });
              onLoad?.();
            }}
            onError={() => {
              setStatus({ src, state: "error" });
              onError?.();
            }}
            className={cx(
              "block w-full transition-opacity duration-500",
              ratioClass || height ? "h-full" : "h-auto",
              FIT_CLASSES[fit] ?? FIT_CLASSES.cover,
              state === "loaded" ? "opacity-100" : "opacity-0",
              classNames?.image
            )}
          />
        )}
        {state === "error" && (
          <div role="img" aria-label={alt || "Image unavailable"} className={cx("flex min-h-24 h-full w-full flex-col items-center justify-center gap-1.5 p-4 text-center text-xs text-fg-subtle", ratioClass === "" && !height && "py-10")}>
            {fallback != null ? (
              <slot name="fallback">{fallback}</slot>
            ) : (
              <>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="9" cy="9" r="1.5" />
                  <path d="m21 15-5-5L5 21" />
                </svg>
                <span>Image unavailable</span>
              </>
            )}
          </div>
        )}
      </div>
      {caption && <figcaption className={cx("mt-2 text-center text-xs text-fg-subtle", classNames?.caption)}>{caption}</figcaption>}
    </figure>
  );
}
