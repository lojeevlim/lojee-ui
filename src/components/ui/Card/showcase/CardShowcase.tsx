import { Card } from "../Card";
import CodeBlock from "../../CodeBlock";
import { SectionLabel, Row, TransitionPreview } from "../../ShowcaseHelpers";

export default function CardShowcase() {
  return (
    <div className="min-h-screen rounded-xl bg-surface p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-fg">Card</h1>
          <p className="text-sm text-fg-subtle mt-1">A surface for grouping related content, with optional title and footer.</p>
        </div>

        <section>
          <SectionLabel sub="outline, elevated, soft, and ghost.">Variants</SectionLabel>
          <Row>
            <Card variant="outline">Outline</Card>
            <Card variant="elevated">Elevated</Card>
            <Card variant="soft">Soft</Card>
            <Card variant="ghost">Ghost</Card>
          </Row>
          <CodeBlock
            variants={{
              react: `<Card variant="outline">Outline</Card>
<Card variant="elevated">Elevated</Card>
<Card variant="soft">Soft</Card>
<Card variant="ghost">Ghost</Card>`,
              js: `<l-Card variant="outline">Outline</l-Card>
<l-Card variant="elevated">Elevated</l-Card>
<l-Card variant="soft">Soft</l-Card>
<l-Card variant="ghost">Ghost</l-Card>

<script type="module">
  import "lojee-ui/elements";
</script>`,
              vue: `<template>
  <l-Card variant="outline">Outline</l-Card>
  <l-Card variant="elevated">Elevated</l-Card>
  <l-Card variant="soft">Soft</l-Card>
  <l-Card variant="ghost">Ghost</l-Card>
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
    <l-Card variant="outline">Outline</l-Card>
    <l-Card variant="elevated">Elevated</l-Card>
    <l-Card variant="soft">Soft</l-Card>
    <l-Card variant="ghost">Ghost</l-Card>
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
              js: `<l-Card padding="sm">Small</l-Card>
<l-Card padding="lg">Large</l-Card>`,
              vue: `<template>
  <l-Card padding="sm">Small</l-Card>
  <l-Card padding="lg">Large</l-Card>
</template>`,
              angular: `<!-- reuses the AppComponent from above -->
<l-Card padding="sm">Small</l-Card>
<l-Card padding="lg">Large</l-Card>`,
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
              js: `<l-Card hoverable>Hover me</l-Card>`,
              vue: `<template>
  <l-Card hoverable>Hover me</l-Card>
</template>`,
              angular: `<!-- reuses the AppComponent from above -->
<l-Card hoverable>Hover me</l-Card>`,
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
              js: `<l-Card title="Plan details" footer="Updated 2 days ago">
  Your subscription renews monthly and includes unlimited seats.
</l-Card>`,
              vue: `<template>
  <l-Card title="Plan details" footer="Updated 2 days ago">
    Your subscription renews monthly and includes unlimited seats.
  </l-Card>
</template>`,
              angular: `<!-- reuses the AppComponent from above -->
<l-Card title="Plan details" footer="Updated 2 days ago">
  Your subscription renews monthly and includes unlimited seats.
</l-Card>`,
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
              js: `<l-Card transition="fade">Fade</l-Card>
<l-Card transition="slide-up">Slide up</l-Card>
<l-Card transition="slide-right" transitionDelay="100">Slide right</l-Card>
<l-Card transition="zoom">Zoom</l-Card>
<l-Card transition="flip">Flip</l-Card>
<l-Card transition="blur">Blur</l-Card>
<l-Card transition="bounce">Bounce</l-Card>
<l-Card transition="drop" transitionDuration="700">Drop</l-Card>

<l-Card hoverEffect="lift">Lift</l-Card>
<l-Card hoverEffect="glow">Glow</l-Card>
<l-Card hoverEffect="shine">Shine</l-Card>
<l-Card hoverEffect="tilt">Tilt</l-Card>

<script type="module">
  import "lojee-ui/elements";
</script>`,
              vue: `<template>
  <l-Card transition="fade">Fade</l-Card>
  <l-Card transition="slide-up">Slide up</l-Card>
  <l-Card transition="slide-right" transitionDelay="100">Slide right</l-Card>
  <l-Card transition="zoom">Zoom</l-Card>
  <l-Card transition="flip">Flip</l-Card>
  <l-Card transition="blur">Blur</l-Card>
  <l-Card transition="bounce">Bounce</l-Card>
  <l-Card transition="drop" transitionDuration="700">Drop</l-Card>

  <l-Card hoverEffect="lift">Lift</l-Card>
  <l-Card hoverEffect="glow">Glow</l-Card>
  <l-Card hoverEffect="shine">Shine</l-Card>
  <l-Card hoverEffect="tilt">Tilt</l-Card>
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
    <l-Card transition="fade">Fade</l-Card>
    <l-Card transition="slide-up">Slide up</l-Card>
    <l-Card transition="slide-right" transitionDelay="100">Slide right</l-Card>
    <l-Card transition="zoom">Zoom</l-Card>
    <l-Card transition="flip">Flip</l-Card>
    <l-Card transition="blur">Blur</l-Card>
    <l-Card transition="bounce">Bounce</l-Card>
    <l-Card transition="drop" transitionDuration="700">Drop</l-Card>

    <l-Card hoverEffect="lift">Lift</l-Card>
    <l-Card hoverEffect="glow">Glow</l-Card>
    <l-Card hoverEffect="shine">Shine</l-Card>
    <l-Card hoverEffect="tilt">Tilt</l-Card>
  \`,
})
export class AppComponent {}`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Attention effects via `animated`. Pulse and border-spin take a solid `pulseColor` or a gradient with `pulseGradientTo`.">Animated</SectionLabel>
          <Row>
            <Card animated="glow" className="w-40">Glow</Card>
            <Card animated="pulse" className="w-40">Pulse</Card>
            <Card animated="pulse" pulseColor="rose" pulseGradientTo="amber" className="w-40">Gradient pulse</Card>
            <Card animated="sweep" className="w-40">Sweep</Card>
            <Card animated="bounce" className="w-40">Bounce</Card>
            <Card animated="float" variant="elevated" className="w-40">Float</Card>
            <Card animated="wiggle" className="w-40">Wiggle</Card>
            <Card animated="border-spin" pulseColor="violet" pulseGradientTo="cyan" className="w-40">Border spin</Card>
          </Row>
          <CodeBlock
            variants={{
              react: `<Card animated="glow">Glow</Card>
<Card animated="pulse">Pulse</Card>
<Card animated="pulse" pulseColor="rose" pulseGradientTo="amber">Gradient pulse</Card>
<Card animated="sweep">Sweep</Card>
<Card animated="bounce">Bounce</Card>
<Card animated="float" variant="elevated">Float</Card>
<Card animated="wiggle">Wiggle</Card>
<Card animated="border-spin" pulseColor="violet" pulseGradientTo="cyan">Border spin</Card>`,
              js: `<l-Card animated="glow">Glow</l-Card>
<l-Card animated="pulse">Pulse</l-Card>
<l-Card animated="pulse" pulseColor="rose" pulseGradientTo="amber">Gradient pulse</l-Card>
<l-Card animated="sweep">Sweep</l-Card>
<l-Card animated="bounce">Bounce</l-Card>
<l-Card animated="float" variant="elevated">Float</l-Card>
<l-Card animated="wiggle">Wiggle</l-Card>
<l-Card animated="border-spin" pulseColor="violet" pulseGradientTo="cyan">Border spin</l-Card>

<script type="module">
  import "lojee-ui/elements";
</script>`,
              vue: `<template>
  <l-Card animated="glow">Glow</l-Card>
  <l-Card animated="pulse">Pulse</l-Card>
  <l-Card animated="pulse" pulseColor="rose" pulseGradientTo="amber">Gradient pulse</l-Card>
  <l-Card animated="sweep">Sweep</l-Card>
  <l-Card animated="bounce">Bounce</l-Card>
  <l-Card animated="float" variant="elevated">Float</l-Card>
  <l-Card animated="wiggle">Wiggle</l-Card>
  <l-Card animated="border-spin" pulseColor="violet" pulseGradientTo="cyan">Border spin</l-Card>
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
    <l-Card animated="glow">Glow</l-Card>
    <l-Card animated="pulse">Pulse</l-Card>
    <l-Card animated="pulse" pulseColor="rose" pulseGradientTo="amber">Gradient pulse</l-Card>
    <l-Card animated="sweep">Sweep</l-Card>
    <l-Card animated="bounce">Bounce</l-Card>
    <l-Card animated="float" variant="elevated">Float</l-Card>
    <l-Card animated="wiggle">Wiggle</l-Card>
    <l-Card animated="border-spin" pulseColor="violet" pulseGradientTo="cyan">Border spin</l-Card>
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
