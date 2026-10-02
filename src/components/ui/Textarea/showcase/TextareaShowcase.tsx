import { Textarea } from "../Textarea";
import CodeBlock from "../../CodeBlock";
import { SectionLabel, Row, TransitionPreview } from "../../ShowcaseHelpers";

export default function TextareaShowcase() {
  return (
    <div>
      <div className="space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-fg">Textarea</h1>
          <p className="text-sm text-fg-subtle mt-1">A multi-line text input wrapping the native &lt;textarea&gt; element.</p>
        </div>

        <section>
          <SectionLabel sub="Plain, default resize.">Basic</SectionLabel>
          <div className="max-w-sm">
            <Textarea placeholder="Write something…" />
          </div>
          <CodeBlock
            variants={{
              react: `<Textarea placeholder="Write something…" />`,
              js: `<l-Textarea placeholder="Write something…"></l-Textarea>

<script type="module">
  import "lojee-ui/elements";
</script>`,
              vue: `<template>
  <l-Textarea placeholder="Write something…" />
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
    <l-Textarea placeholder="Write something…" />
  \`,
})
export class AppComponent {}`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="none, vertical (default), both.">Resize options</SectionLabel>
          <Row>
            <div className="max-w-sm w-full space-y-3">
              <Textarea resize="none" placeholder="resize: none" />
              <Textarea resize="vertical" placeholder="resize: vertical" />
              <Textarea resize="both" placeholder="resize: both" />
            </div>
          </Row>
          <CodeBlock
            variants={{
              react: `<Textarea resize="none" placeholder="resize: none" />
<Textarea resize="vertical" placeholder="resize: vertical" />
<Textarea resize="both" placeholder="resize: both" />`,
              js: `<l-Textarea resize="none" placeholder="resize: none"></l-Textarea>
<l-Textarea resize="vertical" placeholder="resize: vertical"></l-Textarea>
<l-Textarea resize="both" placeholder="resize: both"></l-Textarea>`,
              vue: `<template>
  <l-Textarea resize="none" placeholder="resize: none" />
  <l-Textarea resize="vertical" placeholder="resize: vertical" />
  <l-Textarea resize="both" placeholder="resize: both" />
</template>`,
              angular: `<!-- app.component.html — same AppComponent as above -->
<l-Textarea resize="none" placeholder="resize: none" />
<l-Textarea resize="vertical" placeholder="resize: vertical" />
<l-Textarea resize="both" placeholder="resize: both" />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Swaps to a red border/ring, e.g. after failed validation.">Invalid state</SectionLabel>
          <div className="max-w-sm">
            <Textarea invalid defaultValue="Too short" />
          </div>
          <CodeBlock
            variants={{
              react: `<Textarea invalid defaultValue="Too short" />`,
              js: `<l-Textarea invalid value="Too short"></l-Textarea>`,
              vue: `<l-Textarea invalid value="Too short" />`,
              angular: `<l-Textarea invalid value="Too short" />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Same disabled affordance as native textareas.">Disabled</SectionLabel>
          <div className="max-w-sm">
            <Textarea disabled placeholder="Disabled" />
          </div>
          <CodeBlock
            variants={{
              react: `<Textarea disabled placeholder="Disabled" />`,
              js: `<l-Textarea disabled placeholder="Disabled"></l-Textarea>`,
              vue: `<l-Textarea disabled placeholder="Disabled" />`,
              angular: `<l-Textarea disabled placeholder="Disabled" />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Enter transitions via `transition` (with `transitionDuration` / `transitionDelay`) and hover effects via `hoverEffect`. They play on mount — reload the page, or use Replay in the playground.">Transitions</SectionLabel>
          <div className="max-w-sm"><TransitionPreview cols={1}>
            <Textarea transition="fade" placeholder="Fade" />
            <Textarea transition="slide-up" placeholder="Slide up" />
            <Textarea transition="slide-right" transitionDelay={100} placeholder="Slide right" />
            <Textarea transition="zoom" placeholder="Zoom" />
            <Textarea transition="flip" placeholder="Flip" />
            <Textarea transition="blur" placeholder="Blur" />
          </TransitionPreview></div>
          <div className="max-w-sm space-y-3">
            <Textarea hoverEffect="lift" placeholder="Lift" />
            <Textarea hoverEffect="scale" placeholder="Scale" />
            <Textarea hoverEffect="glow" placeholder="Glow" />
          </div>
          <CodeBlock
            variants={{
              react: `<Textarea transition="fade" placeholder="Fade" />
<Textarea transition="slide-up" placeholder="Slide up" />
<Textarea transition="slide-right" transitionDelay={100} placeholder="Slide right" />
<Textarea transition="zoom" placeholder="Zoom" />
<Textarea transition="flip" placeholder="Flip" />
<Textarea transition="blur" placeholder="Blur" />

<Textarea hoverEffect="lift" placeholder="Lift" />
<Textarea hoverEffect="scale" placeholder="Scale" />
<Textarea hoverEffect="glow" placeholder="Glow" />`,
              js: `<l-Textarea transition="fade" placeholder="Fade"></l-Textarea>
<l-Textarea transition="slide-up" placeholder="Slide up"></l-Textarea>
<l-Textarea transition="slide-right" transitionDelay="100" placeholder="Slide right"></l-Textarea>
<l-Textarea transition="zoom" placeholder="Zoom"></l-Textarea>
<l-Textarea transition="flip" placeholder="Flip"></l-Textarea>
<l-Textarea transition="blur" placeholder="Blur"></l-Textarea>

<l-Textarea hoverEffect="lift" placeholder="Lift"></l-Textarea>
<l-Textarea hoverEffect="scale" placeholder="Scale"></l-Textarea>
<l-Textarea hoverEffect="glow" placeholder="Glow"></l-Textarea>

<script type="module">
  import "lojee-ui/elements";
</script>`,
              vue: `<template>
  <l-Textarea transition="fade" placeholder="Fade"></l-Textarea>
  <l-Textarea transition="slide-up" placeholder="Slide up"></l-Textarea>
  <l-Textarea transition="slide-right" transitionDelay="100" placeholder="Slide right"></l-Textarea>
  <l-Textarea transition="zoom" placeholder="Zoom"></l-Textarea>
  <l-Textarea transition="flip" placeholder="Flip"></l-Textarea>
  <l-Textarea transition="blur" placeholder="Blur"></l-Textarea>

  <l-Textarea hoverEffect="lift" placeholder="Lift"></l-Textarea>
  <l-Textarea hoverEffect="scale" placeholder="Scale"></l-Textarea>
  <l-Textarea hoverEffect="glow" placeholder="Glow"></l-Textarea>
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
    <l-Textarea transition="fade" placeholder="Fade"></l-Textarea>
    <l-Textarea transition="slide-up" placeholder="Slide up"></l-Textarea>
    <l-Textarea transition="slide-right" transitionDelay="100" placeholder="Slide right"></l-Textarea>
    <l-Textarea transition="zoom" placeholder="Zoom"></l-Textarea>
    <l-Textarea transition="flip" placeholder="Flip"></l-Textarea>
    <l-Textarea transition="blur" placeholder="Blur"></l-Textarea>

    <l-Textarea hoverEffect="lift" placeholder="Lift"></l-Textarea>
    <l-Textarea hoverEffect="scale" placeholder="Scale"></l-Textarea>
    <l-Textarea hoverEffect="glow" placeholder="Glow"></l-Textarea>
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
