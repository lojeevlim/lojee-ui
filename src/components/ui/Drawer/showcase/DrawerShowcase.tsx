import { useState } from "react";
import { Drawer, type DrawerPosition } from "../Drawer";
import { Button } from "../../Buttons/Button";
import CodeBlock from "../../CodeBlock";
import { SectionLabel, Row } from "../../ShowcaseHelpers";

const POSITIONS: DrawerPosition[] = ["left", "right", "top", "bottom"];

export default function DrawerShowcase() {
  const [position, setPosition] = useState<DrawerPosition>("right");
  const [positionOpen, setPositionOpen] = useState(false);
  const [wideOpen, setWideOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Drawer</h1>
          <p className="text-sm text-slate-500 mt-1">An edge-anchored panel that slides in over the page from any side.</p>
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
            <p className="text-sm text-slate-600">This drawer slid in from the {position} edge.</p>
          </Drawer>
          <CodeBlock
            variants={{
              react: `const [open, setOpen] = useState(false);

<Drawer open={open} onClose={() => setOpen(false)} position="${position}" title="${position} drawer">
  <p>This drawer slid in from the ${position} edge.</p>
</Drawer>`,
              js: `<Button label="Open ${position} drawer" id="open-drawer-btn" />
<Drawer id="edge-drawer" position="${position}" heading="${position} drawer">
  <p>This drawer slid in from the ${position} edge.</p>
</Drawer>

<script type="module">
  import "lojee-ui/elements";

  const drawer = document.getElementById("edge-drawer");
  document.getElementById("open-drawer-btn")
    .addEventListener("click", () => { drawer.open = true; });
  drawer.addEventListener("close", () => { drawer.open = false; });
</script>`,
              vue: `<template>
  <Button label="Open ${position} drawer" @click="open = true" />
  <Drawer :open="open" position="${position}" heading="${position} drawer" @close="open = false">
    <p>This drawer slid in from the ${position} edge.</p>
  </Drawer>
</template>

<script setup>
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
    <Button label="Open ${position} drawer" (click)="open = true" />
    <Drawer [open]="open" position="${position}" heading="${position} drawer" (close)="open = false">
      <p>This drawer slid in from the ${position} edge.</p>
    </Drawer>
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
            <p className="text-sm text-slate-600">This drawer is 480px wide instead of the 320px default.</p>
          </Drawer>
          <CodeBlock
            variants={{
              react: `<Drawer open={open} onClose={() => setOpen(false)} position="right" size="480px" title="Wide drawer">
  <p>This drawer is 480px wide instead of the 320px default.</p>
</Drawer>`,
              js: `<Drawer id="wide-drawer" position="right" size="480px" heading="Wide drawer">
  <p>This drawer is 480px wide instead of the 320px default.</p>
</Drawer>

<script type="module">
  const drawer = document.getElementById("wide-drawer");
  drawer.addEventListener("close", () => { drawer.open = false; });
</script>`,
              vue: `<template>
  <Drawer :open="open" position="right" size="480px" heading="Wide drawer" @close="open = false">
    <p>This drawer is 480px wide instead of the 320px default.</p>
  </Drawer>
</template>`,
              angular: `<!-- reuses DrawerShowcaseComponent from above -->
<Drawer [open]="open" position="right" size="480px" heading="Wide drawer" (close)="open = false">
  <p>This drawer is 480px wide instead of the 320px default.</p>
</Drawer>`,
            }}
          />
        </section>
      </div>
    </div>
  );
}
