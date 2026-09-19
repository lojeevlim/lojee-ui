import { Badge } from "../Badge";
import CodeBlock from "../../CodeBlock";
import { SectionLabel, Row } from "../../ShowcaseHelpers";

export default function BadgeShowcase() {
  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Badge</h1>
          <p className="text-sm text-slate-500 mt-1">
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
              js: `<Badge variant="solid" label="Solid" />
<Badge variant="outline" label="Outline" />
<Badge variant="soft" label="Soft" />

<script type="module">
  import "lojee-ui/elements";
</script>`,
              vue: `<template>
  <Badge variant="solid" label="Solid" />
  <Badge variant="outline" label="Outline" />
  <Badge variant="soft" label="Soft" />
</template>

<script setup>
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
    <Badge variant="solid" label="Solid" />
    <Badge variant="outline" label="Outline" />
    <Badge variant="soft" label="Soft" />
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
              js: `<Badge color="indigo" label="Indigo" />
<Badge color="emerald" label="Emerald" />
<Badge color="rose" label="Rose" />`,
              vue: `<template>
  <Badge color="indigo" label="Indigo" />
  <Badge color="emerald" label="Emerald" />
  <Badge color="rose" label="Rose" />
</template>`,
              angular: `<!-- reuses BadgeShowcaseComponent from above -->
<Badge color="indigo" label="Indigo" />
<Badge color="emerald" label="Emerald" />
<Badge color="rose" label="Rose" />`,
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
              js: `<Badge size="sm" label="Small" />
<Badge size="md" label="Medium" />
<Badge size="lg" label="Large" />`,
              vue: `<template>
  <Badge size="sm" label="Small" />
  <Badge size="md" label="Medium" />
  <Badge size="lg" label="Large" />
</template>`,
              angular: `<!-- reuses BadgeShowcaseComponent from above -->
<Badge size="sm" label="Small" />
<Badge size="md" label="Medium" />
<Badge size="lg" label="Large" />`,
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
              js: `<Badge icon="check" color="emerald" label="Verified" />`,
              vue: `<template>
  <Badge icon="check" color="emerald" label="Verified" />
</template>`,
              angular: `<!-- reuses BadgeShowcaseComponent from above -->
<Badge icon="check" color="emerald" label="Verified" />`,
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
              js: `<Badge dot="true" color="emerald" label="Online" />`,
              vue: `<template>
  <Badge dot="true" color="emerald" label="Online" />
</template>`,
              angular: `<!-- reuses BadgeShowcaseComponent from above -->
<Badge dot="true" color="emerald" label="Online" />`,
            }}
          />
        </section>
      </div>
    </div>
  );
}
