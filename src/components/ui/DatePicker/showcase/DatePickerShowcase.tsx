import { useState } from "react";
import { DatePicker } from "../DatePicker";
import { DateRangePicker } from "../DateRangePicker";
import CodeBlock from "../../CodeBlock";
import { SectionLabel } from "../../ShowcaseHelpers";

export default function DatePickerShowcase() {
  const [clearableValue, setClearableValue] = useState("2026-06-15");
  const [rangeStart, setRangeStart] = useState("2026-06-01");
  const [rangeEnd, setRangeEnd] = useState("2026-06-14");
  const [presetStart, setPresetStart] = useState("");
  const [presetEnd, setPresetEnd] = useState("");

  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">DatePicker</h1>
          <p className="text-sm text-slate-500 mt-1">
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
              js: `<DatePicker />

<script type="module">
  import "lojee-ui/elements";
</script>`,
              vue: `<template>
  <DatePicker />
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
<DatePicker />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="outline (default), filled, underline.">Variants</SectionLabel>
          <div className="max-w-sm space-y-3">
            <DatePicker variant="outline" />
            <DatePicker variant="filled" />
            <DatePicker variant="underline" />
          </div>
          <CodeBlock
            variants={{
              react: `<DatePicker variant="outline" />
<DatePicker variant="filled" />
<DatePicker variant="underline" />`,
              js: `<DatePicker variant="outline" />
<DatePicker variant="filled" />
<DatePicker variant="underline" />`,
              vue: `<template>
  <DatePicker variant="outline" />
  <DatePicker variant="filled" />
  <DatePicker variant="underline" />
</template>`,
              angular: `<!-- app.component.html -->
<DatePicker variant="outline" />
<DatePicker variant="filled" />
<DatePicker variant="underline" />`,
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
              js: `<DatePicker size="sm" />`,
              vue: `<template>
  <DatePicker size="sm" />
</template>`,
              angular: `<!-- app.component.html -->
<DatePicker size="sm" />`,
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
              js: `<DatePicker id="date-field" />

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
  <DatePicker :value="value" @input="value = $event.target.value" @clear="value = ''" />
</template>

<script setup>
import { ref } from "vue";

const value = ref("2026-06-15");
</script>`,
              angular: `// app.component.ts (relevant property, added to the AppComponent class above)
value = "2026-06-15";

<!-- app.component.html -->
<DatePicker [value]="value" (input)="value = $event.target.value" (clear)="value = ''" />`,
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
              js: `<DatePicker invalid />`,
              vue: `<template>
  <DatePicker invalid />
</template>`,
              angular: `<!-- app.component.html -->
<DatePicker invalid />`,
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
              js: `<DatePicker disabled />`,
              vue: `<template>
  <DatePicker disabled />
</template>`,
              angular: `<!-- app.component.html -->
<DatePicker disabled />`,
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
              js: `<DateRangePicker id="range-picker" />

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
  <DateRangePicker
    :startValue="start"
    :endValue="end"
    @startchange="start = $event.detail"
    @endchange="end = $event.detail"
  />
</template>

<script setup>
import { ref } from "vue";

const start = ref("2026-06-01");
const end = ref("2026-06-14");
</script>`,
              angular: `// app.component.ts (relevant properties, added to the AppComponent class above)
start = "2026-06-01";
end = "2026-06-14";

<!-- app.component.html -->
<DateRangePicker
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
              js: `<DateRangePicker id="preset-range-picker" variant="filled" />

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
  <DateRangePicker
    :startValue="start"
    :endValue="end"
    variant="filled"
    :presets="presets"
    @startchange="start = $event.detail"
    @endchange="end = $event.detail"
  />
</template>

<script setup>
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
<DateRangePicker
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
      </div>
    </div>
  );
}
