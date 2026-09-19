import { Table, type TableColumn } from "../Table";
import { Badge } from "../../Badge/Badge";
import CodeBlock from "../../CodeBlock";
import { SectionLabel } from "../../ShowcaseHelpers";

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

export default function TableShowcase() {
  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Table</h1>
          <p className="text-sm text-slate-500 mt-1">A data-driven table — pass columns and rows, no compound children.</p>
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
              js: `<Table id="basic-table" />

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
  <Table :columns="columns" :data="people" />
</template>

<script setup>
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
  template: \`<Table [columns]="columns" [data]="people" />\`,
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
              js: `<Table id="striped-table" striped />

<script type="module">
  const table = document.getElementById("striped-table");
  table.columns = columns;
  table.data = people;
</script>`,
              vue: `<template>
  <Table :columns="columns" :data="people" striped />
</template>`,
              angular: `<!-- reuses the AppComponent from above -->
<Table [columns]="columns" [data]="people" striped />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Border around the table plus column dividers.">Bordered</SectionLabel>
          <Table columns={BASIC_COLUMNS} data={PEOPLE} bordered />
          <CodeBlock
            variants={{
              react: `<Table columns={columns} data={people} bordered />`,
              js: `<Table id="bordered-table" bordered />

<script type="module">
  const table = document.getElementById("bordered-table");
  table.columns = columns;
  table.data = people;
</script>`,
              vue: `<template>
  <Table :columns="columns" :data="people" bordered />
</template>`,
              angular: `<!-- reuses the AppComponent from above -->
<Table [columns]="columns" [data]="people" bordered />`,
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
              js: `<Table id="table-sm" size="sm" bordered />
<Table id="table-lg" size="lg" bordered />

<script type="module">
  document.getElementById("table-sm").columns = columns;
  document.getElementById("table-sm").data = people;
  document.getElementById("table-lg").columns = columns;
  document.getElementById("table-lg").data = people;
</script>`,
              vue: `<template>
  <Table :columns="columns" :data="people" size="sm" bordered />
  <Table :columns="columns" :data="people" size="lg" bordered />
</template>`,
              angular: `<!-- reuses the AppComponent from above -->
<Table [columns]="columns" [data]="people" size="sm" bordered />
<Table [columns]="columns" [data]="people" size="lg" bordered />`,
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
              js: `<Table id="status-table" striped></Table>

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
  <Table :columns="columns" :data="people" striped />
</template>

<script setup>
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
              angular: `<Table [columns]="columns" [data]="people" striped></Table>

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
      </div>
    </div>
  );
}
