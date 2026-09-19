import type { ReactNode } from "react";
import { cx } from "../../../core/tokens";
import { getIcon } from "../../../core/icons";

export interface ListItemProps {
  /** Icon name, e.g. "check" — see src/core/icons.ts for the available set. */
  icon?: string;
  children?: ReactNode;
  className?: string;
  classNames?: {
    root?: string;
    icon?: string;
  };
}

export function ListItem({ icon, children, className, classNames }: ListItemProps) {
  // getIcon() always returns the same stable, module-level-imported
  // component reference for a given name, so this never actually causes a
  // remount — the lint rule can't verify that statically, hence the disable.
  const Icon = getIcon(icon);
  return (
    <li className={cx("flex items-center gap-2.5 px-3 py-2.5 text-sm text-slate-700", className, classNames?.root)}>
      {/* eslint-disable-next-line react-hooks/static-components -- see comment above `const Icon` */}
      {Icon && <Icon size={16} className={cx("shrink-0 text-slate-400", classNames?.icon)} />}
      <slot>{children}</slot>
    </li>
  );
}
