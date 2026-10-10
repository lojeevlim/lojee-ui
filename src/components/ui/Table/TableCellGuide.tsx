import { Avatar } from "../Avatar/Avatar";
import { Badge } from "../Badge/Badge";
import { Button } from "../Buttons/Button";
import { ProgressBar } from "../ProgressBar/ProgressBar";
import CodeBlock from "../CodeBlock";
import { SectionLabel } from "../ShowcaseHelpers";
import { Table, type TableColumn } from "./Table";

const CELL_TYPES = [
  { type: "text (default)", renders: "The value as plain text", value: '"Ava Chen" or 42' },
  { type: "user", renders: "Avatar with a name and a handle underneath", value: "{ name, handle?, avatar? }" },
  { type: "payment", renders: "Card logo and a masked number, with an optional info tooltip", value: '{ brand: "visa" | "mastercard", last4, note? }' },
  { type: "badges", renders: "Coloured tags in a row", value: "string[] or { label, color? }[]" },
  { type: "progress", renders: "A bar with its percentage", value: "a number from 0 to 100" },
  { type: "status", renders: "A coloured pill, chosen from the words if you give no colour", value: 'string or { label, color? }' },
  { type: "rating", renders: "Read-only stars, halves included", value: "a number, or { value, max? }" },
  { type: "image", renders: "A rounded thumbnail with a title and subtitle", value: "{ src?, title, subtitle? }" },
  { type: "link", renders: "A link in the theme accent", value: "a URL, or { href, label?, external? }" },
  { type: "avatars", renders: "Overlapping avatars with a +N count", value: "(string | { name, avatar? })[]" },
  { type: "currency", renders: "A formatted amount", value: "a number (USD), or { value, currency? }" },
  { type: "date", renders: "A short date such as Oct 2, 2026", value: "ISO string, timestamp or Date" },
  { type: "render (React)", renders: "Any component you return", value: "anything — render(row) gets the whole row" },
];

interface Member {
  id: string;
  name: string;
  initials: string;
  plan: string;
  color: "violet" | "cyan" | "emerald";
  usage: number;
}

const RENDER_DATA: Member[] = [
  { id: "noah", name: "Noah Kim", initials: "NK", plan: "Pro", color: "violet", usage: 72 },
  { id: "mia", name: "Mia Costa", initials: "MC", plan: "Free", color: "cyan", usage: 31 },
  { id: "omar", name: "Omar Haddad", initials: "OH", plan: "Team", color: "emerald", usage: 90 },
];

const RENDER_COLUMNS: TableColumn<Member>[] = [
  {
    key: "name",
    header: "Member",
    render: (row) => (
      <div className="flex items-center gap-3">
        <Avatar initials={row.initials} size="md" />
        <span className="font-semibold text-fg">{row.name}</span>
      </div>
    ),
  },
  { key: "plan", header: "Plan", render: (row) => <Badge variant="soft" color={row.color} label={row.plan} /> },
  { key: "usage", header: "Usage", render: (row) => <ProgressBar value={row.usage} /> },
  { key: "id", header: "", align: "right", render: () => <Button size="sm" variant="outline" label="Invite" /> },
];

// The same data the live examples show, written out as code — so the samples can be pasted and match the screen.
// One row per line, everything inside a row inline — compact enough to read and paste.
const inline = (v: unknown) =>
  JSON.stringify(v)
    .replace(/"(\w+)":/g, "$1: ")
    .replace(/,(?=\S)/g, ", ")
    .replace(/\{/g, "{ ")
    .replace(/\}/g, " }");
