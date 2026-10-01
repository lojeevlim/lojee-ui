import { ProfileCard } from "../ProfileCard";
import { Button } from "../../Buttons/Button";
import CodeBlock from "../../CodeBlock";
import { SectionLabel, TransitionPreview } from "../../ShowcaseHelpers";

export default function ProfileCardShowcase() {
  return (
    <div className="min-h-screen rounded-xl bg-surface p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-fg">ProfileCard</h1>
          <p className="text-sm text-fg-subtle mt-1">
            A user profile summary — avatar, name, role, bio, and optional stats or actions.
          </p>
        </div>

        <section>
          <SectionLabel sub="Name, role, and a short bio — no stats or actions.">Basic</SectionLabel>
          <div className="max-w-sm">
            <ProfileCard
              name="Priya Nair"
              role="Product Designer at Lojee"
              bio="Building accessible, joyful interfaces. Previously at Figma and Notion."
              avatarInitials="PN"
            />
          </div>
          <CodeBlock
            variants={{
              react: `<ProfileCard
  name="Priya Nair"
  role="Product Designer at Lojee"
  bio="Building accessible, joyful interfaces. Previously at Figma and Notion."
  avatarInitials="PN"
/>`,
              js: `<l-ProfileCard
  name="Priya Nair"
  role="Product Designer at Lojee"
  bio="Building accessible, joyful interfaces. Previously at Figma and Notion."
  avatarInitials="PN"
/>

<script type="module">import "lojee-ui/elements";</script>`,
              vue: `<template>
  <l-ProfileCard
    name="Priya Nair"
    role="Product Designer at Lojee"
    bio="Building accessible, joyful interfaces. Previously at Figma and Notion."
    avatarInitials="PN"
  />
</template>`,
              angular: `<l-ProfileCard
  name="Priya Nair"
  role="Product Designer at Lojee"
  bio="Building accessible, joyful interfaces. Previously at Figma and Notion."
  avatarInitials="PN"
></l-ProfileCard>`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="A short row of stats, e.g. Followers/Following/Posts.">With stats</SectionLabel>
          <div className="max-w-sm">
            <ProfileCard
              name="Priya Nair"
              role="Product Designer at Lojee"
              avatarInitials="PN"
              stats={[
                { label: "Followers", value: "2,481" },
                { label: "Following", value: "312" },
                { label: "Posts", value: "48" },
              ]}
            />
          </div>
          <CodeBlock
            variants={{
              react: `<ProfileCard
  name="Priya Nair"
  role="Product Designer at Lojee"
  avatarInitials="PN"
  stats={[
    { label: "Followers", value: "2,481" },
    { label: "Following", value: "312" },
    { label: "Posts", value: "48" },
  ]}
/>`,
              js: `<l-ProfileCard id="profile-card" name="Priya Nair" role="Product Designer at Lojee" avatarInitials="PN"></l-ProfileCard>

<script type="module">
  import "lojee-ui/elements";

  document.getElementById("profile-card").stats = [
    { label: "Followers", value: "2,481" },
    { label: "Following", value: "312" },
    { label: "Posts", value: "48" },
  ];
</script>`,
              vue: `<template>
  <l-ProfileCard name="Priya Nair" role="Product Designer at Lojee" avatarInitials="PN" :stats="stats" />
</template>

<script setup lang="ts">
const stats = [
  { label: "Followers", value: "2,481" },
  { label: "Following", value: "312" },
  { label: "Posts", value: "48" },
];
</script>`,
              angular: `<l-ProfileCard name="Priya Nair" role="Product Designer at Lojee" avatarInitials="PN" [stats]="stats"></l-ProfileCard>

stats = [
  { label: "Followers", value: "2,481" },
  { label: "Following", value: "312" },
  { label: "Posts", value: "48" },
];`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="`actions` is rich content — this component doesn't know about Button, you supply the real elements.">
            With actions
          </SectionLabel>
          <div className="max-w-sm">
            <ProfileCard
              name="Priya Nair"
              role="Product Designer at Lojee"
              avatarInitials="PN"
              actions={
                <>
                  <Button label="Follow" className="flex-1" />
                  <Button variant="outline" label="Message" className="flex-1" />
                </>
              }
            />
          </div>
          <CodeBlock
            variants={{
              react: `<ProfileCard
  name="Priya Nair"
  role="Product Designer at Lojee"
  avatarInitials="PN"
  actions={
    <>
      <Button label="Follow" className="flex-1" />
      <Button variant="outline" label="Message" className="flex-1" />
    </>
  }
/>`,
              js: `<l-ProfileCard name="Priya Nair" role="Product Designer at Lojee" avatarInitials="PN">
  <div slot="actions" class="flex items-center gap-2 w-full">
    <l-Button label="Follow" className="flex-1" />
    <l-Button variant="outline" label="Message" className="flex-1" />
  </div>
</l-ProfileCard>

<script type="module">import "lojee-ui/elements";</script>`,
              vue: `<template>
  <l-ProfileCard name="Priya Nair" role="Product Designer at Lojee" avatarInitials="PN">
    <template #actions>
      <l-Button label="Follow" className="flex-1" />
      <l-Button variant="outline" label="Message" className="flex-1" />
    </template>
  </l-ProfileCard>
</template>`,
              angular: `<l-ProfileCard name="Priya Nair" role="Product Designer at Lojee" avatarInitials="PN">
  <div slot="actions" class="flex items-center gap-2 w-full">
    <l-Button label="Follow" className="flex-1" />
    <l-Button variant="outline" label="Message" className="flex-1" />
  </div>
</l-ProfileCard>`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Tints the banner strip behind the avatar.">Colors</SectionLabel>
          <div className="grid gap-4 sm:grid-cols-3">
            <ProfileCard name="Priya Nair" role="Design" avatarInitials="PN" color="indigo" />
            <ProfileCard name="Alex Chen" role="Engineering" avatarInitials="AC" color="emerald" />
            <ProfileCard name="Marcus Lee" role="Marketing" avatarInitials="ML" color="rose" />
          </div>
          <CodeBlock
            variants={{
              react: `<ProfileCard name="Priya Nair" role="Design" avatarInitials="PN" color="indigo" />
<ProfileCard name="Alex Chen" role="Engineering" avatarInitials="AC" color="emerald" />
<ProfileCard name="Marcus Lee" role="Marketing" avatarInitials="ML" color="rose" />`,
              js: `<l-ProfileCard name="Priya Nair" role="Design" avatarInitials="PN" color="indigo" />
<l-ProfileCard name="Alex Chen" role="Engineering" avatarInitials="AC" color="emerald" />
<l-ProfileCard name="Marcus Lee" role="Marketing" avatarInitials="ML" color="rose" />

<script type="module">import "lojee-ui/elements";</script>`,
              vue: `<template>
  <l-ProfileCard name="Priya Nair" role="Design" avatarInitials="PN" color="indigo" />
  <l-ProfileCard name="Alex Chen" role="Engineering" avatarInitials="AC" color="emerald" />
  <l-ProfileCard name="Marcus Lee" role="Marketing" avatarInitials="ML" color="rose" />
</template>`,
              angular: `<l-ProfileCard name="Priya Nair" role="Design" avatarInitials="PN" color="indigo"></l-ProfileCard>
<l-ProfileCard name="Alex Chen" role="Engineering" avatarInitials="AC" color="emerald"></l-ProfileCard>
<l-ProfileCard name="Marcus Lee" role="Marketing" avatarInitials="ML" color="rose"></l-ProfileCard>`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Enter transitions via `transition` (with `transitionDuration` / `transitionDelay`) and hover effects via `hoverEffect`. Press Replay to run the enter transitions again.">Transitions</SectionLabel>
          <TransitionPreview cols={2}>
            <ProfileCard name="Priya Nair" role="fade" avatarInitials="PN" transition="fade" />
            <ProfileCard name="Marcus Lee" role="slide-up" avatarInitials="ML" transition="slide-up" />
            <ProfileCard name="Ana Souza" role="slide-right" avatarInitials="AS" transition="slide-right" transitionDelay={100} />
            <ProfileCard name="Tom Reed" role="zoom" avatarInitials="TR" transition="zoom" />
            <ProfileCard name="Lena Fox" role="flip" avatarInitials="LF" transition="flip" />
            <ProfileCard name="Kai Wong" role="drop" avatarInitials="KW" transition="drop" transitionDuration={700} />
            <ProfileCard name="Priya Nair" role="lift" avatarInitials="PN" hoverEffect="lift" />
            <ProfileCard name="Marcus Lee" role="glow" avatarInitials="ML" hoverEffect="glow" />
            <ProfileCard name="Ana Souza" role="shine" avatarInitials="AS" hoverEffect="shine" />
            <ProfileCard name="Tom Reed" role="tilt" avatarInitials="TR" hoverEffect="tilt" />
          </TransitionPreview>
          <CodeBlock
            variants={{
              react: `<ProfileCard name="Priya Nair" role="fade" avatarInitials="PN" transition="fade" />
<ProfileCard name="Marcus Lee" role="slide-up" avatarInitials="ML" transition="slide-up" />
<ProfileCard name="Ana Souza" role="slide-right" avatarInitials="AS" transition="slide-right" transitionDelay={100} />
<ProfileCard name="Tom Reed" role="zoom" avatarInitials="TR" transition="zoom" />
<ProfileCard name="Lena Fox" role="flip" avatarInitials="LF" transition="flip" />
<ProfileCard name="Kai Wong" role="drop" avatarInitials="KW" transition="drop" transitionDuration={700} />

<ProfileCard name="Priya Nair" role="lift" avatarInitials="PN" hoverEffect="lift" />
<ProfileCard name="Marcus Lee" role="glow" avatarInitials="ML" hoverEffect="glow" />
<ProfileCard name="Ana Souza" role="shine" avatarInitials="AS" hoverEffect="shine" />`,
              js: `<l-ProfileCard name="Priya Nair" role="fade" avatarInitials="PN" transition="fade"></l-ProfileCard>
<l-ProfileCard name="Marcus Lee" role="slide-up" avatarInitials="ML" transition="slide-up"></l-ProfileCard>
<l-ProfileCard name="Ana Souza" role="slide-right" avatarInitials="AS" transition="slide-right" transitionDelay="100"></l-ProfileCard>
<l-ProfileCard name="Tom Reed" role="zoom" avatarInitials="TR" transition="zoom"></l-ProfileCard>
<l-ProfileCard name="Lena Fox" role="flip" avatarInitials="LF" transition="flip"></l-ProfileCard>
<l-ProfileCard name="Kai Wong" role="drop" avatarInitials="KW" transition="drop" transitionDuration="700"></l-ProfileCard>

<l-ProfileCard name="Priya Nair" role="lift" avatarInitials="PN" hoverEffect="lift"></l-ProfileCard>
<l-ProfileCard name="Marcus Lee" role="glow" avatarInitials="ML" hoverEffect="glow"></l-ProfileCard>
<l-ProfileCard name="Ana Souza" role="shine" avatarInitials="AS" hoverEffect="shine"></l-ProfileCard>

<script type="module">
  import "lojee-ui/elements";
</script>`,
              vue: `<template>
  <l-ProfileCard name="Priya Nair" role="fade" avatarInitials="PN" transition="fade"></l-ProfileCard>
  <l-ProfileCard name="Marcus Lee" role="slide-up" avatarInitials="ML" transition="slide-up"></l-ProfileCard>
  <l-ProfileCard name="Ana Souza" role="slide-right" avatarInitials="AS" transition="slide-right" transitionDelay="100"></l-ProfileCard>
  <l-ProfileCard name="Tom Reed" role="zoom" avatarInitials="TR" transition="zoom"></l-ProfileCard>
  <l-ProfileCard name="Lena Fox" role="flip" avatarInitials="LF" transition="flip"></l-ProfileCard>
  <l-ProfileCard name="Kai Wong" role="drop" avatarInitials="KW" transition="drop" transitionDuration="700"></l-ProfileCard>

  <l-ProfileCard name="Priya Nair" role="lift" avatarInitials="PN" hoverEffect="lift"></l-ProfileCard>
  <l-ProfileCard name="Marcus Lee" role="glow" avatarInitials="ML" hoverEffect="glow"></l-ProfileCard>
  <l-ProfileCard name="Ana Souza" role="shine" avatarInitials="AS" hoverEffect="shine"></l-ProfileCard>
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
    <l-ProfileCard name="Priya Nair" role="fade" avatarInitials="PN" transition="fade"></l-ProfileCard>
    <l-ProfileCard name="Marcus Lee" role="slide-up" avatarInitials="ML" transition="slide-up"></l-ProfileCard>
    <l-ProfileCard name="Ana Souza" role="slide-right" avatarInitials="AS" transition="slide-right" transitionDelay="100"></l-ProfileCard>
    <l-ProfileCard name="Tom Reed" role="zoom" avatarInitials="TR" transition="zoom"></l-ProfileCard>
    <l-ProfileCard name="Lena Fox" role="flip" avatarInitials="LF" transition="flip"></l-ProfileCard>
    <l-ProfileCard name="Kai Wong" role="drop" avatarInitials="KW" transition="drop" transitionDuration="700"></l-ProfileCard>

    <l-ProfileCard name="Priya Nair" role="lift" avatarInitials="PN" hoverEffect="lift"></l-ProfileCard>
    <l-ProfileCard name="Marcus Lee" role="glow" avatarInitials="ML" hoverEffect="glow"></l-ProfileCard>
    <l-ProfileCard name="Ana Souza" role="shine" avatarInitials="AS" hoverEffect="shine"></l-ProfileCard>
  \`,
})
export class AppComponent {}`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Attention effects via `animated`. Pulse and border-spin take a solid `pulseColor` or a gradient with `pulseGradientTo`.">Animated</SectionLabel>
          <div className="grid gap-6 sm:grid-cols-2">
            <ProfileCard name="Priya Nair" role="Glow" avatarInitials="PN" animated="glow" />
            <ProfileCard name="Marcus Lee" role="Pulse" avatarInitials="ML" color="emerald" animated="pulse" />
            <ProfileCard name="Ana Souza" role="Gradient pulse" avatarInitials="AS" color="rose" animated="pulse" pulseColor="rose" pulseGradientTo="amber" />
            <ProfileCard name="Tom Reed" role="Sweep" avatarInitials="TR" color="blue" animated="sweep" />
            <ProfileCard name="Lena Fox" role="Float" avatarInitials="LF" color="violet" animated="float" />
            <ProfileCard name="Kai Wong" role="Border spin" avatarInitials="KW" animated="border-spin" pulseColor="violet" pulseGradientTo="cyan" />
          </div>
          <CodeBlock
            variants={{
              react: `<ProfileCard name="Priya Nair" role="Glow" avatarInitials="PN" animated="glow" />
<ProfileCard name="Marcus Lee" role="Pulse" avatarInitials="ML" color="emerald" animated="pulse" />
<ProfileCard name="Ana Souza" role="Gradient pulse" avatarInitials="AS" color="rose" animated="pulse" pulseColor="rose" pulseGradientTo="amber" />
<ProfileCard name="Tom Reed" role="Sweep" avatarInitials="TR" color="blue" animated="sweep" />
<ProfileCard name="Lena Fox" role="Float" avatarInitials="LF" color="violet" animated="float" />
<ProfileCard name="Kai Wong" role="Border spin" avatarInitials="KW" animated="border-spin" pulseColor="violet" pulseGradientTo="cyan" />`,
              js: `<l-ProfileCard name="Priya Nair" role="Glow" avatarInitials="PN" animated="glow"></l-ProfileCard>
<l-ProfileCard name="Marcus Lee" role="Pulse" avatarInitials="ML" color="emerald" animated="pulse"></l-ProfileCard>
<l-ProfileCard name="Ana Souza" role="Gradient pulse" avatarInitials="AS" color="rose" animated="pulse" pulseColor="rose" pulseGradientTo="amber"></l-ProfileCard>
<l-ProfileCard name="Tom Reed" role="Sweep" avatarInitials="TR" color="blue" animated="sweep"></l-ProfileCard>
<l-ProfileCard name="Lena Fox" role="Float" avatarInitials="LF" color="violet" animated="float"></l-ProfileCard>
<l-ProfileCard name="Kai Wong" role="Border spin" avatarInitials="KW" animated="border-spin" pulseColor="violet" pulseGradientTo="cyan"></l-ProfileCard>

<script type="module">
  import "lojee-ui/elements";
</script>`,
              vue: `<template>
  <l-ProfileCard name="Priya Nair" role="Glow" avatarInitials="PN" animated="glow"></l-ProfileCard>
  <l-ProfileCard name="Marcus Lee" role="Pulse" avatarInitials="ML" color="emerald" animated="pulse"></l-ProfileCard>
  <l-ProfileCard name="Ana Souza" role="Gradient pulse" avatarInitials="AS" color="rose" animated="pulse" pulseColor="rose" pulseGradientTo="amber"></l-ProfileCard>
  <l-ProfileCard name="Tom Reed" role="Sweep" avatarInitials="TR" color="blue" animated="sweep"></l-ProfileCard>
  <l-ProfileCard name="Lena Fox" role="Float" avatarInitials="LF" color="violet" animated="float"></l-ProfileCard>
  <l-ProfileCard name="Kai Wong" role="Border spin" avatarInitials="KW" animated="border-spin" pulseColor="violet" pulseGradientTo="cyan"></l-ProfileCard>
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
    <l-ProfileCard name="Priya Nair" role="Glow" avatarInitials="PN" animated="glow"></l-ProfileCard>
    <l-ProfileCard name="Marcus Lee" role="Pulse" avatarInitials="ML" color="emerald" animated="pulse"></l-ProfileCard>
    <l-ProfileCard name="Ana Souza" role="Gradient pulse" avatarInitials="AS" color="rose" animated="pulse" pulseColor="rose" pulseGradientTo="amber"></l-ProfileCard>
    <l-ProfileCard name="Tom Reed" role="Sweep" avatarInitials="TR" color="blue" animated="sweep"></l-ProfileCard>
    <l-ProfileCard name="Lena Fox" role="Float" avatarInitials="LF" color="violet" animated="float"></l-ProfileCard>
    <l-ProfileCard name="Kai Wong" role="Border spin" avatarInitials="KW" animated="border-spin" pulseColor="violet" pulseGradientTo="cyan"></l-ProfileCard>
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
