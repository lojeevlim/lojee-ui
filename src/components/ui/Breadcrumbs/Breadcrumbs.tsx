import type { ReactNode } from "react";
import { cx } from "../../../core/tokens";

export interface BreadcrumbsProps {
  children?: ReactNode;
  className?: string;
  classNames?: {
    root?: string;
  };
}

export function Breadcrumbs({ children, className, classNames }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className={cx("flex flex-wrap items-center gap-1.5", className, classNames?.root)}>
        <slot>{children}</slot>
      </ol>
    </nav>
  );
}
