// Shared, NON-EXPORTED layout for the "status placeholder" family of
// components (EmptyState, ErrorState, SuccessState, LoadingState) — they all
// render the same icon-or-spinner + title + description + action skeleton,
// differing only in the icon markup/color tokens each one builds. This file
// is an internal implementation detail: it has no barrel entry, is never
// registered as its own component or Web Component, and nothing outside the
// 4 "*State" components imports it.
import type { ReactNode } from "react";
import { cx } from "../../../core/tokens";

export interface StatusLayoutClassNames {
  root?: string;
  title?: string;
  description?: string;
  action?: string;
}

export interface StatusLayoutProps {
  /** The already-styled icon (or spinner) element, including its own wrapper/circle markup. */
  icon: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  className?: string;
  classNames?: StatusLayoutClassNames;
}

export function StatusLayout({ icon, title, description, action, className, classNames }: StatusLayoutProps) {
  return (
    <div
      className={cx(
        "flex flex-col items-center justify-center gap-0.5 rounded-xl p-10 text-center",
        className,
        classNames?.root
      )}
    >
      {icon}
      <h3 className={cx("mt-4 text-base font-semibold text-slate-900", classNames?.title)}>
        <slot name="title">{title}</slot>
      </h3>
      {description != null && (
        <div className={cx("mt-1 max-w-sm text-sm text-slate-500", classNames?.description)}>
          <slot>{description}</slot>
        </div>
      )}
      {action != null && (
        <div className={cx("mt-5", classNames?.action)}>
          <slot name="action">{action}</slot>
        </div>
      )}
    </div>
  );
}
