import { SuccessState } from "../SuccessState";
import { Button } from "../../Buttons/Button";
import CodeBlock from "../../CodeBlock";
import { SectionLabel, TransitionPreview } from "../../ShowcaseHelpers";

export default function SuccessStateShowcase() {
  return (
    <div>
      <div className="space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-fg">Success State</h1>
          <p className="text-sm text-fg-subtle mt-1">
            An emerald-toned placeholder for a completed action — an icon, a title, an optional description, and an
            optional action.
          </p>
        </div>

        <section>
          <SectionLabel sub="Uses the default title and icon.">Basic</SectionLabel>
          <SuccessState />
          <CodeBlock
            variants={{
              react: `<SuccessState />`,
              js: `<l-success-state ></l-success-state>

<script type="module">import "lojee-ui/elements";</script>`,
              vue: `<l-success-state />`,
              angular: `<l-success-state />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Add a description below the title for more context.">With description</SectionLabel>
          <SuccessState>Your payment was processed successfully.</SuccessState>
          <CodeBlock
            variants={{
              react: `<SuccessState>\n  Your payment was processed successfully.\n</SuccessState>`,
              js: `<l-success-state>
  Your payment was processed successfully.
</l-success-state>

<script type="module">import "lojee-ui/elements";</script>`,
              vue: `<l-success-state>\n  Your payment was processed successfully.\n</l-success-state>`,
              angular: `<l-success-state>\n  Your payment was processed successfully.\n</l-success-state>`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Give people a next step with an action below the description.">With action</SectionLabel>
          <SuccessState title="You're all set" action={<Button label="View details" />}>
            Your account has been created successfully.
          </SuccessState>
          <CodeBlock
            variants={{
              react: `<SuccessState
  title="You're all set"
  action={<Button label="View details" onClick={handleViewDetails} />}
>
  Your account has been created successfully.
</SuccessState>`,
              js: `<l-success-state title="You're all set">
  Your account has been created successfully.
  <l-button slot="action" label="View details" id="view-details-btn"></l-button>
</l-success-state>

<script type="module">
  import "lojee-ui/elements";

  document.getElementById("view-details-btn").addEventListener("click", () => {
    /* navigate to details */
  });
</script>`,
              vue: `<template>
  <l-success-state title="You're all set">
    Your account has been created successfully.
    <l-button slot="action" label="View details" @click="handleViewDetails" />
  </l-success-state>
</template>

<script setup lang="ts">
import "lojee-ui/elements";

const handleViewDetails = () => {
  /* navigate to details */
};
</script>`,
              angular: `<!-- app.component.html -->
<l-success-state title="You're all set">
  Your account has been created successfully.
  <l-button slot="action" label="View details" (click)="handleViewDetails()" />
</l-success-state>`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Override the default title for a more specific confirmation.">Custom title</SectionLabel>
          <SuccessState title="Changes saved">Your changes have been saved and applied.</SuccessState>
          <CodeBlock
            variants={{
              react: `<SuccessState title="Changes saved">\n  Your changes have been saved and applied.\n</SuccessState>`,
              js: `<l-success-state title="Changes saved">
  Your changes have been saved and applied.
</l-success-state>

<script type="module">import "lojee-ui/elements";</script>`,
              vue: `<l-success-state title="Changes saved">\n  Your changes have been saved and applied.\n</l-success-state>`,
              angular: `<l-success-state title="Changes saved">\n  Your changes have been saved and applied.\n</l-success-state>`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Enter transitions via `transition` (with `transitionDuration` / `transitionDelay`). They play on mount — reload the page, or use Replay in the playground.">Transitions</SectionLabel>
          <TransitionPreview layout="inline">
            <SuccessState title="Fade" transition="fade" className="w-56" />
            <SuccessState title="Slide up" transition="slide-up" className="w-56" />
            <SuccessState title="Slide right" transition="slide-right" transitionDelay={100} className="w-56" />
            <SuccessState title="Zoom" transition="zoom" className="w-56" />
            <SuccessState title="Flip" transition="flip" className="w-56" />
            <SuccessState title="Blur" transition="blur" className="w-56" />
            <SuccessState title="Bounce" transition="bounce" className="w-56" />
            <SuccessState title="Drop" transition="drop" transitionDuration={700} className="w-56" />
          </TransitionPreview>
          <CodeBlock
            variants={{
              react: `<SuccessState title="Fade" transition="fade" />
<SuccessState title="Slide up" transition="slide-up" />
<SuccessState title="Slide right" transition="slide-right" transitionDelay={100} />
<SuccessState title="Zoom" transition="zoom" />
<SuccessState title="Flip" transition="flip" />
<SuccessState title="Blur" transition="blur" />
<SuccessState title="Bounce" transition="bounce" />
<SuccessState title="Drop" transition="drop" transitionDuration={700} />`,
              js: `<l-success-state title="Fade" transition="fade"></l-success-state>
<l-success-state title="Slide up" transition="slide-up"></l-success-state>
<l-success-state title="Slide right" transition="slide-right" transitionDelay="100"></l-success-state>
<l-success-state title="Zoom" transition="zoom"></l-success-state>
<l-success-state title="Flip" transition="flip"></l-success-state>
<l-success-state title="Blur" transition="blur"></l-success-state>
<l-success-state title="Bounce" transition="bounce"></l-success-state>
<l-success-state title="Drop" transition="drop" transitionDuration="700"></l-success-state>

<script type="module">
  import "lojee-ui/elements";
</script>`,
              vue: `<template>
  <l-success-state title="Fade" transition="fade"></l-success-state>
  <l-success-state title="Slide up" transition="slide-up"></l-success-state>
  <l-success-state title="Slide right" transition="slide-right" transitionDelay="100"></l-success-state>
  <l-success-state title="Zoom" transition="zoom"></l-success-state>
  <l-success-state title="Flip" transition="flip"></l-success-state>
  <l-success-state title="Blur" transition="blur"></l-success-state>
  <l-success-state title="Bounce" transition="bounce"></l-success-state>
  <l-success-state title="Drop" transition="drop" transitionDuration="700"></l-success-state>
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
    <l-success-state title="Fade" transition="fade"></l-success-state>
    <l-success-state title="Slide up" transition="slide-up"></l-success-state>
    <l-success-state title="Slide right" transition="slide-right" transitionDelay="100"></l-success-state>
    <l-success-state title="Zoom" transition="zoom"></l-success-state>
    <l-success-state title="Flip" transition="flip"></l-success-state>
    <l-success-state title="Blur" transition="blur"></l-success-state>
    <l-success-state title="Bounce" transition="bounce"></l-success-state>
    <l-success-state title="Drop" transition="drop" transitionDuration="700"></l-success-state>
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
