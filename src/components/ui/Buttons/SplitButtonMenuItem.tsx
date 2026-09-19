import type { ReactNode } from "react";
import { cx } from "../../../core/tokens";
import { getIcon } from "../../../core/icons";

export interface SplitButtonMenuItemProps {
  /** Icon name, e.g. "trash-2" — see src/core/icons.ts for the available set. */
  icon?: string;
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
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
        "flex w-full items-center gap-2 px-3 py-1.5 text-left text-sm text-slate-700 transition-colors hover:bg-slate-100 disabled:pointer-events-none disabled:opacity-40",
        className
      )}
    >
      {/* eslint-disable-next-line react-hooks/static-components -- see comment above `const Icon` */}
      {Icon && <Icon size={14} />}
      <slot>{children}</slot>
    </button>
  );
}
