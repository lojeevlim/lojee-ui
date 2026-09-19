import type { ButtonHTMLAttributes } from "react";
import { colorClasses, cx, nonInteractive, type ColorName } from "../../../core/tokens";
import { getIcon } from "../../../core/icons";

export interface SegmentButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Icon name, e.g. "bold" — see src/core/icons.ts for the available set. */
  icon?: string;
  active?: boolean;
  /** Highlight color when active — same palette as Button (default: slate). Inactive segments stay neutral. */
  color?: ColorName;
  /** Per-part class overrides — merged after (and win over) the built-in styling. */
  classNames?: {
    root?: string;
    icon?: string;
  };
}

export function SegmentButton({
  icon,
  active = false,
  color = "slate",
  children,
  onClick,
  type = "button",
  className,
  classNames,
  ...rest
}: SegmentButtonProps) {
  // getIcon() always returns the same stable, module-level-imported
  // component reference for a given name, so this never actually causes a
  // remount — the lint rule can't verify that statically, hence the disable.
  const Icon = getIcon(icon);
  const activeClass = nonInteractive((colorClasses[color] || colorClasses.slate).solid);
  return (
    <button
      type={type}
      onClick={onClick}
      aria-pressed={active}
      className={cx(
        "inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium transition-colors",
        active ? activeClass : "bg-white text-slate-600 hover:bg-slate-50",
        className,
        classNames?.root
      )}
      {...rest}
    >
      {/* eslint-disable-next-line react-hooks/static-components -- see comment above `const Icon` */}
      {Icon && <Icon size={15} className={classNames?.icon} />}
      <slot>{children}</slot>
    </button>
  );
}
