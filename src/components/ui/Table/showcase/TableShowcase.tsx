import { useEffect, useState } from "react";
import { Table, type TableAction, type TableColumn } from "../Table";
import { Badge } from "../../Badge/Badge";
import CodeBlock from "../../CodeBlock";
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

export default function TableShowcase() {
  const [loading, setLoading] = useState(true);
  // Simulated 2s fetch — starts loading on mount, and again on each click.
  const [fetchId, setFetchId] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, [fetchId]);
  const reload = () => {
    setLoading(true);
    setFetchId((n) => n + 1);
  };
  const [lastAction, setLastAction] = useState<string | null>(null);
  const [resetKey, setResetKey] = useState(0);
  return (
    <div className="min-h-screen rounded-xl bg-surface p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-fg">Table</h1>
          <p className="text-sm text-fg-subtle mt-1">A data-driven table — pass columns and rows, no compound children.</p>
        </div>

        <section>
          <SectionLabel sub="Columns + data, rendered as a plain table.">Basic</SectionLabel>
          <Table columns={BASIC_COLUMNS} data={PEOPLE} />
          <CodeBlock
            variants={{
              react: `const columns = [
  { key: "name", header: "Name" },
  { key: "email", header: "Email" },
  { key: "role", header: "Role", align: "right" },
];

<Table columns={columns} data={people} />`,
              js: `<l-Table id="basic-table" />

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
  <l-Table :columns="columns" :data="people" />
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
  template: \`<l-Table [columns]="columns" [data]="people" />\`,
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
          <SectionLabel sub="Alternating row background.">Striped</SectionLabel>
          <Table columns={BASIC_COLUMNS} data={PEOPLE} striped />
          <CodeBlock
            variants={{
              react: `<Table columns={columns} data={people} striped />`,
              js: `<l-Table id="striped-table" striped />

<script type="module">
  const table = document.getElementById("striped-table");
  table.columns = columns;
  table.data = people;
</script>`,
              vue: `<template>
  <l-Table :columns="columns" :data="people" striped />
</template>`,
              angular: `<!-- reuses the AppComponent from above -->
<l-Table [columns]="columns" [data]="people" striped />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Border around the table plus column dividers.">Bordered</SectionLabel>
          <Table columns={BASIC_COLUMNS} data={PEOPLE} bordered />
          <CodeBlock
            variants={{
              react: `<Table columns={columns} data={people} bordered />`,
              js: `<l-Table id="bordered-table" bordered />

<script type="module">
  const table = document.getElementById("bordered-table");
  table.columns = columns;
  table.data = people;
</script>`,
              vue: `<template>
  <l-Table :columns="columns" :data="people" bordered />
</template>`,
              angular: `<!-- reuses the AppComponent from above -->
<l-Table [columns]="columns" [data]="people" bordered />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="sm, md, lg cell padding.">Sizes</SectionLabel>
          <div className="space-y-6">
            <Table columns={BASIC_COLUMNS} data={PEOPLE} size="sm" bordered />
            <Table columns={BASIC_COLUMNS} data={PEOPLE} size="lg" bordered />
          </div>
          <CodeBlock
            variants={{
              react: `<Table columns={columns} data={people} size="sm" bordered />
<Table columns={columns} data={people} size="lg" bordered />`,
              js: `<l-Table id="table-sm" size="sm" bordered />
<l-Table id="table-lg" size="lg" bordered />

<script type="module">
  document.getElementById("table-sm").columns = columns;
  document.getElementById("table-sm").data = people;
  document.getElementById("table-lg").columns = columns;
  document.getElementById("table-lg").data = people;
</script>`,
              vue: `<template>
  <l-Table :columns="columns" :data="people" size="sm" bordered />
  <l-Table :columns="columns" :data="people" size="lg" bordered />
</template>`,
              angular: `<!-- reuses the AppComponent from above -->
<l-Table [columns]="columns" [data]="people" size="sm" bordered />
<l-Table [columns]="columns" [data]="people" size="lg" bordered />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="A custom render function, here rendering a status Badge.">Custom cell rendering</SectionLabel>
          <Table columns={STATUS_COLUMNS} data={PEOPLE} striped />
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

<Table columns={columns} data={people} striped />`,
              js: `<l-Table id="status-table" striped></l-Table>

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
  <l-Table :columns="columns" :data="people" striped />
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
              angular: `<l-Table [columns]="columns" [data]="people" striped></l-Table>

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
          <button
            type="button"
            onClick={reload}
            className="rounded-md bg-fg px-3 py-1.5 text-xs font-medium text-surface transition-colors hover:opacity-90"
          >
            {loading ? "Loading..." : "Reload data"}
          </button>
          <div className="mt-3">
            <Table columns={BASIC_COLUMNS} data={PEOPLE} loading={loading} skeletonRows={4} />
          </div>
          <CodeBlock
            variants={{
              react: `const [loading, setLoading] = useState(true);

<Table columns={columns} data={rows} loading={loading} skeletonRows={4} />

// e.g. setLoading(true); await fetchRows(); setLoading(false);`,
              js: `<l-Table id="loading-table" loading skeletonRows="4"></l-Table>

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
  <l-Table :columns="columns" :data="rows" :loading="loading" skeletonRows="4" />
</template>

<script setup lang="ts">
import { ref } from "vue";
const loading = ref(true);
const rows = ref([]);
</script>`,
              angular: `<l-Table [columns]="columns" [data]="rows" [loading]="loading" skeletonRows="4"></l-Table>

loading = true;
rows = [];`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="`actions` adds a right-aligned Actions column of ghost icon buttons (tooltip and accessible label = `label`; `color: &quot;danger&quot;` for destructive ones). Actions whose `value` is &quot;edit&quot;, &quot;duplicate&quot; or &quot;delete&quot; work out of the box (inline edit with Enter / Escape, copy, remove); `onAction` still fires, `onDataChange` receives the updated rows, and `builtInActions={false}` turns the built-ins off. `actionsHeader` renames the column.">Row actions</SectionLabel>
          <Table
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

<Table
  columns={columns}
  data={people}
  actions={actions}
  // "edit" | "duplicate" | "delete" are handled by the table itself
  onAction={(action, row) => console.log(action.value, row)}
  onDataChange={(rows) => setPeople(rows)}
/>`,
              js: `<l-Table id="actions-table"></l-Table>

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
  <l-Table :columns="columns" :data="people" :actions="actions" @action="onAction" @datachange="onDataChange" />
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
              angular: `<l-Table [columns]="columns" [data]="people" [actions]="actions" (action)="onAction($event)" (datachange)="onDataChange($event)"></l-Table>

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
            <Table columns={BASIC_COLUMNS} data={PEOPLE} transition="fade" />
            <Table columns={BASIC_COLUMNS} data={PEOPLE} transition="slide-up" />
            <Table columns={BASIC_COLUMNS} data={PEOPLE} transition="zoom" transitionDelay={100} />
            <Table columns={BASIC_COLUMNS} data={PEOPLE} transition="blur" transitionDuration={700} />
          </TransitionPreview>
          <CodeBlock
            variants={{
              react: `const columns = [
  { key: "name", header: "Name" },
  { key: "email", header: "Email" },
  { key: "role", header: "Role", align: "right" },
];

<Table columns={columns} data={people} transition="fade" />
<Table columns={columns} data={people} transition="slide-up" />
<Table columns={columns} data={people} transition="zoom" transitionDelay={100} />
<Table columns={columns} data={people} transition="blur" transitionDuration={700} />`,
              js: `<l-Table id="t1" transition="fade"></l-Table>
<l-Table id="t2" transition="slide-up"></l-Table>
<l-Table id="t3" transition="zoom" transitionDelay="100"></l-Table>
<l-Table id="t4" transition="blur" transitionDuration="700"></l-Table>

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
  <l-Table :columns="columns" :data="people" transition="fade"></l-Table>
  <l-Table :columns="columns" :data="people" transition="slide-up"></l-Table>
  <l-Table :columns="columns" :data="people" transition="zoom" transitionDelay="100"></l-Table>
  <l-Table :columns="columns" :data="people" transition="blur" transitionDuration="700"></l-Table>
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
    <l-Table [columns]="columns" [data]="people" transition="fade"></l-Table>
    <l-Table [columns]="columns" [data]="people" transition="slide-up"></l-Table>
    <l-Table [columns]="columns" [data]="people" transition="zoom" transitionDelay="100"></l-Table>
    <l-Table [columns]="columns" [data]="people" transition="blur" transitionDuration="700"></l-Table>
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
