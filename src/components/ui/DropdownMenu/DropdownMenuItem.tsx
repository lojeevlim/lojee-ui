import type { ReactNode } from "react";
import { cx } from "../../../core/tokens";
import { getIcon } from "../../../core/icons";

export interface DropdownMenuItemProps {
  /** Icon name, e.g. "pencil" — see src/core/icons.ts for the available set. */
  icon?: string;
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  /** Styles the item for a destructive action (rose text). */
  danger?: boolean;
  className?: string;
  classNames?: {
    root?: string;
    icon?: string;
  };
}

// A click bubbles up through the dropdown/context menu panel (composed
// events cross the shadow boundary in the Web Component build too), which is
// what closes the menu — this component doesn't need to know about that itself.
export function DropdownMenuItem({
  icon,
  children,
  onClick,
  disabled = false,
  danger = false,
  className,
  classNames,
}: DropdownMenuItemProps) {
  // getIcon() always returns the same stable, module-level-imported
  // component reference for a given name, so this never actually causes a
  // remount — the lint rule can't verify that statically, hence the disable.
  const Icon = getIcon(icon);
  return (
    <button
      type="button"
      role="menuitem"
      disabled={disabled}
      onClick={onClick}
      className={cx(
        "flex w-full items-center gap-2 px-3 py-1.5 text-left text-sm transition-colors disabled:pointer-events-none disabled:opacity-40",
        danger ? "text-rose-600 hover:bg-rose-50" : "text-slate-700 hover:bg-slate-100",
        className,
        classNames?.root
      )}
    >
      {/* eslint-disable-next-line react-hooks/static-components -- see comment above `const Icon` */}
      {Icon && <Icon size={14} className={classNames?.icon} />}
      <slot>{children}</slot>
    </button>
  );
}
