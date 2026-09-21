import { ContextMenu } from "../ContextMenu";
import { DropdownMenuItem } from "../../DropdownMenu/DropdownMenuItem";
import CodeBlock from "../../CodeBlock";
import { SectionLabel, Row } from "../../ShowcaseHelpers";

export default function ContextMenuShowcase() {
  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Context Menu</h1>
          <p className="text-sm text-slate-500 mt-1">
            Right-click anywhere on the target area to open a menu at the cursor — closes on
            selection, outside click, or Escape.
          </p>
        </div>

        <section>
          <SectionLabel sub="Right-click the box below.">Basic usage</SectionLabel>
          <Row>
            <ContextMenu
              menu={
                <>
                  <DropdownMenuItem icon="copy" onClick={() => alert("Copy")}>
                    Copy
                  </DropdownMenuItem>
                  <DropdownMenuItem icon="pencil" onClick={() => alert("Rename")}>
                    Rename
                  </DropdownMenuItem>
                  <DropdownMenuItem icon="trash-2" danger onClick={() => alert("Delete")}>
                    Delete
                  </DropdownMenuItem>
                </>
              }
            >
              <div className="flex h-40 w-96 items-center justify-center rounded-lg border-2 border-dashed border-slate-200 text-sm text-slate-400">
                Right-click here
              </div>
            </ContextMenu>
          </Row>
          <CodeBlock
            variants={{
              react: `<ContextMenu
  menu={
    <>
      <DropdownMenuItem icon="copy" onClick={() => copy()}>Copy</DropdownMenuItem>
      <DropdownMenuItem icon="pencil" onClick={() => rename()}>Rename</DropdownMenuItem>
      <DropdownMenuItem icon="trash-2" danger onClick={() => remove()}>Delete</DropdownMenuItem>
    </>
  }
>
  <div>Right-click here</div>
</ContextMenu>`,
              js: `<l-ContextMenu>
  <div slot="menu">
    <l-DropdownMenuItem icon="copy" id="copy-item">Copy</l-DropdownMenuItem>
    <l-DropdownMenuItem icon="pencil" id="rename-item">Rename</l-DropdownMenuItem>
    <l-DropdownMenuItem icon="trash-2" danger id="delete-item">Delete</l-DropdownMenuItem>
  </div>
  <div>Right-click here</div>
</l-ContextMenu>

<script type="module">
  import "lojee-ui/elements";

  document.getElementById("copy-item").addEventListener("click", () => copy());
  document.getElementById("rename-item").addEventListener("click", () => rename());
  document.getElementById("delete-item").addEventListener("click", () => remove());
</script>`,
              vue: `<template>
  <l-ContextMenu>
    <div slot="menu">
      <l-DropdownMenuItem icon="copy" @click="copy">Copy</l-DropdownMenuItem>
      <l-DropdownMenuItem icon="pencil" @click="rename">Rename</l-DropdownMenuItem>
      <l-DropdownMenuItem icon="trash-2" danger @click="remove">Delete</l-DropdownMenuItem>
    </div>
    <div>Right-click here</div>
  </l-ContextMenu>
</template>

<script setup>
import "lojee-ui/elements";
</script>`,
              angular: `// context-menu-showcase.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "lojee-ui/elements";

@Component({
  selector: "app-context-menu-showcase",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <l-ContextMenu>
      <div slot="menu">
        <l-DropdownMenuItem icon="copy" (click)="copy()">Copy</l-DropdownMenuItem>
        <l-DropdownMenuItem icon="pencil" (click)="rename()">Rename</l-DropdownMenuItem>
        <l-DropdownMenuItem icon="trash-2" danger (click)="remove()">Delete</l-DropdownMenuItem>
      </div>
      <div>Right-click here</div>
    </l-ContextMenu>
  \`,
})
export class ContextMenuShowcaseComponent {
  copy() { /* ... */ }
  rename() { /* ... */ }
  remove() { /* ... */ }
}`,
            }}
          />
        </section>
      </div>
    </div>
  );
}
