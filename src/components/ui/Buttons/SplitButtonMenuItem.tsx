import type { ReactNode } from "react";
import { cx } from "../../../core/tokens";
import { getIcon } from "../../../core/icons";

export interface SplitButtonMenuItemProps {
  /** Icon name, e.g. "trash-2" — see src/core/icons.ts for the available set. */
  icon?: string;
  /** The menu item's label content. */
  children: ReactNode;
  /** Called with no arguments when the item is clicked; the parent menu then closes. */
  onClick?: () => void;
  /** Disables the item so it can't be clicked and doesn't close the menu (default: false). */
  disabled?: boolean;
  /** Extra class names applied to the item's button element. */
  className?: string;
}

// A click bubbles up through SplitButton's menu panel (composed events cross
// the shadow boundary in the Web Component build too), which is what closes
// the menu — this component doesn't need to know about that itself.
export function SplitButtonMenuItem({ icon, children, onClick, disabled = false, className }: SplitButtonMenuItemProps) {
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
        "flex w-full items-center gap-2 px-3 py-1.5 text-left text-sm text-fg-muted transition-colors hover:bg-surface-muted disabled:pointer-events-none disabled:opacity-40",
        className
      )}
    >
      {/* eslint-disable-next-line react-hooks/static-components -- see comment above `const Icon` */}
      {Icon && <Icon size={14} />}
      <slot>{children}</slot>
    </button>
  );
}
