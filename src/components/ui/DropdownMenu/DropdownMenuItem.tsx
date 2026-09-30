import type { ReactNode } from "react";
import { cx } from "../../../core/tokens";
import { getIcon } from "../../../core/icons";

export interface DropdownMenuItemProps {
  /** Icon name, e.g. "pencil" — see src/core/icons.ts for the available set. */
  icon?: string;
  /** The item's label content. */
  children: ReactNode;
  /** Fires when the item is clicked (never for a disabled item); the parent menu closes afterwards. */
  onClick?: () => void;
  /** Disables the item so it can't be clicked (default: false). */
  disabled?: boolean;
  /** Styles the item for a destructive action (rose text). */
  danger?: boolean;
  /** Extra class name(s) applied to the root element. */
  className?: string;
  /** Per-part class overrides — merged after (and win over) the built-in styling. */
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
        danger ? "text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/40" : "text-fg-muted hover:bg-surface-muted",
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
