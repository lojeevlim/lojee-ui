import { Carousel } from "../Carousel";
import CodeBlock from "../../CodeBlock";
import { SectionLabel, TransitionPreview } from "../../ShowcaseHelpers";

const SLIDE_CLASS = "flex h-48 items-center justify-center text-sm font-medium";

const TR_SLIDE_CLASS = "flex h-28 items-center justify-center text-sm font-medium";
const TR_SLIDES = [
  <div key="1" className={`${TR_SLIDE_CLASS} bg-indigo-100 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300`}>Slide 1</div>,
  <div key="2" className={`${TR_SLIDE_CLASS} bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300`}>Slide 2</div>,
  <div key="3" className={`${TR_SLIDE_CLASS} bg-rose-100 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300`}>Slide 3</div>,
];

export default function CarouselShowcase() {
  return (
    <div>
      <div className="space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-fg">Carousel</h1>
          <p className="text-sm text-fg-subtle mt-1">A self-contained, data-driven slideshow with arrows and dots.</p>
        </div>

        <section>
          <SectionLabel sub="Arrows and dots, one slide at a time.">Basic</SectionLabel>
          <Carousel
            slides={[
              <div className={`${SLIDE_CLASS} bg-indigo-100 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300`}>Slide 1</div>,
              <div className={`${SLIDE_CLASS} bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300`}>Slide 2</div>,
              <div className={`${SLIDE_CLASS} bg-rose-100 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300`}>Slide 3</div>,
            ]}
          />
          <CodeBlock
            variants={{
              react: `<Carousel
  slides={[
    <div className="flex h-48 items-center justify-center bg-indigo-100 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300">Slide 1</div>,
    <div className="flex h-48 items-center justify-center bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">Slide 2</div>,
    <div className="flex h-48 items-center justify-center bg-rose-100 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300">Slide 3</div>,
  ]}
/>`,
              js: `<l-Carousel id="basic-carousel"></l-Carousel>

<script type="module">
  import "lojee-ui/elements";

  document.getElementById("basic-carousel").slides = ["Slide 1", "Slide 2", "Slide 3"];
</script>`,
              vue: `<template>
  <l-Carousel :slides="slides" />
</template>

<script setup lang="ts">
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
  template: \`<l-Carousel [slides]="slides" />\`,
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
              <div className={`${SLIDE_CLASS} bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300`}>Slide 1</div>,
              <div className={`${SLIDE_CLASS} bg-cyan-100 text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300`}>Slide 2</div>,
              <div className={`${SLIDE_CLASS} bg-violet-100 text-violet-700 dark:bg-violet-950/50 dark:text-violet-300`}>Slide 3</div>,
              <div className={`${SLIDE_CLASS} bg-orange-100 text-orange-700 dark:bg-orange-950/50 dark:text-orange-300`}>Slide 4</div>,
            ]}
          />
          <CodeBlock
            variants={{
              react: `<Carousel
  autoPlay
  intervalMs={2500}
  slides={[
    <div className="flex h-48 items-center justify-center bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300">Slide 1</div>,
    <div className="flex h-48 items-center justify-center bg-cyan-100 text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300">Slide 2</div>,
    <div className="flex h-48 items-center justify-center bg-violet-100 text-violet-700 dark:bg-violet-950/50 dark:text-violet-300">Slide 3</div>,
    <div className="flex h-48 items-center justify-center bg-orange-100 text-orange-700 dark:bg-orange-950/50 dark:text-orange-300">Slide 4</div>,
  ]}
/>`,
              js: `<l-Carousel id="autoplay-carousel" autoPlay intervalMs="2500"></l-Carousel>

<script type="module">
  document.getElementById("autoplay-carousel").slides = ["Slide 1", "Slide 2", "Slide 3", "Slide 4"];
</script>`,
              vue: `<template>
  <l-Carousel :slides="slides" autoPlay intervalMs="2500" />
</template>

<script setup lang="ts">
const slides = ["Slide 1", "Slide 2", "Slide 3", "Slide 4"];
</script>`,
              angular: `// app.component.ts (same component as above, with its own \`slides\` array)
slides = ["Slide 1", "Slide 2", "Slide 3", "Slide 4"];

// app.component.html
<l-Carousel [slides]="slides" autoPlay intervalMs="2500" />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="No arrows, dots only.">Dots only</SectionLabel>
          <Carousel
            showArrows={false}
            slides={[
              <div className={`${SLIDE_CLASS} bg-teal-100 text-teal-700 dark:bg-teal-950/50 dark:text-teal-300`}>Slide 1</div>,
              <div className={`${SLIDE_CLASS} bg-pink-100 text-pink-700 dark:bg-pink-950/50 dark:text-pink-300`}>Slide 2</div>,
            ]}
          />
          <CodeBlock
            variants={{
              react: `<Carousel
  showArrows={false}
  slides={[
    <div className="flex h-48 items-center justify-center bg-teal-100 text-teal-700 dark:bg-teal-950/50 dark:text-teal-300">Slide 1</div>,
    <div className="flex h-48 items-center justify-center bg-pink-100 text-pink-700 dark:bg-pink-950/50 dark:text-pink-300">Slide 2</div>,
  ]}
/>`,
              js: `<l-Carousel id="dots-carousel" showArrows="false"></l-Carousel>

<script type="module">
  document.getElementById("dots-carousel").slides = ["Slide 1", "Slide 2"];
</script>`,
              vue: `<template>
  <l-Carousel :slides="slides" showArrows="false" />
</template>

<script setup lang="ts">
const slides = ["Slide 1", "Slide 2"];
</script>`,
              angular: `// app.component.ts (same component as above, with its own \`slides\` array)
slides = ["Slide 1", "Slide 2"];

// app.component.html
<l-Carousel [slides]="slides" showArrows="false" />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Enter transitions via `transition` (with `transitionDuration` / `transitionDelay`) and hover effects via `hoverEffect`. They play on mount — reload the page, or use Replay in the playground.">Transitions</SectionLabel>
          <TransitionPreview cols={2}>
            <div className="min-w-0">
              <Carousel slides={TR_SLIDES} transition="fade" />
            </div>
            <div className="min-w-0">
              <Carousel slides={TR_SLIDES} transition="slide-up" />
            </div>
            <div className="min-w-0">
              <Carousel slides={TR_SLIDES} transition="slide-right" transitionDelay={100} />
            </div>
            <div className="min-w-0">
              <Carousel slides={TR_SLIDES} transition="zoom" />
            </div>
            <div className="min-w-0">
              <Carousel slides={TR_SLIDES} transition="blur" />
            </div>
            <div className="min-w-0">
              <Carousel slides={TR_SLIDES} transition="drop" transitionDuration={700} />
            </div>
            <div className="min-w-0">
              <Carousel slides={TR_SLIDES} hoverEffect="lift" />
            </div>
            <div className="min-w-0">
              <Carousel slides={TR_SLIDES} hoverEffect="glow" />
            </div>
            <div className="min-w-0">
              <Carousel slides={TR_SLIDES} hoverEffect="shine" />
            </div>
          </TransitionPreview>
          <CodeBlock
            variants={{
              react: `const slides = [
  <div className="flex h-28 items-center justify-center bg-indigo-100 text-indigo-700">Slide 1</div>,
  <div className="flex h-28 items-center justify-center bg-emerald-100 text-emerald-700">Slide 2</div>,
  <div className="flex h-28 items-center justify-center bg-rose-100 text-rose-700">Slide 3</div>,
];

<Carousel slides={slides} transition="fade" />
<Carousel slides={slides} transition="slide-up" />
<Carousel slides={slides} transition="slide-right" transitionDelay={100} />
<Carousel slides={slides} transition="zoom" />
<Carousel slides={slides} transition="blur" />
<Carousel slides={slides} transition="drop" transitionDuration={700} />

<Carousel slides={slides} hoverEffect="lift" />
<Carousel slides={slides} hoverEffect="glow" />
<Carousel slides={slides} hoverEffect="shine" />`,
              js: `<l-Carousel transition="fade"></l-Carousel>
<l-Carousel transition="slide-up"></l-Carousel>
<l-Carousel transition="slide-right" transitionDelay="100"></l-Carousel>
<l-Carousel transition="zoom"></l-Carousel>
<l-Carousel transition="blur"></l-Carousel>
<l-Carousel transition="drop" transitionDuration="700"></l-Carousel>

<l-Carousel hoverEffect="lift"></l-Carousel>
<l-Carousel hoverEffect="glow"></l-Carousel>
<l-Carousel hoverEffect="shine"></l-Carousel>

<script type="module">
  import "lojee-ui/elements";

  const slides = ["Slide 1", "Slide 2", "Slide 3"];
  document.querySelectorAll("l-Carousel").forEach((el) => (el.slides = slides));
</script>`,
              vue: `<template>
  <l-Carousel :slides="slides" transition="fade"></l-Carousel>
  <l-Carousel :slides="slides" transition="slide-up"></l-Carousel>
  <l-Carousel :slides="slides" transition="slide-right" transitionDelay="100"></l-Carousel>
  <l-Carousel :slides="slides" transition="zoom"></l-Carousel>
  <l-Carousel :slides="slides" transition="blur"></l-Carousel>
  <l-Carousel :slides="slides" transition="drop" transitionDuration="700"></l-Carousel>

  <l-Carousel :slides="slides" hoverEffect="lift"></l-Carousel>
  <l-Carousel :slides="slides" hoverEffect="glow"></l-Carousel>
  <l-Carousel :slides="slides" hoverEffect="shine"></l-Carousel>
</template>

<script setup lang="ts">
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
  template: \`
    <l-Carousel [slides]="slides" transition="fade"></l-Carousel>
    <l-Carousel [slides]="slides" transition="slide-up"></l-Carousel>
    <l-Carousel [slides]="slides" transition="slide-right" transitionDelay="100"></l-Carousel>
    <l-Carousel [slides]="slides" transition="zoom"></l-Carousel>
    <l-Carousel [slides]="slides" transition="blur"></l-Carousel>
    <l-Carousel [slides]="slides" transition="drop" transitionDuration="700"></l-Carousel>

    <l-Carousel [slides]="slides" hoverEffect="lift"></l-Carousel>
    <l-Carousel [slides]="slides" hoverEffect="glow"></l-Carousel>
    <l-Carousel [slides]="slides" hoverEffect="shine"></l-Carousel>
  \`,
})
export class AppComponent {
  slides = ["Slide 1", "Slide 2", "Slide 3"];
}`,
            }}
          />
        </section>
      </div>
    </div>
  );
}
