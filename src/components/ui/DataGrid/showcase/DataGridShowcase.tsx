import { useState } from "react";
import { DataGrid, type DataGridColumn } from "../DataGrid";
import { Badge } from "../../Badge/Badge";
import CodeBlock from "../../CodeBlock";
import { SectionLabel } from "../../ShowcaseHelpers";

interface Project {
  name: string;
  status: "active" | "paused" | "done";
  owner: string;
  tasks: number;
}

const PROJECTS: Project[] = [
  { name: "Website Redesign", status: "active", owner: "Ava Chen", tasks: 12 },
  { name: "Mobile App", status: "paused", owner: "Marcus Lee", tasks: 7 },
  { name: "API Migration", status: "active", owner: "Priya Nair", tasks: 21 },
  { name: "Design System", status: "done", owner: "Dan Ostrow", tasks: 4 },
  { name: "Onboarding Flow", status: "active", owner: "Ava Chen", tasks: 9 },
];

const STATUS_COLOR: Record<Project["status"], "emerald" | "amber" | "slate"> = {
  active: "emerald",
  paused: "amber",
  done: "slate",
};

const BASIC_COLUMNS: DataGridColumn<Project>[] = [
  { key: "name", header: "Name" },
  {
    key: "status",
    header: "Status",
    render: (row) => <Badge color={STATUS_COLOR[row.status]} label={row.status} />,
  },
  { key: "owner", header: "Owner" },
  { key: "tasks", header: "Tasks", align: "right" },
];

const SORTABLE_COLUMNS: DataGridColumn<Project>[] = [
  { key: "name", header: "Name", sortable: true },
  {
    key: "status",
    header: "Status",
    render: (row) => <Badge color={STATUS_COLOR[row.status]} label={row.status} />,
  },
  { key: "owner", header: "Owner" },
  { key: "tasks", header: "Tasks", align: "right", sortable: true },
];

