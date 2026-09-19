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
              js: `<DropdownMenu id="actions-menu">
  <Button slot="trigger" variant="outline" icon="more-horizontal" icon-only="true" label="Actions" />
  <DropdownMenuItem icon="pencil" id="edit-item">Edit</DropdownMenuItem>
  <DropdownMenuItem icon="copy" id="duplicate-item">Duplicate</DropdownMenuItem>
  <DropdownMenuItem icon="trash-2" danger="true" id="delete-item">Delete</DropdownMenuItem>
</DropdownMenu>

<script type="module">
  import "lojee-ui/elements";

  document.getElementById("edit-item").addEventListener("click", () => edit());
  document.getElementById("duplicate-item").addEventListener("click", () => duplicate());
  document.getElementById("delete-item").addEventListener("click", () => remove());
</script>`,
              vue: `<template>
  <DropdownMenu>
    <Button slot="trigger" variant="outline" icon="more-horizontal" icon-only="true" label="Actions" />
    <DropdownMenuItem icon="pencil" @click="edit">Edit</DropdownMenuItem>
    <DropdownMenuItem icon="copy" @click="duplicate">Duplicate</DropdownMenuItem>
    <DropdownMenuItem icon="trash-2" danger="true" @click="remove">Delete</DropdownMenuItem>
  </DropdownMenu>
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
    <DropdownMenu>
      <Button slot="trigger" variant="outline" icon="more-horizontal" icon-only="true" label="Actions" />
      <DropdownMenuItem icon="pencil" (click)="edit()">Edit</DropdownMenuItem>
      <DropdownMenuItem icon="copy" (click)="duplicate()">Duplicate</DropdownMenuItem>
      <DropdownMenuItem icon="trash-2" danger="true" (click)="remove()">Delete</DropdownMenuItem>
    </DropdownMenu>
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
              js: `<DropdownMenu align="end">
  <Button slot="trigger" icon="chevron-down" label="Options" />
  <DropdownMenuItem icon="settings" id="settings-item">Settings</DropdownMenuItem>
  <DropdownMenuItem icon="share-2" id="share-item">Share</DropdownMenuItem>
  <DropdownMenuItem disabled="true">Archived</DropdownMenuItem>
</DropdownMenu>

<script type="module">
  document.getElementById("settings-item").addEventListener("click", () => openSettings());
  document.getElementById("share-item").addEventListener("click", () => share());
</script>`,
              vue: `<template>
  <DropdownMenu align="end">
    <Button slot="trigger" icon="chevron-down" label="Options" />
    <DropdownMenuItem icon="settings" @click="openSettings">Settings</DropdownMenuItem>
    <DropdownMenuItem icon="share-2" @click="share">Share</DropdownMenuItem>
    <DropdownMenuItem disabled="true">Archived</DropdownMenuItem>
  </DropdownMenu>
</template>`,
              angular: `<!-- reuses DropdownMenuShowcaseComponent from above -->
<DropdownMenu align="end">
  <Button slot="trigger" icon="chevron-down" label="Options" />
  <DropdownMenuItem icon="settings" (click)="openSettings()">Settings</DropdownMenuItem>
  <DropdownMenuItem icon="share-2" (click)="share()">Share</DropdownMenuItem>
  <DropdownMenuItem disabled="true">Archived</DropdownMenuItem>
</DropdownMenu>`,
            }}
          />
        </section>
      </div>
    </div>
  );
}
