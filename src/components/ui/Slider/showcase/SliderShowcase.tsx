import { Slider } from "../Slider";
import CodeBlock from "../../CodeBlock";
import { SectionLabel, Row } from "../../ShowcaseHelpers";

export default function SliderShowcase() {
  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Slider</h1>
          <p className="text-sm text-slate-500 mt-1">A styled native range input for a single value.</p>
        </div>

        <section>
          <SectionLabel sub="A plain native range input.">Basic</SectionLabel>
          <div className="max-w-sm">
            <Slider defaultValue={40} />
          </div>
          <CodeBlock
            variants={{
              react: `<Slider defaultValue={40} />`,
              js: `<Slider value="40" />

<script type="module">
  import "lojee-ui/elements";
</script>`,
              vue: `<template>
  <Slider value="40" />
</template>

<script setup>
import "lojee-ui/elements";
</script>`,
              angular: `// app.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "lojee-ui/elements";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent {}

<!-- app.component.html -->
<Slider value="40" />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Shows the current numeric value next to the track.">With value</SectionLabel>
          <div className="max-w-sm">
            <Slider defaultValue={65} showValue />
          </div>
          <CodeBlock
            variants={{
              react: `<Slider defaultValue={65} showValue />`,
              js: `<Slider value="65" showValue />`,
              vue: `<template>
  <Slider value="65" showValue />
</template>`,
              angular: `<!-- app.component.html -->
<Slider value="65" showValue />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Matches the shared color palette.">Colors</SectionLabel>
          <div className="max-w-sm space-y-4">
            <Slider defaultValue={30} color="indigo" showValue />
            <Slider defaultValue={55} color="emerald" showValue />
            <Slider defaultValue={80} color="rose" showValue />
          </div>
          <CodeBlock
            variants={{
              react: `<Slider defaultValue={30} color="indigo" showValue />`,
              js: `<Slider value="30" color="indigo" showValue />`,
              vue: `<template>
  <Slider value="30" color="indigo" showValue />
</template>`,
              angular: `<!-- app.component.html -->
<Slider value="30" color="indigo" showValue />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="min/max/step pass through like any native range input.">Custom range</SectionLabel>
          <Row>
            <div className="max-w-sm w-full">
              <Slider min={0} max={10} step={1} defaultValue={5} showValue />
            </div>
          </Row>
          <CodeBlock
            variants={{
              react: `<Slider min={0} max={10} step={1} defaultValue={5} showValue />`,
              js: `<Slider min="0" max="10" step="1" value="5" showValue />`,
              vue: `<template>
  <Slider min="0" max="10" step="1" value="5" showValue />
</template>`,
              angular: `<!-- app.component.html -->
<Slider min="0" max="10" step="1" value="5" showValue />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Standard disabled state.">Disabled</SectionLabel>
          <div className="max-w-sm">
            <Slider defaultValue={40} disabled />
          </div>
          <CodeBlock
            variants={{
              react: `<Slider defaultValue={40} disabled />`,
              js: `<Slider value="40" disabled />`,
              vue: `<template>
  <Slider value="40" disabled />
</template>`,
              angular: `<!-- app.component.html -->
<Slider value="40" disabled />`,
            }}
          />
        </section>
      </div>
    </div>
  );
}
