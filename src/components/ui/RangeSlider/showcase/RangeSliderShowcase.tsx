import { useState } from "react";
import { RangeSlider } from "../RangeSlider";
import CodeBlock from "../../CodeBlock";
import { SectionLabel } from "../../ShowcaseHelpers";

export default function RangeSliderShowcase() {
  const [basic, setBasic] = useState<[number, number]>([20, 70]);
  const [colored, setColored] = useState<[number, number]>([30, 80]);
  const [priceRange, setPriceRange] = useState<[number, number]>([200, 750]);

  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">RangeSlider</h1>
          <p className="text-sm text-slate-500 mt-1">
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

<script setup>
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
      </div>
    </div>
  );
}
