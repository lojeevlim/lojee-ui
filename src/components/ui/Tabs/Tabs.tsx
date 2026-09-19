import { useState } from "react";
import type { ReactNode } from "react";
import { cx, type ColorName } from "../../../core/tokens";

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
  tabs: TabItem[];
  defaultIndex?: number;
  color?: ColorName;
  className?: string;
  classNames?: {
    root?: string;
    list?: string;
    tab?: string;
    activeTab?: string;
    panel?: string;
  };
}

const ACTIVE_COLOR: Record<ColorName, string> = {
  slate: "border-slate-900 text-slate-900",
  gray: "border-gray-600 text-gray-600",
  indigo: "border-indigo-600 text-indigo-600",
  violet: "border-violet-600 text-violet-600",
  blue: "border-blue-600 text-blue-600",
  cyan: "border-cyan-600 text-cyan-600",
  emerald: "border-emerald-600 text-emerald-600",
  teal: "border-teal-600 text-teal-600",
  amber: "border-amber-500 text-amber-600",
  orange: "border-orange-600 text-orange-600",
  rose: "border-rose-600 text-rose-600",
  pink: "border-pink-600 text-pink-600",
};

export function Tabs({ tabs, defaultIndex = 0, color = "slate", className, classNames }: TabsProps) {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);
  const active = tabs[activeIndex];

  return (
    <div className={cx(className, classNames?.root)}>
      <div role="tablist" className={cx("flex gap-1 border-b border-slate-200", classNames?.list)}>
        {tabs.map((tab, i) => {
          const isActive = i === activeIndex;
          return (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={isActive}
              disabled={tab.disabled}
              onClick={() => setActiveIndex(i)}
              className={cx(
                "border-b-2 px-4 py-2 text-sm font-medium transition-colors",
                isActive
                  ? cx(ACTIVE_COLOR[color] || ACTIVE_COLOR.slate, classNames?.activeTab)
                  : "border-transparent text-slate-500 hover:text-slate-900",
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
