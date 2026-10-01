import { useState } from "react";
import { RangeSlider, type RangeSliderProps } from "../RangeSlider";
import CodeBlock from "../../CodeBlock";
import { SectionLabel } from "../../ShowcaseHelpers";

// Uncontrolled stand-in for the Transitions examples, which only need a slider that moves.
function DemoRange(props: Omit<RangeSliderProps, "value" | "onChange">) {
  const [value, setValue] = useState<[number, number]>([20, 70]);
  return <RangeSlider {...props} value={value} onChange={setValue} />;
}

export default function RangeSliderShowcase() {
  const [basic, setBasic] = useState<[number, number]>([20, 70]);
  const [colored, setColored] = useState<[number, number]>([30, 80]);
  const [priceRange, setPriceRange] = useState<[number, number]>([200, 750]);

  return (
    <div className="min-h-screen rounded-xl bg-surface p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-fg">RangeSlider</h1>
          <p className="text-sm text-fg-subtle mt-1">
            A dual-thumb range built from two overlapping native range inputs sharing one track.
          </p>
        </div>

        <section>
          <SectionLabel sub="Controlled — the consumer owns the [low, high] tuple.">Basic</SectionLabel>
          <div className="max-w-sm">
            <RangeSlider value={basic} onChange={setBasic} />
          </div>
          <CodeBlock
            variants={{
              react: `const [value, setValue] = useState<[number, number]>([20, 70]);

<RangeSlider value={value} onChange={setValue} />`,
              js: `<l-RangeSlider id="range" />

<script type="module">
  import "lojee-ui/elements";

  const range = document.getElementById("range");
  range.value = [20, 70];
  range.addEventListener("change", (e) => {
    range.value = e.detail;
  });
</script>`,
              vue: `<template>
  <l-RangeSlider :value="value" @change="value = $event.detail" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import "lojee-ui/elements";

const value = ref([20, 70]);
</script>`,
              angular: `// app.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "lojee-ui/elements";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent {
  value: [number, number] = [20, 70];
}

<!-- app.component.html -->
<l-RangeSlider [value]="value" (change)="value = $event.detail" />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Shows the current [low, high] as text below the track.">With value</SectionLabel>
          <div className="max-w-sm">
            <RangeSlider value={colored} onChange={setColored} color="indigo" showValue />
          </div>
          <CodeBlock
            variants={{
              react: `<RangeSlider value={value} onChange={setValue} color="indigo" showValue />`,
              js: `<l-RangeSlider id="range-colored" color="indigo" showValue />

<script type="module">
  const rangeColored = document.getElementById("range-colored");
  rangeColored.value = [30, 80];
  rangeColored.addEventListener("change", (e) => {
    rangeColored.value = e.detail;
  });
</script>`,
              vue: `<template>
  <l-RangeSlider :value="value" color="indigo" showValue @change="value = $event.detail" />
</template>`,
              angular: `<!-- app.component.html — reuses the same AppComponent class, with value initialized to [30, 80] -->
<l-RangeSlider [value]="value" color="indigo" showValue (change)="value = $event.detail" />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Custom min/max/step — e.g. a price filter.">Custom range</SectionLabel>
          <div className="max-w-sm">
            <RangeSlider
              min={0}
              max={1000}
              step={10}
              value={priceRange}
              onChange={setPriceRange}
              color="emerald"
              showValue
            />
          </div>
          <CodeBlock
            variants={{
              react: `<RangeSlider
  min={0}
  max={1000}
  step={10}
  value={value}
  onChange={setValue}
  color="emerald"
  showValue
/>`,
              js: `<l-RangeSlider id="price-range" min="0" max="1000" step="10" color="emerald" showValue />

<script type="module">
  const priceRange = document.getElementById("price-range");
  priceRange.value = [200, 750];
  priceRange.addEventListener("change", (e) => {
    priceRange.value = e.detail;
  });
</script>`,
              vue: `<template>
  <l-RangeSlider
    :value="value"
    min="0"
    max="1000"
    step="10"
    color="emerald"
    showValue
    @change="value = $event.detail"
  />
</template>`,
              angular: `<!-- app.component.html — reuses the same AppComponent class, with value initialized to [200, 750] -->
<l-RangeSlider
  [value]="value"
  min="0"
  max="1000"
  step="10"
  color="emerald"
  showValue
  (change)="value = $event.detail"
 />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Enter transitions via `transition` (with `transitionDuration` / `transitionDelay`) and hover effects via `hoverEffect`. They play on mount — reload the page, or use Replay in the playground.">Transitions</SectionLabel>
          <div className="max-w-sm space-y-4">
            <DemoRange transition="fade" />
            <DemoRange transition="slide-up" />
            <DemoRange transition="slide-right" transitionDelay={100} />
            <DemoRange transition="zoom" />
            <DemoRange transition="flip" />
            <DemoRange transition="blur" />
          </div>
          <div className="max-w-sm space-y-4">
            <DemoRange hoverEffect="lift" />
            <DemoRange hoverEffect="scale" />
            <DemoRange hoverEffect="glow" />
          </div>
          <CodeBlock
            variants={{
              react: `<RangeSlider transition="fade" value={[20, 70]} />
<RangeSlider transition="slide-up" value={[20, 70]} />
<RangeSlider transition="slide-right" transitionDelay={100} value={[20, 70]} />
<RangeSlider transition="zoom" value={[20, 70]} />
<RangeSlider transition="flip" value={[20, 70]} />
<RangeSlider transition="blur" value={[20, 70]} />

<RangeSlider hoverEffect="lift" value={[20, 70]} />
<RangeSlider hoverEffect="scale" value={[20, 70]} />
<RangeSlider hoverEffect="glow" value={[20, 70]} />`,
              js: `<l-RangeSlider transition="fade"></l-RangeSlider>
<l-RangeSlider transition="slide-up"></l-RangeSlider>
<l-RangeSlider transition="slide-right" transitionDelay="100"></l-RangeSlider>
<l-RangeSlider transition="zoom"></l-RangeSlider>
<l-RangeSlider transition="flip"></l-RangeSlider>
<l-RangeSlider transition="blur"></l-RangeSlider>

<l-RangeSlider hoverEffect="lift"></l-RangeSlider>
<l-RangeSlider hoverEffect="scale"></l-RangeSlider>
<l-RangeSlider hoverEffect="glow"></l-RangeSlider>

<script type="module">
  import "lojee-ui/elements";

  // value is a [low, high] tuple, so assign it as a property.
  document.querySelectorAll("l-range-slider").forEach((el) => {
    el.value = [20, 70];
  });
</script>`,
              vue: `<template>
  <l-RangeSlider :value="value" transition="fade"></l-RangeSlider>
  <l-RangeSlider :value="value" transition="slide-up"></l-RangeSlider>
  <l-RangeSlider :value="value" transition="slide-right" transitionDelay="100"></l-RangeSlider>
  <l-RangeSlider :value="value" transition="zoom"></l-RangeSlider>
  <l-RangeSlider :value="value" transition="flip"></l-RangeSlider>
  <l-RangeSlider :value="value" transition="blur"></l-RangeSlider>

  <l-RangeSlider :value="value" hoverEffect="lift"></l-RangeSlider>
  <l-RangeSlider :value="value" hoverEffect="scale"></l-RangeSlider>
  <l-RangeSlider :value="value" hoverEffect="glow"></l-RangeSlider>
</template>

<script setup lang="ts">
import "lojee-ui/elements";

const value = [20, 70];
</script>`,
              angular: `// app.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "lojee-ui/elements";

@Component({
  selector: "app-root",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <l-RangeSlider [value]="value" transition="fade"></l-RangeSlider>
    <l-RangeSlider [value]="value" transition="slide-up"></l-RangeSlider>
    <l-RangeSlider [value]="value" transition="slide-right" transitionDelay="100"></l-RangeSlider>
    <l-RangeSlider [value]="value" transition="zoom"></l-RangeSlider>
    <l-RangeSlider [value]="value" transition="flip"></l-RangeSlider>
    <l-RangeSlider [value]="value" transition="blur"></l-RangeSlider>

    <l-RangeSlider [value]="value" hoverEffect="lift"></l-RangeSlider>
    <l-RangeSlider [value]="value" hoverEffect="scale"></l-RangeSlider>
    <l-RangeSlider [value]="value" hoverEffect="glow"></l-RangeSlider>
  \`,
})
export class AppComponent {
  value = [20, 70];
}`,
            }}
          />
        </section>
      </div>
    </div>
  );
}
