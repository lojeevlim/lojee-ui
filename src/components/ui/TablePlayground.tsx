import { useState } from "react";
import { Table, type TableColumn, type TableSize, type TableAction, type TableVariant } from "./Table/Table";
import { OptionGroup, PlaygroundLayout, AppWindowFrame, AppWindowBody } from "./PlaygroundHelpers";
import type { CodeBlockVariants } from "./CodeBlock";
import { useMotion } from "./playgroundMotion";
import { sampleImage } from "./Image/samples";

const SIZES: TableSize[] = ["sm", "md", "lg"];
const VARIANTS: TableVariant[] = ["lined", "card", "default"];
const RESPONSIVES = ["stack", "scroll"] as const;
const VIEWS = ["table", "grid"] as const;
const ACTION_STYLES = ["buttons", "menu"] as const;
const WIDTHS = ["full", "phone"] as const;
const DATASETS = ["rich cells", "orders", "simple"] as const;

interface Person {
  name: string;
  email: string;
  role: string;
}

const COLUMNS: TableColumn<Person>[] = [
  { key: "name", header: "Name" },
  { key: "email", header: "Email" },
  { key: "role", header: "Role", align: "right" },
];

const DATA: Person[] = [
  { name: "Ava Chen", email: "ava@acme.com", role: "Admin" },
  { name: "Marcus Lee", email: "marcus@acme.com", role: "Editor" },
  { name: "Priya Nair", email: "priya@acme.com", role: "Viewer" },
];

interface Account {
  id: string;
  user: { name: string; handle: string };
  payment: { brand: string; last4: string; note?: string };
  categories: (string | { label: string; color: "indigo" | "amber" | "rose" | "emerald" | "violet" | "cyan" })[];
  clicks: number;
}

const RICH_COLUMNS: TableColumn<Account>[] = [
  { key: "user", header: "Full Name", type: "user", sortable: true },
  { key: "payment", header: "Payment Methods", type: "payment" },
  { key: "categories", header: "Category", type: "badges" },
  { key: "clicks", header: "Clickthrough Percentage", type: "progress", sortable: true },
];

const RICH_DATA: Account[] = [
  { id: "alice", user: { name: "Alice Smith", handle: "@alicesmith" }, payment: { brand: "visa", last4: "18" }, categories: ["Arts", "Business", "Travel"], clicks: 30 },
  { id: "bob", user: { name: "Bob Johnson", handle: "@bobjohnson" }, payment: { brand: "mastercard", last4: "99", note: "Primary card" }, categories: [{ label: "Books", color: "indigo" }, { label: "Computers", color: "violet" }], clicks: 12 },
  { id: "clara", user: { name: "Clara Garcia", handle: "@claragarcia" }, payment: { brand: "mastercard", last4: "14" }, categories: [{ label: "Kitchen", color: "amber" }, { label: "Books", color: "cyan" }], clicks: 85 },
];

const RICH_COLUMNS_CODE = `[
    { key: "user", header: "Full Name", type: "user", sortable: true },
    { key: "payment", header: "Payment Methods", type: "payment" },
    { key: "categories", header: "Category", type: "badges" },
    { key: "clicks", header: "Clickthrough Percentage", type: "progress", sortable: true },
  ]`;
const RICH_DATA_CODE = `[
    { id: "alice", user: { name: "Alice Smith", handle: "@alicesmith" }, payment: { brand: "visa", last4: "18" }, categories: ["Arts", "Business", "Travel"], clicks: 30 },
    { id: "bob", user: { name: "Bob Johnson", handle: "@bobjohnson" }, payment: { brand: "mastercard", last4: "99" }, categories: [{ label: "Books", color: "indigo" }], clicks: 12 },
  ]`;
const SIMPLE_COLUMNS_CODE = `[
    { key: "name", header: "Name", sortable: SORTABLE },
    { key: "email", header: "Email" },
    { key: "role", header: "Role", align: "right" },
  ]`;
const SIMPLE_DATA_CODE = `[
    { id: "ava", name: "Ava Chen", email: "ava@acme.com", role: "Admin" },
    { id: "marcus", name: "Marcus Lee", email: "marcus@acme.com", role: "Editor" },
    { id: "priya", name: "Priya Nair", email: "priya@acme.com", role: "Viewer" },
  ]`;

interface Order {
  id: string;
  product: { src?: string; title: string; subtitle: string };
  status: string;
  team: { name: string }[];
  total: number | { value: number; currency: string };
  placed: string;
  rating: number;
  invoice: { href: string; label: string; external?: boolean };
}

