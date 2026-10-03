import { useState } from "react";
import { Globe } from "lucide-react";
import { cx } from "../../../core/tokens";
import { motionClass, motionStyle, type TransitionVariant } from "../../../core/motion";
import { Spinner } from "../Spinner/Spinner";

export type IframeRatio = "auto" | "video" | "square" | "wide";

export interface IframeProps {
  /** Address of the page to embed. */
  src: string;
  /** Accessible name of the frame — describe what is embedded. */
  title: string;
  /** Height in px or any CSS length (default: 360). Ignored when `ratio` is not "auto". */
  height?: number | string;
  /** Fixed shape instead of a fixed height: "auto" (use `height`), "video" (16:9), "wide" (21:9) or "square" (default: "auto"). */
  ratio?: IframeRatio;
  /** Restrictions applied to the embedded page, e.g. "allow-scripts allow-same-origin". Empty string applies every restriction; omit for none. */
  sandbox?: string;
  /** Permissions policy of the frame, e.g. "fullscreen; clipboard-write". */
  allow?: string;
  /** "lazy" waits until the frame is near the viewport, "eager" loads it right away (default: "lazy"). */
  loading?: "lazy" | "eager";
  /** Which referrer is sent with the request, e.g. "no-referrer" (default: "strict-origin-when-cross-origin"). */
  referrerPolicy?: string;
  /** Draws a rounded border around the frame (default: true). */
  bordered?: boolean;
  /** Shows a spinner until the page has loaded (default: true). */
  showLoader?: boolean;
  /** Shows a small address bar with the host above the frame (default: false). */
  showAddress?: boolean;
  /** Called when the embedded page has finished loading. */
  onLoad?: () => void;
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
    frame?: string;
    address?: string;
    loader?: string;
  };
}

const RATIO: Record<Exclude<IframeRatio, "auto">, string> = {
  video: "16 / 9",
  wide: "21 / 9",
  square: "1 / 1",
};

function hostOf(src: string): string {
  try {
    return new URL(src, typeof window === "undefined" ? "http://localhost" : window.location.href).host || src;
  } catch {
    return src;
  }
}

/** A page embedded in a frame — with a loading spinner, a fixed height or aspect ratio, sandbox / permission props and an optional address bar. */
export function Iframe({
  src,
  title,
  height = 360,
  ratio = "auto",
  sandbox,
  allow,
  loading = "lazy",
  referrerPolicy = "strict-origin-when-cross-origin",
  bordered = true,
  showLoader = true,
  showAddress = false,
  onLoad,
  transition,
  transitionDuration,
  transitionDelay,
  className,
  classNames,
}: IframeProps) {
  // Which address has finished loading — a new `src` is "not loaded" again without any reset.
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);
  const loaded = loadedSrc === src;

  // A web-component attribute arrives as a string — "320" means 320px.
  const cssHeight = typeof height === "string" && /^\d+$/.test(height) ? `${height}px` : height;
  const sized = ratio === "auto" ? { height: cssHeight } : { aspectRatio: RATIO[ratio] };

  return (
    <div
      className={cx("w-full overflow-hidden bg-surface", bordered && "rounded-xl border border-border shadow-sm", motionClass(transition), className, classNames?.root)}
      style={motionStyle(transitionDuration, transitionDelay)}
    >
      {showAddress && (
        <div className={cx("flex items-center gap-2 border-b border-border bg-surface-muted px-3 py-2 text-xs text-fg-subtle", classNames?.address)}>
          <Globe size={13} className="shrink-0" />
          <span className="truncate font-mono">{hostOf(src)}</span>
        </div>
      )}
      <div className="relative w-full" style={sized}>
        {showLoader && !loaded && (
          <div className={cx("absolute inset-0 flex items-center justify-center bg-surface-muted", classNames?.loader)}>
            <Spinner size="lg" label="Loading" />
          </div>
        )}
        <iframe
          src={src}
          title={title}
          sandbox={sandbox}
          allow={allow}
          loading={loading}
          referrerPolicy={referrerPolicy as React.HTMLAttributeReferrerPolicy}
          onLoad={() => {
            setLoadedSrc(src);
            onLoad?.();
          }}
          className={cx("block h-full w-full border-0", classNames?.frame)}
        />
      </div>
    </div>
  );
}
