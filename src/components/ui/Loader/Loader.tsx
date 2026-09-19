import type { CSSProperties } from "react";
import { cx } from "../../../core/tokens";

export type LoaderShape = "text" | "circle" | "rect";
export type LoaderVariant = "pulse" | "shimmer" | "wave" | "none";

export interface LoaderProps {
  shape?: LoaderShape;
  /**
   * Animation style for the skeleton (default: "pulse"). "wave" is like
   * "pulse" but staggers each line's delay so multiple lines ripple instead
   * of fading in sync — for "circle"/"rect" (a single block) it looks the
   * same as "pulse". "none" disables animation entirely.
   */
  variant?: LoaderVariant;
  /** Pixel width, for "rect" and "circle" (defaults to a sensible size per shape). */
  width?: number;
  /** Pixel height, for "rect" (defaults to a sensible size per shape). */
  height?: number;
  /** Number of stacked lines, for "text" only. */
  lines?: number;
  className?: string;
  /** Per-part class overrides — merged after (and win over) the built-in styling. */
  classNames?: {
    root?: string;
    /** Each skeleton line, for "text" only ("circle"/"rect" only render a root). */
    item?: string;
  };
}

const BASE = "rounded-md bg-slate-200";

// A single skeleton block. `delayMs` staggers "wave"'s animate-pulse across
// sibling items — unused by the other variants.
function Skeleton({
  variant,
  delayMs,
  className,
  style,
}: {
  variant: LoaderVariant;
  delayMs?: number;
  className: string;
  style?: CSSProperties;
}) {
  if (variant === "shimmer") {
    return (
      // The sweep overlay is absolutely positioned inside this block, so it
      // needs `overflow-hidden` + `relative` on the block itself.
      <span className={cx(className, "relative overflow-hidden")} style={style}>
        <span className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent" />
      </span>
    );
  }
  if (variant === "none") {
    return <span className={className} style={style} />;
  }
  return (
    <span
      className={cx(className, "animate-pulse")}
      style={delayMs ? { ...style, animationDelay: `${delayMs}ms` } : style}
    />
  );
}

export function Loader({
  shape = "text",
  variant = "pulse",
  width,
  height,
  lines = 3,
  className,
  classNames,
}: LoaderProps) {
  if (shape === "circle") {
    const size = width ?? 40;
    return (
      <Skeleton
        variant={variant}
        className={cx(BASE, "block rounded-full", className, classNames?.root)}
        style={{ width: size, height: size }}
      />
    );
  }

  if (shape === "rect") {
    return (
      <Skeleton
        variant={variant}
        className={cx(BASE, "block", className, classNames?.root)}
        style={{ width: width ?? "100%", height: height ?? 100 }}
      />
    );
  }

  return (
    <div className={cx("flex flex-col gap-2", className, classNames?.root)}>
      {Array.from({ length: lines }, (_, i) => (
        <Skeleton
          key={i}
          variant={variant}
          delayMs={variant === "wave" ? i * 150 : undefined}
          className={cx(BASE, "block h-3", i === lines - 1 ? "w-2/3" : "w-full", classNames?.item)}
        />
      ))}
    </div>
  );
}
