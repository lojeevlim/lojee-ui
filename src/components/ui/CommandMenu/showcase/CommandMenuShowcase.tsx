import { useState } from "react";
import { CommandMenu, type CommandMenuItem } from "../CommandMenu";
import { Button } from "../../Buttons/Button";
import CodeBlock from "../../CodeBlock";
import { SectionLabel, Row } from "../../ShowcaseHelpers";
import type { TransitionVariant } from "../../../../core/motion";

const TR_OPTIONS: { label: string; transition: TransitionVariant; duration?: number; delay?: number }[] = [
  { label: "Fade", transition: "fade" },
  { label: "Slide up", transition: "slide-up" },
  { label: "Zoom", transition: "zoom" },
  { label: "Flip", transition: "flip" },
  { label: "Blur", transition: "blur" },
  { label: "Bounce", transition: "bounce" },
  { label: "Drop (slow)", transition: "drop", duration: 700 },
  { label: "Zoom (delayed)", transition: "zoom", delay: 200 },
];

export default function CommandMenuShowcase() {
  const [trOpen, setTrOpen] = useState(false);
  const [trOption, setTrOption] = useState(TR_OPTIONS[2]);
  const trReact = `transition="${trOption.transition}"${trOption.duration ? ` transitionDuration={${trOption.duration}}` : ""}${trOption.delay ? ` transitionDelay={${trOption.delay}}` : ""}`;
  const trHtml = `transition="${trOption.transition}"${trOption.duration ? ` transitionDuration="${trOption.duration}"` : ""}${trOption.delay ? ` transitionDelay="${trOption.delay}"` : ""}`;
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
    <div>
      <div className="space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-fg">Command Menu</h1>
          <p className="text-sm text-fg-subtle mt-1">
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
              className="flex w-72 items-center gap-2 rounded-lg border border-border-strong bg-surface px-3 py-2 text-sm text-fg-subtle shadow-sm transition-colors hover:border-border-strong"
            >
              <span className="flex-1 text-left">Search commands…</span>
              <span className="rounded border border-border bg-surface-muted px-1.5 py-0.5 text-xs text-fg-subtle">⌘K</span>
            </button>
            <Button variant="outline" label="Open command menu" onClick={() => setOpen(true)} />
          </Row>
          <p className="mt-3 text-sm text-fg-muted">
            Last selected: <span className="font-medium text-fg">{lastSelected}</span>
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
<l-CommandMenu id="cmd-menu"></l-CommandMenu>

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

        <section>
          <SectionLabel sub="Enter/exit transitions via `transition` (with `transitionDuration` / `transitionDelay`) — pick one, then close the overlay to see it play in reverse.">Transitions</SectionLabel>
          <Row>
            {TR_OPTIONS.map((o) => (
              <Button
                key={o.label}
                variant="outline"
                label={o.label}
                onClick={() => {
                  setTrOption(o);
                  setTrOpen(true);
                }}
              />
            ))}
          </Row>
          <CommandMenu
            open={trOpen}
            onClose={() => setTrOpen(false)}
            items={items}
            transition={trOption.transition}
            transitionDuration={trOption.duration}
            transitionDelay={trOption.delay}
          />
          <CodeBlock
            variants={{
              react: `const [open, setOpen] = useState(false);
const items: CommandMenuItem[] = [
  { label: "New file", icon: "file", shortcut: "⌘N" },
  { label: "Create project", icon: "plus", shortcut: "⌘P" },
  { label: "Open settings", icon: "settings", shortcut: "⌘," }
];

<Button label="Open command menu" onClick={() => setOpen(true)} />
<CommandMenu open={open} onClose={() => setOpen(false)} items={items} ${trReact} />`,
              js: `<l-Button label="Open command menu" id="open-tr-btn"></l-Button>
<l-CommandMenu id="tr-overlay" ${trHtml}></l-CommandMenu>

<script type="module">
  import "lojee-ui/elements";

  const overlay = document.getElementById("tr-overlay");
  overlay.items = [
    { label: "New file", icon: "file", shortcut: "⌘N" },
    { label: "Create project", icon: "plus", shortcut: "⌘P" },
    { label: "Open settings", icon: "settings", shortcut: "⌘," }
  ];
  document.getElementById("open-tr-btn")
    .addEventListener("click", () => { overlay.open = true; });
  overlay.addEventListener("close", () => { overlay.open = false; });
</script>`,
              vue: `<template>
  <l-Button label="Open command menu" @click="open = true"></l-Button>
  <l-CommandMenu :open="open" :items="items" ${trHtml} @close="open = false"></l-CommandMenu>
</template>

<script setup lang="ts">
import { ref } from "vue";
import "lojee-ui/elements";

const open = ref(false);
const items = ref([
  { label: "New file", icon: "file", shortcut: "⌘N" },
  { label: "Create project", icon: "plus", shortcut: "⌘P" },
  { label: "Open settings", icon: "settings", shortcut: "⌘," }
]);
</script>`,
              angular: `// app.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "lojee-ui/elements";

@Component({
  selector: "app-root",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <l-Button label="Open command menu" (click)="open = true"></l-Button>
    <l-CommandMenu [open]="open" [items]="items" ${trHtml} (close)="open = false"></l-CommandMenu>
  \`,
})
export class AppComponent {
  open = false;
  items = [
    { label: "New file", icon: "file", shortcut: "⌘N" },
    { label: "Create project", icon: "plus", shortcut: "⌘P" },
    { label: "Open settings", icon: "settings", shortcut: "⌘," }
  ];
}`,
            }}
          />
        </section>
      </div>
    </div>
  );
}
