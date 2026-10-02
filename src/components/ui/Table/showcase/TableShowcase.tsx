import { useEffect, useState } from "react";
import { Table, type TableAction, type TableColumn } from "../Table";
import { Badge } from "../../Badge/Badge";
import CodeBlock from "../../CodeBlock";
import { sampleImage } from "../../Image/samples";
import { SectionLabel, TransitionPreview } from "../../ShowcaseHelpers";

interface Person {
  name: string;
  email: string;
  role: string;
  status: "active" | "invited" | "suspended";
}

const PEOPLE: Person[] = [
  { name: "Ava Chen", email: "ava@acme.com", role: "Admin", status: "active" },
  { name: "Marcus Lee", email: "marcus@acme.com", role: "Editor", status: "active" },
  { name: "Priya Nair", email: "priya@acme.com", role: "Viewer", status: "invited" },
  { name: "Dan Ostrow", email: "dan@acme.com", role: "Editor", status: "suspended" },
];

const BASIC_COLUMNS: TableColumn<Person>[] = [
  { key: "name", header: "Name" },
  { key: "email", header: "Email" },
  { key: "role", header: "Role", align: "right" },
];

const STATUS_COLOR: Record<Person["status"], "emerald" | "amber" | "rose"> = {
  active: "emerald",
  invited: "amber",
  suspended: "rose",
};

const STATUS_COLUMNS: TableColumn<Person>[] = [
  { key: "name", header: "Name" },
  { key: "email", header: "Email" },
  {
    key: "status",
    header: "Status",
    align: "right",
    render: (row) => <Badge color={STATUS_COLOR[row.status]} label={row.status} />,
  },
];

const ROW_ACTIONS: TableAction[] = [
  { label: "Edit", icon: "pencil", value: "edit" },
  { label: "Duplicate", icon: "copy", value: "duplicate" },
  { label: "Delete", icon: "trash-2", value: "delete", color: "danger" },
];


interface Account {
  id: string;
  user: { name: string; handle: string };
  payment: { brand: string; last4: string; note?: string };
  categories: (string | { label: string; color: "indigo" | "amber" | "rose" | "emerald" | "violet" | "cyan" })[];
  clicks: number;
}

const ACCOUNTS: Account[] = [
  { id: "alice", user: { name: "Alice Smith", handle: "@alicesmith" }, payment: { brand: "visa", last4: "18" }, categories: ["Arts", "Business", "Travel"], clicks: 30 },
  { id: "bob", user: { name: "Bob Johnson", handle: "@bobjohnson" }, payment: { brand: "mastercard", last4: "99", note: "Primary card" }, categories: [{ label: "Books", color: "indigo" }, { label: "Computers", color: "violet" }], clicks: 12 },
  { id: "clara", user: { name: "Clara Garcia", handle: "@claragarcia" }, payment: { brand: "mastercard", last4: "14" }, categories: [{ label: "Kitchen", color: "amber" }, { label: "Books", color: "cyan" }], clicks: 85 },
  { id: "emma", user: { name: "Emma Lee", handle: "@emmalee" }, payment: { brand: "mastercard", last4: "19", note: "Expires soon" }, categories: [{ label: "Furniture", color: "emerald" }], clicks: 38 },
  { id: "grace", user: { name: "Grace Taylor", handle: "@gracetaylor" }, payment: { brand: "visa", last4: "50" }, categories: ["Beauty", "Apparel", "Sale"], clicks: 66 },
  { id: "isabella", user: { name: "Isabella Clark", handle: "@isabellaclark" }, payment: { brand: "visa", last4: "80" }, categories: [{ label: "AI", color: "amber" }, { label: "Machine Learning", color: "rose" }], clicks: 22 },
];

const ACCOUNT_COLUMNS: TableColumn<Account>[] = [
  { key: "user", header: "Full Name", type: "user", sortable: true },
  { key: "payment", header: "Payment Methods", type: "payment" },
  { key: "categories", header: "Category", type: "badges" },
  { key: "clicks", header: "Clickthrough Percentage", type: "progress", sortable: true, width: "26%" },
];

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

const ORDERS: Order[] = [
  { id: "o1", product: { src: sampleImage(0, 160, 160), title: "Walnut desk lamp", subtitle: "SKU 20418" }, status: "Paid", team: [{ name: "Ava Chen" }, { name: "Marcus Lee" }, { name: "Priya Nair" }], total: 1249.5, placed: "2026-09-28", rating: 4.5, invoice: { href: "https://example.com/invoices/2041", label: "INV-2041", external: true } },
  { id: "o2", product: { src: sampleImage(1, 160, 160), title: "Standing desk frame", subtitle: "SKU 30977" }, status: "Pending", team: [{ name: "Dan Ostrow" }, { name: "Ava Chen" }], total: { value: 899, currency: "EUR" }, placed: "2026-09-30", rating: 4, invoice: { href: "https://example.com/invoices/2042", label: "INV-2042", external: true } },
  { id: "o3", product: { src: sampleImage(2, 160, 160), title: "Ergonomic chair", subtitle: "SKU 11302" }, status: "Overdue", team: [{ name: "Priya Nair" }, { name: "Dan Ostrow" }, { name: "Marcus Lee" }, { name: "Ava Chen" }, { name: "Mia Costa" }, { name: "Noah Kim" }, { name: "Omar Haddad" }], total: 640.25, placed: "2026-09-12", rating: 3, invoice: { href: "https://example.com/invoices/2043", label: "INV-2043", external: true } },
  { id: "o4", product: { src: sampleImage(3, 160, 160), title: "Monitor arm", subtitle: "SKU 77120" }, status: "Delivered", team: [{ name: "Mia Costa" }], total: 129, placed: "2026-10-01", rating: 5, invoice: { href: "https://example.com/invoices/2044", label: "INV-2044", external: true } },
];