const ORDER_COLUMNS: TableColumn<Order>[] = [
  { key: "product", header: "Product", type: "image", sortable: true },
  { key: "status", header: "Status", type: "status", sortable: true },
  { key: "team", header: "Team", type: "avatars", sortable: true },
  { key: "total", header: "Total", type: "currency", align: "right", sortable: true },
  { key: "placed", header: "Placed", type: "date", sortable: true },
  { key: "rating", header: "Rating", type: "rating", sortable: true },
  { key: "invoice", header: "Invoice", type: "link" },
];

const ORDER_DATA: Order[] = [
  { id: "o1", product: { src: sampleImage(0, 160, 160), title: "Walnut desk lamp", subtitle: "SKU 20418" }, status: "Paid", team: [{ name: "Ava Chen" }, { name: "Marcus Lee" }, { name: "Priya Nair" }], total: 1249.5, placed: "2026-09-28", rating: 4.5, invoice: { href: "https://example.com/invoices/2041", label: "INV-2041", external: true } },
  { id: "o2", product: { src: sampleImage(1, 160, 160), title: "Standing desk frame", subtitle: "SKU 30977" }, status: "Pending", team: [{ name: "Dan Ostrow" }, { name: "Ava Chen" }], total: { value: 899, currency: "EUR" }, placed: "2026-09-30", rating: 4, invoice: { href: "https://example.com/invoices/2042", label: "INV-2042", external: true } },
  { id: "o3", product: { src: sampleImage(2, 160, 160), title: "Ergonomic chair", subtitle: "SKU 11302" }, status: "Overdue", team: [{ name: "Priya Nair" }, { name: "Dan Ostrow" }, { name: "Marcus Lee" }], total: 640.25, placed: "2026-09-12", rating: 3, invoice: { href: "https://example.com/invoices/2043", label: "INV-2043", external: true } },
];

const ORDER_COLUMNS_CODE = `[
    { key: "product", header: "Product", type: "image", sortable: true },
    { key: "status", header: "Status", type: "status", sortable: true },
    { key: "team", header: "Team", type: "avatars", sortable: true },
    { key: "total", header: "Total", type: "currency", align: "right", sortable: true },
    { key: "placed", header: "Placed", type: "date", sortable: true },
    { key: "rating", header: "Rating", type: "rating", sortable: true },
    { key: "invoice", header: "Invoice", type: "link" },
  ]`;
const ORDER_DATA_CODE = `[
    { id: "o1", product: { src: "/products/lamp.jpg", title: "Walnut desk lamp", subtitle: "SKU 20418" }, status: "Paid", team: [{ name: "Ava Chen" }, { name: "Marcus Lee" }], total: 1249.5, placed: "2026-09-28", rating: 4.5, invoice: { href: "https://example.com/invoices/2041", label: "INV-2041" } },
    { id: "o2", product: { src: "/products/desk.jpg", title: "Standing desk frame", subtitle: "SKU 30977" }, status: "Pending", team: [{ name: "Dan Ostrow" }], total: { value: 899, currency: "EUR" }, placed: "2026-09-30", rating: 4, invoice: { href: "https://example.com/invoices/2042", label: "INV-2042" } },
  ]`;

const ROW_COUNTS = ["3", "5", "8"] as const;

const ACTIONS: TableAction[] = [
  { label: "Edit", icon: "pencil", value: "edit" },
  { label: "Duplicate", icon: "copy", value: "duplicate" },
  { label: "Delete", icon: "trash-2", value: "delete", color: "danger" },
];

const ACTIONS_JSON = `[
  { label: "Edit", icon: "pencil", value: "edit" },
  { label: "Duplicate", icon: "copy", value: "duplicate" },
  { label: "Delete", icon: "trash-2", value: "delete", color: "danger" },
]`;

