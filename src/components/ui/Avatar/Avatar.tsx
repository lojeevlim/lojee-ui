import { useState } from "react";
import { colorClasses, cx, type ColorName } from "../../../core/tokens";

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";
export type AvatarShape = "circle" | "square";
export type AvatarStatus = "online" | "offline" | "busy" | "away";

export interface AvatarProps {
  src?: string;
  alt?: string;
  /** Fallback text shown when there's no image, or the image fails to load. */
  initials?: string;
  size?: AvatarSize;
  shape?: AvatarShape;
  status?: AvatarStatus;
  /** Background color for the initials fallback. */
  color?: ColorName;
  className?: string;
  /** Per-part class overrides — merged after (and win over) the built-in styling. */
  classNames?: {
    root?: string;
    image?: string;
    fallback?: string;
    status?: string;
  };
}

const SIZE_PX: Record<AvatarSize, number> = { xs: 24, sm: 32, md: 40, lg: 48, xl: 64 };

const TEXT_SIZE: Record<AvatarSize, string> = {
  xs: "text-[10px]",
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
  xl: "text-lg",
};

const STATUS_CLASSES: Record<AvatarStatus, string> = {
  online: "bg-emerald-500",
  offline: "bg-slate-400",
  busy: "bg-rose-500",
  away: "bg-amber-500",
};

const STATUS_DOT_SIZE: Record<AvatarSize, string> = {
  xs: "h-1.5 w-1.5",
  sm: "h-2 w-2",
  md: "h-2.5 w-2.5",
  lg: "h-3 w-3",
  xl: "h-3.5 w-3.5",
};

export function Avatar({
  src,
  alt = "",
  initials,
  size = "md",
  shape = "circle",
  status,
  color = "slate",
  className,
  classNames,
}: AvatarProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const px = SIZE_PX[size];
  const shapeClass = shape === "circle" ? "rounded-full" : "rounded-lg";
  const showImage = src && !imageFailed;

  return (
    <span
      className={cx("relative inline-flex shrink-0 items-center justify-center", className, classNames?.root)}
      style={{ width: px, height: px }}
    >
      {/* Clips the image/fallback to the avatar's shape — kept off the root
          span so the status dot below (a sibling, not a child of this) isn't
          clipped along with it when it overlaps the corner. */}
      <span className={cx("flex h-full w-full items-center justify-center overflow-hidden", shapeClass)}>
        {showImage ? (
          <img
            src={src}
            alt={alt}
            className={cx("h-full w-full object-cover", classNames?.image)}
            onError={() => setImageFailed(true)}
          />
        ) : (
          <span
            className={cx(
              "flex h-full w-full items-center justify-center font-medium uppercase",
              TEXT_SIZE[size],
              (colorClasses[color] || colorClasses.slate).soft,
              classNames?.fallback
            )}
          >
            {initials}
          </span>
        )}
      </span>
      {status && (
        <span
          className={cx(
            "absolute right-0 bottom-0 rounded-full ring-2 ring-white",
            STATUS_CLASSES[status],
            STATUS_DOT_SIZE[size],
            classNames?.status
          )}
          aria-label={status}
        />
      )}
    </span>
  );
}
