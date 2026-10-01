import { useState } from "react";
import { Alert } from "../Alert";
import CodeBlock from "../../CodeBlock";
import { SectionLabel, TransitionPreview } from "../../ShowcaseHelpers";

export default function AlertShowcase() {
  const [closableVisible, setClosableVisible] = useState(true);

  return (
    <div>
      <div className="space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-fg">Alert</h1>
          <p className="text-sm text-fg-subtle mt-1">
            An inline, non-dismissing-by-default banner message for surfacing status, feedback, or warnings inline
            in a page.
          </p>
        </div>

        <section>
          <SectionLabel sub="Each variant carries its own color treatment and default icon.">Variants</SectionLabel>
          <div className="flex flex-col gap-3">
            <Alert variant="info" title="Heads up">
              This is an informational message.
            </Alert>
            <Alert variant="success" title="Saved">
              Your changes have been saved.
            </Alert>
            <Alert variant="warning" title="Careful">
              This action may have unintended side effects.
            </Alert>
            <Alert variant="error" title="Something went wrong">
              We couldn't process your request. Please try again.
            </Alert>
          </div>
          <CodeBlock
            variants={{
              react: `<Alert variant="info" title="Heads up">This is an informational message.</Alert>
<Alert variant="success" title="Saved">Your changes have been saved.</Alert>
<Alert variant="warning" title="Careful">This action may have unintended side effects.</Alert>
<Alert variant="error" title="Something went wrong">We couldn't process your request. Please try again.</Alert>`,
              js: `<l-Alert variant="info" title="Heads up">This is an informational message.</l-Alert>
<l-Alert variant="success" title="Saved">Your changes have been saved.</l-Alert>
<l-Alert variant="warning" title="Careful">This action may have unintended side effects.</l-Alert>
<l-Alert variant="error" title="Something went wrong">We couldn't process your request. Please try again.</l-Alert>

<script type="module">import "lojee-ui/elements";</script>`,
              vue: `<l-Alert variant="info" title="Heads up">This is an informational message.</l-Alert>
<l-Alert variant="success" title="Saved">Your changes have been saved.</l-Alert>
<l-Alert variant="warning" title="Careful">This action may have unintended side effects.</l-Alert>
<l-Alert variant="error" title="Something went wrong">We couldn't process your request. Please try again.</l-Alert>`,
              angular: `<l-Alert variant="info" title="Heads up">This is an informational message.</l-Alert>
<l-Alert variant="success" title="Saved">Your changes have been saved.</l-Alert>
<l-Alert variant="warning" title="Careful">This action may have unintended side effects.</l-Alert>
<l-Alert variant="error" title="Something went wrong">We couldn't process your request. Please try again.</l-Alert>`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Title is optional — omit it for a compact, single-line alert.">Without a title</SectionLabel>
          <Alert variant="info">A new version is available. Refresh to update.</Alert>
          <CodeBlock
            variants={{
              react: `<Alert variant="info">A new version is available. Refresh to update.</Alert>`,
              js: `<l-Alert variant="info">A new version is available. Refresh to update.</l-Alert>

<script type="module">import "lojee-ui/elements";</script>`,
              vue: `<l-Alert variant="info">A new version is available. Refresh to update.</l-Alert>`,
              angular: `<l-Alert variant="info">A new version is available. Refresh to update.</l-Alert>`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Set closable and handle onClose to let the user dismiss it.">Closable</SectionLabel>
          {closableVisible ? (
            <Alert variant="warning" title="Unsaved changes" closable onClose={() => setClosableVisible(false)}>
              You have unsaved changes that will be lost if you navigate away.
            </Alert>
          ) : (
            <button
              type="button"
              onClick={() => setClosableVisible(true)}
              className="text-sm font-medium text-fg-subtle underline underline-offset-4 hover:text-fg-muted"
            >
              Show alert again
            </button>
          )}
          <CodeBlock
            variants={{
              react: `const [visible, setVisible] = useState(true);

{visible && (
  <Alert variant="warning" title="Unsaved changes" closable onClose={() => setVisible(false)}>
    You have unsaved changes that will be lost if you navigate away.
  </Alert>
)}`,
              js: `<l-Alert variant="warning" title="Unsaved changes" closable id="unsaved-alert">
  You have unsaved changes that will be lost if you navigate away.
</l-Alert>

<script type="module">
  import "lojee-ui/elements";

  document.getElementById("unsaved-alert")
    .addEventListener("close", (e) => { e.target.remove(); });
</script>`,
              vue: `<template>
  <l-Alert
    v-if="visible"
    variant="warning"
    title="Unsaved changes"
    closable
    @close="visible = false"
  >
    You have unsaved changes that will be lost if you navigate away.
  </l-Alert>
</template>

<script setup lang="ts">
import { ref } from "vue";
import "lojee-ui/elements";

const visible = ref(true);
</script>`,
              angular: `<l-Alert
  *ngIf="visible"
  variant="warning"
  title="Unsaved changes"
  closable
  (close)="visible = false"
>
  You have unsaved changes that will be lost if you navigate away.
</l-Alert>`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Override the default per-variant icon, or hide it entirely.">Custom icon</SectionLabel>
          <div className="flex flex-col gap-3">
            <Alert variant="info" title="New feature" icon="bell">
              We just shipped keyboard shortcuts. Press "?" to see them.
            </Alert>
            <Alert variant="info" title="No icon" icon={false}>
              This alert renders without a leading icon.
            </Alert>
          </div>
          <CodeBlock
            variants={{
              react: `<Alert variant="info" title="New feature" icon="bell">
  We just shipped keyboard shortcuts. Press "?" to see them.
</Alert>
<Alert variant="info" title="No icon" icon={false}>
  This alert renders without a leading icon.
</Alert>`,
              js: `<l-Alert variant="info" title="New feature" icon="bell">
  We just shipped keyboard shortcuts. Press "?" to see them.
</l-Alert>
<l-Alert variant="info" title="No icon" icon="false">
  This alert renders without a leading icon.
</l-Alert>

<script type="module">import "lojee-ui/elements";</script>`,
              vue: `<l-Alert variant="info" title="New feature" icon="bell">
  We just shipped keyboard shortcuts. Press "?" to see them.
</l-Alert>
<l-Alert variant="info" title="No icon" :icon="false">
  This alert renders without a leading icon.
</l-Alert>`,
              angular: `<l-Alert variant="info" title="New feature" icon="bell">
  We just shipped keyboard shortcuts. Press "?" to see them.
</l-Alert>
<l-Alert variant="info" title="No icon" [icon]="false">
  This alert renders without a leading icon.
</l-Alert>`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Per-part class overrides via classNames.">Custom styling</SectionLabel>
          <Alert
            variant="info"
            title="Styled alert"
            classNames={{
              root: "border-indigo-200 bg-indigo-50 text-indigo-900 dark:border-indigo-900 dark:bg-indigo-950/40 dark:text-indigo-200",
              icon: "text-indigo-500",
            }}
          >
            This alert's border, background, and icon pick up custom colors via classNames.
          </Alert>
          <CodeBlock
            variants={{
              react: `<Alert
  variant="info"
  title="Styled alert"
  classNames={{
    root: "border-indigo-200 bg-indigo-50 text-indigo-900 dark:border-indigo-900 dark:bg-indigo-950/40 dark:text-indigo-200",
    icon: "text-indigo-500",
  }}
>
  This alert's border, background, and icon pick up custom colors via classNames.
</Alert>`,
              js: `<l-Alert id="styled-alert" variant="info" heading="Styled alert">
  This alert's border, background, and icon pick up custom colors via classNames.
</l-Alert>

<script type="module">
  document.getElementById("styled-alert").classNames = {
    root: "border-indigo-200 bg-indigo-50 text-indigo-900 dark:border-indigo-900 dark:bg-indigo-950/40 dark:text-indigo-200",
    icon: "text-indigo-500",
  };
</script>`,
              vue: `<template>
  <l-Alert variant="info" heading="Styled alert" :classNames="alertClassNames">
    This alert's border, background, and icon pick up custom colors via classNames.
  </l-Alert>
</template>

<script setup lang="ts">
const alertClassNames = {
  root: "border-indigo-200 bg-indigo-50 text-indigo-900 dark:border-indigo-900 dark:bg-indigo-950/40 dark:text-indigo-200",
  icon: "text-indigo-500",
};
</script>`,
              angular: `<l-Alert variant="info" heading="Styled alert" [classNames]="alertClassNames">
  This alert's border, background, and icon pick up custom colors via classNames.
</l-Alert>

alertClassNames = {
  root: "border-indigo-200 bg-indigo-50 text-indigo-900 dark:border-indigo-900 dark:bg-indigo-950/40 dark:text-indigo-200",
  icon: "text-indigo-500",
};`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Enter transitions via `transition` (with `transitionDuration` / `transitionDelay`) and hover effects via `hoverEffect`. Press Replay to run the enter transitions again.">Transitions</SectionLabel>
          <TransitionPreview cols={2}>
            <Alert variant="accent" title="Fade" transition="fade">Theme-colored alert.</Alert>
            <Alert variant="accent" title="Slide up" transition="slide-up">Theme-colored alert.</Alert>
            <Alert variant="accent" title="Slide right" transition="slide-right" transitionDelay={100}>Theme-colored alert.</Alert>
            <Alert variant="accent" title="Zoom" transition="zoom">Theme-colored alert.</Alert>
            <Alert variant="accent" title="Flip" transition="flip">Theme-colored alert.</Alert>
            <Alert variant="accent" title="Blur" transition="blur">Theme-colored alert.</Alert>
            <Alert variant="accent" title="Bounce" transition="bounce">Theme-colored alert.</Alert>
            <Alert variant="accent" title="Drop" transition="drop" transitionDuration={700}>Theme-colored alert.</Alert>
            <Alert variant="accent" title="Lift" hoverEffect="lift">Theme-colored alert.</Alert>
            <Alert variant="accent" title="Glow" hoverEffect="glow">Theme-colored alert.</Alert>
            <Alert variant="accent" title="Shine" hoverEffect="shine">Theme-colored alert.</Alert>
            <Alert variant="accent" title="Tilt" hoverEffect="tilt">Theme-colored alert.</Alert>
          </TransitionPreview>
          <CodeBlock
            variants={{
              react: `<Alert variant="accent" title="Fade" transition="fade">Theme-colored alert.</Alert>
<Alert variant="accent" title="Slide up" transition="slide-up">Theme-colored alert.</Alert>
<Alert variant="accent" title="Slide right" transition="slide-right" transitionDelay={100}>Theme-colored alert.</Alert>
<Alert variant="accent" title="Zoom" transition="zoom">Theme-colored alert.</Alert>
<Alert variant="accent" title="Flip" transition="flip">Theme-colored alert.</Alert>
<Alert variant="accent" title="Blur" transition="blur">Theme-colored alert.</Alert>
<Alert variant="accent" title="Bounce" transition="bounce">Theme-colored alert.</Alert>
<Alert variant="accent" title="Drop" transition="drop" transitionDuration={700}>Theme-colored alert.</Alert>

<Alert variant="accent" title="Lift" hoverEffect="lift">Theme-colored alert.</Alert>
<Alert variant="accent" title="Glow" hoverEffect="glow">Theme-colored alert.</Alert>
<Alert variant="accent" title="Shine" hoverEffect="shine">Theme-colored alert.</Alert>
<Alert variant="accent" title="Tilt" hoverEffect="tilt">Theme-colored alert.</Alert>`,
              js: `<l-Alert variant="accent" heading="Fade" transition="fade">Theme-colored alert.</l-Alert>
<l-Alert variant="accent" heading="Slide up" transition="slide-up">Theme-colored alert.</l-Alert>
<l-Alert variant="accent" heading="Slide right" transition="slide-right" transitionDelay="100">Theme-colored alert.</l-Alert>
<l-Alert variant="accent" heading="Zoom" transition="zoom">Theme-colored alert.</l-Alert>
<l-Alert variant="accent" heading="Flip" transition="flip">Theme-colored alert.</l-Alert>
<l-Alert variant="accent" heading="Blur" transition="blur">Theme-colored alert.</l-Alert>
<l-Alert variant="accent" heading="Bounce" transition="bounce">Theme-colored alert.</l-Alert>
<l-Alert variant="accent" heading="Drop" transition="drop" transitionDuration="700">Theme-colored alert.</l-Alert>

<l-Alert variant="accent" heading="Lift" hoverEffect="lift">Theme-colored alert.</l-Alert>
<l-Alert variant="accent" heading="Glow" hoverEffect="glow">Theme-colored alert.</l-Alert>
<l-Alert variant="accent" heading="Shine" hoverEffect="shine">Theme-colored alert.</l-Alert>
<l-Alert variant="accent" heading="Tilt" hoverEffect="tilt">Theme-colored alert.</l-Alert>

<script type="module">
  import "lojee-ui/elements";
</script>`,
              vue: `<template>
  <l-Alert variant="accent" heading="Fade" transition="fade">Theme-colored alert.</l-Alert>
  <l-Alert variant="accent" heading="Slide up" transition="slide-up">Theme-colored alert.</l-Alert>
  <l-Alert variant="accent" heading="Slide right" transition="slide-right" transitionDelay="100">Theme-colored alert.</l-Alert>
  <l-Alert variant="accent" heading="Zoom" transition="zoom">Theme-colored alert.</l-Alert>
  <l-Alert variant="accent" heading="Flip" transition="flip">Theme-colored alert.</l-Alert>
  <l-Alert variant="accent" heading="Blur" transition="blur">Theme-colored alert.</l-Alert>
  <l-Alert variant="accent" heading="Bounce" transition="bounce">Theme-colored alert.</l-Alert>
  <l-Alert variant="accent" heading="Drop" transition="drop" transitionDuration="700">Theme-colored alert.</l-Alert>

  <l-Alert variant="accent" heading="Lift" hoverEffect="lift">Theme-colored alert.</l-Alert>
  <l-Alert variant="accent" heading="Glow" hoverEffect="glow">Theme-colored alert.</l-Alert>
  <l-Alert variant="accent" heading="Shine" hoverEffect="shine">Theme-colored alert.</l-Alert>
  <l-Alert variant="accent" heading="Tilt" hoverEffect="tilt">Theme-colored alert.</l-Alert>
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
    <l-Alert variant="accent" heading="Fade" transition="fade">Theme-colored alert.</l-Alert>
    <l-Alert variant="accent" heading="Slide up" transition="slide-up">Theme-colored alert.</l-Alert>
    <l-Alert variant="accent" heading="Slide right" transition="slide-right" transitionDelay="100">Theme-colored alert.</l-Alert>
    <l-Alert variant="accent" heading="Zoom" transition="zoom">Theme-colored alert.</l-Alert>
    <l-Alert variant="accent" heading="Flip" transition="flip">Theme-colored alert.</l-Alert>
    <l-Alert variant="accent" heading="Blur" transition="blur">Theme-colored alert.</l-Alert>
    <l-Alert variant="accent" heading="Bounce" transition="bounce">Theme-colored alert.</l-Alert>
    <l-Alert variant="accent" heading="Drop" transition="drop" transitionDuration="700">Theme-colored alert.</l-Alert>

    <l-Alert variant="accent" heading="Lift" hoverEffect="lift">Theme-colored alert.</l-Alert>
    <l-Alert variant="accent" heading="Glow" hoverEffect="glow">Theme-colored alert.</l-Alert>
    <l-Alert variant="accent" heading="Shine" hoverEffect="shine">Theme-colored alert.</l-Alert>
    <l-Alert variant="accent" heading="Tilt" hoverEffect="tilt">Theme-colored alert.</l-Alert>
  \`,
})
export class AppComponent {}`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Attention effects via `animated`. Pulse and border-spin take a solid `pulseColor` or a gradient with `pulseGradientTo`.">Animated</SectionLabel>
          <div className="flex flex-col gap-4">
            <Alert variant="info" title="Glow" animated="glow">A soft breathing glow.</Alert>
            <Alert variant="success" title="Pulse" animated="pulse">An expanding ring in the alert's own color.</Alert>
            <Alert variant="error" title="Gradient pulse" animated="pulse" pulseColor="rose" pulseGradientTo="amber">A gradient pulse ring.</Alert>
            <Alert variant="warning" title="Sweep" animated="sweep">A light streak gliding across.</Alert>
            <Alert variant="info" title="Border spin" animated="border-spin" pulseColor="blue" pulseGradientTo="cyan">A rotating gradient border.</Alert>
            <div className="flex flex-wrap gap-4">
              <Alert variant="info" title="Bounce" animated="bounce" className="w-56">Bounce</Alert>
              <Alert variant="success" title="Float" animated="float" className="w-56">Float</Alert>
              <Alert variant="warning" title="Wiggle" animated="wiggle" className="w-56">Wiggle</Alert>
            </div>
          </div>
          <CodeBlock
            variants={{
              react: `<Alert variant="info" title="Glow" animated="glow">A soft breathing glow.</Alert>
<Alert variant="success" title="Pulse" animated="pulse">An expanding ring in the alert's own color.</Alert>
<Alert variant="error" title="Gradient pulse" animated="pulse" pulseColor="rose" pulseGradientTo="amber">A gradient pulse ring.</Alert>
<Alert variant="warning" title="Sweep" animated="sweep">A light streak gliding across.</Alert>
<Alert variant="info" title="Border spin" animated="border-spin" pulseColor="blue" pulseGradientTo="cyan">A rotating gradient border.</Alert>
<Alert variant="info" title="Bounce" animated="bounce">Bounce</Alert>
<Alert variant="success" title="Float" animated="float">Float</Alert>
<Alert variant="warning" title="Wiggle" animated="wiggle">Wiggle</Alert>`,
              js: `<l-Alert variant="info" heading="Glow" animated="glow">A soft breathing glow.</l-Alert>
<l-Alert variant="success" heading="Pulse" animated="pulse">An expanding ring in the alert's own color.</l-Alert>
<l-Alert variant="error" heading="Gradient pulse" animated="pulse" pulseColor="rose" pulseGradientTo="amber">A gradient pulse ring.</l-Alert>
<l-Alert variant="warning" heading="Sweep" animated="sweep">A light streak gliding across.</l-Alert>
<l-Alert variant="info" heading="Border spin" animated="border-spin" pulseColor="blue" pulseGradientTo="cyan">A rotating gradient border.</l-Alert>
<l-Alert variant="info" heading="Bounce" animated="bounce">Bounce</l-Alert>
<l-Alert variant="success" heading="Float" animated="float">Float</l-Alert>
<l-Alert variant="warning" heading="Wiggle" animated="wiggle">Wiggle</l-Alert>

<script type="module">
  import "lojee-ui/elements";
</script>`,
              vue: `<template>
  <l-Alert variant="info" heading="Glow" animated="glow">A soft breathing glow.</l-Alert>
  <l-Alert variant="success" heading="Pulse" animated="pulse">An expanding ring in the alert's own color.</l-Alert>
  <l-Alert variant="error" heading="Gradient pulse" animated="pulse" pulseColor="rose" pulseGradientTo="amber">A gradient pulse ring.</l-Alert>
  <l-Alert variant="warning" heading="Sweep" animated="sweep">A light streak gliding across.</l-Alert>
  <l-Alert variant="info" heading="Border spin" animated="border-spin" pulseColor="blue" pulseGradientTo="cyan">A rotating gradient border.</l-Alert>
  <l-Alert variant="info" heading="Bounce" animated="bounce">Bounce</l-Alert>
  <l-Alert variant="success" heading="Float" animated="float">Float</l-Alert>
  <l-Alert variant="warning" heading="Wiggle" animated="wiggle">Wiggle</l-Alert>
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
    <l-Alert variant="info" heading="Glow" animated="glow">A soft breathing glow.</l-Alert>
    <l-Alert variant="success" heading="Pulse" animated="pulse">An expanding ring in the alert's own color.</l-Alert>
    <l-Alert variant="error" heading="Gradient pulse" animated="pulse" pulseColor="rose" pulseGradientTo="amber">A gradient pulse ring.</l-Alert>
    <l-Alert variant="warning" heading="Sweep" animated="sweep">A light streak gliding across.</l-Alert>
    <l-Alert variant="info" heading="Border spin" animated="border-spin" pulseColor="blue" pulseGradientTo="cyan">A rotating gradient border.</l-Alert>
    <l-Alert variant="info" heading="Bounce" animated="bounce">Bounce</l-Alert>
    <l-Alert variant="success" heading="Float" animated="float">Float</l-Alert>
    <l-Alert variant="warning" heading="Wiggle" animated="wiggle">Wiggle</l-Alert>
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
