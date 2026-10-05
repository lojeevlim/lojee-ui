import { Footer } from "../Footer";
import CodeBlock from "../../CodeBlock";
import { SectionLabel, TransitionPreview } from "../../ShowcaseHelpers";

const COPY = "© 2026 Lojee, Inc. All rights reserved.";

function Brand({ filled }: { filled?: boolean }) {
  return (
    <div className="col-span-2 sm:col-span-4">
      <h4 className={`text-sm font-semibold ${filled ? "text-white" : "text-fg"}`}>Lojee</h4>
      <p className={`mt-1 text-sm ${filled ? "text-white/70" : "text-fg-muted"}`}>Build interfaces faster with a small, themeable component library.</p>
    </div>
  );
}

const COLORS: { label: string; color?: string }[] = [
  { label: "default (no color)" },
  { label: "accent", color: "accent" },
  { label: "slate", color: "slate" },
  { label: "emerald", color: "emerald" },
  { label: "rose", color: "rose" },
  { label: "amber", color: "amber" },
  { label: "custom · #7c3aed", color: "#7c3aed" },
];

export default function FooterShowcase() {
  return (
    <div>
      <div className="space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-fg">Footer</h1>
          <p className="text-sm text-fg-subtle mt-1">A site-wide bottom footer with a content area and a copyright bar, in a neutral surface or any color.</p>
        </div>

        <section>
          <SectionLabel sub="Some text above a copyright line.">Basic</SectionLabel>
          <Footer bottom={COPY}>
            <Brand />
          </Footer>
          <CodeBlock
            variants={{
              react: `<Footer bottom="${COPY}">
  <h4>Lojee</h4>
  <p>Build interfaces faster with a small, themeable component library.</p>
</Footer>`,
              js: `<l-Footer bottom="${COPY}">
  <h4>Lojee</h4>
  <p>Build interfaces faster with a small, themeable component library.</p>
</l-Footer>

<script type="module">import "lojee-ui/elements";</script>`,
              vue: `<template>
  <l-Footer bottom="${COPY}">
    <h4>Lojee</h4>
    <p>Build interfaces faster with a small, themeable component library.</p>
  </l-Footer>
</template>`,
              angular: `<l-Footer bottom="${COPY}">
  <h4>Lojee</h4>
  <p>Build interfaces faster with a small, themeable component library.</p>
</l-Footer>`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Pick the fill with color — any built-in color (accent follows the theme) or a custom CSS color such as #7c3aed. Without it the footer is a soft neutral surface.">Colors</SectionLabel>
          <div className="grid gap-4">
            {COLORS.map(({ label, color }) => (
              <div key={label}>
                <p className="mb-1.5 font-mono text-xs text-fg-subtle">{label}</p>
                <Footer color={color} className="rounded-lg" bottom={COPY}>
                  <Brand filled={color !== undefined} />
                </Footer>
              </div>
            ))}
          </div>
          <CodeBlock
            variants={{
              react: `<Footer bottom="${COPY}">Lojee</Footer>
<Footer color="accent" bottom="${COPY}">Lojee</Footer>
<Footer color="emerald" bottom="${COPY}">Lojee</Footer>
<Footer color="#7c3aed" bottom="${COPY}">Lojee</Footer>`,
              js: `<l-Footer bottom="${COPY}">Lojee</l-Footer>
<l-Footer color="accent" bottom="${COPY}">Lojee</l-Footer>
<l-Footer color="emerald" bottom="${COPY}">Lojee</l-Footer>
<l-Footer color="#7c3aed" bottom="${COPY}">Lojee</l-Footer>

<script type="module">import "lojee-ui/elements";</script>`,
              vue: `<template>
  <l-Footer color="emerald" bottom="${COPY}">Lojee</l-Footer>
</template>`,
              angular: `<l-Footer color="emerald" bottom="${COPY}">Lojee</l-Footer>`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Just the bottom bar — a copyright line, no content.">
            Bottom bar only
          </SectionLabel>
          <Footer bottom={COPY} />
          <CodeBlock
            variants={{
              react: `<Footer bottom="${COPY}" />`,
              js: `<l-Footer bottom="${COPY}"></l-Footer>

<script type="module">import "lojee-ui/elements";</script>`,
              vue: `<template>
  <l-Footer bottom="${COPY}"></l-Footer>
</template>`,
              angular: `<l-Footer bottom="${COPY}"></l-Footer>`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Enter transitions via `transition` (with `transitionDuration` / `transitionDelay`). They play on mount — reload the page, or use Replay in the playground.">Transitions</SectionLabel>
          <TransitionPreview cols={2}>
            <Footer bottom="Fade" transition="fade" />
            <Footer bottom="Slide down" transition="slide-down" />
            <Footer bottom="Slide right" transition="slide-right" transitionDelay={100} />
            <Footer bottom="Zoom" transition="zoom" />
            <Footer bottom="Blur" transition="blur" />
            <Footer bottom="Drop" transition="drop" transitionDuration={700} />
          </TransitionPreview>
          <CodeBlock
            variants={{
              react: `<Footer bottom="Fade" transition="fade" />
<Footer bottom="Slide down" transition="slide-down" />
<Footer bottom="Slide right" transition="slide-right" transitionDelay={100} />
<Footer bottom="Zoom" transition="zoom" />
<Footer bottom="Blur" transition="blur" />
<Footer bottom="Drop" transition="drop" transitionDuration={700} />`,
              js: `<l-Footer bottom="Fade" transition="fade"></l-Footer>
<l-Footer bottom="Slide down" transition="slide-down"></l-Footer>
<l-Footer bottom="Slide right" transition="slide-right" transitionDelay="100"></l-Footer>
<l-Footer bottom="Zoom" transition="zoom"></l-Footer>
<l-Footer bottom="Blur" transition="blur"></l-Footer>
<l-Footer bottom="Drop" transition="drop" transitionDuration="700"></l-Footer>

<script type="module">
  import "lojee-ui/elements";
</script>`,
              vue: `<template>
  <l-Footer bottom="Fade" transition="fade"></l-Footer>
  <l-Footer bottom="Slide down" transition="slide-down"></l-Footer>
  <l-Footer bottom="Slide right" transition="slide-right" transitionDelay="100"></l-Footer>
  <l-Footer bottom="Zoom" transition="zoom"></l-Footer>
  <l-Footer bottom="Blur" transition="blur"></l-Footer>
  <l-Footer bottom="Drop" transition="drop" transitionDuration="700"></l-Footer>
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
    <l-Footer bottom="Fade" transition="fade"></l-Footer>
    <l-Footer bottom="Slide down" transition="slide-down"></l-Footer>
    <l-Footer bottom="Slide right" transition="slide-right" transitionDelay="100"></l-Footer>
    <l-Footer bottom="Zoom" transition="zoom"></l-Footer>
    <l-Footer bottom="Blur" transition="blur"></l-Footer>
    <l-Footer bottom="Drop" transition="drop" transitionDuration="700"></l-Footer>
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
