import { useState } from "react";
import { List, type ListVariant } from "./List/List";
import { ListItem } from "./List/ListItem";
import { OptionGroup, PlaygroundLayout, AppWindowFrame, AppWindowBody } from "./PlaygroundHelpers";
import type { CodeBlockVariants } from "./CodeBlock";
import { useMotion } from "./playgroundMotion";

const VARIANTS: ListVariant[] = ["plain", "divided", "bordered"];

export default function ListPlayground() {
  const motion = useMotion({ hover: false });
  const [variant, setVariant] = useState<ListVariant>("divided");
  const [ordered, setOrdered] = useState(false);
  const [showHeader, setShowHeader] = useState(false);
  const [headerText, setHeaderText] = useState("Files");

  const preview = (
    <AppWindowFrame>
      <AppWindowBody>
        <div className="w-72">
          <List key={motion.replayKey} {...motion.props} variant={variant} ordered={ordered} header={showHeader ? headerText || "Files" : undefined}>
            <ListItem icon="file">Project brief.pdf</ListItem>
            <ListItem icon="image">Cover photo.png</ListItem>
            <ListItem icon="folder">Archive</ListItem>
          </List>
        </div>
      </AppWindowBody>
    </AppWindowFrame>
  );

  const headerAttr = showHeader ? ` header="${headerText || "Files"}"` : "";
  const code = `<List variant="${variant}"${headerAttr}${motion.attrs}${ordered ? " ordered" : ""} items={[
  { label: "Project brief.pdf", icon: "file" },
  { label: "Cover photo.png", icon: "image" },
  { label: "Archive", icon: "folder" },
]} />`;

  // Custom-element markup for the current configuration — identical across
  // Vue/Angular templates (plain attributes, no bindings needed for a static
  // snapshot); the "js" variant just adds the one-time module import a plain
  // HTML page needs to actually load the `<l-*>` definitions. Note the
  // explicit `ordered="true"` — r2wc's boolean parser needs a non-empty
  // value, so a bare attribute would silently parse to false.
  // Data-driven: the rows go in as `items` (a property in Vue / Angular, a JSON attribute in plain HTML), the title as `header`.
  const itemsLiteral = `[
  { label: "Project brief.pdf", icon: "file" },
  { label: "Cover photo.png", icon: "image" },
  { label: "Archive", icon: "folder" },
]`;
  const listAttrs = `variant="${variant}"${motion.attrs}${ordered ? ` ordered="true"` : ""}${showHeader ? ` header="${headerText || "Files"}"` : ""}`;
  const htmlMarkup = `<l-List ${listAttrs}></l-List>

<script type="module">
  document.querySelector("l-list").items = ${itemsLiteral.replace(/\n/g, "\n  ")};
</script>`;

  const codeVariants: CodeBlockVariants = {
    react: code,
    js: `${htmlMarkup.replace('<script type="module">', '<script type="module">\n  import "lojee-ui/elements";\n')}`,
    vue: `<template>
  <l-List ${listAttrs} :items.prop="items" />
</template>

<script setup lang="ts">
import "lojee-ui/elements";
const items = ${itemsLiteral};
</script>`,
    angular: `// list.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "lojee-ui/elements";

@Component({
  selector: "app-list",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`<l-List ${listAttrs} [items]="items"></l-List>\`,
})
export class ListComponent {
  items = ${itemsLiteral.replace(/\n/g, "\n  ")};
}`,
  };

  return (
    <PlaygroundLayout preview={preview} variants={codeVariants}>
      <OptionGroup label="Variant" options={VARIANTS} value={variant} onChange={setVariant} />

      <div>
        <span className="mb-1.5 block text-xs font-medium text-fg-subtle">Options</span>
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setOrdered((v) => !v)}
            className={
              "rounded-md px-2.5 py-1 text-xs font-medium transition-colors " +
              (ordered ? "bg-fg text-surface" : "bg-surface-muted text-fg-muted hover:bg-border")
            }
          >
            Ordered
          </button>
          <button
            type="button"
            onClick={() => setShowHeader((v) => !v)}
            className={
              "rounded-md px-2.5 py-1 text-xs font-medium transition-colors " +
              (showHeader ? "bg-fg text-surface" : "bg-surface-muted text-fg-muted hover:bg-border")
            }
          >
            Header
          </button>
        </div>
      </div>
      {showHeader && (
        <div>
          <span className="mb-1.5 block text-xs font-medium text-fg-subtle">Header text</span>
          <input
            value={headerText}
            onChange={(e) => setHeaderText(e.target.value)}
            className="w-full rounded-md border border-border px-3 py-1.5 text-sm text-fg outline-none transition-colors focus:border-border-strong"
          />
        </div>
      )}
      {motion.controls}
    </PlaygroundLayout>
  );
}
