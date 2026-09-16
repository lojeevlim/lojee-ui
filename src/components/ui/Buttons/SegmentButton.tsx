import type { ButtonHTMLAttributes } from "react";
import { cx } from "../../../core/tokens";
import { getIcon } from "../../../core/icons";

export interface SegmentButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Icon name, e.g. "bold" — see src/core/icons.ts for the available set. */
  icon?: string;
  active?: boolean;
}

export function SegmentButton({
  icon,
  active = false,
  children,
  onClick,
  type = "button",
  ...rest
}: SegmentButtonProps) {
  // getIcon() always returns the same stable, module-level-imported
  // component reference for a given name, so this never actually causes a
  // remount — the lint rule can't verify that statically, hence the disable.
  const Icon = getIcon(icon);
  return (
    <button
      type={type}
      onClick={onClick}
      aria-pressed={active}
      className={cx(
        "inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium transition-colors",
        active ? "bg-slate-900 text-white" : "bg-white text-slate-600 hover:bg-slate-50"
      )}
      {...rest}
    >
      {/* eslint-disable-next-line react-hooks/static-components -- see comment above `const Icon` */}
      {Icon && <Icon size={15} />}
      <slot>{children}</slot>
    </button>
  );
}
