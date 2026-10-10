import { LoadingState } from "../LoadingState";
import CodeBlock from "../../CodeBlock";
import { SectionLabel, Row, TransitionPreview } from "../../ShowcaseHelpers";

export default function LoadingStateShowcase() {
  return (
    <div>
      <div className="space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-fg">Loading State</h1>
          <p className="text-sm text-fg-subtle mt-1">
            A placeholder for a section that's still loading — a spinner, a title, and an optional description.
          </p>
        </div>

        <section>
          <SectionLabel sub="Uses the default title.">Basic</SectionLabel>
          <LoadingState />
          <CodeBlock
            variants={{
              react: `<LoadingState />`,
              js: `<l-loading-state ></l-loading-state>

<script type="module">import "lojee-ui/elements";</script>`,
              vue: `<l-loading-state />`,
              angular: `<l-loading-state />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Add a description below the title for more context.">With description</SectionLabel>
          <LoadingState title="Fetching your data">This should only take a moment.</LoadingState>
          <CodeBlock
            variants={{
              react: `<LoadingState title="Fetching your data">\n  This should only take a moment.\n</LoadingState>`,
              js: `<l-loading-state title="Fetching your data">
  This should only take a moment.
</l-loading-state>

<script type="module">import "lojee-ui/elements";</script>`,
              vue: `<l-loading-state title="Fetching your data">\n  This should only take a moment.\n</l-loading-state>`,
              angular: `<l-loading-state title="Fetching your data">\n  This should only take a moment.\n</l-loading-state>`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Three sizes, mapped onto Spinner's own size scale.">Sizes</SectionLabel>
          <Row>
            <LoadingState size="sm" title="Loading" />
            <LoadingState size="md" title="Loading" />
            <LoadingState size="lg" title="Loading" />
          </Row>
          <CodeBlock
            variants={{
              react: `<LoadingState size="sm" title="Loading" />
<LoadingState size="md" title="Loading" />
<LoadingState size="lg" title="Loading" />`,
              js: `<l-loading-state size="sm" title="Loading"></l-loading-state>
<l-loading-state size="md" title="Loading"></l-loading-state>
<l-loading-state size="lg" title="Loading"></l-loading-state>

<script type="module">import "lojee-ui/elements";</script>`,
              vue: `<l-loading-state size="sm" title="Loading" />
<l-loading-state size="md" title="Loading" />
<l-loading-state size="lg" title="Loading" />`,
              angular: `<l-loading-state size="sm" title="Loading" />
<l-loading-state size="md" title="Loading" />
<l-loading-state size="lg" title="Loading" />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Enter transitions via `transition` (with `transitionDuration` / `transitionDelay`). They play on mount — reload the page, or use Replay in the playground.">Transitions</SectionLabel>
          <TransitionPreview layout="inline">
            <LoadingState title="Fade" transition="fade" className="w-56" />
            <LoadingState title="Slide up" transition="slide-up" className="w-56" />
            <LoadingState title="Slide right" transition="slide-right" transitionDelay={100} className="w-56" />
            <LoadingState title="Zoom" transition="zoom" className="w-56" />
            <LoadingState title="Flip" transition="flip" className="w-56" />
            <LoadingState title="Blur" transition="blur" className="w-56" />
            <LoadingState title="Bounce" transition="bounce" className="w-56" />
            <LoadingState title="Drop" transition="drop" transitionDuration={700} className="w-56" />
          </TransitionPreview>
          <CodeBlock
            variants={{
              react: `<LoadingState title="Fade" transition="fade" />
<LoadingState title="Slide up" transition="slide-up" />
<LoadingState title="Slide right" transition="slide-right" transitionDelay={100} />
<LoadingState title="Zoom" transition="zoom" />
<LoadingState title="Flip" transition="flip" />
<LoadingState title="Blur" transition="blur" />
<LoadingState title="Bounce" transition="bounce" />
<LoadingState title="Drop" transition="drop" transitionDuration={700} />`,
              js: `<l-loading-state title="Fade" transition="fade"></l-loading-state>
<l-loading-state title="Slide up" transition="slide-up"></l-loading-state>
<l-loading-state title="Slide right" transition="slide-right" transitionDelay="100"></l-loading-state>
<l-loading-state title="Zoom" transition="zoom"></l-loading-state>
<l-loading-state title="Flip" transition="flip"></l-loading-state>
<l-loading-state title="Blur" transition="blur"></l-loading-state>
<l-loading-state title="Bounce" transition="bounce"></l-loading-state>
<l-loading-state title="Drop" transition="drop" transitionDuration="700"></l-loading-state>

<script type="module">
  import "lojee-ui/elements";
</script>`,
              vue: `<template>
  <l-loading-state title="Fade" transition="fade"></l-loading-state>
  <l-loading-state title="Slide up" transition="slide-up"></l-loading-state>
  <l-loading-state title="Slide right" transition="slide-right" transitionDelay="100"></l-loading-state>
  <l-loading-state title="Zoom" transition="zoom"></l-loading-state>
  <l-loading-state title="Flip" transition="flip"></l-loading-state>
  <l-loading-state title="Blur" transition="blur"></l-loading-state>
  <l-loading-state title="Bounce" transition="bounce"></l-loading-state>
  <l-loading-state title="Drop" transition="drop" transitionDuration="700"></l-loading-state>
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
    <l-loading-state title="Fade" transition="fade"></l-loading-state>
    <l-loading-state title="Slide up" transition="slide-up"></l-loading-state>
    <l-loading-state title="Slide right" transition="slide-right" transitionDelay="100"></l-loading-state>
    <l-loading-state title="Zoom" transition="zoom"></l-loading-state>
    <l-loading-state title="Flip" transition="flip"></l-loading-state>
    <l-loading-state title="Blur" transition="blur"></l-loading-state>
    <l-loading-state title="Bounce" transition="bounce"></l-loading-state>
    <l-loading-state title="Drop" transition="drop" transitionDuration="700"></l-loading-state>
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
