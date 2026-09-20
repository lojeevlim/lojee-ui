import type { ReactNode } from "react";
import { cx } from "../../../core/tokens";
import { getIcon } from "../../../core/icons";
import { Tooltip, type TooltipPosition } from "../Tooltip/Tooltip";

export interface ListItemProps {
  /** Icon name, e.g. "check" — see src/core/icons.ts for the available set. */
  icon?: string;
  children?: ReactNode;
  /**
   * Wraps the row in a Tooltip showing `children` as its content and hides the visible label —
   * handy when this item lives inside a collapsed icon-only rail (e.g. Sidebar's `collapsed` state).
   * Keep passing `children` (the label) even when collapsed; this just controls whether it renders
   * inline or inside the tooltip.
   */
  tooltip?: boolean;
  /** Tooltip placement when `tooltip` is set (default: "right" — the usual fly-out direction for a
   * left-docked collapsed rail). */
  tooltipPosition?: TooltipPosition;
  className?: string;
  classNames?: {
    root?: string;
    icon?: string;
    tooltip?: string;
  };
}

export function ListItem({
  icon,
  children,
  tooltip = false,
  tooltipPosition = "right",
  className,
  classNames,
}: ListItemProps) {
  // getIcon() always returns the same stable, module-level-imported
  // component reference for a given name, so this never actually causes a
  // remount — the lint rule can't verify that statically, hence the disable.
  const Icon = getIcon(icon);
  const showTooltip = tooltip && children != null;

  const iconEl = Icon && (
    // eslint-disable-next-line react-hooks/static-components -- see comment above `const Icon`
    <Icon size={16} className={cx("shrink-0 text-slate-400", classNames?.icon)} />
  );

  return (
    <li className={cx("flex items-center gap-2.5 px-3 py-2.5 text-sm text-slate-700", className, classNames?.root)}>
      {showTooltip ? (
        // Tooltip's own root is a <span> — wrapped around just the icon here
        // (not the <li> itself), so this row stays a valid direct child of
        // the parent <List>'s <ul>/<ol>.
        <Tooltip content={children} position={tooltipPosition} classNames={{ root: cx("flex", classNames?.tooltip) }}>
          {iconEl}
        </Tooltip>
      ) : (
        <>
          {iconEl}
          <slot>{children}</slot>
        </>
      )}
    </li>
  );
}