export default function DataGridShowcase() {
  const [selectedCount, setSelectedCount] = useState(0);

  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Data Grid</h1>
          <p className="text-sm text-slate-500 mt-1">
            A richer Table — click-to-sort columns and row selection, still fully data-driven (columns + data, no
            compound children).
          </p>
        </div>

        <section>
          <SectionLabel sub="Columns + data, rendered as a plain grid.">Basic</SectionLabel>
          <DataGrid columns={BASIC_COLUMNS} data={PROJECTS} bordered />
          <CodeBlock
            variants={{
              react: `const columns = [
  { key: "name", header: "Name" },
  {
    key: "status",
    header: "Status",
    render: (row) => <Badge color={statusColor[row.status]} label={row.status} />,
  },
  { key: "owner", header: "Owner" },
  { key: "tasks", header: "Tasks", align: "right" },
];

<DataGrid columns={columns} data={projects} bordered />`,
              js: `<DataGrid id="basic-grid" bordered></DataGrid>

<script type="module">
  import "lojee-ui/elements";

  const columns = [
    { key: "name", header: "Name" },
    { key: "status", header: "Status" },
    { key: "owner", header: "Owner" },
    { key: "tasks", header: "Tasks", align: "right" },
  ];

  const grid = document.getElementById("basic-grid");
  grid.columns = columns;
  grid.data = [
    { name: "Website Redesign", status: "active", owner: "Ava Chen", tasks: 12 },
    { name: "Mobile App", status: "paused", owner: "Marcus Lee", tasks: 7 },
    { name: "API Migration", status: "active", owner: "Priya Nair", tasks: 21 },
    { name: "Design System", status: "done", owner: "Dan Ostrow", tasks: 4 },
    { name: "Onboarding Flow", status: "active", owner: "Ava Chen", tasks: 9 },
  ];
</script>`,
              vue: `<template>
  <DataGrid :columns="columns" :data="projects" bordered />
</template>

<script setup>
import "lojee-ui/elements";

const columns = [
  { key: "name", header: "Name" },
  { key: "status", header: "Status" },
  { key: "owner", header: "Owner" },
  { key: "tasks", header: "Tasks", align: "right" },
];

const projects = [
  { name: "Website Redesign", status: "active", owner: "Ava Chen", tasks: 12 },
  { name: "Mobile App", status: "paused", owner: "Marcus Lee", tasks: 7 },
  { name: "API Migration", status: "active", owner: "Priya Nair", tasks: 21 },
  { name: "Design System", status: "done", owner: "Dan Ostrow", tasks: 4 },
  { name: "Onboarding Flow", status: "active", owner: "Ava Chen", tasks: 9 },
];
</script>`,
              angular: `// app.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "lojee-ui/elements";

@Component({
  selector: "app-root",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`<DataGrid [columns]="columns" [data]="projects" bordered />\`,
})
export class AppComponent {
  columns = [
    { key: "name", header: "Name" },
    { key: "status", header: "Status" },
    { key: "owner", header: "Owner" },
    { key: "tasks", header: "Tasks", align: "right" },
  ];

  projects = [
    { name: "Website Redesign", status: "active", owner: "Ava Chen", tasks: 12 },
    { name: "Mobile App", status: "paused", owner: "Marcus Lee", tasks: 7 },
    { name: "API Migration", status: "active", owner: "Priya Nair", tasks: 21 },
    { name: "Design System", status: "done", owner: "Dan Ostrow", tasks: 4 },
    { name: "Onboarding Flow", status: "active", owner: "Ava Chen", tasks: 9 },
  ];
}`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Set `sortable` on a column to make its header click-to-sort (asc → desc → none).">
            Sortable columns
          </SectionLabel>
          <DataGrid columns={SORTABLE_COLUMNS} data={PROJECTS} bordered />
          <CodeBlock
            variants={{
              react: `const columns = [
  { key: "name", header: "Name", sortable: true },
  { key: "status", header: "Status", render: (row) => <Badge ... /> },
  { key: "owner", header: "Owner" },
  { key: "tasks", header: "Tasks", align: "right", sortable: true },
];

<DataGrid columns={columns} data={projects} bordered />`,
              js: `<DataGrid id="sortable-grid" bordered></DataGrid>

<script type="module">
  const columns = [
    { key: "name", header: "Name", sortable: true },
    { key: "status", header: "Status" },
    { key: "owner", header: "Owner" },
    { key: "tasks", header: "Tasks", align: "right", sortable: true },
  ];

  const grid = document.getElementById("sortable-grid");
  grid.columns = columns;
  grid.data = projects;
</script>`,
              vue: `<template>
  <DataGrid :columns="columns" :data="projects" bordered />
</template>

<script setup>
const columns = [
  { key: "name", header: "Name", sortable: true },
  { key: "status", header: "Status" },
  { key: "owner", header: "Owner" },
  { key: "tasks", header: "Tasks", align: "right", sortable: true },
];
</script>`,
              angular: `<!-- reuses the AppComponent from above, with \`sortable: true\` added to the
     "name" and "tasks" columns -->
<DataGrid [columns]="columns" [data]="projects" bordered />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Set `selectable` to add a checkbox column — `onSelectionChange` reports the selected row objects.">
            Selectable rows
          </SectionLabel>
          <DataGrid
            columns={BASIC_COLUMNS}
            data={PROJECTS}
            bordered
            selectable
            onSelectionChange={(rows) => setSelectedCount(rows.length)}
          />
          <p className="mt-2 text-sm text-slate-500">{selectedCount} selected</p>
          <CodeBlock
            variants={{
              react: `const [selected, setSelected] = useState([]);

<DataGrid
  columns={columns}
  data={projects}
  bordered
  selectable
  onSelectionChange={setSelected}
/>

<p>{selected.length} selected</p>`,
              js: `<DataGrid id="selectable-grid" bordered selectable></DataGrid>
<p id="selection-count">0 selected</p>

<script type="module">
  const grid = document.getElementById("selectable-grid");
  grid.columns = columns;
  grid.data = projects;
  grid.addEventListener("selectionchange", (e) => {
    document.getElementById("selection-count").textContent = \`\${e.detail.length} selected\`;
  });
</script>`,
              vue: `<template>
  <DataGrid :columns="columns" :data="projects" bordered selectable @selectionchange="selected = $event" />
  <p>{{ selected.length }} selected</p>
</template>

<script setup>
import { ref } from "vue";
const selected = ref([]);
</script>`,
              angular: `<DataGrid [columns]="columns" [data]="projects" bordered selectable (selectionchange)="selected = $event"></DataGrid>
<p>{{ selected.length }} selected</p>

selected = [];`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="sm, md, lg cell padding.">Sizes</SectionLabel>
          <div className="space-y-6">
            <DataGrid columns={BASIC_COLUMNS} data={PROJECTS} size="sm" bordered />
            <DataGrid columns={BASIC_COLUMNS} data={PROJECTS} size="lg" bordered />
          </div>
          <CodeBlock
            variants={{
              react: `<DataGrid columns={columns} data={projects} size="sm" bordered />
<DataGrid columns={columns} data={projects} size="lg" bordered />`,
              js: `<DataGrid id="grid-sm" size="sm" bordered></DataGrid>
<DataGrid id="grid-lg" size="lg" bordered></DataGrid>

<script type="module">
  document.getElementById("grid-sm").columns = columns;
  document.getElementById("grid-sm").data = projects;
  document.getElementById("grid-lg").columns = columns;
  document.getElementById("grid-lg").data = projects;
</script>`,
              vue: `<template>
  <DataGrid :columns="columns" :data="projects" size="sm" bordered />
  <DataGrid :columns="columns" :data="projects" size="lg" bordered />
</template>`,
              angular: `<!-- reuses the AppComponent from above -->
<DataGrid [columns]="columns" [data]="projects" size="sm" bordered />
<DataGrid [columns]="columns" [data]="projects" size="lg" bordered />`,
            }}
          />
        </section>
      </div>
    </div>
  );
}
