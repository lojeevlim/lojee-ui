import { TimePicker } from "../TimePicker";
import CodeBlock from "../../CodeBlock";
import { SectionLabel } from "../../ShowcaseHelpers";

export default function TimePickerShowcase() {
  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">TimePicker</h1>
          <p className="text-sm text-slate-500 mt-1">
            A styled native time input — the browser's own picker UI handles time selection.
          </p>
        </div>

        <section>
          <SectionLabel sub="A native input type=&quot;time&quot; with a leading icon.">Basic</SectionLabel>
          <div className="max-w-sm">
            <TimePicker />
          </div>
          <CodeBlock
            variants={{
              react: `<TimePicker />`,
              js: `<l-TimePicker />

<script type="module">
  import "lojee-ui/elements";
</script>`,
              vue: `<template>
  <l-TimePicker />
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
<l-TimePicker />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="sm, md, lg.">Sizes</SectionLabel>
          <div className="max-w-sm space-y-3">
            <TimePicker size="sm" />
            <TimePicker size="md" />
            <TimePicker size="lg" />
          </div>
          <CodeBlock
            variants={{
              react: `<TimePicker size="sm" />`,
              js: `<l-TimePicker size="sm" />`,
              vue: `<template>
  <l-TimePicker size="sm" />
</template>`,
              angular: `<!-- app.component.html -->
<l-TimePicker size="sm" />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Red border for error states.">Invalid</SectionLabel>
          <div className="max-w-sm">
            <TimePicker invalid />
          </div>
          <CodeBlock
            variants={{
              react: `<TimePicker invalid />`,
              js: `<l-TimePicker invalid />`,
              vue: `<template>
  <l-TimePicker invalid />
</template>`,
              angular: `<!-- app.component.html -->
<l-TimePicker invalid />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Standard native attributes like min/max/disabled pass through.">Disabled</SectionLabel>
          <div className="max-w-sm">
            <TimePicker disabled />
          </div>
          <CodeBlock
            variants={{
              react: `<TimePicker disabled />`,
              js: `<l-TimePicker disabled />`,
              vue: `<template>
  <l-TimePicker disabled />
</template>`,
              angular: `<!-- app.component.html -->
<l-TimePicker disabled />`,
            }}
          />
        </section>
      </div>
    </div>
  );
}
