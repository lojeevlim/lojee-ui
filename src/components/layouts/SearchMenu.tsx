import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "../ui/Icons/Icon";
import { CommandMenu, type CommandMenuItem } from "../ui/CommandMenu/CommandMenu";
import { COMPONENT_MENU, DOCS_MENU, type Menu } from "../../constant/component_menu";
import { pathFor, type NavKind } from "../../core/routes";

function itemsFor(menu: Menu[], navKind: NavKind, kindLabel: string, go: (path: string) => void): CommandMenuItem[] {
  return menu.flatMap((group) =>
    (group.items ?? []).map((item) => ({
      id: `${navKind}:${group.section}:${item.label}`,
      label: item.label,
      icon: item.icon,
      description: group.section,
      // Typing a section ("basic components"), "docs" or "component" also finds these.
      keywords: [group.section ?? "", kindLabel],
      onSelect: () => go(pathFor(navKind, item.label)),
    }))
  );
}

/** Search button + command palette (⌘K / Ctrl+K) over everything in the docs: components, docs pages and About. */
export default function SearchMenu() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const items = useMemo<CommandMenuItem[]>(
    () => [
      ...itemsFor(DOCS_MENU, "docs", "docs", navigate),
      ...itemsFor(COMPONENT_MENU, "components", "component", navigate),
      { id: "about", label: "About", icon: "info", description: "Page", keywords: ["about", "lojee ui"], onSelect: () => navigate("/about") },
    ],
    [navigate]
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Search"
        className="flex items-center gap-2 rounded-md border border-border bg-surface px-2.5 py-2 text-sm text-fg-muted transition-colors hover:bg-surface-muted focus:outline-none focus:ring-2 focus:ring-fg/10"
      >
        <Icon name="search" size={16} />
        <span className="hidden min-[1280px]:inline">Search</span>
        <kbd className="hidden rounded border border-border bg-surface-muted px-1.5 py-0.5 font-sans text-[10px] text-fg-subtle min-[1280px]:inline">⌘K</kbd>
      </button>
      <CommandMenu open={open} onClose={() => setOpen(false)} items={items} transition="blur" placeholder="Search components, docs and pages…" />
    </>
  );
}
