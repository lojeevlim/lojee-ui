import { Spinner } from "../Spinner";
import CodeBlock from "../../CodeBlock";
import { SectionLabel, Row, TransitionPreview } from "../../ShowcaseHelpers";

export default function SpinnerShowcase() {
  return (
    <div className="min-h-screen rounded-xl bg-surface p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-fg">Spinner</h1>
          <p className="text-sm text-fg-subtle mt-1">
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
              js: `<l-Spinner size="md" />

<script type="module">
  import "lojee-ui/elements";
</script>`,
              vue: `<template>
  <l-Spinner size="md" />
</template>

<script setup lang="ts">
import "lojee-ui/elements";
</script>`,
              angular: `// spinner-showcase.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "lojee-ui/elements";

@Component({
  selector: "app-spinner-showcase",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`<l-Spinner size="md" />\`,
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
              js: `<l-Spinner color="indigo" />`,
              vue: `<template>
  <l-Spinner color="indigo" />
</template>`,
              angular: `<!-- reuses SpinnerShowcaseComponent from above -->
<l-Spinner color="indigo" />`,
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
              js: `<l-Spinner variant="circle" color="indigo" />
<l-Spinner variant="dots" color="indigo" />
<l-Spinner variant="ring" color="indigo" />
<l-Spinner variant="bars" color="indigo" />
<l-Spinner variant="pulse" color="indigo" />`,
              vue: `<template>
  <l-Spinner variant="circle" color="indigo" />
  <l-Spinner variant="dots" color="indigo" />
  <l-Spinner variant="ring" color="indigo" />
  <l-Spinner variant="bars" color="indigo" />
  <l-Spinner variant="pulse" color="indigo" />
</template>`,
              angular: `<!-- reuses SpinnerShowcaseComponent from above -->
<l-Spinner variant="circle" color="indigo" />
<l-Spinner variant="dots" color="indigo" />
<l-Spinner variant="ring" color="indigo" />
<l-Spinner variant="bars" color="indigo" />
<l-Spinner variant="pulse" color="indigo" />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Enter transitions via `transition` (with `transitionDuration` / `transitionDelay`). They play on mount — reload the page, or use Replay in the playground.">Transitions</SectionLabel>
          <TransitionPreview layout="inline">
            <Spinner variant="circle" transition="fade" />
            <Spinner variant="dots" transition="zoom" />
            <Spinner variant="ring" transition="blur" />
            <Spinner variant="bars" transition="bounce" />
            <Spinner variant="pulse" transition="slide-up" transitionDelay={100} />
            <Spinner variant="circle" transition="drop" transitionDuration={700} />
          </TransitionPreview>
          <CodeBlock
            variants={{
              react: `<Spinner variant="circle" transition="fade" />
<Spinner variant="dots" transition="zoom" />
<Spinner variant="ring" transition="blur" />
<Spinner variant="bars" transition="bounce" />
<Spinner variant="pulse" transition="slide-up" transitionDelay={100} />
<Spinner variant="circle" transition="drop" transitionDuration={700} />`,
              js: `<l-Spinner variant="circle" transition="fade"></l-Spinner>
<l-Spinner variant="dots" transition="zoom"></l-Spinner>
<l-Spinner variant="ring" transition="blur"></l-Spinner>
<l-Spinner variant="bars" transition="bounce"></l-Spinner>
<l-Spinner variant="pulse" transition="slide-up" transitionDelay="100"></l-Spinner>
<l-Spinner variant="circle" transition="drop" transitionDuration="700"></l-Spinner>

<script type="module">
  import "lojee-ui/elements";
</script>`,
              vue: `<template>
  <l-Spinner variant="circle" transition="fade"></l-Spinner>
  <l-Spinner variant="dots" transition="zoom"></l-Spinner>
  <l-Spinner variant="ring" transition="blur"></l-Spinner>
  <l-Spinner variant="bars" transition="bounce"></l-Spinner>
  <l-Spinner variant="pulse" transition="slide-up" transitionDelay="100"></l-Spinner>
  <l-Spinner variant="circle" transition="drop" transitionDuration="700"></l-Spinner>
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
    <l-Spinner variant="circle" transition="fade"></l-Spinner>
    <l-Spinner variant="dots" transition="zoom"></l-Spinner>
    <l-Spinner variant="ring" transition="blur"></l-Spinner>
    <l-Spinner variant="bars" transition="bounce"></l-Spinner>
    <l-Spinner variant="pulse" transition="slide-up" transitionDelay="100"></l-Spinner>
    <l-Spinner variant="circle" transition="drop" transitionDuration="700"></l-Spinner>
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
