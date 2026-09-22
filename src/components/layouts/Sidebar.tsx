import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { COMPONENT_MENU, type Menu } from "../../constant/component_menu";
import { pathFor, type NavKind } from "../../core/routes";
import { Sidebar as UISidebar, type SidebarMenuCategorySpec } from "../ui/Sidebar/Sidebar";

const WIDTH_PX = 300; // comfortable size

export interface SidebarProps {
  nav?: Menu[];
  navKind: NavKind;
  activeLabel?: string;
  brandName?: string;
  userName?: string;
  userEmail?: string;
  collapsible?: boolean;
  /** Controlled collapsed state — driven from outside (see App.tsx) so the toggle button
   * (rendered beside the brand name, via `ui/Sidebar`'s own `collapsible` toggle) can report
   * changes up through `onCollapsedChange`. */
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
}

// Data-driven now (Sidebar's `items` shortcut, category groups included) instead of a hand-rolled
// tree — trades away per-item badges for a much smaller component; section grouping and per-group
// collapse/expand both come from `items`' own category support. A label cross-listed under more
// than one section (see routes.ts) still shows once per section here, same as the original.
function buildNavItems(nav: Menu[], navKind: NavKind, activeLabel?: string): SidebarMenuCategorySpec[] {
  return nav
    .filter((group): group is Required<Pick<Menu, "section" | "items">> & Menu => !!group.section && !!group.items?.length)
    .map((group) => ({
      category: group.section,
      items: group.items.map((item) => ({
        label: item.label,
        icon: item.icon,
        href: pathFor(navKind, item.label),
        active: item.label === activeLabel,
      })),
    }));
}

export default function Sidebar({
  nav = COMPONENT_MENU,
  navKind,
  activeLabel,
  brandName = "Lojee UI",
  userName = "Lojee Lim",
  userEmail = "Lojee.lim.io",
  collapsible = true,
  collapsed = false,
  onCollapsedChange,
}: SidebarProps) {
  const collapsedNow = collapsible && collapsed;
  const navigate = useNavigate();
  const rootRef = useRef<HTMLDivElement>(null);

  // `items` (the published component's own, router-agnostic API) renders plain `<a href>` rows, not
  // react-router's `<Link>` — reasonable for the library itself (it can't assume a router exists,
  // and ships as plain Web Components too), but left unhandled here it means every real nav click
  // does a full browser navigation, reloading the whole app and losing all React state (including
  // `collapsed`) rather than a client-side route change. One delegated listener intercepts plain,
  // unmodified left-clicks on same-app-path links and routes them through the router instead.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const handleClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as HTMLElement).closest("a");
      const href = link?.getAttribute("href");
      if (!href || !href.startsWith("/")) return;
      event.preventDefault();
      navigate(href);
    };
    root.addEventListener("click", handleClick);
    return () => root.removeEventListener("click", handleClick);
  }, [navigate]);

  return (
    <div ref={rootRef} className="contents">
      <UISidebar
        width={WIDTH_PX}
        collapsed={collapsedNow}
        collapsible={collapsible}
        onCollapsedChange={onCollapsedChange}
        variant="light"
        className="border-r-2 border-zinc-200"
        classNames={{ body: "p-0 py-2" }}
        header={brandName}
        headerIcon="cat"
        footer={`${userName} · ${userEmail}`}
        items={buildNavItems(nav, navKind, activeLabel)}
      />
    </div>
  );
}
