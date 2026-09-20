import { cx } from "../../../core/tokens";
import { Icon } from "../Icons/Icon";

export interface BottomNavigationItem {
  icon: string;
  label: string;
  active?: boolean;
  /** e.g. a small count, shown as a dot/number on the icon. */
  badge?: string;
}

// Data-driven (array-of-items prop) rather than compound children — same
// reasoning as Tabs/NavigationMenu: once wrapped as a Web Component via
// r2wc, arbitrary light-DOM children can't be inspected across the shadow
// boundary, so a plain data array is the only shape that works identically
// in both the React and Web Component builds.
export interface BottomNavigationProps {
  items: BottomNavigationItem[];
  className?: string;
  classNames?: {
    root?: string;
    item?: string;
    activeItem?: string;
    icon?: string;
    label?: string;
    badge?: string;
  };
}

export function BottomNavigation({ items, className, classNames }: BottomNavigationProps) {
  return (
    <div className={cx("flex items-center justify-around border-t border-slate-200 bg-white py-2", className, classNames?.root)}>
      {items.map((item, i) => (
        <button
          key={i}
          type="button"
          aria-current={item.active ? "page" : undefined}
          className={cx(
            "flex flex-col items-center gap-0.5 px-3 py-1 text-xs transition-colors",
            item.active ? cx("text-indigo-600", classNames?.activeItem) : "text-slate-500 hover:text-slate-700",
            classNames?.item
          )}
        >
          <span className={cx("relative", classNames?.icon)}>
            <Icon name={item.icon} size={20} />
            {item.badge !== undefined && (
              <span
                className={cx(
                  "absolute -right-2 -top-1.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-medium leading-none text-white",
                  classNames?.badge
                )}
              >
                {item.badge}
              </span>
            )}
          </span>
          <span className={cx(classNames?.label)}>{item.label}</span>
        </button>
      ))}
    </div>
  );
}
