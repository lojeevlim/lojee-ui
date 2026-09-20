import type { ReactNode } from "react";
import { cx } from "../../../core/tokens";
import { getIcon } from "../../../core/icons";

export interface BreadcrumbItemProps {
  /** If provided, renders as a link; if omitted, renders as the current/final non-link item. */
  href?: string;
  /** Icon name, e.g. "home" — see src/core/icons.ts for the available set. */
  icon?: string;
  children?: ReactNode;
  className?: string;
  classNames?: {
    root?: string;
    separator?: string;
    icon?: string;
  };
}

export function BreadcrumbItem({ href, icon, children, className, classNames }: BreadcrumbItemProps) {
  // getIcon() always returns the same stable, module-level-imported
  // component reference for a given name, so this never actually causes a
  // remount — the lint rule can't verify that statically, hence the disable.
  const Icon = getIcon(icon);
  const SeparatorIcon = getIcon("chevron-right");

  return (
    <li className="flex items-center gap-1.5">
      {/*
        Each item draws its own leading separator, hidden on the first item via
        Tailwind's `first:` variant (which maps to the `:first-child` CSS
        selector). This lets Breadcrumbs stay a dumb wrapper with no
        coordination needed — `:first-child` is evaluated against the real DOM
        tree, so it works the same whether this item arrives as a plain React
        child or as light-DOM-projected content in the Web Component build.
      */}
      <span aria-hidden="true" className={cx("flex text-slate-300 first:hidden", classNames?.separator)}>
        {/* eslint-disable-next-line react-hooks/static-components -- see comment above `const Icon` */}
        {SeparatorIcon && <SeparatorIcon size={14} />}
      </span>
      {href ? (
        <a
          href={href}
          className={cx(
            "flex items-center gap-1 text-sm text-slate-500 transition-colors hover:text-slate-900",
            className,
            classNames?.root
          )}
        >
          {/* eslint-disable-next-line react-hooks/static-components -- see comment above `const Icon` */}
          {Icon && <Icon size={14} />}
          <slot>{children}</slot>
        </a>
      ) : (
        <span
          aria-current="page"
          className={cx("flex items-center gap-1 text-sm font-medium text-slate-900", className, classNames?.root)}
        >
          {/* eslint-disable-next-line react-hooks/static-components -- see comment above `const Icon` */}
          {Icon && <Icon size={14} />}
          <slot>{children}</slot>
        </span>
      )}
    </li>
  );
}
