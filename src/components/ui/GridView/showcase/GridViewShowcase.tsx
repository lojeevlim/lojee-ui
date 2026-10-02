import { useEffect, useState } from "react";
import { GridView, type GridViewAction, type GridViewItem, type GridViewSortOption } from "../GridView";
import CodeBlock from "../../CodeBlock";
import { SectionLabel, TransitionPreview } from "../../ShowcaseHelpers";

const DOCS: GridViewItem[] = [
  { id: 1, title: "Brown's Bathroom Remodel", tag: "Accepted", stats: [{ label: "Balance Due", value: "$12,099" }, { label: "Value", value: "$18,099" }], fields: [{ label: "Documents", value: "Change Order #001008" }, { label: "Sent Date", value: "08/08/2022" }, { label: "Due Date", value: "09/08/2022" }] },
  { id: 2, title: "Faruk's Bathroom Remodel", tag: "Pending", stats: [{ label: "Balance Due", value: "$9,450" }, { label: "Value", value: "$21,300" }], fields: [{ label: "Documents", value: "Change Order #001009" }, { label: "Sent Date", value: "08/10/2022" }, { label: "Due Date", value: "09/10/2022" }] },
  { id: 3, title: "Selim's Washroom Rework", tag: "Pending", stats: [{ label: "Balance Due", value: "$4,200" }, { label: "Value", value: "$7,800" }], fields: [{ label: "Documents", value: "Estimate #001010" }, { label: "Sent Date", value: "08/12/2022" }, { label: "Due Date", value: "09/12/2022" }] },
  { id: 4, title: "Yeasin's Bathroom Rework", tag: "Overdue", stats: [{ label: "Balance Due", value: "$15,600" }, { label: "Value", value: "$15,600" }], fields: [{ label: "Documents", value: "Invoice #001011" }, { label: "Sent Date", value: "07/02/2022" }, { label: "Due Date", value: "08/02/2022" }] },
  { id: 5, title: "Nijum's Bedroom Remodel", tag: "Accepted", stats: [{ label: "Balance Due", value: "$0" }, { label: "Value", value: "$32,000" }], fields: [{ label: "Documents", value: "Estimate #001012" }, { label: "Sent Date", value: "08/15/2022" }, { label: "Due Date", value: "09/15/2022" }] },
  { id: 6, title: "Jamal's Bathroom Cleanup", tag: "Overdue", stats: [{ label: "Balance Due", value: "$2,750" }, { label: "Value", value: "$2,750" }], fields: [{ label: "Documents", value: "Invoice #001013" }, { label: "Sent Date", value: "06/20/2022" }, { label: "Due Date", value: "07/20/2022" }] },
];

const SORT: GridViewSortOption[] = [
  { key: "title", label: "Name" },
  { key: "Value", label: "Value" },
  { key: "Balance Due", label: "Balance due" },
  { key: "Due Date", label: "Due date" },
];

const ACTIONS: GridViewAction[] = [
  { label: "Open", value: "open", icon: "eye" },
  { label: "Duplicate", value: "duplicate", icon: "copy" },
  { label: "Delete", value: "delete", icon: "trash-2", color: "danger" },
];

const inline = (v: unknown) =>
  JSON.stringify(v)
    .replace(/"(\w+)":/g, "$1: ")
    .replace(/,(?=\S)/g, ", ")
    .replace(/\{/g, "{ ")
    .replace(/\}/g, " }");
const lit = (rows: unknown[]) => `[\n${rows.map((r) => `  ${inline(r)},`).join("\n")}\n]`;
const ITEMS_CODE = lit(DOCS);
const SORT_CODE = lit(SORT);
const ACTIONS_CODE = lit(ACTIONS);

