import { cx } from "../../../core/tokens";
import { Avatar } from "../Avatar/Avatar";
import { DropdownMenu, type DropdownMenuAlign } from "../DropdownMenu/DropdownMenu";
import { DropdownMenuItem } from "../DropdownMenu/DropdownMenuItem";

export interface UserMenuItem {
  label: string;
  /** Icon name, e.g. "settings" — see src/core/icons.ts for the available set. */
  icon?: string;
  /** Styles the item for a destructive action (rose text), e.g. "Log out". */
  danger?: boolean;
}

export interface UserMenuProps {
  name: string;
  email?: string;
  avatarSrc?: string;
  avatarInitials?: string;
  items: UserMenuItem[];
  onItemSelect?: (item: UserMenuItem, index: number) => void;
  /** Which edge of the trigger the panel hugs (default "end" — a user menu is
   * almost always top-right, so its panel should hug the right edge). */
  align?: DropdownMenuAlign;
  className?: string;
  classNames?: { root?: string; trigger?: string; menu?: string };
}

// Data-driven `items` (not compound children) — unlike DropdownMenu itself,
// which only needs to opaquely display whatever's projected into it, this
// component needs to know each item's icon/label/danger to render it and to
// identify which item was clicked for `onItemSelect`. Composing the actual
// <DropdownMenu>/<DropdownMenuItem> here is plain internal React rendering
// within UserMenu's own render output — not a light-DOM boundary crossing —
// so it still works once UserMenu itself is wrapped as a Web Component.
export function UserMenu({
  name,
  email,
  avatarSrc,
  avatarInitials,
  items,
  onItemSelect,
  align = "end",
  className,
  classNames,
}: UserMenuProps) {
  return (
    <DropdownMenu
      align={align}
      className={cx(className, classNames?.root)}
      classNames={{ menu: cx("min-w-[14rem] py-0", classNames?.menu) }}
      trigger={
        <button
          type="button"
          className={cx(
            "flex items-center gap-2 rounded-md px-1.5 py-1 text-left transition-colors hover:bg-slate-100",
            classNames?.trigger
          )}
        >
          <Avatar src={avatarSrc} initials={avatarInitials} alt={name} size="sm" />
          <span className="hidden text-sm font-medium text-slate-700 sm:inline">{name}</span>
        </button>
      }
    >
      <div className="border-b border-slate-100 px-3 py-2">
        <p className="truncate text-sm font-medium text-slate-900">{name}</p>
        {email && <p className="truncate text-xs text-slate-400">{email}</p>}
      </div>
      <div className="py-1">
        {items.map((item, index) => (
          <DropdownMenuItem
            key={index}
            icon={item.icon}
            danger={item.danger}
            onClick={() => onItemSelect?.(item, index)}
          >
            {item.label}
          </DropdownMenuItem>
        ))}
      </div>
    </DropdownMenu>
  );
}
