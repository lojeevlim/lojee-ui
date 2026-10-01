import { Badge } from "../Badge";
import CodeBlock from "../../CodeBlock";
import { SectionLabel, Row, TransitionPreview } from "../../ShowcaseHelpers";

export default function BadgeShowcase() {
  return (
    <div>
      <div className="space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-fg">Badge</h1>
          <p className="text-sm text-fg-subtle mt-1">
            Small status/label pills — solid, outline, and soft, in every color.
          </p>
        </div>

        <section>
          <SectionLabel sub="Solid, outline, and soft.">Variants</SectionLabel>
          <Row>
            <Badge variant="solid" label="Solid" />
            <Badge variant="outline" label="Outline" />
            <Badge variant="soft" label="Soft" />
          </Row>
          <CodeBlock
            variants={{
              react: `<Badge variant="solid" label="Solid" />
<Badge variant="outline" label="Outline" />
<Badge variant="soft" label="Soft" />`,
              js: `<l-Badge variant="solid" label="Solid" />
<l-Badge variant="outline" label="Outline" />
<l-Badge variant="soft" label="Soft" />

<script type="module">
  import "lojee-ui/elements";
</script>`,
              vue: `<template>
  <l-Badge variant="solid" label="Solid" />
  <l-Badge variant="outline" label="Outline" />
  <l-Badge variant="soft" label="Soft" />
</template>

<script setup lang="ts">
import "lojee-ui/elements";
</script>`,
              angular: `// badge-showcase.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "lojee-ui/elements";

@Component({
  selector: "app-badge-showcase",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <l-Badge variant="solid" label="Solid" />
    <l-Badge variant="outline" label="Outline" />
    <l-Badge variant="soft" label="Soft" />
  \`,
})
export class BadgeShowcaseComponent {}`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Same palette as Button.">Colors</SectionLabel>
          <Row>
            <Badge color="slate" label="Slate" />
            <Badge color="indigo" label="Indigo" />
            <Badge color="emerald" label="Emerald" />
            <Badge color="rose" label="Rose" />
            <Badge color="amber" label="Amber" />
          </Row>
          <CodeBlock
            variants={{
              react: `<Badge color="indigo" label="Indigo" />
<Badge color="emerald" label="Emerald" />
<Badge color="rose" label="Rose" />`,
              js: `<l-Badge color="indigo" label="Indigo" />
<l-Badge color="emerald" label="Emerald" />
<l-Badge color="rose" label="Rose" />`,
              vue: `<template>
  <l-Badge color="indigo" label="Indigo" />
  <l-Badge color="emerald" label="Emerald" />
  <l-Badge color="rose" label="Rose" />
</template>`,
              angular: `<!-- reuses BadgeShowcaseComponent from above -->
<l-Badge color="indigo" label="Indigo" />
<l-Badge color="emerald" label="Emerald" />
<l-Badge color="rose" label="Rose" />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="sm, md, lg.">Sizes</SectionLabel>
          <Row>
            <Badge size="sm" label="Small" />
            <Badge size="md" label="Medium" />
            <Badge size="lg" label="Large" />
          </Row>
          <CodeBlock
            variants={{
              react: `<Badge size="sm" label="Small" />
<Badge size="md" label="Medium" />
<Badge size="lg" label="Large" />`,
              js: `<l-Badge size="sm" label="Small" />
<l-Badge size="md" label="Medium" />
<l-Badge size="lg" label="Large" />`,
              vue: `<template>
  <l-Badge size="sm" label="Small" />
  <l-Badge size="md" label="Medium" />
  <l-Badge size="lg" label="Large" />
</template>`,
              angular: `<!-- reuses BadgeShowcaseComponent from above -->
<l-Badge size="sm" label="Small" />
<l-Badge size="md" label="Medium" />
<l-Badge size="lg" label="Large" />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="An optional leading icon.">With icon</SectionLabel>
          <Row>
            <Badge icon="check" color="emerald" label="Verified" />
            <Badge icon="circle-alert" color="amber" label="Pending" />
            <Badge icon="circle-x" color="rose" variant="outline" label="Failed" />
          </Row>
          <CodeBlock
            variants={{
              react: `<Badge icon="check" color="emerald" label="Verified" />`,
              js: `<l-Badge icon="check" color="emerald" label="Verified" />`,
              vue: `<template>
  <l-Badge icon="check" color="emerald" label="Verified" />
</template>`,
              angular: `<!-- reuses BadgeShowcaseComponent from above -->
<l-Badge icon="check" color="emerald" label="Verified" />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="No text — a minimal status dot.">Dot indicator</SectionLabel>
          <Row>
            <Badge dot color="emerald" label="Online" />
            <Badge dot color="amber" label="Away" />
            <Badge dot color="rose" label="Offline" />
          </Row>
          <CodeBlock
            variants={{
              react: `<Badge dot color="emerald" label="Online" />`,
              js: `<l-Badge dot color="emerald" label="Online" />`,
              vue: `<template>
  <l-Badge dot color="emerald" label="Online" />
</template>`,
              angular: `<!-- reuses BadgeShowcaseComponent from above -->
<l-Badge dot color="emerald" label="Online" />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Enter transitions via `transition` (with `transitionDuration` / `transitionDelay`) and hover effects via `hoverEffect`. Press Replay to run the enter transitions again.">Transitions</SectionLabel>
          <TransitionPreview layout="inline">
            <Badge transition="fade" label="Fade" />
            <Badge transition="slide-up" label="Slide up" />
            <Badge transition="slide-right" transitionDelay={100} label="Slide right" />
            <Badge transition="zoom" label="Zoom" />
            <Badge transition="flip" label="Flip" />
            <Badge transition="blur" label="Blur" />
            <Badge transition="bounce" label="Bounce" />
            <Badge transition="drop" transitionDuration={700} label="Drop" />
            <Badge hoverEffect="lift" label="Lift" />
            <Badge hoverEffect="glow" label="Glow" />
            <Badge hoverEffect="shine" label="Shine" />
            <Badge hoverEffect="tilt" label="Tilt" />
          </TransitionPreview>
          <CodeBlock
            variants={{
              react: `<Badge transition="fade" label="Fade" />
<Badge transition="slide-up" variant="solid" label="Slide up" />
<Badge transition="slide-right" transitionDelay={100} label="Slide right" />
<Badge transition="zoom" variant="solid" label="Zoom" />
<Badge transition="flip" label="Flip" />
<Badge transition="blur" variant="solid" label="Blur" />
<Badge transition="bounce" label="Bounce" />
<Badge transition="drop" transitionDuration={700} variant="solid" label="Drop" />

<Badge hoverEffect="lift" label="Lift" />
<Badge hoverEffect="scale" label="Scale" />
<Badge hoverEffect="glow" label="Glow" />
<Badge hoverEffect="shine" label="Shine" />
<Badge hoverEffect="tilt" label="Tilt" />`,
              js: `<l-Badge transition="fade" label="Fade"></l-Badge>
<l-Badge transition="slide-up" variant="solid" label="Slide up"></l-Badge>
<l-Badge transition="slide-right" transitionDelay="100" label="Slide right"></l-Badge>
<l-Badge transition="zoom" variant="solid" label="Zoom"></l-Badge>
<l-Badge transition="flip" label="Flip"></l-Badge>
<l-Badge transition="blur" variant="solid" label="Blur"></l-Badge>
<l-Badge transition="bounce" label="Bounce"></l-Badge>
<l-Badge transition="drop" transitionDuration="700" variant="solid" label="Drop"></l-Badge>

<l-Badge hoverEffect="lift" label="Lift"></l-Badge>
<l-Badge hoverEffect="scale" label="Scale"></l-Badge>
<l-Badge hoverEffect="glow" label="Glow"></l-Badge>
<l-Badge hoverEffect="shine" label="Shine"></l-Badge>
<l-Badge hoverEffect="tilt" label="Tilt"></l-Badge>

<script type="module">
  import "lojee-ui/elements";
</script>`,
              vue: `<template>
  <l-Badge transition="fade" label="Fade"></l-Badge>
  <l-Badge transition="slide-up" variant="solid" label="Slide up"></l-Badge>
  <l-Badge transition="slide-right" transitionDelay="100" label="Slide right"></l-Badge>
  <l-Badge transition="zoom" variant="solid" label="Zoom"></l-Badge>
  <l-Badge transition="flip" label="Flip"></l-Badge>
  <l-Badge transition="blur" variant="solid" label="Blur"></l-Badge>
  <l-Badge transition="bounce" label="Bounce"></l-Badge>
  <l-Badge transition="drop" transitionDuration="700" variant="solid" label="Drop"></l-Badge>

  <l-Badge hoverEffect="lift" label="Lift"></l-Badge>
  <l-Badge hoverEffect="scale" label="Scale"></l-Badge>
  <l-Badge hoverEffect="glow" label="Glow"></l-Badge>
  <l-Badge hoverEffect="shine" label="Shine"></l-Badge>
  <l-Badge hoverEffect="tilt" label="Tilt"></l-Badge>
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
    <l-Badge transition="fade" label="Fade"></l-Badge>
    <l-Badge transition="slide-up" variant="solid" label="Slide up"></l-Badge>
    <l-Badge transition="slide-right" transitionDelay="100" label="Slide right"></l-Badge>
    <l-Badge transition="zoom" variant="solid" label="Zoom"></l-Badge>
    <l-Badge transition="flip" label="Flip"></l-Badge>
    <l-Badge transition="blur" variant="solid" label="Blur"></l-Badge>
    <l-Badge transition="bounce" label="Bounce"></l-Badge>
    <l-Badge transition="drop" transitionDuration="700" variant="solid" label="Drop"></l-Badge>

    <l-Badge hoverEffect="lift" label="Lift"></l-Badge>
    <l-Badge hoverEffect="scale" label="Scale"></l-Badge>
    <l-Badge hoverEffect="glow" label="Glow"></l-Badge>
    <l-Badge hoverEffect="shine" label="Shine"></l-Badge>
    <l-Badge hoverEffect="tilt" label="Tilt"></l-Badge>
  \`,
})
export class AppComponent {}`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Attention effects via `animated`. Pulse and border-spin take a solid `pulseColor` or a gradient with `pulseGradientTo`.">Animated</SectionLabel>
          <Row>
            <Badge animated="glow" label="Glow" />
            <Badge animated="pulse" label="Pulse" />
            <Badge animated="pulse" variant="solid" pulseColor="rose" pulseGradientTo="amber" label="Gradient pulse" />
            <Badge animated="sweep" variant="solid" label="Sweep" />
            <Badge animated="bounce" label="Bounce" />
            <Badge animated="float" label="Float" />
            <Badge animated="wiggle" label="Wiggle" />
            <Badge animated="border-spin" pulseColor="violet" pulseGradientTo="cyan" label="Border spin" />
            <Badge dot animated="pulse" color="emerald" label="Online" />
          </Row>
          <CodeBlock
            variants={{
              react: `<Badge animated="glow" label="Glow" />
<Badge animated="pulse" label="Pulse" />
<Badge animated="pulse" variant="solid" pulseColor="rose" pulseGradientTo="amber" label="Gradient pulse" />
<Badge animated="sweep" variant="solid" label="Sweep" />
<Badge animated="bounce" label="Bounce" />
<Badge animated="float" label="Float" />
<Badge animated="wiggle" label="Wiggle" />
<Badge animated="border-spin" pulseColor="violet" pulseGradientTo="cyan" label="Border spin" />
<Badge dot animated="pulse" color="emerald" label="Online" />`,
              js: `<l-Badge animated="glow" label="Glow"></l-Badge>
<l-Badge animated="pulse" label="Pulse"></l-Badge>
<l-Badge animated="pulse" variant="solid" pulseColor="rose" pulseGradientTo="amber" label="Gradient pulse"></l-Badge>
<l-Badge animated="sweep" variant="solid" label="Sweep"></l-Badge>
<l-Badge animated="bounce" label="Bounce"></l-Badge>
<l-Badge animated="float" label="Float"></l-Badge>
<l-Badge animated="wiggle" label="Wiggle"></l-Badge>
<l-Badge animated="border-spin" pulseColor="violet" pulseGradientTo="cyan" label="Border spin"></l-Badge>
<l-Badge dot animated="pulse" color="emerald" label="Online"></l-Badge>

<script type="module">
  import "lojee-ui/elements";
</script>`,
              vue: `<template>
  <l-Badge animated="glow" label="Glow"></l-Badge>
  <l-Badge animated="pulse" label="Pulse"></l-Badge>
  <l-Badge animated="pulse" variant="solid" pulseColor="rose" pulseGradientTo="amber" label="Gradient pulse"></l-Badge>
  <l-Badge animated="sweep" variant="solid" label="Sweep"></l-Badge>
  <l-Badge animated="bounce" label="Bounce"></l-Badge>
  <l-Badge animated="float" label="Float"></l-Badge>
  <l-Badge animated="wiggle" label="Wiggle"></l-Badge>
  <l-Badge animated="border-spin" pulseColor="violet" pulseGradientTo="cyan" label="Border spin"></l-Badge>
  <l-Badge dot animated="pulse" color="emerald" label="Online"></l-Badge>
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
    <l-Badge animated="glow" label="Glow"></l-Badge>
    <l-Badge animated="pulse" label="Pulse"></l-Badge>
    <l-Badge animated="pulse" variant="solid" pulseColor="rose" pulseGradientTo="amber" label="Gradient pulse"></l-Badge>
    <l-Badge animated="sweep" variant="solid" label="Sweep"></l-Badge>
    <l-Badge animated="bounce" label="Bounce"></l-Badge>
    <l-Badge animated="float" label="Float"></l-Badge>
    <l-Badge animated="wiggle" label="Wiggle"></l-Badge>
    <l-Badge animated="border-spin" pulseColor="violet" pulseGradientTo="cyan" label="Border spin"></l-Badge>
    <l-Badge dot animated="pulse" color="emerald" label="Online"></l-Badge>
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