export default function GridViewShowcase() {
  const [loading, setLoading] = useState(true);
  const [fetchId, setFetchId] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(t);
  }, [fetchId]);
  const [orderNote, setOrderNote] = useState("1 → 2 → 3 → 4");
  const [last, setLast] = useState("Open the menu on a card");

  return (
    <div>
      <div className="space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-fg">Grid View</h1>
          <p className="mt-1 text-sm text-fg-subtle">
            A browsable collection of cards with search, sorting and a grid / list switch. Each card has a title, a status tag, big numbers and labelled details. Data-driven, so it works in React and as a Web Component.
          </p>
        </div>

        <section>
          <SectionLabel sub="Search matches every value on the card. The switch in the toolbar flips between cards and rows, and the cards fill as many columns as fit.">Basic</SectionLabel>
          <GridView items={DOCS} sortOptions={SORT} searchPlaceholder="Search documents" />
          <CodeBlock
            variants={{
              react: `const items = ${ITEMS_CODE};\n\nconst sortOptions = ${SORT_CODE};\n\n<GridView items={items} sortOptions={sortOptions} searchPlaceholder="Search documents" />`,
              js: `<l-GridView id="docs" search-placeholder="Search documents"></l-GridView>\n\n<script type="module">\n  import "lojee-ui/elements";\n\n  const el = document.getElementById("docs");\n  el.items = ${ITEMS_CODE.replace(/\n/g, "\n  ")};\n  el.sortOptions = ${SORT_CODE.replace(/\n/g, "\n  ")};\n</script>`,
              vue: `<template>\n  <l-GridView :items="items" :sortOptions="sortOptions" search-placeholder="Search documents" />\n</template>\n\n<script setup lang="ts">\nimport "lojee-ui/elements";\n\nconst items = ${ITEMS_CODE};\n\nconst sortOptions = ${SORT_CODE};\n</script>`,
              angular: `<l-GridView [items]="items" [sortOptions]="sortOptions" search-placeholder="Search documents"></l-GridView>\n\n// component class\nitems = ${ITEMS_CODE};\n\nsortOptions = ${SORT_CODE};`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub={'Set `view="list"` to start as rows. `onViewChange` reports the switch; `viewToggle={false}` hides it.'}>List view</SectionLabel>
          <GridView items={DOCS.slice(0, 4)} view="list" searchable={false} />
          <CodeBlock
            variants={{
              react: `<GridView items={items} view="list" searchable={false} onViewChange={(view) => console.log(view)} />`,
              js: `<l-GridView id="docs" view="list" searchable="false"></l-GridView>\n\n<script type="module">\n  const el = document.getElementById("docs");\n  el.items = items;\n  el.addEventListener("viewchange", (e) => console.log(e.detail)); // "grid" | "list"\n</script>`,
              vue: `<l-GridView :items="items" view="list" searchable="false" @viewchange="(e) => console.log(e.detail)" />`,
              angular: `<l-GridView [items]="items" view="list" searchable="false" (viewchange)="onView($event)"></l-GridView>\n\nonView(e: CustomEvent) {\n  console.log(e.detail); // "grid" | "list"\n}`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub={'`variant="draggable"` adds a grip to every card: drag a card onto another to move it, or focus the grip and press the arrow keys. A bar shows where it will land, and `onReorder` receives the items in their new order. Reordering pauses while a search or sort is active.'}>
            Drag and drop
          </SectionLabel>
          <GridView items={DOCS.slice(0, 4)} variant="draggable" searchable={false} onReorder={(next) => setOrderNote(next.map((i) => i.id).join(" → "))} />
          <p className="mt-2 text-xs text-fg-subtle">Order: {orderNote}</p>
          <CodeBlock
            variants={{
              react: `<GridView\n  items={items}\n  variant="draggable"\n  onReorder={(items) => setItems(items)}\n/>`,
              js: `<l-GridView id="docs" variant="draggable"></l-GridView>\n\n<script type="module">\n  import "lojee-ui/elements";\n\n  const el = document.getElementById("docs");\n  el.items = items;\n  el.addEventListener("reorder", (e) => console.log(e.detail)); // items in the new order\n</script>`,
              vue: `<template>\n  <l-GridView :items="items" variant="draggable" @reorder="(e) => (items = e.detail)" />\n</template>`,
              angular: `<l-GridView [items]="items" variant="draggable" (reorder)="onReorder($event)"></l-GridView>\n\nonReorder(e: CustomEvent) {\n  this.items = e.detail; // items in the new order\n}`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub={'`actions` adds the three-dot menu to every card, and `createLabel` adds the primary button. `onAction` receives `{ action, item }`.'}>Menu and create button</SectionLabel>
          <GridView
            items={DOCS.slice(0, 3)}
            actions={ACTIONS}
            createLabel="Create document"
            searchable={false}
            onAction={({ action, item }) => setLast(`${action.label} → ${item.title}`)}
            onCreate={() => setLast("Create document clicked")}
          />
          <p className="mt-2 text-xs text-fg-subtle">{last}</p>
          <CodeBlock
            variants={{
              react: `const actions = ${ACTIONS_CODE};\n\n<GridView\n  items={items}\n  actions={actions}\n  createLabel="Create document"\n  onAction={({ action, item }) => console.log(action.value, item)}\n  onCreate={() => console.log("create")}\n/>`,
              js: `<l-GridView id="docs" create-label="Create document"></l-GridView>\n\n<script type="module">\n  import "lojee-ui/elements";\n\n  const el = document.getElementById("docs");\n  el.items = items;\n  el.actions = ${ACTIONS_CODE.replace(/\n/g, "\n  ")};\n  el.addEventListener("action", (e) => console.log(e.detail.action.value, e.detail.item));\n  el.addEventListener("create", () => console.log("create"));\n</script>`,
              vue: `<template>\n  <l-GridView :items="items" :actions="actions" create-label="Create document" @action="onAction" @create="onCreate" />\n</template>\n\n<script setup lang="ts">\nconst actions = ${ACTIONS_CODE};\n\nfunction onAction(e: CustomEvent) {\n  console.log(e.detail.action.value, e.detail.item);\n}\nfunction onCreate() {\n  console.log("create");\n}\n</script>`,
              angular: `<l-GridView [items]="items" [actions]="actions" create-label="Create document" (action)="onAction($event)" (create)="onCreate()"></l-GridView>\n\n// component class\nactions = ${ACTIONS_CODE};\n\nonAction(e: CustomEvent) {\n  console.log(e.detail.action.value, e.detail.item);\n}\nonCreate() {\n  console.log("create");\n}`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Placeholder cards while data loads.">Loading</SectionLabel>
          <div className="mb-3 flex justify-end">
            <button
              type="button"
              onClick={() => {
                setLoading(true);
                setFetchId((n) => n + 1);
              }}
              className="rounded-md bg-surface-muted px-3 py-1 text-xs font-medium text-fg-muted transition-colors hover:bg-border"
            >
              Reload
            </button>
          </div>
          <GridView items={DOCS.slice(0, 3)} loading={loading} skeletonCount={3} searchable={false} viewToggle={false} />
          <CodeBlock
            variants={{
              react: `<GridView items={items} loading={isLoading} skeletonCount={3} />`,
              js: `<l-GridView id="docs" loading="true" skeleton-count="3"></l-GridView>`,
              vue: `<l-GridView :items="items" :loading="isLoading" skeleton-count="3" />`,
              angular: `<l-GridView [items]="items" [loading]="isLoading" skeleton-count="3"></l-GridView>`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Enter transitions.">Transitions</SectionLabel>
          <TransitionPreview cols={2}>
            <GridView items={DOCS.slice(0, 1)} searchable={false} viewToggle={false} transition="fade" />
            <GridView items={DOCS.slice(0, 1)} searchable={false} viewToggle={false} transition="slide-up" />
            <GridView items={DOCS.slice(0, 1)} searchable={false} viewToggle={false} transition="zoom" />
            <GridView items={DOCS.slice(0, 1)} searchable={false} viewToggle={false} transition="blur" />
          </TransitionPreview>
          <CodeBlock
            variants={{
              react: `<GridView items={items} transition="slide-up" />`,
              js: `<l-GridView transition="slide-up"></l-GridView>`,
              vue: `<l-GridView :items="items" transition="slide-up" />`,
              angular: `<l-GridView [items]="items" transition="slide-up"></l-GridView>`,
            }}
          />
        </section>
      </div>
    </div>
  );
}
