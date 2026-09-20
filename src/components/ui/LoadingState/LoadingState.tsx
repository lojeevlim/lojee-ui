import type { ReactNode } from "react";
import { Spinner, type SpinnerSize } from "../Spinner/Spinner";
import { StatusLayout } from "../internal/StatusLayout";

export type LoadingStateSize = "sm" | "md" | "lg";

export interface LoadingStateProps {
  title?: ReactNode;
  /** The description/body. */
  children?: ReactNode;
  size?: LoadingStateSize;
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

export function LoadingState({ title = "Loading…", children, size = "md", className, classNames }: LoadingStateProps) {
  return (
    <StatusLayout
      icon={<Spinner size={SPINNER_SIZE[size]} color="slate" className={classNames?.spinner} />}
      title={title}
      description={children}
      className={className}
      classNames={classNames}
    />
  );
}
