import { useState } from "react";
import { Drawer, type DrawerPosition } from "../Drawer";
import { Button } from "../../Buttons/Button";
import CodeBlock from "../../CodeBlock";
import { SectionLabel, Row } from "../../ShowcaseHelpers";
import type { TransitionVariant } from "../../../../core/motion";

const POSITIONS: DrawerPosition[] = ["left", "right", "top", "bottom"];

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

export default function DrawerShowcase() {
  const [trOpen, setTrOpen] = useState(false);
  const [trOption, setTrOption] = useState(TR_OPTIONS[0]);
  const trReact = `transition="${trOption.transition}"${trOption.duration ? ` transitionDuration={${trOption.duration}}` : ""}${trOption.delay ? ` transitionDelay={${trOption.delay}}` : ""}`;
  const trHtml = `transition="${trOption.transition}"${trOption.duration ? ` transitionDuration="${trOption.duration}"` : ""}${trOption.delay ? ` transitionDelay="${trOption.delay}"` : ""}`;
  const [position, setPosition] = useState<DrawerPosition>("right");
  const [positionOpen, setPositionOpen] = useState(false);
  const [wideOpen, setWideOpen] = useState(false);

  return (
    <div className="min-h-screen rounded-xl bg-surface p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-fg">Drawer</h1>
          <p className="text-sm text-fg-subtle mt-1">An edge-anchored panel that slides in over the page from any side.</p>
        </div>

        <section>
          <SectionLabel sub="Pick an edge for the panel to slide in from.">Position</SectionLabel>
          <Row>
            {POSITIONS.map((p) => (
              <Button
                key={p}
                variant="outline"
                label={`Open ${p}`}
                onClick={() => {
                  setPosition(p);
                  setPositionOpen(true);
                }}
              />
            ))}
          </Row>
          <Drawer open={positionOpen} onClose={() => setPositionOpen(false)} position={position} title={`${position} drawer`}>
            <p className="text-sm text-fg-muted">This drawer slid in from the {position} edge.</p>
          </Drawer>
          <CodeBlock
            variants={{
              react: `const [open, setOpen] = useState(false);

<Drawer open={open} onClose={() => setOpen(false)} position="${position}" title="${position} drawer">
  <p>This drawer slid in from the ${position} edge.</p>
</Drawer>`,
              js: `<l-Button label="Open ${position} drawer" id="open-drawer-btn" />
<l-Drawer id="edge-drawer" position="${position}" heading="${position} drawer">
  <p>This drawer slid in from the ${position} edge.</p>
</l-Drawer>

<script type="module">
  import "lojee-ui/elements";

  const drawer = document.getElementById("edge-drawer");
  document.getElementById("open-drawer-btn")
    .addEventListener("click", () => { drawer.open = true; });
  drawer.addEventListener("close", () => { drawer.open = false; });
</script>`,
              vue: `<template>
  <l-Button label="Open ${position} drawer" @click="open = true" />
  <l-Drawer :open="open" position="${position}" heading="${position} drawer" @close="open = false">
    <p>This drawer slid in from the ${position} edge.</p>
  </l-Drawer>
</template>

<script setup lang="ts">
import { ref } from "vue";
import "lojee-ui/elements";

const open = ref(false);
</script>`,
              angular: `// drawer-showcase.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "lojee-ui/elements";

@Component({
  selector: "app-drawer-showcase",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <l-Button label="Open ${position} drawer" (click)="open = true" />
    <l-Drawer [open]="open" position="${position}" heading="${position} drawer" (close)="open = false">
      <p>This drawer slid in from the ${position} edge.</p>
    </l-Drawer>
  \`,
})
export class DrawerShowcaseComponent {
  open = false;
}`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Override the panel width via the size prop.">Custom size</SectionLabel>
          <Row>
            <Button label="Open wide drawer" onClick={() => setWideOpen(true)} />
          </Row>
          <Drawer open={wideOpen} onClose={() => setWideOpen(false)} position="right" size="480px" title="Wide drawer">
            <p className="text-sm text-fg-muted">This drawer is 480px wide instead of the 320px default.</p>
          </Drawer>
          <CodeBlock
            variants={{
              react: `<Drawer open={open} onClose={() => setOpen(false)} position="right" size="480px" title="Wide drawer">
  <p>This drawer is 480px wide instead of the 320px default.</p>
</Drawer>`,
              js: `<l-Drawer id="wide-drawer" position="right" size="480px" heading="Wide drawer">
  <p>This drawer is 480px wide instead of the 320px default.</p>
</l-Drawer>

<script type="module">
  const drawer = document.getElementById("wide-drawer");
  drawer.addEventListener("close", () => { drawer.open = false; });
</script>`,
              vue: `<template>
  <l-Drawer :open="open" position="right" size="480px" heading="Wide drawer" @close="open = false">
    <p>This drawer is 480px wide instead of the 320px default.</p>
  </l-Drawer>
</template>`,
              angular: `<!-- reuses DrawerShowcaseComponent from above -->
<l-Drawer [open]="open" position="right" size="480px" heading="Wide drawer" (close)="open = false">
  <p>This drawer is 480px wide instead of the 320px default.</p>
</l-Drawer>`,
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
          <Drawer open={trOpen} onClose={() => setTrOpen(false)} title="Transition" position="right" transition={trOption.transition} transitionDuration={trOption.duration} transitionDelay={trOption.delay}>
            <p className="text-sm text-fg-muted">A transition replaces the drawer's default slide.</p>
          </Drawer>
          <CodeBlock
            variants={{
              react: `const [open, setOpen] = useState(false);

<Button label="Open drawer" onClick={() => setOpen(true)} />
<Drawer open={open} onClose={() => setOpen(false)} title="Transition" position="right" ${trReact}>
  <p>A transition replaces the drawer's default slide.</p>
</Drawer>`,
              js: `<l-Button label="Open drawer" id="open-tr-btn"></l-Button>
<l-Drawer id="tr-overlay" heading="Transition" position="right" ${trHtml}>
  <p>A transition replaces the drawer's default slide.</p>
</l-Drawer>

<script type="module">
  import "lojee-ui/elements";

  const overlay = document.getElementById("tr-overlay");
  document.getElementById("open-tr-btn")
    .addEventListener("click", () => { overlay.open = true; });
  overlay.addEventListener("close", () => { overlay.open = false; });
</script>`,
              vue: `<template>
  <l-Button label="Open drawer" @click="open = true"></l-Button>
  <l-Drawer :open="open" heading="Transition" position="right" ${trHtml} @close="open = false">
    <p>A transition replaces the drawer's default slide.</p>
  </l-Drawer>
</template>

<script setup lang="ts">
import { ref } from "vue";
import "lojee-ui/elements";

const open = ref(false);
</script>`,
              angular: `// app.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "lojee-ui/elements";

@Component({
  selector: "app-root",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <l-Button label="Open drawer" (click)="open = true"></l-Button>
    <l-Drawer [open]="open" heading="Transition" position="right" ${trHtml} (close)="open = false">
      <p>A transition replaces the drawer's default slide.</p>
    </l-Drawer>
  \`,
})
export class AppComponent {
  open = false;
}`,
            }}
          />
        </section>
      </div>
    </div>
  );
}
