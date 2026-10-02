import { useState } from "react";
import type { ReactNode } from "react";
import { cx } from "../../../core/tokens";
import { embedUrl } from "./embedUrl";
import { motionClass, motionStyle, type TransitionVariant, type HoverEffect } from "../../../core/motion";

export type VideoFit = "cover" | "contain" | "fill";
export type VideoRadius = "none" | "sm" | "md" | "lg" | "xl";
export type VideoRatio = "auto" | "1/1" | "4/3" | "16/9" | "21/9";

export interface VideoSource {
  /** URL of the video file. */
  src: string;
  /** MIME type, e.g. "video/mp4" or "video/webm" — lets the browser skip a format it can't play. */
  type?: string;
}

export interface VideoProps {
  /** A video file URL (mp4, webm, ogg…), or a YouTube / Vimeo page URL — those are recognised and embedded in a player automatically. */
  src?: string;
  /** Several formats of the same video; the browser plays the first one it supports. Used instead of `src` for files. */
  sources?: VideoSource[];
  /** Image shown before playback starts (files only). */
  poster?: string;
  /** Short description of the video, used as its accessible name (default: "Video"). */
  label?: string;
  /** Shows the player's play / seek / volume controls (default: true). */
  controls?: boolean;
  /** Starts playing as soon as it can. Browsers only allow this for a muted video, so `muted` is switched on with it (default: false). */
  autoPlay?: boolean;
  /** Starts muted (default: false). */
  muted?: boolean;
  /** Restarts when it reaches the end (default: false). */
  loop?: boolean;
  /** Plays inline on phones instead of jumping to full screen (default: true). */
  playsInline?: boolean;
  /** How much to download up front: "none", "metadata" (default) or "auto". */
  preload?: "none" | "metadata" | "auto";
  /** Fixed shape of the frame: "16/9" (default), "auto" (the video's own proportions), "1/1", "4/3" or "21/9". */
  ratio?: VideoRatio;
  /** How the video fills the frame: "contain" (show all, default), "cover" (crop to fill) or "fill" (stretch). Files only. */
  fit?: VideoFit;
  /** Corner rounding: "none" | "sm" | "md" | "lg" | "xl" (default: "lg"). */
  rounded?: VideoRadius;
  /** Short text shown under the video (default: none). */
  caption?: string;
  /** Content shown when the video can't be loaded (default: a neutral "video unavailable" placeholder). */
  fallback?: ReactNode;
  /** Called when playback starts or resumes (files only). */
  onPlay?: () => void;
  /** Called when playback is paused (files only). */
  onPause?: () => void;
  /** Called when the video reaches the end (files only). */
  onEnded?: () => void;
  /** Called once the video's length is known, with its duration in seconds (files only). */
  onLoad?: (duration: number) => void;
  /** Called when the video can't be loaded or played (files only). */
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
    video?: string;
    caption?: string;
  };
}

// Literal class strings so Tailwind can see them.
const FIT_CLASSES: Record<VideoFit, string> = { cover: "object-cover", contain: "object-contain", fill: "object-fill" };
const RADIUS_CLASSES: Record<VideoRadius, string> = { none: "rounded-none", sm: "rounded-sm", md: "rounded-md", lg: "rounded-lg", xl: "rounded-xl" };
const RATIO_CLASSES: Record<VideoRatio, string> = { auto: "", "1/1": "aspect-square", "4/3": "aspect-[4/3]", "16/9": "aspect-video", "21/9": "aspect-[21/9]" };

/** A video file or a YouTube / Vimeo link in a frame of a fixed shape, with the controls, formats, poster and error handling taken care of. */
export function Video({
  src,
  sources,
  poster,
  label = "Video",
  controls = true,
  autoPlay = false,
  muted = false,
  loop = false,
  playsInline = true,
  preload = "metadata",
  ratio = "16/9",
  fit = "contain",
  rounded = "lg",
  caption,
  fallback,
  onPlay,
  onPause,
  onEnded,
  onLoad,
  onError,
  transition,
  transitionDuration,
  transitionDelay,
  hoverEffect,
  className,
  classNames,
}: VideoProps) {
  // Which source failed, so changing `src` / `sources` gives the new one a fresh chance.
  const key = src ?? sources?.map((s) => s.src).join("|") ?? "";
  const [failed, setFailed] = useState<string | null>(null);
  const hasFailed = failed === key;
  const embed = embedUrl(src, { autoPlay, muted, loop });
  const ratioClass = RATIO_CLASSES[ratio] ?? RATIO_CLASSES["16/9"];
  const empty = !embed && !src && !(sources && sources.length > 0);

  return (
    <figure className={cx("m-0 w-full", motionClass(transition, hoverEffect), className, classNames?.root)} style={motionStyle(transitionDuration, transitionDelay)}>
      <div className={cx("relative overflow-hidden border border-border bg-black", RADIUS_CLASSES[rounded] ?? RADIUS_CLASSES.lg, ratioClass, classNames?.frame)}>
        {empty || hasFailed ? (
          <div role="img" aria-label={label} className="flex h-full min-h-32 w-full flex-col items-center justify-center gap-1.5 bg-surface-muted p-4 text-center text-xs text-fg-subtle">
            {fallback != null ? (
              <slot name="fallback">{fallback}</slot>
            ) : (
              <>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <rect x="2" y="5" width="14" height="14" rx="2" />
                  <path d="m16 10 6-3v10l-6-3" />
                </svg>
                <span>Video unavailable</span>
              </>
            )}
          </div>
        ) : embed ? (
          <iframe
            src={embed}
            title={label}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
        ) : (
          <video
            key={key}
            src={sources && sources.length > 0 ? undefined : src}
            poster={poster}
            aria-label={label}
            controls={controls}
            autoPlay={autoPlay}
            muted={muted || autoPlay}
            loop={loop}
            playsInline={playsInline}
            preload={preload}
            onPlay={() => onPlay?.()}
            onPause={() => onPause?.()}
            onEnded={() => onEnded?.()}
            onLoadedMetadata={(e) => onLoad?.(e.currentTarget.duration)}
            onError={() => {
              setFailed(key);
              onError?.();
            }}
            className={cx("block w-full bg-black", ratioClass ? "h-full" : "h-auto", FIT_CLASSES[fit] ?? FIT_CLASSES.contain, classNames?.video)}
          >
            {sources?.map((s) => <source key={s.src} src={s.src} type={s.type} />)}
          </video>
        )}
      </div>
      {caption && <figcaption className={cx("mt-2 text-center text-xs text-fg-subtle", classNames?.caption)}>{caption}</figcaption>}
    </figure>
  );
}
