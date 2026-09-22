import { Tabs } from "../Tabs";
import CodeBlock from "../../CodeBlock";
import { SectionLabel } from "../../ShowcaseHelpers";

export default function TabsShowcase() {
  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Tabs</h1>
          <p className="text-sm text-slate-500 mt-1">A self-contained, data-driven tabbed panel.</p>
        </div>

        <section>
          <SectionLabel sub="A plain list of tabs, each with its own content.">Basic</SectionLabel>
          <Tabs
            tabs={[
              { label: "Overview", content: <p className="text-sm text-slate-600">A quick summary of the project.</p> },
              { label: "Activity", content: <p className="text-sm text-slate-600">Recent activity shows up here.</p> },
              { label: "Settings", content: <p className="text-sm text-slate-600">Adjust your preferences.</p> },
            ]}
          />
          <CodeBlock
            variants={{
              react: `<Tabs
  tabs={[
    { label: "Overview", content: <p>A quick summary of the project.</p> },
    { label: "Activity", content: <p>Recent activity shows up here.</p> },
    { label: "Settings", content: <p>Adjust your preferences.</p> },
  ]}
/>`,
              js: `<l-Tabs id="basic-tabs" />

<script type="module">
  import "lojee-ui/elements";

  document.getElementById("basic-tabs").tabs = [
    { label: "Overview", content: "A quick summary of the project." },
    { label: "Activity", content: "Recent activity shows up here." },
    { label: "Settings", content: "Adjust your preferences." },
  ];
</script>`,
              vue: `<template>
  <l-Tabs :tabs="tabs" />
</template>

<script setup lang="ts">
import "lojee-ui/elements";

const tabs = [
  { label: "Overview", content: "A quick summary of the project." },
  { label: "Activity", content: "Recent activity shows up here." },
  { label: "Settings", content: "Adjust your preferences." },
];
</script>`,
              angular: `// app.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "lojee-ui/elements";

@Component({
  selector: "app-root",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`<l-Tabs [tabs]="tabs" />\`,
})
export class AppComponent {
  tabs = [
    { label: "Overview", content: "A quick summary of the project." },
    { label: "Activity", content: "Recent activity shows up here." },
    { label: "Settings", content: "Adjust your preferences." },
  ];
}`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="A tab can be disabled and skipped over.">Disabled tab</SectionLabel>
          <Tabs
            tabs={[
              { label: "Plan", content: <p className="text-sm text-slate-600">Choose your plan.</p> },
              { label: "Billing", content: <p className="text-sm text-slate-600">Billing details.</p>, disabled: true },
              { label: "Review", content: <p className="text-sm text-slate-600">Review and confirm.</p> },
            ]}
          />
          <CodeBlock
            variants={{
              react: `<Tabs
  tabs={[
    { label: "Plan", content: <p>Choose your plan.</p> },
    { label: "Billing", content: <p>Billing details.</p>, disabled: true },
    { label: "Review", content: <p>Review and confirm.</p> },
  ]}
/>`,
              js: `<l-Tabs id="disabled-tabs" />

<script type="module">
  document.getElementById("disabled-tabs").tabs = [
    { label: "Plan", content: "Choose your plan." },
    { label: "Billing", content: "Billing details.", disabled: true },
    { label: "Review", content: "Review and confirm." },
  ];
</script>`,
              vue: `<template>
  <l-Tabs :tabs="tabs" />
</template>

<script setup lang="ts">
const tabs = [
  { label: "Plan", content: "Choose your plan." },
  { label: "Billing", content: "Billing details.", disabled: true },
  { label: "Review", content: "Review and confirm." },
];
</script>`,
              angular: `// app.component.ts (same component as above, with its own \`tabs\` array)
tabs = [
  { label: "Plan", content: "Choose your plan." },
  { label: "Billing", content: "Billing details.", disabled: true },
  { label: "Review", content: "Review and confirm." },
];

// app.component.html
<l-Tabs [tabs]="tabs" />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="The active tab's underline/text follows `color`.">Color</SectionLabel>
          <Tabs
            color="indigo"
            defaultIndex={1}
            tabs={[
              { label: "Details", content: <p className="text-sm text-slate-600">Item details.</p> },
              { label: "Reviews", content: <p className="text-sm text-slate-600">What people are saying.</p> },
              { label: "Shipping", content: <p className="text-sm text-slate-600">Shipping and returns.</p> },
            ]}
          />
          <CodeBlock
            variants={{
              react: `<Tabs
  color="indigo"
  defaultIndex={1}
  tabs={[
    { label: "Details", content: <p>Item details.</p> },
    { label: "Reviews", content: <p>What people are saying.</p> },
    { label: "Shipping", content: <p>Shipping and returns.</p> },
  ]}
/>`,
              js: `<l-Tabs id="color-tabs" color="indigo" defaultIndex="1" />

<script type="module">
  document.getElementById("color-tabs").tabs = [
    { label: "Details", content: "Item details." },
    { label: "Reviews", content: "What people are saying." },
    { label: "Shipping", content: "Shipping and returns." },
  ];
</script>`,
              vue: `<template>
  <l-Tabs :tabs="tabs" color="indigo" defaultIndex="1" />
</template>

<script setup lang="ts">
const tabs = [
  { label: "Details", content: "Item details." },
  { label: "Reviews", content: "What people are saying." },
  { label: "Shipping", content: "Shipping and returns." },
];
</script>`,
              angular: `// app.component.ts (same component as above, with its own \`tabs\` array)
tabs = [
  { label: "Details", content: "Item details." },
  { label: "Reviews", content: "What people are saying." },
  { label: "Shipping", content: "Shipping and returns." },
];

// app.component.html
<l-Tabs [tabs]="tabs" color="indigo" defaultIndex="1" />`,
            }}
          />
        </section>
      </div>
    </div>
  );
}
