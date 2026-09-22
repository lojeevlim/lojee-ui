import { Switch } from "../Switch";
import CodeBlock from "../../CodeBlock";
import { SectionLabel, Row } from "../../ShowcaseHelpers";

export default function SwitchShowcase() {
  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Switch</h1>
          <p className="text-sm text-slate-500 mt-1">
            A styled toggle switch — a native checkbox input under the hood.
          </p>
        </div>

        <section>
          <SectionLabel sub="Off and on (defaultChecked).">Default</SectionLabel>
          <Row>
            <Switch />
            <Switch defaultChecked />
          </Row>
          <CodeBlock
            variants={{
              react: `<Switch />
<Switch defaultChecked />`,
              js: `<l-Switch />
<l-Switch defaultChecked />

<script type="module">
  import "lojee-ui/elements";
</script>`,
              vue: `<template>
  <l-Switch />
  <l-Switch defaultChecked />
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
    <l-Switch />
    <l-Switch defaultChecked />
  \`,
})
export class AppComponent {}`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="sm, md, lg.">Sizes</SectionLabel>
          <Row>
            <Switch size="sm" defaultChecked />
            <Switch size="md" defaultChecked />
            <Switch size="lg" defaultChecked />
          </Row>
          <CodeBlock
            variants={{
              react: `<Switch size="sm" defaultChecked />
<Switch size="md" defaultChecked />
<Switch size="lg" defaultChecked />`,
              js: `<l-Switch size="sm" defaultChecked />
<l-Switch size="md" defaultChecked />
<l-Switch size="lg" defaultChecked />`,
              vue: `<template>
  <l-Switch size="sm" defaultChecked />
  <l-Switch size="md" defaultChecked />
  <l-Switch size="lg" defaultChecked />
</template>`,
              angular: `<!-- app.component.html — same AppComponent as above -->
<l-Switch size="sm" defaultChecked />
<l-Switch size="md" defaultChecked />
<l-Switch size="lg" defaultChecked />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Same palette as Button.">Colors</SectionLabel>
          <Row>
            <Switch color="slate" defaultChecked />
            <Switch color="indigo" defaultChecked />
            <Switch color="emerald" defaultChecked />
            <Switch color="rose" defaultChecked />
            <Switch color="amber" defaultChecked />
          </Row>
          <CodeBlock
            variants={{
              react: `<Switch color="indigo" defaultChecked />
<Switch color="emerald" defaultChecked />
<Switch color="rose" defaultChecked />`,
              js: `<l-Switch color="indigo" defaultChecked />
<l-Switch color="emerald" defaultChecked />
<l-Switch color="rose" defaultChecked />`,
              vue: `<template>
  <l-Switch color="indigo" defaultChecked />
  <l-Switch color="emerald" defaultChecked />
  <l-Switch color="rose" defaultChecked />
</template>`,
              angular: `<!-- app.component.html — same AppComponent as above -->
<l-Switch color="indigo" defaultChecked />
<l-Switch color="emerald" defaultChecked />
<l-Switch color="rose" defaultChecked />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Non-interactive via the native disabled attribute.">Disabled</SectionLabel>
          <Row>
            <Switch disabled />
            <Switch disabled defaultChecked />
          </Row>
          <CodeBlock
            variants={{
              react: `<Switch disabled />
<Switch disabled defaultChecked />`,
              js: `<l-Switch disabled />
<l-Switch disabled defaultChecked />`,
              vue: `<template>
  <l-Switch disabled />
  <l-Switch disabled defaultChecked />
</template>`,
              angular: `<!-- app.component.html — same AppComponent as above -->
<l-Switch disabled />
<l-Switch disabled defaultChecked />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="An optional label prop rendered alongside the track.">With label</SectionLabel>
          <Row>
            <Switch label="Enable notifications" />
            <Switch label="Dark mode" defaultChecked color="indigo" />
          </Row>
          <CodeBlock
            variants={{
              react: `<Switch label="Enable notifications" />`,
              js: `<l-Switch label="Enable notifications" />`,
              vue: `<l-Switch label="Enable notifications" />`,
              angular: `<l-Switch label="Enable notifications" />`,
            }}
          />
        </section>
      </div>
    </div>
  );
}
