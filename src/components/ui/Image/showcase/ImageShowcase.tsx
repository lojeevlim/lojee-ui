import CodeBlock from "../../CodeBlock";
import { SectionLabel, TransitionPreview } from "../../ShowcaseHelpers";
import { Image } from "../Image";
import { sampleImage } from "../samples";

const PHOTO = sampleImage(0);

export default function ImageShowcase() {
  return (
    <div>
      <div>
        <h1 className="text-2xl font-semibold text-fg">Image</h1>
        <p className="mt-1 text-sm text-fg-subtle">
          A picture with the details handled for you: it loads lazily, shows a shimmer while it loads, fades in, falls back gracefully if it can&apos;t be
          loaded, and sits in a frame of a fixed shape.
        </p>
      </div>

      <section className="mt-10 space-y-3">
        <SectionLabel sub="`src` and `alt` are all you need. The frame fills its container and keeps the picture's own proportions.">Basic</SectionLabel>
        <div className="max-w-md">
          <Image src={PHOTO} alt="Abstract gradient landscape" />
        </div>
        <CodeBlock
          variants={{
            react: `<Image src="/photos/landscape.jpg" alt="A mountain lake at sunrise" />`,
            js: `<l-Image src="/photos/landscape.jpg" alt="A mountain lake at sunrise"></l-Image>

<script type="module">import "lojee-ui/elements";</script>`,
            vue: `<template>
  <l-Image src="/photos/landscape.jpg" alt="A mountain lake at sunrise"></l-Image>
</template>

<script setup lang="ts">
import "lojee-ui/elements";
</script>`,
            angular: `<l-Image src="/photos/landscape.jpg" alt="A mountain lake at sunrise"></l-Image>`,
          }}
        />
      </section>

      <section className="mt-10 space-y-3">
        <SectionLabel sub={'`ratio` gives the frame a fixed shape — "1/1", "4/3", "3/2", "16/9" or "21/9" — and `fit` decides how the picture fills it: "cover" crops to fill, "contain" shows everything, "fill" stretches.'}>
          Ratio and fit
        </SectionLabel>
        <div className="grid gap-4 sm:grid-cols-3">
          <Image src={PHOTO} alt="" ratio="1/1" caption='ratio="1/1"' />
          <Image src={PHOTO} alt="" ratio="16/9" caption='ratio="16/9"' />
          <Image src={PHOTO} alt="" ratio="21/9" caption='ratio="21/9"' />
          <Image src={PHOTO} alt="" ratio="1/1" fit="cover" caption='fit="cover"' />
          <Image src={PHOTO} alt="" ratio="1/1" fit="contain" caption='fit="contain"' />
          <Image src={PHOTO} alt="" ratio="1/1" fit="fill" caption='fit="fill"' />
        </div>
        <CodeBlock
          variants={{
            react: `<Image src={src} alt="" ratio="16/9" fit="cover" />
<Image src={src} alt="" ratio="1/1" fit="contain" />`,
            js: `<l-Image src="/photo.jpg" alt="" ratio="16/9" fit="cover"></l-Image>
<l-Image src="/photo.jpg" alt="" ratio="1/1" fit="contain"></l-Image>`,
            vue: `<template>
  <l-Image src="/photo.jpg" alt="" ratio="16/9" fit="cover"></l-Image>
  <l-Image src="/photo.jpg" alt="" ratio="1/1" fit="contain"></l-Image>
</template>`,
            angular: `<l-Image src="/photo.jpg" alt="" ratio="16/9" fit="cover"></l-Image>
<l-Image src="/photo.jpg" alt="" ratio="1/1" fit="contain"></l-Image>`,
          }}
        />
      </section>

      <section className="mt-10 space-y-3">
        <SectionLabel sub={'`rounded` sets the corner radius: "none" | "sm" | "md" | "lg" (default) | "xl" | "full". With a 1/1 ratio, "full" makes a circle.'}>Rounded</SectionLabel>
        <div className="flex flex-wrap items-end gap-4">
          {(["none", "md", "xl", "full"] as const).map((r, i) => (
            <div key={r} className="w-28">
              <Image src={sampleImage(i + 1)} alt="" ratio="1/1" rounded={r} caption={r} />
            </div>
          ))}
        </div>
        <CodeBlock
          variants={{
            react: `<Image src={src} alt="" ratio="1/1" rounded="full" />`,
            js: `<l-Image src="/avatar.jpg" alt="" ratio="1/1" rounded="full"></l-Image>`,
            vue: `<template>
  <l-Image src="/avatar.jpg" alt="" ratio="1/1" rounded="full"></l-Image>
</template>`,
            angular: `<l-Image src="/avatar.jpg" alt="" ratio="1/1" rounded="full"></l-Image>`,
          }}
        />
      </section>

      <section className="mt-10 space-y-3">
        <SectionLabel sub="If the image can't be loaded (or `src` is empty) a neutral placeholder appears; pass `fallback` to show your own content instead.">Fallback</SectionLabel>
        <div className="grid max-w-xl gap-4 sm:grid-cols-2">
          <Image src="/this-image-does-not-exist.jpg" alt="Missing picture" ratio="4/3" caption="Default fallback" />
          <Image
            src="/this-image-does-not-exist.jpg"
            alt="Missing picture"
            ratio="4/3"
            caption="Custom fallback"
            fallback={<span className="text-sm font-medium text-fg-muted">No preview yet</span>}
          />
        </div>
        <CodeBlock
          variants={{
            react: `<Image src="/missing.jpg" alt="Missing picture" ratio="4/3" />
<Image src="/missing.jpg" alt="Missing picture" ratio="4/3" fallback={<span>No preview yet</span>} />`,
            js: `<l-Image src="/missing.jpg" alt="Missing picture" ratio="4/3"></l-Image>

<l-Image src="/missing.jpg" alt="Missing picture" ratio="4/3">
  <span slot="fallback">No preview yet</span>
</l-Image>`,
            vue: `<template>
  <l-Image src="/missing.jpg" alt="Missing picture" ratio="4/3"></l-Image>

  <l-Image src="/missing.jpg" alt="Missing picture" ratio="4/3">
    <span slot="fallback">No preview yet</span>
  </l-Image>
</template>`,
            angular: `<l-Image src="/missing.jpg" alt="Missing picture" ratio="4/3"></l-Image>

<l-Image src="/missing.jpg" alt="Missing picture" ratio="4/3">
  <span slot="fallback">No preview yet</span>
</l-Image>`,
          }}
        />
      </section>

      <section className="mt-10 space-y-3">
        <SectionLabel sub={'`loading` is "lazy" by default — the browser fetches the picture only when it nears the viewport. Use loading="eager" for images above the fold. `onLoad` and `onError` report the outcome.'}>
          Loading and events
        </SectionLabel>
        <CodeBlock
          variants={{
            react: `<Image
  src={src}
  alt="Hero"
  loading="eager"
  onLoad={() => console.log("loaded")}
  onError={() => console.log("failed")}
/>`,
            js: `<l-Image id="hero" src="/hero.jpg" alt="Hero" loading="eager"></l-Image>

<script type="module">
  import "lojee-ui/elements";

  const img = document.getElementById("hero");
  img.addEventListener("load", () => console.log("loaded"));
  img.addEventListener("error", () => console.log("failed"));
</script>`,
            vue: `<template>
  <l-Image src="/hero.jpg" alt="Hero" loading="eager" @load="onLoad" @error="onError"></l-Image>
</template>

<script setup lang="ts">
import "lojee-ui/elements";

const onLoad = () => console.log("loaded");
const onError = () => console.log("failed");
</script>`,
            angular: `<l-Image src="/hero.jpg" alt="Hero" loading="eager" (load)="onLoad()" (error)="onError()"></l-Image>`,
          }}
        />
      </section>

      <section className="mt-10 space-y-3">
        <SectionLabel sub="Enter transitions via `transition` (with `transitionDuration` / `transitionDelay`) and `hoverEffect`. They play on mount — reload the page, or use Replay in the playground.">Transitions</SectionLabel>
        <TransitionPreview cols={3}>
          <Image src={sampleImage(1)} alt="" ratio="4/3" transition="fade" />
          <Image src={sampleImage(2)} alt="" ratio="4/3" transition="zoom" />
          <Image src={sampleImage(3)} alt="" ratio="4/3" transition="slide-up" hoverEffect="lift" />
        </TransitionPreview>
        <CodeBlock
          variants={{
            react: `<Image src={src} alt="" ratio="4/3" transition="zoom" />
<Image src={src} alt="" ratio="4/3" transition="slide-up" hoverEffect="lift" />`,
            js: `<l-Image src="/photo.jpg" alt="" ratio="4/3" transition="zoom"></l-Image>
<l-Image src="/photo.jpg" alt="" ratio="4/3" transition="slide-up" hover-effect="lift"></l-Image>`,
            vue: `<template>
  <l-Image src="/photo.jpg" alt="" ratio="4/3" transition="zoom"></l-Image>
  <l-Image src="/photo.jpg" alt="" ratio="4/3" transition="slide-up" hover-effect="lift"></l-Image>
</template>`,
            angular: `<l-Image src="/photo.jpg" alt="" ratio="4/3" transition="zoom"></l-Image>
<l-Image src="/photo.jpg" alt="" ratio="4/3" transition="slide-up" hover-effect="lift"></l-Image>`,
          }}
        />
      </section>
    </div>
  );
}
