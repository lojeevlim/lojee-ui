import type { ReactNode } from "react";
import { cx, type ColorName } from "../../../core/tokens";
import { Icon } from "../Icons/Icon";

export interface TimelineItem {
  title: ReactNode;
  description?: ReactNode;
  timestamp?: string;
  /** Icon name from the shared registry (src/core/icons.ts) shown inside the marker instead of a plain dot. */
  icon?: string;
  /** Marker/connector accent color for this item (default: "slate"). */
  color?: ColorName;
}

export type TimelineOrientation = "vertical" | "horizontal";

// Data-driven (array-of-items prop) rather than compound children — same
// reasoning as Stepper/NavigationMenu/BottomNavigation: once wrapped as a Web
// Component via r2wc, arbitrary light-DOM children can't be inspected across
// the shadow boundary, so a plain data array is the only shape that works
// identically in both the React and Web Component builds.
export interface TimelineProps {
  items: TimelineItem[];
  /** "vertical" (default) stacks items top-to-bottom; "horizontal" is a compact
   * left-to-right variant — dot + label only, no description. */
  orientation?: TimelineOrientation;
  className?: string;
  classNames?: {
    root?: string;
    item?: string;
    marker?: string;
    line?: string;
    content?: string;
  };
}

const MARKER_DOT: Record<ColorName, string> = {
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

const MARKER_ICON: Record<ColorName, string> = {
  slate: "bg-slate-100 text-slate-600",
  gray: "bg-gray-100 text-gray-600",
  indigo: "bg-indigo-100 text-indigo-600",
  violet: "bg-violet-100 text-violet-600",
  blue: "bg-blue-100 text-blue-600",
  cyan: "bg-cyan-100 text-cyan-600",
  emerald: "bg-emerald-100 text-emerald-600",
  teal: "bg-teal-100 text-teal-600",
  amber: "bg-amber-100 text-amber-600",
  orange: "bg-orange-100 text-orange-600",
  rose: "bg-rose-100 text-rose-600",
  pink: "bg-pink-100 text-pink-600",
};

function Marker({ item, classNames }: { item: TimelineItem; classNames?: TimelineProps["classNames"] }) {
  const color = item.color ?? "slate";
  if (item.icon) {
    return (
      <div className={cx("flex h-7 w-7 shrink-0 items-center justify-center rounded-full", MARKER_ICON[color], classNames?.marker)}>
        <Icon name={item.icon} size={14} />
      </div>
    );
  }
  return <div className={cx("h-2.5 w-2.5 shrink-0 rounded-full", MARKER_DOT[color], classNames?.marker)} />;
}

export function Timeline({ items, orientation = "vertical", className, classNames }: TimelineProps) {
  if (orientation === "horizontal") {
    return (
      <ol className={cx("flex items-start", className, classNames?.root)}>
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={i} className={cx("flex items-center", !isLast && "flex-1", classNames?.item)}>
              <div className="flex flex-col items-center gap-2">
                <Marker item={item} classNames={classNames} />
                <div className={cx("max-w-[8rem] text-center", classNames?.content)}>
                  <p className="text-sm font-medium text-slate-900">{item.title}</p>
                  {item.timestamp && <p className="mt-0.5 text-xs text-slate-400">{item.timestamp}</p>}
                </div>
              </div>
              {!isLast && <div className={cx("mb-6 h-0.5 flex-1 bg-slate-200", classNames?.line)} />}
            </li>
          );
        })}
      </ol>
    );
  }

  return (
    <ol className={cx("flex flex-col", className, classNames?.root)}>
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <li key={i} className={cx("flex gap-3", classNames?.item)}>
            <div className="flex flex-col items-center">
              <Marker item={item} classNames={classNames} />
              {!isLast && <div className={cx("my-1 w-0.5 flex-1 bg-slate-200", classNames?.line)} />}
            </div>
            <div className={cx("pb-6", isLast && "pb-0", classNames?.content)}>
              <p className="text-sm font-medium text-slate-900">{item.title}</p>
              {item.description && <p className="mt-0.5 text-sm text-slate-500">{item.description}</p>}
              {item.timestamp && <p className="mt-1 text-xs text-slate-400">{item.timestamp}</p>}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
