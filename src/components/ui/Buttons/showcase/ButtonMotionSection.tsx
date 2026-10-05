import { Button } from "../Button";
import { Badge } from "../../Badge/Badge";
import CodeBlock from "../../CodeBlock";
import { SectionLabel, Row, TransitionPreview } from "../../ShowcaseHelpers";

// A "Coming soon" tag pinned to the corner of a demo whose effect is not released yet.
function Soon({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative mr-4 mt-4 inline-flex">
      {children}
      {/* Amber Badge; its own ring (a surface-colored outline that follows the badge's corners) keeps it distinct from the button underneath. */}
      <span className="pointer-events-none absolute -right-3 -top-[18px] z-10">
        <Badge variant="solid" color="emerald" size="xs" label="new" className="ring-2 ring-surface" />
      </span>
    </span>
  );
}

// Animated and Transitions demos — kept together at the bottom of the Button page.
export function ButtonMotionSection() {
  return (
    <>
      <section>
        <SectionLabel sub="Enter transitions via `transition` (with `transitionDuration` / `transitionDelay`) and hover effects via `hoverEffect`. Press Replay to run the enter transitions again.">Transitions</SectionLabel>
        <TransitionPreview layout="inline">
          <Button transition="fade" label="Fade" />
          <Button transition="slide-up" label="Slide up" />
          <Button transition="slide-right" transitionDelay={100} label="Slide right" />
          <Button transition="zoom" label="Zoom" />
          <Button transition="flip" label="Flip" />
          <Button transition="blur" label="Blur" />
          <Button transition="bounce" label="Bounce" />
          <Button transition="drop" transitionDuration={700} label="Drop" />
          <Button hoverEffect="lift" label="Lift" />
          <Button hoverEffect="glow" label="Glow" />
          <Button hoverEffect="shine" label="Shine" />
          <Button hoverEffect="tilt" label="Tilt" />
        </TransitionPreview>
        <CodeBlock
          variants={{
            react: `<Button transition="fade" label="Fade" />
<Button transition="slide-up" label="Slide up" />
<Button transition="slide-right" transitionDelay={100} label="Slide right" />
<Button transition="zoom" label="Zoom" />
<Button transition="flip" label="Flip" />
<Button transition="blur" label="Blur" />
<Button transition="bounce" label="Bounce" />
<Button transition="drop" transitionDuration={700} label="Drop" />

<Button hoverEffect="lift" label="Lift" />
<Button hoverEffect="scale" label="Scale" />
<Button hoverEffect="press" label="Press" />
<Button hoverEffect="tilt" label="Tilt" />
<Button hoverEffect="ring" label="Ring" />
<Button hoverEffect="glow" label="Glow" />
<Button hoverEffect="shine" label="Shine" />`,
            js: `<l-Button transition="fade" label="Fade"></l-Button>
<l-Button transition="slide-up" label="Slide up"></l-Button>
<l-Button transition="slide-right" transitionDelay="100" label="Slide right"></l-Button>
<l-Button transition="zoom" label="Zoom"></l-Button>
<l-Button transition="flip" label="Flip"></l-Button>
<l-Button transition="blur" label="Blur"></l-Button>
<l-Button transition="bounce" label="Bounce"></l-Button>
<l-Button transition="drop" transitionDuration="700" label="Drop"></l-Button>

<l-Button hoverEffect="lift" label="Lift"></l-Button>
<l-Button hoverEffect="scale" label="Scale"></l-Button>
<l-Button hoverEffect="press" label="Press"></l-Button>
<l-Button hoverEffect="tilt" label="Tilt"></l-Button>
<l-Button hoverEffect="ring" label="Ring"></l-Button>
<l-Button hoverEffect="glow" label="Glow"></l-Button>
<l-Button hoverEffect="shine" label="Shine"></l-Button>

<script type="module">
  import "lojee-ui/elements";
</script>`,
            vue: `<template>
  <l-Button transition="fade" label="Fade"></l-Button>
  <l-Button transition="slide-up" label="Slide up"></l-Button>
  <l-Button transition="slide-right" transitionDelay="100" label="Slide right"></l-Button>
  <l-Button transition="zoom" label="Zoom"></l-Button>
  <l-Button transition="flip" label="Flip"></l-Button>
  <l-Button transition="blur" label="Blur"></l-Button>
  <l-Button transition="bounce" label="Bounce"></l-Button>
  <l-Button transition="drop" transitionDuration="700" label="Drop"></l-Button>

  <l-Button hoverEffect="lift" label="Lift"></l-Button>
  <l-Button hoverEffect="scale" label="Scale"></l-Button>
  <l-Button hoverEffect="press" label="Press"></l-Button>
  <l-Button hoverEffect="tilt" label="Tilt"></l-Button>
  <l-Button hoverEffect="ring" label="Ring"></l-Button>
  <l-Button hoverEffect="glow" label="Glow"></l-Button>
  <l-Button hoverEffect="shine" label="Shine"></l-Button>
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
    <l-Button transition="fade" label="Fade"></l-Button>
    <l-Button transition="slide-up" label="Slide up"></l-Button>
    <l-Button transition="slide-right" transitionDelay="100" label="Slide right"></l-Button>
    <l-Button transition="zoom" label="Zoom"></l-Button>
    <l-Button transition="flip" label="Flip"></l-Button>
    <l-Button transition="blur" label="Blur"></l-Button>
    <l-Button transition="bounce" label="Bounce"></l-Button>
    <l-Button transition="drop" transitionDuration="700" label="Drop"></l-Button>

    <l-Button hoverEffect="lift" label="Lift"></l-Button>
    <l-Button hoverEffect="scale" label="Scale"></l-Button>
    <l-Button hoverEffect="press" label="Press"></l-Button>
    <l-Button hoverEffect="tilt" label="Tilt"></l-Button>
    <l-Button hoverEffect="ring" label="Ring"></l-Button>
    <l-Button hoverEffect="glow" label="Glow"></l-Button>
    <l-Button hoverEffect="shine" label="Shine"></l-Button>
  \`,
})
export class AppComponent {}`,
          }}
        />
      </section>

      <section>
        <SectionLabel sub={'Attention effects via `animation`. Pulse and border-spin take a solid `pulseColor` or a gradient with `pulseGradientTo`. Particles drift off the button (click it and it sends out one pulse: a thin ripple ring with fading echoes and a burst of particles, like the scrollbar). Tail streams a soft comet trail behind the button while the page scrolls. Combine effects by passing a list — `animation={["particles", "tail"]}`, or a space-separated string on web components (`animation="particles tail pulse"`); element animations (glow, bounce, float, wiggle) run one at a time, the rest stack freely. Scroll the page to see the tail.'}>
          Animation
        </SectionLabel>
        <Row>
          <Button animation="glow" label="Glow" />
          <Button animation="pulse" label="Pulse" />
          <Button animation="pulse" pulseColor="rose" pulseGradientTo="amber" label="Gradient pulse" />
          <Button animation="sweep" label="Sweep" />
          <Button animation="bounce" label="Bounce" />
          <Button animation="float" variant="outline" label="Float" />
          <Button animation="wiggle" label="Wiggle" />
          <Button animation="border-spin" pulseColor="violet" pulseGradientTo="cyan" variant="soft" label="Border spin" />
          <Soon>
            <Button animation="particles" label="Particles" />
          </Soon>
          <Soon>
            <Button animation="particles" pulseColor="rose" variant="outline" label="Particles · rose" />
          </Soon>
          <Soon>
            <Button animation="tail" label="Tail" />
          </Soon>
          <Soon>
            <Button animation={["particles", "tail"]} label="Particles + tail" />
          </Soon>
          <Soon>
            <Button animation={["particles", "tail", "pulse"]} variant="soft" label="Particles + tail + pulse" />
          </Soon>
        </Row>
        <CodeBlock
          variants={{
              react: `<Button animation="glow" label="Glow" />
<Button animation="pulse" label="Pulse" />
<Button animation="pulse" pulseColor="rose" pulseGradientTo="amber" label="Gradient pulse" />
<Button animation="sweep" label="Sweep" />
<Button animation="bounce" label="Bounce" />
<Button animation="float" variant="outline" label="Float" />
<Button animation="wiggle" label="Wiggle" />
<Button animation="border-spin" pulseColor="violet" pulseGradientTo="cyan" variant="soft" label="Border spin" />
<Button animation="particles" label="Particles" />
<Button animation="particles" pulseColor="rose" variant="outline" label="Particles · rose" />
<Button animation="tail" label="Tail" />
<Button animation={["particles", "tail"]} label="Particles + tail" />
<Button animation={["particles", "tail", "pulse"]} variant="soft" label="Particles + tail + pulse" />`,
              js: `<l-Button animation="glow" label="Glow"></l-Button>
<l-Button animation="pulse" label="Pulse"></l-Button>
<l-Button animation="pulse" pulseColor="rose" pulseGradientTo="amber" label="Gradient pulse"></l-Button>
<l-Button animation="sweep" label="Sweep"></l-Button>
<l-Button animation="bounce" label="Bounce"></l-Button>
<l-Button animation="float" variant="outline" label="Float"></l-Button>
<l-Button animation="wiggle" label="Wiggle"></l-Button>
<l-Button animation="border-spin" pulseColor="violet" pulseGradientTo="cyan" variant="soft" label="Border spin"></l-Button>
<l-Button animation="particles" label="Particles"></l-Button>
<l-Button animation="particles" pulseColor="rose" variant="outline" label="Particles · rose"></l-Button>
<l-Button animation="tail" label="Tail"></l-Button>
<l-Button animation="particles tail" label="Particles + tail"></l-Button>
<l-Button animation="particles tail pulse" variant="soft" label="Particles + tail + pulse"></l-Button>

<script type="module">
  import "lojee-ui/elements";
</script>`,
              vue: `<template>
  <l-Button animation="glow" label="Glow"></l-Button>
  <l-Button animation="pulse" label="Pulse"></l-Button>
  <l-Button animation="pulse" pulseColor="rose" pulseGradientTo="amber" label="Gradient pulse"></l-Button>
  <l-Button animation="sweep" label="Sweep"></l-Button>
  <l-Button animation="bounce" label="Bounce"></l-Button>
  <l-Button animation="float" variant="outline" label="Float"></l-Button>
  <l-Button animation="wiggle" label="Wiggle"></l-Button>
  <l-Button animation="border-spin" pulseColor="violet" pulseGradientTo="cyan" variant="soft" label="Border spin"></l-Button>
  <l-Button animation="particles" label="Particles"></l-Button>
  <l-Button animation="particles" pulseColor="rose" variant="outline" label="Particles · rose"></l-Button>
  <l-Button animation="tail" label="Tail"></l-Button>
  <l-Button animation="particles tail" label="Particles + tail"></l-Button>
  <l-Button animation="particles tail pulse" variant="soft" label="Particles + tail + pulse"></l-Button>
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
    <l-Button animation="glow" label="Glow"></l-Button>
    <l-Button animation="pulse" label="Pulse"></l-Button>
    <l-Button animation="pulse" pulseColor="rose" pulseGradientTo="amber" label="Gradient pulse"></l-Button>
    <l-Button animation="sweep" label="Sweep"></l-Button>
    <l-Button animation="bounce" label="Bounce"></l-Button>
    <l-Button animation="float" variant="outline" label="Float"></l-Button>
    <l-Button animation="wiggle" label="Wiggle"></l-Button>
    <l-Button animation="border-spin" pulseColor="violet" pulseGradientTo="cyan" variant="soft" label="Border spin"></l-Button>
    <l-Button animation="particles" label="Particles"></l-Button>
    <l-Button animation="particles" pulseColor="rose" variant="outline" label="Particles · rose"></l-Button>
    <l-Button animation="tail" label="Tail"></l-Button>
    <l-Button animation="particles tail" label="Particles + tail"></l-Button>
    <l-Button animation="particles tail pulse" variant="soft" label="Particles + tail + pulse"></l-Button>
  \`,
})
export class AppComponent {}`,
            }}
        />
      </section>
    </>
  );
}
