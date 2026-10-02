import { useState } from "react";
import { Divider } from "../Divider";
import { Button } from "../../Buttons/Button";
import CodeBlock from "../../CodeBlock";
import { SectionLabel } from "../../ShowcaseHelpers";

const MIN_PANEL_PX = 80;

export default function DividerShowcase() {
  const [leftWidth, setLeftWidth] = useState(180);
  const [topHeight, setTopHeight] = useState(90);

  return (
    <div>
      <div className="space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-fg">Divider</h1>
          <p className="text-sm text-fg-subtle mt-1">A plain rule, one with centered label text, or a draggable resize handle.</p>
        </div>

        <section>
          <SectionLabel sub="A plain horizontal rule.">Plain</SectionLabel>
          <Divider />
          <CodeBlock
            variants={{
              react: `<Divider />`,
              js: `<l-Divider ></l-Divider>

<script type="module">
  import "lojee-ui/elements";
</script>`,
              vue: `<template>
  <l-Divider />
</template>

<script setup lang="ts">
import "lojee-ui/elements";
</script>`,
              angular: `// divider-showcase.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "lojee-ui/elements";

@Component({
  selector: "app-divider-showcase",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`<l-Divider />\`,
})
export class DividerShowcaseComponent {}`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Centered text between two lines.">With label</SectionLabel>
          <Divider label="OR" />
          <CodeBlock
            variants={{
              react: `<Divider label="OR" />`,
              js: `<l-Divider label="OR"></l-Divider>`,
              vue: `<template>
  <l-Divider label="OR" />
</template>`,
              angular: `<!-- reuses DividerShowcaseComponent from above -->
<l-Divider label="OR" />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Separating two buttons side by side.">Vertical</SectionLabel>
          <div className="flex h-9 items-center gap-3">
            <Button size="sm" label="Save" />
            <Divider orientation="vertical" />
            <Button size="sm" variant="outline" label="Cancel" />
          </div>
          <CodeBlock
            variants={{
              react: `<Divider orientation="vertical" />`,
              js: `<l-Divider orientation="vertical"></l-Divider>`,
              vue: `<template>
  <l-Divider orientation="vertical" />
</template>`,
              angular: `<!-- reuses DividerShowcaseComponent from above -->
<l-Divider orientation="vertical" />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Matches the shared color palette.">Colors</SectionLabel>
          <div className="space-y-4">
            <Divider color="indigo" label="Indigo" />
            <Divider color="rose" label="Rose" />
          </div>
          <CodeBlock
            variants={{
              react: `<Divider color="indigo" label="Indigo" />`,
              js: `<l-Divider color="indigo" label="Indigo"></l-Divider>`,
              vue: `<template>
  <l-Divider color="indigo" label="Indigo" />
</template>`,
              angular: `<!-- reuses DividerShowcaseComponent from above -->
<l-Divider color="indigo" label="Indigo" />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Drag it (or focus it and use arrow keys) — it reports the movement via onResize, the consumer owns the actual size state. Try both below.">
            Adjustable
          </SectionLabel>

          <p className="mb-2 text-xs font-medium text-fg-subtle">Side by side (drag the vertical divider left/right)</p>
          <div className="flex h-40 overflow-hidden rounded-lg border border-border">
            <div className="flex items-center justify-center bg-surface-muted text-xs text-fg-subtle" style={{ width: leftWidth }}>
              {leftWidth}px
            </div>
            <Divider
              orientation="vertical"
              resizable
              onResize={(dx) => setLeftWidth((w) => Math.min(400, Math.max(MIN_PANEL_PX, w + dx)))}
            />
            <div className="flex flex-1 items-center justify-center bg-surface text-xs text-fg-subtle">flex-1</div>
          </div>

          <p className="mt-6 mb-2 text-xs font-medium text-fg-subtle">Stacked (drag the horizontal divider up/down)</p>
          <div className="flex h-40 flex-col overflow-hidden rounded-lg border border-border">
            <div className="flex items-center justify-center bg-surface-muted text-xs text-fg-subtle" style={{ height: topHeight }}>
              {topHeight}px
            </div>
            <Divider
              resizable
              onResize={(dy) => setTopHeight((h) => Math.min(160, Math.max(MIN_PANEL_PX, h + dy)))}
            />
            <div className="flex flex-1 items-center justify-center bg-surface text-xs text-fg-subtle">flex-1</div>
          </div>

          <CodeBlock
            variants={{
              react: `<div className="flex">
  <div style={{ width: leftWidth }}>...</div>
  <Divider
    orientation="vertical"
    resizable
    onResize={(dx) => setLeftWidth((w) => w + dx)}
  />
  <div className="flex-1">...</div>
</div>`,
              js: `<div class="flex">
  <div id="left-panel" style="width: 180px">...</div>
  <l-Divider id="resize-divider" orientation="vertical" resizable></l-Divider>
  <div class="flex-1">...</div>
</div>

<script type="module">
  const leftPanel = document.getElementById("left-panel");
  document.getElementById("resize-divider").addEventListener("resize", (e) => {
    const dx = e.detail;
    leftPanel.style.width = \`\${leftPanel.offsetWidth + dx}px\`;
  });
</script>`,
              vue: `<template>
  <div class="flex">
    <div :style="{ width: leftWidth + 'px' }">...</div>
    <l-Divider
      orientation="vertical"
      resizable
      @resize="leftWidth += $event.detail"
    />
    <div class="flex-1">...</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const leftWidth = ref(180);
</script>`,
              angular: `<!-- reuses DividerShowcaseComponent from above -->
<div class="flex">
  <div [style.width.px]="leftWidth">...</div>
  <l-Divider
    orientation="vertical"
    resizable
    (resize)="leftWidth = leftWidth + $event.detail"
   />
  <div class="flex-1">...</div>
</div>

<!-- class DividerShowcaseComponent { leftWidth = 180; } -->`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Enter transitions via `transition` (with `transitionDuration` / `transitionDelay`). They play on mount — reload the page, or use Replay in the playground.">Transitions</SectionLabel>
          <div className="space-y-4">
            <Divider label="fade" transition="fade" />
            <Divider label="slide-up" transition="slide-up" />
            <Divider label="slide-right" transition="slide-right" transitionDelay={100} />
            <Divider label="zoom" transition="zoom" />
            <Divider label="flip" transition="flip" />
            <Divider label="blur" transition="blur" />
            <Divider label="bounce" transition="bounce" />
            <Divider label="drop" transition="drop" transitionDuration={700} />
          </div>
          <CodeBlock
            variants={{
              react: `<Divider label="fade" transition="fade" />
<Divider label="slide-up" transition="slide-up" />
<Divider label="slide-right" transition="slide-right" transitionDelay={100} />
<Divider label="zoom" transition="zoom" />

<Divider label="flip" transition="flip" />
<Divider label="blur" transition="blur" />
<Divider label="bounce" transition="bounce" />
<Divider label="drop" transition="drop" transitionDuration={700} />`,
              js: `<l-Divider label="fade" transition="fade"></l-Divider>
<l-Divider label="slide-up" transition="slide-up"></l-Divider>
<l-Divider label="slide-right" transition="slide-right" transitionDelay="100"></l-Divider>
<l-Divider label="zoom" transition="zoom"></l-Divider>

<l-Divider label="flip" transition="flip"></l-Divider>
<l-Divider label="blur" transition="blur"></l-Divider>
<l-Divider label="bounce" transition="bounce"></l-Divider>
<l-Divider label="drop" transition="drop" transitionDuration="700"></l-Divider>

<script type="module">
  import "lojee-ui/elements";
</script>`,
              vue: `<template>
  <l-Divider label="fade" transition="fade"></l-Divider>
  <l-Divider label="slide-up" transition="slide-up"></l-Divider>
  <l-Divider label="slide-right" transition="slide-right" transitionDelay="100"></l-Divider>
  <l-Divider label="zoom" transition="zoom"></l-Divider>

  <l-Divider label="flip" transition="flip"></l-Divider>
  <l-Divider label="blur" transition="blur"></l-Divider>
  <l-Divider label="bounce" transition="bounce"></l-Divider>
  <l-Divider label="drop" transition="drop" transitionDuration="700"></l-Divider>
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
    <l-Divider label="fade" transition="fade"></l-Divider>
    <l-Divider label="slide-up" transition="slide-up"></l-Divider>
    <l-Divider label="slide-right" transition="slide-right" transitionDelay="100"></l-Divider>
    <l-Divider label="zoom" transition="zoom"></l-Divider>

    <l-Divider label="flip" transition="flip"></l-Divider>
    <l-Divider label="blur" transition="blur"></l-Divider>
    <l-Divider label="bounce" transition="bounce"></l-Divider>
    <l-Divider label="drop" transition="drop" transitionDuration="700"></l-Divider>
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
