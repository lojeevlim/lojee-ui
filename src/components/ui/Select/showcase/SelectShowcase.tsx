import { Select } from "../Select";
import CodeBlock from "../../CodeBlock";
import { SectionLabel, Row } from "../../ShowcaseHelpers";

const FRUITS = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Cherry", value: "cherry", disabled: true },
  { label: "Durian", value: "durian" },
];

export default function SelectShowcase() {
  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Select</h1>
          <p className="text-sm text-slate-500 mt-1">A styled native select, for accessible and robust dropdowns.</p>
        </div>

        <section>
          <SectionLabel sub="A disabled, pre-selected option shown until a choice is made.">Placeholder</SectionLabel>
          <div className="max-w-sm">
            <Select options={FRUITS} placeholder="Choose a fruit" />
          </div>
          <CodeBlock
            variants={{
              react: `<Select options={options} placeholder="Choose a fruit" />`,
              js: `<l-Select id="fruit-select" placeholder="Choose a fruit" />

<script type="module">
  import "lojee-ui/elements";

  // options must be set via real DOM property assignment, not an attribute
  document.getElementById("fruit-select").options = [
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
    { label: "Cherry", value: "cherry", disabled: true },
    { label: "Durian", value: "durian" },
  ];
</script>`,
              vue: `<template>
  <l-Select :options="options" placeholder="Choose a fruit" />
</template>

<script setup lang="ts">
import "lojee-ui/elements";

const options = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Cherry", value: "cherry", disabled: true },
  { label: "Durian", value: "durian" },
];
</script>`,
              angular: `// app.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "lojee-ui/elements";

@Component({
  selector: "app-root",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <l-Select [options]="options" placeholder="Choose a fruit" />
  \`,
})
export class AppComponent {
  options = [
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
    { label: "Cherry", value: "cherry", disabled: true },
    { label: "Durian", value: "durian" },
  ];
}`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="sm, md, lg.">Sizes</SectionLabel>
          <div className="max-w-sm space-y-3">
            <Select options={FRUITS} size="sm" placeholder="Small" />
            <Select options={FRUITS} size="md" placeholder="Medium" />
            <Select options={FRUITS} size="lg" placeholder="Large" />
          </div>
          <CodeBlock
            variants={{
              react: `<Select options={options} size="sm" placeholder="Small" />`,
              js: `<l-Select size="sm" placeholder="Small" />
<!-- .options set via DOM property assignment — see the Placeholder example above -->`,
              vue: `<l-Select :options="options" size="sm" placeholder="Small" />`,
              angular: `<l-Select [options]="options" size="sm" placeholder="Small" />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Red border for error states.">Invalid</SectionLabel>
          <div className="max-w-sm">
            <Select options={FRUITS} placeholder="Choose a fruit" invalid />
          </div>
          <CodeBlock
            variants={{
              react: `<Select options={options} placeholder="Choose a fruit" invalid />`,
              js: `<l-Select placeholder="Choose a fruit" invalid />
<!-- .options set via DOM property assignment — see the Placeholder example above -->`,
              vue: `<l-Select :options="options" placeholder="Choose a fruit" invalid />`,
              angular: `<l-Select [options]="options" placeholder="Choose a fruit" invalid />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Individual options can be disabled.">Disabled option</SectionLabel>
          <Row>
            <div className="max-w-sm">
              <Select options={FRUITS} placeholder="Choose a fruit" />
            </div>
          </Row>
          <CodeBlock
            variants={{
              react: `const options = [
  { label: "Apple", value: "apple" },
  { label: "Cherry", value: "cherry", disabled: true },
];`,
              js: `selectEl.options = [
  { label: "Apple", value: "apple" },
  { label: "Cherry", value: "cherry", disabled: true },
];`,
              vue: `const options = [
  { label: "Apple", value: "apple" },
  { label: "Cherry", value: "cherry", disabled: true },
];`,
              angular: `options = [
  { label: "Apple", value: "apple" },
  { label: "Cherry", value: "cherry", disabled: true },
];`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="The whole select can be disabled.">Disabled</SectionLabel>
          <div className="max-w-sm">
            <Select options={FRUITS} placeholder="Choose a fruit" disabled />
          </div>
          <CodeBlock
            variants={{
              react: `<Select options={options} placeholder="Choose a fruit" disabled />`,
              js: `<l-Select placeholder="Choose a fruit" disabled />
<!-- .options set via DOM property assignment — see the Placeholder example above -->`,
              vue: `<l-Select :options="options" placeholder="Choose a fruit" disabled />`,
              angular: `<l-Select [options]="options" placeholder="Choose a fruit" disabled />`,
            }}
          />
        </section>
      </div>
    </div>
  );
}
