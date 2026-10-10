import { DropdownMenu } from "../DropdownMenu";
import { DropdownMenuItem } from "../DropdownMenuItem";
import { Button } from "../../Buttons/Button";
import CodeBlock from "../../CodeBlock";
import { SectionLabel, Row } from "../../ShowcaseHelpers";

export default function DropdownMenuShowcase() {
  return (
    <div>
      <div className="space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-fg">Dropdown Menu</h1>
          <p className="text-sm text-fg-subtle mt-1">
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
              js: `<l-dropdown-menu id="actions-menu">
  <l-button slot="trigger" variant="outline" icon="more-horizontal" iconOnly label="Actions"></l-button>
  <l-dropdown-menu-item icon="pencil" id="edit-item">Edit</l-dropdown-menu-item>
  <l-dropdown-menu-item icon="copy" id="duplicate-item">Duplicate</l-dropdown-menu-item>
  <l-dropdown-menu-item icon="trash-2" danger id="delete-item">Delete</l-dropdown-menu-item>
</l-dropdown-menu>

<script type="module">
  import "lojee-ui/elements";

  document.getElementById("edit-item").addEventListener("click", () => edit());
  document.getElementById("duplicate-item").addEventListener("click", () => duplicate());
  document.getElementById("delete-item").addEventListener("click", () => remove());
</script>`,
              vue: `<template>
  <l-dropdown-menu>
    <l-button slot="trigger" variant="outline" icon="more-horizontal" iconOnly label="Actions" />
    <l-dropdown-menu-item icon="pencil" @click="edit">Edit</l-dropdown-menu-item>
    <l-dropdown-menu-item icon="copy" @click="duplicate">Duplicate</l-dropdown-menu-item>
    <l-dropdown-menu-item icon="trash-2" danger @click="remove">Delete</l-dropdown-menu-item>
  </l-dropdown-menu>
</template>

<script setup lang="ts">
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
    <l-dropdown-menu>
      <l-button slot="trigger" variant="outline" icon="more-horizontal" iconOnly label="Actions" />
      <l-dropdown-menu-item icon="pencil" (click)="edit()">Edit</l-dropdown-menu-item>
      <l-dropdown-menu-item icon="copy" (click)="duplicate()">Duplicate</l-dropdown-menu-item>
      <l-dropdown-menu-item icon="trash-2" danger (click)="remove()">Delete</l-dropdown-menu-item>
    </l-dropdown-menu>
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
              js: `<l-dropdown-menu align="end">
  <l-button slot="trigger" icon="chevron-down" label="Options"></l-button>
  <l-dropdown-menu-item icon="settings" id="settings-item">Settings</l-dropdown-menu-item>
  <l-dropdown-menu-item icon="share-2" id="share-item">Share</l-dropdown-menu-item>
  <l-dropdown-menu-item disabled>Archived</l-dropdown-menu-item>
</l-dropdown-menu>

<script type="module">
  document.getElementById("settings-item").addEventListener("click", () => openSettings());
  document.getElementById("share-item").addEventListener("click", () => share());
</script>`,
              vue: `<template>
  <l-dropdown-menu align="end">
    <l-button slot="trigger" icon="chevron-down" label="Options" />
    <l-dropdown-menu-item icon="settings" @click="openSettings">Settings</l-dropdown-menu-item>
    <l-dropdown-menu-item icon="share-2" @click="share">Share</l-dropdown-menu-item>
    <l-dropdown-menu-item disabled>Archived</l-dropdown-menu-item>
  </l-dropdown-menu>
</template>`,
              angular: `<!-- reuses DropdownMenuShowcaseComponent from above -->
<l-dropdown-menu align="end">
  <l-button slot="trigger" icon="chevron-down" label="Options" />
  <l-dropdown-menu-item icon="settings" (click)="openSettings()">Settings</l-dropdown-menu-item>
  <l-dropdown-menu-item icon="share-2" (click)="share()">Share</l-dropdown-menu-item>
  <l-dropdown-menu-item disabled>Archived</l-dropdown-menu-item>
</l-dropdown-menu>`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Enter/exit transitions via `transition` (with `transitionDuration` / `transitionDelay`) — open and close each one to see it play both ways.">Transitions</SectionLabel>
          <Row>
            <DropdownMenu transition="fade" trigger={<Button variant="outline" icon="chevron-down" label="Fade" />}>
              <DropdownMenuItem icon="pencil">Edit</DropdownMenuItem>
              <DropdownMenuItem icon="copy">Duplicate</DropdownMenuItem>
            </DropdownMenu>
            <DropdownMenu transition="slide-up" trigger={<Button variant="outline" icon="chevron-down" label="Slide up" />}>
              <DropdownMenuItem icon="pencil">Edit</DropdownMenuItem>
              <DropdownMenuItem icon="copy">Duplicate</DropdownMenuItem>
            </DropdownMenu>
            <DropdownMenu transition="zoom" transitionDelay={100} trigger={<Button variant="outline" icon="chevron-down" label="Zoom" />}>
              <DropdownMenuItem icon="pencil">Edit</DropdownMenuItem>
              <DropdownMenuItem icon="copy">Duplicate</DropdownMenuItem>
            </DropdownMenu>
            <DropdownMenu transition="flip" trigger={<Button variant="outline" icon="chevron-down" label="Flip" />}>
              <DropdownMenuItem icon="pencil">Edit</DropdownMenuItem>
              <DropdownMenuItem icon="copy">Duplicate</DropdownMenuItem>
            </DropdownMenu>
            <DropdownMenu transition="blur" trigger={<Button variant="outline" icon="chevron-down" label="Blur" />}>
              <DropdownMenuItem icon="pencil">Edit</DropdownMenuItem>
              <DropdownMenuItem icon="copy">Duplicate</DropdownMenuItem>
            </DropdownMenu>
            <DropdownMenu transition="drop" transitionDuration={700} trigger={<Button variant="outline" icon="chevron-down" label="Drop" />}>
              <DropdownMenuItem icon="pencil">Edit</DropdownMenuItem>
              <DropdownMenuItem icon="copy">Duplicate</DropdownMenuItem>
            </DropdownMenu>
          </Row>
          <CodeBlock
            variants={{
              react: `<DropdownMenu transition="fade" trigger={<Button variant="outline" icon="chevron-down" label="Fade" />}>
  <DropdownMenuItem icon="pencil">Edit</DropdownMenuItem>
  <DropdownMenuItem icon="copy">Duplicate</DropdownMenuItem>
</DropdownMenu>

<DropdownMenu transition="slide-up" trigger={<Button variant="outline" icon="chevron-down" label="Slide up" />}>
  <DropdownMenuItem icon="pencil">Edit</DropdownMenuItem>
  <DropdownMenuItem icon="copy">Duplicate</DropdownMenuItem>
</DropdownMenu>

<DropdownMenu transition="zoom" transitionDelay={100} trigger={<Button variant="outline" icon="chevron-down" label="Zoom" />}>
  <DropdownMenuItem icon="pencil">Edit</DropdownMenuItem>
  <DropdownMenuItem icon="copy">Duplicate</DropdownMenuItem>
</DropdownMenu>

<DropdownMenu transition="flip" trigger={<Button variant="outline" icon="chevron-down" label="Flip" />}>
  <DropdownMenuItem icon="pencil">Edit</DropdownMenuItem>
  <DropdownMenuItem icon="copy">Duplicate</DropdownMenuItem>
</DropdownMenu>

<DropdownMenu transition="blur" trigger={<Button variant="outline" icon="chevron-down" label="Blur" />}>
  <DropdownMenuItem icon="pencil">Edit</DropdownMenuItem>
  <DropdownMenuItem icon="copy">Duplicate</DropdownMenuItem>
</DropdownMenu>

<DropdownMenu transition="drop" transitionDuration={700} trigger={<Button variant="outline" icon="chevron-down" label="Drop" />}>
  <DropdownMenuItem icon="pencil">Edit</DropdownMenuItem>
  <DropdownMenuItem icon="copy">Duplicate</DropdownMenuItem>
</DropdownMenu>`,
              js: `<l-dropdown-menu transition="fade">
  <l-button slot="trigger" variant="outline" icon="chevron-down" label="Fade"></l-button>
  <l-dropdown-menu-item icon="pencil">Edit</l-dropdown-menu-item>
  <l-dropdown-menu-item icon="copy">Duplicate</l-dropdown-menu-item>
</l-dropdown-menu>

<l-dropdown-menu transition="slide-up">
  <l-button slot="trigger" variant="outline" icon="chevron-down" label="Slide up"></l-button>
  <l-dropdown-menu-item icon="pencil">Edit</l-dropdown-menu-item>
  <l-dropdown-menu-item icon="copy">Duplicate</l-dropdown-menu-item>
</l-dropdown-menu>

<l-dropdown-menu transition="zoom" transitionDelay="100">
  <l-button slot="trigger" variant="outline" icon="chevron-down" label="Zoom"></l-button>
  <l-dropdown-menu-item icon="pencil">Edit</l-dropdown-menu-item>
  <l-dropdown-menu-item icon="copy">Duplicate</l-dropdown-menu-item>
</l-dropdown-menu>

<l-dropdown-menu transition="flip">
  <l-button slot="trigger" variant="outline" icon="chevron-down" label="Flip"></l-button>
  <l-dropdown-menu-item icon="pencil">Edit</l-dropdown-menu-item>
  <l-dropdown-menu-item icon="copy">Duplicate</l-dropdown-menu-item>
</l-dropdown-menu>

<l-dropdown-menu transition="blur">
  <l-button slot="trigger" variant="outline" icon="chevron-down" label="Blur"></l-button>
  <l-dropdown-menu-item icon="pencil">Edit</l-dropdown-menu-item>
  <l-dropdown-menu-item icon="copy">Duplicate</l-dropdown-menu-item>
</l-dropdown-menu>

<l-dropdown-menu transition="drop" transitionDuration="700">
  <l-button slot="trigger" variant="outline" icon="chevron-down" label="Drop"></l-button>
  <l-dropdown-menu-item icon="pencil">Edit</l-dropdown-menu-item>
  <l-dropdown-menu-item icon="copy">Duplicate</l-dropdown-menu-item>
</l-dropdown-menu>

<script type="module">
  import "lojee-ui/elements";
</script>`,
              vue: `<template>
  <l-dropdown-menu transition="fade">
    <l-button slot="trigger" variant="outline" icon="chevron-down" label="Fade"></l-button>
    <l-dropdown-menu-item icon="pencil">Edit</l-dropdown-menu-item>
    <l-dropdown-menu-item icon="copy">Duplicate</l-dropdown-menu-item>
  </l-dropdown-menu>

  <l-dropdown-menu transition="slide-up">
    <l-button slot="trigger" variant="outline" icon="chevron-down" label="Slide up"></l-button>
    <l-dropdown-menu-item icon="pencil">Edit</l-dropdown-menu-item>
    <l-dropdown-menu-item icon="copy">Duplicate</l-dropdown-menu-item>
  </l-dropdown-menu>

  <l-dropdown-menu transition="zoom" transitionDelay="100">
    <l-button slot="trigger" variant="outline" icon="chevron-down" label="Zoom"></l-button>
    <l-dropdown-menu-item icon="pencil">Edit</l-dropdown-menu-item>
    <l-dropdown-menu-item icon="copy">Duplicate</l-dropdown-menu-item>
  </l-dropdown-menu>

  <l-dropdown-menu transition="flip">
    <l-button slot="trigger" variant="outline" icon="chevron-down" label="Flip"></l-button>
    <l-dropdown-menu-item icon="pencil">Edit</l-dropdown-menu-item>
    <l-dropdown-menu-item icon="copy">Duplicate</l-dropdown-menu-item>
  </l-dropdown-menu>

  <l-dropdown-menu transition="blur">
    <l-button slot="trigger" variant="outline" icon="chevron-down" label="Blur"></l-button>
    <l-dropdown-menu-item icon="pencil">Edit</l-dropdown-menu-item>
    <l-dropdown-menu-item icon="copy">Duplicate</l-dropdown-menu-item>
  </l-dropdown-menu>

  <l-dropdown-menu transition="drop" transitionDuration="700">
    <l-button slot="trigger" variant="outline" icon="chevron-down" label="Drop"></l-button>
    <l-dropdown-menu-item icon="pencil">Edit</l-dropdown-menu-item>
    <l-dropdown-menu-item icon="copy">Duplicate</l-dropdown-menu-item>
  </l-dropdown-menu>
</template>

<script setup lang="ts">
import "lojee-ui/elements";
</script>`,
              angular: `// app.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "lojee-ui/elements";

@Component({
  selector: "app-root",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <l-dropdown-menu transition="fade">
      <l-button slot="trigger" variant="outline" icon="chevron-down" label="Fade"></l-button>
      <l-dropdown-menu-item icon="pencil">Edit</l-dropdown-menu-item>
      <l-dropdown-menu-item icon="copy">Duplicate</l-dropdown-menu-item>
    </l-dropdown-menu>

    <l-dropdown-menu transition="slide-up">
      <l-button slot="trigger" variant="outline" icon="chevron-down" label="Slide up"></l-button>
      <l-dropdown-menu-item icon="pencil">Edit</l-dropdown-menu-item>
      <l-dropdown-menu-item icon="copy">Duplicate</l-dropdown-menu-item>
    </l-dropdown-menu>

    <l-dropdown-menu transition="zoom" transitionDelay="100">
      <l-button slot="trigger" variant="outline" icon="chevron-down" label="Zoom"></l-button>
      <l-dropdown-menu-item icon="pencil">Edit</l-dropdown-menu-item>
      <l-dropdown-menu-item icon="copy">Duplicate</l-dropdown-menu-item>
    </l-dropdown-menu>

    <l-dropdown-menu transition="flip">
      <l-button slot="trigger" variant="outline" icon="chevron-down" label="Flip"></l-button>
      <l-dropdown-menu-item icon="pencil">Edit</l-dropdown-menu-item>
      <l-dropdown-menu-item icon="copy">Duplicate</l-dropdown-menu-item>
    </l-dropdown-menu>

    <l-dropdown-menu transition="blur">
      <l-button slot="trigger" variant="outline" icon="chevron-down" label="Blur"></l-button>
      <l-dropdown-menu-item icon="pencil">Edit</l-dropdown-menu-item>
      <l-dropdown-menu-item icon="copy">Duplicate</l-dropdown-menu-item>
    </l-dropdown-menu>

    <l-dropdown-menu transition="drop" transitionDuration="700">
      <l-button slot="trigger" variant="outline" icon="chevron-down" label="Drop"></l-button>
      <l-dropdown-menu-item icon="pencil">Edit</l-dropdown-menu-item>
      <l-dropdown-menu-item icon="copy">Duplicate</l-dropdown-menu-item>
    </l-dropdown-menu>
  \`,
})
export class AppComponent {}`,
            }}
          />
        </section>
      </div>
    </div>
  );
}
