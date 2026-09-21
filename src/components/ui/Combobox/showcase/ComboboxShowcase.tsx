import { useState } from "react";
import { Combobox, type ComboboxOption } from "../Combobox";
import CodeBlock from "../../CodeBlock";
import { SectionLabel } from "../../ShowcaseHelpers";

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

  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Combobox</h1>
          <p className="text-sm text-slate-500 mt-1">
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
              js: `<l-Combobox id="city-combobox" placeholder="Search a city..." />

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
  <l-Combobox :options="options" :value="value" placeholder="Search a city..." @change="value = $event.detail" />
</template>

<script setup>
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
<l-Combobox [options]="options" [value]="value" placeholder="Search a city..." (change)="value = $event.detail" />`,
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
              js: `<l-Combobox id="city-combobox-empty" placeholder="Search a city..." />

<script type="module">
  const combobox = document.getElementById("city-combobox-empty");
  combobox.options = options; // same city options as above
  combobox.addEventListener("change", (e) => {
    combobox.value = e.detail;
  });
</script>`,
              vue: `<template>
  <l-Combobox :options="options" placeholder="Search a city..." @change="value = $event.detail" />
</template>`,
              angular: `<!-- app.component.html — same AppComponent class as above, value left undefined -->
<l-Combobox [options]="options" placeholder="Search a city..." (change)="value = $event.detail" />`,
            }}
          />
        </section>
      </div>
    </div>
  );
}
