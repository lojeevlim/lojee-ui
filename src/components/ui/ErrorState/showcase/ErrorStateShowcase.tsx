import { ErrorState } from "../ErrorState";
import { Button } from "../../Buttons/Button";
import CodeBlock from "../../CodeBlock";
import { SectionLabel, TransitionPreview } from "../../ShowcaseHelpers";

export default function ErrorStateShowcase() {
  return (
    <div>
      <div className="space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-fg">Error State</h1>
          <p className="text-sm text-fg-subtle mt-1">
            A rose-toned placeholder for a failed data fetch or action — an icon, a title, an optional description,
            and an optional retry action.
          </p>
        </div>

        <section>
          <SectionLabel sub="Uses the default title and icon.">Basic</SectionLabel>
          <ErrorState />
          <CodeBlock
            variants={{
              react: `<ErrorState />`,
              js: `<l-error-state ></l-error-state>

<script type="module">import "lojee-ui/elements";</script>`,
              vue: `<l-error-state />`,
              angular: `<l-error-state />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Add a description below the title for more context.">With description</SectionLabel>
          <ErrorState>We couldn't load your data. Please try again.</ErrorState>
          <CodeBlock
            variants={{
              react: `<ErrorState>\n  We couldn't load your data. Please try again.\n</ErrorState>`,
              js: `<l-error-state>
  We couldn't load your data. Please try again.
</l-error-state>

<script type="module">import "lojee-ui/elements";</script>`,
              vue: `<l-error-state>\n  We couldn't load your data. Please try again.\n</l-error-state>`,
              angular: `<l-error-state>\n  We couldn't load your data. Please try again.\n</l-error-state>`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Give people a way to recover with a retry action below the description.">
            With retry action
          </SectionLabel>
          <ErrorState action={<Button variant="destructive" icon="refresh-cw" label="Retry" />}>
            We couldn't load your data. Please try again.
          </ErrorState>
          <CodeBlock
            variants={{
              react: `<ErrorState
  action={<Button variant="destructive" icon="refresh-cw" label="Retry" onClick={handleRetry} />}
>
  We couldn't load your data. Please try again.
</ErrorState>`,
              js: `<l-error-state>
  We couldn't load your data. Please try again.
  <l-button slot="action" variant="destructive" icon="refresh-cw" label="Retry" id="retry-btn"></l-button>
</l-error-state>

<script type="module">
  import "lojee-ui/elements";

  document.getElementById("retry-btn").addEventListener("click", () => {
    /* retry the request */
  });
</script>`,
              vue: `<template>
  <l-error-state>
    We couldn't load your data. Please try again.
    <l-button slot="action" variant="destructive" icon="refresh-cw" label="Retry" @click="handleRetry" />
  </l-error-state>
</template>

<script setup lang="ts">
import "lojee-ui/elements";

const handleRetry = () => {
  /* retry the request */
};
</script>`,
              angular: `<!-- app.component.html -->
<l-error-state>
  We couldn't load your data. Please try again.
  <l-button slot="action" variant="destructive" icon="refresh-cw" label="Retry" (click)="handleRetry()" />
</l-error-state>`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Override the default title and icon for a more specific error.">
            Custom title &amp; icon
          </SectionLabel>
          <ErrorState title="Connection lost" icon="triangle-alert">
            Check your internet connection and try again.
          </ErrorState>
          <CodeBlock
            variants={{
              react: `<ErrorState title="Connection lost" icon="triangle-alert">\n  Check your internet connection and try again.\n</ErrorState>`,
              js: `<l-error-state title="Connection lost" icon="triangle-alert">
  Check your internet connection and try again.
</l-error-state>

<script type="module">import "lojee-ui/elements";</script>`,
              vue: `<l-error-state title="Connection lost" icon="triangle-alert">\n  Check your internet connection and try again.\n</l-error-state>`,
              angular: `<l-error-state title="Connection lost" icon="triangle-alert">\n  Check your internet connection and try again.\n</l-error-state>`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Enter transitions via `transition` (with `transitionDuration` / `transitionDelay`). They play on mount — reload the page, or use Replay in the playground.">Transitions</SectionLabel>
          <TransitionPreview layout="inline">
            <ErrorState title="Fade" transition="fade" className="w-56" />
            <ErrorState title="Slide up" transition="slide-up" className="w-56" />
            <ErrorState title="Slide right" transition="slide-right" transitionDelay={100} className="w-56" />
            <ErrorState title="Zoom" transition="zoom" className="w-56" />
            <ErrorState title="Flip" transition="flip" className="w-56" />
            <ErrorState title="Blur" transition="blur" className="w-56" />
            <ErrorState title="Bounce" transition="bounce" className="w-56" />
            <ErrorState title="Drop" transition="drop" transitionDuration={700} className="w-56" />
          </TransitionPreview>
          <CodeBlock
            variants={{
              react: `<ErrorState title="Fade" transition="fade" />
<ErrorState title="Slide up" transition="slide-up" />
<ErrorState title="Slide right" transition="slide-right" transitionDelay={100} />
<ErrorState title="Zoom" transition="zoom" />
<ErrorState title="Flip" transition="flip" />
<ErrorState title="Blur" transition="blur" />
<ErrorState title="Bounce" transition="bounce" />
<ErrorState title="Drop" transition="drop" transitionDuration={700} />`,
              js: `<l-error-state title="Fade" transition="fade"></l-error-state>
<l-error-state title="Slide up" transition="slide-up"></l-error-state>
<l-error-state title="Slide right" transition="slide-right" transitionDelay="100"></l-error-state>
<l-error-state title="Zoom" transition="zoom"></l-error-state>
<l-error-state title="Flip" transition="flip"></l-error-state>
<l-error-state title="Blur" transition="blur"></l-error-state>
<l-error-state title="Bounce" transition="bounce"></l-error-state>
<l-error-state title="Drop" transition="drop" transitionDuration="700"></l-error-state>

<script type="module">
  import "lojee-ui/elements";
</script>`,
              vue: `<template>
  <l-error-state title="Fade" transition="fade"></l-error-state>
  <l-error-state title="Slide up" transition="slide-up"></l-error-state>
  <l-error-state title="Slide right" transition="slide-right" transitionDelay="100"></l-error-state>
  <l-error-state title="Zoom" transition="zoom"></l-error-state>
  <l-error-state title="Flip" transition="flip"></l-error-state>
  <l-error-state title="Blur" transition="blur"></l-error-state>
  <l-error-state title="Bounce" transition="bounce"></l-error-state>
  <l-error-state title="Drop" transition="drop" transitionDuration="700"></l-error-state>
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
    <l-error-state title="Fade" transition="fade"></l-error-state>
    <l-error-state title="Slide up" transition="slide-up"></l-error-state>
    <l-error-state title="Slide right" transition="slide-right" transitionDelay="100"></l-error-state>
    <l-error-state title="Zoom" transition="zoom"></l-error-state>
    <l-error-state title="Flip" transition="flip"></l-error-state>
    <l-error-state title="Blur" transition="blur"></l-error-state>
    <l-error-state title="Bounce" transition="bounce"></l-error-state>
    <l-error-state title="Drop" transition="drop" transitionDuration="700"></l-error-state>
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
