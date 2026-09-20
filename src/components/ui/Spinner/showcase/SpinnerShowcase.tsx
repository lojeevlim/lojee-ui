import { Spinner } from "../Spinner";
import CodeBlock from "../../CodeBlock";
import { SectionLabel, Row } from "../../ShowcaseHelpers";

export default function SpinnerShowcase() {
  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Spinner</h1>
          <p className="text-sm text-slate-500 mt-1">
            Inline loading indicators — five variants, from a spinning icon to a pulsing dot.
          </p>
        </div>

        <section>
          <SectionLabel sub="xs through xl.">Sizes</SectionLabel>
          <Row>
            <Spinner size="xs" />
            <Spinner size="sm" />
            <Spinner size="md" />
            <Spinner size="lg" />
            <Spinner size="xl" />
          </Row>
          <CodeBlock
            variants={{
              react: `<Spinner size="md" />`,
              js: `<Spinner size="md" />

<script type="module">
  import "lojee-ui/elements";
</script>`,
              vue: `<template>
  <Spinner size="md" />
</template>

<script setup>
import "lojee-ui/elements";
</script>`,
              angular: `// spinner-showcase.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "lojee-ui/elements";

@Component({
  selector: "app-spinner-showcase",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`<Spinner size="md" />\`,
})
export class SpinnerShowcaseComponent {}`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Same color palette as Button.">Colors</SectionLabel>
          <Row>
            <Spinner color="slate" />
            <Spinner color="indigo" />
            <Spinner color="emerald" />
            <Spinner color="rose" />
            <Spinner color="amber" />
          </Row>
          <CodeBlock
            variants={{
              react: `<Spinner color="indigo" />`,
              js: `<Spinner color="indigo" />`,
              vue: `<template>
  <Spinner color="indigo" />
</template>`,
              angular: `<!-- reuses SpinnerShowcaseComponent from above -->
<Spinner color="indigo" />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="circle, dots, ring, bars, or pulse.">Variant</SectionLabel>
          <Row>
            <Spinner variant="circle" color="indigo" size="lg" />
            <Spinner variant="dots" color="indigo" size="lg" />
            <Spinner variant="ring" color="indigo" size="lg" />
            <Spinner variant="bars" color="indigo" size="lg" />
            <Spinner variant="pulse" color="indigo" size="lg" />
          </Row>
          <CodeBlock
            variants={{
              react: `<Spinner variant="circle" color="indigo" />
<Spinner variant="dots" color="indigo" />
<Spinner variant="ring" color="indigo" />
<Spinner variant="bars" color="indigo" />
<Spinner variant="pulse" color="indigo" />`,
              js: `<Spinner variant="circle" color="indigo" />
<Spinner variant="dots" color="indigo" />
<Spinner variant="ring" color="indigo" />
<Spinner variant="bars" color="indigo" />
<Spinner variant="pulse" color="indigo" />`,
              vue: `<template>
  <Spinner variant="circle" color="indigo" />
  <Spinner variant="dots" color="indigo" />
  <Spinner variant="ring" color="indigo" />
  <Spinner variant="bars" color="indigo" />
  <Spinner variant="pulse" color="indigo" />
</template>`,
              angular: `<!-- reuses SpinnerShowcaseComponent from above -->
<Spinner variant="circle" color="indigo" />
<Spinner variant="dots" color="indigo" />
<Spinner variant="ring" color="indigo" />
<Spinner variant="bars" color="indigo" />
<Spinner variant="pulse" color="indigo" />`,
            }}
          />
        </section>
      </div>
    </div>
  );
}
