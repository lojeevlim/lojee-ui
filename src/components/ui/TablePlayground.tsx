import { useState } from "react";
import { Table, type TableColumn, type TableSize, type TableAction } from "./Table/Table";
import { OptionGroup, PlaygroundLayout, AppWindowFrame, AppWindowBody } from "./PlaygroundHelpers";
import type { CodeBlockVariants } from "./CodeBlock";
import { useMotion } from "./playgroundMotion";

const SIZES: TableSize[] = ["sm", "md", "lg"];

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
  const [striped, setStriped] = useState(false);
  const [bordered, setBordered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [skeletonRows, setSkeletonRows] = useState<(typeof ROW_COUNTS)[number]>("5");
  const [rowActions, setRowActions] = useState(false);
  const [builtIn, setBuiltIn] = useState(true);

  const preview = (
    <AppWindowFrame>
      <AppWindowBody className="items-stretch">
        <Table key={motion.replayKey} {...motion.props} columns={COLUMNS} data={DATA} size={size} striped={striped} bordered={bordered}
          loading={loading}
          skeletonRows={Number(skeletonRows)}
          actions={rowActions ? ACTIONS : undefined}
          builtInActions={builtIn}
        />
      </AppWindowBody>
    </AppWindowFrame>
  );

  const code = `<Table
  columns={columns}
  data={data}
  size="${size}"${motion.attrs}${striped ? "\n  striped" : ""}${bordered ? "\n  bordered" : ""}${loading ? `\n  loading\n  skeletonRows={${skeletonRows}}` : ""}${
    rowActions ? `\n  actions={actions}${builtIn ? "" : "\n  builtInActions={false}"}\n  onAction={(action, row) => console.log(action.value, row)}` : ""
  }
/>`;

  // `columns`/`data` are "json"-typed props with no native attribute form —
  // they must be assigned as real DOM properties (js) or bound (vue/angular)
  // rather than stringified into the tag. The literal values mirror COLUMNS
  // and DATA above exactly.
  const attrs = `size="${size}"${motion.attrs}${striped ? ` striped` : ""}${bordered ? ` bordered` : ""}${loading ? ` loading skeletonRows="${skeletonRows}"` : ""}${rowActions && !builtIn ? ` builtInActions="false"` : ""}`;

  const actionsData = `  const actions = ${ACTIONS_JSON};`;

  const jsData = `  const columns = [
    { key: "name", header: "Name" },
    { key: "email", header: "Email" },
    { key: "role", header: "Role", align: "right" },
  ];
  const data = [
    { name: "Ava Chen", email: "ava@acme.com", role: "Admin" },
    { name: "Marcus Lee", email: "marcus@acme.com", role: "Editor" },
    { name: "Priya Nair", email: "priya@acme.com", role: "Viewer" },
  ];`;

  const codeVariants: CodeBlockVariants = {
    react: code,
    js: `<l-Table id="people-table" ${attrs} />

<script type="module">
  import "lojee-ui/elements";

${jsData}${rowActions ? `\n${actionsData}` : ""}

  const el = document.getElementById("people-table");
  el.columns = columns;
  el.data = data;${rowActions ? `\n  el.actions = actions;\n  el.addEventListener("action", (e) => console.log(e.detail.action, e.detail.row));` : ""}
</script>`,
    vue: `<template>
  <l-Table :columns="columns" :data="data" ${attrs}${rowActions ? ' :actions="actions" @action="onAction"' : ""} />
</template>

<script setup lang="ts">
const columns = [
  { key: "name", header: "Name" },
  { key: "email", header: "Email" },
  { key: "role", header: "Role", align: "right" },
];
const data = [
  { name: "Ava Chen", email: "ava@acme.com", role: "Admin" },
  { name: "Marcus Lee", email: "marcus@acme.com", role: "Editor" },
  { name: "Priya Nair", email: "priya@acme.com", role: "Viewer" },
];${rowActions ? `\nconst actions = ${ACTIONS_JSON};\n\nfunction onAction(e) {\n  console.log(e.detail.action, e.detail.row);\n}` : ""}
</script>`,
    angular: `<l-Table [columns]="columns" [data]="data" ${attrs}${rowActions ? ' [actions]="actions" (action)="onAction($event)"' : ""} />

columns = [
  { key: "name", header: "Name" },
  { key: "email", header: "Email" },
  { key: "role", header: "Role", align: "right" },
];
data = [
  { name: "Ava Chen", email: "ava@acme.com", role: "Admin" },
  { name: "Marcus Lee", email: "marcus@acme.com", role: "Editor" },
  { name: "Priya Nair", email: "priya@acme.com", role: "Viewer" },
];${rowActions ? `\nactions = ${ACTIONS_JSON};\n\nonAction(e) {\n  console.log(e.detail.action, e.detail.row);\n}` : ""}`,
  };

  return (
    <PlaygroundLayout preview={preview} variants={codeVariants}>
      <OptionGroup label="Size" options={SIZES} value={size} onChange={setSize} />

      <div>
        <span className="mb-1.5 block text-xs font-medium text-fg-subtle">Options</span>
        <div className="flex flex-wrap gap-1.5">
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
      {loading && <OptionGroup label="Skeleton rows" options={ROW_COUNTS} value={skeletonRows} onChange={setSkeletonRows} />}
      {motion.controls}
    </PlaygroundLayout>
  );
}
