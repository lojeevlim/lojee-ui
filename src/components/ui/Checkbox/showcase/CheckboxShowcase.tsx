import { Checkbox } from "../Checkbox";
import CodeBlock from "../../CodeBlock";
import { SectionLabel, Row } from "../../ShowcaseHelpers";

export default function CheckboxShowcase() {
  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Checkbox</h1>
          <p className="text-sm text-slate-500 mt-1">
            A styled wrapper around a native checkbox input — fully keyboard/screen-reader operable.
          </p>
        </div>

        <section>
          <SectionLabel sub="Unchecked and checked (defaultChecked).">Default</SectionLabel>
          <Row>
            <Checkbox />
            <Checkbox defaultChecked />
          </Row>
          <CodeBlock
            variants={{
              react: `<Checkbox />
<Checkbox defaultChecked />`,
              js: `<Checkbox />
<Checkbox defaultChecked />

<script type="module">
  import "lojee-ui/elements";
</script>`,
              vue: `<template>
  <Checkbox />
  <Checkbox defaultChecked />
</template>

<script setup>
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
    <Checkbox />
    <Checkbox defaultChecked />
  \`,
})
export class AppComponent {}`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Same palette as Button.">Colors</SectionLabel>
          <Row>
            <Checkbox color="slate" defaultChecked />
            <Checkbox color="indigo" defaultChecked />
            <Checkbox color="emerald" defaultChecked />
            <Checkbox color="rose" defaultChecked />
            <Checkbox color="amber" defaultChecked />
          </Row>
          <CodeBlock
            variants={{
              react: `<Checkbox color="indigo" defaultChecked />
<Checkbox color="emerald" defaultChecked />
<Checkbox color="rose" defaultChecked />`,
              js: `<Checkbox color="indigo" defaultChecked />
<Checkbox color="emerald" defaultChecked />
<Checkbox color="rose" defaultChecked />`,
              vue: `<template>
  <Checkbox color="indigo" defaultChecked />
  <Checkbox color="emerald" defaultChecked />
  <Checkbox color="rose" defaultChecked />
</template>`,
              angular: `<!-- app.component.html — same AppComponent as above -->
<Checkbox color="indigo" defaultChecked />
<Checkbox color="emerald" defaultChecked />
<Checkbox color="rose" defaultChecked />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Non-interactive via the native disabled attribute.">Disabled</SectionLabel>
          <Row>
            <Checkbox disabled />
            <Checkbox disabled defaultChecked />
          </Row>
          <CodeBlock
            variants={{
              react: `<Checkbox disabled />
<Checkbox disabled defaultChecked />`,
              js: `<Checkbox disabled />
<Checkbox disabled defaultChecked />`,
              vue: `<template>
  <Checkbox disabled />
  <Checkbox disabled defaultChecked />
</template>`,
              angular: `<!-- app.component.html — same AppComponent as above -->
<Checkbox disabled />
<Checkbox disabled defaultChecked />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="An optional label prop rendered alongside the box.">With label</SectionLabel>
          <Row>
            <Checkbox label="Accept terms and conditions" />
            <Checkbox label="Subscribe to newsletter" defaultChecked color="indigo" />
          </Row>
          <CodeBlock
            variants={{
              react: `<Checkbox label="Accept terms and conditions" />`,
              js: `<Checkbox label="Accept terms and conditions" />`,
              vue: `<Checkbox label="Accept terms and conditions" />`,
              angular: `<Checkbox label="Accept terms and conditions" />`,
            }}
          />
        </section>
      </div>
    </div>
  );
}
