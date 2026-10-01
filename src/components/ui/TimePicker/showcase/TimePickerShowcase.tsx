import { TimePicker } from "../TimePicker";
import CodeBlock from "../../CodeBlock";
import { SectionLabel, TransitionPreview } from "../../ShowcaseHelpers";

export default function TimePickerShowcase() {
  return (
    <div className="min-h-screen rounded-xl bg-surface p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-fg">TimePicker</h1>
          <p className="text-sm text-fg-subtle mt-1">
            A styled native time input — the browser's own picker UI handles time selection.
          </p>
        </div>

        <section>
          <SectionLabel sub="A native input type=&quot;time&quot; with a leading icon.">Basic</SectionLabel>
          <div className="max-w-sm">
            <TimePicker />
          </div>
          <CodeBlock
            variants={{
              react: `<TimePicker />`,
              js: `<l-TimePicker />

<script type="module">
  import "lojee-ui/elements";
</script>`,
              vue: `<template>
  <l-TimePicker />
</template>

<script setup lang="ts">
import "lojee-ui/elements";
</script>`,
              angular: `// app.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "lojee-ui/elements";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent {}

<!-- app.component.html -->
<l-TimePicker />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="sm, md, lg.">Sizes</SectionLabel>
          <div className="max-w-sm space-y-3">
            <TimePicker size="sm" />
            <TimePicker size="md" />
            <TimePicker size="lg" />
          </div>
          <CodeBlock
            variants={{
              react: `<TimePicker size="sm" />`,
              js: `<l-TimePicker size="sm" />`,
              vue: `<template>
  <l-TimePicker size="sm" />
</template>`,
              angular: `<!-- app.component.html -->
<l-TimePicker size="sm" />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Red border for error states.">Invalid</SectionLabel>
          <div className="max-w-sm">
            <TimePicker invalid />
          </div>
          <CodeBlock
            variants={{
              react: `<TimePicker invalid />`,
              js: `<l-TimePicker invalid />`,
              vue: `<template>
  <l-TimePicker invalid />
</template>`,
              angular: `<!-- app.component.html -->
<l-TimePicker invalid />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Standard native attributes like min/max/disabled pass through.">Disabled</SectionLabel>
          <div className="max-w-sm">
            <TimePicker disabled />
          </div>
          <CodeBlock
            variants={{
              react: `<TimePicker disabled />`,
              js: `<l-TimePicker disabled />`,
              vue: `<template>
  <l-TimePicker disabled />
</template>`,
              angular: `<!-- app.component.html -->
<l-TimePicker disabled />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Enter transitions via `transition` (with `transitionDuration` / `transitionDelay`) and hover effects via `hoverEffect`. They play on mount — reload the page, or use Replay in the playground.">Transitions</SectionLabel>
          <div className="max-w-2xl"><TransitionPreview cols={2}>
            <TimePicker transition="fade" />
            <TimePicker transition="slide-up" />
            <TimePicker transition="slide-right" transitionDelay={100} />
            <TimePicker transition="zoom" />
            <TimePicker transition="flip" />
            <TimePicker transition="blur" />
            <TimePicker transition="bounce" />
            <TimePicker transition="drop" transitionDuration={700} />
            <TimePicker hoverEffect="lift" />
            <TimePicker hoverEffect="glow" />
            <TimePicker hoverEffect="ring" />
          </TransitionPreview></div>
          <CodeBlock
            variants={{
              react: `<TimePicker transition="fade" />
<TimePicker transition="slide-up" />
<TimePicker transition="slide-right" transitionDelay={100} />
<TimePicker transition="zoom" />
<TimePicker transition="flip" />
<TimePicker transition="blur" />
<TimePicker transition="bounce" />
<TimePicker transition="drop" transitionDuration={700} />

<TimePicker hoverEffect="lift" />
<TimePicker hoverEffect="glow" />
<TimePicker hoverEffect="ring" />`,
              js: `<l-TimePicker transition="fade"></l-TimePicker>
<l-TimePicker transition="slide-up"></l-TimePicker>
<l-TimePicker transition="slide-right" transitionDelay="100"></l-TimePicker>
<l-TimePicker transition="zoom"></l-TimePicker>
<l-TimePicker transition="flip"></l-TimePicker>
<l-TimePicker transition="blur"></l-TimePicker>
<l-TimePicker transition="bounce"></l-TimePicker>
<l-TimePicker transition="drop" transitionDuration="700"></l-TimePicker>

<l-TimePicker hoverEffect="lift"></l-TimePicker>
<l-TimePicker hoverEffect="glow"></l-TimePicker>
<l-TimePicker hoverEffect="ring"></l-TimePicker>

<script type="module">
  import "lojee-ui/elements";
</script>`,
              vue: `<template>
  <l-TimePicker transition="fade"></l-TimePicker>
  <l-TimePicker transition="slide-up"></l-TimePicker>
  <l-TimePicker transition="slide-right" transitionDelay="100"></l-TimePicker>
  <l-TimePicker transition="zoom"></l-TimePicker>
  <l-TimePicker transition="flip"></l-TimePicker>
  <l-TimePicker transition="blur"></l-TimePicker>
  <l-TimePicker transition="bounce"></l-TimePicker>
  <l-TimePicker transition="drop" transitionDuration="700"></l-TimePicker>

  <l-TimePicker hoverEffect="lift"></l-TimePicker>
  <l-TimePicker hoverEffect="glow"></l-TimePicker>
  <l-TimePicker hoverEffect="ring"></l-TimePicker>
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
    <l-TimePicker transition="fade"></l-TimePicker>
    <l-TimePicker transition="slide-up"></l-TimePicker>
    <l-TimePicker transition="slide-right" transitionDelay="100"></l-TimePicker>
    <l-TimePicker transition="zoom"></l-TimePicker>
    <l-TimePicker transition="flip"></l-TimePicker>
    <l-TimePicker transition="blur"></l-TimePicker>
    <l-TimePicker transition="bounce"></l-TimePicker>
    <l-TimePicker transition="drop" transitionDuration="700"></l-TimePicker>

    <l-TimePicker hoverEffect="lift"></l-TimePicker>
    <l-TimePicker hoverEffect="glow"></l-TimePicker>
    <l-TimePicker hoverEffect="ring"></l-TimePicker>
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
