import { useState } from "react";
import { DataGrid, type DataGridColumn, type DataGridSize } from "./DataGrid/DataGrid";
import { Badge } from "./Badge/Badge";
import { OptionGroup, PlaygroundLayout, AppWindowFrame, AppWindowBody } from "./PlaygroundHelpers";
import type { CodeBlockVariants } from "./CodeBlock";
import { useMotion } from "./playgroundMotion";

const ROW_COUNTS = ["3", "5", "8"] as const;

const SIZES: DataGridSize[] = ["sm", "md", "lg"];

interface Project {
  name: string;
  status: "active" | "paused" | "done";
  owner: string;
  tasks: number;
}

const STATUS_COLOR: Record<Project["status"], "emerald" | "amber" | "slate"> = {
  active: "emerald",
  paused: "amber",
  done: "slate",
};

const DATA: Project[] = [
  { name: "Website Redesign", status: "active", owner: "Ava Chen", tasks: 12 },
  { name: "Mobile App", status: "paused", owner: "Marcus Lee", tasks: 7 },
  { name: "API Migration", status: "active", owner: "Priya Nair", tasks: 21 },
];

export default function DataGridPlayground() {
  const [size, setSize] = useState<DataGridSize>("md");
  const [striped, setStriped] = useState(false);
  const [bordered, setBordered] = useState(true);
  const [sortable, setSortable] = useState(false);
  const [selectable, setSelectable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [skeletonRows, setSkeletonRows] = useState<(typeof ROW_COUNTS)[number]>("5");
  const [selectedCount, setSelectedCount] = useState(0);
  const motion = useMotion();

  const columns: DataGridColumn<Project>[] = [
    { key: "name", header: "Name", sortable },
    {
      key: "status",
      header: "Status",
      render: (row) => <Badge color={STATUS_COLOR[row.status]} label={row.status} />,
    },
    { key: "owner", header: "Owner" },
    { key: "tasks", header: "Tasks", align: "right", sortable },
  ];

  const preview = (
    <AppWindowFrame>
      <AppWindowBody className="items-stretch">
        <div>
          <DataGrid
            key={motion.replayKey}
            {...motion.props}
            columns={columns}
            data={DATA}
            size={size}
            striped={striped}
            bordered={bordered}
            selectable={selectable}
            loading={loading}
            skeletonRows={Number(skeletonRows)}
            onSelectionChange={(rows) => setSelectedCount(rows.length)}
          />
          {selectable && <p className="mt-2 text-sm text-fg-subtle">{selectedCount} selected</p>}
        </div>
      </AppWindowBody>
    </AppWindowFrame>
  );

  const sortableAttr = sortable ? ", sortable: true" : "";

  const columnsCode = `[
  { key: "name", header: "Name"${sortableAttr} },
  { key: "status", header: "Status", render: (row) => <Badge color={statusColor[row.status]} label={row.status} /> },
  { key: "owner", header: "Owner" },
  { key: "tasks", header: "Tasks", align: "right"${sortableAttr} },
]`;

  // Plain-string fallback for `render` in the non-React variants — a real
  // React element (the Badge above) can't cross into a Web Component
  // property, same precedent as Table's own showcase.
  const plainColumnsCode = `[
    { key: "name", header: "Name"${sortableAttr} },
    { key: "status", header: "Status" },
    { key: "owner", header: "Owner" },
    { key: "tasks", header: "Tasks", align: "right"${sortableAttr} },
  ]`;

  const attrs = `size="${size}"${striped ? " striped" : ""}${bordered ? " bordered" : ""}${selectable ? " selectable" : ""}${loading ? ` loading skeletonRows="${skeletonRows}"` : ""}${motion.attrs}`;

  const code = `const columns = ${columnsCode};

<DataGrid
  columns={columns}
  data={projects}
  size="${size}"${motion.attrs}${striped ? "\n  striped" : ""}${bordered ? "\n  bordered" : ""}${loading ? `\n  loading\n  skeletonRows={${skeletonRows}}` : ""}${
    selectable ? "\n  selectable\n  onSelectionChange={setSelected}" : ""
  }
/>`;

  const jsData = `  const columns = ${plainColumnsCode};
  const data = [
    { name: "Website Redesign", status: "active", owner: "Ava Chen", tasks: 12 },
    { name: "Mobile App", status: "paused", owner: "Marcus Lee", tasks: 7 },
    { name: "API Migration", status: "active", owner: "Priya Nair", tasks: 21 },
  ];`;

  const codeVariants: CodeBlockVariants = {
    react: code,
    js: `<l-DataGrid id="grid-demo" ${attrs}></l-DataGrid>

<script type="module">
  import "lojee-ui/elements";

${jsData}

  const el = document.getElementById("grid-demo");
  el.columns = columns;
  el.data = data;${selectable ? '\n  el.addEventListener("selectionchange", (e) => console.log(e.detail));' : ""}
</script>`,
    vue: `<template>
  <l-DataGrid :columns="columns" :data="data" ${attrs}${selectable ? ' @selectionchange="onSelectionChange"' : ""} />
</template>

<script setup lang="ts">
${jsData.trim()}
${selectable ? "\nfunction onSelectionChange(rows) {\n  console.log(rows);\n}" : ""}
</script>`,
    angular: `<l-DataGrid [columns]="columns" [data]="data" ${attrs}${
      selectable ? ' (selectionchange)="onSelectionChange($event)"' : ""
    } />

${jsData.trim()}`,
  };

  return (
    <PlaygroundLayout preview={preview} variants={codeVariants}>
      <OptionGroup label="Size" options={SIZES} value={size} onChange={setSize} />

      <div>
        <span className="mb-1.5 block text-xs font-medium text-fg-subtle">Options</span>
        <div className="flex flex-wrap gap-1.5">
          {[
            { label: "Striped", value: striped, set: setStriped },
            { label: "Bordered", value: bordered, set: setBordered },
            { label: "Sortable", value: sortable, set: setSortable },
            { label: "Selectable", value: selectable, set: setSelectable },
            { label: "Loading skeleton", value: loading, set: setLoading },
          ].map((opt) => (
            <button
              key={opt.label}
              type="button"
              onClick={() => opt.set((v) => !v)}
              className={
                "rounded-md px-2.5 py-1 text-xs font-medium transition-colors " +
                (opt.value ? "bg-fg text-surface" : "bg-surface-muted text-fg-muted hover:bg-border")
              }
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {loading && <OptionGroup label="Skeleton rows" options={ROW_COUNTS} value={skeletonRows} onChange={setSkeletonRows} />}
      {motion.controls}
    </PlaygroundLayout>
  );
}
