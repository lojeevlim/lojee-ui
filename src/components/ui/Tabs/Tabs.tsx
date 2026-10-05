import { useLayoutEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import type { CSSProperties } from "react";
import { cx, isColorName, type ColorName } from "../../../core/tokens";
import { motionClass, motionStyle, type TransitionVariant } from "../../../core/motion";
import { ACTIVE_ITEM_TRANSITION, ACTIVE_PILL_TRANSITION, activeAccent } from "../../../core/activeVariant";
import { useValue } from "../../../core/useValue";

export interface TabItem {
  label: ReactNode;
  content: ReactNode;
  disabled?: boolean;
}

// r2wc-wrapped Web Components can't forward light-DOM children as a React
// `children` prop or see across the shadow boundary, so a compound
// trigger/panel API (figuring out "which child is active" from arbitrary
// children) isn't possible once wrapped — an array-of-data prop plus
// internal `useState` works in both the plain-React and Web Component builds.
export interface TabsProps {
  /** The tabs, in order — each has a `label`, its panel `content`, and optional `disabled`. */
  tabs: TabItem[];
  /** 0-indexed tab selected on first render (default: 0); the component tracks the selection itself afterwards (uncontrolled). */
  defaultIndex?: number;
  /** The selected tab (0-indexed) — set it to select a tab from outside; the component also keeps its own selection, so a tab click works with nothing wired up. Pair with `onChange` for two-way binding. */
  index?: number;
  /** Called with the new tab index when the user selects a tab (the web component's `change` / `update` event, detail = the index). */
  onChange?: (index: number) => void;
  /** Accent color of the active tab (default: "accent" — follows the theme accent). */
  color?: ColorName;
  /** Enter transition: "fade" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "zoom" | "zoom-out" | "flip" | "blur" | "bounce" | "rotate" | "drop" | "skew" (default: none). Respects `prefers-reduced-motion`. */
  transition?: TransitionVariant;
  /** Enter transition duration in ms (default: 450). */
  transitionDuration?: number;
  /** Delay before the enter transition starts, in ms (default: 0) — handy for staggering. */
  transitionDelay?: number;
  /** Extra class name(s) appended to the root element. */
  className?: string;
  /** Per-part class overrides — merged after (and win over) the built-in styling. */
  classNames?: {
    root?: string;
    list?: string;
    tab?: string;
    activeTab?: string;
    panel?: string;
  };
}

const ACTIVE_COLOR: Record<ColorName, string> = {
  slate: "border-slate-900 text-fg dark:border-slate-200",
  gray: "border-gray-600 text-fg-muted",
  indigo: "border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400",
  accent: "border-accent-600 text-accent-600 dark:border-accent-400 dark:text-accent-400",
  violet: "border-violet-600 text-violet-600 dark:border-violet-400 dark:text-violet-400",
  blue: "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400",
  cyan: "border-cyan-600 text-cyan-600 dark:border-cyan-400 dark:text-cyan-400",
  emerald: "border-emerald-600 text-emerald-600 dark:border-emerald-400 dark:text-emerald-400",
  teal: "border-teal-600 text-teal-600 dark:border-teal-400 dark:text-teal-400",
  amber: "border-amber-500 text-amber-600",
  orange: "border-orange-600 text-orange-600 dark:border-orange-400 dark:text-orange-400",
  rose: "border-rose-600 text-rose-600 dark:border-rose-400 dark:text-rose-400",
  pink: "border-pink-600 text-pink-600 dark:border-pink-400 dark:text-pink-400",
};

export function Tabs({ tabs, defaultIndex = 0, index, onChange, color = "accent", transition, transitionDuration, transitionDelay, className, classNames }: TabsProps) {
  const [activeIndex, setActiveIndexState] = useValue<number>(index, defaultIndex);
  const setActiveIndex = (i: number) => {
    setActiveIndexState(i);
    onChange?.(i);
  };
  const active = tabs[activeIndex];

  // One underline slides between tabs (same slide as Sidebar / Navbar's pill) instead of each tab drawing its
  // own border — measured from the active tab's real box, and re-measured on resize.
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [bar, setBar] = useState<{ left: number; width: number } | null>(null);
  useLayoutEffect(() => {
    const measure = () => {
      const el = tabRefs.current[activeIndex];
      setBar(el ? { left: el.offsetLeft, width: el.offsetWidth } : null);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [activeIndex, tabs.length]);
  // Text color of the active tab, taken from the per-color map (its border classes are no longer used).
  const activeText = (ACTIVE_COLOR[color] || ACTIVE_COLOR.slate)
    .split(" ")
    .filter((c) => /(^|:)text-/.test(c))
    .join(" ");

  return (
    <div className={cx(motionClass(transition), className, classNames?.root)} style={motionStyle(transitionDuration, transitionDelay)}>
      <div role="tablist" className={cx("relative flex gap-1 border-b border-border", classNames?.list)}>
        {bar && (
          <span
            aria-hidden
            className={cx("pointer-events-none absolute bottom-0 h-0.5 rounded-full bg-[var(--ac)]", ACTIVE_PILL_TRANSITION)}
            style={{ left: bar.left, width: bar.width, ["--ac" as string]: activeAccent(color, isColorName(color)) } as CSSProperties}
          />
        )}
        {tabs.map((tab, i) => {
          const isActive = i === activeIndex;
          return (
            <button
              key={i}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              aria-selected={isActive}
              disabled={tab.disabled}
              onClick={() => setActiveIndex(i)}
              className={cx(
                "relative z-[1] border-b-2 border-transparent px-4 py-2 text-sm font-medium",
                ACTIVE_ITEM_TRANSITION,
                isActive ? cx(activeText, classNames?.activeTab) : "text-fg-subtle hover:text-fg",
                tab.disabled && "opacity-40 pointer-events-none",
                classNames?.tab
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      <div role="tabpanel" className={cx("pt-4", classNames?.panel)}>
        {active?.content}
      </div>
    </div>
  );
}
