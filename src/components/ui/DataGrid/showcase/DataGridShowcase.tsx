import { useEffect, useState } from "react";
import { DataGrid, type DataGridColumn } from "../DataGrid";
import { Badge } from "../../Badge/Badge";
import CodeBlock from "../../CodeBlock";
import { SectionLabel, Row, TransitionPreview } from "../../ShowcaseHelpers";

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
  const [selectedCount, setSelectedCount] = useState(0);

  return (
    <div className="min-h-screen rounded-xl bg-surface p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-fg">Data Grid</h1>
          <p className="text-sm text-fg-subtle mt-1">
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
              js: `<l-DataGrid id="basic-grid" bordered></l-DataGrid>

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
  <l-DataGrid :columns="columns" :data="projects" bordered />
</template>

<script setup lang="ts">
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
  template: \`<l-DataGrid [columns]="columns" [data]="projects" bordered />\`,
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
              js: `<l-DataGrid id="sortable-grid" bordered></l-DataGrid>

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
  <l-DataGrid :columns="columns" :data="projects" bordered />
</template>

<script setup lang="ts">
const columns = [
  { key: "name", header: "Name", sortable: true },
  { key: "status", header: "Status" },
  { key: "owner", header: "Owner" },
  { key: "tasks", header: "Tasks", align: "right", sortable: true },
];
</script>`,
              angular: `<!-- reuses the AppComponent from above, with \`sortable: true\` added to the
     "name" and "tasks" columns -->
<l-DataGrid [columns]="columns" [data]="projects" bordered />`,
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
          <p className="mt-2 text-sm text-fg-subtle">{selectedCount} selected</p>
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
              js: `<l-DataGrid id="selectable-grid" bordered selectable></l-DataGrid>
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
  <l-DataGrid :columns="columns" :data="projects" bordered selectable @selectionchange="selected = $event" />
  <p>{{ selected.length }} selected</p>
</template>

<script setup lang="ts">
import { ref } from "vue";
const selected = ref([]);
</script>`,
              angular: `<l-DataGrid [columns]="columns" [data]="projects" bordered selectable (selectionchange)="selected = $event"></l-DataGrid>
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
              js: `<l-DataGrid id="grid-sm" size="sm" bordered></l-DataGrid>
<l-DataGrid id="grid-lg" size="lg" bordered></l-DataGrid>

<script type="module">
  document.getElementById("grid-sm").columns = columns;
  document.getElementById("grid-sm").data = projects;
  document.getElementById("grid-lg").columns = columns;
  document.getElementById("grid-lg").data = projects;
</script>`,
              vue: `<template>
  <l-DataGrid :columns="columns" :data="projects" size="sm" bordered />
  <l-DataGrid :columns="columns" :data="projects" size="lg" bordered />
</template>`,
              angular: `<!-- reuses the AppComponent from above -->
<l-DataGrid [columns]="columns" [data]="projects" size="sm" bordered />
<l-DataGrid [columns]="columns" [data]="projects" size="lg" bordered />`,
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
            <DataGrid columns={BASIC_COLUMNS} data={PROJECTS} loading={loading} skeletonRows={4} bordered />
          </div>
          <CodeBlock
            variants={{
              react: `const [loading, setLoading] = useState(true);

<DataGrid columns={columns} data={rows} loading={loading} skeletonRows={4} bordered />

// e.g. setLoading(true); await fetchRows(); setLoading(false);`,
              js: `<l-DataGrid id="loading-grid" loading skeletonRows="4" bordered></l-DataGrid>

<script type="module">
  const el = document.getElementById("loading-grid");
  el.columns = columns;
  el.data = [];

  // Flip loading off once the data arrives.
  const rows = await fetchRows();
  el.data = rows;
  el.loading = false;
</script>`,
              vue: `<template>
  <l-DataGrid :columns="columns" :data="rows" :loading="loading" skeletonRows="4" bordered />
</template>

<script setup lang="ts">
import { ref } from "vue";
const loading = ref(true);
const rows = ref([]);
</script>`,
              angular: `<l-DataGrid [columns]="columns" [data]="rows" [loading]="loading" skeletonRows="4" bordered></l-DataGrid>

loading = true;
rows = [];`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Enter transitions via `transition` (with `transitionDuration` / `transitionDelay`) and hover effects via `hoverEffect`. They play on mount — reload the page, or use Replay in the playground.">Transitions</SectionLabel>
          <TransitionPreview cols={4}>
            <DataGrid columns={BASIC_COLUMNS} data={PROJECTS.slice(0, 2)} bordered transition="fade" />
            <DataGrid columns={BASIC_COLUMNS} data={PROJECTS.slice(0, 2)} bordered transition="slide-up" />
            <DataGrid columns={BASIC_COLUMNS} data={PROJECTS.slice(0, 2)} bordered transition="slide-right" transitionDelay={100} />
            <DataGrid columns={BASIC_COLUMNS} data={PROJECTS.slice(0, 2)} bordered transition="zoom" />
            <DataGrid columns={BASIC_COLUMNS} data={PROJECTS.slice(0, 2)} bordered transition="flip" />
            <DataGrid columns={BASIC_COLUMNS} data={PROJECTS.slice(0, 2)} bordered transition="blur" />
            <DataGrid columns={BASIC_COLUMNS} data={PROJECTS.slice(0, 2)} bordered transition="bounce" />
            <DataGrid columns={BASIC_COLUMNS} data={PROJECTS.slice(0, 2)} bordered transition="drop" transitionDuration={700} />
          </TransitionPreview>
          <Row>
            <DataGrid columns={BASIC_COLUMNS} data={PROJECTS.slice(0, 2)} bordered hoverEffect="lift" />
            <DataGrid columns={BASIC_COLUMNS} data={PROJECTS.slice(0, 2)} bordered hoverEffect="glow" />
            <DataGrid columns={BASIC_COLUMNS} data={PROJECTS.slice(0, 2)} bordered hoverEffect="shine" />
          </Row>
          <CodeBlock
            variants={{
              react: `<DataGrid columns={columns} data={projects} bordered transition="fade" />
<DataGrid columns={columns} data={projects} bordered transition="slide-up" />
<DataGrid columns={columns} data={projects} bordered transition="slide-right" transitionDelay={100} />
<DataGrid columns={columns} data={projects} bordered transition="zoom" />

<DataGrid columns={columns} data={projects} bordered transition="flip" />
<DataGrid columns={columns} data={projects} bordered transition="blur" />
<DataGrid columns={columns} data={projects} bordered transition="bounce" />
<DataGrid columns={columns} data={projects} bordered transition="drop" transitionDuration={700} />

<DataGrid columns={columns} data={projects} bordered hoverEffect="lift" />
<DataGrid columns={columns} data={projects} bordered hoverEffect="glow" />
<DataGrid columns={columns} data={projects} bordered hoverEffect="shine" />`,
              js: `<l-DataGrid bordered transition="fade"></l-DataGrid>
<l-DataGrid bordered transition="slide-up"></l-DataGrid>
<l-DataGrid bordered transition="slide-right" transitionDelay="100"></l-DataGrid>
<l-DataGrid bordered transition="zoom"></l-DataGrid>

<l-DataGrid bordered transition="flip"></l-DataGrid>
<l-DataGrid bordered transition="blur"></l-DataGrid>
<l-DataGrid bordered transition="bounce"></l-DataGrid>
<l-DataGrid bordered transition="drop" transitionDuration="700"></l-DataGrid>

<l-DataGrid bordered hoverEffect="lift"></l-DataGrid>
<l-DataGrid bordered hoverEffect="glow"></l-DataGrid>
<l-DataGrid bordered hoverEffect="shine"></l-DataGrid>

<script type="module">
  import "lojee-ui/elements";

  const columns = [
    { key: "name", header: "Name" },
    { key: "owner", header: "Owner" },
    { key: "tasks", header: "Tasks", align: "right" },
  ];
  const projects = [
    { name: "Website Redesign", owner: "Ava Chen", tasks: 12 },
    { name: "Mobile App", owner: "Marcus Lee", tasks: 7 },
  ];

  document.querySelectorAll("l-DataGrid").forEach((grid) => {
    grid.columns = columns;
    grid.data = projects;
  });
</script>`,
              vue: `<template>
  <l-DataGrid :columns="columns" :data="projects" bordered transition="fade"></l-DataGrid>
  <l-DataGrid :columns="columns" :data="projects" bordered transition="slide-up"></l-DataGrid>
  <l-DataGrid :columns="columns" :data="projects" bordered transition="slide-right" transitionDelay="100"></l-DataGrid>
  <l-DataGrid :columns="columns" :data="projects" bordered transition="zoom"></l-DataGrid>

  <l-DataGrid :columns="columns" :data="projects" bordered transition="flip"></l-DataGrid>
  <l-DataGrid :columns="columns" :data="projects" bordered transition="blur"></l-DataGrid>
  <l-DataGrid :columns="columns" :data="projects" bordered transition="bounce"></l-DataGrid>
  <l-DataGrid :columns="columns" :data="projects" bordered transition="drop" transitionDuration="700"></l-DataGrid>

  <l-DataGrid :columns="columns" :data="projects" bordered hoverEffect="lift"></l-DataGrid>
  <l-DataGrid :columns="columns" :data="projects" bordered hoverEffect="glow"></l-DataGrid>
  <l-DataGrid :columns="columns" :data="projects" bordered hoverEffect="shine"></l-DataGrid>
</template>

<script setup lang="ts">
import "lojee-ui/elements";
const columns = [
  { key: "name", header: "Name" },
  { key: "owner", header: "Owner" },
  { key: "tasks", header: "Tasks", align: "right" },
];

const projects = [
  { name: "Website Redesign", owner: "Ava Chen", tasks: 12 },
  { name: "Mobile App", owner: "Marcus Lee", tasks: 7 },
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
    <l-DataGrid [columns]="columns" [data]="projects" bordered transition="fade"></l-DataGrid>
    <l-DataGrid [columns]="columns" [data]="projects" bordered transition="slide-up"></l-DataGrid>
    <l-DataGrid [columns]="columns" [data]="projects" bordered transition="slide-right" transitionDelay="100"></l-DataGrid>
    <l-DataGrid [columns]="columns" [data]="projects" bordered transition="zoom"></l-DataGrid>

    <l-DataGrid [columns]="columns" [data]="projects" bordered transition="flip"></l-DataGrid>
    <l-DataGrid [columns]="columns" [data]="projects" bordered transition="blur"></l-DataGrid>
    <l-DataGrid [columns]="columns" [data]="projects" bordered transition="bounce"></l-DataGrid>
    <l-DataGrid [columns]="columns" [data]="projects" bordered transition="drop" transitionDuration="700"></l-DataGrid>

    <l-DataGrid [columns]="columns" [data]="projects" bordered hoverEffect="lift"></l-DataGrid>
    <l-DataGrid [columns]="columns" [data]="projects" bordered hoverEffect="glow"></l-DataGrid>
    <l-DataGrid [columns]="columns" [data]="projects" bordered hoverEffect="shine"></l-DataGrid>
  \`,
})
export class AppComponent {
  columns = [
    { key: "name", header: "Name" },
    { key: "owner", header: "Owner" },
    { key: "tasks", header: "Tasks", align: "right" },
  ];

  projects = [
    { name: "Website Redesign", owner: "Ava Chen", tasks: 12 },
    { name: "Mobile App", owner: "Marcus Lee", tasks: 7 },
  ];
}`,
            }}
          />
        </section>
      </div>
    </div>
  );
}
