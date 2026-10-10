import { Card } from "../Card";
import { Badge } from "../../Badge/Badge";
import CodeBlock from "../../CodeBlock";
import { SectionLabel, Row, TransitionPreview } from "../../ShowcaseHelpers";

// A "Coming soon" tag pinned to the corner of a demo whose variant is not released yet.
function Soon({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative mr-4 mt-4 inline-flex">
      {children}
      {/* Amber Badge; its own ring (a surface-colored outline that follows the badge's corners) keeps it distinct from the card underneath. */}
      <span className="pointer-events-none absolute -right-3 -top-[18px] z-10">
        <Badge variant="solid" color="amber" size="xs" label="Coming soon" className="ring-2 ring-surface" />
      </span>
    </span>
  );
}

export default function CardShowcase() {
  return (
    <div>
      <div className="space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-fg">Card</h1>
          <p className="text-sm text-fg-subtle mt-1">A surface for grouping related content, with optional title and footer.</p>
        </div>

        <section>
          <SectionLabel sub="outline, elevated, soft, ghost, and glass (a frosted frame on every side).">Variants</SectionLabel>
          <Row>
            <div>
              <p className="mb-1.5 font-mono text-xs text-fg-subtle">outline</p>
              <Card variant="outline">Outline</Card>
            </div>
            <div>
              <p className="mb-1.5 font-mono text-xs text-fg-subtle">elevated</p>
              <Card variant="elevated">Elevated</Card>
            </div>
            <div>
              <p className="mb-1.5 font-mono text-xs text-fg-subtle">soft</p>
              <Card variant="soft">Soft</Card>
            </div>
            <div>
              <p className="mb-1.5 font-mono text-xs text-fg-subtle">ghost</p>
              <Card variant="ghost">Ghost</Card>
            </div>
            <div>
              <p className="mb-1.5 font-mono text-xs text-fg-subtle">glass</p>
              <Soon><Card variant="glass">Glass</Card></Soon>
            </div>
          </Row>
          <CodeBlock
            variants={{
              react: `<Card variant="outline">Outline</Card>
<Card variant="elevated">Elevated</Card>
<Card variant="soft">Soft</Card>
<Card variant="ghost">Ghost</Card>
<Card variant="glass">Glass</Card>`,
              js: `<l-card variant="outline">Outline</l-card>
<l-card variant="elevated">Elevated</l-card>
<l-card variant="soft">Soft</l-card>
<l-card variant="ghost">Ghost</l-card>
<l-card variant="glass">Glass</l-card>

<script type="module">
  import "lojee-ui/elements";
</script>`,
              vue: `<template>
  <l-card variant="outline">Outline</l-card>
  <l-card variant="elevated">Elevated</l-card>
  <l-card variant="soft">Soft</l-card>
  <l-card variant="ghost">Ghost</l-card>
  <l-card variant="glass">Glass</l-card>
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
    <l-card variant="outline">Outline</l-card>
    <l-card variant="elevated">Elevated</l-card>
    <l-card variant="soft">Soft</l-card>
    <l-card variant="ghost">Ghost</l-card>
    <l-card variant="glass">Glass</l-card>
  \`,
})
export class AppComponent {}`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Dark mode only: the glass frame lights up like a backlight in the theme colour. Switch the theme to dark and hover, press or scroll to see each one.">Lighting</SectionLabel>
          <div className="flex flex-wrap items-start gap-10 pt-2">
            <div>
              <p className="mb-7 font-mono text-xs text-fg-subtle">lighting="hover"</p>
              <Card variant="glass" lighting="hover">Hover me</Card>
            </div>
            <div>
              <p className="mb-7 font-mono text-xs text-fg-subtle">lighting="press"</p>
              <Card variant="glass" lighting="press">Press me</Card>
            </div>
            <div>
              <p className="mb-7 font-mono text-xs text-fg-subtle">lighting="scroll"</p>
              <Card variant="glass" lighting="scroll">Scroll to center</Card>
            </div>
          </div>
          <CodeBlock
            variants={{
              react: `<Card variant="glass" lighting="hover">Hover me</Card>
<Card variant="glass" lighting="press">Press me</Card>
<Card variant="glass" lighting="scroll">Scroll to center</Card>`,
              js: `<l-card variant="glass" lighting="hover">Hover me</l-card>
<l-card variant="glass" lighting="press">Press me</l-card>
<l-card variant="glass" lighting="scroll">Scroll to center</l-card>

<script type="module">
  import "lojee-ui/elements";
</script>`,
              vue: `<template>
  <l-card variant="glass" lighting="hover">Hover me</l-card>
  <l-card variant="glass" lighting="press">Press me</l-card>
  <l-card variant="glass" lighting="scroll">Scroll to center</l-card>
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
    <l-card variant="glass" lighting="hover">Hover me</l-card>
    <l-card variant="glass" lighting="press">Press me</l-card>
    <l-card variant="glass" lighting="scroll">Scroll to center</l-card>
  \`,
})
export class AppComponent {}`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="none, sm, md, lg.">Padding</SectionLabel>
          <Row>
            <Card padding="none">None</Card>
            <Card padding="sm">Small</Card>
            <Card padding="md">Medium</Card>
            <Card padding="lg">Large</Card>
          </Row>
          <CodeBlock
            variants={{
              react: `<Card padding="sm">Small</Card>
<Card padding="lg">Large</Card>`,
              js: `<l-card padding="sm">Small</l-card>
<l-card padding="lg">Large</l-card>`,
              vue: `<template>
  <l-card padding="sm">Small</l-card>
  <l-card padding="lg">Large</l-card>
</template>`,
              angular: `<!-- reuses the AppComponent from above -->
<l-card padding="sm">Small</l-card>
<l-card padding="lg">Large</l-card>`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Adds a shadow/border lift on hover.">Hoverable</SectionLabel>
          <Row>
            <Card hoverable>Hover me</Card>
            <Card variant="elevated" hoverable>
              Hover me
            </Card>
          </Row>
          <CodeBlock
            variants={{
              react: `<Card hoverable>Hover me</Card>`,
              js: `<l-card hoverable>Hover me</l-card>`,
              vue: `<template>
  <l-card hoverable>Hover me</l-card>
</template>`,
              angular: `<!-- reuses the AppComponent from above -->
<l-card hoverable>Hover me</l-card>`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="A title above the body and a footer below it, separated by a border.">Title and footer</SectionLabel>
          <Card title="Plan details" footer={<span className="text-xs text-fg-subtle">Updated 2 days ago</span>}>
            Your subscription renews monthly and includes unlimited seats.
          </Card>
          <CodeBlock
            variants={{
              react: `<Card
  title="Plan details"
  footer={<span className="text-xs text-fg-subtle">Updated 2 days ago</span>}
>
  Your subscription renews monthly and includes unlimited seats.
</Card>`,
              js: `<l-card title="Plan details" footer="Updated 2 days ago">
  Your subscription renews monthly and includes unlimited seats.
</l-card>`,
              vue: `<template>
  <l-card title="Plan details" footer="Updated 2 days ago">
    Your subscription renews monthly and includes unlimited seats.
  </l-card>
</template>`,
              angular: `<!-- reuses the AppComponent from above -->
<l-card title="Plan details" footer="Updated 2 days ago">
  Your subscription renews monthly and includes unlimited seats.
</l-card>`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Enter transitions via `transition` (with `transitionDuration` / `transitionDelay`) and hover effects via `hoverEffect`. Press Replay to run the enter transitions again.">Transitions</SectionLabel>
          <TransitionPreview>
            <Card transition="fade">Fade</Card>
            <Card transition="slide-up">Slide up</Card>
            <Card transition="slide-right" transitionDelay={100}>Slide right</Card>
            <Card transition="zoom">Zoom</Card>
            <Card transition="flip">Flip</Card>
            <Card transition="blur">Blur</Card>
            <Card transition="bounce">Bounce</Card>
            <Card transition="drop" transitionDuration={700}>Drop</Card>
            <Card hoverEffect="lift">Lift</Card>
            <Card hoverEffect="glow">Glow</Card>
            <Card hoverEffect="shine">Shine</Card>
            <Card hoverEffect="tilt">Tilt</Card>
          </TransitionPreview>
          <CodeBlock
            variants={{
              react: `<Card transition="fade">Fade</Card>
<Card transition="slide-up">Slide up</Card>
<Card transition="slide-right" transitionDelay={100}>Slide right</Card>
<Card transition="zoom">Zoom</Card>
<Card transition="flip">Flip</Card>
<Card transition="blur">Blur</Card>
<Card transition="bounce">Bounce</Card>
<Card transition="drop" transitionDuration={700}>Drop</Card>

<Card hoverEffect="lift">Lift</Card>
<Card hoverEffect="glow">Glow</Card>
<Card hoverEffect="shine">Shine</Card>
<Card hoverEffect="tilt">Tilt</Card>`,
              js: `<l-card transition="fade">Fade</l-card>
<l-card transition="slide-up">Slide up</l-card>
<l-card transition="slide-right" transitionDelay="100">Slide right</l-card>
<l-card transition="zoom">Zoom</l-card>
<l-card transition="flip">Flip</l-card>
<l-card transition="blur">Blur</l-card>
<l-card transition="bounce">Bounce</l-card>
<l-card transition="drop" transitionDuration="700">Drop</l-card>

<l-card hoverEffect="lift">Lift</l-card>
<l-card hoverEffect="glow">Glow</l-card>
<l-card hoverEffect="shine">Shine</l-card>
<l-card hoverEffect="tilt">Tilt</l-card>

<script type="module">
  import "lojee-ui/elements";
</script>`,
              vue: `<template>
  <l-card transition="fade">Fade</l-card>
  <l-card transition="slide-up">Slide up</l-card>
  <l-card transition="slide-right" transitionDelay="100">Slide right</l-card>
  <l-card transition="zoom">Zoom</l-card>
  <l-card transition="flip">Flip</l-card>
  <l-card transition="blur">Blur</l-card>
  <l-card transition="bounce">Bounce</l-card>
  <l-card transition="drop" transitionDuration="700">Drop</l-card>

  <l-card hoverEffect="lift">Lift</l-card>
  <l-card hoverEffect="glow">Glow</l-card>
  <l-card hoverEffect="shine">Shine</l-card>
  <l-card hoverEffect="tilt">Tilt</l-card>
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
    <l-card transition="fade">Fade</l-card>
    <l-card transition="slide-up">Slide up</l-card>
    <l-card transition="slide-right" transitionDelay="100">Slide right</l-card>
    <l-card transition="zoom">Zoom</l-card>
    <l-card transition="flip">Flip</l-card>
    <l-card transition="blur">Blur</l-card>
    <l-card transition="bounce">Bounce</l-card>
    <l-card transition="drop" transitionDuration="700">Drop</l-card>

    <l-card hoverEffect="lift">Lift</l-card>
    <l-card hoverEffect="glow">Glow</l-card>
    <l-card hoverEffect="shine">Shine</l-card>
    <l-card hoverEffect="tilt">Tilt</l-card>
  \`,
})
export class AppComponent {}`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Attention effects via `animation`. Pulse and border-spin take a solid `pulseColor` or a gradient with `pulseGradientTo`.">Animation</SectionLabel>
          <Row>
            <Card animation="glow" className="w-40">Glow</Card>
            <Card animation="pulse" className="w-40">Pulse</Card>
            <Card animation="pulse" pulseColor="rose" pulseGradientTo="amber" className="w-40">Gradient pulse</Card>
            <Card animation="sweep" className="w-40">Sweep</Card>
            <Card animation="bounce" className="w-40">Bounce</Card>
            <Card animation="float" variant="elevated" className="w-40">Float</Card>
            <Card animation="wiggle" className="w-40">Wiggle</Card>
            <Card animation="border-spin" pulseColor="violet" pulseGradientTo="cyan" className="w-40">Border spin</Card>
          </Row>
          <CodeBlock
            variants={{
              react: `<Card animation="glow">Glow</Card>
<Card animation="pulse">Pulse</Card>
<Card animation="pulse" pulseColor="rose" pulseGradientTo="amber">Gradient pulse</Card>
<Card animation="sweep">Sweep</Card>
<Card animation="bounce">Bounce</Card>
<Card animation="float" variant="elevated">Float</Card>
<Card animation="wiggle">Wiggle</Card>
<Card animation="border-spin" pulseColor="violet" pulseGradientTo="cyan">Border spin</Card>`,
              js: `<l-card animation="glow">Glow</l-card>
<l-card animation="pulse">Pulse</l-card>
<l-card animation="pulse" pulseColor="rose" pulseGradientTo="amber">Gradient pulse</l-card>
<l-card animation="sweep">Sweep</l-card>
<l-card animation="bounce">Bounce</l-card>
<l-card animation="float" variant="elevated">Float</l-card>
<l-card animation="wiggle">Wiggle</l-card>
<l-card animation="border-spin" pulseColor="violet" pulseGradientTo="cyan">Border spin</l-card>

<script type="module">
  import "lojee-ui/elements";
</script>`,
              vue: `<template>
  <l-card animation="glow">Glow</l-card>
  <l-card animation="pulse">Pulse</l-card>
  <l-card animation="pulse" pulseColor="rose" pulseGradientTo="amber">Gradient pulse</l-card>
  <l-card animation="sweep">Sweep</l-card>
  <l-card animation="bounce">Bounce</l-card>
  <l-card animation="float" variant="elevated">Float</l-card>
  <l-card animation="wiggle">Wiggle</l-card>
  <l-card animation="border-spin" pulseColor="violet" pulseGradientTo="cyan">Border spin</l-card>
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
    <l-card animation="glow">Glow</l-card>
    <l-card animation="pulse">Pulse</l-card>
    <l-card animation="pulse" pulseColor="rose" pulseGradientTo="amber">Gradient pulse</l-card>
    <l-card animation="sweep">Sweep</l-card>
    <l-card animation="bounce">Bounce</l-card>
    <l-card animation="float" variant="elevated">Float</l-card>
    <l-card animation="wiggle">Wiggle</l-card>
    <l-card animation="border-spin" pulseColor="violet" pulseGradientTo="cyan">Border spin</l-card>
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
