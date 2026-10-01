import { Radio } from "../Radio";
import { RadioGroup } from "../RadioGroup";
import CodeBlock from "../../CodeBlock";
import { SectionLabel, Row, TransitionPreview } from "../../ShowcaseHelpers";

export default function RadioShowcase() {
  return (
    <div>
      <div className="space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-fg">Radio</h1>
          <p className="text-sm text-fg-subtle mt-1">
            A styled radio input, plus a RadioGroup layout wrapper — exclusivity is native, via a shared `name`.
          </p>
        </div>

        <section>
          <SectionLabel sub="Radios sharing a name are mutually exclusive natively — no state needed.">Vertical group</SectionLabel>
          <RadioGroup>
            <Radio name="plan" label="Free" defaultChecked />
            <Radio name="plan" label="Pro" />
            <Radio name="plan" label="Enterprise" />
          </RadioGroup>
          <CodeBlock
            variants={{
              react: `<RadioGroup>
  <Radio name="plan" label="Free" defaultChecked />
  <Radio name="plan" label="Pro" />
  <Radio name="plan" label="Enterprise" />
</RadioGroup>`,
              js: `<l-RadioGroup>
  <l-Radio name="plan" label="Free" defaultChecked />
  <l-Radio name="plan" label="Pro" />
  <l-Radio name="plan" label="Enterprise" />
</l-RadioGroup>

<script type="module">
  import "lojee-ui/elements";
</script>`,
              vue: `<template>
  <l-RadioGroup>
    <l-Radio name="plan" label="Free" defaultChecked />
    <l-Radio name="plan" label="Pro" />
    <l-Radio name="plan" label="Enterprise" />
  </l-RadioGroup>
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
    <l-RadioGroup>
      <l-Radio name="plan" label="Free" defaultChecked />
      <l-Radio name="plan" label="Pro" />
      <l-Radio name="plan" label="Enterprise" />
    </l-RadioGroup>
  \`,
})
export class AppComponent {}`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub={`orientation="horizontal".`}>Horizontal group</SectionLabel>
          <RadioGroup orientation="horizontal">
            <Radio name="size" label="Small" defaultChecked />
            <Radio name="size" label="Medium" />
            <Radio name="size" label="Large" />
          </RadioGroup>
          <CodeBlock
            variants={{
              react: `<RadioGroup orientation="horizontal">
  <Radio name="size" label="Small" defaultChecked />
  <Radio name="size" label="Medium" />
  <Radio name="size" label="Large" />
</RadioGroup>`,
              js: `<l-RadioGroup orientation="horizontal">
  <l-Radio name="size" label="Small" defaultChecked />
  <l-Radio name="size" label="Medium" />
  <l-Radio name="size" label="Large" />
</l-RadioGroup>`,
              vue: `<template>
  <l-RadioGroup orientation="horizontal">
    <l-Radio name="size" label="Small" defaultChecked />
    <l-Radio name="size" label="Medium" />
    <l-Radio name="size" label="Large" />
  </l-RadioGroup>
</template>`,
              angular: `<!-- app.component.html — same AppComponent as above -->
<l-RadioGroup orientation="horizontal">
  <l-Radio name="size" label="Small" defaultChecked />
  <l-Radio name="size" label="Medium" />
  <l-Radio name="size" label="Large" />
</l-RadioGroup>`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Same palette as Button.">Colors</SectionLabel>
          <Row>
            <Radio name="color-indigo" color="indigo" label="Indigo" defaultChecked />
            <Radio name="color-emerald" color="emerald" label="Emerald" defaultChecked />
            <Radio name="color-rose" color="rose" label="Rose" defaultChecked />
            <Radio name="color-amber" color="amber" label="Amber" defaultChecked />
          </Row>
          <CodeBlock
            variants={{
              react: `<Radio name="color-indigo" color="indigo" label="Indigo" defaultChecked />
<Radio name="color-emerald" color="emerald" label="Emerald" defaultChecked />`,
              js: `<l-Radio name="color-indigo" color="indigo" label="Indigo" defaultChecked />
<l-Radio name="color-emerald" color="emerald" label="Emerald" defaultChecked />`,
              vue: `<template>
  <l-Radio name="color-indigo" color="indigo" label="Indigo" defaultChecked />
  <l-Radio name="color-emerald" color="emerald" label="Emerald" defaultChecked />
</template>`,
              angular: `<!-- app.component.html — same AppComponent as above -->
<l-Radio name="color-indigo" color="indigo" label="Indigo" defaultChecked />
<l-Radio name="color-emerald" color="emerald" label="Emerald" defaultChecked />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Enter transitions via `transition` (with `transitionDuration` / `transitionDelay`) and hover effects via `hoverEffect`. They play on mount — reload the page, or use Replay in the playground.">Transitions</SectionLabel>
          <TransitionPreview layout="inline">
            <Radio transition="fade" label="Fade" />
            <Radio transition="slide-up" label="Slide up" />
            <Radio transition="slide-right" transitionDelay={100} label="Slide right" />
            <Radio transition="zoom" label="Zoom" />
            <Radio transition="flip" label="Flip" />
            <Radio transition="blur" label="Blur" />
            <Radio transition="bounce" label="Bounce" />
            <Radio transition="drop" transitionDuration={700} label="Drop" />
          
          <RadioGroup transition="slide-up" hoverEffect="lift" className="w-fit rounded-lg p-2">
            <Radio name="tr-plan" label="Free" defaultChecked />
            <Radio name="tr-plan" label="Pro" />
          </RadioGroup>
            <Radio className="rounded-md px-2 py-1" hoverEffect="lift" label="Lift" />
            <Radio className="rounded-md px-2 py-1" hoverEffect="scale" label="Scale" />
            <Radio className="rounded-md px-2 py-1" hoverEffect="glow" label="Glow" />
            <Radio className="rounded-md px-2 py-1" hoverEffect="shine" label="Shine" />
          </TransitionPreview>
          <CodeBlock
            variants={{
              react: `<Radio transition="fade" label="Fade" />
<Radio transition="slide-up" label="Slide up" />
<Radio transition="slide-right" transitionDelay={100} label="Slide right" />
<Radio transition="zoom" label="Zoom" />
<Radio transition="flip" label="Flip" />
<Radio transition="blur" label="Blur" />
<Radio transition="bounce" label="Bounce" />
<Radio transition="drop" transitionDuration={700} label="Drop" />

<RadioGroup transition="slide-up" hoverEffect="lift">
  <Radio name="tr-plan" label="Free" defaultChecked />
  <Radio name="tr-plan" label="Pro" />
</RadioGroup>

<Radio hoverEffect="lift" label="Lift" />
<Radio hoverEffect="scale" label="Scale" />
<Radio hoverEffect="glow" label="Glow" />
<Radio hoverEffect="shine" label="Shine" />`,
              js: `<l-Radio transition="fade" label="Fade"></l-Radio>
<l-Radio transition="slide-up" label="Slide up"></l-Radio>
<l-Radio transition="slide-right" transitionDelay="100" label="Slide right"></l-Radio>
<l-Radio transition="zoom" label="Zoom"></l-Radio>
<l-Radio transition="flip" label="Flip"></l-Radio>
<l-Radio transition="blur" label="Blur"></l-Radio>
<l-Radio transition="bounce" label="Bounce"></l-Radio>
<l-Radio transition="drop" transitionDuration="700" label="Drop"></l-Radio>

<l-RadioGroup transition="slide-up" hoverEffect="lift">
  <l-Radio name="tr-plan" label="Free" defaultChecked></l-Radio>
  <l-Radio name="tr-plan" label="Pro"></l-Radio>
</l-RadioGroup>

<l-Radio hoverEffect="lift" label="Lift"></l-Radio>
<l-Radio hoverEffect="scale" label="Scale"></l-Radio>
<l-Radio hoverEffect="glow" label="Glow"></l-Radio>
<l-Radio hoverEffect="shine" label="Shine"></l-Radio>

<script type="module">
  import "lojee-ui/elements";
</script>`,
              vue: `<template>
  <l-Radio transition="fade" label="Fade"></l-Radio>
  <l-Radio transition="slide-up" label="Slide up"></l-Radio>
  <l-Radio transition="slide-right" transitionDelay="100" label="Slide right"></l-Radio>
  <l-Radio transition="zoom" label="Zoom"></l-Radio>
  <l-Radio transition="flip" label="Flip"></l-Radio>
  <l-Radio transition="blur" label="Blur"></l-Radio>
  <l-Radio transition="bounce" label="Bounce"></l-Radio>
  <l-Radio transition="drop" transitionDuration="700" label="Drop"></l-Radio>

  <l-RadioGroup transition="slide-up" hoverEffect="lift">
    <l-Radio name="tr-plan" label="Free" defaultChecked></l-Radio>
    <l-Radio name="tr-plan" label="Pro"></l-Radio>
  </l-RadioGroup>

  <l-Radio hoverEffect="lift" label="Lift"></l-Radio>
  <l-Radio hoverEffect="scale" label="Scale"></l-Radio>
  <l-Radio hoverEffect="glow" label="Glow"></l-Radio>
  <l-Radio hoverEffect="shine" label="Shine"></l-Radio>
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
    <l-Radio transition="fade" label="Fade"></l-Radio>
    <l-Radio transition="slide-up" label="Slide up"></l-Radio>
    <l-Radio transition="slide-right" transitionDelay="100" label="Slide right"></l-Radio>
    <l-Radio transition="zoom" label="Zoom"></l-Radio>
    <l-Radio transition="flip" label="Flip"></l-Radio>
    <l-Radio transition="blur" label="Blur"></l-Radio>
    <l-Radio transition="bounce" label="Bounce"></l-Radio>
    <l-Radio transition="drop" transitionDuration="700" label="Drop"></l-Radio>

    <l-RadioGroup transition="slide-up" hoverEffect="lift">
      <l-Radio name="tr-plan" label="Free" defaultChecked></l-Radio>
      <l-Radio name="tr-plan" label="Pro"></l-Radio>
    </l-RadioGroup>

    <l-Radio hoverEffect="lift" label="Lift"></l-Radio>
    <l-Radio hoverEffect="scale" label="Scale"></l-Radio>
    <l-Radio hoverEffect="glow" label="Glow"></l-Radio>
    <l-Radio hoverEffect="shine" label="Shine"></l-Radio>
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
