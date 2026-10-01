import { Stat } from "../Stat";
import { Grid } from "../../Grid/Grid";
import CodeBlock from "../../CodeBlock";
import { SectionLabel, TransitionPreview } from "../../ShowcaseHelpers";

export default function StatShowcase() {
  return (
    <div>
      <div className="space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-fg">Stat</h1>
          <p className="text-sm text-fg-subtle mt-1">
            A single metric card — label, value, and an optional trend or icon. Arrange several with Grid.
          </p>
        </div>

        <section>
          <SectionLabel sub="`countUp` counts the number in `value` up from 0 when the stat mounts, keeping any prefix or suffix such as $ or %. Tune it with `countUpDuration` (ms). Press Replay to run it again.">Count up</SectionLabel>
          <TransitionPreview>
            <Stat label="Revenue" value="$48,290" icon="zap" countUp />
            <Stat label="Active Users" value="12,483" icon="users" countUp />
            <Stat label="Conversion Rate" value="3.42%" icon="activity" countUp countUpDuration={2000} />
            <Stat label="Uptime" value="99.9%" icon="clock" countUp />
          </TransitionPreview>
          <CodeBlock
            variants={{
              react: `<Stat label="Revenue" value="$48,290" icon="zap" countUp />
<Stat label="Active Users" value="12,483" icon="users" countUp />
<Stat label="Conversion Rate" value="3.42%" icon="activity" countUp countUpDuration={2000} />
<Stat label="Uptime" value="99.9%" icon="clock" countUp />`,
              js: `<l-Stat label="Revenue" value="$48,290" icon="zap" countUp="true"></l-Stat>
<l-Stat label="Active Users" value="12,483" icon="users" countUp="true"></l-Stat>
<l-Stat label="Conversion Rate" value="3.42%" icon="activity" countUp="true" countUpDuration="2000"></l-Stat>
<l-Stat label="Uptime" value="99.9%" icon="clock" countUp="true"></l-Stat>

<script type="module">
  import "lojee-ui/elements";
</script>`,
              vue: `<template>
  <l-Stat label="Revenue" value="$48,290" icon="zap" countUp="true"></l-Stat>
  <l-Stat label="Active Users" value="12,483" icon="users" countUp="true"></l-Stat>
  <l-Stat label="Conversion Rate" value="3.42%" icon="activity" countUp="true" countUpDuration="2000"></l-Stat>
  <l-Stat label="Uptime" value="99.9%" icon="clock" countUp="true"></l-Stat>
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
    <l-Stat label="Revenue" value="$48,290" icon="zap" countUp="true"></l-Stat>
    <l-Stat label="Active Users" value="12,483" icon="users" countUp="true"></l-Stat>
    <l-Stat label="Conversion Rate" value="3.42%" icon="activity" countUp="true" countUpDuration="2000"></l-Stat>
    <l-Stat label="Uptime" value="99.9%" icon="clock" countUp="true"></l-Stat>
  \`,
})
export class AppComponent {}`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="A label and a value — no trend, no icon.">Basic</SectionLabel>
          <Grid cols={4} gap="md">
            <Stat label="Revenue" value="$48,290" />
            <Stat label="Active Users" value="12,483" />
            <Stat label="Conversion Rate" value="3.42%" />
            <Stat label="Churn Rate" value="1.08%" />
          </Grid>
          <CodeBlock
            variants={{
              react: `<Grid cols={4} gap="md">
  <Stat label="Revenue" value="$48,290" />
  <Stat label="Active Users" value="12,483" />
  <Stat label="Conversion Rate" value="3.42%" />
  <Stat label="Churn Rate" value="1.08%" />
</Grid>`,
              js: `<l-Grid cols="4" gap="md">
  <l-Stat label="Revenue" value="$48,290" />
  <l-Stat label="Active Users" value="12,483" />
  <l-Stat label="Conversion Rate" value="3.42%" />
  <l-Stat label="Churn Rate" value="1.08%" />
</l-Grid>

<script type="module">import "lojee-ui/elements";</script>`,
              vue: `<template>
  <l-Grid cols="4" gap="md">
    <l-Stat label="Revenue" value="$48,290" />
    <l-Stat label="Active Users" value="12,483" />
    <l-Stat label="Conversion Rate" value="3.42%" />
    <l-Stat label="Churn Rate" value="1.08%" />
  </l-Grid>
</template>`,
              angular: `<l-Grid cols="4" gap="md">
  <l-Stat label="Revenue" value="$48,290" />
  <l-Stat label="Active Users" value="12,483" />
  <l-Stat label="Conversion Rate" value="3.42%" />
  <l-Stat label="Churn Rate" value="1.08%" />
</l-Grid>`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="`change` plus `trend` shows a colored up/down arrow — green for up, rose for down.">
            With trend
          </SectionLabel>
          <Grid cols={4} gap="md">
            <Stat label="Revenue" value="$48,290" change="12.5%" trend="up" />
            <Stat label="Active Users" value="12,483" change="4.1%" trend="up" />
            <Stat label="Churn Rate" value="1.08%" change="0.3%" trend="down" />
            <Stat label="Support Tickets" value="212" change="8.9%" trend="down" />
          </Grid>
          <CodeBlock
            variants={{
              react: `<Stat label="Revenue" value="$48,290" change="12.5%" trend="up" />
<Stat label="Churn Rate" value="1.08%" change="0.3%" trend="down" />`,
              js: `<l-Stat label="Revenue" value="$48,290" change="12.5%" trend="up" />
<l-Stat label="Churn Rate" value="1.08%" change="0.3%" trend="down" />

<script type="module">import "lojee-ui/elements";</script>`,
              vue: `<template>
  <l-Stat label="Revenue" value="$48,290" change="12.5%" trend="up" />
  <l-Stat label="Churn Rate" value="1.08%" change="0.3%" trend="down" />
</template>`,
              angular: `<l-Stat label="Revenue" value="$48,290" change="12.5%" trend="up" />
<l-Stat label="Churn Rate" value="1.08%" change="0.3%" trend="down" />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="A leading icon, tinted with `color`.">With icons</SectionLabel>
          <Grid cols={4} gap="md">
            <Stat label="Revenue" value="$48,290" change="12.5%" trend="up" icon="zap" color="indigo" />
            <Stat label="Active Users" value="12,483" icon="users" color="blue" />
            <Stat label="Orders" value="1,204" change="2.4%" trend="down" icon="tag" color="rose" />
            <Stat label="Uptime" value="99.98%" icon="check" color="emerald" />
          </Grid>
          <CodeBlock
            variants={{
              react: `<Stat
  label="Revenue"
  value="$48,290"
  change="12.5%"
  trend="up"
  icon="zap"
  color="indigo"
/>`,
              js: `<l-Stat label="Revenue" value="$48,290" change="12.5%" trend="up" icon="zap" color="indigo" />

<script type="module">import "lojee-ui/elements";</script>`,
              vue: `<template>
  <l-Stat label="Revenue" value="$48,290" change="12.5%" trend="up" icon="zap" color="indigo" />
</template>`,
              angular: `<l-Stat label="Revenue" value="$48,290" change="12.5%" trend="up" icon="zap" color="indigo" />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="`color` only tints the icon square — it's independent of the up/down trend colors.">
            Colors
          </SectionLabel>
          <Grid cols={4} gap="md">
            <Stat label="Slate" value="128" icon="zap" color="slate" />
            <Stat label="Violet" value="256" icon="zap" color="violet" />
            <Stat label="Teal" value="512" icon="zap" color="teal" />
            <Stat label="Amber" value="1,024" icon="zap" color="amber" />
          </Grid>
          <CodeBlock
            variants={{
              react: `<Stat label="Violet" value="256" icon="zap" color="violet" />`,
              js: `<l-Stat label="Violet" value="256" icon="zap" color="violet" />`,
              vue: `<template>
  <l-Stat label="Violet" value="256" icon="zap" color="violet" />
</template>`,
              angular: `<l-Stat label="Violet" value="256" icon="zap" color="violet" />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Enter transitions via `transition` (with `transitionDuration` / `transitionDelay`) and hover effects via `hoverEffect`. Press Replay to run the enter transitions again.">Transitions</SectionLabel>
          <TransitionPreview>
            <Stat transition="fade" label="Fade" value="48290" icon="zap" />
            <Stat transition="slide-up" label="Slide up" value="12483" icon="users" />
            <Stat transition="slide-right" transitionDelay={100} label="Slide right" value="3420" icon="activity" />
            <Stat transition="zoom" label="Zoom" value="1080" icon="clock" />
            <Stat transition="flip" label="Flip" value="9120" icon="zap" />
            <Stat transition="blur" label="Blur" value="842" icon="users" />
            <Stat transition="bounce" label="Bounce" value="97" icon="activity" />
            <Stat transition="drop" transitionDuration={700} label="Drop" value="24" icon="clock" />
            <Stat hoverEffect="lift" label="Lift" value="$48,290" icon="zap" />
            <Stat hoverEffect="glow" label="Glow" value="$48,290" icon="zap" />
            <Stat hoverEffect="shine" label="Shine" value="$48,290" icon="zap" />
            <Stat hoverEffect="tilt" label="Tilt" value="$48,290" icon="zap" />
          </TransitionPreview>
          <CodeBlock
            variants={{
              react: `<Stat transition="fade" label="Fade" value="48290" icon="zap" />
<Stat transition="slide-up" label="Slide up" value="12483" icon="users" />
<Stat transition="slide-right" transitionDelay={100} label="Slide right" value="3420" icon="activity" />
<Stat transition="zoom" label="Zoom" value="1080" icon="clock" />
<Stat transition="flip" label="Flip" value="9120" icon="zap" />
<Stat transition="blur" label="Blur" value="842" icon="users" />
<Stat transition="bounce" label="Bounce" value="97" icon="activity" />
<Stat transition="drop" transitionDuration={700} label="Drop" value="24" icon="clock" />

<Stat hoverEffect="lift" label="Lift" value="$48,290" icon="zap" />
<Stat hoverEffect="glow" label="Glow" value="$48,290" icon="zap" />
<Stat hoverEffect="shine" label="Shine" value="$48,290" icon="zap" />
<Stat hoverEffect="tilt" label="Tilt" value="$48,290" icon="zap" />`,
              js: `<l-Stat transition="fade" label="Fade" value="48290" icon="zap"></l-Stat>
<l-Stat transition="slide-up" label="Slide up" value="12483" icon="users"></l-Stat>
<l-Stat transition="slide-right" transitionDelay="100" label="Slide right" value="3420" icon="activity"></l-Stat>
<l-Stat transition="zoom" label="Zoom" value="1080" icon="clock"></l-Stat>
<l-Stat transition="flip" label="Flip" value="9120" icon="zap"></l-Stat>
<l-Stat transition="blur" label="Blur" value="842" icon="users"></l-Stat>
<l-Stat transition="bounce" label="Bounce" value="97" icon="activity"></l-Stat>
<l-Stat transition="drop" transitionDuration="700" label="Drop" value="24" icon="clock"></l-Stat>

<l-Stat hoverEffect="lift" label="Lift" value="$48,290" icon="zap"></l-Stat>
<l-Stat hoverEffect="glow" label="Glow" value="$48,290" icon="zap"></l-Stat>
<l-Stat hoverEffect="shine" label="Shine" value="$48,290" icon="zap"></l-Stat>
<l-Stat hoverEffect="tilt" label="Tilt" value="$48,290" icon="zap"></l-Stat>

<script type="module">
  import "lojee-ui/elements";
</script>`,
              vue: `<template>
  <l-Stat transition="fade" label="Fade" value="48290" icon="zap"></l-Stat>
  <l-Stat transition="slide-up" label="Slide up" value="12483" icon="users"></l-Stat>
  <l-Stat transition="slide-right" transitionDelay="100" label="Slide right" value="3420" icon="activity"></l-Stat>
  <l-Stat transition="zoom" label="Zoom" value="1080" icon="clock"></l-Stat>
  <l-Stat transition="flip" label="Flip" value="9120" icon="zap"></l-Stat>
  <l-Stat transition="blur" label="Blur" value="842" icon="users"></l-Stat>
  <l-Stat transition="bounce" label="Bounce" value="97" icon="activity"></l-Stat>
  <l-Stat transition="drop" transitionDuration="700" label="Drop" value="24" icon="clock"></l-Stat>

  <l-Stat hoverEffect="lift" label="Lift" value="$48,290" icon="zap"></l-Stat>
  <l-Stat hoverEffect="glow" label="Glow" value="$48,290" icon="zap"></l-Stat>
  <l-Stat hoverEffect="shine" label="Shine" value="$48,290" icon="zap"></l-Stat>
  <l-Stat hoverEffect="tilt" label="Tilt" value="$48,290" icon="zap"></l-Stat>
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
    <l-Stat transition="fade" label="Fade" value="48290" icon="zap"></l-Stat>
    <l-Stat transition="slide-up" label="Slide up" value="12483" icon="users"></l-Stat>
    <l-Stat transition="slide-right" transitionDelay="100" label="Slide right" value="3420" icon="activity"></l-Stat>
    <l-Stat transition="zoom" label="Zoom" value="1080" icon="clock"></l-Stat>
    <l-Stat transition="flip" label="Flip" value="9120" icon="zap"></l-Stat>
    <l-Stat transition="blur" label="Blur" value="842" icon="users"></l-Stat>
    <l-Stat transition="bounce" label="Bounce" value="97" icon="activity"></l-Stat>
    <l-Stat transition="drop" transitionDuration="700" label="Drop" value="24" icon="clock"></l-Stat>

    <l-Stat hoverEffect="lift" label="Lift" value="$48,290" icon="zap"></l-Stat>
    <l-Stat hoverEffect="glow" label="Glow" value="$48,290" icon="zap"></l-Stat>
    <l-Stat hoverEffect="shine" label="Shine" value="$48,290" icon="zap"></l-Stat>
    <l-Stat hoverEffect="tilt" label="Tilt" value="$48,290" icon="zap"></l-Stat>
  \`,
})
export class AppComponent {}`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Attention effects via `animated`. Pulse and border-spin take a solid `pulseColor` or a gradient with `pulseGradientTo`.">Animated</SectionLabel>
          <Grid cols={4} gap="md">
            <Stat label="Glow" value="$48,290" icon="zap" animated="glow" />
            <Stat label="Pulse" value="12,483" icon="users" animated="pulse" />
            <Stat label="Gradient pulse" value="3.42%" icon="activity" color="rose" animated="pulse" pulseColor="rose" pulseGradientTo="amber" />
            <Stat label="Sweep" value="1.08%" icon="activity" animated="sweep" />
            <Stat label="Bounce" value="$9,120" icon="zap" animated="bounce" />
            <Stat label="Float" value="842" icon="users" animated="float" />
            <Stat label="Wiggle" value="97%" icon="activity" animated="wiggle" />
            <Stat label="Border spin" value="24h" icon="clock" animated="border-spin" pulseColor="violet" pulseGradientTo="cyan" />
          </Grid>
          <CodeBlock
            variants={{
              react: `<Stat label="Glow" value="$48,290" icon="zap" animated="glow" />
<Stat label="Pulse" value="12,483" icon="users" animated="pulse" />
<Stat label="Gradient pulse" value="3.42%" icon="activity" color="rose" animated="pulse" pulseColor="rose" pulseGradientTo="amber" />
<Stat label="Sweep" value="1.08%" icon="activity" animated="sweep" />
<Stat label="Bounce" value="$9,120" icon="zap" animated="bounce" />
<Stat label="Float" value="842" icon="users" animated="float" />
<Stat label="Wiggle" value="97%" icon="activity" animated="wiggle" />
<Stat label="Border spin" value="24h" icon="clock" animated="border-spin" pulseColor="violet" pulseGradientTo="cyan" />`,
              js: `<l-Stat label="Glow" value="$48,290" icon="zap" animated="glow"></l-Stat>
<l-Stat label="Pulse" value="12,483" icon="users" animated="pulse"></l-Stat>
<l-Stat label="Gradient pulse" value="3.42%" icon="activity" color="rose" animated="pulse" pulseColor="rose" pulseGradientTo="amber"></l-Stat>
<l-Stat label="Sweep" value="1.08%" icon="activity" animated="sweep"></l-Stat>
<l-Stat label="Bounce" value="$9,120" icon="zap" animated="bounce"></l-Stat>
<l-Stat label="Float" value="842" icon="users" animated="float"></l-Stat>
<l-Stat label="Wiggle" value="97%" icon="activity" animated="wiggle"></l-Stat>
<l-Stat label="Border spin" value="24h" icon="clock" animated="border-spin" pulseColor="violet" pulseGradientTo="cyan"></l-Stat>

<script type="module">
  import "lojee-ui/elements";
</script>`,
              vue: `<template>
  <l-Stat label="Glow" value="$48,290" icon="zap" animated="glow"></l-Stat>
  <l-Stat label="Pulse" value="12,483" icon="users" animated="pulse"></l-Stat>
  <l-Stat label="Gradient pulse" value="3.42%" icon="activity" color="rose" animated="pulse" pulseColor="rose" pulseGradientTo="amber"></l-Stat>
  <l-Stat label="Sweep" value="1.08%" icon="activity" animated="sweep"></l-Stat>
  <l-Stat label="Bounce" value="$9,120" icon="zap" animated="bounce"></l-Stat>
  <l-Stat label="Float" value="842" icon="users" animated="float"></l-Stat>
  <l-Stat label="Wiggle" value="97%" icon="activity" animated="wiggle"></l-Stat>
  <l-Stat label="Border spin" value="24h" icon="clock" animated="border-spin" pulseColor="violet" pulseGradientTo="cyan"></l-Stat>
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
    <l-Stat label="Glow" value="$48,290" icon="zap" animated="glow"></l-Stat>
    <l-Stat label="Pulse" value="12,483" icon="users" animated="pulse"></l-Stat>
    <l-Stat label="Gradient pulse" value="3.42%" icon="activity" color="rose" animated="pulse" pulseColor="rose" pulseGradientTo="amber"></l-Stat>
    <l-Stat label="Sweep" value="1.08%" icon="activity" animated="sweep"></l-Stat>
    <l-Stat label="Bounce" value="$9,120" icon="zap" animated="bounce"></l-Stat>
    <l-Stat label="Float" value="842" icon="users" animated="float"></l-Stat>
    <l-Stat label="Wiggle" value="97%" icon="activity" animated="wiggle"></l-Stat>
    <l-Stat label="Border spin" value="24h" icon="clock" animated="border-spin" pulseColor="violet" pulseGradientTo="cyan"></l-Stat>
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
