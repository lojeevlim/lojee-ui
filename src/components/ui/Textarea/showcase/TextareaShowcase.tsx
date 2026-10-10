import { Textarea } from "../Textarea";
import CodeBlock from "../../CodeBlock";
import { SectionLabel, Row, TransitionPreview } from "../../ShowcaseHelpers";
import { useFormEventsNote } from "../../../../core/bindingNotes";

export default function TextareaShowcase() {
  const eventsNote = useFormEventsNote();
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
              js: `<l-textarea placeholder="Write something…"></l-textarea>

<script type="module">
  import "lojee-ui/elements";
</script>`,
              vue: `<template>
  <l-textarea placeholder="Write something…" />
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
    <l-textarea placeholder="Write something…" />
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
              js: `<l-textarea resize="none" placeholder="resize: none"></l-textarea>
<l-textarea resize="vertical" placeholder="resize: vertical"></l-textarea>
<l-textarea resize="both" placeholder="resize: both"></l-textarea>`,
              vue: `<template>
  <l-textarea resize="none" placeholder="resize: none" />
  <l-textarea resize="vertical" placeholder="resize: vertical" />
  <l-textarea resize="both" placeholder="resize: both" />
</template>`,
              angular: `<!-- app.component.html — same AppComponent as above -->
<l-textarea resize="none" placeholder="resize: none" />
<l-textarea resize="vertical" placeholder="resize: vertical" />
<l-textarea resize="both" placeholder="resize: both" />`,
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
              js: `<l-textarea invalid value="Too short"></l-textarea>`,
              vue: `<l-textarea invalid value="Too short" />`,
              angular: `<l-textarea invalid value="Too short" />`,
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
              js: `<l-textarea disabled placeholder="Disabled"></l-textarea>`,
              vue: `<l-textarea disabled placeholder="Disabled" />`,
              angular: `<l-textarea disabled placeholder="Disabled" />`,
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
              js: `<l-textarea transition="fade" placeholder="Fade"></l-textarea>
<l-textarea transition="slide-up" placeholder="Slide up"></l-textarea>
<l-textarea transition="slide-right" transitionDelay="100" placeholder="Slide right"></l-textarea>
<l-textarea transition="zoom" placeholder="Zoom"></l-textarea>
<l-textarea transition="flip" placeholder="Flip"></l-textarea>
<l-textarea transition="blur" placeholder="Blur"></l-textarea>

<l-textarea hoverEffect="lift" placeholder="Lift"></l-textarea>
<l-textarea hoverEffect="scale" placeholder="Scale"></l-textarea>
<l-textarea hoverEffect="glow" placeholder="Glow"></l-textarea>

<script type="module">
  import "lojee-ui/elements";
</script>`,
              vue: `<template>
  <l-textarea transition="fade" placeholder="Fade"></l-textarea>
  <l-textarea transition="slide-up" placeholder="Slide up"></l-textarea>
  <l-textarea transition="slide-right" transitionDelay="100" placeholder="Slide right"></l-textarea>
  <l-textarea transition="zoom" placeholder="Zoom"></l-textarea>
  <l-textarea transition="flip" placeholder="Flip"></l-textarea>
  <l-textarea transition="blur" placeholder="Blur"></l-textarea>

  <l-textarea hoverEffect="lift" placeholder="Lift"></l-textarea>
  <l-textarea hoverEffect="scale" placeholder="Scale"></l-textarea>
  <l-textarea hoverEffect="glow" placeholder="Glow"></l-textarea>
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
    <l-textarea transition="fade" placeholder="Fade"></l-textarea>
    <l-textarea transition="slide-up" placeholder="Slide up"></l-textarea>
    <l-textarea transition="slide-right" transitionDelay="100" placeholder="Slide right"></l-textarea>
    <l-textarea transition="zoom" placeholder="Zoom"></l-textarea>
    <l-textarea transition="flip" placeholder="Flip"></l-textarea>
    <l-textarea transition="blur" placeholder="Blur"></l-textarea>

    <l-textarea hoverEffect="lift" placeholder="Lift"></l-textarea>
    <l-textarea hoverEffect="scale" placeholder="Scale"></l-textarea>
    <l-textarea hoverEffect="glow" placeholder="Glow"></l-textarea>
  \`,
})
export class AppComponent {}`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub={eventsNote}>Events</SectionLabel>
          <CodeBlock
            variants={{
              react: `<Textarea required placeholder="Message"
  onChange={(e) => console.log("update", e.target.value)}
  onInput={(e) => console.log("input", e.currentTarget.value)}
  onFocus={() => console.log("focus")}
  onInvalid={(e) => console.log("invalid", e.currentTarget.validationMessage)}
/>`,
              js: `<l-textarea required="true" placeholder="Message"></l-textarea>

<script type="module">
  import "lojee-ui/elements";

  const el = document.querySelector("l-textarea");
  el.addEventListener("update", (e) => console.log("update", e.detail)); // string
  el.addEventListener("input", (e) => console.log("input", e.detail));
  el.addEventListener("focus", (e) => console.log("focus", e.detail));
  el.addEventListener("invalid", (e) => console.log("invalid", e.detail)); // the validation message
</script>`,
              vue: `<template>
  <l-textarea required="true" placeholder="Message"
    @update="(e) => console.log('update', e.detail)"
    @input="(e) => console.log('input', e.detail)"
    @focus="(e) => console.log('focus', e.detail)"
    @invalid="(e) => console.log('invalid', e.detail)"
  />
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
    <l-textarea required="true" placeholder="Message"
      (update)="onUpdate($any($event).detail)"
      (input)="onInput($any($event).detail)"
      (focus)="onFocus()"
      (invalid)="onInvalid($any($event).detail)"
    ></l-textarea>
  \`,
})
export class AppComponent {
  onUpdate(value: string) {}
  onInput(value: string) {}
  onFocus() {}
  onInvalid(message: string) {}
}`,
            }}
          />
        </section>
      </div>
    </div>
  );
}
