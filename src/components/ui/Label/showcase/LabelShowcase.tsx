import { Label } from "../Label";
import { Input } from "../../Input/Input";
import CodeBlock from "../../CodeBlock";
import { SectionLabel, TransitionPreview } from "../../ShowcaseHelpers";

export default function LabelShowcase() {
  return (
    <div>
      <div className="space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-fg">Label</h1>
          <p className="text-sm text-fg-subtle mt-1">A form field label wrapping the native &lt;label&gt; element.</p>
        </div>

        <section>
          <SectionLabel sub="Paired with a form control via htmlFor.">Plain</SectionLabel>
          <div className="max-w-sm space-y-1.5">
            <Label htmlFor="showcase-email">Email address</Label>
            <Input id="showcase-email" placeholder="you@example.com" />
          </div>
          <CodeBlock
            variants={{
              react: `<Label htmlFor="email">Email address</Label>
<Input id="email" placeholder="you@example.com" />`,
              js: `<l-label htmlFor="email">Email address</l-label>
<l-input id="email" placeholder="you@example.com"></l-input>

<script type="module">
  import "lojee-ui/elements";
</script>`,
              vue: `<template>
  <l-label htmlFor="email">Email address</l-label>
  <l-input id="email" placeholder="you@example.com" />
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
    <l-label htmlFor="email">Email address</l-label>
    <l-input id="email" placeholder="you@example.com" />
  \`,
})
export class AppComponent {}`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Adds a red asterisk after the label text.">Required</SectionLabel>
          <div className="max-w-sm space-y-1.5">
            <Label htmlFor="showcase-name" required>
              Full name
            </Label>
            <Input id="showcase-name" placeholder="Jane Doe" />
          </div>
          <CodeBlock
            variants={{
              react: `<Label htmlFor="name" required>Full name</Label>
<Input id="name" placeholder="Jane Doe" />`,
              js: `<l-label htmlFor="name" required>Full name</l-label>
<l-input id="name" placeholder="Jane Doe"></l-input>`,
              vue: `<template>
  <l-label htmlFor="name" required>Full name</l-label>
  <l-input id="name" placeholder="Jane Doe" />
</template>`,
              angular: `<!-- app.component.html — same AppComponent as above -->
<l-label htmlFor="name" required>Full name</l-label>
<l-input id="name" placeholder="Jane Doe" />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Enter transitions via `transition` (with `transitionDuration` / `transitionDelay`). They play on mount — reload the page, or use Replay in the playground.">Transitions</SectionLabel>
          <TransitionPreview layout="inline">
            <Label transition="fade">Fade</Label>
            <Label transition="slide-up">Slide up</Label>
            <Label transition="slide-right" transitionDelay={100}>Slide right</Label>
            <Label transition="zoom">Zoom</Label>
            <Label transition="flip">Flip</Label>
            <Label transition="blur">Blur</Label>
            <Label transition="bounce">Bounce</Label>
            <Label transition="drop" transitionDuration={700}>Drop</Label>
          </TransitionPreview>
          <CodeBlock
            variants={{
              react: `<Label transition="fade">Fade</Label>
<Label transition="slide-up">Slide up</Label>
<Label transition="slide-right" transitionDelay={100}>Slide right</Label>
<Label transition="zoom">Zoom</Label>
<Label transition="flip">Flip</Label>
<Label transition="blur">Blur</Label>
<Label transition="bounce">Bounce</Label>
<Label transition="drop" transitionDuration={700}>Drop</Label>`,
              js: `<l-label transition="fade">Fade</l-label>
<l-label transition="slide-up">Slide up</l-label>
<l-label transition="slide-right" transitionDelay="100">Slide right</l-label>
<l-label transition="zoom">Zoom</l-label>
<l-label transition="flip">Flip</l-label>
<l-label transition="blur">Blur</l-label>
<l-label transition="bounce">Bounce</l-label>
<l-label transition="drop" transitionDuration="700">Drop</l-label>

<script type="module">
  import "lojee-ui/elements";
</script>`,
              vue: `<template>
  <l-label transition="fade">Fade</l-label>
  <l-label transition="slide-up">Slide up</l-label>
  <l-label transition="slide-right" transitionDelay="100">Slide right</l-label>
  <l-label transition="zoom">Zoom</l-label>
  <l-label transition="flip">Flip</l-label>
  <l-label transition="blur">Blur</l-label>
  <l-label transition="bounce">Bounce</l-label>
  <l-label transition="drop" transitionDuration="700">Drop</l-label>
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
    <l-label transition="fade">Fade</l-label>
    <l-label transition="slide-up">Slide up</l-label>
    <l-label transition="slide-right" transitionDelay="100">Slide right</l-label>
    <l-label transition="zoom">Zoom</l-label>
    <l-label transition="flip">Flip</l-label>
    <l-label transition="blur">Blur</l-label>
    <l-label transition="bounce">Bounce</l-label>
    <l-label transition="drop" transitionDuration="700">Drop</l-label>
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
