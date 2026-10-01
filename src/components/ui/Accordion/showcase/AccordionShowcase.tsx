import { Accordion } from "../Accordion";
import { AccordionItem } from "../AccordionItem";
import CodeBlock from "../../CodeBlock";
import { SectionLabel, Row, TransitionPreview } from "../../ShowcaseHelpers";

export default function AccordionShowcase() {
  return (
    <div className="min-h-screen rounded-xl bg-surface p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-fg">Accordion</h1>
          <p className="text-sm text-fg-subtle mt-1">
            Collapsible panels built on native &lt;details&gt;/&lt;summary&gt; — zero JS state.
          </p>
        </div>

        <section>
          <SectionLabel sub="A single, independently toggleable item, open by default.">Standalone item</SectionLabel>
          <Row>
            <div className="w-full max-w-lg">
              <Accordion>
                <AccordionItem title="What is lojee-ui?" defaultOpen>
                  A React + TypeScript + Tailwind component library that also ships as framework-agnostic Web Components.
                </AccordionItem>
              </Accordion>
            </div>
          </Row>
          <CodeBlock
            variants={{
              react: `<Accordion>
  <AccordionItem title="What is lojee-ui?" defaultOpen>
    A React + TypeScript + Tailwind component library that also ships as
    framework-agnostic Web Components.
  </AccordionItem>
</Accordion>`,
              js: `<l-Accordion>
  <l-AccordionItem title="What is lojee-ui?" defaultOpen>
    A React + TypeScript + Tailwind component library that also ships as
    framework-agnostic Web Components.
  </l-AccordionItem>
</l-Accordion>

<script type="module">
  import "lojee-ui/elements";
</script>`,
              vue: `<template>
  <l-Accordion>
    <l-AccordionItem title="What is lojee-ui?" defaultOpen>
      A React + TypeScript + Tailwind component library that also ships as
      framework-agnostic Web Components.
    </l-AccordionItem>
  </l-Accordion>
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
    <l-Accordion>
      <l-AccordionItem title="What is lojee-ui?" defaultOpen>
        A React + TypeScript + Tailwind component library that also ships as
        framework-agnostic Web Components.
      </l-AccordionItem>
    </l-Accordion>
  \`,
})
export class AppComponent {}`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Same `name` on each item — the browser keeps only one open at a time, no JS involved.">
            Grouped (exclusive open)
          </SectionLabel>
          <Row>
            <div className="w-full max-w-lg">
              <Accordion>
                <AccordionItem name="faq" title="How do I install it?" defaultOpen>
                  Run `npm install lojee-ui` and import the component you need.
                </AccordionItem>
                <AccordionItem name="faq" title="Does it work outside React?">
                  Yes — every component is also published as a Web Component, usable from any framework or plain HTML.
                </AccordionItem>
                <AccordionItem name="faq" title="Can I customize the styling?">
                  Every component accepts a `className` for the root and a `classNames` map for its internal parts.
                </AccordionItem>
              </Accordion>
            </div>
          </Row>
          <CodeBlock
            variants={{
              react: `<Accordion>
  <AccordionItem name="faq" title="How do I install it?" defaultOpen>
    Run \`npm install lojee-ui\` and import the component you need.
  </AccordionItem>
  <AccordionItem name="faq" title="Does it work outside React?">
    Yes — every component is also published as a Web Component, usable from
    any framework or plain HTML.
  </AccordionItem>
  <AccordionItem name="faq" title="Can I customize the styling?">
    Every component accepts a \`className\` for the root and a \`classNames\`
    map for its internal parts.
  </AccordionItem>
</Accordion>`,
              js: `<l-Accordion>
  <l-AccordionItem name="faq" title="How do I install it?" defaultOpen>
    Run \`npm install lojee-ui\` and import the component you need.
  </l-AccordionItem>
  <l-AccordionItem name="faq" title="Does it work outside React?">
    Yes — every component is also published as a Web Component, usable from
    any framework or plain HTML.
  </l-AccordionItem>
  <l-AccordionItem name="faq" title="Can I customize the styling?">
    Every component accepts a \`className\` for the root and a \`classNames\`
    map for its internal parts.
  </l-AccordionItem>
</l-Accordion>`,
              vue: `<template>
  <l-Accordion>
    <l-AccordionItem name="faq" title="How do I install it?" defaultOpen>
      Run \`npm install lojee-ui\` and import the component you need.
    </l-AccordionItem>
    <l-AccordionItem name="faq" title="Does it work outside React?">
      Yes — every component is also published as a Web Component, usable from
      any framework or plain HTML.
    </l-AccordionItem>
    <l-AccordionItem name="faq" title="Can I customize the styling?">
      Every component accepts a \`className\` for the root and a \`classNames\`
      map for its internal parts.
    </l-AccordionItem>
  </l-Accordion>
</template>`,
              angular: `<!-- reuses the AppComponent from above -->
<l-Accordion>
  <l-AccordionItem name="faq" title="How do I install it?" defaultOpen>
    Run \`npm install lojee-ui\` and import the component you need.
  </l-AccordionItem>
  <l-AccordionItem name="faq" title="Does it work outside React?">
    Yes — every component is also published as a Web Component, usable from
    any framework or plain HTML.
  </l-AccordionItem>
  <l-AccordionItem name="faq" title="Can I customize the styling?">
    Every component accepts a \`className\` for the root and a \`classNames\`
    map for its internal parts.
  </l-AccordionItem>
</l-Accordion>`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Without a shared `name`, items open and close independently of each other.">Independent items</SectionLabel>
          <Row>
            <div className="w-full max-w-lg">
              <Accordion>
                <AccordionItem title="Shipping">Ships within 3-5 business days.</AccordionItem>
                <AccordionItem title="Returns">Free returns within 30 days of delivery.</AccordionItem>
              </Accordion>
            </div>
          </Row>
          <CodeBlock
            variants={{
              react: `<Accordion>
  <AccordionItem title="Shipping">Ships within 3-5 business days.</AccordionItem>
  <AccordionItem title="Returns">Free returns within 30 days of delivery.</AccordionItem>
</Accordion>`,
              js: `<l-Accordion>
  <l-AccordionItem title="Shipping">Ships within 3-5 business days.</l-AccordionItem>
  <l-AccordionItem title="Returns">Free returns within 30 days of delivery.</l-AccordionItem>
</l-Accordion>`,
              vue: `<template>
  <l-Accordion>
    <l-AccordionItem title="Shipping">Ships within 3-5 business days.</l-AccordionItem>
    <l-AccordionItem title="Returns">Free returns within 30 days of delivery.</l-AccordionItem>
  </l-Accordion>
</template>`,
              angular: `<!-- reuses the AppComponent from above -->
<l-Accordion>
  <l-AccordionItem title="Shipping">Ships within 3-5 business days.</l-AccordionItem>
  <l-AccordionItem title="Returns">Free returns within 30 days of delivery.</l-AccordionItem>
</l-Accordion>`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="A disabled item stays closed and cannot be toggled.">Disabled</SectionLabel>
          <Row>
            <div className="w-full max-w-lg">
              <Accordion>
                <AccordionItem title="Available section">This one opens normally.</AccordionItem>
                <AccordionItem title="Locked section" disabled>
                  This content is unavailable.
                </AccordionItem>
              </Accordion>
            </div>
          </Row>
          <CodeBlock
            variants={{
              react: `<Accordion>
  <AccordionItem title="Available section">This one opens normally.</AccordionItem>
  <AccordionItem title="Locked section" disabled>This content is unavailable.</AccordionItem>
</Accordion>`,
              js: `<l-Accordion>
  <l-AccordionItem title="Available section">This one opens normally.</l-AccordionItem>
  <l-AccordionItem title="Locked section" disabled>This content is unavailable.</l-AccordionItem>
</l-Accordion>`,
              vue: `<template>
  <l-Accordion>
    <l-AccordionItem title="Available section">This one opens normally.</l-AccordionItem>
    <l-AccordionItem title="Locked section" disabled>This content is unavailable.</l-AccordionItem>
  </l-Accordion>
</template>`,
              angular: `<!-- reuses the AppComponent from above -->
<l-Accordion>
  <l-AccordionItem title="Available section">This one opens normally.</l-AccordionItem>
  <l-AccordionItem title="Locked section" disabled>This content is unavailable.</l-AccordionItem>
</l-Accordion>`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Override the root with className, or target the trigger, icon, or panel with classNames.">
            Custom styling
          </SectionLabel>
          <Row>
            <div className="w-full max-w-lg">
              <Accordion className="border-indigo-200 divide-indigo-200 dark:border-indigo-900 dark:divide-indigo-900">
                <AccordionItem
                  title="Custom colors"
                  defaultOpen
                  classNames={{ trigger: "text-indigo-900 dark:text-indigo-200", icon: "text-indigo-400", panel: "text-indigo-700 dark:text-indigo-300" }}
                >
                  Every slot can be restyled independently via classNames.
                </AccordionItem>
              </Accordion>
            </div>
          </Row>
          <CodeBlock
            variants={{
              react: `<Accordion className="border-indigo-200 divide-indigo-200 dark:border-indigo-900 dark:divide-indigo-900">
  <AccordionItem
    title="Custom colors"
    defaultOpen
    classNames={{ trigger: "text-indigo-900 dark:text-indigo-200", icon: "text-indigo-400", panel: "text-indigo-700 dark:text-indigo-300" }}
  >
    Every slot can be restyled independently via classNames.
  </AccordionItem>
</Accordion>`,
              js: `<l-Accordion className="border-indigo-200 divide-indigo-200 dark:border-indigo-900 dark:divide-indigo-900">
  <l-AccordionItem id="custom-colors-item" title="Custom colors" defaultOpen>
    Every slot can be restyled independently via classNames.
  </l-AccordionItem>
</l-Accordion>

<script type="module">
  document.getElementById("custom-colors-item").classNames = {
    trigger: "text-indigo-900 dark:text-indigo-200",
    icon: "text-indigo-400",
    panel: "text-indigo-700 dark:text-indigo-300",
  };
</script>`,
              vue: `<template>
  <l-Accordion className="border-indigo-200 divide-indigo-200 dark:border-indigo-900 dark:divide-indigo-900">
    <l-AccordionItem title="Custom colors" defaultOpen :classNames="itemClassNames">
      Every slot can be restyled independently via classNames.
    </l-AccordionItem>
  </l-Accordion>
</template>

<script setup lang="ts">
const itemClassNames = { trigger: "text-indigo-900 dark:text-indigo-200", icon: "text-indigo-400", panel: "text-indigo-700 dark:text-indigo-300" };
</script>`,
              angular: `<l-Accordion className="border-indigo-200 divide-indigo-200 dark:border-indigo-900 dark:divide-indigo-900">
  <l-AccordionItem title="Custom colors" defaultOpen [classNames]="itemClassNames">
    Every slot can be restyled independently via classNames.
  </l-AccordionItem>
</l-Accordion>

itemClassNames = { trigger: "text-indigo-900 dark:text-indigo-200", icon: "text-indigo-400", panel: "text-indigo-700 dark:text-indigo-300" };`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Enter transitions via `transition` (with `transitionDuration` / `transitionDelay`) and hover effects via `hoverEffect`. Items can also enter one after another with their own `transitionDelay`. Press Replay to run the enter transitions again.">Transitions</SectionLabel>
          <TransitionPreview cols={2}>
            <Accordion transition="fade">
              <AccordionItem title="Fade" defaultOpen>Panel content.</AccordionItem>
              <AccordionItem title="Another item">More panel content.</AccordionItem>
            </Accordion>
            <Accordion transition="slide-up">
              <AccordionItem title="Slide up" defaultOpen>Panel content.</AccordionItem>
              <AccordionItem title="Another item">More panel content.</AccordionItem>
            </Accordion>
            <Accordion transition="slide-right" transitionDelay={100}>
              <AccordionItem title="Slide right" defaultOpen>Panel content.</AccordionItem>
              <AccordionItem title="Another item">More panel content.</AccordionItem>
            </Accordion>
            <Accordion transition="zoom">
              <AccordionItem title="Zoom" defaultOpen>Panel content.</AccordionItem>
              <AccordionItem title="Another item">More panel content.</AccordionItem>
            </Accordion>
            <Accordion transition="blur">
              <AccordionItem title="Blur" defaultOpen>Panel content.</AccordionItem>
              <AccordionItem title="Another item">More panel content.</AccordionItem>
            </Accordion>
            <Accordion transition="drop" transitionDuration={700}>
              <AccordionItem title="Drop" defaultOpen>Panel content.</AccordionItem>
              <AccordionItem title="Another item">More panel content.</AccordionItem>
            </Accordion>
            <Accordion>
              <AccordionItem title="First" transition="slide-up" defaultOpen>Panel content.</AccordionItem>
              <AccordionItem title="Second" transition="slide-up" transitionDelay={100}>Panel content.</AccordionItem>
              <AccordionItem title="Third" transition="slide-up" transitionDelay={200}>Panel content.</AccordionItem>
            </Accordion>
            <Accordion hoverEffect="lift">
              <AccordionItem title="Lift" defaultOpen>Panel content.</AccordionItem>
              <AccordionItem title="Another item">More panel content.</AccordionItem>
            </Accordion>
            <Accordion hoverEffect="glow">
              <AccordionItem title="Glow" defaultOpen>Panel content.</AccordionItem>
              <AccordionItem title="Another item">More panel content.</AccordionItem>
            </Accordion>
            <Accordion hoverEffect="shine">
              <AccordionItem title="Shine" defaultOpen>Panel content.</AccordionItem>
              <AccordionItem title="Another item">More panel content.</AccordionItem>
            </Accordion>
          </TransitionPreview>
          <CodeBlock
            variants={{
              react: `<Accordion transition="fade">
  <AccordionItem title="Fade">Panel content.</AccordionItem>
</Accordion>

<Accordion transition="slide-up">
  <AccordionItem title="Slide up">Panel content.</AccordionItem>
</Accordion>

<Accordion transition="slide-right" transitionDelay={100}>
  <AccordionItem title="Slide right">Panel content.</AccordionItem>
</Accordion>

<Accordion transition="zoom">
  <AccordionItem title="Zoom">Panel content.</AccordionItem>
</Accordion>

<Accordion transition="blur">
  <AccordionItem title="Blur">Panel content.</AccordionItem>
</Accordion>

<Accordion transition="drop" transitionDuration={700}>
  <AccordionItem title="Drop">Panel content.</AccordionItem>
</Accordion>

<Accordion>
  <AccordionItem title="First" transition="slide-up">Panel content.</AccordionItem>
  <AccordionItem title="Second" transition="slide-up" transitionDelay={100}>Panel content.</AccordionItem>
  <AccordionItem title="Third" transition="slide-up" transitionDelay={200}>Panel content.</AccordionItem>
</Accordion>

<Accordion hoverEffect="lift">
  <AccordionItem title="Lift">Panel content.</AccordionItem>
</Accordion>

<Accordion hoverEffect="glow">
  <AccordionItem title="Glow">Panel content.</AccordionItem>
</Accordion>

<Accordion hoverEffect="shine">
  <AccordionItem title="Shine">Panel content.</AccordionItem>
</Accordion>`,
              js: `<l-Accordion transition="fade">
  <l-AccordionItem title="Fade">Panel content.</l-AccordionItem>
</l-Accordion>

<l-Accordion transition="slide-up">
  <l-AccordionItem title="Slide up">Panel content.</l-AccordionItem>
</l-Accordion>

<l-Accordion transition="slide-right" transitionDelay="100">
  <l-AccordionItem title="Slide right">Panel content.</l-AccordionItem>
</l-Accordion>

<l-Accordion transition="zoom">
  <l-AccordionItem title="Zoom">Panel content.</l-AccordionItem>
</l-Accordion>

<l-Accordion transition="blur">
  <l-AccordionItem title="Blur">Panel content.</l-AccordionItem>
</l-Accordion>

<l-Accordion transition="drop" transitionDuration="700">
  <l-AccordionItem title="Drop">Panel content.</l-AccordionItem>
</l-Accordion>

<l-Accordion>
  <l-AccordionItem title="First" transition="slide-up">Panel content.</l-AccordionItem>
  <l-AccordionItem title="Second" transition="slide-up" transitionDelay="100">Panel content.</l-AccordionItem>
  <l-AccordionItem title="Third" transition="slide-up" transitionDelay="200">Panel content.</l-AccordionItem>
</l-Accordion>

<l-Accordion hoverEffect="lift">
  <l-AccordionItem title="Lift">Panel content.</l-AccordionItem>
</l-Accordion>

<l-Accordion hoverEffect="glow">
  <l-AccordionItem title="Glow">Panel content.</l-AccordionItem>
</l-Accordion>

<l-Accordion hoverEffect="shine">
  <l-AccordionItem title="Shine">Panel content.</l-AccordionItem>
</l-Accordion>

<script type="module">
  import "lojee-ui/elements";
</script>`,
              vue: `<template>
  <l-Accordion transition="fade">
    <l-AccordionItem title="Fade">Panel content.</l-AccordionItem>
  </l-Accordion>

  <l-Accordion transition="slide-up">
    <l-AccordionItem title="Slide up">Panel content.</l-AccordionItem>
  </l-Accordion>

  <l-Accordion transition="slide-right" transitionDelay="100">
    <l-AccordionItem title="Slide right">Panel content.</l-AccordionItem>
  </l-Accordion>

  <l-Accordion transition="zoom">
    <l-AccordionItem title="Zoom">Panel content.</l-AccordionItem>
  </l-Accordion>

  <l-Accordion transition="blur">
    <l-AccordionItem title="Blur">Panel content.</l-AccordionItem>
  </l-Accordion>

  <l-Accordion transition="drop" transitionDuration="700">
    <l-AccordionItem title="Drop">Panel content.</l-AccordionItem>
  </l-Accordion>

  <l-Accordion>
    <l-AccordionItem title="First" transition="slide-up">Panel content.</l-AccordionItem>
    <l-AccordionItem title="Second" transition="slide-up" transitionDelay="100">Panel content.</l-AccordionItem>
    <l-AccordionItem title="Third" transition="slide-up" transitionDelay="200">Panel content.</l-AccordionItem>
  </l-Accordion>

  <l-Accordion hoverEffect="lift">
    <l-AccordionItem title="Lift">Panel content.</l-AccordionItem>
  </l-Accordion>

  <l-Accordion hoverEffect="glow">
    <l-AccordionItem title="Glow">Panel content.</l-AccordionItem>
  </l-Accordion>

  <l-Accordion hoverEffect="shine">
    <l-AccordionItem title="Shine">Panel content.</l-AccordionItem>
  </l-Accordion>
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
    <l-Accordion transition="fade">
      <l-AccordionItem title="Fade">Panel content.</l-AccordionItem>
    </l-Accordion>

    <l-Accordion transition="slide-up">
      <l-AccordionItem title="Slide up">Panel content.</l-AccordionItem>
    </l-Accordion>

    <l-Accordion transition="slide-right" transitionDelay="100">
      <l-AccordionItem title="Slide right">Panel content.</l-AccordionItem>
    </l-Accordion>

    <l-Accordion transition="zoom">
      <l-AccordionItem title="Zoom">Panel content.</l-AccordionItem>
    </l-Accordion>

    <l-Accordion transition="blur">
      <l-AccordionItem title="Blur">Panel content.</l-AccordionItem>
    </l-Accordion>

    <l-Accordion transition="drop" transitionDuration="700">
      <l-AccordionItem title="Drop">Panel content.</l-AccordionItem>
    </l-Accordion>

    <l-Accordion>
      <l-AccordionItem title="First" transition="slide-up">Panel content.</l-AccordionItem>
      <l-AccordionItem title="Second" transition="slide-up" transitionDelay="100">Panel content.</l-AccordionItem>
      <l-AccordionItem title="Third" transition="slide-up" transitionDelay="200">Panel content.</l-AccordionItem>
    </l-Accordion>

    <l-Accordion hoverEffect="lift">
      <l-AccordionItem title="Lift">Panel content.</l-AccordionItem>
    </l-Accordion>

    <l-Accordion hoverEffect="glow">
      <l-AccordionItem title="Glow">Panel content.</l-AccordionItem>
    </l-Accordion>

    <l-Accordion hoverEffect="shine">
      <l-AccordionItem title="Shine">Panel content.</l-AccordionItem>
    </l-Accordion>
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
