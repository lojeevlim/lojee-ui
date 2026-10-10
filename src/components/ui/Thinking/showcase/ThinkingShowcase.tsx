import { Thinking } from "../Thinking";
import CodeBlock from "../../CodeBlock";
import { SectionLabel, Row } from "../../ShowcaseHelpers";

// `vue` / `angular` default to the plain HTML; pass them when the snippet needs a script (those frameworks bind props and events in the template instead).
const variants = (react: string, html: string, vue = html, angular = html) => ({
  react,
  js: `${html}\n\n<script type="module">import "lojee-ui/elements";</script>`,
  vue,
  angular,
});

export default function ThinkingShowcase() {
  return (
    <div>
      <div className="space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-fg">Thinking</h1>
          <p className="mt-1 text-sm text-fg-subtle">An AI "thinking" indicator — animated dots, wave bars, an orb or a shimmering label, with optional rotating status lines and a timer.</p>
        </div>

        <section>
          <SectionLabel sub="Four looks. The default is three bouncing dots.">Variants</SectionLabel>
          <Row>
            <div>
              <p className="mb-1.5 font-mono text-xs text-fg-subtle">dots</p>
              <Thinking variant="dots" />
            </div>
            <div>
              <p className="mb-1.5 font-mono text-xs text-fg-subtle">wave</p>
              <Thinking variant="wave" />
            </div>
            <div>
              <p className="mb-1.5 font-mono text-xs text-fg-subtle">orb</p>
              <Thinking variant="orb" />
            </div>
            <div>
              <p className="mb-1.5 font-mono text-xs text-fg-subtle">shimmer</p>
              <Thinking variant="shimmer" />
            </div>
          </Row>
          <CodeBlock
            variants={variants(
              `<Thinking variant="dots" />
<Thinking variant="wave" />
<Thinking variant="orb" />
<Thinking variant="shimmer" />`,
              `<l-thinking variant="dots"></l-thinking>
<l-thinking variant="wave"></l-thinking>
<l-thinking variant="orb"></l-thinking>
<l-thinking variant="shimmer"></l-thinking>`
            )}
          />
        </section>

        <section>
          <SectionLabel sub="Pass steps to cycle through what the assistant is doing, and showElapsed for a running timer.">Steps and timer</SectionLabel>
          <Row>
            <Thinking variant="orb" steps={["Reading the question", "Searching the docs", "Writing the answer"]} showElapsed />
          </Row>
          <CodeBlock
            variants={variants(
              `<Thinking
  variant="orb"
  steps={["Reading the question", "Searching the docs", "Writing the answer"]}
  showElapsed
/>`,
              `<l-thinking variant="orb" show-elapsed="true"></l-thinking>
<script type="module">
  document.querySelector("l-thinking").steps = ["Reading the question", "Searching the docs", "Writing the answer"];
</script>`,
              `<template>
  <l-thinking variant="orb" show-elapsed="true" :steps.prop="steps" />
</template>

<script setup lang="ts">
import "lojee-ui/elements";
const steps = ["Reading the question", "Searching the docs", "Writing the answer"];
</script>`,
              `// thinking.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "lojee-ui/elements";

@Component({
  selector: "app-thinking",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`<l-thinking variant="orb" show-elapsed="true" [steps]="steps"></l-thinking>\`,
})
export class ThinkingComponent {
  steps = ["Reading the question", "Searching the docs", "Writing the answer"];
}`
            )}
          />
        </section>

        <section>
          <SectionLabel sub="Three sizes and any palette color; the default follows the theme accent.">Sizes and colors</SectionLabel>
          <Row>
            <Thinking size="sm" label="Small" />
            <Thinking size="md" label="Medium" color="violet" />
            <Thinking size="lg" label="Large" color="emerald" variant="wave" />
          </Row>
          <CodeBlock
            variants={variants(
              `<Thinking size="sm" label="Small" />
<Thinking size="md" label="Medium" color="violet" />
<Thinking size="lg" label="Large" color="emerald" variant="wave" />`,
              `<l-thinking size="sm" label="Small"></l-thinking>
<l-thinking size="md" label="Medium" color="violet"></l-thinking>
<l-thinking size="lg" label="Large" color="emerald" variant="wave"></l-thinking>`
            )}
          />
        </section>
      </div>
    </div>
  );
}
