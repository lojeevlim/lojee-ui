import { useState } from "react";
import { GridView, type GridViewItem } from "./GridView/GridView";
import { OptionGroup, PlaygroundLayout, AppWindowFrame, AppWindowBody } from "./PlaygroundHelpers";
import type { CodeBlockVariants } from "./CodeBlock";
import { useMotion } from "./playgroundMotion";

const ITEMS: GridViewItem[] = [
  { id: 1, title: "Brown's Bathroom Remodel", tag: "Accepted", stats: [{ label: "Balance Due", value: "$12,099" }, { label: "Value", value: "$18,099" }], fields: [{ label: "Documents", value: "Change Order #001008" }, { label: "Sent Date", value: "08/08/2022" }, { label: "Due Date", value: "09/08/2022" }] },
  { id: 2, title: "Faruk's Bathroom Remodel", tag: "Pending", stats: [{ label: "Balance Due", value: "$9,450" }, { label: "Value", value: "$21,300" }], fields: [{ label: "Documents", value: "Change Order #001009" }, { label: "Sent Date", value: "08/10/2022" }, { label: "Due Date", value: "09/10/2022" }] },
  { id: 3, title: "Yeasin's Bathroom Rework", tag: "Overdue", stats: [{ label: "Balance Due", value: "$15,600" }, { label: "Value", value: "$15,600" }], fields: [{ label: "Documents", value: "Invoice #001011" }, { label: "Sent Date", value: "07/02/2022" }, { label: "Due Date", value: "08/02/2022" }] },
];
const SORT = [{ key: "title", label: "Name" }, { key: "Value", label: "Value" }, { key: "Due Date", label: "Due date" }];
const ACTIONS = [{ label: "Open", value: "open", icon: "eye" }, { label: "Delete", value: "delete", icon: "trash-2", color: "danger" as const }];

const VIEWS = ["grid", "list"] as const;
const VARIANTS = ["default", "draggable"] as const;
const inline = (v: unknown) => JSON.stringify(v).replace(/"(\w+)":/g, "$1: ").replace(/,(?=\S)/g, ", ").replace(/\{/g, "{ ").replace(/\}/g, " }");
const lit = (rows: unknown[]) => `[\n${rows.map((r) => `  ${inline(r)},`).join("\n")}\n]`;

export default function GridViewPlayground() {
  const motion = useMotion({ hover: false });
  const [view, setView] = useState<(typeof VIEWS)[number]>("grid");
  const [variant, setVariant] = useState<(typeof VARIANTS)[number]>("default");
  const [searchable, setSearchable] = useState(true);
  const [sortable, setSortable] = useState(true);
  const [toggle, setToggle] = useState(true);
  const [menu, setMenu] = useState(true);
  const [create, setCreate] = useState(true);
  const [loading, setLoading] = useState(false);

  const preview = (
    <AppWindowFrame>
      <AppWindowBody className="items-stretch !p-4">
        <div className="w-full min-w-0">
          <GridView
            key={motion.replayKey}
            {...motion.props}
            items={ITEMS}
            view={view}
            variant={variant}
            searchable={searchable}
            viewToggle={toggle}
            sortOptions={sortable ? SORT : undefined}
            actions={menu ? ACTIONS : undefined}
            createLabel={create ? "Create document" : undefined}
            loading={loading}
            skeletonCount={3}
          />
        </div>
      </AppWindowBody>
    </AppWindowFrame>
  );

  const flags = [
    view !== "grid" ? `view="${view}"` : null,
    variant !== "default" ? `variant="${variant}"` : null,
    !searchable ? "searchable={false}" : null,
    !toggle ? "viewToggle={false}" : null,
    create ? 'createLabel="Create document"' : null,
    loading ? "loading" : null,
  ].filter(Boolean) as string[];
  const attrs = flags.length ? " " + flags.join(" ") : "";
  const wcFlags = (vue: boolean) =>
    [
      view !== "grid" ? `view="${view}"` : null,
      variant !== "default" ? `variant="${variant}"` : null,
      !searchable ? 'searchable="false"' : null,
      !toggle ? 'view-toggle="false"' : null,
      create ? 'create-label="Create document"' : null,
      loading ? 'loading="true"' : null,
    ]
      .filter(Boolean)
      .join(" ") + (vue ? "" : "") + motion.attrs;
  const extra = [sortable && "sortOptions", menu && "actions"].filter(Boolean) as string[];
  const reactProps = extra.map((e) => `\n  ${e}={${e}}`).join("");
  const decls = [`const items = ${lit(ITEMS)};`, sortable && `const sortOptions = ${lit(SORT)};`, menu && `const actions = ${lit(ACTIONS)};`].filter(Boolean).join("\n\n");
  const vueBind = extra.map((e) => ` :${e}="${e}"`).join("");
  const ngBind = extra.map((e) => ` [${e}]="${e}"`).join("");
  const jsAssign = extra.map((e) => `\n  el.${e} = ${e};`).join("");
  const w = wcFlags(false);

  const codeVariants: CodeBlockVariants = {
    react: `${decls}\n\n<GridView${attrs}${motion.attrs}\n  items={items}${reactProps}\n/>`,
    js: `<l-GridView id="grid-demo" ${w}></l-GridView>\n\n<script type="module">\n  import "lojee-ui/elements";\n\n${decls.replace(/^/gm, "  ")}\n\n  const el = document.getElementById("grid-demo");\n  el.items = items;${jsAssign}\n</script>`,
    vue: `<template>\n  <l-GridView :items="items"${vueBind} ${w} />\n</template>\n\n<script setup lang="ts">\nimport "lojee-ui/elements";\n\n${decls}\n</script>`,
    angular: `<l-GridView [items]="items"${ngBind} ${w}></l-GridView>\n\n// component class\n${decls.replace(/^const (\w+) =/gm, "$1 =")}`,
  };

  const chip = (on: boolean, set: (v: boolean) => void, label: string) => (
    <button type="button" onClick={() => set(!on)} className={"rounded-md px-2.5 py-1 text-xs font-medium transition-colors " + (on ? "bg-fg text-surface" : "bg-surface-muted text-fg-muted hover:bg-border")}>
      {label}
    </button>
  );

  return (
    <PlaygroundLayout preview={preview} variants={codeVariants}>
      <OptionGroup label="Variant" options={VARIANTS} value={variant} onChange={setVariant} />
      <OptionGroup label="View" options={VIEWS} value={view} onChange={setView} />
      <div>
        <span className="mb-1.5 block text-xs font-medium text-fg-subtle">Options</span>
        <div className="flex flex-wrap gap-1.5">
          {chip(searchable, setSearchable, "Search")}
          {chip(sortable, setSortable, "Sort by")}
          {chip(toggle, setToggle, "View toggle")}
          {chip(menu, setMenu, "Card menu")}
          {chip(create, setCreate, "Create button")}
          {chip(loading, setLoading, "Loading")}
        </div>
      </div>
      {motion.controls}
    </PlaygroundLayout>
  );
}