// The same rows for the code samples, with real-looking image paths instead of the inline demo pictures.
const ORDERS_FOR_CODE = ORDERS.map((o) => ({ ...o, product: { ...o.product, src: `/products/${o.product.title.split(" ")[1].toLowerCase()}.jpg` } }));

const ORDER_COLUMNS: TableColumn<Order>[] = [
  { key: "product", header: "Product", type: "image", sortable: true },
  { key: "status", header: "Status", type: "status", sortable: true },
  { key: "team", header: "Team", type: "avatars", sortable: true },
  { key: "total", header: "Total", type: "currency", align: "right", sortable: true },
  { key: "placed", header: "Placed", type: "date", sortable: true },
  { key: "rating", header: "Rating", type: "rating", sortable: true },
  { key: "invoice", header: "Invoice", type: "link" },
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

const RESPONSIVE_COLUMNS: TableColumn<Order>[] = [
  { key: "product", header: "Product", type: "image" },
  { key: "status", header: "Status", type: "status" },
  { key: "total", header: "Total", type: "currency", align: "right" },
  { key: "placed", header: "Placed", type: "date" },
];

const WIDTHS = [
  { label: "Full width", width: "100%" },
  { label: "Tablet · 36rem", width: "36rem" },
  { label: "Phone · 22rem", width: "22rem" },
] as const;

function ResponsiveDemo() {
  const [mode, setMode] = useState<"stack" | "scroll">("stack");
  const [width, setWidth] = useState<(typeof WIDTHS)[number]["width"]>("22rem");
  const pill = (active: boolean) =>
    "rounded-md px-2.5 py-1 text-xs font-medium transition-colors " + (active ? "bg-fg text-surface" : "bg-surface-muted text-fg-muted hover:bg-border");
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
        <div className="flex items-center gap-1.5">
          <span className="mr-1 text-xs font-medium text-fg-subtle">responsive</span>
          {(["stack", "scroll"] as const).map((m) => (
            <button key={m} type="button" onClick={() => setMode(m)} className={pill(mode === m)}>
              {m}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1.5">
          <span className="mr-1 text-xs font-medium text-fg-subtle">container</span>
          {WIDTHS.map((w) => (
            <button key={w.width} type="button" onClick={() => setWidth(w.width)} className={pill(width === w.width)}>
              {w.label}
            </button>
          ))}
        </div>
      </div>
      <div className="max-w-full overflow-hidden rounded-lg border border-dashed border-border-strong p-2" style={{ width }}>
        <Table variant="lined" responsive={mode} columns={RESPONSIVE_COLUMNS} data={ORDERS} />
      </div>
    </div>
  );
}


// The same data the live examples show, written out as code — so the samples can be pasted and match the screen.
// One row per line, everything inside a row inline — compact enough to read and paste.
const inline = (v: unknown) =>
  JSON.stringify(v)
    .replace(/"(\w+)":/g, "$1: ")
    .replace(/,(?=\S)/g, ", ")
    .replace(/\{/g, "{ ")
    .replace(/\}/g, " }");
const jsLiteral = (rows: unknown[]) => `[\n${rows.map((r) => `  ${inline(r)},`).join("\n")}\n]`;
const COLUMNS_CODE = `[
  { key: "user", header: "Full Name", type: "user", sortable: true },
  { key: "payment", header: "Payment Methods", type: "payment" },
  { key: "categories", header: "Category", type: "badges" },
  { key: "clicks", header: "Clickthrough Percentage", type: "progress", sortable: true, width: "26%" },
]`;
const DATA_CODE = jsLiteral(ACCOUNTS);
const indentBlock = (code: string, n: number) => code.replace(/^/gm, " ".repeat(n)).trimStart();

const SORT_COLUMNS: TableColumn<Person & { score: number }>[] = [
  { key: "name", header: "Name", sortable: true },
  { key: "role", header: "Role", sortable: true },
  { key: "score", header: "Score", sortable: true, align: "right" },
];
const SORT_DATA = PEOPLE.map((p, i) => ({ ...p, score: [88, 42, 95, 61][i] }));

function SelectableDemo() {
  const [keys, setKeys] = useState<(string | number)[]>(["alice"]);
  return (
    <div className="space-y-2">
      <Table variant="lined" selectable rowKey="id" selected={keys} onSelectionChange={(k) => setKeys(k)} columns={ACCOUNT_COLUMNS} data={ACCOUNTS} />
      <p className="text-xs text-fg-subtle">
        Selected keys: <span className="font-mono text-fg-muted">{JSON.stringify(keys)}</span>
      </p>
    </div>
  );
}

export default function TableShowcase() {
  const [loading, setLoading] = useState(true);
  // The skeleton stays on until you switch it off, so it is there when you scroll to it; "Simulate fetch" shows it for 2s.
  const [fetchId, setFetchId] = useState(0);
  useEffect(() => {
    if (fetchId === 0) return;
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, [fetchId]);
  const simulateFetch = () => {
    setLoading(true);
    setFetchId((n) => n + 1);
  };
  const [lastAction, setLastAction] = useState<string | null>(null);
  const [resetKey, setResetKey] = useState(0);
  return (
    <div>
      <div className="space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-fg">Table</h1>
          <p className="text-sm text-fg-subtle mt-1">A data-driven table — pass columns and rows, no compound children.</p>
        </div>

        <section>
          <SectionLabel sub="Columns + data, rendered as a plain table.">Basic</SectionLabel>
          <Table variant="lined" columns={BASIC_COLUMNS} data={PEOPLE} />
          <CodeBlock
            variants={{
              react: `const columns = [
  { key: "name", header: "Name" },
  { key: "email", header: "Email" },
  { key: "role", header: "Role", align: "right" },
];

<Table variant="lined" columns={columns} data={people} />`,
              js: `<l-Table variant="lined" id="basic-table"></l-Table>

<script type="module">
  import "lojee-ui/elements";

  const table = document.getElementById("basic-table");
  table.columns = [
    { key: "name", header: "Name" },
    { key: "email", header: "Email" },
    { key: "role", header: "Role", align: "right" },
  ];
  table.data = [
    { name: "Ava Chen", email: "ava@acme.com", role: "Admin" },
    { name: "Marcus Lee", email: "marcus@acme.com", role: "Editor" },
    { name: "Priya Nair", email: "priya@acme.com", role: "Viewer" },
    { name: "Dan Ostrow", email: "dan@acme.com", role: "Editor" },
  ];
</script>`,
              vue: `<template>
  <l-Table variant="lined" :columns="columns" :data="people" />
</template>

<script setup lang="ts">
import "lojee-ui/elements";

const columns = [
  { key: "name", header: "Name" },
  { key: "email", header: "Email" },
  { key: "role", header: "Role", align: "right" },
];

const people = [
  { name: "Ava Chen", email: "ava@acme.com", role: "Admin" },
  { name: "Marcus Lee", email: "marcus@acme.com", role: "Editor" },
  { name: "Priya Nair", email: "priya@acme.com", role: "Viewer" },
  { name: "Dan Ostrow", email: "dan@acme.com", role: "Editor" },
];
</script>`,
              angular: `// app.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "lojee-ui/elements";

@Component({
  selector: "app-root",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`<l-Table variant="lined" [columns]="columns" [data]="people" />\`,
})
export class AppComponent {
  columns = [
    { key: "name", header: "Name" },
    { key: "email", header: "Email" },
    { key: "role", header: "Role", align: "right" },
  ];

  people = [
    { name: "Ava Chen", email: "ava@acme.com", role: "Admin" },
    { name: "Marcus Lee", email: "marcus@acme.com", role: "Editor" },
    { name: "Priya Nair", email: "priya@acme.com", role: "Viewer" },
    { name: "Dan Ostrow", email: "dan@acme.com", role: "Editor" },
  ];
}`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub={'`variant="lined"` is a roomier look for rows that hold people, payments and progress: a plain header, thin dividers between rows and no outer border. Cells can be plain text or built-in types set per column with `type` — "user" (avatar, name and handle), "payment" (card logo and masked number), "badges" (coloured tags) and "progress" (a bar). They are all driven by data, so they work from the Web Components too; for anything else use `render` (React) to put any component in a cell. Everything follows the theme and accent.'}>
            Lined variant with rich cells
          </SectionLabel>
          <Table variant="lined" columns={ACCOUNT_COLUMNS} data={ACCOUNTS} />
          <CodeBlock
            variants={{
              react: `const columns = ${COLUMNS_CODE};

const data = ${DATA_CODE};

<Table variant="lined" columns={columns} data={data} />`,
              js: `<l-Table id="accounts" variant="lined"></l-Table>

<script type="module">
  import "lojee-ui/elements";

  const table = document.getElementById("accounts");
  table.columns = ${indentBlock(COLUMNS_CODE, 2)};
  table.data = ${indentBlock(DATA_CODE, 2)};
</script>`,
              vue: `<template>
  <l-Table variant="lined" :columns="columns" :data="data"></l-Table>
</template>

<script setup lang="ts">
import "lojee-ui/elements";

const columns = ${COLUMNS_CODE};

const data = ${DATA_CODE};
</script>`,
              angular: `<l-Table variant="lined" [columns]="columns" [data]="data"></l-Table>

// component class
columns = ${COLUMNS_CODE};

data = ${DATA_CODE};`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub={'`selectable` adds a checkbox column at the start. The header checkbox selects every row (and shows a dash when only some are selected), and a bar above the table counts the selection with a "Clear selection" link. `rowKey` names the field that identifies a row (default: its position); `onSelectionChange` receives the selected keys and rows, and `selected` sets them from outside.'}>
            Selectable rows
          </SectionLabel>
          <SelectableDemo />
          <CodeBlock
            variants={{
              react: `const columns = ${COLUMNS_CODE};

const data = ${DATA_CODE};

const [keys, setKeys] = useState<(string | number)[]>(["alice"]);

<Table
  variant="lined"
  selectable
  rowKey="id"
  selected={keys}
  onSelectionChange={(selectedKeys, rows) => setKeys(selectedKeys)}
  columns={columns}
  data={data}
/>`,
              js: `<l-Table id="people" variant="lined" selectable="true" row-key="id"></l-Table>

<script type="module">
  import "lojee-ui/elements";

  const table = document.getElementById("people");
  table.columns = ${indentBlock(COLUMNS_CODE, 2)};
  table.data = ${indentBlock(DATA_CODE, 2)};
  table.selected = ["alice"];
  table.addEventListener("selectionchange", (e) => {
    console.log(e.detail.keys, e.detail.rows); // { keys: (string | number)[], rows: object[] }
  });
</script>`,
              vue: `<template>
  <l-Table
    variant="lined"
    :selectable="true"
    row-key="id"
    :columns="columns"
    :data="data"
    :selected="keys"
    @selectionchange="keys = $event.detail.keys"
  ></l-Table>
</template>

<script setup lang="ts">
import "lojee-ui/elements";

const columns = ${COLUMNS_CODE};

const data = ${DATA_CODE};

const keys = ref(["alice"]);
</script>`,
              angular: `<l-Table
  variant="lined"
  [selectable]="true"
  rowKey="id"
  [columns]="columns"
  [data]="data"
  [selected]="keys"
  (selectionchange)="keys = $event.detail.keys"
></l-Table>

// component class
columns = ${COLUMNS_CODE};

data = ${DATA_CODE};

keys: (string | number)[] = ["alice"];`,
            }}
          />
        </section>


        <section>
          <SectionLabel sub={'Set `viewToggle` to show a table / grid switch above the table, or set `view="grid"` to start as cards. The first column becomes the card title and the rest are labelled rows; selection, row actions, sorting (a "Sort by" menu) and the loading skeleton all carry over. `onViewChange` reports the new view.'}>
            Grid view
          </SectionLabel>
          <Table variant="lined" viewToggle columns={ORDER_COLUMNS} data={ORDERS} />
          <CodeBlock
            variants={{
              react: `<Table variant="lined" viewToggle columns={columns} data={data} onViewChange={(view) => console.log(view)} />

{/* Start as a grid and control it yourself */}
<Table variant="lined" view="grid" columns={columns} data={data} />`,
              js: `<l-Table id="orders" variant="lined" view-toggle="true"></l-Table>

<script type="module">
  import "lojee-ui/elements";

  const table = document.getElementById("orders");
  table.columns = columns;
  table.data = data;
  table.addEventListener("viewchange", (e) => console.log(e.detail)); // "table" | "grid"
</script>`,
              vue: `<template>
  <l-Table variant="lined" view-toggle="true" :columns="columns" :data="data" @viewchange="(e) => console.log(e.detail)"></l-Table>
</template>`,
              angular: `<l-Table variant="lined" view-toggle="true" [columns]="columns" [data]="data" (viewchange)="onView($event)"></l-Table>

onView(e: CustomEvent) {
  console.log(e.detail); // "table" | "grid"
}`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub={'More built-in cells: `image` (thumbnail, title and subtitle), `status` (a coloured pill — the colour comes from the words, or set it), `avatars` (overlapping people with a +N count), `currency`, `date`, `rating` (read-only stars) and `link`. All of them are plain data, so they also work from the Web Components, and every column here can be sorted.'}>
            More cell types
          </SectionLabel>
          <Table variant="lined" columns={ORDER_COLUMNS} data={ORDERS} />
          <CodeBlock
            variants={{
              react: `const columns = ${ORDER_COLUMNS_CODE};

const data = ${jsLiteral(ORDERS_FOR_CODE)};

<Table variant="lined" columns={columns} data={data} />`,
              js: `<l-Table id="orders" variant="lined"></l-Table>

<script type="module">
  import "lojee-ui/elements";

  const table = document.getElementById("orders");
  table.columns = ${indentBlock(ORDER_COLUMNS_CODE, 2)};
  table.data = ${indentBlock(jsLiteral(ORDERS_FOR_CODE), 2)};
</script>`,
              vue: `<template>
  <l-Table variant="lined" :columns="columns" :data="data"></l-Table>
</template>

<script setup lang="ts">
import "lojee-ui/elements";

const columns = ${ORDER_COLUMNS_CODE};

const data = ${jsLiteral(ORDERS_FOR_CODE)};
</script>`,
              angular: `<l-Table variant="lined" [columns]="columns" [data]="data"></l-Table>

// component class
columns = ${ORDER_COLUMNS_CODE};

data = ${jsLiteral(ORDERS_FOR_CODE)};`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub={'`responsive` decides what happens when the table gets narrow — measured on the table itself, so it also works inside a sidebar or a modal, not just on a small screen. By default ("stack") the table adjusts on its own: when it gets narrow every row turns into a card and each cell is labelled with its column header — nothing to configure. Set `responsive="scroll"` to keep the columns and scroll sideways instead. Try the container widths below; the switch happens under about 36rem.'}>
            Responsive
          </SectionLabel>
          <ResponsiveDemo />
          <CodeBlock
            variants={{
              react: `// Rows become labelled cards when the table is narrower than ~36rem
<Table variant="lined" columns={columns} data={data} />

// or keep the columns and scroll sideways (the default)
<Table variant="lined" responsive="scroll" columns={columns} data={data} />`,
              js: `<l-Table id="orders" variant="lined" responsive="stack"></l-Table>

<script type="module">
  import "lojee-ui/elements";

  const table = document.getElementById("orders");
  table.columns = [
    { key: "product", header: "Product", type: "image" },
    { key: "status", header: "Status", type: "status" },
    { key: "total", header: "Total", type: "currency", align: "right" },
    { key: "placed", header: "Placed", type: "date" },
  ];
  table.data = data;
</script>`,
              vue: `<template>
  <l-Table variant="lined" :columns="columns" :data="data"></l-Table>
</template>

<script setup lang="ts">
import "lojee-ui/elements";

const columns = [
  { key: "product", header: "Product", type: "image" },
  { key: "status", header: "Status", type: "status" },
  { key: "total", header: "Total", type: "currency", align: "right" },
  { key: "placed", header: "Placed", type: "date" },
];
</script>`,
              angular: `<l-Table variant="lined" [columns]="columns" [data]="data"></l-Table>

// component class
columns = [
  { key: "product", header: "Product", type: "image" },
  { key: "status", header: "Status", type: "status" },
  { key: "total", header: "Total", type: "currency", align: "right" },
  { key: "placed", header: "Placed", type: "date" },
];`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub={'Mark a column `sortable` to show sort arrows in its header: click once for ascending, again for descending and a third time to clear. Numbers sort as numbers and text sorts naturally. `onSortChange` reports the new sort.'}>
            Sorting
          </SectionLabel>
          <Table variant="lined" columns={SORT_COLUMNS} data={SORT_DATA} />
          <CodeBlock
            variants={{
              react: `<Table
  variant="lined"
  columns={[
    { key: "name", header: "Name", sortable: true },
    { key: "role", header: "Role", sortable: true },
    { key: "score", header: "Score", sortable: true, align: "right" },
  ]}
  data={data}
  onSortChange={(sort) => console.log(sort)} // { key, direction } | null
/>`,
              js: `<l-Table id="sortable" variant="lined"></l-Table>

<script type="module">
  import "lojee-ui/elements";

  const table = document.getElementById("sortable");
  table.columns = [
    { key: "name", header: "Name", sortable: true },
    { key: "role", header: "Role", sortable: true },
    { key: "score", header: "Score", sortable: true, align: "right" },
  ];
  table.data = data;
  table.addEventListener("sortchange", (e) => console.log(e.detail)); // { key, direction } | null
</script>`,
              vue: `<template>
  <l-Table variant="lined" :columns="columns" :data="data" @sortchange="onSort"></l-Table>
</template>

<script setup lang="ts">
import "lojee-ui/elements";

const columns = [
  { key: "name", header: "Name", sortable: true },
  { key: "role", header: "Role", sortable: true },
  { key: "score", header: "Score", sortable: true, align: "right" },
];
const onSort = (e: CustomEvent) => console.log(e.detail);
</script>`,
              angular: `<l-Table variant="lined" [columns]="columns" [data]="data" (sortchange)="onSort($event)"></l-Table>

// component class
columns = [
  { key: "name", header: "Name", sortable: true },
  { key: "role", header: "Role", sortable: true },
  { key: "score", header: "Score", sortable: true, align: "right" },
];
onSort(e: CustomEvent) {
  console.log(e.detail);
}`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Alternating row background.">Striped</SectionLabel>
          <Table variant="lined" columns={BASIC_COLUMNS} data={PEOPLE} striped />
          <CodeBlock
            variants={{
              react: `<Table variant="lined" columns={columns} data={people} striped />`,
              js: `<l-Table variant="lined" id="striped-table" striped></l-Table>

<script type="module">
  const table = document.getElementById("striped-table");
  table.columns = columns;
  table.data = people;
</script>`,
              vue: `<template>
  <l-Table variant="lined" :columns="columns" :data="people" striped />
</template>`,
              angular: `<!-- reuses the AppComponent from above -->
<l-Table variant="lined" [columns]="columns" [data]="people" striped />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Border around the table plus column dividers.">Bordered</SectionLabel>
          <Table variant="lined" columns={BASIC_COLUMNS} data={PEOPLE} bordered />
          <CodeBlock
            variants={{
              react: `<Table variant="lined" columns={columns} data={people} bordered />`,
              js: `<l-Table variant="lined" id="bordered-table" bordered></l-Table>

<script type="module">
  const table = document.getElementById("bordered-table");
  table.columns = columns;
  table.data = people;
</script>`,
              vue: `<template>
  <l-Table variant="lined" :columns="columns" :data="people" bordered />
</template>`,
              angular: `<!-- reuses the AppComponent from above -->
<l-Table variant="lined" [columns]="columns" [data]="people" bordered />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="sm, md, lg cell padding.">Sizes</SectionLabel>
          <div className="space-y-6">
            <Table variant="lined" columns={BASIC_COLUMNS} data={PEOPLE} size="sm" bordered />
            <Table variant="lined" columns={BASIC_COLUMNS} data={PEOPLE} size="lg" bordered />
          </div>
          <CodeBlock
            variants={{
              react: `<Table variant="lined" columns={columns} data={people} size="sm" bordered />
<Table variant="lined" columns={columns} data={people} size="lg" bordered />`,
              js: `<l-Table variant="lined" id="table-sm" size="sm" bordered></l-Table>
<l-Table variant="lined" id="table-lg" size="lg" bordered></l-Table>

<script type="module">
  document.getElementById("table-sm").columns = columns;
  document.getElementById("table-sm").data = people;
  document.getElementById("table-lg").columns = columns;
  document.getElementById("table-lg").data = people;
</script>`,
              vue: `<template>
  <l-Table variant="lined" :columns="columns" :data="people" size="sm" bordered />
  <l-Table variant="lined" :columns="columns" :data="people" size="lg" bordered />
</template>`,
              angular: `<!-- reuses the AppComponent from above -->
<l-Table variant="lined" [columns]="columns" [data]="people" size="sm" bordered />
<l-Table variant="lined" [columns]="columns" [data]="people" size="lg" bordered />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="A custom render function, here rendering a status Badge.">Custom cell rendering</SectionLabel>
          <Table variant="lined" columns={STATUS_COLUMNS} data={PEOPLE} striped />
          <CodeBlock
            variants={{
              react: `const columns = [
  { key: "name", header: "Name" },
  { key: "email", header: "Email" },
  {
    key: "status",
    header: "Status",
    align: "right",
    render: (row) => <Badge color={statusColor[row.status]} label={row.status} />,
  },
];

<Table variant="lined" columns={columns} data={people} striped />`,
              js: `<l-Table variant="lined" id="status-table" striped></l-Table>

<script type="module">
  const columns = [
    { key: "name", header: "Name" },
    { key: "email", header: "Email" },
    {
      key: "status",
      header: "Status",
      align: "right",
      // A column's render function can return any value React can render —
      // here a plain string stands in for the Badge shown in the React version,
      // since a real React element can't cross into a Web Component property.
      render: (row) => row.status,
    },
  ];

  const table = document.getElementById("status-table");
  table.columns = columns;
  table.data = people;
</script>`,
              vue: `<template>
  <l-Table variant="lined" :columns="columns" :data="people" striped />
</template>

<script setup lang="ts">
const columns = [
  { key: "name", header: "Name" },
  { key: "email", header: "Email" },
  {
    key: "status",
    header: "Status",
    align: "right",
    render: (row) => row.status,
  },
];
</script>`,
              angular: `<l-Table variant="lined" [columns]="columns" [data]="people" striped></l-Table>

columns = [
  { key: "name", header: "Name" },
  { key: "email", header: "Email" },
  {
    key: "status",
    header: "Status",
    align: "right",
    render: (row) => row.status,
  },
];`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="`loading` swaps the rows for shimmering skeleton bars while the header stays put; `skeletonRows` sets how many (default 5). Sets `aria-busy` on the table.">Loading</SectionLabel>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setLoading((v) => !v)}
              className="rounded-md bg-fg px-3 py-1.5 text-xs font-medium text-surface transition-colors hover:opacity-90"
            >
              {loading ? "Show data" : "Show loading"}
            </button>
            <button
              type="button"
              onClick={simulateFetch}
              className="rounded-md bg-surface-muted px-3 py-1.5 text-xs font-medium text-fg-muted transition-colors hover:bg-border"
            >
              Simulate a 2s fetch
            </button>
          </div>
          <div className="mt-3">
            <Table variant="lined" columns={BASIC_COLUMNS} data={PEOPLE} loading={loading} skeletonRows={4} />
          </div>
          <CodeBlock
            variants={{
              react: `const [loading, setLoading] = useState(true);

<Table variant="lined" columns={columns} data={rows} loading={loading} skeletonRows={4} />

// e.g. setLoading(true); await fetchRows(); setLoading(false);`,
              js: `<l-Table variant="lined" id="loading-table" loading skeletonRows="4"></l-Table>

<script type="module">
  const el = document.getElementById("loading-table");
  el.columns = columns;
  el.data = [];

  // Flip loading off once the data arrives.
  const rows = await fetchRows();
  el.data = rows;
  el.loading = false;
</script>`,
              vue: `<template>
  <l-Table variant="lined" :columns="columns" :data="rows" :loading="loading" skeletonRows="4" />
</template>

<script setup lang="ts">
import { ref } from "vue";
const loading = ref(true);
const rows = ref([]);
</script>`,
              angular: `<l-Table variant="lined" [columns]="columns" [data]="rows" [loading]="loading" skeletonRows="4"></l-Table>

loading = true;
rows = [];`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub={'`actionsVariant="menu"` folds the actions into one three-dot button that opens a dropdown — handy when there are many actions or little room. It works the same way (built-in edit / duplicate / delete, `onAction`), the list is drawn above the table so it is never clipped, and it flips upward near the bottom of the screen. The default, `"buttons"`, shows one icon button per action.'}>Actions as a dropdown menu</SectionLabel>
          <Table variant="lined" columns={BASIC_COLUMNS} data={PEOPLE} actions={ROW_ACTIONS} actionsVariant="menu" />
          <CodeBlock
            variants={{
              react: `<Table variant="lined" columns={columns} data={people} actions={actions} actionsVariant="menu" />`,
              js: `<l-Table variant="lined" id="menu-table" actions-variant="menu"></l-Table>

<script type="module">
  const el = document.getElementById("menu-table");
  el.columns = columns;
  el.data = people;
  el.actions = actions;
</script>`,
              vue: `<l-Table variant="lined" :columns="columns" :data="people" :actions="actions" actions-variant="menu" />`,
              angular: `<l-Table variant="lined" [columns]="columns" [data]="people" [actions]="actions" actions-variant="menu"></l-Table>`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="`actions` adds a right-aligned Actions column of soft icon buttons (tooltip and accessible label = `label`; `color: &quot;danger&quot;` for destructive ones). Actions whose `value` is &quot;edit&quot;, &quot;duplicate&quot; or &quot;delete&quot; work out of the box (inline edit with Enter / Escape, copy, remove); `onAction` still fires, `onDataChange` receives the updated rows, and `builtInActions={false}` turns the built-ins off. `actionsHeader` renames the column.">Row actions</SectionLabel>
          <Table variant="lined"
            key={resetKey}
            columns={BASIC_COLUMNS}
            data={PEOPLE}
            actions={ROW_ACTIONS}
            onAction={(action, row) => setLastAction(`${action.label}: ${row.name}`)}
          />
          <div className="mt-2 flex items-center gap-3">
            <p className="text-sm text-fg-subtle">{lastAction ? `Last action: ${lastAction}` : "Click an action"}</p>
            <button
              type="button"
              onClick={() => {
                setResetKey((n) => n + 1);
                setLastAction(null);
              }}
              className="rounded-md bg-surface-muted px-2.5 py-1 text-xs font-medium text-fg-muted transition-colors hover:bg-border"
            >
              Reset data
            </button>
          </div>
          <CodeBlock
            variants={{
              react: `const actions = [
  { label: "Edit", icon: "pencil", value: "edit" },
  { label: "Duplicate", icon: "copy", value: "duplicate" },
  { label: "Delete", icon: "trash-2", value: "delete", color: "danger" },
];

<Table variant="lined"
  columns={columns}
  data={people}
  actions={actions}
  // "edit" | "duplicate" | "delete" are handled by the table itself
  onAction={(action, row) => console.log(action.value, row)}
  onDataChange={(rows) => setPeople(rows)}
/>`,
              js: `<l-Table variant="lined" id="actions-table"></l-Table>

<script type="module">
  const el = document.getElementById("actions-table");
  el.columns = columns;
  el.data = people;
  el.actions = [
    { label: "Edit", icon: "pencil", value: "edit" },
    { label: "Duplicate", icon: "copy", value: "duplicate" },
    { label: "Delete", icon: "trash-2", value: "delete", color: "danger" },
  ];
  // "edit" | "duplicate" | "delete" are handled by the table itself.
  // action detail = { action, row }; datachange detail = the updated rows array
  el.addEventListener("action", (e) => console.log(e.detail.action.value, e.detail.row));
  el.addEventListener("datachange", (e) => console.log(e.detail));
</script>`,
              vue: `<template>
  <l-Table variant="lined" :columns="columns" :data="people" :actions="actions" @action="onAction" @datachange="onDataChange" />
</template>

<script setup lang="ts">
const actions = [
  { label: "Edit", icon: "pencil", value: "edit" },
  { label: "Duplicate", icon: "copy", value: "duplicate" },
  { label: "Delete", icon: "trash-2", value: "delete", color: "danger" },
];

// "edit" | "duplicate" | "delete" are handled by the table itself
// action detail = { action, row }
function onAction(e) {
  console.log(e.detail.action.value, e.detail.row);
}

// datachange detail = the updated rows array
function onDataChange(e) {
  console.log(e.detail);
}
</script>`,
              angular: `<l-Table variant="lined" [columns]="columns" [data]="people" [actions]="actions" (action)="onAction($event)" (datachange)="onDataChange($event)"></l-Table>

actions = [
  { label: "Edit", icon: "pencil", value: "edit" },
  { label: "Duplicate", icon: "copy", value: "duplicate" },
  { label: "Delete", icon: "trash-2", value: "delete", color: "danger" },
];

// "edit" | "duplicate" | "delete" are handled by the table itself
// action detail = { action, row }
onAction(e) {
  console.log(e.detail.action.value, e.detail.row);
}

// datachange detail = the updated rows array
onDataChange(e) {
  console.log(e.detail);
}`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Enter transitions via `transition` (with `transitionDuration` / `transitionDelay`). They play on mount — reload the page, or use Replay in the playground.">Transitions</SectionLabel>
          <TransitionPreview cols={1}>
            <Table variant="lined" columns={BASIC_COLUMNS} data={PEOPLE} transition="fade" />
            <Table variant="lined" columns={BASIC_COLUMNS} data={PEOPLE} transition="slide-up" />
            <Table variant="lined" columns={BASIC_COLUMNS} data={PEOPLE} transition="zoom" transitionDelay={100} />
            <Table variant="lined" columns={BASIC_COLUMNS} data={PEOPLE} transition="blur" transitionDuration={700} />
          </TransitionPreview>
          <CodeBlock
            variants={{
              react: `const columns = [
  { key: "name", header: "Name" },
  { key: "email", header: "Email" },
  { key: "role", header: "Role", align: "right" },
];

<Table variant="lined" columns={columns} data={people} transition="fade" />
<Table variant="lined" columns={columns} data={people} transition="slide-up" />
<Table variant="lined" columns={columns} data={people} transition="zoom" transitionDelay={100} />
<Table variant="lined" columns={columns} data={people} transition="blur" transitionDuration={700} />`,
              js: `<l-Table variant="lined" id="t1" transition="fade"></l-Table>
<l-Table variant="lined" id="t2" transition="slide-up"></l-Table>
<l-Table variant="lined" id="t3" transition="zoom" transitionDelay="100"></l-Table>
<l-Table variant="lined" id="t4" transition="blur" transitionDuration="700"></l-Table>

<script type="module">
  import "lojee-ui/elements";

  const columns = [
    { key: "name", header: "Name" },
    { key: "email", header: "Email" },
    { key: "role", header: "Role", align: "right" },
  ];
  const data = [
    { name: "Ava Chen", email: "ava@acme.com", role: "Admin" },
    { name: "Marcus Lee", email: "marcus@acme.com", role: "Editor" },
    { name: "Priya Nair", email: "priya@acme.com", role: "Viewer" },
  ];

  for (const id of ["t1", "t2", "t3", "t4"]) {
    const table = document.getElementById(id);
    table.columns = columns;
    table.data = data;
  }
</script>`,
              vue: `<template>
  <l-Table variant="lined" :columns="columns" :data="people" transition="fade"></l-Table>
  <l-Table variant="lined" :columns="columns" :data="people" transition="slide-up"></l-Table>
  <l-Table variant="lined" :columns="columns" :data="people" transition="zoom" transitionDelay="100"></l-Table>
  <l-Table variant="lined" :columns="columns" :data="people" transition="blur" transitionDuration="700"></l-Table>
</template>

<script setup lang="ts">
import "lojee-ui/elements";

const columns = [
  { key: "name", header: "Name" },
  { key: "email", header: "Email" },
  { key: "role", header: "Role", align: "right" },
];

const people = [
  { name: "Ava Chen", email: "ava@acme.com", role: "Admin" },
  { name: "Marcus Lee", email: "marcus@acme.com", role: "Editor" },
  { name: "Priya Nair", email: "priya@acme.com", role: "Viewer" },
];
</script>`,
              angular: `// app.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "lojee-ui/elements";

@Component({
  selector: "app-root",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <l-Table variant="lined" [columns]="columns" [data]="people" transition="fade"></l-Table>
    <l-Table variant="lined" [columns]="columns" [data]="people" transition="slide-up"></l-Table>
    <l-Table variant="lined" [columns]="columns" [data]="people" transition="zoom" transitionDelay="100"></l-Table>
    <l-Table variant="lined" [columns]="columns" [data]="people" transition="blur" transitionDuration="700"></l-Table>
  \`,
})
export class AppComponent {
  columns = [
    { key: "name", header: "Name" },
    { key: "email", header: "Email" },
    { key: "role", header: "Role", align: "right" },
  ];

  people = [
    { name: "Ava Chen", email: "ava@acme.com", role: "Admin" },
    { name: "Marcus Lee", email: "marcus@acme.com", role: "Editor" },
    { name: "Priya Nair", email: "priya@acme.com", role: "Viewer" },
  ];
}`,
            }}
          />
        </section>
      </div>
    </div>
  );
}
