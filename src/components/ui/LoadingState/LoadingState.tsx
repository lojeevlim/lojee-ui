import type { ReactNode } from "react";
import { Spinner, type SpinnerSize } from "../Spinner/Spinner";
import { StatusLayout } from "../internal/StatusLayout";
import type { TransitionVariant } from "../../../core/motion";

export type LoadingStateSize = "sm" | "md" | "lg";

export interface LoadingStateProps {
  /** Heading text shown under the spinner (default: "Loading…"). */
  title?: ReactNode;
  /** The description/body. */
  children?: ReactNode;
  /** Spinner and text size: "sm" | "md" | "lg". Defaults to "md". */
  size?: LoadingStateSize;
  /** Enter transition: "fade" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "zoom" | "zoom-out" | "flip" | "blur" | "bounce" | "rotate" | "drop" | "skew" (default: none). Respects `prefers-reduced-motion`. */
  transition?: TransitionVariant;
  /** Enter transition duration in ms (default: 450). */
  transitionDuration?: number;
  /** Delay before the enter transition starts, in ms (default: 0) — handy for staggering. */
  transitionDelay?: number;
  /** Extra class name(s) applied to the root element. */
  className?: string;
  /** Per-part class overrides — merged after (and win over) the built-in styling. */
  classNames?: {
    root?: string;
    spinner?: string;
    title?: string;
    description?: string;
  };
}

// Maps this component's simplified sm/md/lg sizing to Spinner's finer-grained
// scale, keeping LoadingState's own API small while still landing on visually
// sensible Spinner sizes.
const SPINNER_SIZE: Record<LoadingStateSize, SpinnerSize> = {
  sm: "md",
  md: "lg",
  lg: "xl",
};

export function LoadingState({
  title = "Loading…",
  children,
  size = "md",
  transition,
  transitionDuration,
  transitionDelay,
  className,
  classNames,
}: LoadingStateProps) {
  return (
    <StatusLayout
      icon={<Spinner size={SPINNER_SIZE[size]} className={classNames?.spinner} />}
      title={title}
      description={children}
      transition={transition}
      transitionDuration={transitionDuration}
      transitionDelay={transitionDelay}
      className={className}
      classNames={classNames}
    />
  );
}
