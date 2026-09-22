import { useState } from "react";
import { Table, type TableColumn, type TableSize } from "./Table/Table";
import { OptionGroup, PlaygroundLayout, AppWindowFrame, AppWindowBody } from "./PlaygroundHelpers";
import type { CodeBlockVariants } from "./CodeBlock";

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

export default function TablePlayground() {
  const [size, setSize] = useState<TableSize>("md");
  const [striped, setStriped] = useState(false);
  const [bordered, setBordered] = useState(false);

  const preview = (
    <AppWindowFrame>
      <AppWindowBody className="items-stretch">
        <Table columns={COLUMNS} data={DATA} size={size} striped={striped} bordered={bordered} />
      </AppWindowBody>
    </AppWindowFrame>
  );

  const code = `<Table
  columns={columns}
  data={data}
  size="${size}"${striped ? "\n  striped" : ""}${bordered ? "\n  bordered" : ""}
/>`;

  // `columns`/`data` are "json"-typed props with no native attribute form —
  // they must be assigned as real DOM properties (js) or bound (vue/angular)
  // rather than stringified into the tag. The literal values mirror COLUMNS
  // and DATA above exactly.
  const attrs = `size="${size}"${striped ? ` striped` : ""}${bordered ? ` bordered` : ""}`;

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

${jsData}

  const el = document.getElementById("people-table");
  el.columns = columns;
  el.data = data;
</script>`,
    vue: `<template>
  <l-Table :columns="columns" :data="data" ${attrs} />
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
];
</script>`,
    angular: `<l-Table [columns]="columns" [data]="data" ${attrs} />

columns = [
  { key: "name", header: "Name" },
  { key: "email", header: "Email" },
  { key: "role", header: "Role", align: "right" },
];
data = [
  { name: "Ava Chen", email: "ava@acme.com", role: "Admin" },
  { name: "Marcus Lee", email: "marcus@acme.com", role: "Editor" },
  { name: "Priya Nair", email: "priya@acme.com", role: "Viewer" },
];`,
  };

  return (
    <PlaygroundLayout preview={preview} variants={codeVariants}>
      <OptionGroup label="Size" options={SIZES} value={size} onChange={setSize} />

      <div>
        <span className="mb-1.5 block text-xs font-medium text-slate-500">Options</span>
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setStriped((v) => !v)}
            className={
              "rounded-md px-2.5 py-1 text-xs font-medium transition-colors " +
              (striped ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200")
            }
          >
            Striped
          </button>
          <button
            type="button"
            onClick={() => setBordered((v) => !v)}
            className={
              "rounded-md px-2.5 py-1 text-xs font-medium transition-colors " +
              (bordered ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200")
            }
          >
            Bordered
          </button>
        </div>
      </div>
    </PlaygroundLayout>
  );
}
