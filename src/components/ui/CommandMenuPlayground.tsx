import { useState } from "react";
import { CommandMenu, type CommandMenuItem } from "./CommandMenu";
import { Button } from "./Buttons/Button";
import { PlaygroundLayout, AppWindowFrame, AppWindowBody } from "./PlaygroundHelpers";
import type { CodeBlockVariants } from "./CodeBlock";

const ITEMS: CommandMenuItem[] = [
  { label: "New file", icon: "file", shortcut: "⌘N" },
  { label: "Create project", icon: "plus", shortcut: "⌘P" },
  { label: "Search everywhere", icon: "search", shortcut: "⌘K" },
  { label: "Invite team members", icon: "users" },
  { label: "Share this page", icon: "share-2" },
  { label: "Open settings", icon: "settings", shortcut: "⌘," },
];

export default function CommandMenuPlayground() {
  const [open, setOpen] = useState(false);
  const [lastSelected, setLastSelected] = useState("None yet");

  const items: CommandMenuItem[] = ITEMS.map((item) => ({
    ...item,
    onSelect: () => setLastSelected(item.label),
  }));

  const preview = (
    <AppWindowFrame>
      <AppWindowBody>
        <div className="flex flex-col items-center gap-3">
          <Button label="Open command menu" onClick={() => setOpen(true)} />
          <p className="text-sm text-slate-600">
            Last selected: <span className="font-medium text-slate-900">{lastSelected}</span>
          </p>
          <CommandMenu open={open} onClose={() => setOpen(false)} items={items} />
        </div>
      </AppWindowBody>
    </AppWindowFrame>
  );

  const code = `const items: CommandMenuItem[] = [
  { label: "New file", icon: "file", shortcut: "⌘N", onSelect: () => {} },
  { label: "Create project", icon: "plus", shortcut: "⌘P", onSelect: () => {} },
  { label: "Search everywhere", icon: "search", shortcut: "⌘K", onSelect: () => {} },
  { label: "Invite team members", icon: "users", onSelect: () => {} },
  { label: "Share this page", icon: "share-2", onSelect: () => {} },
  { label: "Open settings", icon: "settings", shortcut: "⌘,", onSelect: () => {} },
];

<CommandMenu open={open} onClose={() => setOpen(false)} items={items} />`;

  // `items` is JSON-typed and, per the react code above, its `onSelect`
  // callbacks are just placeholder no-ops for display purposes — dropped
  // here too, since they can't be a string attribute at all and must be a
  // real DOM property assignment instead. `open` is controlled visibility,
  // so it's a DOM property/binding set from the trigger click (matches
  // ModalShowcase.tsx's pattern) rather than a baked literal.
  const itemsSnippet = ITEMS.map(
    (item) =>
      `  { label: "${item.label}", icon: "${item.icon}"${item.shortcut ? `, shortcut: "${item.shortcut}"` : ""} }`
  ).join(",\n");

  const htmlMarkup = `<l-Button label="Open command menu" id="open-command-btn" />
<l-CommandMenu id="command-menu" />`;

  const codeVariants: CodeBlockVariants = {
    react: code,
    js: `${htmlMarkup}

<script type="module">
  import "lojee-ui/elements";

  const commandMenu = document.getElementById("command-menu");
  commandMenu.items = [
${itemsSnippet}
  ];
  document.getElementById("open-command-btn")
    .addEventListener("click", () => { commandMenu.open = true; });
  commandMenu.addEventListener("close", () => { commandMenu.open = false; });
</script>`,
    vue: `<template>
  <l-Button label="Open command menu" @click="open = true" />
  <l-CommandMenu :open="open" :items="items" @close="open = false" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import "lojee-ui/elements";

const open = ref(false);
const items = ref([
${itemsSnippet}
]);
</script>`,
    angular: `<!-- app.component.html -->
<l-Button label="Open command menu" (click)="open = true" />
<l-CommandMenu [open]="open" [items]="items" (close)="open = false" />

<!-- app.component.ts -->
items = [
${itemsSnippet}
];`,
  };

  return (
    <PlaygroundLayout preview={preview} variants={codeVariants}>
      <div className="sm:col-span-2 text-sm text-slate-500">
        Try typing to filter, ArrowUp/ArrowDown to navigate, Enter to select, and Escape to close.
      </div>
    </PlaygroundLayout>
  );
}
