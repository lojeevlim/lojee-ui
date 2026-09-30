import type { ReactNode } from "react";
import { cx } from "../../../core/tokens";

export type ContainerSize = "sm" | "md" | "lg" | "xl" | "full";

export interface ContainerProps {
  /** Maximum width of the container: "sm" | "md" | "lg" | "xl" | "full" (no max width). Defaults to "lg". */
  size?: ContainerSize;
  /** Horizontally centers the container with auto side margins (default: true). */
  centered?: boolean;
  /** Adds horizontal padding (px-4) inside the container (default: true). */
  padded?: boolean;
  /** Content rendered inside the container. */
  children?: ReactNode;
  /** Extra class name(s) applied to the root element. */
  className?: string;
  /** Per-part class overrides — merged after (and win over) the built-in styling. */
  classNames?: { root?: string };
}

const SIZE_CLASSES: Record<ContainerSize, string> = {
  sm: "max-w-xl",
  md: "max-w-3xl",
  lg: "max-w-5xl",
  xl: "max-w-7xl",
  full: "max-w-none",
};

export function Container({
  size = "lg",
  centered = true,
  padded = true,
  children,
  className,
  classNames,
}: ContainerProps) {
  return (
    <div
      className={cx(
        "w-full",
        SIZE_CLASSES[size],
        centered && "mx-auto",
        padded && "px-4",
        className,
        classNames?.root
      )}
    >
      <slot>{children}</slot>
    </div>
  );
}
