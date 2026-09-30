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
  /** The user's display name, shown in the trigger and at the top of the menu; also the avatar's alt text. */
  name: string;
  /** Email address shown under the name at the top of the menu. */
  email?: string;
  /** Image URL for the avatar; falls back to `avatarInitials` when omitted. */
  avatarSrc?: string;
  /** Initials shown in the avatar when no `avatarSrc` is given. */
  avatarInitials?: string;
  /** Menu entries, in order — each has a `label`, and optional `icon` and `danger`. */
  items: UserMenuItem[];
  /** Called with the clicked item and its index in `items` when the user selects a menu entry. */
  onItemSelect?: (item: UserMenuItem, index: number) => void;
  /** Which edge of the trigger the panel hugs (default "end" — a user menu is
   * almost always top-right, so its panel should hug the right edge). */
  align?: DropdownMenuAlign;
  /** Extra class name(s) appended to the root element. */
  className?: string;
  /** Per-part class overrides — merged after (and win over) the built-in styling. */
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
            "flex items-center gap-2 rounded-md px-1.5 py-1 text-left transition-colors hover:bg-surface-muted",
            classNames?.trigger
          )}
        >
          <Avatar src={avatarSrc} initials={avatarInitials} alt={name} size="sm" />
          <span className="hidden text-sm font-medium text-fg-muted sm:inline">{name}</span>
        </button>
      }
    >
      <div className="border-b border-border px-3 py-2">
        <p className="truncate text-sm font-medium text-fg">{name}</p>
        {email && <p className="truncate text-xs text-fg-subtle">{email}</p>}
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
