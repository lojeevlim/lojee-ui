import { useState } from "react";
import { CommandMenu, type CommandMenuItem } from "../CommandMenu";
import { Button } from "../../Buttons/Button";
import CodeBlock from "../../CodeBlock";
import { SectionLabel, Row } from "../../ShowcaseHelpers";

export default function CommandMenuShowcase() {
  const [open, setOpen] = useState(false);
  const [lastSelected, setLastSelected] = useState("None yet");

  const items: CommandMenuItem[] = [
    { label: "New file", icon: "file", shortcut: "⌘N", onSelect: () => setLastSelected("New file") },
    { label: "Create project", icon: "plus", shortcut: "⌘P", onSelect: () => setLastSelected("Create project") },
    { label: "Search everywhere", icon: "search", shortcut: "⌘K", onSelect: () => setLastSelected("Search everywhere") },
    { label: "Invite team members", icon: "users", onSelect: () => setLastSelected("Invite team members") },
    { label: "Share this page", icon: "share-2", onSelect: () => setLastSelected("Share this page") },
    { label: "Open settings", icon: "settings", shortcut: "⌘,", onSelect: () => setLastSelected("Open settings") },
    { label: "Star this repo", icon: "star", onSelect: () => setLastSelected("Star this repo") },
    { label: "Delete workspace", icon: "trash-2", disabled: true, onSelect: () => setLastSelected("Delete workspace") },
  ];

  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Command Menu</h1>
          <p className="text-sm text-slate-500 mt-1">
            A searchable, keyboard-navigable command palette overlay — the classic "Cmd+K" pattern.
          </p>
        </div>

        <section>
          <SectionLabel sub="Click the trigger, or note that in a real app this would typically be bound to a global Cmd+K shortcut.">
            Basic usage
          </SectionLabel>
          <Row>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="flex w-72 items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-500 shadow-sm transition-colors hover:border-slate-400"
            >
              <span className="flex-1 text-left">Search commands…</span>
              <span className="rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-xs text-slate-400">⌘K</span>
            </button>
            <Button variant="outline" label="Open command menu" onClick={() => setOpen(true)} />
          </Row>
          <p className="mt-3 text-sm text-slate-600">
            Last selected: <span className="font-medium text-slate-900">{lastSelected}</span>
          </p>

          <CommandMenu open={open} onClose={() => setOpen(false)} items={items} />

          <CodeBlock
            variants={{
              react: `const items: CommandMenuItem[] = [
  { label: "New file", icon: "file", shortcut: "⌘N", onSelect: () => {} },
  { label: "Create project", icon: "plus", shortcut: "⌘P", onSelect: () => {} },
  { label: "Search everywhere", icon: "search", shortcut: "⌘K", onSelect: () => {} },
  { label: "Invite team members", icon: "users", onSelect: () => {} },
  { label: "Share this page", icon: "share-2", onSelect: () => {} },
  { label: "Open settings", icon: "settings", shortcut: "⌘,", onSelect: () => {} },
  { label: "Star this repo", icon: "star", onSelect: () => {} },
  { label: "Delete workspace", icon: "trash-2", disabled: true, onSelect: () => {} },
];

<CommandMenu open={open} onClose={() => setOpen(false)} items={items} />`,
              js: `<button id="open-command-menu-btn">Search commands…</button>
<l-CommandMenu id="cmd-menu" />

<script type="module">
  import "lojee-ui/elements";

  const menu = document.getElementById("cmd-menu");
  menu.items = [
    { label: "New file", icon: "file", shortcut: "⌘N", onSelect: () => {} },
    { label: "Create project", icon: "plus", shortcut: "⌘P", onSelect: () => {} },
    { label: "Search everywhere", icon: "search", shortcut: "⌘K", onSelect: () => {} },
    { label: "Invite team members", icon: "users", onSelect: () => {} },
    { label: "Share this page", icon: "share-2", onSelect: () => {} },
    { label: "Open settings", icon: "settings", shortcut: "⌘,", onSelect: () => {} },
    { label: "Star this repo", icon: "star", onSelect: () => {} },
    { label: "Delete workspace", icon: "trash-2", disabled: true, onSelect: () => {} },
  ];

  document.getElementById("open-command-menu-btn")
    .addEventListener("click", () => { menu.open = true; });
  menu.addEventListener("close", () => { menu.open = false; });
</script>`,
              vue: `<template>
  <button @click="open = true">Search commands…</button>
  <l-CommandMenu :open="open" :items="items" @close="open = false" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import "lojee-ui/elements";

const open = ref(false);
const items = [
  { label: "New file", icon: "file", shortcut: "⌘N", onSelect: () => {} },
  { label: "Create project", icon: "plus", shortcut: "⌘P", onSelect: () => {} },
  { label: "Search everywhere", icon: "search", shortcut: "⌘K", onSelect: () => {} },
  { label: "Invite team members", icon: "users", onSelect: () => {} },
  { label: "Share this page", icon: "share-2", onSelect: () => {} },
  { label: "Open settings", icon: "settings", shortcut: "⌘,", onSelect: () => {} },
  { label: "Star this repo", icon: "star", onSelect: () => {} },
  { label: "Delete workspace", icon: "trash-2", disabled: true, onSelect: () => {} },
];
</script>`,
              angular: `// command-menu-showcase.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "lojee-ui/elements";

@Component({
  selector: "app-command-menu-showcase",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <button (click)="open = true">Search commands…</button>
    <l-CommandMenu [open]="open" [items]="items" (close)="open = false" />
  \`,
})
export class CommandMenuShowcaseComponent {
  open = false;
  items = [
    { label: "New file", icon: "file", shortcut: "⌘N", onSelect: () => {} },
    { label: "Create project", icon: "plus", shortcut: "⌘P", onSelect: () => {} },
    { label: "Search everywhere", icon: "search", shortcut: "⌘K", onSelect: () => {} },
    { label: "Invite team members", icon: "users", onSelect: () => {} },
    { label: "Share this page", icon: "share-2", onSelect: () => {} },
    { label: "Open settings", icon: "settings", shortcut: "⌘,", onSelect: () => {} },
    { label: "Star this repo", icon: "star", onSelect: () => {} },
    { label: "Delete workspace", icon: "trash-2", disabled: true, onSelect: () => {} },
  ];
}`,
            }}
          />
        </section>
      </div>
    </div>
  );
}
