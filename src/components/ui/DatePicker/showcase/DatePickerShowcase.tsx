import { useState } from "react";
import { DatePicker } from "../DatePicker";
import { DateRangePicker } from "../DateRangePicker";
import CodeBlock from "../../CodeBlock";
import { SectionLabel, TransitionPreview } from "../../ShowcaseHelpers";

export default function DatePickerShowcase() {
  const [clearableValue, setClearableValue] = useState("2026-06-15");
  const [rangeStart, setRangeStart] = useState("2026-06-01");
  const [rangeEnd, setRangeEnd] = useState("2026-06-14");
  const [presetStart, setPresetStart] = useState("");
  const [presetEnd, setPresetEnd] = useState("");

  return (
    <div>
      <div className="space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-fg">DatePicker</h1>
          <p className="text-sm text-fg-subtle mt-1">
            A styled native date input — the browser's own picker UI handles date selection. Plus a{" "}
            <code className="text-xs">DateRangePicker</code> for start/end ranges.
          </p>
        </div>

        <section>
          <SectionLabel sub="A native input type=&quot;date&quot; with a leading icon.">Basic</SectionLabel>
          <div className="max-w-sm">
            <DatePicker />
          </div>
          <CodeBlock
            variants={{
              react: `<DatePicker />`,
              js: `<l-date-picker ></l-date-picker>

<script type="module">
  import "lojee-ui/elements";
</script>`,
              vue: `<template>
  <l-date-picker />
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
<l-date-picker />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="outline (default), filled, underline.">Variants</SectionLabel>
          <div className="max-w-sm space-y-3">
            <div>
              <p className="mb-1.5 font-mono text-xs text-fg-subtle">outline</p>
              <DatePicker variant="outline" />
            </div>
            <div>
              <p className="mb-1.5 font-mono text-xs text-fg-subtle">filled</p>
              <DatePicker variant="filled" />
            </div>
            <div>
              <p className="mb-1.5 font-mono text-xs text-fg-subtle">underline</p>
              <DatePicker variant="underline" />
            </div>
          </div>
          <CodeBlock
            variants={{
              react: `<DatePicker variant="outline" />
<DatePicker variant="filled" />
<DatePicker variant="underline" />`,
              js: `<l-date-picker variant="outline"></l-date-picker>
<l-date-picker variant="filled"></l-date-picker>
<l-date-picker variant="underline"></l-date-picker>`,
              vue: `<template>
  <l-date-picker variant="outline" />
  <l-date-picker variant="filled" />
  <l-date-picker variant="underline" />
</template>`,
              angular: `<!-- app.component.html -->
<l-date-picker variant="outline" />
<l-date-picker variant="filled" />
<l-date-picker variant="underline" />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="sm, md, lg.">Sizes</SectionLabel>
          <div className="max-w-sm space-y-3">
            <DatePicker size="sm" />
            <DatePicker size="md" />
            <DatePicker size="lg" />
          </div>
          <CodeBlock
            variants={{
              react: `<DatePicker size="sm" />`,
              js: `<l-date-picker size="sm"></l-date-picker>`,
              vue: `<template>
  <l-date-picker size="sm" />
</template>`,
              angular: `<!-- app.component.html -->
<l-date-picker size="sm" />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Shown when value is set and onClear is provided.">With clear button</SectionLabel>
          <div className="max-w-sm">
            <DatePicker value={clearableValue} onChange={(e) => setClearableValue(e.target.value)} onClear={() => setClearableValue("")} />
          </div>
          <CodeBlock
            variants={{
              react: `const [value, setValue] = useState("2026-06-15");

<DatePicker value={value} onChange={(e) => setValue(e.target.value)} onClear={() => setValue("")} />`,
              js: `<l-date-picker id="date-field"></l-date-picker>

<script type="module">
  const picker = document.getElementById("date-field");
  picker.value = "2026-06-15";
  picker.addEventListener("input", (e) => {
    picker.value = e.target.value;
  });
  picker.addEventListener("clear", () => {
    picker.value = "";
  });
</script>`,
              vue: `<template>
  <l-date-picker :value="value" @input="value = $event.target.value" @clear="value = ''" />
</template>

<script setup lang="ts">
import { ref } from "vue";

const value = ref("2026-06-15");
</script>`,
              angular: `// app.component.ts (relevant property, added to the AppComponent class above)
value = "2026-06-15";

<!-- app.component.html -->
<l-date-picker [value]="value" (input)="value = $event.target.value" (clear)="value = ''" />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Red border for error states.">Invalid</SectionLabel>
          <div className="max-w-sm">
            <DatePicker invalid />
          </div>
          <CodeBlock
            variants={{
              react: `<DatePicker invalid />`,
              js: `<l-date-picker invalid></l-date-picker>`,
              vue: `<template>
  <l-date-picker invalid />
</template>`,
              angular: `<!-- app.component.html -->
<l-date-picker invalid />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Standard native attributes like min/max/disabled pass through.">Disabled</SectionLabel>
          <div className="max-w-sm">
            <DatePicker disabled />
          </div>
          <CodeBlock
            variants={{
              react: `<DatePicker disabled />`,
              js: `<l-date-picker disabled></l-date-picker>`,
              vue: `<template>
  <l-date-picker disabled />
</template>`,
              angular: `<!-- app.component.html -->
<l-date-picker disabled />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Two native date inputs sharing one field — each constrains the other's range.">
            Range
          </SectionLabel>
          <div className="max-w-md">
            <DateRangePicker
              startValue={rangeStart}
              endValue={rangeEnd}
              onStartChange={setRangeStart}
              onEndChange={setRangeEnd}
            />
          </div>
          <CodeBlock
            variants={{
              react: `const [start, setStart] = useState("2026-06-01");
const [end, setEnd] = useState("2026-06-14");

<DateRangePicker startValue={start} endValue={end} onStartChange={setStart} onEndChange={setEnd} />`,
              js: `<l-date-range-picker id="range-picker"></l-date-range-picker>

<script type="module">
  const range = document.getElementById("range-picker");
  range.startValue = "2026-06-01";
  range.endValue = "2026-06-14";
  range.addEventListener("startchange", (e) => {
    range.startValue = e.detail;
  });
  range.addEventListener("endchange", (e) => {
    range.endValue = e.detail;
  });
</script>`,
              vue: `<template>
  <l-date-range-picker
    :startValue="start"
    :endValue="end"
    @startchange="start = $event.detail"
    @endchange="end = $event.detail"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";

const start = ref("2026-06-01");
const end = ref("2026-06-14");
</script>`,
              angular: `// app.component.ts (relevant properties, added to the AppComponent class above)
start = "2026-06-01";
end = "2026-06-14";

<!-- app.component.html -->
<l-date-range-picker
  [startValue]="start"
  [endValue]="end"
  (startchange)="start = $event.detail"
  (endchange)="end = $event.detail"
 />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Quick-select buttons below the inputs.">Range with presets</SectionLabel>
          <div className="max-w-md">
            <DateRangePicker
              startValue={presetStart}
              endValue={presetEnd}
              onStartChange={setPresetStart}
              onEndChange={setPresetEnd}
              variant="filled"
              presets={[
                { label: "Last 7 days", range: ["2026-06-08", "2026-06-14"] },
                { label: "Last 30 days", range: ["2026-05-15", "2026-06-14"] },
                { label: "This month", range: ["2026-06-01", "2026-06-30"] },
              ]}
            />
          </div>
          <CodeBlock
            variants={{
              react: `<DateRangePicker
  startValue={start}
  endValue={end}
  onStartChange={setStart}
  onEndChange={setEnd}
  variant="filled"
  presets={[
    { label: "Last 7 days", range: ["2026-06-08", "2026-06-14"] },
    { label: "Last 30 days", range: ["2026-05-15", "2026-06-14"] },
    { label: "This month", range: ["2026-06-01", "2026-06-30"] },
  ]}
/>`,
              js: `<l-date-range-picker id="preset-range-picker" variant="filled"></l-date-range-picker>

<script type="module">
  const rangeWithPresets = document.getElementById("preset-range-picker");
  rangeWithPresets.startValue = "";
  rangeWithPresets.endValue = "";
  rangeWithPresets.presets = [
    { label: "Last 7 days", range: ["2026-06-08", "2026-06-14"] },
    { label: "Last 30 days", range: ["2026-05-15", "2026-06-14"] },
    { label: "This month", range: ["2026-06-01", "2026-06-30"] },
  ];
  rangeWithPresets.addEventListener("startchange", (e) => {
    rangeWithPresets.startValue = e.detail;
  });
  rangeWithPresets.addEventListener("endchange", (e) => {
    rangeWithPresets.endValue = e.detail;
  });
</script>`,
              vue: `<template>
  <l-date-range-picker
    :startValue="start"
    :endValue="end"
    variant="filled"
    :presets="presets"
    @startchange="start = $event.detail"
    @endchange="end = $event.detail"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";

const start = ref("");
const end = ref("");
const presets = [
  { label: "Last 7 days", range: ["2026-06-08", "2026-06-14"] },
  { label: "Last 30 days", range: ["2026-05-15", "2026-06-14"] },
  { label: "This month", range: ["2026-06-01", "2026-06-30"] },
];
</script>`,
              angular: `// app.component.ts (relevant properties, added to the AppComponent class above)
start = "";
end = "";
presets = [
  { label: "Last 7 days", range: ["2026-06-08", "2026-06-14"] },
  { label: "Last 30 days", range: ["2026-05-15", "2026-06-14"] },
  { label: "This month", range: ["2026-06-01", "2026-06-30"] },
];

<!-- app.component.html -->
<l-date-range-picker
  [startValue]="start"
  [endValue]="end"
  variant="filled"
  [presets]="presets"
  (startchange)="start = $event.detail"
  (endchange)="end = $event.detail"
 />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Enter transitions via `transition` (with `transitionDuration` / `transitionDelay`) and hover effects via `hoverEffect`. They play on mount — reload the page, or use Replay in the playground.">Transitions</SectionLabel>
          <div className="max-w-2xl"><TransitionPreview cols={2}>
            <DatePicker transition="fade" />
            <DatePicker transition="slide-up" />
            <DatePicker transition="slide-right" transitionDelay={100} />
            <DatePicker transition="zoom" />
            <DatePicker transition="flip" />
            <DatePicker transition="blur" />
            <DatePicker transition="bounce" />
            <DatePicker transition="drop" transitionDuration={700} />
            <DatePicker hoverEffect="lift" />
            <DatePicker hoverEffect="glow" />
            <DatePicker hoverEffect="ring" />
          </TransitionPreview></div>
          <CodeBlock
            variants={{
              react: `<DatePicker transition="fade" />
<DatePicker transition="slide-up" />
<DatePicker transition="slide-right" transitionDelay={100} />
<DatePicker transition="zoom" />
<DatePicker transition="flip" />
<DatePicker transition="blur" />
<DatePicker transition="bounce" />
<DatePicker transition="drop" transitionDuration={700} />

<DatePicker hoverEffect="lift" />
<DatePicker hoverEffect="glow" />
<DatePicker hoverEffect="ring" />`,
              js: `<l-date-picker transition="fade"></l-date-picker>
<l-date-picker transition="slide-up"></l-date-picker>
<l-date-picker transition="slide-right" transitionDelay="100"></l-date-picker>
<l-date-picker transition="zoom"></l-date-picker>
<l-date-picker transition="flip"></l-date-picker>
<l-date-picker transition="blur"></l-date-picker>
<l-date-picker transition="bounce"></l-date-picker>
<l-date-picker transition="drop" transitionDuration="700"></l-date-picker>

<l-date-picker hoverEffect="lift"></l-date-picker>
<l-date-picker hoverEffect="glow"></l-date-picker>
<l-date-picker hoverEffect="ring"></l-date-picker>

<script type="module">
  import "lojee-ui/elements";
</script>`,
              vue: `<template>
  <l-date-picker transition="fade"></l-date-picker>
  <l-date-picker transition="slide-up"></l-date-picker>
  <l-date-picker transition="slide-right" transitionDelay="100"></l-date-picker>
  <l-date-picker transition="zoom"></l-date-picker>
  <l-date-picker transition="flip"></l-date-picker>
  <l-date-picker transition="blur"></l-date-picker>
  <l-date-picker transition="bounce"></l-date-picker>
  <l-date-picker transition="drop" transitionDuration="700"></l-date-picker>

  <l-date-picker hoverEffect="lift"></l-date-picker>
  <l-date-picker hoverEffect="glow"></l-date-picker>
  <l-date-picker hoverEffect="ring"></l-date-picker>
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
    <l-date-picker transition="fade"></l-date-picker>
    <l-date-picker transition="slide-up"></l-date-picker>
    <l-date-picker transition="slide-right" transitionDelay="100"></l-date-picker>
    <l-date-picker transition="zoom"></l-date-picker>
    <l-date-picker transition="flip"></l-date-picker>
    <l-date-picker transition="blur"></l-date-picker>
    <l-date-picker transition="bounce"></l-date-picker>
    <l-date-picker transition="drop" transitionDuration="700"></l-date-picker>

    <l-date-picker hoverEffect="lift"></l-date-picker>
    <l-date-picker hoverEffect="glow"></l-date-picker>
    <l-date-picker hoverEffect="ring"></l-date-picker>
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
