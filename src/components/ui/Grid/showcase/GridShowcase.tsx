import type { ReactNode } from "react";
import { Grid } from "../Grid";
import CodeBlock from "../../CodeBlock";
import { SectionLabel } from "../../ShowcaseHelpers";

function SampleItem({ children }: { children: ReactNode }) {
  return <div className="rounded-md bg-slate-100 p-4 text-center text-xs text-slate-500">{children}</div>;
}

export default function GridShowcase() {
  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Grid</h1>
          <p className="text-sm text-slate-500 mt-1">A responsive CSS grid for laying out cards, items, or tiles.</p>
        </div>

        <section>
          <SectionLabel sub="1, 2, 3, 4, 6, 12 — each responsive down to smaller breakpoints.">Columns</SectionLabel>
          <div className="space-y-6">
            {([2, 3, 4] as const).map((cols) => (
              <div key={cols}>
                <p className="mb-2 text-xs font-medium text-slate-500">cols={cols}</p>
                <Grid cols={cols}>
                  {Array.from({ length: 6 }, (_, i) => (
                    <SampleItem key={i}>Item {i + 1}</SampleItem>
                  ))}
                </Grid>
              </div>
            ))}
          </div>
          <CodeBlock
            variants={{
              react: `<Grid cols={3}>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Grid>`,
              js: `<Grid cols="3">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Grid>

<script type="module">
  import "lojee-ui/elements";
</script>`,
              vue: `<template>
  <Grid cols="3">
    <div>Item 1</div>
    <div>Item 2</div>
    <div>Item 3</div>
  </Grid>
</template>

<script setup>
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
    <Grid cols="3">
      <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
    </Grid>
  \`,
})
export class AppComponent {}`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="sm, md, lg spacing between items.">Gap</SectionLabel>
          <div className="space-y-6">
            {(["sm", "md", "lg"] as const).map((gap) => (
              <div key={gap}>
                <p className="mb-2 text-xs font-medium text-slate-500">gap="{gap}"</p>
                <Grid cols={4} gap={gap}>
                  {Array.from({ length: 4 }, (_, i) => (
                    <SampleItem key={i}>Item {i + 1}</SampleItem>
                  ))}
                </Grid>
              </div>
            ))}
          </div>
          <CodeBlock
            variants={{
              react: `<Grid cols={4} gap="lg">...</Grid>`,
              js: `<Grid cols="4" gap="lg">...</Grid>`,
              vue: `<template>
  <Grid cols="4" gap="lg">...</Grid>
</template>`,
              angular: `<!-- reuses the AppComponent from above -->
<Grid cols="4" gap="lg">...</Grid>`,
            }}
          />
        </section>
      </div>
    </div>
  );
}
