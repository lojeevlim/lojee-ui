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
            <div><p className="mb-1.5 font-mono text-xs text-fg-subtle">solid</p><Badge variant="solid" label="Solid" /></div>
            <div><p className="mb-1.5 font-mono text-xs text-fg-subtle">outline</p><Badge variant="outline" label="Outline" /></div>
            <div><p className="mb-1.5 font-mono text-xs text-fg-subtle">soft</p><Badge variant="soft" label="Soft" /></div>
          </Row>
          <CodeBlock
            variants={{
              react: `<Badge variant="solid" label="Solid" />
<Badge variant="outline" label="Outline" />
<Badge variant="soft" label="Soft" />`,
              js: `<l-badge variant="solid" label="Solid"></l-badge>
<l-badge variant="outline" label="Outline"></l-badge>
<l-badge variant="soft" label="Soft"></l-badge>

<script type="module">
  import "lojee-ui/elements";
</script>`,
              vue: `<template>
  <l-badge variant="solid" label="Solid" />
  <l-badge variant="outline" label="Outline" />
  <l-badge variant="soft" label="Soft" />
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
    <l-badge variant="solid" label="Solid" />
    <l-badge variant="outline" label="Outline" />
    <l-badge variant="soft" label="Soft" />
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
              js: `<l-badge color="indigo" label="Indigo"></l-badge>
<l-badge color="emerald" label="Emerald"></l-badge>
<l-badge color="rose" label="Rose"></l-badge>`,
              vue: `<template>
  <l-badge color="indigo" label="Indigo" />
  <l-badge color="emerald" label="Emerald" />
  <l-badge color="rose" label="Rose" />
</template>`,
              angular: `<!-- reuses BadgeShowcaseComponent from above -->
<l-badge color="indigo" label="Indigo" />
<l-badge color="emerald" label="Emerald" />
<l-badge color="rose" label="Rose" />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="xs, sm, md, lg.">Sizes</SectionLabel>
          <Row>
            <Badge size="xs" label="Extra small" />
            <Badge size="sm" label="Small" />
            <Badge size="md" label="Medium" />
            <Badge size="lg" label="Large" />
          </Row>
          <CodeBlock
            variants={{
              react: `<Badge size="xs" label="Extra small" />
<Badge size="sm" label="Small" />
<Badge size="md" label="Medium" />
<Badge size="lg" label="Large" />`,
              js: `<l-badge size="xs" label="Extra small"></l-badge>
<l-badge size="sm" label="Small"></l-badge>
<l-badge size="md" label="Medium"></l-badge>
<l-badge size="lg" label="Large"></l-badge>`,
              vue: `<template>
  <l-badge size="xs" label="Extra small" />
  <l-badge size="sm" label="Small" />
  <l-badge size="md" label="Medium" />
  <l-badge size="lg" label="Large" />
</template>`,
              angular: `<!-- reuses BadgeShowcaseComponent from above -->
<l-badge size="xs" label="Extra small" />
<l-badge size="sm" label="Small" />
<l-badge size="md" label="Medium" />
<l-badge size="lg" label="Large" />`,
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
              js: `<l-badge icon="check" color="emerald" label="Verified"></l-badge>`,
              vue: `<template>
  <l-badge icon="check" color="emerald" label="Verified" />
</template>`,
              angular: `<!-- reuses BadgeShowcaseComponent from above -->
<l-badge icon="check" color="emerald" label="Verified" />`,
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
              js: `<l-badge dot color="emerald" label="Online"></l-badge>`,
              vue: `<template>
  <l-badge dot color="emerald" label="Online" />
</template>`,
              angular: `<!-- reuses BadgeShowcaseComponent from above -->
<l-badge dot color="emerald" label="Online" />`,
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
              js: `<l-badge transition="fade" label="Fade"></l-badge>
<l-badge transition="slide-up" variant="solid" label="Slide up"></l-badge>
<l-badge transition="slide-right" transitionDelay="100" label="Slide right"></l-badge>
<l-badge transition="zoom" variant="solid" label="Zoom"></l-badge>
<l-badge transition="flip" label="Flip"></l-badge>
<l-badge transition="blur" variant="solid" label="Blur"></l-badge>
<l-badge transition="bounce" label="Bounce"></l-badge>
<l-badge transition="drop" transitionDuration="700" variant="solid" label="Drop"></l-badge>

<l-badge hoverEffect="lift" label="Lift"></l-badge>
<l-badge hoverEffect="scale" label="Scale"></l-badge>
<l-badge hoverEffect="glow" label="Glow"></l-badge>
<l-badge hoverEffect="shine" label="Shine"></l-badge>
<l-badge hoverEffect="tilt" label="Tilt"></l-badge>

<script type="module">
  import "lojee-ui/elements";
</script>`,
              vue: `<template>
  <l-badge transition="fade" label="Fade"></l-badge>
  <l-badge transition="slide-up" variant="solid" label="Slide up"></l-badge>
  <l-badge transition="slide-right" transitionDelay="100" label="Slide right"></l-badge>
  <l-badge transition="zoom" variant="solid" label="Zoom"></l-badge>
  <l-badge transition="flip" label="Flip"></l-badge>
  <l-badge transition="blur" variant="solid" label="Blur"></l-badge>
  <l-badge transition="bounce" label="Bounce"></l-badge>
  <l-badge transition="drop" transitionDuration="700" variant="solid" label="Drop"></l-badge>

  <l-badge hoverEffect="lift" label="Lift"></l-badge>
  <l-badge hoverEffect="scale" label="Scale"></l-badge>
  <l-badge hoverEffect="glow" label="Glow"></l-badge>
  <l-badge hoverEffect="shine" label="Shine"></l-badge>
  <l-badge hoverEffect="tilt" label="Tilt"></l-badge>
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
    <l-badge transition="fade" label="Fade"></l-badge>
    <l-badge transition="slide-up" variant="solid" label="Slide up"></l-badge>
    <l-badge transition="slide-right" transitionDelay="100" label="Slide right"></l-badge>
    <l-badge transition="zoom" variant="solid" label="Zoom"></l-badge>
    <l-badge transition="flip" label="Flip"></l-badge>
    <l-badge transition="blur" variant="solid" label="Blur"></l-badge>
    <l-badge transition="bounce" label="Bounce"></l-badge>
    <l-badge transition="drop" transitionDuration="700" variant="solid" label="Drop"></l-badge>

    <l-badge hoverEffect="lift" label="Lift"></l-badge>
    <l-badge hoverEffect="scale" label="Scale"></l-badge>
    <l-badge hoverEffect="glow" label="Glow"></l-badge>
    <l-badge hoverEffect="shine" label="Shine"></l-badge>
    <l-badge hoverEffect="tilt" label="Tilt"></l-badge>
  \`,
})
export class AppComponent {}`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Attention effects via `animation`. Pulse and border-spin take a solid `pulseColor` or a gradient with `pulseGradientTo`.">Animation</SectionLabel>
          <Row>
            <Badge animation="glow" label="Glow" />
            <Badge animation="pulse" label="Pulse" />
            <Badge animation="pulse" variant="solid" pulseColor="rose" pulseGradientTo="amber" label="Gradient pulse" />
            <Badge animation="sweep" variant="solid" label="Sweep" />
            <Badge animation="bounce" label="Bounce" />
            <Badge animation="float" label="Float" />
            <Badge animation="wiggle" label="Wiggle" />
            <Badge animation="border-spin" pulseColor="violet" pulseGradientTo="cyan" label="Border spin" />
            <Badge dot animation="pulse" color="emerald" label="Online" />
          </Row>
          <CodeBlock
            variants={{
              react: `<Badge animation="glow" label="Glow" />
<Badge animation="pulse" label="Pulse" />
<Badge animation="pulse" variant="solid" pulseColor="rose" pulseGradientTo="amber" label="Gradient pulse" />
<Badge animation="sweep" variant="solid" label="Sweep" />
<Badge animation="bounce" label="Bounce" />
<Badge animation="float" label="Float" />
<Badge animation="wiggle" label="Wiggle" />
<Badge animation="border-spin" pulseColor="violet" pulseGradientTo="cyan" label="Border spin" />
<Badge dot animation="pulse" color="emerald" label="Online" />`,
              js: `<l-badge animation="glow" label="Glow"></l-badge>
<l-badge animation="pulse" label="Pulse"></l-badge>
<l-badge animation="pulse" variant="solid" pulseColor="rose" pulseGradientTo="amber" label="Gradient pulse"></l-badge>
<l-badge animation="sweep" variant="solid" label="Sweep"></l-badge>
<l-badge animation="bounce" label="Bounce"></l-badge>
<l-badge animation="float" label="Float"></l-badge>
<l-badge animation="wiggle" label="Wiggle"></l-badge>
<l-badge animation="border-spin" pulseColor="violet" pulseGradientTo="cyan" label="Border spin"></l-badge>
<l-badge dot animation="pulse" color="emerald" label="Online"></l-badge>

<script type="module">
  import "lojee-ui/elements";
</script>`,
              vue: `<template>
  <l-badge animation="glow" label="Glow"></l-badge>
  <l-badge animation="pulse" label="Pulse"></l-badge>
  <l-badge animation="pulse" variant="solid" pulseColor="rose" pulseGradientTo="amber" label="Gradient pulse"></l-badge>
  <l-badge animation="sweep" variant="solid" label="Sweep"></l-badge>
  <l-badge animation="bounce" label="Bounce"></l-badge>
  <l-badge animation="float" label="Float"></l-badge>
  <l-badge animation="wiggle" label="Wiggle"></l-badge>
  <l-badge animation="border-spin" pulseColor="violet" pulseGradientTo="cyan" label="Border spin"></l-badge>
  <l-badge dot animation="pulse" color="emerald" label="Online"></l-badge>
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
    <l-badge animation="glow" label="Glow"></l-badge>
    <l-badge animation="pulse" label="Pulse"></l-badge>
    <l-badge animation="pulse" variant="solid" pulseColor="rose" pulseGradientTo="amber" label="Gradient pulse"></l-badge>
    <l-badge animation="sweep" variant="solid" label="Sweep"></l-badge>
    <l-badge animation="bounce" label="Bounce"></l-badge>
    <l-badge animation="float" label="Float"></l-badge>
    <l-badge animation="wiggle" label="Wiggle"></l-badge>
    <l-badge animation="border-spin" pulseColor="violet" pulseGradientTo="cyan" label="Border spin"></l-badge>
    <l-badge dot animation="pulse" color="emerald" label="Online"></l-badge>
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
