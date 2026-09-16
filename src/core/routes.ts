import { COMPONENT_MENU, DOCS_MENU, type Menu } from "../constant/component_menu";

export type NavKind = "components" | "docs";

type MenuItem = NonNullable<Menu["items"]>[number];

function menuFor(navKind: NavKind): Menu[] {
  return navKind === "docs" ? DOCS_MENU : COMPONENT_MENU;
}

export function slugify(label: string): string {
  return label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Flat by design: /components/:item, /docs/:item. A handful of labels are
// intentionally cross-listed under more than one section in COMPONENT_MENU
// (e.g. "Pagination" under both "Layout & Content" and "Navigation") — they
// converge on the same URL, which is correct, not a collision to avoid.
export function pathFor(navKind: NavKind, itemLabel: string): string {
  return `/${navKind}/${slugify(itemLabel)}`;
}

export function defaultPathFor(navKind: NavKind): string {
  const item = menuFor(navKind)[0]?.items?.[0];
  return item ? pathFor(navKind, item.label) : "/";
}

export function findMenuItem(
  menu: Menu[],
  itemSlug?: string
): { group: Menu; item: MenuItem } | undefined {
  for (const group of menu) {
    const item = group.items?.find((i) => slugify(i.label) === itemSlug);
    if (item) return { group, item };
  }
  return undefined;
}