const jsLiteral = (rows: unknown[]) => `[\n${rows.map((r) => `  ${inline(r)},`).join("\n")}\n]`;
/** "Putting components in cells" — shown in the Table's API reference. */
export default function TableCellGuide() {
  return (
<section className="mt-10">
          <SectionLabel sub={'Two ways to put components in cells. For the common ones, set `type` on the column and put plain data in the row — it works in React and in the Web Components. For anything else in React, give the column a `render(row)` function that returns any component. (A Web Component can\'t take a function, so use the built-in types, or format the value in your data.)'}>
            Putting components in cells
          </SectionLabel>
          <div className="mb-4 overflow-x-auto rounded-xl border border-border">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="bg-surface-muted/70 text-xs uppercase tracking-wide text-fg-subtle">
                <tr>
                  <th className="px-4 py-2.5 font-semibold">Column type</th>
                  <th className="px-4 py-2.5 font-semibold">Renders</th>
                  <th className="px-4 py-2.5 font-semibold">Cell value (the data)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {CELL_TYPES.map((t) => (
                  <tr key={t.type} className="align-top">
                    <td className="whitespace-nowrap px-4 py-2.5 font-mono text-[13px] text-fg">{t.type}</td>
                    <td className="px-4 py-2.5 text-fg-muted">{t.renders}</td>
                    <td className="px-4 py-2.5 font-mono text-xs text-accent-600 dark:text-accent-400">{t.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mb-2 text-xs font-medium text-fg-subtle">A table that uses custom components through `render`:</p>
          <Table variant="lined" columns={RENDER_COLUMNS} data={RENDER_DATA} />
          <CodeBlock
            variants={{
              react: `import { Avatar, Badge, Button, ProgressBar, Table } from "lojee-ui";

const columns = [
  {
    key: "name",
    header: "Member",
    render: (row) => (
      <div className="flex items-center gap-3">
        <Avatar initials={row.initials} />
        <span className="font-semibold">{row.name}</span>
      </div>
    ),
  },
  { key: "plan", header: "Plan", render: (row) => <Badge variant="soft" color={row.color} label={row.plan} /> },
  { key: "usage", header: "Usage", render: (row) => <ProgressBar value={row.usage} /> },
  { key: "id", header: "", align: "right", render: (row) => <Button size="sm" variant="outline" label="Invite" onClick={() => invite(row.id)} /> },
];

const data = ${jsLiteral(RENDER_DATA)};

<Table variant="lined" columns={columns} data={data} />`,
              js: `<!-- A Web Component can't take a render function. Use the built-in column types: -->
<l-table id="members" variant="lined"></l-table>

<script type="module">
  import "lojee-ui/elements";

  const table = document.getElementById("members");
  table.columns = [
    { key: "user", header: "Member", type: "user" },
    { key: "plan", header: "Plan", type: "badges" },
    { key: "usage", header: "Usage", type: "progress" },
  ];
  table.data = [
    { user: { name: "Noah Kim", handle: "@noahkim" }, plan: [{ label: "Pro", color: "violet" }], usage: 72 },
    { user: { name: "Mia Costa", handle: "@miacosta" }, plan: [{ label: "Free", color: "cyan" }], usage: 31 },
  ];
</script>`,
              vue: `<template>
  <!-- Built-in column types work from a Web Component; a render function does not -->
  <l-table variant="lined" :columns="columns" :data="data"></l-table>
</template>

<script setup lang="ts">
import "lojee-ui/elements";

const columns = [
  { key: "user", header: "Member", type: "user" },
  { key: "plan", header: "Plan", type: "badges" },
  { key: "usage", header: "Usage", type: "progress" },
];
const data = [
  { user: { name: "Noah Kim", handle: "@noahkim" }, plan: [{ label: "Pro", color: "violet" }], usage: 72 },
  { user: { name: "Mia Costa", handle: "@miacosta" }, plan: [{ label: "Free", color: "cyan" }], usage: 31 },
];
</script>`,
              angular: `<!-- Built-in column types work from a Web Component; a render function does not -->
<l-table variant="lined" [columns]="columns" [data]="data"></l-table>

// component class
columns = [
  { key: "user", header: "Member", type: "user" },
  { key: "plan", header: "Plan", type: "badges" },
  { key: "usage", header: "Usage", type: "progress" },
];
data = [
  { user: { name: "Noah Kim", handle: "@noahkim" }, plan: [{ label: "Pro", color: "violet" }], usage: 72 },
  { user: { name: "Mia Costa", handle: "@miacosta" }, plan: [{ label: "Free", color: "cyan" }], usage: 31 },
];`,
            }}
          />
        </section>
  );
}
