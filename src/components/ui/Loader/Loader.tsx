import { cx } from "../../../core/tokens";

export type LoaderShape = "text" | "circle" | "rect";

export interface LoaderProps {
  shape?: LoaderShape;
  /** Pixel width, for "rect" and "circle" (defaults to a sensible size per shape). */
  width?: number;
  /** Pixel height, for "rect" (defaults to a sensible size per shape). */
  height?: number;
  /** Number of stacked lines, for "text" only. */
  lines?: number;
  className?: string;
}

const BASE = "animate-pulse rounded-md bg-slate-200";

export function Loader({ shape = "text", width, height, lines = 3, className }: LoaderProps) {
  if (shape === "circle") {
    const size = width ?? 40;
    return (
      <span
        className={cx(BASE, "block rounded-full", className)}
        style={{ width: size, height: size }}
      />
    );
  }

  if (shape === "rect") {
    return (
      <span
        className={cx(BASE, "block", className)}
        style={{ width: width ?? "100%", height: height ?? 100 }}
      />
    );
  }

  return (
    <div className={cx("flex flex-col gap-2", className)}>
      {Array.from({ length: lines }, (_, i) => (
        <span
          key={i}
          className={cx(BASE, "block h-3", i === lines - 1 ? "w-2/3" : "w-full")}
        />
      ))}
    </div>
  );
}
