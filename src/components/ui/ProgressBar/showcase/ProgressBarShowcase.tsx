import { ProgressBar } from "../ProgressBar";
import CodeBlock from "../../CodeBlock";
import { SectionLabel, TransitionPreview } from "../../ShowcaseHelpers";

export default function ProgressBarShowcase() {
  return (
    <div>
      <div className="space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-fg">Progress Bar</h1>
          <p className="text-sm text-fg-subtle mt-1">
            A simple, non-slotted progress indicator for showing determinate or indeterminate progress.
          </p>
        </div>

        <section>
          <SectionLabel sub="size controls the track height.">Sizes</SectionLabel>
          <div className="flex flex-col gap-4">
            <ProgressBar value={40} size="sm" />
            <ProgressBar value={60} size="md" />
            <ProgressBar value={80} size="lg" />
          </div>
          <CodeBlock
            variants={{
              react: `<ProgressBar value={40} size="sm" />
<ProgressBar value={60} size="md" />
<ProgressBar value={80} size="lg" />`,
              js: `<l-ProgressBar value="40" size="sm" />
<l-ProgressBar value="60" size="md" />
<l-ProgressBar value="80" size="lg" />

<script type="module">import "lojee-ui/elements";</script>`,
              vue: `<l-ProgressBar value="40" size="sm" />
<l-ProgressBar value="60" size="md" />
<l-ProgressBar value="80" size="lg" />`,
              angular: `<l-ProgressBar value="40" size="sm" />
<l-ProgressBar value="60" size="md" />
<l-ProgressBar value="80" size="lg" />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="color picks from the shared palette.">Colors</SectionLabel>
          <div className="flex flex-col gap-4">
            <ProgressBar value={70} color="indigo" />
            <ProgressBar value={55} color="emerald" />
            <ProgressBar value={30} color="rose" />
          </div>
          <CodeBlock
            variants={{
              react: `<ProgressBar value={70} color="indigo" />
<ProgressBar value={55} color="emerald" />
<ProgressBar value={30} color="rose" />`,
              js: `<l-ProgressBar value="70" color="indigo" />
<l-ProgressBar value="55" color="emerald" />
<l-ProgressBar value="30" color="rose" />

<script type="module">import "lojee-ui/elements";</script>`,
              vue: `<l-ProgressBar value="70" color="indigo" />
<l-ProgressBar value="55" color="emerald" />
<l-ProgressBar value="30" color="rose" />`,
              angular: `<l-ProgressBar value="70" color="indigo" />
<l-ProgressBar value="55" color="emerald" />
<l-ProgressBar value="30" color="rose" />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="A diagonal-stripe texture on the filled bar.">Striped</SectionLabel>
          <ProgressBar value={65} striped color="blue" />
          <CodeBlock
            variants={{
              react: `<ProgressBar value={65} striped color="blue" />`,
              js: `<l-ProgressBar value="65" striped color="blue" />

<script type="module">import "lojee-ui/elements";</script>`,
              vue: `<l-ProgressBar value="65" striped color="blue" />`,
              angular: `<l-ProgressBar value="65" striped color="blue" />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="An animated sweeping bar for unknown-duration loading.">Indeterminate</SectionLabel>
          <ProgressBar indeterminate />
          <CodeBlock
            variants={{
              react: `<ProgressBar indeterminate />`,
              js: `<l-ProgressBar indeterminate />

<script type="module">import "lojee-ui/elements";</script>`,
              vue: `<l-ProgressBar indeterminate />`,
              angular: `<l-ProgressBar indeterminate />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Shows the current percentage as text.">With label</SectionLabel>
          <ProgressBar value={45} showLabel color="violet" />
          <CodeBlock
            variants={{
              react: `<ProgressBar value={45} showLabel color="violet" />`,
              js: `<l-ProgressBar value="45" showLabel color="violet" />

<script type="module">import "lojee-ui/elements";</script>`,
              vue: `<l-ProgressBar value="45" showLabel color="violet" />`,
              angular: `<l-ProgressBar value="45" showLabel color="violet" />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Enter transitions via `transition` (with `transitionDuration` / `transitionDelay`). They play on mount — reload the page, or use Replay in the playground.">Transitions</SectionLabel>
          <div className="max-w-md"><TransitionPreview cols={1}>
            <ProgressBar value={60} transition="fade" />
            <ProgressBar value={60} transition="slide-down" />
            <ProgressBar value={60} transition="slide-right" transitionDelay={100} />
            <ProgressBar value={60} transition="zoom" />
            <ProgressBar value={60} transition="blur" />
            <ProgressBar value={60} transition="drop" transitionDuration={700} />
          </TransitionPreview></div>
          <CodeBlock
            variants={{
              react: `<ProgressBar value={60} transition="fade" />
<ProgressBar value={60} transition="slide-down" />
<ProgressBar value={60} transition="slide-right" transitionDelay={100} />
<ProgressBar value={60} transition="zoom" />
<ProgressBar value={60} transition="blur" />
<ProgressBar value={60} transition="drop" transitionDuration={700} />`,
              js: `<l-ProgressBar value="60" transition="fade"></l-ProgressBar>
<l-ProgressBar value="60" transition="slide-down"></l-ProgressBar>
<l-ProgressBar value="60" transition="slide-right" transitionDelay="100"></l-ProgressBar>
<l-ProgressBar value="60" transition="zoom"></l-ProgressBar>
<l-ProgressBar value="60" transition="blur"></l-ProgressBar>
<l-ProgressBar value="60" transition="drop" transitionDuration="700"></l-ProgressBar>

<script type="module">
  import "lojee-ui/elements";
</script>`,
              vue: `<template>
  <l-ProgressBar value="60" transition="fade"></l-ProgressBar>
  <l-ProgressBar value="60" transition="slide-down"></l-ProgressBar>
  <l-ProgressBar value="60" transition="slide-right" transitionDelay="100"></l-ProgressBar>
  <l-ProgressBar value="60" transition="zoom"></l-ProgressBar>
  <l-ProgressBar value="60" transition="blur"></l-ProgressBar>
  <l-ProgressBar value="60" transition="drop" transitionDuration="700"></l-ProgressBar>
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
    <l-ProgressBar value="60" transition="fade"></l-ProgressBar>
    <l-ProgressBar value="60" transition="slide-down"></l-ProgressBar>
    <l-ProgressBar value="60" transition="slide-right" transitionDelay="100"></l-ProgressBar>
    <l-ProgressBar value="60" transition="zoom"></l-ProgressBar>
    <l-ProgressBar value="60" transition="blur"></l-ProgressBar>
    <l-ProgressBar value="60" transition="drop" transitionDuration="700"></l-ProgressBar>
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
