import { Loader } from "../Loader";
import { Avatar } from "../../Avatar/Avatar";
import CodeBlock from "../../CodeBlock";
import { SectionLabel, Row } from "../../ShowcaseHelpers";

export default function LoaderShowcase() {
  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Loader</h1>
          <p className="text-sm text-slate-500 mt-1">
            Skeleton placeholders for content that's still loading — distinct from Spinner's
            spinning/bouncing indicators.
          </p>
        </div>

        <section>
          <SectionLabel sub="Stacked lines, the last one shorter.">Text skeleton</SectionLabel>
          <div className="max-w-sm">
            <Loader shape="text" lines={3} />
          </div>
          <CodeBlock
            variants={{
              react: `<Loader shape="text" lines={3} />`,
              js: `<Loader shape="text" lines="3" />

<script type="module">
  import "lojee-ui/elements";
</script>`,
              vue: `<template>
  <Loader shape="text" lines="3" />
</template>

<script setup>
import "lojee-ui/elements";
</script>`,
              angular: `// loader-showcase.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "lojee-ui/elements";

@Component({
  selector: "app-loader-showcase",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`<Loader shape="text" lines="3" />\`,
})
export class LoaderShowcaseComponent {}`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="For an avatar-shaped placeholder.">Circle skeleton</SectionLabel>
          <Row>
            <Loader shape="circle" width={40} />
            <Loader shape="circle" width={64} />
          </Row>
          <CodeBlock
            variants={{
              react: `<Loader shape="circle" width={40} />`,
              js: `<Loader shape="circle" width="40" />`,
              vue: `<template>
  <Loader shape="circle" width="40" />
</template>`,
              angular: `<!-- reuses LoaderShowcaseComponent from above -->
<Loader shape="circle" width="40" />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="For image/card placeholders.">Rect skeleton</SectionLabel>
          <Loader shape="rect" height={120} />
          <CodeBlock
            variants={{
              react: `<Loader shape="rect" height={120} />`,
              js: `<Loader shape="rect" height="120" />`,
              vue: `<template>
  <Loader shape="rect" height="120" />
</template>`,
              angular: `<!-- reuses LoaderShowcaseComponent from above -->
<Loader shape="rect" height="120" />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="pulse (default), a sweeping shimmer highlight, or no animation at all.">
            Variant
          </SectionLabel>
          <Row>
            <Loader shape="rect" variant="pulse" width={140} height={80} />
            <Loader shape="rect" variant="shimmer" width={140} height={80} />
            <Loader shape="rect" variant="none" width={140} height={80} />
          </Row>
          <CodeBlock
            variants={{
              react: `<Loader shape="rect" variant="pulse" width={140} height={80} />
<Loader shape="rect" variant="shimmer" width={140} height={80} />
<Loader shape="rect" variant="none" width={140} height={80} />`,
              js: `<Loader shape="rect" variant="pulse" width="140" height="80" />
<Loader shape="rect" variant="shimmer" width="140" height="80" />
<Loader shape="rect" variant="none" width="140" height="80" />`,
              vue: `<template>
  <Loader shape="rect" variant="pulse" width="140" height="80" />
  <Loader shape="rect" variant="shimmer" width="140" height="80" />
  <Loader shape="rect" variant="none" width="140" height="80" />
</template>`,
              angular: `<!-- reuses LoaderShowcaseComponent from above -->
<Loader shape="rect" variant="pulse" width="140" height="80" />
<Loader shape="rect" variant="shimmer" width="140" height="80" />
<Loader shape="rect" variant="none" width="140" height="80" />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Like pulse, but each line's delay is staggered so they ripple instead of fading in sync.">
            Wave variant
          </SectionLabel>
          <div className="max-w-sm">
            <Loader shape="text" variant="wave" lines={4} />
          </div>
          <CodeBlock
            variants={{
              react: `<Loader shape="text" variant="wave" lines={4} />`,
              js: `<Loader shape="text" variant="wave" lines="4" />`,
              vue: `<template>
  <Loader shape="text" variant="wave" lines="4" />
</template>`,
              angular: `<!-- reuses LoaderShowcaseComponent from above -->
<Loader shape="text" variant="wave" lines="4" />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="A common composition — avatar + text lines.">Card example</SectionLabel>
          <div className="flex max-w-sm items-center gap-3">
            <Loader shape="circle" width={40} />
            <div className="flex-1">
              <Loader shape="text" lines={2} />
            </div>
          </div>
          <CodeBlock
            variants={{
              react: `<div className="flex items-center gap-3">
  <Loader shape="circle" width={40} />
  <Loader shape="text" lines={2} />
</div>`,
              js: `<div class="flex items-center gap-3">
  <Loader shape="circle" width="40" />
  <Loader shape="text" lines="2" />
</div>`,
              vue: `<template>
  <div class="flex items-center gap-3">
    <Loader shape="circle" width="40" />
    <Loader shape="text" lines="2" />
  </div>
</template>`,
              angular: `<!-- reuses LoaderShowcaseComponent from above -->
<div class="flex items-center gap-3">
  <Loader shape="circle" width="40" />
  <Loader shape="text" lines="2" />
</div>`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="What it's replacing, for comparison.">Loaded state</SectionLabel>
          <div className="flex items-center gap-3">
            <Avatar initials="JD" color="indigo" />
            <div>
              <p className="text-sm font-medium text-slate-900">Jane Doe</p>
              <p className="text-sm text-slate-500">jane@example.com</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
