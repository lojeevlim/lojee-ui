import { Container } from "../Container";
import CodeBlock from "../../CodeBlock";
import { SectionLabel } from "../../ShowcaseHelpers";

export default function ContainerShowcase() {
  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Container</h1>
          <p className="text-sm text-slate-500 mt-1">A centered, max-width wrapper for page content.</p>
        </div>

        <section>
          <SectionLabel sub="sm, md, lg, xl, full — shown against a bordered wrapper so the max-width is visible.">Sizes</SectionLabel>
          <div className="space-y-3">
            {(["sm", "md", "lg", "xl", "full"] as const).map((size) => (
              <div key={size} className="border border-dashed border-slate-200 rounded-lg">
                <Container size={size}>
                  <div className="rounded-md bg-slate-100 p-3 text-center text-xs text-slate-500">size="{size}"</div>
                </Container>
              </div>
            ))}
          </div>
          <CodeBlock
            variants={{
              react: `<Container size="sm">...</Container>
<Container size="md">...</Container>
<Container size="lg">...</Container>
<Container size="xl">...</Container>
<Container size="full">...</Container>`,
              js: `<l-Container size="sm">...</l-Container>
<l-Container size="md">...</l-Container>
<l-Container size="lg">...</l-Container>
<l-Container size="xl">...</l-Container>
<l-Container size="full">...</l-Container>

<script type="module">
  import "lojee-ui/elements";
</script>`,
              vue: `<template>
  <l-Container size="sm">...</l-Container>
  <l-Container size="md">...</l-Container>
  <l-Container size="lg">...</l-Container>
  <l-Container size="xl">...</l-Container>
  <l-Container size="full">...</l-Container>
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
    <l-Container size="sm">...</l-Container>
    <l-Container size="md">...</l-Container>
    <l-Container size="lg">...</l-Container>
    <l-Container size="xl">...</l-Container>
    <l-Container size="full">...</l-Container>
  \`,
})
export class AppComponent {}`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Toggles the horizontal px-4 padding.">Padded</SectionLabel>
          <div className="space-y-3">
            <div className="border border-dashed border-slate-200 rounded-lg">
              <Container size="sm" padded>
                <div className="bg-slate-100 p-3 text-center text-xs text-slate-500">padded</div>
              </Container>
            </div>
            <div className="border border-dashed border-slate-200 rounded-lg">
              <Container size="sm" padded={false}>
                <div className="bg-slate-100 p-3 text-center text-xs text-slate-500">not padded</div>
              </Container>
            </div>
          </div>
          <CodeBlock
            variants={{
              react: `<Container size="sm" padded={false}>...</Container>`,
              js: `<l-Container size="sm" padded="false">...</l-Container>`,
              vue: `<template>
  <l-Container size="sm" padded="false">...</l-Container>
</template>`,
              angular: `<!-- reuses the AppComponent from above -->
<l-Container size="sm" padded="false">...</l-Container>`,
            }}
          />
        </section>
      </div>
    </div>
  );
}
