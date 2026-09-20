import { Card } from "../Card";
import CodeBlock from "../../CodeBlock";
import { SectionLabel, Row } from "../../ShowcaseHelpers";

export default function CardShowcase() {
  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Card</h1>
          <p className="text-sm text-slate-500 mt-1">A surface for grouping related content, with optional title and footer.</p>
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
              js: `<Card variant="outline">Outline</Card>
<Card variant="elevated">Elevated</Card>
<Card variant="soft">Soft</Card>
<Card variant="ghost">Ghost</Card>

<script type="module">
  import "lojee-ui/elements";
</script>`,
              vue: `<template>
  <Card variant="outline">Outline</Card>
  <Card variant="elevated">Elevated</Card>
  <Card variant="soft">Soft</Card>
  <Card variant="ghost">Ghost</Card>
</template>

<script setup>
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
    <Card variant="outline">Outline</Card>
    <Card variant="elevated">Elevated</Card>
    <Card variant="soft">Soft</Card>
    <Card variant="ghost">Ghost</Card>
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
              js: `<Card padding="sm">Small</Card>
<Card padding="lg">Large</Card>`,
              vue: `<template>
  <Card padding="sm">Small</Card>
  <Card padding="lg">Large</Card>
</template>`,
              angular: `<!-- reuses the AppComponent from above -->
<Card padding="sm">Small</Card>
<Card padding="lg">Large</Card>`,
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
              js: `<Card hoverable>Hover me</Card>`,
              vue: `<template>
  <Card hoverable>Hover me</Card>
</template>`,
              angular: `<!-- reuses the AppComponent from above -->
<Card hoverable>Hover me</Card>`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="A title above the body and a footer below it, separated by a border.">Title and footer</SectionLabel>
          <Card title="Plan details" footer={<span className="text-xs text-slate-500">Updated 2 days ago</span>}>
            Your subscription renews monthly and includes unlimited seats.
          </Card>
          <CodeBlock
            variants={{
              react: `<Card
  title="Plan details"
  footer={<span className="text-xs text-slate-500">Updated 2 days ago</span>}
>
  Your subscription renews monthly and includes unlimited seats.
</Card>`,
              js: `<Card title="Plan details" footer="Updated 2 days ago">
  Your subscription renews monthly and includes unlimited seats.
</Card>`,
              vue: `<template>
  <Card title="Plan details" footer="Updated 2 days ago">
    Your subscription renews monthly and includes unlimited seats.
  </Card>
</template>`,
              angular: `<!-- reuses the AppComponent from above -->
<Card title="Plan details" footer="Updated 2 days ago">
  Your subscription renews monthly and includes unlimited seats.
</Card>`,
            }}
          />
        </section>
      </div>
    </div>
  );
}
