import type { ReactNode } from "react";
import { cx } from "../../../core/tokens";

export type ContainerSize = "sm" | "md" | "lg" | "xl" | "full";

export interface ContainerProps {
  size?: ContainerSize;
  centered?: boolean;
  padded?: boolean;
  children?: ReactNode;
  className?: string;
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
