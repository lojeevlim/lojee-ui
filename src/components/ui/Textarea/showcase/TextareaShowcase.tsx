import { Textarea } from "../Textarea";
import CodeBlock from "../../CodeBlock";
import { SectionLabel, Row } from "../../ShowcaseHelpers";

export default function TextareaShowcase() {
  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Textarea</h1>
          <p className="text-sm text-slate-500 mt-1">A multi-line text input wrapping the native &lt;textarea&gt; element.</p>
        </div>

        <section>
          <SectionLabel sub="Plain, default resize.">Basic</SectionLabel>
          <div className="max-w-sm">
            <Textarea placeholder="Write something…" />
          </div>
          <CodeBlock
            variants={{
              react: `<Textarea placeholder="Write something…" />`,
              js: `<l-Textarea placeholder="Write something…" />

<script type="module">
  import "lojee-ui/elements";
</script>`,
              vue: `<template>
  <l-Textarea placeholder="Write something…" />
</template>

<script setup>
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
              js: `<l-Textarea resize="none" placeholder="resize: none" />
<l-Textarea resize="vertical" placeholder="resize: vertical" />
<l-Textarea resize="both" placeholder="resize: both" />`,
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
              js: `<l-Textarea invalid value="Too short" />`,
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
              js: `<l-Textarea disabled placeholder="Disabled" />`,
              vue: `<l-Textarea disabled placeholder="Disabled" />`,
              angular: `<l-Textarea disabled placeholder="Disabled" />`,
            }}
          />
        </section>
      </div>
    </div>
  );
}
