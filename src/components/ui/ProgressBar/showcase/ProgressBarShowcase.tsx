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
              js: `<l-ProgressBar value="40" size="sm"></l-ProgressBar>
<l-ProgressBar value="60" size="md"></l-ProgressBar>
<l-ProgressBar value="80" size="lg"></l-ProgressBar>

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
          <SectionLabel sub="Every bar follows the theme accent — change the accent from the top bar and they all update.">Colors</SectionLabel>
          <div className="flex flex-col gap-4">
            <ProgressBar value={70} />
            <ProgressBar value={55} />
            <ProgressBar value={30} />
          </div>
          <CodeBlock
            variants={{
              react: `<ProgressBar value={70} />
<ProgressBar value={55} />
<ProgressBar value={30} />`,
              js: `<l-ProgressBar value="70"></l-ProgressBar>
<l-ProgressBar value="55"></l-ProgressBar>
<l-ProgressBar value="30"></l-ProgressBar>

<script type="module">import "lojee-ui/elements";</script>`,
              vue: `<l-ProgressBar value="70" />
<l-ProgressBar value="55" />
<l-ProgressBar value="30" />`,
              angular: `<l-ProgressBar value="70" />
<l-ProgressBar value="55" />
<l-ProgressBar value="30" />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="A diagonal-stripe texture on the filled bar.">Striped</SectionLabel>
          <ProgressBar value={65} striped />
          <CodeBlock
            variants={{
              react: `<ProgressBar value={65} striped />`,
              js: `<l-ProgressBar value="65" striped></l-ProgressBar>

<script type="module">import "lojee-ui/elements";</script>`,
              vue: `<l-ProgressBar value="65" striped />`,
              angular: `<l-ProgressBar value="65" striped />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="An animated sweeping bar for unknown-duration loading.">Indeterminate</SectionLabel>
          <ProgressBar indeterminate />
          <CodeBlock
            variants={{
              react: `<ProgressBar indeterminate />`,
              js: `<l-ProgressBar indeterminate></l-ProgressBar>

<script type="module">import "lojee-ui/elements";</script>`,
              vue: `<l-ProgressBar indeterminate />`,
              angular: `<l-ProgressBar indeterminate />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Shows the current percentage as text.">With label</SectionLabel>
          <ProgressBar value={45} showLabel />
          <CodeBlock
            variants={{
              react: `<ProgressBar value={45} showLabel />`,
              js: `<l-ProgressBar value="45" showLabel></l-ProgressBar>

<script type="module">import "lojee-ui/elements";</script>`,
              vue: `<l-ProgressBar value="45" showLabel />`,
              angular: `<l-ProgressBar value="45" showLabel />`,
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
