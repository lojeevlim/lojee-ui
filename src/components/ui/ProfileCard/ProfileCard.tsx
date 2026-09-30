import type { ReactNode } from "react";
import { cx, type ColorName } from "../../../core/tokens";
import { Avatar } from "../Avatar/Avatar";

export interface ProfileCardStat {
  label: string;
  value: string | number;
}

export interface ProfileCardProps {
  /** The person's display name, shown as the card heading. */
  name: string;
  /** e.g. "Product Designer at Acme". */
  role?: string;
  /** Short biography paragraph shown below the role. */
  bio?: string;
  /** Image URL for the avatar; falls back to `avatarInitials` when omitted. */
  avatarSrc?: string;
  /** Initials shown in the avatar when there is no `avatarSrc`. */
  avatarInitials?: string;
  /** A short row of stats, e.g. Followers/Following/Posts. */
  stats?: ProfileCardStat[];
  /** Action buttons/content, e.g. Follow + Message buttons — this component doesn't know about
   * Button, the consumer supplies real elements here. */
  actions?: ReactNode;
  /** Accent color for the banner strip behind the avatar (default "accent"). */
  color?: ColorName;
  /** Extra CSS class(es) added to the root element, merged before `classNames.root`. */
  className?: string;
  /** Per-part class overrides — merged after (and win over) the built-in styling. */
  classNames?: {
    root?: string;
    banner?: string;
    avatar?: string;
    stats?: string;
    actions?: string;
  };
}

// SVG fill/stroke elsewhere in this library (e.g. Chart) needs real color
// values, but this is a plain CSS background — a `Record<ColorName, string>`
// of literal Tailwind classes still applies here, same as every other
// color-accented component (Badge, Sidebar, ...).
const BANNER_CLASSES: Record<ColorName, string> = {
  slate: "bg-gradient-to-r from-slate-700 to-slate-500",
  gray: "bg-gradient-to-r from-gray-700 to-gray-500",
  indigo: "bg-gradient-to-r from-indigo-600 to-violet-500",
  accent: "bg-gradient-to-r from-accent-600 to-violet-500",
  violet: "bg-gradient-to-r from-violet-600 to-purple-500",
  blue: "bg-gradient-to-r from-blue-600 to-cyan-500",
  cyan: "bg-gradient-to-r from-cyan-600 to-sky-500",
  emerald: "bg-gradient-to-r from-emerald-600 to-teal-500",
  teal: "bg-gradient-to-r from-teal-600 to-cyan-500",
  amber: "bg-gradient-to-r from-amber-500 to-orange-500",
  orange: "bg-gradient-to-r from-orange-600 to-amber-500",
  rose: "bg-gradient-to-r from-rose-600 to-pink-500",
  pink: "bg-gradient-to-r from-pink-600 to-rose-500",
};

export function ProfileCard({
  name,
  role,
  bio,
  avatarSrc,
  avatarInitials,
  stats,
  actions,
  color = "accent",
  className,
  classNames,
}: ProfileCardProps) {
  return (
    <div
      className={cx(
        "w-full overflow-hidden rounded-xl border border-border bg-surface",
        className,
        classNames?.root
      )}
    >
      <div className={cx("h-16", BANNER_CLASSES[color], classNames?.banner)} />

      <div className="px-5 pb-5">
        <div className={cx("-mt-8 mb-3", classNames?.avatar)}>
          <Avatar
            src={avatarSrc}
            initials={avatarInitials}
            size="xl"
            className="ring-4 ring-surface"
          />
        </div>

        <h3 className="text-lg font-semibold text-fg">{name}</h3>
        {role != null && <p className="mt-0.5 text-sm text-fg-subtle">{role}</p>}
        {bio != null && <p className="mt-3 text-sm leading-relaxed text-fg-muted">{bio}</p>}

        {stats != null && stats.length > 0 && (
          <div className={cx("mt-4 flex divide-x divide-border border-t border-border pt-4", classNames?.stats)}>
            {stats.map((stat, i) => (
              <div key={i} className="flex-1 px-2 text-center first:pl-0 last:pr-0">
                <p className="text-base font-semibold text-fg">{stat.value}</p>
                <p className="text-xs text-fg-subtle">{stat.label}</p>
              </div>
            ))}
          </div>
        )}

        {actions != null && (
          <div className={cx("mt-4 flex items-center gap-2", classNames?.actions)}>
            <slot name="actions">{actions}</slot>
          </div>
        )}
      </div>
    </div>
  );
}
