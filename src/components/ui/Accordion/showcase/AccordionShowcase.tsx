import { Accordion } from "../Accordion";
import { AccordionItem } from "../AccordionItem";
import CodeBlock from "../../CodeBlock";
import { SectionLabel, Row } from "../../ShowcaseHelpers";

export default function AccordionShowcase() {
  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Accordion</h1>
          <p className="text-sm text-slate-500 mt-1">
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
              js: `<Accordion>
  <AccordionItem title="What is lojee-ui?" defaultOpen>
    A React + TypeScript + Tailwind component library that also ships as
    framework-agnostic Web Components.
  </AccordionItem>
</Accordion>

<script type="module">
  import "lojee-ui/elements";
</script>`,
              vue: `<template>
  <Accordion>
    <AccordionItem title="What is lojee-ui?" defaultOpen>
      A React + TypeScript + Tailwind component library that also ships as
      framework-agnostic Web Components.
    </AccordionItem>
  </Accordion>
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
    <Accordion>
      <AccordionItem title="What is lojee-ui?" defaultOpen>
        A React + TypeScript + Tailwind component library that also ships as
        framework-agnostic Web Components.
      </AccordionItem>
    </Accordion>
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
              js: `<Accordion>
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
              vue: `<template>
  <Accordion>
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
  </Accordion>
</template>`,
              angular: `<!-- reuses the AppComponent from above -->
<Accordion>
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
              js: `<Accordion>
  <AccordionItem title="Shipping">Ships within 3-5 business days.</AccordionItem>
  <AccordionItem title="Returns">Free returns within 30 days of delivery.</AccordionItem>
</Accordion>`,
              vue: `<template>
  <Accordion>
    <AccordionItem title="Shipping">Ships within 3-5 business days.</AccordionItem>
    <AccordionItem title="Returns">Free returns within 30 days of delivery.</AccordionItem>
  </Accordion>
</template>`,
              angular: `<!-- reuses the AppComponent from above -->
<Accordion>
  <AccordionItem title="Shipping">Ships within 3-5 business days.</AccordionItem>
  <AccordionItem title="Returns">Free returns within 30 days of delivery.</AccordionItem>
</Accordion>`,
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
              js: `<Accordion>
  <AccordionItem title="Available section">This one opens normally.</AccordionItem>
  <AccordionItem title="Locked section" disabled>This content is unavailable.</AccordionItem>
</Accordion>`,
              vue: `<template>
  <Accordion>
    <AccordionItem title="Available section">This one opens normally.</AccordionItem>
    <AccordionItem title="Locked section" disabled>This content is unavailable.</AccordionItem>
  </Accordion>
</template>`,
              angular: `<!-- reuses the AppComponent from above -->
<Accordion>
  <AccordionItem title="Available section">This one opens normally.</AccordionItem>
  <AccordionItem title="Locked section" disabled>This content is unavailable.</AccordionItem>
</Accordion>`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Override the root with className, or target the trigger, icon, or panel with classNames.">
            Custom styling
          </SectionLabel>
          <Row>
            <div className="w-full max-w-lg">
              <Accordion className="border-indigo-200 divide-indigo-200">
                <AccordionItem
                  title="Custom colors"
                  defaultOpen
                  classNames={{ trigger: "text-indigo-900", icon: "text-indigo-400", panel: "text-indigo-700" }}
                >
                  Every slot can be restyled independently via classNames.
                </AccordionItem>
              </Accordion>
            </div>
          </Row>
          <CodeBlock
            variants={{
              react: `<Accordion className="border-indigo-200 divide-indigo-200">
  <AccordionItem
    title="Custom colors"
    defaultOpen
    classNames={{ trigger: "text-indigo-900", icon: "text-indigo-400", panel: "text-indigo-700" }}
  >
    Every slot can be restyled independently via classNames.
  </AccordionItem>
</Accordion>`,
              js: `<Accordion className="border-indigo-200 divide-indigo-200">
  <AccordionItem id="custom-colors-item" title="Custom colors" defaultOpen>
    Every slot can be restyled independently via classNames.
  </AccordionItem>
</Accordion>

<script type="module">
  document.getElementById("custom-colors-item").classNames = {
    trigger: "text-indigo-900",
    icon: "text-indigo-400",
    panel: "text-indigo-700",
  };
</script>`,
              vue: `<template>
  <Accordion className="border-indigo-200 divide-indigo-200">
    <AccordionItem title="Custom colors" defaultOpen :classNames="itemClassNames">
      Every slot can be restyled independently via classNames.
    </AccordionItem>
  </Accordion>
</template>

<script setup>
const itemClassNames = { trigger: "text-indigo-900", icon: "text-indigo-400", panel: "text-indigo-700" };
</script>`,
              angular: `<Accordion className="border-indigo-200 divide-indigo-200">
  <AccordionItem title="Custom colors" defaultOpen [classNames]="itemClassNames">
    Every slot can be restyled independently via classNames.
  </AccordionItem>
</Accordion>

itemClassNames = { trigger: "text-indigo-900", icon: "text-indigo-400", panel: "text-indigo-700" };`,
            }}
          />
        </section>
      </div>
    </div>
  );
}
