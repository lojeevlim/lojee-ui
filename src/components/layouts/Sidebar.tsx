import { useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { Cat, ChevronDown } from "lucide-react";
import { COMPONENT_MENU, type Menu, type MenuItem } from "../../constant/component_menu";
import { pathFor, type NavKind } from "../../core/routes";
import { useTooltipPortal, tooltipPortalPositionStyle, TOOLTIP_PORTAL_Z_CLASS } from "../../core/tooltipPortal";
import { Sidebar as UISidebar, SidebarHeader, SidebarFooter } from "../ui/Sidebar/Sidebar";

const EASE = "cubic-bezier(.4,0,.2,1)";
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

// One nav row. Pulled out from the `.map()` below so each row gets its own
// `useTooltipPortal` instance (hooks can't be called a variable number of
// times inside a single component's render).
function NavLink({
  item,
  navKind,
  active,
  collapsed,
}: {
  item: MenuItem;
  navKind: NavKind;
  active: boolean;
  collapsed: boolean;
}) {
  const Icon = item.icon;
  const { ref: triggerRef, state: tooltipState, show, hide } = useTooltipPortal<HTMLAnchorElement>();

  return (
    <Link
      ref={triggerRef}
      to={pathFor(navKind, item.label)}
      aria-label={item.label}
      onMouseEnter={collapsed ? show : undefined}
      onMouseLeave={collapsed ? hide : undefined}
      onFocus={collapsed ? show : undefined}
      onBlur={collapsed ? hide : undefined}
      className={`flex items-center gap-2 px-3 py-2 rounded-lg transition select-none ${
        active ? "bg-black text-white font-medium shadow-sm" : "text-zinc-600 hover:bg-zinc-100"
      }`}
      style={{ justifyContent: collapsed ? "center" : "flex-start", transition: `justify-content .3s ${EASE}, gap .3s ${EASE}` }}
    >
      {Icon && <Icon size={18} className="shrink-0" />}
      <span
        className="text-sm truncate"
        style={{
          display: "inline-block",
          whiteSpace: "nowrap",
          overflow: "hidden",
          opacity: collapsed ? 0 : 1,
          maxWidth: collapsed ? 0 : 160,
          transition: `opacity .3s ${EASE}, max-width .3s ${EASE}`,
        }}
      >
        {item.label}
      </span>
      {item.badge && !collapsed && (
        <span
          className={`ml-auto text-xs font-medium px-1.5 py-0.5 rounded-full ${
            active ? "bg-white/20 text-white" : "bg-zinc-100 text-zinc-700"
          }`}
        >
          {item.badge}
        </span>
      )}
      {/* Portals out of `ui/Sidebar`'s scrollable body instead of relying on
          CSS overflow to escape it — so scrolling never has to be traded off
          against an unclipped tooltip (see core/tooltipPortal.ts). */}
      {collapsed &&
        tooltipState &&
        createPortal(
          <span
            role="tooltip"
            style={{ position: "fixed", ...tooltipPortalPositionStyle(tooltipState.rect, "right") }}
            className={`pointer-events-none ${TOOLTIP_PORTAL_Z_CLASS} whitespace-nowrap rounded-md bg-zinc-900 px-2 py-1 text-xs font-medium text-white shadow-lg`}
          >
            {item.label}
          </span>,
          tooltipState.root
        )}
    </Link>
  );
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
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const collapsedNow = collapsible && collapsed;

  const toggleSection = (section: string, defaultOpen: boolean) =>
    setOpenSections((prev) => ({ ...prev, [section]: !(prev[section] ?? defaultOpen) }));

  return (
    <UISidebar
      width={WIDTH_PX}
      collapsed={collapsedNow}
      collapsible={collapsible}
      onCollapsedChange={onCollapsedChange}
      variant="light"
      className="border-r-2 border-zinc-200"
      classNames={{ body: "p-0 py-2", footer: "flex items-center gap-2" }}
    >
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg shrink-0 flex items-center justify-center bg-black">
            <Cat size={16} className="text-white" />
          </div>
          <span
            className="font-semibold truncate text-zinc-900"
            style={{
              display: "inline-block",
              whiteSpace: "nowrap",
              overflow: "hidden",
              opacity: collapsedNow ? 0 : 1,
              maxWidth: collapsedNow ? 0 : 150,
              transition: `opacity .3s ${EASE}, max-width .3s ${EASE}`,
            }}
          >
            {brandName}
          </span>
        </div>
      </SidebarHeader>

      {nav.map((group, gi) => {
        const sectionKey = group.section ?? String(gi);
        const defaultOpen = gi === 0 || (group.items ?? []).some((i) => i.label === activeLabel);
        const sectionOpen = collapsedNow ? true : openSections[sectionKey] ?? defaultOpen;
        return (
          <div key={sectionKey}>
            <button
              type="button"
              onClick={() => toggleSection(sectionKey, defaultOpen)}
              aria-expanded={sectionOpen}
              className="w-full flex items-center justify-between gap-1 px-3 pt-3 pb-1 text-xs font-medium tracking-wide text-zinc-400 hover:text-zinc-600 transition-colors select-none"
              style={{
                overflow: "hidden",
                opacity: collapsedNow ? 0 : 1,
                maxHeight: collapsedNow ? 0 : 32,
                paddingTop: collapsedNow ? 0 : undefined,
                paddingBottom: collapsedNow ? 0 : undefined,
                transition: `opacity .3s ${EASE}, max-height .3s ${EASE}, padding .3s ${EASE}`,
                pointerEvents: collapsedNow ? "none" : "auto",
              }}
            >
              <span className="truncate">{group.section}</span>
              <ChevronDown
                size={14}
                className="shrink-0 transition-transform"
                style={{ transform: sectionOpen ? "rotate(0deg)" : "rotate(-90deg)" }}
              />
            </button>
            <div
              style={{
                display: "grid",
                gridTemplateRows: sectionOpen ? "1fr" : "0fr",
                transition: `grid-template-rows .3s ${EASE}`,
              }}
            >
              <div style={{ overflow: "hidden" }}>
                <div className="px-2 space-y-0.5">
                  {(group.items ?? []).map((item) => (
                    <NavLink
                      key={item.label}
                      item={item}
                      navKind={navKind}
                      active={item.label === activeLabel}
                      collapsed={collapsedNow}
                    />
                  ))}
                </div>
              </div>
            </div>
            {gi === 0 && <div className="pt-2" />}
          </div>
        );
      })}

      <SidebarFooter>
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 bg-black text-white">
          {userName.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
        </div>
        <div
          className="min-w-0"
          style={{
            display: "inline-block",
            overflow: "hidden",
            opacity: collapsedNow ? 0 : 1,
            maxWidth: collapsedNow ? 0 : 180,
            transition: `opacity .3s ${EASE}, max-width .3s ${EASE}`,
          }}
        >
          <p className="text-sm font-medium truncate text-zinc-900">{userName}</p>
          <p className="text-xs truncate text-zinc-400">{userEmail}</p>
        </div>
      </SidebarFooter>
    </UISidebar>
  );
}
