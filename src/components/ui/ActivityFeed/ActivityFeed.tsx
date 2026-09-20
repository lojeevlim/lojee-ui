import { cx, type ColorName } from "../../../core/tokens";
import { Avatar } from "../Avatar/Avatar";
import { Icon } from "../Icons/Icon";

export interface ActivityItem {
  /** Display name, e.g. "Alex Chen". */
  actor: string;
  /** Avatar initials — passed straight to Avatar's `initials` prop. */
  avatarInitials?: string;
  /** Avatar image URL — passed straight to Avatar's `src` prop; Avatar itself
   * prefers `src` over `initials` when both are given. */
  avatarSrc?: string;
  /** The verb/action phrase, e.g. "commented on", "closed". */
  action: string;
  /** The object of the action, e.g. "Q3 Report" — omit for actions with no
   * target, e.g. "joined the team". */
  target?: string;
  timestamp: string;
  /** Icon name (src/core/icons.ts) shown as a small badge on the avatar's corner. */
  icon?: string;
  /** Tints the icon badge (default "slate"). */
  color?: ColorName;
}

// Data-driven (array-of-items prop) rather than compound children — same
// reasoning as BottomNavigation/Stepper/Timeline: once wrapped as a Web
// Component via r2wc, arbitrary light-DOM children can't be inspected
// across the shadow boundary, so a plain data array is the only shape that
// works identically in both the React and Web Component builds.
export interface ActivityFeedProps {
  items: ActivityItem[];
  /** Denser spacing and smaller avatars, for sidebars or narrow panels. */
  compact?: boolean;
  className?: string;
  classNames?: {
    root?: string;
    item?: string;
    avatar?: string;
    content?: string;
    timestamp?: string;
  };
}

const ICON_BADGE_BG: Record<ColorName, string> = {
  slate: "bg-slate-500",
  gray: "bg-gray-500",
  indigo: "bg-indigo-500",
  violet: "bg-violet-500",
  blue: "bg-blue-500",
  cyan: "bg-cyan-500",
  emerald: "bg-emerald-500",
  teal: "bg-teal-500",
  amber: "bg-amber-500",
  orange: "bg-orange-500",
  rose: "bg-rose-500",
  pink: "bg-pink-500",
};

export function ActivityFeed({ items, compact = false, className, classNames }: ActivityFeedProps) {
  return (
    <div className={cx("divide-y divide-slate-100", className, classNames?.root)}>
      {items.map((item, i) => (
        <div key={i} className={cx("flex items-start gap-3", compact ? "py-2" : "py-3", classNames?.item)}>
          <span className="relative shrink-0">
            <Avatar
              initials={item.avatarInitials}
              src={item.avatarSrc}
              size={compact ? "sm" : "md"}
              className={classNames?.avatar}
            />
            {item.icon && (
              <span
                className={cx(
                  "absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full text-white ring-2 ring-white",
                  ICON_BADGE_BG[item.color ?? "slate"]
                )}
              >
                <Icon name={item.icon} size={10} />
              </span>
            )}
          </span>
          <div className={cx("min-w-0 flex-1", classNames?.content)}>
            <p className="text-sm text-slate-700">
              <span className="font-medium text-slate-900">{item.actor}</span> {item.action}
              {item.target && (
                <>
                  {" "}
                  <span className="font-medium text-slate-900">{item.target}</span>
                </>
              )}
            </p>
            <p className={cx("mt-0.5 text-xs text-slate-400", classNames?.timestamp)}>{item.timestamp}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
