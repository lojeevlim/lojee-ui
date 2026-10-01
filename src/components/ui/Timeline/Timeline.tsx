import type { ReactNode } from "react";
import { cx, type ColorName } from "../../../core/tokens";
import { motionClass, motionStyle, type TransitionVariant } from "../../../core/motion";
import { Icon } from "../Icons/Icon";

export interface TimelineItem {
  title: ReactNode;
  description?: ReactNode;
  timestamp?: string;
  /** Icon name from the shared registry (src/core/icons.ts) shown inside the marker instead of a plain dot. */
  icon?: string;
  /** Marker/connector accent color for this item (default: "accent" — follows the theme accent). */
  color?: ColorName;
}

export type TimelineOrientation = "vertical" | "horizontal";

// Data-driven (array-of-items prop) rather than compound children — same
// reasoning as Stepper/NavigationMenu/BottomNavigation: once wrapped as a Web
// Component via r2wc, arbitrary light-DOM children can't be inspected across
// the shadow boundary, so a plain data array is the only shape that works
// identically in both the React and Web Component builds.
export interface TimelineProps {
  /** The events to display, in order — each has a `title`, and optional `description`, `timestamp`, `icon` and `color`. */
  items: TimelineItem[];
  /** "vertical" (default) stacks items top-to-bottom; "horizontal" is a compact
   * left-to-right variant — dot + label only, no description. */
  orientation?: TimelineOrientation;
  /** Enter transition (staggered across the items): "fade" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "zoom" | "zoom-out" | "flip" | "blur" | "bounce" | "rotate" | "drop" | "skew" (default: none). Respects `prefers-reduced-motion`. */
  transition?: TransitionVariant;
  /** Enter transition duration in ms (default: 450). */
  transitionDuration?: number;
  /** Delay before the enter transition starts, in ms (default: 0) — items enter one after another, each 60ms after the last. */
  transitionDelay?: number;
  /** Extra class name(s) appended to the root element. */
  className?: string;
  /** Per-part class overrides — merged after (and win over) the built-in styling. */
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
  accent: "bg-accent-500",
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
  slate: "bg-surface-muted text-fg-muted",
  gray: "bg-surface-muted text-fg-muted",
  indigo: "bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-300",
  accent: "bg-accent-100 text-accent-600 dark:bg-accent-500/20 dark:text-accent-300",
  violet: "bg-violet-100 text-violet-600 dark:bg-violet-500/20 dark:text-violet-300",
  blue: "bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-300",
  cyan: "bg-cyan-100 text-cyan-600 dark:bg-cyan-500/20 dark:text-cyan-300",
  emerald: "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-300",
  teal: "bg-teal-100 text-teal-600 dark:bg-teal-500/20 dark:text-teal-300",
  amber: "bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-300",
  orange: "bg-orange-100 text-orange-600 dark:bg-orange-500/20 dark:text-orange-300",
  rose: "bg-rose-100 text-rose-600 dark:bg-rose-500/20 dark:text-rose-300",
  pink: "bg-pink-100 text-pink-600 dark:bg-pink-500/20 dark:text-pink-300",
};

function Marker({ item, classNames }: { item: TimelineItem; classNames?: TimelineProps["classNames"] }) {
  const color = item.color ?? "accent";
  if (item.icon) {
    return (
      <div className={cx("flex h-7 w-7 shrink-0 items-center justify-center rounded-full", MARKER_ICON[color], classNames?.marker)}>
        <Icon name={item.icon} size={14} />
      </div>
    );
  }
  return <div className={cx("h-2.5 w-2.5 shrink-0 rounded-full", MARKER_DOT[color], classNames?.marker)} />;
}

const STAGGER_MS = 60;

export function Timeline({ items, orientation = "vertical", transition, transitionDuration, transitionDelay, className, classNames }: TimelineProps) {
  // Items enter one after another: the delay grows by STAGGER_MS per item on top of `transitionDelay`.
  const itemMotion = (i: number) => motionStyle(transitionDuration, (transitionDelay ?? 0) + i * STAGGER_MS);
  if (orientation === "horizontal") {
    return (
      <ol className={cx("flex items-start", className, classNames?.root)}>
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={i} className={cx("flex items-center", !isLast && "flex-1", motionClass(transition), classNames?.item)} style={transition ? itemMotion(i) : undefined}>
              <div className="flex flex-col items-center gap-2">
                <Marker item={item} classNames={classNames} />
                <div className={cx("max-w-[8rem] text-center", classNames?.content)}>
                  <p className="text-sm font-medium text-fg">{item.title}</p>
                  {item.timestamp && <p className="mt-0.5 text-xs text-fg-subtle">{item.timestamp}</p>}
                </div>
              </div>
              {!isLast && <div className={cx("mb-6 h-0.5 flex-1 bg-border", classNames?.line)} />}
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
          <li key={i} className={cx("flex gap-3", motionClass(transition), classNames?.item)} style={transition ? itemMotion(i) : undefined}>
            <div className="flex flex-col items-center">
              <Marker item={item} classNames={classNames} />
              {!isLast && <div className={cx("my-1 w-0.5 flex-1 bg-border", classNames?.line)} />}
            </div>
            <div className={cx("pb-6", isLast && "pb-0", classNames?.content)}>
              <p className="text-sm font-medium text-fg">{item.title}</p>
              {item.description && <p className="mt-0.5 text-sm text-fg-subtle">{item.description}</p>}
              {item.timestamp && <p className="mt-1 text-xs text-fg-subtle">{item.timestamp}</p>}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
