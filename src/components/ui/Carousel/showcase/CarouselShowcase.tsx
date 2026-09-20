import { Carousel } from "../Carousel";
import CodeBlock from "../../CodeBlock";
import { SectionLabel } from "../../ShowcaseHelpers";

const SLIDE_CLASS = "flex h-48 items-center justify-center text-sm font-medium";

export default function CarouselShowcase() {
  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Carousel</h1>
          <p className="text-sm text-slate-500 mt-1">A self-contained, data-driven slideshow with arrows and dots.</p>
        </div>

        <section>
          <SectionLabel sub="Arrows and dots, one slide at a time.">Basic</SectionLabel>
          <Carousel
            slides={[
              <div className={`${SLIDE_CLASS} bg-indigo-100 text-indigo-700`}>Slide 1</div>,
              <div className={`${SLIDE_CLASS} bg-emerald-100 text-emerald-700`}>Slide 2</div>,
              <div className={`${SLIDE_CLASS} bg-rose-100 text-rose-700`}>Slide 3</div>,
            ]}
          />
          <CodeBlock
            variants={{
              react: `<Carousel
  slides={[
    <div className="flex h-48 items-center justify-center bg-indigo-100 text-indigo-700">Slide 1</div>,
    <div className="flex h-48 items-center justify-center bg-emerald-100 text-emerald-700">Slide 2</div>,
    <div className="flex h-48 items-center justify-center bg-rose-100 text-rose-700">Slide 3</div>,
  ]}
/>`,
              js: `<Carousel id="basic-carousel" />

<script type="module">
  import "lojee-ui/elements";

  document.getElementById("basic-carousel").slides = ["Slide 1", "Slide 2", "Slide 3"];
</script>`,
              vue: `<template>
  <Carousel :slides="slides" />
</template>

<script setup>
import "lojee-ui/elements";

const slides = ["Slide 1", "Slide 2", "Slide 3"];
</script>`,
              angular: `// app.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "lojee-ui/elements";

@Component({
  selector: "app-root",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`<Carousel [slides]="slides" />\`,
})
export class AppComponent {
  slides = ["Slide 1", "Slide 2", "Slide 3"];
}`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Advances automatically on an interval, still navigable via dots/arrows.">Autoplay</SectionLabel>
          <Carousel
            autoPlay
            intervalMs={2500}
            slides={[
              <div className={`${SLIDE_CLASS} bg-amber-100 text-amber-700`}>Slide 1</div>,
              <div className={`${SLIDE_CLASS} bg-cyan-100 text-cyan-700`}>Slide 2</div>,
              <div className={`${SLIDE_CLASS} bg-violet-100 text-violet-700`}>Slide 3</div>,
              <div className={`${SLIDE_CLASS} bg-orange-100 text-orange-700`}>Slide 4</div>,
            ]}
          />
          <CodeBlock
            variants={{
              react: `<Carousel
  autoPlay
  intervalMs={2500}
  slides={[
    <div className="flex h-48 items-center justify-center bg-amber-100 text-amber-700">Slide 1</div>,
    <div className="flex h-48 items-center justify-center bg-cyan-100 text-cyan-700">Slide 2</div>,
    <div className="flex h-48 items-center justify-center bg-violet-100 text-violet-700">Slide 3</div>,
    <div className="flex h-48 items-center justify-center bg-orange-100 text-orange-700">Slide 4</div>,
  ]}
/>`,
              js: `<Carousel id="autoplay-carousel" autoPlay intervalMs="2500" />

<script type="module">
  document.getElementById("autoplay-carousel").slides = ["Slide 1", "Slide 2", "Slide 3", "Slide 4"];
</script>`,
              vue: `<template>
  <Carousel :slides="slides" autoPlay intervalMs="2500" />
</template>

<script setup>
const slides = ["Slide 1", "Slide 2", "Slide 3", "Slide 4"];
</script>`,
              angular: `// app.component.ts (same component as above, with its own \`slides\` array)
slides = ["Slide 1", "Slide 2", "Slide 3", "Slide 4"];

// app.component.html
<Carousel [slides]="slides" autoPlay intervalMs="2500" />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="No arrows, dots only.">Dots only</SectionLabel>
          <Carousel
            showArrows={false}
            slides={[
              <div className={`${SLIDE_CLASS} bg-teal-100 text-teal-700`}>Slide 1</div>,
              <div className={`${SLIDE_CLASS} bg-pink-100 text-pink-700`}>Slide 2</div>,
            ]}
          />
          <CodeBlock
            variants={{
              react: `<Carousel
  showArrows={false}
  slides={[
    <div className="flex h-48 items-center justify-center bg-teal-100 text-teal-700">Slide 1</div>,
    <div className="flex h-48 items-center justify-center bg-pink-100 text-pink-700">Slide 2</div>,
  ]}
/>`,
              js: `<Carousel id="dots-carousel" showArrows="false" />

<script type="module">
  document.getElementById("dots-carousel").slides = ["Slide 1", "Slide 2"];
</script>`,
              vue: `<template>
  <Carousel :slides="slides" showArrows="false" />
</template>

<script setup>
const slides = ["Slide 1", "Slide 2"];
</script>`,
              angular: `// app.component.ts (same component as above, with its own \`slides\` array)
slides = ["Slide 1", "Slide 2"];

// app.component.html
<Carousel [slides]="slides" showArrows="false" />`,
            }}
          />
        </section>
      </div>
    </div>
  );
}
