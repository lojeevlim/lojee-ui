import { useState } from "react";
import { Combobox, type ComboboxOption } from "../Combobox";
import CodeBlock from "../../CodeBlock";
import { SectionLabel, TransitionPreview } from "../../ShowcaseHelpers";

const CITY_OPTIONS: ComboboxOption[] = [
  { label: "Tokyo", value: "tokyo" },
  { label: "Manila", value: "manila" },
  { label: "Singapore", value: "singapore" },
  { label: "Bangkok", value: "bangkok" },
  { label: "Seoul", value: "seoul" },
  { label: "Jakarta", value: "jakarta" },
  { label: "Kuala Lumpur", value: "kuala-lumpur" },
  { label: "Hong Kong", value: "hong-kong" },
];

export default function ComboboxShowcase() {
  const [city, setCity] = useState<string | undefined>("manila");
  const [empty, setEmpty] = useState<string | undefined>(undefined);
  const [tr, setTr] = useState<string | undefined>("manila");

  return (
    <div>
      <div className="space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-fg">Combobox</h1>
          <p className="text-sm text-fg-subtle mt-1">
            A single-select text input with a filtered, keyboard-navigable autocomplete dropdown.
          </p>
        </div>

        <section>
          <SectionLabel sub="Type to filter, use Arrow Up/Down + Enter to select.">Basic</SectionLabel>
          <div className="max-w-sm">
            <Combobox options={CITY_OPTIONS} value={city} onChange={setCity} placeholder="Search a city..." />
          </div>
          <CodeBlock
            variants={{
              react: `const [value, setValue] = useState<string | undefined>("manila");

<Combobox options={options} value={value} onChange={setValue} placeholder="Search a city..." />`,
              js: `<l-combobox id="city-combobox" placeholder="Search a city..."></l-combobox>

<script type="module">
  import "lojee-ui/elements";

  const options = [
    { label: "Tokyo", value: "tokyo" },
    { label: "Manila", value: "manila" },
    { label: "Singapore", value: "singapore" },
    { label: "Bangkok", value: "bangkok" },
    { label: "Seoul", value: "seoul" },
    { label: "Jakarta", value: "jakarta" },
    { label: "Kuala Lumpur", value: "kuala-lumpur" },
    { label: "Hong Kong", value: "hong-kong" },
  ];

  const combobox = document.getElementById("city-combobox");
  combobox.options = options;
  combobox.value = "manila";
  combobox.addEventListener("change", (e) => {
    combobox.value = e.detail;
  });
</script>`,
              vue: `<template>
  <l-combobox :options="options" :value="value" placeholder="Search a city..." @change="value = $event.detail" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import "lojee-ui/elements";

const options = [
  { label: "Tokyo", value: "tokyo" },
  { label: "Manila", value: "manila" },
  { label: "Singapore", value: "singapore" },
  { label: "Bangkok", value: "bangkok" },
  { label: "Seoul", value: "seoul" },
  { label: "Jakarta", value: "jakarta" },
  { label: "Kuala Lumpur", value: "kuala-lumpur" },
  { label: "Hong Kong", value: "hong-kong" },
];
const value = ref("manila");
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
  options = [
    { label: "Tokyo", value: "tokyo" },
    { label: "Manila", value: "manila" },
    { label: "Singapore", value: "singapore" },
    { label: "Bangkok", value: "bangkok" },
    { label: "Seoul", value: "seoul" },
    { label: "Jakarta", value: "jakarta" },
    { label: "Kuala Lumpur", value: "kuala-lumpur" },
    { label: "Hong Kong", value: "hong-kong" },
  ];
  value = "manila";
}

<!-- app.component.html -->
<l-combobox [options]="options" [value]="value" placeholder="Search a city..." (change)="value = $event.detail" />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="No value selected yet — filtering an empty query shows every option.">Empty state</SectionLabel>
          <div className="max-w-sm">
            <Combobox options={CITY_OPTIONS} value={empty} onChange={setEmpty} placeholder="Search a city..." />
          </div>
          <CodeBlock
            variants={{
              react: `<Combobox options={options} value={undefined} onChange={setValue} placeholder="Search a city..." />`,
              js: `<l-combobox id="city-combobox-empty" placeholder="Search a city..."></l-combobox>

<script type="module">
  const combobox = document.getElementById("city-combobox-empty");
  combobox.options = options; // same city options as above
  combobox.addEventListener("change", (e) => {
    combobox.value = e.detail;
  });
</script>`,
              vue: `<template>
  <l-combobox :options="options" placeholder="Search a city..." @change="value = $event.detail" />
</template>`,
              angular: `<!-- app.component.html — same AppComponent class as above, value left undefined -->
<l-combobox [options]="options" placeholder="Search a city..." (change)="value = $event.detail" />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Dropdown panel transitions via `transition` (with `transitionDuration` / `transitionDelay`) and hover effects on the field via `hoverEffect`. Open the dropdown to see the panel animate in and out.">Transitions</SectionLabel>
          <TransitionPreview cols={3}>
            <Combobox options={CITY_OPTIONS} value={tr} onChange={setTr} placeholder="Search a city..." transition="fade" />
            <Combobox options={CITY_OPTIONS} value={tr} onChange={setTr} placeholder="Search a city..." transition="slide-up" />
            <Combobox options={CITY_OPTIONS} value={tr} onChange={setTr} placeholder="Search a city..." transition="zoom" />
            <Combobox options={CITY_OPTIONS} value={tr} onChange={setTr} placeholder="Search a city..." transition="flip" />
            <Combobox options={CITY_OPTIONS} value={tr} onChange={setTr} placeholder="Search a city..." transition="slide-right" transitionDelay={100} />
            <Combobox options={CITY_OPTIONS} value={tr} onChange={setTr} placeholder="Search a city..." transition="bounce" transitionDuration={700} />
            <Combobox options={CITY_OPTIONS} value={tr} onChange={setTr} placeholder="Search a city..." hoverEffect="lift" />
            <Combobox options={CITY_OPTIONS} value={tr} onChange={setTr} placeholder="Search a city..." hoverEffect="glow" />
            <Combobox options={CITY_OPTIONS} value={tr} onChange={setTr} placeholder="Search a city..." hoverEffect="ring" />
          </TransitionPreview>
          <CodeBlock
            variants={{
              react: `const [value, setValue] = useState<string | undefined>("manila");

<Combobox options={options} value={value} onChange={setValue} placeholder="Search a city..." transition="fade" />
<Combobox options={options} value={value} onChange={setValue} placeholder="Search a city..." transition="slide-up" />
<Combobox options={options} value={value} onChange={setValue} placeholder="Search a city..." transition="zoom" />
<Combobox options={options} value={value} onChange={setValue} placeholder="Search a city..." transition="flip" />
<Combobox options={options} value={value} onChange={setValue} placeholder="Search a city..." transition="slide-right" transitionDelay={100} />
<Combobox options={options} value={value} onChange={setValue} placeholder="Search a city..." transition="bounce" transitionDuration={700} />
<Combobox options={options} value={value} onChange={setValue} placeholder="Search a city..." hoverEffect="lift" />
<Combobox options={options} value={value} onChange={setValue} placeholder="Search a city..." hoverEffect="glow" />
<Combobox options={options} value={value} onChange={setValue} placeholder="Search a city..." hoverEffect="ring" />`,
              js: `<l-combobox placeholder="Search a city..." transition="fade"></l-combobox>
<l-combobox placeholder="Search a city..." transition="slide-up"></l-combobox>
<l-combobox placeholder="Search a city..." transition="zoom"></l-combobox>
<l-combobox placeholder="Search a city..." transition="flip"></l-combobox>
<l-combobox placeholder="Search a city..." transition="slide-right" transitionDelay="100"></l-combobox>
<l-combobox placeholder="Search a city..." transition="bounce" transitionDuration="700"></l-combobox>
<l-combobox placeholder="Search a city..." hoverEffect="lift"></l-combobox>
<l-combobox placeholder="Search a city..." hoverEffect="glow"></l-combobox>
<l-combobox placeholder="Search a city..." hoverEffect="ring"></l-combobox>

<script type="module">
  import "lojee-ui/elements";

  const options = [
    { label: "Tokyo", value: "tokyo" },
    { label: "Manila", value: "manila" },
    { label: "Singapore", value: "singapore" },
    { label: "Bangkok", value: "bangkok" },
    { label: "Seoul", value: "seoul" },
    { label: "Jakarta", value: "jakarta" },
    { label: "Kuala Lumpur", value: "kuala-lumpur" },
    { label: "Hong Kong", value: "hong-kong" },
  ];

  document.querySelectorAll("l-Combobox").forEach((el) => {
    el.options = options;
  el.value = "manila";
  });
</script>`,
              vue: `<template>
  <l-combobox :options="options" :value="value" placeholder="Search a city..." transition="fade"></l-combobox>
  <l-combobox :options="options" :value="value" placeholder="Search a city..." transition="slide-up"></l-combobox>
  <l-combobox :options="options" :value="value" placeholder="Search a city..." transition="zoom"></l-combobox>
  <l-combobox :options="options" :value="value" placeholder="Search a city..." transition="flip"></l-combobox>
  <l-combobox :options="options" :value="value" placeholder="Search a city..." transition="slide-right" transitionDelay="100"></l-combobox>
  <l-combobox :options="options" :value="value" placeholder="Search a city..." transition="bounce" transitionDuration="700"></l-combobox>
  <l-combobox :options="options" :value="value" placeholder="Search a city..." hoverEffect="lift"></l-combobox>
  <l-combobox :options="options" :value="value" placeholder="Search a city..." hoverEffect="glow"></l-combobox>
  <l-combobox :options="options" :value="value" placeholder="Search a city..." hoverEffect="ring"></l-combobox>
</template>

<script setup lang="ts">
import "lojee-ui/elements";

const options = [
  { label: "Tokyo", value: "tokyo" },
  { label: "Manila", value: "manila" },
  { label: "Singapore", value: "singapore" },
  { label: "Bangkok", value: "bangkok" },
  { label: "Seoul", value: "seoul" },
  { label: "Jakarta", value: "jakarta" },
  { label: "Kuala Lumpur", value: "kuala-lumpur" },
  { label: "Hong Kong", value: "hong-kong" },
];
const value = "manila";
</script>`,
              angular: `// app.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "lojee-ui/elements";

@Component({
  selector: "app-root",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <l-combobox [options]="options" [value]="value" placeholder="Search a city..." transition="fade"></l-combobox>
    <l-combobox [options]="options" [value]="value" placeholder="Search a city..." transition="slide-up"></l-combobox>
    <l-combobox [options]="options" [value]="value" placeholder="Search a city..." transition="zoom"></l-combobox>
    <l-combobox [options]="options" [value]="value" placeholder="Search a city..." transition="flip"></l-combobox>
    <l-combobox [options]="options" [value]="value" placeholder="Search a city..." transition="slide-right" transitionDelay="100"></l-combobox>
    <l-combobox [options]="options" [value]="value" placeholder="Search a city..." transition="bounce" transitionDuration="700"></l-combobox>
    <l-combobox [options]="options" [value]="value" placeholder="Search a city..." hoverEffect="lift"></l-combobox>
    <l-combobox [options]="options" [value]="value" placeholder="Search a city..." hoverEffect="glow"></l-combobox>
    <l-combobox [options]="options" [value]="value" placeholder="Search a city..." hoverEffect="ring"></l-combobox>
  \`,
})
export class AppComponent {
  options = [
    { label: "Tokyo", value: "tokyo" },
    { label: "Manila", value: "manila" },
    { label: "Singapore", value: "singapore" },
    { label: "Bangkok", value: "bangkok" },
    { label: "Seoul", value: "seoul" },
    { label: "Jakarta", value: "jakarta" },
    { label: "Kuala Lumpur", value: "kuala-lumpur" },
    { label: "Hong Kong", value: "hong-kong" },
  ];
  value = "manila";
}`,
            }}
          />
        </section>
      </div>
    </div>
  );
}
