import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Cat, ChevronLeft, ChevronDown } from "lucide-react";
import { COMPONENT_MENU, type Menu } from "../../constant/component_menu";
import { pathFor, type NavKind } from "../../core/routes";

const EASE = "cubic-bezier(.4,0,.2,1)";
const WIDTH_PX = 300; // comfortable size
const COLLAPSED_PX = 76;

function slide(hidden: boolean, opts: { dir?: number; maxWidth?: number } = {}): React.CSSProperties {
  const { dir = -1, maxWidth = 200 } = opts;
  return {
    display: "inline-block",
    whiteSpace: "nowrap",
    overflow: "hidden",
    opacity: hidden ? 0 : 1,
    maxWidth: hidden ? 0 : maxWidth,
    marginLeft: hidden ? 0 : undefined,
    transform: hidden ? `translateX(${dir * 16}px)` : "translateX(0)",
    transition: `opacity .16s ease, transform .22s ${EASE}, max-width .22s ease, margin-left .22s ease`,
    pointerEvents: hidden ? "none" : "auto",
  };
}

export interface SidebarProps {
  nav?: Menu[];
  navKind: NavKind;
  activeLabel?: string;
  brandName?: string;
  userName?: string;
  userEmail?: string;
  collapsible?: boolean;
}

export default function Sidebar({
  nav = COMPONENT_MENU,
  navKind,
  activeLabel,
  brandName = "Lojee UI",
  userName = "Lojee Lim",
  userEmail = "Lojee.lim.io",
  collapsible = true,
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const collapsedNow = collapsible && collapsed;
  const widthPx = collapsedNow ? COLLAPSED_PX : WIDTH_PX;

  const toggleSection = (section: string, defaultOpen: boolean) =>
    setOpenSections((prev) => ({ ...prev, [section]: !(prev[section] ?? defaultOpen) }));

  return (
    <div
      className="flex flex-col relative bg-white border-r-2 border-zinc-200"
      style={{ width: widthPx, transition: `width .24s ${EASE}` }}
    >
      <div className="flex flex-col h-full" style={{ overflow: "hidden" }}>
        {/* Logo row */}
        <div
          className="flex items-center gap-2 px-4 h-16  border-zinc-200"
          style={{ justifyContent: collapsedNow ? "center" : "flex-start", transition: "justify-content .22s ease" }}
        >
          <div className="w-8 h-8 rounded-lg shrink-0 flex items-center justify-center bg-black">
            <Cat size={16} className="text-white" />
          </div>
          <span className="font-semibold truncate text-zinc-900" style={slide(collapsedNow, { maxWidth: 150 })}>
            {brandName}
          </span>
          {collapsible && (
            <button
              onClick={() => setCollapsed((c) => !c)}
              aria-label="Collapse sidebar"
              className="ml-auto w-7 h-7 shrink-0 rounded-md flex items-center justify-center transition text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700"
              style={slide(collapsedNow, { dir: 1, maxWidth: 40 })}
            >
              <ChevronLeft size={16} />
            </button>
          )}
        </div>

        {/* Nav */}
        <div className="flex-1 overflow-y-auto py-2">
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
                    transition: "opacity .12s ease, max-height .22s ease, padding .22s ease",
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
                    transition: `grid-template-rows .22s ${EASE}`,
                  }}
                >
                  <div style={{ overflow: "hidden" }}>
                    <div className="px-2 space-y-0.5">
                      {(group.items ?? []).map((item) => {
                        const Icon = item.icon;
                        const active = item.label === activeLabel;
                        return (
                          <Link
                            key={item.label}
                            to={pathFor(navKind, item.label)}
                            title={item.label}
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition select-none ${
                              active ? "bg-black text-white font-medium shadow-sm" : "text-zinc-600 hover:bg-zinc-100"
                            }`}
                            style={{ justifyContent: collapsedNow ? "center" : "flex-start", transition: "justify-content .22s ease, gap .22s ease" }}
                          >
                            {Icon && <Icon size={18} className="shrink-0" />}
                            <span className="text-sm truncate" style={slide(collapsedNow, { maxWidth: 160 })}>
                              {item.label}
                            </span>
                            {item.badge && (
                              <span
                                className={`ml-auto text-xs font-medium px-1.5 py-0.5 rounded-full ${
                                  active ? "bg-white/20 text-white" : "bg-zinc-100 text-zinc-700"
                                }`}
                                style={slide(collapsedNow, { dir: 1, maxWidth: 32 })}
                              >
                                {item.badge}
                              </span>
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
                {gi === 0 && <div className="pt-2" />}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div
          className="mt-auto border-t border-zinc-200 p-3 flex items-center gap-2"
          style={{ justifyContent: collapsedNow ? "center" : "flex-start", transition: "justify-content .22s ease" }}
        >
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 bg-black text-white">
            {userName.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
          </div>
          <div className="min-w-0" style={slide(collapsedNow, { maxWidth: 180 })}>
            <p className="text-sm font-medium truncate text-zinc-900">{userName}</p>
            <p className="text-xs truncate text-zinc-400">{userEmail}</p>
          </div>
        </div>
      </div>

      {/* Edge toggle, shown only while collapsed */}
      {collapsible && (
        <button
          onClick={() => setCollapsed((c) => !c)}
          aria-label="Expand sidebar"
          className="absolute -right-3 top-14 w-6 h-6 rounded-full bg-white border border-zinc-200 shadow-sm flex items-center justify-center text-zinc-400 hover:text-zinc-700 z-10"
          style={{
            opacity: collapsedNow ? 1 : 0,
            pointerEvents: collapsedNow ? "auto" : "none",
            transform: collapsedNow ? "translateX(0) rotate(180deg)" : "translateX(-6px) rotate(180deg)",
            transition: "opacity .18s ease, transform .18s ease",
          }}
        >
          <ChevronLeft size={14} />
        </button>
      )}
    </div>
  );
}