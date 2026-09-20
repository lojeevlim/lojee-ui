import type { ReactNode } from "react";
import { cx } from "../../../core/tokens";
import { getIcon } from "../../../core/icons";

export interface AccordionItemProps {
  title: ReactNode;
  /** Shared value across sibling AccordionItems for native browser exclusive-open grouping (same mechanism as radio inputs' `name`) — the browser itself keeps only one open. Omit for an independently toggleable item. */
  name?: string;
  defaultOpen?: boolean;
  disabled?: boolean;
  children?: ReactNode;
  className?: string;
  classNames?: {
    root?: string;
    trigger?: string;
    icon?: string;
    panel?: string;
  };
}

export function AccordionItem({ title, name, defaultOpen, disabled = false, children, className, classNames }: AccordionItemProps) {
  // getIcon() always returns the same stable, module-level-imported
  // component reference for a given name, so this never actually causes a
  // remount — the lint rule can't verify that statically, hence the disable.
  const ChevronDownIcon = getIcon("chevron-down");
  return (
    // Built on native <details>/<summary> with a shared `name` — modern
    // browsers make same-named <details> elements mutually exclusive with
    // zero JS, which is the only way to coordinate sibling items once they
    // may arrive as separately-mounted Web Components with their own shadow
    // roots (see the constraint documented at the top of this component pair).
    <details name={name} open={defaultOpen} className={cx("group", disabled && "pointer-events-none opacity-40", className, classNames?.root)}>
      <summary
        className={cx(
          "flex cursor-pointer list-none items-center justify-between gap-2 px-4 py-3 text-sm font-medium text-slate-900 [&::-webkit-details-marker]:hidden",
          classNames?.trigger
        )}
      >
        <slot name="title">{title}</slot>
        {/* eslint-disable-next-line react-hooks/static-components -- see comment above `const ChevronDownIcon` */}
        {ChevronDownIcon && <ChevronDownIcon size={16} className={cx("shrink-0 text-slate-400 transition-transform group-open:rotate-180", classNames?.icon)} />}
      </summary>
      <div className={cx("px-4 pb-4 text-sm text-slate-600", classNames?.panel)}>
        <slot>{children}</slot>
      </div>
    </details>
  );
}
