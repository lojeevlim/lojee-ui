import type { ReactNode } from "react";
import { cx } from "../../../core/tokens";

export interface AvatarGroupProps {
  children: ReactNode;
  className?: string;
  /** Per-part class overrides — merged after (and win over) the built-in styling. */
  classNames?: {
    root?: string;
  };
}

// Pure CSS overlap (negative margin + a white ring on each direct child) —
// no JS inspection of `children`, so it works unmodified once wrapped as a
// Web Component (r2wc doesn't forward `children`; content arrives via the
// native <slot> instead, same as ButtonGroup).
export function AvatarGroup({ children, className, classNames }: AvatarGroupProps) {
  return (
    <div className={cx("flex -space-x-2 [&>*]:ring-2 [&>*]:ring-white", className, classNames?.root)}>
      <slot>{children}</slot>
    </div>
  );
}
