import { Avatar } from "../Avatar";
import { AvatarGroup } from "../AvatarGroup";
import CodeBlock from "../../CodeBlock";
import { SectionLabel, Row, TransitionPreview } from "../../ShowcaseHelpers";

export default function AvatarShowcase() {
  return (
    <div>
      <div className="space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-fg">Avatar</h1>
          <p className="text-sm text-fg-subtle mt-1">
            User images with an initials fallback, status indicator, and grouping.
          </p>
        </div>

        <section>
          <SectionLabel sub="xs, sm, md, lg, xl.">Sizes</SectionLabel>
          <Row>
            <Avatar size="xs" initials="AB" color="indigo" />
            <Avatar size="sm" initials="AB" color="indigo" />
            <Avatar size="md" initials="AB" color="indigo" />
            <Avatar size="lg" initials="AB" color="indigo" />
            <Avatar size="xl" initials="AB" color="indigo" />
          </Row>
          <CodeBlock
            variants={{
              react: `<Avatar size="md" initials="AB" color="indigo" />`,
              js: `<l-avatar size="md" initials="AB" color="indigo"></l-avatar>

<script type="module">
  import "lojee-ui/elements";
</script>`,
              vue: `<template>
  <l-avatar size="md" initials="AB" color="indigo" />
</template>

<script setup lang="ts">
import "lojee-ui/elements";
</script>`,
              angular: `// avatar-showcase.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "lojee-ui/elements";

@Component({
  selector: "app-avatar-showcase",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`<l-avatar size="md" initials="AB" color="indigo" />\`,
})
export class AvatarShowcaseComponent {}`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Renders an <img>, falling back to initials if it fails to load.">Image with fallback</SectionLabel>
          <Row>
            <Avatar src="https://i.pinimg.com/736x/91/88/1e/91881e844175a978751e6abf0a300639.jpg" initials="LL" color="rose" alt="Lojee Lim" />
            <Avatar initials="JD" color="emerald" alt="Jane Doe" />
            <Avatar initials="MK" color="amber" alt="Max King" />
          </Row>
          <CodeBlock
            variants={{
              react: `<Avatar src="/me.jpg" initials="LL" alt="Lojee Lim" />`,
              js: `<l-avatar src="/me.jpg" initials="LL" alt="Lojee Lim"></l-avatar>`,
              vue: `<template>
  <l-avatar src="/me.jpg" initials="LL" alt="Lojee Lim" />
</template>`,
              angular: `<!-- reuses AvatarShowcaseComponent from above -->
<l-avatar src="/me.jpg" initials="LL" alt="Lojee Lim" />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="A small colored dot, bottom-right.">Status</SectionLabel>
          <Row>
            <Avatar initials="ON" color="slate" status="online" />
            <Avatar initials="AW" color="slate" status="away" />
            <Avatar initials="BS" color="slate" status="busy" />
            <Avatar initials="OF" color="slate" status="offline" />
          </Row>
          <CodeBlock
            variants={{
              react: `<Avatar initials="ON" status="online" />`,
              js: `<l-avatar initials="ON" status="online"></l-avatar>`,
              vue: `<template>
  <l-avatar initials="ON" status="online" />
</template>`,
              angular: `<!-- reuses AvatarShowcaseComponent from above -->
<l-avatar initials="ON" status="online" />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="circle or square.">Shape</SectionLabel>
          <Row>
            <Avatar initials="CI" color="violet" shape="circle" />
            <Avatar initials="SQ" color="violet" shape="square" />
          </Row>
          <CodeBlock
            variants={{
              react: `<Avatar initials="SQ" shape="square" />`,
              js: `<l-avatar initials="SQ" shape="square"></l-avatar>`,
              vue: `<template>
  <l-avatar initials="SQ" shape="square" />
</template>`,
              angular: `<!-- reuses AvatarShowcaseComponent from above -->
<l-avatar initials="SQ" shape="square" />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Overlapping stack, same idea as ButtonGroup.">Avatar group</SectionLabel>
          <Row>
            <AvatarGroup>
              <Avatar initials="AA" color="indigo" />
              <Avatar initials="BB" color="rose" />
              <Avatar initials="CC" color="emerald" />
              <Avatar initials="DD" color="amber" />
            </AvatarGroup>
          </Row>
          <CodeBlock
            variants={{
              react: `<AvatarGroup>
  <Avatar initials="AA" color="indigo" />
  <Avatar initials="BB" color="rose" />
  <Avatar initials="CC" color="emerald" />
</AvatarGroup>`,
              js: `<l-avatar-group>
  <l-avatar initials="AA" color="indigo"></l-avatar>
  <l-avatar initials="BB" color="rose"></l-avatar>
  <l-avatar initials="CC" color="emerald"></l-avatar>
</l-avatar-group>`,
              vue: `<template>
  <l-avatar-group>
    <l-avatar initials="AA" color="indigo" />
    <l-avatar initials="BB" color="rose" />
    <l-avatar initials="CC" color="emerald" />
  </l-avatar-group>
</template>`,
              angular: `<!-- reuses AvatarShowcaseComponent from above -->
<l-avatar-group>
  <l-avatar initials="AA" color="indigo" />
  <l-avatar initials="BB" color="rose" />
  <l-avatar initials="CC" color="emerald" />
</l-avatar-group>`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Enter transitions via `transition` (with `transitionDuration` / `transitionDelay`) and hover effects via `hoverEffect`. Press Replay to run the enter transitions again.">Transitions</SectionLabel>
          <TransitionPreview layout="inline">
            <Avatar transition="fade" initials="FD" />
            <Avatar transition="slide-up" initials="SU" />
            <Avatar transition="slide-right" transitionDelay={100} initials="SR" />
            <Avatar transition="zoom" initials="ZM" />
            <Avatar transition="flip" initials="FL" />
            <Avatar transition="blur" initials="BL" />
            <Avatar transition="bounce" initials="BN" />
            <Avatar transition="drop" transitionDuration={700} initials="DR" />
            <Avatar hoverEffect="lift" initials="LI" />
            <Avatar hoverEffect="glow" initials="GL" />
            <Avatar hoverEffect="shine" initials="SH" />
            <Avatar hoverEffect="tilt" initials="TI" />
          </TransitionPreview>
          <CodeBlock
            variants={{
              react: `<Avatar transition="fade" initials="FD" color="indigo" />
<Avatar transition="slide-up" initials="SU" color="indigo" />
<Avatar transition="slide-right" transitionDelay={100} initials="SR" color="indigo" />
<Avatar transition="zoom" initials="ZM" color="indigo" />
<Avatar transition="flip" initials="FL" color="indigo" />
<Avatar transition="blur" initials="BL" color="indigo" />
<Avatar transition="bounce" initials="BN" color="indigo" />
<Avatar transition="drop" transitionDuration={700} initials="DR" color="indigo" />

<Avatar hoverEffect="lift" initials="LI" color="violet" />
<Avatar hoverEffect="scale" initials="SC" color="violet" />
<Avatar hoverEffect="ring" initials="RI" color="violet" />
<Avatar hoverEffect="glow" initials="GL" color="violet" />
<Avatar hoverEffect="shine" initials="SH" color="violet" />`,
              js: `<l-avatar transition="fade" initials="FD" color="indigo"></l-avatar>
<l-avatar transition="slide-up" initials="SU" color="indigo"></l-avatar>
<l-avatar transition="slide-right" transitionDelay="100" initials="SR" color="indigo"></l-avatar>
<l-avatar transition="zoom" initials="ZM" color="indigo"></l-avatar>
<l-avatar transition="flip" initials="FL" color="indigo"></l-avatar>
<l-avatar transition="blur" initials="BL" color="indigo"></l-avatar>
<l-avatar transition="bounce" initials="BN" color="indigo"></l-avatar>
<l-avatar transition="drop" transitionDuration="700" initials="DR" color="indigo"></l-avatar>

<l-avatar hoverEffect="lift" initials="LI" color="violet"></l-avatar>
<l-avatar hoverEffect="scale" initials="SC" color="violet"></l-avatar>
<l-avatar hoverEffect="ring" initials="RI" color="violet"></l-avatar>
<l-avatar hoverEffect="glow" initials="GL" color="violet"></l-avatar>
<l-avatar hoverEffect="shine" initials="SH" color="violet"></l-avatar>

<script type="module">
  import "lojee-ui/elements";
</script>`,
              vue: `<template>
  <l-avatar transition="fade" initials="FD" color="indigo"></l-avatar>
  <l-avatar transition="slide-up" initials="SU" color="indigo"></l-avatar>
  <l-avatar transition="slide-right" transitionDelay="100" initials="SR" color="indigo"></l-avatar>
  <l-avatar transition="zoom" initials="ZM" color="indigo"></l-avatar>
  <l-avatar transition="flip" initials="FL" color="indigo"></l-avatar>
  <l-avatar transition="blur" initials="BL" color="indigo"></l-avatar>
  <l-avatar transition="bounce" initials="BN" color="indigo"></l-avatar>
  <l-avatar transition="drop" transitionDuration="700" initials="DR" color="indigo"></l-avatar>

  <l-avatar hoverEffect="lift" initials="LI" color="violet"></l-avatar>
  <l-avatar hoverEffect="scale" initials="SC" color="violet"></l-avatar>
  <l-avatar hoverEffect="ring" initials="RI" color="violet"></l-avatar>
  <l-avatar hoverEffect="glow" initials="GL" color="violet"></l-avatar>
  <l-avatar hoverEffect="shine" initials="SH" color="violet"></l-avatar>
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
    <l-avatar transition="fade" initials="FD" color="indigo"></l-avatar>
    <l-avatar transition="slide-up" initials="SU" color="indigo"></l-avatar>
    <l-avatar transition="slide-right" transitionDelay="100" initials="SR" color="indigo"></l-avatar>
    <l-avatar transition="zoom" initials="ZM" color="indigo"></l-avatar>
    <l-avatar transition="flip" initials="FL" color="indigo"></l-avatar>
    <l-avatar transition="blur" initials="BL" color="indigo"></l-avatar>
    <l-avatar transition="bounce" initials="BN" color="indigo"></l-avatar>
    <l-avatar transition="drop" transitionDuration="700" initials="DR" color="indigo"></l-avatar>

    <l-avatar hoverEffect="lift" initials="LI" color="violet"></l-avatar>
    <l-avatar hoverEffect="scale" initials="SC" color="violet"></l-avatar>
    <l-avatar hoverEffect="ring" initials="RI" color="violet"></l-avatar>
    <l-avatar hoverEffect="glow" initials="GL" color="violet"></l-avatar>
    <l-avatar hoverEffect="shine" initials="SH" color="violet"></l-avatar>
  \`,
})
export class AppComponent {}`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Attention effects via `animation`. Pulse and border-spin take a solid `pulseColor` or a gradient with `pulseGradientTo`.">Animation</SectionLabel>
          <Row>
            <Avatar initials="GL" color="indigo" animation="glow" />
            <Avatar initials="PL" color="indigo" animation="pulse" />
            <Avatar initials="GP" color="rose" animation="pulse" pulseColor="rose" pulseGradientTo="amber" status="online" />
            <Avatar initials="SW" color="indigo" animation="sweep" />
            <Avatar initials="BN" color="indigo" animation="bounce" />
            <Avatar initials="FL" color="indigo" animation="float" />
            <Avatar initials="WG" color="indigo" animation="wiggle" />
            <Avatar initials="BS" color="violet" animation="border-spin" pulseColor="violet" pulseGradientTo="cyan" shape="square" />
          </Row>
          <CodeBlock
            variants={{
              react: `<Avatar initials="GL" color="indigo" animation="glow" />
<Avatar initials="PL" color="indigo" animation="pulse" />
<Avatar initials="GP" color="rose" animation="pulse" pulseColor="rose" pulseGradientTo="amber" status="online" />
<Avatar initials="SW" color="indigo" animation="sweep" />
<Avatar initials="BN" color="indigo" animation="bounce" />
<Avatar initials="FL" color="indigo" animation="float" />
<Avatar initials="WG" color="indigo" animation="wiggle" />
<Avatar initials="BS" color="violet" animation="border-spin" pulseColor="violet" pulseGradientTo="cyan" shape="square" />`,
              js: `<l-avatar initials="GL" color="indigo" animation="glow"></l-avatar>
<l-avatar initials="PL" color="indigo" animation="pulse"></l-avatar>
<l-avatar initials="GP" color="rose" animation="pulse" pulseColor="rose" pulseGradientTo="amber" status="online"></l-avatar>
<l-avatar initials="SW" color="indigo" animation="sweep"></l-avatar>
<l-avatar initials="BN" color="indigo" animation="bounce"></l-avatar>
<l-avatar initials="FL" color="indigo" animation="float"></l-avatar>
<l-avatar initials="WG" color="indigo" animation="wiggle"></l-avatar>
<l-avatar initials="BS" color="violet" animation="border-spin" pulseColor="violet" pulseGradientTo="cyan" shape="square"></l-avatar>

<script type="module">
  import "lojee-ui/elements";
</script>`,
              vue: `<template>
  <l-avatar initials="GL" color="indigo" animation="glow"></l-avatar>
  <l-avatar initials="PL" color="indigo" animation="pulse"></l-avatar>
  <l-avatar initials="GP" color="rose" animation="pulse" pulseColor="rose" pulseGradientTo="amber" status="online"></l-avatar>
  <l-avatar initials="SW" color="indigo" animation="sweep"></l-avatar>
  <l-avatar initials="BN" color="indigo" animation="bounce"></l-avatar>
  <l-avatar initials="FL" color="indigo" animation="float"></l-avatar>
  <l-avatar initials="WG" color="indigo" animation="wiggle"></l-avatar>
  <l-avatar initials="BS" color="violet" animation="border-spin" pulseColor="violet" pulseGradientTo="cyan" shape="square"></l-avatar>
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
    <l-avatar initials="GL" color="indigo" animation="glow"></l-avatar>
    <l-avatar initials="PL" color="indigo" animation="pulse"></l-avatar>
    <l-avatar initials="GP" color="rose" animation="pulse" pulseColor="rose" pulseGradientTo="amber" status="online"></l-avatar>
    <l-avatar initials="SW" color="indigo" animation="sweep"></l-avatar>
    <l-avatar initials="BN" color="indigo" animation="bounce"></l-avatar>
    <l-avatar initials="FL" color="indigo" animation="float"></l-avatar>
    <l-avatar initials="WG" color="indigo" animation="wiggle"></l-avatar>
    <l-avatar initials="BS" color="violet" animation="border-spin" pulseColor="violet" pulseGradientTo="cyan" shape="square"></l-avatar>
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
