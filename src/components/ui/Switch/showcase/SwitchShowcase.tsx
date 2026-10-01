import { Switch } from "../Switch";
import CodeBlock from "../../CodeBlock";
import { SectionLabel, Row, TransitionPreview } from "../../ShowcaseHelpers";

export default function SwitchShowcase() {
  return (
    <div>
      <div className="space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-fg">Switch</h1>
          <p className="text-sm text-fg-subtle mt-1">
            A styled toggle switch — a native checkbox input under the hood.
          </p>
        </div>

        <section>
          <SectionLabel sub="Off and on (defaultChecked).">Default</SectionLabel>
          <Row>
            <Switch />
            <Switch defaultChecked />
          </Row>
          <CodeBlock
            variants={{
              react: `<Switch />
<Switch defaultChecked />`,
              js: `<l-Switch />
<l-Switch defaultChecked />

<script type="module">
  import "lojee-ui/elements";
</script>`,
              vue: `<template>
  <l-Switch />
  <l-Switch defaultChecked />
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
    <l-Switch />
    <l-Switch defaultChecked />
  \`,
})
export class AppComponent {}`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="sm, md, lg.">Sizes</SectionLabel>
          <Row>
            <Switch size="sm" defaultChecked />
            <Switch size="md" defaultChecked />
            <Switch size="lg" defaultChecked />
          </Row>
          <CodeBlock
            variants={{
              react: `<Switch size="sm" defaultChecked />
<Switch size="md" defaultChecked />
<Switch size="lg" defaultChecked />`,
              js: `<l-Switch size="sm" defaultChecked />
<l-Switch size="md" defaultChecked />
<l-Switch size="lg" defaultChecked />`,
              vue: `<template>
  <l-Switch size="sm" defaultChecked />
  <l-Switch size="md" defaultChecked />
  <l-Switch size="lg" defaultChecked />
</template>`,
              angular: `<!-- app.component.html — same AppComponent as above -->
<l-Switch size="sm" defaultChecked />
<l-Switch size="md" defaultChecked />
<l-Switch size="lg" defaultChecked />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Same palette as Button.">Colors</SectionLabel>
          <Row>
            <Switch color="slate" defaultChecked />
            <Switch color="indigo" defaultChecked />
            <Switch color="emerald" defaultChecked />
            <Switch color="rose" defaultChecked />
            <Switch color="amber" defaultChecked />
          </Row>
          <CodeBlock
            variants={{
              react: `<Switch color="indigo" defaultChecked />
<Switch color="emerald" defaultChecked />
<Switch color="rose" defaultChecked />`,
              js: `<l-Switch color="indigo" defaultChecked />
<l-Switch color="emerald" defaultChecked />
<l-Switch color="rose" defaultChecked />`,
              vue: `<template>
  <l-Switch color="indigo" defaultChecked />
  <l-Switch color="emerald" defaultChecked />
  <l-Switch color="rose" defaultChecked />
</template>`,
              angular: `<!-- app.component.html — same AppComponent as above -->
<l-Switch color="indigo" defaultChecked />
<l-Switch color="emerald" defaultChecked />
<l-Switch color="rose" defaultChecked />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Non-interactive via the native disabled attribute.">Disabled</SectionLabel>
          <Row>
            <Switch disabled />
            <Switch disabled defaultChecked />
          </Row>
          <CodeBlock
            variants={{
              react: `<Switch disabled />
<Switch disabled defaultChecked />`,
              js: `<l-Switch disabled />
<l-Switch disabled defaultChecked />`,
              vue: `<template>
  <l-Switch disabled />
  <l-Switch disabled defaultChecked />
</template>`,
              angular: `<!-- app.component.html — same AppComponent as above -->
<l-Switch disabled />
<l-Switch disabled defaultChecked />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="An optional label prop rendered alongside the track.">With label</SectionLabel>
          <Row>
            <Switch label="Enable notifications" />
            <Switch label="Dark mode" defaultChecked color="indigo" />
          </Row>
          <CodeBlock
            variants={{
              react: `<Switch label="Enable notifications" />`,
              js: `<l-Switch label="Enable notifications" />`,
              vue: `<l-Switch label="Enable notifications" />`,
              angular: `<l-Switch label="Enable notifications" />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Enter transitions via `transition` (with `transitionDuration` / `transitionDelay`) and hover effects via `hoverEffect`. They play on mount — reload the page, or use Replay in the playground.">Transitions</SectionLabel>
          <TransitionPreview layout="inline">
            <Switch transition="fade" label="Fade" defaultChecked />
            <Switch transition="slide-up" label="Slide up" defaultChecked />
            <Switch transition="slide-right" transitionDelay={100} label="Slide right" defaultChecked />
            <Switch transition="zoom" label="Zoom" defaultChecked />
            <Switch transition="flip" label="Flip" defaultChecked />
            <Switch transition="blur" label="Blur" defaultChecked />
            <Switch transition="bounce" label="Bounce" defaultChecked />
            <Switch transition="drop" transitionDuration={700} label="Drop" defaultChecked />
          
            <Switch className="rounded-md px-2 py-1" hoverEffect="lift" label="Lift" />
            <Switch className="rounded-md px-2 py-1" hoverEffect="scale" label="Scale" />
            <Switch className="rounded-md px-2 py-1" hoverEffect="glow" label="Glow" />
            <Switch className="rounded-md px-2 py-1" hoverEffect="shine" label="Shine" />
          </TransitionPreview>
          <CodeBlock
            variants={{
              react: `<Switch transition="fade" label="Fade" defaultChecked />
<Switch transition="slide-up" label="Slide up" defaultChecked />
<Switch transition="slide-right" transitionDelay={100} label="Slide right" defaultChecked />
<Switch transition="zoom" label="Zoom" defaultChecked />
<Switch transition="flip" label="Flip" defaultChecked />
<Switch transition="blur" label="Blur" defaultChecked />
<Switch transition="bounce" label="Bounce" defaultChecked />
<Switch transition="drop" transitionDuration={700} label="Drop" defaultChecked />

<Switch hoverEffect="lift" label="Lift" />
<Switch hoverEffect="scale" label="Scale" />
<Switch hoverEffect="glow" label="Glow" />
<Switch hoverEffect="shine" label="Shine" />`,
              js: `<l-Switch transition="fade" label="Fade" defaultChecked></l-Switch>
<l-Switch transition="slide-up" label="Slide up" defaultChecked></l-Switch>
<l-Switch transition="slide-right" transitionDelay="100" label="Slide right" defaultChecked></l-Switch>
<l-Switch transition="zoom" label="Zoom" defaultChecked></l-Switch>
<l-Switch transition="flip" label="Flip" defaultChecked></l-Switch>
<l-Switch transition="blur" label="Blur" defaultChecked></l-Switch>
<l-Switch transition="bounce" label="Bounce" defaultChecked></l-Switch>
<l-Switch transition="drop" transitionDuration="700" label="Drop" defaultChecked></l-Switch>

<l-Switch hoverEffect="lift" label="Lift"></l-Switch>
<l-Switch hoverEffect="scale" label="Scale"></l-Switch>
<l-Switch hoverEffect="glow" label="Glow"></l-Switch>
<l-Switch hoverEffect="shine" label="Shine"></l-Switch>

<script type="module">
  import "lojee-ui/elements";
</script>`,
              vue: `<template>
  <l-Switch transition="fade" label="Fade" defaultChecked></l-Switch>
  <l-Switch transition="slide-up" label="Slide up" defaultChecked></l-Switch>
  <l-Switch transition="slide-right" transitionDelay="100" label="Slide right" defaultChecked></l-Switch>
  <l-Switch transition="zoom" label="Zoom" defaultChecked></l-Switch>
  <l-Switch transition="flip" label="Flip" defaultChecked></l-Switch>
  <l-Switch transition="blur" label="Blur" defaultChecked></l-Switch>
  <l-Switch transition="bounce" label="Bounce" defaultChecked></l-Switch>
  <l-Switch transition="drop" transitionDuration="700" label="Drop" defaultChecked></l-Switch>

  <l-Switch hoverEffect="lift" label="Lift"></l-Switch>
  <l-Switch hoverEffect="scale" label="Scale"></l-Switch>
  <l-Switch hoverEffect="glow" label="Glow"></l-Switch>
  <l-Switch hoverEffect="shine" label="Shine"></l-Switch>
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
    <l-Switch transition="fade" label="Fade" defaultChecked></l-Switch>
    <l-Switch transition="slide-up" label="Slide up" defaultChecked></l-Switch>
    <l-Switch transition="slide-right" transitionDelay="100" label="Slide right" defaultChecked></l-Switch>
    <l-Switch transition="zoom" label="Zoom" defaultChecked></l-Switch>
    <l-Switch transition="flip" label="Flip" defaultChecked></l-Switch>
    <l-Switch transition="blur" label="Blur" defaultChecked></l-Switch>
    <l-Switch transition="bounce" label="Bounce" defaultChecked></l-Switch>
    <l-Switch transition="drop" transitionDuration="700" label="Drop" defaultChecked></l-Switch>

    <l-Switch hoverEffect="lift" label="Lift"></l-Switch>
    <l-Switch hoverEffect="scale" label="Scale"></l-Switch>
    <l-Switch hoverEffect="glow" label="Glow"></l-Switch>
    <l-Switch hoverEffect="shine" label="Shine"></l-Switch>
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
