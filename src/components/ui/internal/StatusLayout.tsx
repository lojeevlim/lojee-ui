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
  /** Heading shown under the icon. */
  title: ReactNode;
  /** Body text under the title; omitted entirely when not provided. */
  description?: ReactNode;
  /** Element rendered below the description, e.g. a button; omitted when not provided. */
  action?: ReactNode;
  /** Extra class name(s) appended to the root element. */
  className?: string;
  /** Per-part class overrides — merged after (and win over) the built-in styling. */
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
      <h3 className={cx("mt-4 text-base font-semibold text-fg", classNames?.title)}>
        <slot name="title">{title}</slot>
      </h3>
      {description != null && (
        <div className={cx("mt-1 max-w-sm text-sm text-fg-subtle", classNames?.description)}>
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
