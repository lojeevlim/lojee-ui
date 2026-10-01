import { useNavigate } from "react-router-dom";
import { COMPONENT_MENU, type Menu } from "../../constant/component_menu";
import { pathFor, type NavKind } from "../../core/routes";
import { useAppLayout } from "../ui/AppLayout/appLayoutContext";
import { X } from "lucide-react";
import { Sidebar as UISidebar, SidebarHeader, type SidebarMenuCategorySpec, type SidebarMenuItemSpec } from "../ui/Sidebar/Sidebar";

const WIDTH_PX = 300; // comfortable size
const DRAWER_WIDTH_PX = 260; // fits inside the drawer's 85% max width even on a 320px screen

export interface SidebarProps {
  nav?: Menu[];
  navKind: NavKind;
  activeLabel?: string;
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
//
// No `href` on any row (unlike the DOM-standard-links approach this used before) — same trade-off
// `layouts/Navbar.tsx` already makes for its own nav items: real `<a>`s need a click interceptor to
// turn their default full-page navigation into a client-side route change, and that `preventDefault()`
// + `navigate()` pair fires synchronously inside the click handler, before the browser's ever painted
// the frame where `selectedLabel` just changed — so the sliding-pill transition had no chance to
// actually start before the route (and the whole content pane) swapped out under it. Routing off
// `onActiveItemChange` instead — which Sidebar fires from its own effect, one commit after the click's
// state update already rendered — lets that first animation frame land before navigation happens.
function buildNavItems(nav: Menu[], activeLabel?: string): SidebarMenuCategorySpec[] {
  return nav
    .filter((group): group is Required<Pick<Menu, "section" | "items">> & Menu => !!group.section && !!group.items?.length)
    .map((group) => ({
      category: group.section,
      items: group.items.map((item) => ({
        label: item.label,
        icon: item.icon,
        active: item.label === activeLabel,
      })),
    }));
}

export default function SidebarLayout({
  nav = COMPONENT_MENU,
  navKind,
  activeLabel,
  collapsible: collapsibleProp = true,
  collapsed = false,
  onCollapsedChange,
}: SidebarProps) {
  const navigate = useNavigate();
  const { isCollapsed: inDrawer, setSideOpen } = useAppLayout();
  // In the mobile drawer the drawer itself is the collapse: always expanded, no rail toggle — a rail
  // squeezed inside a drawer just shrinks it into a strip. A "close" button takes the toggle's place.
  const collapsible = collapsibleProp && !inDrawer;
  const collapsedNow = collapsible && collapsed;

  return (
    <UISidebar
      color="accent"
      height="100%"
      width={inDrawer ? DRAWER_WIDTH_PX : WIDTH_PX}
      // Same fixed height as the top Navbar (h-16), so the sidebar header and the navbar line up across the top.
      classNames={{ header: "h-16 py-0" }}
      collapsed={collapsedNow}
      collapsible={collapsible}
      onCollapsedChange={onCollapsedChange}
      items={buildNavItems(nav, activeLabel)}
      onActiveItemChange={(item: SidebarMenuItemSpec) => {
        navigate(pathFor(navKind, item.label));
        setSideOpen(false); // when App has collapsed Side into a drawer, close it after choosing a page
      }}
    >
      {inDrawer && (
        <SidebarHeader>
          <div className="flex w-full items-center justify-end">
            <button
              type="button"
              onClick={() => setSideOpen(false)}
              aria-label="Close navigation"
              className="rounded-md p-1.5 text-fg-muted"
            >
              <X size={18} />
            </button>
          </div>
        </SidebarHeader>
      )}
    </UISidebar>
  );
}
