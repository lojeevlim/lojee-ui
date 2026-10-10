import { TimePicker } from "../TimePicker";
import CodeBlock from "../../CodeBlock";
import { SectionLabel, TransitionPreview } from "../../ShowcaseHelpers";

export default function TimePickerShowcase() {
  return (
    <div>
      <div className="space-y-12">
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
              js: `<l-time-picker ></l-time-picker>

<script type="module">
  import "lojee-ui/elements";
</script>`,
              vue: `<template>
  <l-time-picker />
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
<l-time-picker />`,
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
              js: `<l-time-picker size="sm"></l-time-picker>`,
              vue: `<template>
  <l-time-picker size="sm" />
</template>`,
              angular: `<!-- app.component.html -->
<l-time-picker size="sm" />`,
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
              js: `<l-time-picker invalid></l-time-picker>`,
              vue: `<template>
  <l-time-picker invalid />
</template>`,
              angular: `<!-- app.component.html -->
<l-time-picker invalid />`,
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
              js: `<l-time-picker disabled></l-time-picker>`,
              vue: `<template>
  <l-time-picker disabled />
</template>`,
              angular: `<!-- app.component.html -->
<l-time-picker disabled />`,
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
              js: `<l-time-picker transition="fade"></l-time-picker>
<l-time-picker transition="slide-up"></l-time-picker>
<l-time-picker transition="slide-right" transitionDelay="100"></l-time-picker>
<l-time-picker transition="zoom"></l-time-picker>
<l-time-picker transition="flip"></l-time-picker>
<l-time-picker transition="blur"></l-time-picker>
<l-time-picker transition="bounce"></l-time-picker>
<l-time-picker transition="drop" transitionDuration="700"></l-time-picker>

<l-time-picker hoverEffect="lift"></l-time-picker>
<l-time-picker hoverEffect="glow"></l-time-picker>
<l-time-picker hoverEffect="ring"></l-time-picker>

<script type="module">
  import "lojee-ui/elements";
</script>`,
              vue: `<template>
  <l-time-picker transition="fade"></l-time-picker>
  <l-time-picker transition="slide-up"></l-time-picker>
  <l-time-picker transition="slide-right" transitionDelay="100"></l-time-picker>
  <l-time-picker transition="zoom"></l-time-picker>
  <l-time-picker transition="flip"></l-time-picker>
  <l-time-picker transition="blur"></l-time-picker>
  <l-time-picker transition="bounce"></l-time-picker>
  <l-time-picker transition="drop" transitionDuration="700"></l-time-picker>

  <l-time-picker hoverEffect="lift"></l-time-picker>
  <l-time-picker hoverEffect="glow"></l-time-picker>
  <l-time-picker hoverEffect="ring"></l-time-picker>
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
    <l-time-picker transition="fade"></l-time-picker>
    <l-time-picker transition="slide-up"></l-time-picker>
    <l-time-picker transition="slide-right" transitionDelay="100"></l-time-picker>
    <l-time-picker transition="zoom"></l-time-picker>
    <l-time-picker transition="flip"></l-time-picker>
    <l-time-picker transition="blur"></l-time-picker>
    <l-time-picker transition="bounce"></l-time-picker>
    <l-time-picker transition="drop" transitionDuration="700"></l-time-picker>

    <l-time-picker hoverEffect="lift"></l-time-picker>
    <l-time-picker hoverEffect="glow"></l-time-picker>
    <l-time-picker hoverEffect="ring"></l-time-picker>
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
