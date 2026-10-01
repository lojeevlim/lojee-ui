import { Label } from "../Label";
import { Input } from "../../Input/Input";
import CodeBlock from "../../CodeBlock";
import { SectionLabel, Row } from "../../ShowcaseHelpers";

export default function LabelShowcase() {
  return (
    <div className="min-h-screen rounded-xl bg-surface p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
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
              js: `<l-Label htmlFor="email">Email address</l-Label>
<l-Input id="email" placeholder="you@example.com" />

<script type="module">
  import "lojee-ui/elements";
</script>`,
              vue: `<template>
  <l-Label htmlFor="email">Email address</l-Label>
  <l-Input id="email" placeholder="you@example.com" />
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
    <l-Label htmlFor="email">Email address</l-Label>
    <l-Input id="email" placeholder="you@example.com" />
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
              js: `<l-Label htmlFor="name" required>Full name</l-Label>
<l-Input id="name" placeholder="Jane Doe" />`,
              vue: `<template>
  <l-Label htmlFor="name" required>Full name</l-Label>
  <l-Input id="name" placeholder="Jane Doe" />
</template>`,
              angular: `<!-- app.component.html — same AppComponent as above -->
<l-Label htmlFor="name" required>Full name</l-Label>
<l-Input id="name" placeholder="Jane Doe" />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Enter transitions via `transition` (with `transitionDuration` / `transitionDelay`). They play on mount — reload the page, or use Replay in the playground.">Transitions</SectionLabel>
          <Row>
            <Label transition="fade">Fade</Label>
            <Label transition="slide-up">Slide up</Label>
            <Label transition="slide-right" transitionDelay={100}>Slide right</Label>
            <Label transition="zoom">Zoom</Label>
            <Label transition="flip">Flip</Label>
            <Label transition="blur">Blur</Label>
            <Label transition="bounce">Bounce</Label>
            <Label transition="drop" transitionDuration={700}>Drop</Label>
          </Row>
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
              js: `<l-Label transition="fade">Fade</l-Label>
<l-Label transition="slide-up">Slide up</l-Label>
<l-Label transition="slide-right" transitionDelay="100">Slide right</l-Label>
<l-Label transition="zoom">Zoom</l-Label>
<l-Label transition="flip">Flip</l-Label>
<l-Label transition="blur">Blur</l-Label>
<l-Label transition="bounce">Bounce</l-Label>
<l-Label transition="drop" transitionDuration="700">Drop</l-Label>

<script type="module">
  import "lojee-ui/elements";
</script>`,
              vue: `<template>
  <l-Label transition="fade">Fade</l-Label>
  <l-Label transition="slide-up">Slide up</l-Label>
  <l-Label transition="slide-right" transitionDelay="100">Slide right</l-Label>
  <l-Label transition="zoom">Zoom</l-Label>
  <l-Label transition="flip">Flip</l-Label>
  <l-Label transition="blur">Blur</l-Label>
  <l-Label transition="bounce">Bounce</l-Label>
  <l-Label transition="drop" transitionDuration="700">Drop</l-Label>
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
    <l-Label transition="fade">Fade</l-Label>
    <l-Label transition="slide-up">Slide up</l-Label>
    <l-Label transition="slide-right" transitionDelay="100">Slide right</l-Label>
    <l-Label transition="zoom">Zoom</l-Label>
    <l-Label transition="flip">Flip</l-Label>
    <l-Label transition="blur">Blur</l-Label>
    <l-Label transition="bounce">Bounce</l-Label>
    <l-Label transition="drop" transitionDuration="700">Drop</l-Label>
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
