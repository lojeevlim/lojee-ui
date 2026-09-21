import { DropdownMenu } from "../DropdownMenu";
import { DropdownMenuItem } from "../DropdownMenuItem";
import { Button } from "../../Buttons/Button";
import CodeBlock from "../../CodeBlock";
import { SectionLabel, Row } from "../../ShowcaseHelpers";

export default function DropdownMenuShowcase() {
  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Dropdown Menu</h1>
          <p className="text-sm text-slate-500 mt-1">
            A trigger-anchored menu of actions — closes on selection, outside click, or Escape.
          </p>
        </div>

        <section>
          <SectionLabel sub="DropdownMenuItem children — Delete is a danger item.">Basic menu</SectionLabel>
          <Row>
            <DropdownMenu trigger={<Button variant="outline" icon="more-horizontal" iconOnly label="Actions" />}>
              <DropdownMenuItem icon="pencil" onClick={() => alert("Edit")}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem icon="copy" onClick={() => alert("Duplicate")}>
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem icon="trash-2" danger onClick={() => alert("Delete")}>
                Delete
              </DropdownMenuItem>
            </DropdownMenu>
          </Row>
          <CodeBlock
            variants={{
              react: `<DropdownMenu trigger={<Button variant="outline" icon="more-horizontal" iconOnly label="Actions" />}>
  <DropdownMenuItem icon="pencil" onClick={() => edit()}>Edit</DropdownMenuItem>
  <DropdownMenuItem icon="copy" onClick={() => duplicate()}>Duplicate</DropdownMenuItem>
  <DropdownMenuItem icon="trash-2" danger onClick={() => remove()}>Delete</DropdownMenuItem>
</DropdownMenu>`,
              js: `<l-DropdownMenu id="actions-menu">
  <l-Button slot="trigger" variant="outline" icon="more-horizontal" iconOnly label="Actions" />
  <l-DropdownMenuItem icon="pencil" id="edit-item">Edit</l-DropdownMenuItem>
  <l-DropdownMenuItem icon="copy" id="duplicate-item">Duplicate</l-DropdownMenuItem>
  <l-DropdownMenuItem icon="trash-2" danger id="delete-item">Delete</l-DropdownMenuItem>
</l-DropdownMenu>

<script type="module">
  import "lojee-ui/elements";

  document.getElementById("edit-item").addEventListener("click", () => edit());
  document.getElementById("duplicate-item").addEventListener("click", () => duplicate());
  document.getElementById("delete-item").addEventListener("click", () => remove());
</script>`,
              vue: `<template>
  <l-DropdownMenu>
    <l-Button slot="trigger" variant="outline" icon="more-horizontal" iconOnly label="Actions" />
    <l-DropdownMenuItem icon="pencil" @click="edit">Edit</l-DropdownMenuItem>
    <l-DropdownMenuItem icon="copy" @click="duplicate">Duplicate</l-DropdownMenuItem>
    <l-DropdownMenuItem icon="trash-2" danger @click="remove">Delete</l-DropdownMenuItem>
  </l-DropdownMenu>
</template>

<script setup>
import "lojee-ui/elements";
</script>`,
              angular: `// dropdown-menu-showcase.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "lojee-ui/elements";

@Component({
  selector: "app-dropdown-menu-showcase",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <l-DropdownMenu>
      <l-Button slot="trigger" variant="outline" icon="more-horizontal" iconOnly label="Actions" />
      <l-DropdownMenuItem icon="pencil" (click)="edit()">Edit</l-DropdownMenuItem>
      <l-DropdownMenuItem icon="copy" (click)="duplicate()">Duplicate</l-DropdownMenuItem>
      <l-DropdownMenuItem icon="trash-2" danger (click)="remove()">Delete</l-DropdownMenuItem>
    </l-DropdownMenu>
  \`,
})
export class DropdownMenuShowcaseComponent {
  edit() { /* ... */ }
  duplicate() { /* ... */ }
  remove() { /* ... */ }
}`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Aligns the panel to the trailing edge of the trigger.">Align end</SectionLabel>
          <Row>
            <div className="flex w-full justify-end">
              <DropdownMenu align="end" trigger={<Button icon="chevron-down" label="Options" />}>
                <DropdownMenuItem icon="settings" onClick={() => alert("Settings")}>
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem icon="share-2" onClick={() => alert("Share")}>
                  Share
                </DropdownMenuItem>
                <DropdownMenuItem disabled>Archived</DropdownMenuItem>
              </DropdownMenu>
            </div>
          </Row>
          <CodeBlock
            variants={{
              react: `<DropdownMenu align="end" trigger={<Button icon="chevron-down" label="Options" />}>
  <DropdownMenuItem icon="settings" onClick={() => openSettings()}>Settings</DropdownMenuItem>
  <DropdownMenuItem icon="share-2" onClick={() => share()}>Share</DropdownMenuItem>
  <DropdownMenuItem disabled>Archived</DropdownMenuItem>
</DropdownMenu>`,
              js: `<l-DropdownMenu align="end">
  <l-Button slot="trigger" icon="chevron-down" label="Options" />
  <l-DropdownMenuItem icon="settings" id="settings-item">Settings</l-DropdownMenuItem>
  <l-DropdownMenuItem icon="share-2" id="share-item">Share</l-DropdownMenuItem>
  <l-DropdownMenuItem disabled>Archived</l-DropdownMenuItem>
</l-DropdownMenu>

<script type="module">
  document.getElementById("settings-item").addEventListener("click", () => openSettings());
  document.getElementById("share-item").addEventListener("click", () => share());
</script>`,
              vue: `<template>
  <l-DropdownMenu align="end">
    <l-Button slot="trigger" icon="chevron-down" label="Options" />
    <l-DropdownMenuItem icon="settings" @click="openSettings">Settings</l-DropdownMenuItem>
    <l-DropdownMenuItem icon="share-2" @click="share">Share</l-DropdownMenuItem>
    <l-DropdownMenuItem disabled>Archived</l-DropdownMenuItem>
  </l-DropdownMenu>
</template>`,
              angular: `<!-- reuses DropdownMenuShowcaseComponent from above -->
<l-DropdownMenu align="end">
  <l-Button slot="trigger" icon="chevron-down" label="Options" />
  <l-DropdownMenuItem icon="settings" (click)="openSettings()">Settings</l-DropdownMenuItem>
  <l-DropdownMenuItem icon="share-2" (click)="share()">Share</l-DropdownMenuItem>
  <l-DropdownMenuItem disabled>Archived</l-DropdownMenuItem>
</l-DropdownMenu>`,
            }}
          />
        </section>
      </div>
    </div>
  );
}
