import { Slider } from "../Slider";
import CodeBlock from "../../CodeBlock";
import { SectionLabel, Row, TransitionPreview } from "../../ShowcaseHelpers";

export default function SliderShowcase() {
  return (
    <div className="min-h-screen rounded-xl bg-surface p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-fg">Slider</h1>
          <p className="text-sm text-fg-subtle mt-1">A styled native range input for a single value.</p>
        </div>

        <section>
          <SectionLabel sub="A plain native range input.">Basic</SectionLabel>
          <div className="max-w-sm">
            <Slider defaultValue={40} />
          </div>
          <CodeBlock
            variants={{
              react: `<Slider defaultValue={40} />`,
              js: `<l-Slider value="40" />

<script type="module">
  import "lojee-ui/elements";
</script>`,
              vue: `<template>
  <l-Slider value="40" />
</template>

<script setup lang="ts">
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
<l-Slider value="40" />`,
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
              js: `<l-Slider value="65" showValue />`,
              vue: `<template>
  <l-Slider value="65" showValue />
</template>`,
              angular: `<!-- app.component.html -->
<l-Slider value="65" showValue />`,
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
              js: `<l-Slider value="30" color="indigo" showValue />`,
              vue: `<template>
  <l-Slider value="30" color="indigo" showValue />
</template>`,
              angular: `<!-- app.component.html -->
<l-Slider value="30" color="indigo" showValue />`,
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
              js: `<l-Slider min="0" max="10" step="1" value="5" showValue />`,
              vue: `<template>
  <l-Slider min="0" max="10" step="1" value="5" showValue />
</template>`,
              angular: `<!-- app.component.html -->
<l-Slider min="0" max="10" step="1" value="5" showValue />`,
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
              js: `<l-Slider value="40" disabled />`,
              vue: `<template>
  <l-Slider value="40" disabled />
</template>`,
              angular: `<!-- app.component.html -->
<l-Slider value="40" disabled />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Enter transitions via `transition` (with `transitionDuration` / `transitionDelay`) and hover effects via `hoverEffect`. They play on mount — reload the page, or use Replay in the playground.">Transitions</SectionLabel>
          <div className="max-w-sm"><TransitionPreview cols={1}>
            <Slider transition="fade" defaultValue={40} />
            <Slider transition="slide-up" defaultValue={40} />
            <Slider transition="slide-right" transitionDelay={100} defaultValue={40} />
            <Slider transition="zoom" defaultValue={40} />
            <Slider transition="flip" defaultValue={40} />
            <Slider transition="blur" defaultValue={40} />
          </TransitionPreview></div>
          <div className="max-w-sm space-y-3">
            <Slider hoverEffect="lift" defaultValue={40} />
            <Slider hoverEffect="scale" defaultValue={40} />
            <Slider hoverEffect="glow" defaultValue={40} />
          </div>
          <CodeBlock
            variants={{
              react: `<Slider transition="fade" defaultValue={40} />
<Slider transition="slide-up" defaultValue={40} />
<Slider transition="slide-right" transitionDelay={100} defaultValue={40} />
<Slider transition="zoom" defaultValue={40} />
<Slider transition="flip" defaultValue={40} />
<Slider transition="blur" defaultValue={40} />

<Slider hoverEffect="lift" defaultValue={40} />
<Slider hoverEffect="scale" defaultValue={40} />
<Slider hoverEffect="glow" defaultValue={40} />`,
              js: `<l-Slider transition="fade" value="40"></l-Slider>
<l-Slider transition="slide-up" value="40"></l-Slider>
<l-Slider transition="slide-right" transitionDelay="100" value="40"></l-Slider>
<l-Slider transition="zoom" value="40"></l-Slider>
<l-Slider transition="flip" value="40"></l-Slider>
<l-Slider transition="blur" value="40"></l-Slider>

<l-Slider hoverEffect="lift" value="40"></l-Slider>
<l-Slider hoverEffect="scale" value="40"></l-Slider>
<l-Slider hoverEffect="glow" value="40"></l-Slider>

<script type="module">
  import "lojee-ui/elements";
</script>`,
              vue: `<template>
  <l-Slider transition="fade" value="40"></l-Slider>
  <l-Slider transition="slide-up" value="40"></l-Slider>
  <l-Slider transition="slide-right" transitionDelay="100" value="40"></l-Slider>
  <l-Slider transition="zoom" value="40"></l-Slider>
  <l-Slider transition="flip" value="40"></l-Slider>
  <l-Slider transition="blur" value="40"></l-Slider>

  <l-Slider hoverEffect="lift" value="40"></l-Slider>
  <l-Slider hoverEffect="scale" value="40"></l-Slider>
  <l-Slider hoverEffect="glow" value="40"></l-Slider>
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
    <l-Slider transition="fade" value="40"></l-Slider>
    <l-Slider transition="slide-up" value="40"></l-Slider>
    <l-Slider transition="slide-right" transitionDelay="100" value="40"></l-Slider>
    <l-Slider transition="zoom" value="40"></l-Slider>
    <l-Slider transition="flip" value="40"></l-Slider>
    <l-Slider transition="blur" value="40"></l-Slider>

    <l-Slider hoverEffect="lift" value="40"></l-Slider>
    <l-Slider hoverEffect="scale" value="40"></l-Slider>
    <l-Slider hoverEffect="glow" value="40"></l-Slider>
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
