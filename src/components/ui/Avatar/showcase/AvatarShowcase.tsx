import { Avatar } from "../Avatar";
import { AvatarGroup } from "../AvatarGroup";
import CodeBlock from "../../CodeBlock";
import { SectionLabel, Row } from "../../ShowcaseHelpers";

export default function AvatarShowcase() {
  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Avatar</h1>
          <p className="text-sm text-slate-500 mt-1">
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
              js: `<l-Avatar size="md" initials="AB" color="indigo" />

<script type="module">
  import "lojee-ui/elements";
</script>`,
              vue: `<template>
  <l-Avatar size="md" initials="AB" color="indigo" />
</template>

<script setup>
import "lojee-ui/elements";
</script>`,
              angular: `// avatar-showcase.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "lojee-ui/elements";

@Component({
  selector: "app-avatar-showcase",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`<l-Avatar size="md" initials="AB" color="indigo" />\`,
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
              js: `<l-Avatar src="/me.jpg" initials="LL" alt="Lojee Lim" />`,
              vue: `<template>
  <l-Avatar src="/me.jpg" initials="LL" alt="Lojee Lim" />
</template>`,
              angular: `<!-- reuses AvatarShowcaseComponent from above -->
<l-Avatar src="/me.jpg" initials="LL" alt="Lojee Lim" />`,
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
              js: `<l-Avatar initials="ON" status="online" />`,
              vue: `<template>
  <l-Avatar initials="ON" status="online" />
</template>`,
              angular: `<!-- reuses AvatarShowcaseComponent from above -->
<l-Avatar initials="ON" status="online" />`,
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
              js: `<l-Avatar initials="SQ" shape="square" />`,
              vue: `<template>
  <l-Avatar initials="SQ" shape="square" />
</template>`,
              angular: `<!-- reuses AvatarShowcaseComponent from above -->
<l-Avatar initials="SQ" shape="square" />`,
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
              js: `<l-AvatarGroup>
  <l-Avatar initials="AA" color="indigo" />
  <l-Avatar initials="BB" color="rose" />
  <l-Avatar initials="CC" color="emerald" />
</l-AvatarGroup>`,
              vue: `<template>
  <l-AvatarGroup>
    <l-Avatar initials="AA" color="indigo" />
    <l-Avatar initials="BB" color="rose" />
    <l-Avatar initials="CC" color="emerald" />
  </l-AvatarGroup>
</template>`,
              angular: `<!-- reuses AvatarShowcaseComponent from above -->
<l-AvatarGroup>
  <l-Avatar initials="AA" color="indigo" />
  <l-Avatar initials="BB" color="rose" />
  <l-Avatar initials="CC" color="emerald" />
</l-AvatarGroup>`,
            }}
          />
        </section>
      </div>
    </div>
  );
}
