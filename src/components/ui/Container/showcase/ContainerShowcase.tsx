import { Container } from "../Container";
import CodeBlock from "../../CodeBlock";
import { SectionLabel } from "../../ShowcaseHelpers";

export default function ContainerShowcase() {
  return (
    <div className="min-h-screen rounded-xl bg-surface p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-fg">Container</h1>
          <p className="text-sm text-fg-subtle mt-1">A centered, max-width wrapper for page content.</p>
        </div>

        <section>
          <SectionLabel sub="sm, md, lg, xl, full — shown against a bordered wrapper so the max-width is visible.">Sizes</SectionLabel>
          <div className="space-y-3">
            {(["sm", "md", "lg", "xl", "full"] as const).map((size) => (
              <div key={size} className="border border-dashed border-border rounded-lg">
                <Container size={size}>
                  <div className="rounded-md bg-surface-muted p-3 text-center text-xs text-fg-subtle">size="{size}"</div>
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
            <div className="border border-dashed border-border rounded-lg">
              <Container size="sm" padded>
                <div className="bg-surface-muted p-3 text-center text-xs text-fg-subtle">padded</div>
              </Container>
            </div>
            <div className="border border-dashed border-border rounded-lg">
              <Container size="sm" padded={false}>
                <div className="bg-surface-muted p-3 text-center text-xs text-fg-subtle">not padded</div>
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

        <section>
          <SectionLabel sub="Enter transitions via `transition` (with `transitionDuration` / `transitionDelay`). They play on mount — reload the page, or use Replay in the playground.">Transitions</SectionLabel>
          <div className="space-y-3">
            <Container transition="fade"><div className="rounded-md bg-surface-muted p-3 text-center text-xs text-fg-subtle">fade</div></Container>
            <Container transition="slide-up"><div className="rounded-md bg-surface-muted p-3 text-center text-xs text-fg-subtle">slide-up</div></Container>
            <Container transition="zoom" transitionDelay={100}><div className="rounded-md bg-surface-muted p-3 text-center text-xs text-fg-subtle">zoom</div></Container>
            <Container transition="blur" transitionDuration={700}><div className="rounded-md bg-surface-muted p-3 text-center text-xs text-fg-subtle">blur</div></Container>
          </div>
          <CodeBlock
            variants={{
              react: `<Container transition="fade">...</Container>
<Container transition="slide-up">...</Container>
<Container transition="zoom" transitionDelay={100}>...</Container>
<Container transition="blur" transitionDuration={700}>...</Container>`,
              js: `<l-Container transition="fade">...</l-Container>
<l-Container transition="slide-up">...</l-Container>
<l-Container transition="zoom" transitionDelay="100">...</l-Container>
<l-Container transition="blur" transitionDuration="700">...</l-Container>

<script type="module">
  import "lojee-ui/elements";
</script>`,
              vue: `<template>
  <l-Container transition="fade">...</l-Container>
  <l-Container transition="slide-up">...</l-Container>
  <l-Container transition="zoom" transitionDelay="100">...</l-Container>
  <l-Container transition="blur" transitionDuration="700">...</l-Container>
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
    <l-Container transition="fade">...</l-Container>
    <l-Container transition="slide-up">...</l-Container>
    <l-Container transition="zoom" transitionDelay="100">...</l-Container>
    <l-Container transition="blur" transitionDuration="700">...</l-Container>
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
