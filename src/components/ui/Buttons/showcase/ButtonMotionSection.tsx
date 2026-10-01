import { Button } from "../Button";
import CodeBlock from "../../CodeBlock";
import { SectionLabel, Row, TransitionPreview } from "../../ShowcaseHelpers";

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
        <SectionLabel sub="Attention effects via `animated`. Pulse and border-spin take a solid `pulseColor` or a gradient with `pulseGradientTo`.">
          Animated
        </SectionLabel>
        <Row>
          <Button animated="glow" label="Glow" />
          <Button animated="pulse" label="Pulse" />
          <Button animated="pulse" pulseColor="rose" pulseGradientTo="amber" label="Gradient pulse" />
          <Button animated="sweep" label="Sweep" />
          <Button animated="bounce" label="Bounce" />
          <Button animated="float" variant="outline" label="Float" />
          <Button animated="wiggle" label="Wiggle" />
          <Button animated="border-spin" pulseColor="violet" pulseGradientTo="cyan" variant="soft" label="Border spin" />
        </Row>
        <CodeBlock
          variants={{
              react: `<Button animated="glow" label="Glow" />
<Button animated="pulse" label="Pulse" />
<Button animated="pulse" pulseColor="rose" pulseGradientTo="amber" label="Gradient pulse" />
<Button animated="sweep" label="Sweep" />
<Button animated="bounce" label="Bounce" />
<Button animated="float" variant="outline" label="Float" />
<Button animated="wiggle" label="Wiggle" />
<Button animated="border-spin" pulseColor="violet" pulseGradientTo="cyan" variant="soft" label="Border spin" />`,
              js: `<l-Button animated="glow" label="Glow"></l-Button>
<l-Button animated="pulse" label="Pulse"></l-Button>
<l-Button animated="pulse" pulseColor="rose" pulseGradientTo="amber" label="Gradient pulse"></l-Button>
<l-Button animated="sweep" label="Sweep"></l-Button>
<l-Button animated="bounce" label="Bounce"></l-Button>
<l-Button animated="float" variant="outline" label="Float"></l-Button>
<l-Button animated="wiggle" label="Wiggle"></l-Button>
<l-Button animated="border-spin" pulseColor="violet" pulseGradientTo="cyan" variant="soft" label="Border spin"></l-Button>

<script type="module">
  import "lojee-ui/elements";
</script>`,
              vue: `<template>
  <l-Button animated="glow" label="Glow"></l-Button>
  <l-Button animated="pulse" label="Pulse"></l-Button>
  <l-Button animated="pulse" pulseColor="rose" pulseGradientTo="amber" label="Gradient pulse"></l-Button>
  <l-Button animated="sweep" label="Sweep"></l-Button>
  <l-Button animated="bounce" label="Bounce"></l-Button>
  <l-Button animated="float" variant="outline" label="Float"></l-Button>
  <l-Button animated="wiggle" label="Wiggle"></l-Button>
  <l-Button animated="border-spin" pulseColor="violet" pulseGradientTo="cyan" variant="soft" label="Border spin"></l-Button>
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
    <l-Button animated="glow" label="Glow"></l-Button>
    <l-Button animated="pulse" label="Pulse"></l-Button>
    <l-Button animated="pulse" pulseColor="rose" pulseGradientTo="amber" label="Gradient pulse"></l-Button>
    <l-Button animated="sweep" label="Sweep"></l-Button>
    <l-Button animated="bounce" label="Bounce"></l-Button>
    <l-Button animated="float" variant="outline" label="Float"></l-Button>
    <l-Button animated="wiggle" label="Wiggle"></l-Button>
    <l-Button animated="border-spin" pulseColor="violet" pulseGradientTo="cyan" variant="soft" label="Border spin"></l-Button>
  \`,
})
export class AppComponent {}`,
            }}
        />
      </section>
    </>
  );
}
