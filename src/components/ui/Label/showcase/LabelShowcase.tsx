import { Label } from "../Label";
import { Input } from "../../Input/Input";
import CodeBlock from "../../CodeBlock";
import { SectionLabel } from "../../ShowcaseHelpers";

export default function LabelShowcase() {
  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Label</h1>
          <p className="text-sm text-slate-500 mt-1">A form field label wrapping the native &lt;label&gt; element.</p>
        </div>

        <section>
          <SectionLabel sub="Paired with a form control via htmlFor.">Plain</SectionLabel>
          <div className="max-w-sm space-y-1.5">
            <Label htmlFor="showcase-email">Email address</Label>
            <Input id="showcase-email" placeholder="you@example.com" />
          </div>
          <CodeBlock
            variants={{
              react: `<Label htmlFor="email">Email address</Label>
<Input id="email" placeholder="you@example.com" />`,
              js: `<l-Label htmlFor="email">Email address</l-Label>
<l-Input id="email" placeholder="you@example.com" />

<script type="module">
  import "lojee-ui/elements";
</script>`,
              vue: `<template>
  <l-Label htmlFor="email">Email address</l-Label>
  <l-Input id="email" placeholder="you@example.com" />
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
    <l-Label htmlFor="email">Email address</l-Label>
    <l-Input id="email" placeholder="you@example.com" />
  \`,
})
export class AppComponent {}`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Adds a red asterisk after the label text.">Required</SectionLabel>
          <div className="max-w-sm space-y-1.5">
            <Label htmlFor="showcase-name" required>
              Full name
            </Label>
            <Input id="showcase-name" placeholder="Jane Doe" />
          </div>
          <CodeBlock
            variants={{
              react: `<Label htmlFor="name" required>Full name</Label>
<Input id="name" placeholder="Jane Doe" />`,
              js: `<l-Label htmlFor="name" required>Full name</l-Label>
<l-Input id="name" placeholder="Jane Doe" />`,
              vue: `<template>
  <l-Label htmlFor="name" required>Full name</l-Label>
  <l-Input id="name" placeholder="Jane Doe" />
</template>`,
              angular: `<!-- app.component.html — same AppComponent as above -->
<l-Label htmlFor="name" required>Full name</l-Label>
<l-Input id="name" placeholder="Jane Doe" />`,
            }}
          />
        </section>
      </div>
    </div>
  );
}
