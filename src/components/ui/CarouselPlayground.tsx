import { useState } from "react";
import { Carousel } from "./Carousel/Carousel";
import { PlaygroundLayout, AppWindowFrame, AppWindowBody } from "./PlaygroundHelpers";
import type { CodeBlockVariants } from "./CodeBlock";

const SLIDE_CLASS = "flex h-40 w-full items-center justify-center text-sm font-medium";

const SAMPLE_SLIDES = [
  <div key="1" className={`${SLIDE_CLASS} bg-indigo-100 text-indigo-700`}>
    Slide 1
  </div>,
  <div key="2" className={`${SLIDE_CLASS} bg-emerald-100 text-emerald-700`}>
    Slide 2
  </div>,
  <div key="3" className={`${SLIDE_CLASS} bg-rose-100 text-rose-700`}>
    Slide 3
  </div>,
];

const SAMPLE_SLIDES_CODE = `[
    <div className="flex h-40 items-center justify-center bg-indigo-100 text-indigo-700">Slide 1</div>,
    <div className="flex h-40 items-center justify-center bg-emerald-100 text-emerald-700">Slide 2</div>,
    <div className="flex h-40 items-center justify-center bg-rose-100 text-rose-700">Slide 3</div>,
  ]`;

export default function CarouselPlayground() {
  const [autoPlay, setAutoPlay] = useState(false);
  const [showArrows, setShowArrows] = useState(true);
  const [showDots, setShowDots] = useState(true);

  const preview = (
    <AppWindowFrame>
      <AppWindowBody>
        <Carousel slides={SAMPLE_SLIDES} autoPlay={autoPlay} showArrows={showArrows} showDots={showDots} />
      </AppWindowBody>
    </AppWindowFrame>
  );

  const code = `<Carousel
  slides={${SAMPLE_SLIDES_CODE}}${autoPlay ? "\n  autoPlay" : ""}${!showArrows ? "\n  showArrows={false}" : ""}${
    !showDots ? "\n  showDots={false}" : ""
  }
/>`;

  // `slides` is a "json"-typed prop with no native attribute form — it must
  // be assigned as a real DOM property (js) or bound (vue/angular) rather
  // than stringified into the tag. The React-only colored `<div>` wrappers in
  // SAMPLE_SLIDES have no registered `<Carousel>` equivalent (arbitrary JSX
  // content isn't representable outside React), so each slide's plain text
  // is reproduced instead.
  const attrs = `${autoPlay ? ` autoPlay` : ""}${!showArrows ? ` showArrows="false"` : ""}${
    !showDots ? ` showDots="false"` : ""
  }`;

  const slidesData = `["Slide 1", "Slide 2", "Slide 3"]`;

  const codeVariants: CodeBlockVariants = {
    react: code,
    js: `<Carousel id="carousel-demo"${attrs} />

<script type="module">
  import "lojee-ui/elements";

  const slides = ${slidesData};

  const el = document.getElementById("carousel-demo");
  el.slides = slides;
</script>`,
    vue: `<template>
  <Carousel :slides="slides"${attrs} />
</template>

<script setup>
const slides = ${slidesData};
</script>`,
    angular: `<Carousel [slides]="slides"${attrs} />

slides = ${slidesData};`,
  };

  return (
    <PlaygroundLayout preview={preview} variants={codeVariants}>
      <div>
        <span className="mb-1.5 block text-xs font-medium text-slate-500">Options</span>
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setAutoPlay((v) => !v)}
            className={
              "rounded-md px-2.5 py-1 text-xs font-medium transition-colors " +
              (autoPlay ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200")
            }
          >
            Autoplay
          </button>
          <button
            type="button"
            onClick={() => setShowArrows((v) => !v)}
            className={
              "rounded-md px-2.5 py-1 text-xs font-medium transition-colors " +
              (showArrows ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200")
            }
          >
            Arrows
          </button>
          <button
            type="button"
            onClick={() => setShowDots((v) => !v)}
            className={
              "rounded-md px-2.5 py-1 text-xs font-medium transition-colors " +
              (showDots ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200")
            }
          >
            Dots
          </button>
        </div>
      </div>
    </PlaygroundLayout>
  );
}
