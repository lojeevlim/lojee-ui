import { ContextMenu } from "../ContextMenu";
import { DropdownMenuItem } from "../../DropdownMenu/DropdownMenuItem";
import CodeBlock from "../../CodeBlock";
import { SectionLabel, Row, TransitionPreview } from "../../ShowcaseHelpers";

export default function ContextMenuShowcase() {
  return (
    <div>
      <div className="space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-fg">Context Menu</h1>
          <p className="text-sm text-fg-subtle mt-1">
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
              <div className="flex h-40 w-96 items-center justify-center rounded-lg border-2 border-dashed border-border text-sm text-fg-subtle">
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
              js: `<l-context-menu>
  <div slot="menu">
    <l-dropdown-menu-item icon="copy" id="copy-item">Copy</l-dropdown-menu-item>
    <l-dropdown-menu-item icon="pencil" id="rename-item">Rename</l-dropdown-menu-item>
    <l-dropdown-menu-item icon="trash-2" danger id="delete-item">Delete</l-dropdown-menu-item>
  </div>
  <div>Right-click here</div>
</l-context-menu>

<script type="module">
  import "lojee-ui/elements";

  document.getElementById("copy-item").addEventListener("click", () => copy());
  document.getElementById("rename-item").addEventListener("click", () => rename());
  document.getElementById("delete-item").addEventListener("click", () => remove());
</script>`,
              vue: `<template>
  <l-context-menu>
    <div slot="menu">
      <l-dropdown-menu-item icon="copy" @click="copy">Copy</l-dropdown-menu-item>
      <l-dropdown-menu-item icon="pencil" @click="rename">Rename</l-dropdown-menu-item>
      <l-dropdown-menu-item icon="trash-2" danger @click="remove">Delete</l-dropdown-menu-item>
    </div>
    <div>Right-click here</div>
  </l-context-menu>
</template>

<script setup lang="ts">
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
    <l-context-menu>
      <div slot="menu">
        <l-dropdown-menu-item icon="copy" (click)="copy()">Copy</l-dropdown-menu-item>
        <l-dropdown-menu-item icon="pencil" (click)="rename()">Rename</l-dropdown-menu-item>
        <l-dropdown-menu-item icon="trash-2" danger (click)="remove()">Delete</l-dropdown-menu-item>
      </div>
      <div>Right-click here</div>
    </l-context-menu>
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

        <section>
          <SectionLabel sub="Enter/exit transitions via `transition` (with `transitionDuration` / `transitionDelay`) — open and close each one to see it play both ways.">Transitions</SectionLabel>
          <TransitionPreview layout="inline">
            <ContextMenu transition="fade"
              menu={
                <>
                  <DropdownMenuItem icon="copy">Copy</DropdownMenuItem>
                  <DropdownMenuItem icon="pencil">Rename</DropdownMenuItem>
                </>
              }
            >
              <div className="flex h-20 w-36 items-center justify-center rounded-lg border-2 border-dashed border-border text-sm text-fg-subtle">Fade</div>
            </ContextMenu>
            <ContextMenu transition="slide-up"
              menu={
                <>
                  <DropdownMenuItem icon="copy">Copy</DropdownMenuItem>
                  <DropdownMenuItem icon="pencil">Rename</DropdownMenuItem>
                </>
              }
            >
              <div className="flex h-20 w-36 items-center justify-center rounded-lg border-2 border-dashed border-border text-sm text-fg-subtle">Slide up</div>
            </ContextMenu>
            <ContextMenu transition="zoom" transitionDelay={100}
              menu={
                <>
                  <DropdownMenuItem icon="copy">Copy</DropdownMenuItem>
                  <DropdownMenuItem icon="pencil">Rename</DropdownMenuItem>
                </>
              }
            >
              <div className="flex h-20 w-36 items-center justify-center rounded-lg border-2 border-dashed border-border text-sm text-fg-subtle">Zoom</div>
            </ContextMenu>
            <ContextMenu transition="flip"
              menu={
                <>
                  <DropdownMenuItem icon="copy">Copy</DropdownMenuItem>
                  <DropdownMenuItem icon="pencil">Rename</DropdownMenuItem>
                </>
              }
            >
              <div className="flex h-20 w-36 items-center justify-center rounded-lg border-2 border-dashed border-border text-sm text-fg-subtle">Flip</div>
            </ContextMenu>
            <ContextMenu transition="blur"
              menu={
                <>
                  <DropdownMenuItem icon="copy">Copy</DropdownMenuItem>
                  <DropdownMenuItem icon="pencil">Rename</DropdownMenuItem>
                </>
              }
            >
              <div className="flex h-20 w-36 items-center justify-center rounded-lg border-2 border-dashed border-border text-sm text-fg-subtle">Blur</div>
            </ContextMenu>
            <ContextMenu transition="drop" transitionDuration={700}
              menu={
                <>
                  <DropdownMenuItem icon="copy">Copy</DropdownMenuItem>
                  <DropdownMenuItem icon="pencil">Rename</DropdownMenuItem>
                </>
              }
            >
              <div className="flex h-20 w-36 items-center justify-center rounded-lg border-2 border-dashed border-border text-sm text-fg-subtle">Drop</div>
            </ContextMenu>
          </TransitionPreview>
          <CodeBlock
            variants={{
              react: `<ContextMenu transition="fade"
  menu={
    <>
      <DropdownMenuItem icon="copy">Copy</DropdownMenuItem>
      <DropdownMenuItem icon="pencil">Rename</DropdownMenuItem>
    </>
  }
>
  <div>Fade — right-click</div>
</ContextMenu>

<ContextMenu transition="slide-up"
  menu={
    <>
      <DropdownMenuItem icon="copy">Copy</DropdownMenuItem>
      <DropdownMenuItem icon="pencil">Rename</DropdownMenuItem>
    </>
  }
>
  <div>Slide up — right-click</div>
</ContextMenu>

<ContextMenu transition="zoom" transitionDelay={100}
  menu={
    <>
      <DropdownMenuItem icon="copy">Copy</DropdownMenuItem>
      <DropdownMenuItem icon="pencil">Rename</DropdownMenuItem>
    </>
  }
>
  <div>Zoom — right-click</div>
</ContextMenu>

<ContextMenu transition="flip"
  menu={
    <>
      <DropdownMenuItem icon="copy">Copy</DropdownMenuItem>
      <DropdownMenuItem icon="pencil">Rename</DropdownMenuItem>
    </>
  }
>
  <div>Flip — right-click</div>
</ContextMenu>

<ContextMenu transition="blur"
  menu={
    <>
      <DropdownMenuItem icon="copy">Copy</DropdownMenuItem>
      <DropdownMenuItem icon="pencil">Rename</DropdownMenuItem>
    </>
  }
>
  <div>Blur — right-click</div>
</ContextMenu>

<ContextMenu transition="drop" transitionDuration={700}
  menu={
    <>
      <DropdownMenuItem icon="copy">Copy</DropdownMenuItem>
      <DropdownMenuItem icon="pencil">Rename</DropdownMenuItem>
    </>
  }
>
  <div>Drop — right-click</div>
</ContextMenu>`,
              js: `<l-context-menu transition="fade">
  <div slot="menu">
    <l-dropdown-menu-item icon="copy">Copy</l-dropdown-menu-item>
    <l-dropdown-menu-item icon="pencil">Rename</l-dropdown-menu-item>
  </div>
  <div>Fade — right-click</div>
</l-context-menu>

<l-context-menu transition="slide-up">
  <div slot="menu">
    <l-dropdown-menu-item icon="copy">Copy</l-dropdown-menu-item>
    <l-dropdown-menu-item icon="pencil">Rename</l-dropdown-menu-item>
  </div>
  <div>Slide up — right-click</div>
</l-context-menu>

<l-context-menu transition="zoom" transitionDelay="100">
  <div slot="menu">
    <l-dropdown-menu-item icon="copy">Copy</l-dropdown-menu-item>
    <l-dropdown-menu-item icon="pencil">Rename</l-dropdown-menu-item>
  </div>
  <div>Zoom — right-click</div>
</l-context-menu>

<l-context-menu transition="flip">
  <div slot="menu">
    <l-dropdown-menu-item icon="copy">Copy</l-dropdown-menu-item>
    <l-dropdown-menu-item icon="pencil">Rename</l-dropdown-menu-item>
  </div>
  <div>Flip — right-click</div>
</l-context-menu>

<l-context-menu transition="blur">
  <div slot="menu">
    <l-dropdown-menu-item icon="copy">Copy</l-dropdown-menu-item>
    <l-dropdown-menu-item icon="pencil">Rename</l-dropdown-menu-item>
  </div>
  <div>Blur — right-click</div>
</l-context-menu>

<l-context-menu transition="drop" transitionDuration="700">
  <div slot="menu">
    <l-dropdown-menu-item icon="copy">Copy</l-dropdown-menu-item>
    <l-dropdown-menu-item icon="pencil">Rename</l-dropdown-menu-item>
  </div>
  <div>Drop — right-click</div>
</l-context-menu>

<script type="module">
  import "lojee-ui/elements";
</script>`,
              vue: `<template>
  <l-context-menu transition="fade">
    <div slot="menu">
      <l-dropdown-menu-item icon="copy">Copy</l-dropdown-menu-item>
      <l-dropdown-menu-item icon="pencil">Rename</l-dropdown-menu-item>
    </div>
    <div>Fade — right-click</div>
  </l-context-menu>

  <l-context-menu transition="slide-up">
    <div slot="menu">
      <l-dropdown-menu-item icon="copy">Copy</l-dropdown-menu-item>
      <l-dropdown-menu-item icon="pencil">Rename</l-dropdown-menu-item>
    </div>
    <div>Slide up — right-click</div>
  </l-context-menu>

  <l-context-menu transition="zoom" transitionDelay="100">
    <div slot="menu">
      <l-dropdown-menu-item icon="copy">Copy</l-dropdown-menu-item>
      <l-dropdown-menu-item icon="pencil">Rename</l-dropdown-menu-item>
    </div>
    <div>Zoom — right-click</div>
  </l-context-menu>

  <l-context-menu transition="flip">
    <div slot="menu">
      <l-dropdown-menu-item icon="copy">Copy</l-dropdown-menu-item>
      <l-dropdown-menu-item icon="pencil">Rename</l-dropdown-menu-item>
    </div>
    <div>Flip — right-click</div>
  </l-context-menu>

  <l-context-menu transition="blur">
    <div slot="menu">
      <l-dropdown-menu-item icon="copy">Copy</l-dropdown-menu-item>
      <l-dropdown-menu-item icon="pencil">Rename</l-dropdown-menu-item>
    </div>
    <div>Blur — right-click</div>
  </l-context-menu>

  <l-context-menu transition="drop" transitionDuration="700">
    <div slot="menu">
      <l-dropdown-menu-item icon="copy">Copy</l-dropdown-menu-item>
      <l-dropdown-menu-item icon="pencil">Rename</l-dropdown-menu-item>
    </div>
    <div>Drop — right-click</div>
  </l-context-menu>
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
    <l-context-menu transition="fade">
      <div slot="menu">
        <l-dropdown-menu-item icon="copy">Copy</l-dropdown-menu-item>
        <l-dropdown-menu-item icon="pencil">Rename</l-dropdown-menu-item>
      </div>
      <div>Fade — right-click</div>
    </l-context-menu>

    <l-context-menu transition="slide-up">
      <div slot="menu">
        <l-dropdown-menu-item icon="copy">Copy</l-dropdown-menu-item>
        <l-dropdown-menu-item icon="pencil">Rename</l-dropdown-menu-item>
      </div>
      <div>Slide up — right-click</div>
    </l-context-menu>

    <l-context-menu transition="zoom" transitionDelay="100">
      <div slot="menu">
        <l-dropdown-menu-item icon="copy">Copy</l-dropdown-menu-item>
        <l-dropdown-menu-item icon="pencil">Rename</l-dropdown-menu-item>
      </div>
      <div>Zoom — right-click</div>
    </l-context-menu>

    <l-context-menu transition="flip">
      <div slot="menu">
        <l-dropdown-menu-item icon="copy">Copy</l-dropdown-menu-item>
        <l-dropdown-menu-item icon="pencil">Rename</l-dropdown-menu-item>
      </div>
      <div>Flip — right-click</div>
    </l-context-menu>

    <l-context-menu transition="blur">
      <div slot="menu">
        <l-dropdown-menu-item icon="copy">Copy</l-dropdown-menu-item>
        <l-dropdown-menu-item icon="pencil">Rename</l-dropdown-menu-item>
      </div>
      <div>Blur — right-click</div>
    </l-context-menu>

    <l-context-menu transition="drop" transitionDuration="700">
      <div slot="menu">
        <l-dropdown-menu-item icon="copy">Copy</l-dropdown-menu-item>
        <l-dropdown-menu-item icon="pencil">Rename</l-dropdown-menu-item>
      </div>
      <div>Drop — right-click</div>
    </l-context-menu>
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
