import type { ReactNode } from "react";
import { cx } from "../../../core/tokens";

export interface HeaderProps {
  title: ReactNode;
  description?: ReactNode;
  /** Optional content above the title, e.g. a <Breadcrumbs> trail. */
  breadcrumbs?: ReactNode;
  /** Right-side content — action buttons. */
  actions?: ReactNode;
  className?: string;
  classNames?: {
    root?: string;
    breadcrumbs?: string;
    title?: string;
    description?: string;
    actions?: string;
  };
}

export function Header({ title, description, breadcrumbs, actions, className, classNames }: HeaderProps) {
  return (
    <div className={cx("flex flex-col gap-1 pb-6 border-b border-slate-200", className, classNames?.root)}>
      {breadcrumbs != null && (
        <div className={cx("mb-1", classNames?.breadcrumbs)}>
          <slot name="breadcrumbs">{breadcrumbs}</slot>
        </div>
      )}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h1 className={cx("text-xl font-semibold text-slate-900", classNames?.title)}>
            <slot name="title">{title}</slot>
          </h1>
          {description != null && (
            <p className={cx("mt-1 text-sm text-slate-500", classNames?.description)}>
              <slot name="description">{description}</slot>
            </p>
          )}
        </div>
        {actions != null && (
          <div className={cx("flex shrink-0 items-center gap-2", classNames?.actions)}>
            <slot name="actions">{actions}</slot>
          </div>
        )}
      </div>
    </div>
  );
}