export default function TablePlayground() {
  const motion = useMotion({ hover: false });
  const [size, setSize] = useState<TableSize>("md");
  const [variant, setVariant] = useState<TableVariant>("lined");
  const [dataset, setDataset] = useState<(typeof DATASETS)[number]>("rich cells");
  const [responsive, setResponsive] = useState<(typeof RESPONSIVES)[number]>("stack");
  const [view, setView] = useState<(typeof VIEWS)[number]>("table");
  const [viewToggle, setViewToggle] = useState(false);
  const [width, setWidth] = useState<(typeof WIDTHS)[number]>("full");
  const [selectable, setSelectable] = useState(false);
  const [sortable, setSortable] = useState(false);
  const [striped, setStriped] = useState(false);
  const [bordered, setBordered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [skeletonRows, setSkeletonRows] = useState<(typeof ROW_COUNTS)[number]>("5");
  const [rowActions, setRowActions] = useState(false);
  const [builtIn, setBuiltIn] = useState(true);
  const [actionStyle, setActionStyle] = useState<(typeof ACTION_STYLES)[number]>("buttons");

  // The simple dataset's name column is sortable on demand; the rich one always sorts on its name and number columns.
  const rich = dataset !== "simple";
  const tableData =
    dataset === "rich cells"
      ? ({ columns: RICH_COLUMNS, data: RICH_DATA } as unknown as { columns: TableColumn<Person>[]; data: Person[] })
      : dataset === "orders"
        ? ({ columns: ORDER_COLUMNS, data: ORDER_DATA } as unknown as { columns: TableColumn<Person>[]; data: Person[] })
        : { columns: COLUMNS.map((c) => (c.key === "name" ? { ...c, sortable } : c)), data: DATA.map((d, i) => ({ ...d, id: ["ava", "marcus", "priya"][i] })) as Person[] };

  const preview = (
    <AppWindowFrame>
      <AppWindowBody className="items-stretch !p-3">
        <div className="mx-auto w-full min-w-0 transition-[max-width] duration-300" style={{ maxWidth: width === "phone" ? "22rem" : "100%" }}>
        <Table key={`${motion.replayKey}-${dataset}`} {...motion.props} {...tableData} variant={variant} responsive={responsive} view={view} viewToggle={viewToggle} selectable={selectable} rowKey="id" size={size} striped={striped} bordered={bordered}
          loading={loading}
          skeletonRows={Number(skeletonRows)}
          actions={rowActions ? ACTIONS : undefined}
          actionsVariant={actionStyle}
          builtInActions={builtIn}
        />
        </div>
      </AppWindowBody>
    </AppWindowFrame>
  );

  const code = `<Table
  columns={columns}
  data={data}${variant !== "default" ? `\n  variant="${variant}"` : ""}${responsive !== "stack" ? `\n  responsive="${responsive}"` : ""}${view !== "table" ? `\n  view="${view}"` : ""}${viewToggle ? "\n  viewToggle\n  onViewChange={(view) => console.log(view)}" : ""}${selectable ? `\n  selectable\n  rowKey="id"\n  onSelectionChange={(keys, rows) => console.log(keys, rows)}` : ""}
  size="${size}"${motion.attrs}${striped ? "\n  striped" : ""}${bordered ? "\n  bordered" : ""}${loading ? `\n  loading\n  skeletonRows={${skeletonRows}}` : ""}${
    rowActions ? `\n  actions={actions}${actionStyle === "menu" ? '\n  actionsVariant="menu"' : ""}${builtIn ? "" : "\n  builtInActions={false}"}\n  onAction={(action, row) => console.log(action.value, row)}` : ""
  }
/>`;

  // `columns`/`data` are "json"-typed props with no native attribute form —
  // they must be assigned as real DOM properties (js) or bound (vue/angular)
  // rather than stringified into the tag. The literal values mirror COLUMNS
  // and DATA above exactly.
  const attrs = `${variant !== "default" ? `variant="${variant}" ` : ""}${responsive !== "stack" ? `responsive="${responsive}" ` : ""}${view !== "table" ? `view="${view}" ` : ""}${viewToggle ? `view-toggle="true" ` : ""}${selectable ? `selectable="true" row-key="id" ` : ""}size="${size}"${motion.attrs}${striped ? ` striped` : ""}${bordered ? ` bordered` : ""}${loading ? ` loading skeletonRows="${skeletonRows}"` : ""}${rowActions && actionStyle === "menu" ? ` actionsVariant="menu"` : ""}${rowActions && !builtIn ? ` builtInActions="false"` : ""}`;

  const actionsData = `  const actions = ${ACTIONS_JSON};`;

  const colsCode = dataset === "rich cells" ? RICH_COLUMNS_CODE : dataset === "orders" ? ORDER_COLUMNS_CODE : SIMPLE_COLUMNS_CODE.replace("SORTABLE", String(sortable));
  const dataCode = dataset === "rich cells" ? RICH_DATA_CODE : dataset === "orders" ? ORDER_DATA_CODE : SIMPLE_DATA_CODE;
  const dedent = (c: string) => c.replace(/^ {2}/gm, "");
  const jsData = `  const columns = ${colsCode};
  const data = ${dataCode};`;
  const topData = `const columns = ${dedent(colsCode)};
const data = ${dedent(dataCode)};`;
  const selectEvent = selectable ? `\n  el.addEventListener("selectionchange", (e) => console.log(e.detail.keys, e.detail.rows));` : "";

  const codeVariants: CodeBlockVariants = {
    react: code,
    js: `<l-Table id="people-table" ${attrs}></l-Table>

<script type="module">
  import "lojee-ui/elements";

${jsData}${rowActions ? `\n${actionsData}` : ""}

  const el = document.getElementById("people-table");
  el.columns = columns;
  el.data = data;${selectEvent}${rowActions ? `\n  el.actions = actions;\n  el.addEventListener("action", (e) => console.log(e.detail.action, e.detail.row));` : ""}
</script>`,
    vue: `<template>
  <l-Table :columns="columns" :data="data" ${attrs}${rowActions ? ' :actions="actions" @action="onAction"' : ""} />
</template>

<script setup lang="ts">
${topData}${rowActions ? `\nconst actions = ${ACTIONS_JSON};\n\nfunction onAction(e) {\n  console.log(e.detail.action, e.detail.row);\n}` : ""}
</script>`,
    angular: `<l-Table [columns]="columns" [data]="data" ${attrs}${rowActions ? ' [actions]="actions" (action)="onAction($event)"' : ""} />

${topData}${rowActions ? `\nactions = ${ACTIONS_JSON};\n\nonAction(e) {\n  console.log(e.detail.action, e.detail.row);\n}` : ""}`,
  };

  return (
    <PlaygroundLayout preview={preview} variants={codeVariants}>
      <OptionGroup label="Variant" options={VARIANTS} value={variant} onChange={setVariant} />
      <OptionGroup label="Data" options={DATASETS} value={dataset} onChange={setDataset} />
      <OptionGroup label="Responsive" options={RESPONSIVES} value={responsive} onChange={setResponsive} />
      <OptionGroup label="View" options={VIEWS} value={view} onChange={setView} />
      <OptionGroup label="Preview width" options={WIDTHS} value={width} onChange={setWidth} />
      <OptionGroup label="Size" options={SIZES} value={size} onChange={setSize} />

      <div>
        <span className="mb-1.5 block text-xs font-medium text-fg-subtle">Options</span>
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setSelectable((v) => !v)}
            className={
              "rounded-md px-2.5 py-1 text-xs font-medium transition-colors " +
              (selectable ? "bg-fg text-surface" : "bg-surface-muted text-fg-muted hover:bg-border")
            }
          >
            Selectable
          </button>
          <button
            type="button"
            onClick={() => setViewToggle((v) => !v)}
            className={
              "rounded-md px-2.5 py-1 text-xs font-medium transition-colors " +
              (viewToggle ? "bg-fg text-surface" : "bg-surface-muted text-fg-muted hover:bg-border")
            }
          >
            View toggle
          </button>
          {!rich && (
            <button
              type="button"
              onClick={() => setSortable((v) => !v)}
              className={
                "rounded-md px-2.5 py-1 text-xs font-medium transition-colors " +
                (sortable ? "bg-fg text-surface" : "bg-surface-muted text-fg-muted hover:bg-border")
              }
            >
              Sortable name
            </button>
          )}
          <button
            type="button"
            onClick={() => setStriped((v) => !v)}
            className={
              "rounded-md px-2.5 py-1 text-xs font-medium transition-colors " +
              (striped ? "bg-fg text-surface" : "bg-surface-muted text-fg-muted hover:bg-border")
            }
          >
            Striped
          </button>
          <button
            type="button"
            onClick={() => setBordered((v) => !v)}
            className={
              "rounded-md px-2.5 py-1 text-xs font-medium transition-colors " +
              (bordered ? "bg-fg text-surface" : "bg-surface-muted text-fg-muted hover:bg-border")
            }
          >
            Bordered
          </button>
          <button
            type="button"
            onClick={() => setLoading((v) => !v)}
            className={
              "rounded-md px-2.5 py-1 text-xs font-medium transition-colors " +
              (loading ? "bg-fg text-surface" : "bg-surface-muted text-fg-muted hover:bg-border")
            }
          >
            Loading skeleton
          </button>
          <button
            type="button"
            onClick={() => setRowActions((v) => !v)}
            className={
              "rounded-md px-2.5 py-1 text-xs font-medium transition-colors " +
              (rowActions ? "bg-fg text-surface" : "bg-surface-muted text-fg-muted hover:bg-border")
            }
          >
            Row actions
          </button>
          {rowActions && (
            <button
              type="button"
              onClick={() => setBuiltIn((v) => !v)}
              className={
                "rounded-md px-2.5 py-1 text-xs font-medium transition-colors " +
                (builtIn ? "bg-fg text-surface" : "bg-surface-muted text-fg-muted hover:bg-border")
              }
            >
              Built-in actions
            </button>
          )}
        </div>
      </div>
      {rowActions && <OptionGroup label="Action style" options={ACTION_STYLES} value={actionStyle} onChange={setActionStyle} />}
      {loading && <OptionGroup label="Skeleton rows" options={ROW_COUNTS} value={skeletonRows} onChange={setSkeletonRows} />}
      {motion.controls}
    </PlaygroundLayout>
  );
}
