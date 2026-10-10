import { Timeline } from "../Timeline";
import CodeBlock from "../../CodeBlock";
import { SectionLabel, TransitionPreview } from "../../ShowcaseHelpers";

const TR_ITEMS = [
  { title: "Order placed", timestamp: "Jan 4, 9:02 AM" },
  { title: "Shipped", description: "Package handed to carrier.", timestamp: "Jan 5, 2:30 PM" },
  { title: "Delivered", timestamp: "Jan 6, 1:47 PM" },
];

export default function TimelineShowcase() {
  return (
    <div>
      <div className="space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-fg">Timeline</h1>
          <p className="text-sm text-fg-subtle mt-1">
            A vertical (or horizontal) sequence of events — a connecting line with a marker per item.
          </p>
        </div>

        <section>
          <SectionLabel sub="A plain order-status history — title, description, and timestamp per item.">Basic</SectionLabel>
          <div className="max-w-sm">
            <Timeline
              items={[
                { title: "Order placed", description: "We've received your order.", timestamp: "Jan 4, 9:02 AM" },
                { title: "Payment confirmed", timestamp: "Jan 4, 9:05 AM" },
                { title: "Shipped", description: "Package handed to carrier.", timestamp: "Jan 5, 2:30 PM" },
                { title: "Delivered", timestamp: "Jan 6, 1:47 PM" },
              ]}
            />
          </div>
          <CodeBlock
            variants={{
              react: `<Timeline
  items={[
    { title: "Order placed", description: "We've received your order.", timestamp: "Jan 4, 9:02 AM" },
    { title: "Payment confirmed", timestamp: "Jan 4, 9:05 AM" },
    { title: "Shipped", description: "Package handed to carrier.", timestamp: "Jan 5, 2:30 PM" },
    { title: "Delivered", timestamp: "Jan 6, 1:47 PM" },
  ]}
/>`,
              js: `<l-timeline id="timeline-basic"></l-timeline>

<script type="module">
  import "lojee-ui/elements";

  document.getElementById("timeline-basic").items = [
    { title: "Order placed", description: "We've received your order.", timestamp: "Jan 4, 9:02 AM" },
    { title: "Payment confirmed", timestamp: "Jan 4, 9:05 AM" },
    { title: "Shipped", description: "Package handed to carrier.", timestamp: "Jan 5, 2:30 PM" },
    { title: "Delivered", timestamp: "Jan 6, 1:47 PM" },
  ];
</script>`,
              vue: `<template>
  <l-timeline :items="items" />
</template>

<script setup lang="ts">
import "lojee-ui/elements";

const items = [
  { title: "Order placed", description: "We've received your order.", timestamp: "Jan 4, 9:02 AM" },
  { title: "Payment confirmed", timestamp: "Jan 4, 9:05 AM" },
  { title: "Shipped", description: "Package handed to carrier.", timestamp: "Jan 5, 2:30 PM" },
  { title: "Delivered", timestamp: "Jan 6, 1:47 PM" },
];
</script>`,
              angular: `// app.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "lojee-ui/elements";

@Component({
  selector: "app-root",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`<l-timeline [items]="items" />\`,
})
export class AppComponent {
  items = [
    { title: "Order placed", description: "We've received your order.", timestamp: "Jan 4, 9:02 AM" },
    { title: "Payment confirmed", timestamp: "Jan 4, 9:05 AM" },
    { title: "Shipped", description: "Package handed to carrier.", timestamp: "Jan 5, 2:30 PM" },
    { title: "Delivered", timestamp: "Jan 6, 1:47 PM" },
  ];
}`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Give each item an icon and a color — a common way to show completed vs. pending steps.">
            With icons and colors
          </SectionLabel>
          <div className="max-w-sm">
            <Timeline
              items={[
                { title: "Order placed", timestamp: "Jan 4, 9:02 AM", icon: "check", color: "emerald" },
                { title: "Payment confirmed", timestamp: "Jan 4, 9:05 AM", icon: "check", color: "emerald" },
                { title: "Shipped", description: "Package handed to carrier.", timestamp: "Jan 5, 2:30 PM", icon: "check", color: "emerald" },
                { title: "Out for delivery", description: "Arriving today.", icon: "clock", color: "amber" },
                { title: "Delivered", icon: "circle-dot", color: "slate" },
              ]}
            />
          </div>
          <CodeBlock
            variants={{
              react: `<Timeline
  items={[
    { title: "Order placed", timestamp: "Jan 4, 9:02 AM", icon: "check", color: "emerald" },
    { title: "Payment confirmed", timestamp: "Jan 4, 9:05 AM", icon: "check", color: "emerald" },
    { title: "Shipped", description: "Package handed to carrier.", timestamp: "Jan 5, 2:30 PM", icon: "check", color: "emerald" },
    { title: "Out for delivery", description: "Arriving today.", icon: "clock", color: "amber" },
    { title: "Delivered", icon: "circle-dot", color: "slate" },
  ]}
/>`,
              js: `<l-timeline id="timeline-icons"></l-timeline>

<script type="module">
  import "lojee-ui/elements";

  document.getElementById("timeline-icons").items = [
    { title: "Order placed", timestamp: "Jan 4, 9:02 AM", icon: "check", color: "emerald" },
    { title: "Payment confirmed", timestamp: "Jan 4, 9:05 AM", icon: "check", color: "emerald" },
    { title: "Shipped", description: "Package handed to carrier.", timestamp: "Jan 5, 2:30 PM", icon: "check", color: "emerald" },
    { title: "Out for delivery", description: "Arriving today.", icon: "clock", color: "amber" },
    { title: "Delivered", icon: "circle-dot", color: "slate" },
  ];
</script>`,
              vue: `<template>
  <l-timeline :items="items" />
</template>

<script setup lang="ts">
import "lojee-ui/elements";

const items = [
  { title: "Order placed", timestamp: "Jan 4, 9:02 AM", icon: "check", color: "emerald" },
  { title: "Payment confirmed", timestamp: "Jan 4, 9:05 AM", icon: "check", color: "emerald" },
  { title: "Shipped", description: "Package handed to carrier.", timestamp: "Jan 5, 2:30 PM", icon: "check", color: "emerald" },
  { title: "Out for delivery", description: "Arriving today.", icon: "clock", color: "amber" },
  { title: "Delivered", icon: "circle-dot", color: "slate" },
];
</script>`,
              angular: `// app.component.ts (same component as above, with its own \`items\` array)
items = [
  { title: "Order placed", timestamp: "Jan 4, 9:02 AM", icon: "check", color: "emerald" },
  { title: "Payment confirmed", timestamp: "Jan 4, 9:05 AM", icon: "check", color: "emerald" },
  { title: "Shipped", description: "Package handed to carrier.", timestamp: "Jan 5, 2:30 PM", icon: "check", color: "emerald" },
  { title: "Out for delivery", description: "Arriving today.", icon: "clock", color: "amber" },
  { title: "Delivered", icon: "circle-dot", color: "slate" },
];

// app.component.html
<l-timeline [items]="items" />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub={'Set orientation="horizontal" for a compact left-to-right layout — dot and label only, no description.'}>
            Horizontal
          </SectionLabel>
          <Timeline
            orientation="horizontal"
            items={[
              { title: "Order placed", timestamp: "Jan 4", icon: "check", color: "emerald" },
              { title: "Shipped", timestamp: "Jan 5", icon: "check", color: "emerald" },
              { title: "Out for delivery", timestamp: "Jan 6", icon: "clock", color: "amber" },
              { title: "Delivered", icon: "circle-dot", color: "slate" },
            ]}
          />
          <CodeBlock
            variants={{
              react: `<Timeline
  orientation="horizontal"
  items={[
    { title: "Order placed", timestamp: "Jan 4", icon: "check", color: "emerald" },
    { title: "Shipped", timestamp: "Jan 5", icon: "check", color: "emerald" },
    { title: "Out for delivery", timestamp: "Jan 6", icon: "clock", color: "amber" },
    { title: "Delivered", icon: "circle-dot", color: "slate" },
  ]}
/>`,
              js: `<l-timeline id="timeline-horizontal" orientation="horizontal"></l-timeline>

<script type="module">
  import "lojee-ui/elements";

  document.getElementById("timeline-horizontal").items = [
    { title: "Order placed", timestamp: "Jan 4", icon: "check", color: "emerald" },
    { title: "Shipped", timestamp: "Jan 5", icon: "check", color: "emerald" },
    { title: "Out for delivery", timestamp: "Jan 6", icon: "clock", color: "amber" },
    { title: "Delivered", icon: "circle-dot", color: "slate" },
  ];
</script>`,
              vue: `<template>
  <l-timeline :items="items" orientation="horizontal" />
</template>

<script setup lang="ts">
import "lojee-ui/elements";

const items = [
  { title: "Order placed", timestamp: "Jan 4", icon: "check", color: "emerald" },
  { title: "Shipped", timestamp: "Jan 5", icon: "check", color: "emerald" },
  { title: "Out for delivery", timestamp: "Jan 6", icon: "clock", color: "amber" },
  { title: "Delivered", icon: "circle-dot", color: "slate" },
];
</script>`,
              angular: `// app.component.ts (same component as above, with its own \`items\` array)
items = [
  { title: "Order placed", timestamp: "Jan 4", icon: "check", color: "emerald" },
  { title: "Shipped", timestamp: "Jan 5", icon: "check", color: "emerald" },
  { title: "Out for delivery", timestamp: "Jan 6", icon: "clock", color: "amber" },
  { title: "Delivered", icon: "circle-dot", color: "slate" },
];

// app.component.html
<l-timeline [items]="items" orientation="horizontal" />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Enter transitions via `transition` (with `transitionDuration` / `transitionDelay`). Items enter one after another, 60ms apart. They play on mount — reload the page, or use Replay in the playground.">Transitions</SectionLabel>
          <TransitionPreview cols={2}>
            <Timeline items={TR_ITEMS} transition="fade" />
            <Timeline items={TR_ITEMS} transition="slide-up" />
            <Timeline items={TR_ITEMS} transition="slide-right" transitionDelay={100} />
            <Timeline items={TR_ITEMS} transition="drop" transitionDuration={700} />
          </TransitionPreview>
          <CodeBlock
            variants={{
              react: `const items = [
  { title: "Order placed", timestamp: "Jan 4, 9:02 AM" },
  { title: "Shipped", description: "Package handed to carrier.", timestamp: "Jan 5, 2:30 PM" },
  { title: "Delivered", timestamp: "Jan 6, 1:47 PM" },
];

<Timeline items={items} transition="fade" />
<Timeline items={items} transition="slide-up" />
<Timeline items={items} transition="slide-right" transitionDelay={100} />
<Timeline items={items} transition="drop" transitionDuration={700} />`,
              js: `<l-timeline transition="fade"></l-timeline>
<l-timeline transition="slide-up"></l-timeline>
<l-timeline transition="slide-right" transitionDelay="100"></l-timeline>
<l-timeline transition="drop" transitionDuration="700"></l-timeline>

<script type="module">
  import "lojee-ui/elements";

  const items = [
  { title: "Order placed", timestamp: "Jan 4, 9:02 AM" },
  { title: "Shipped", description: "Package handed to carrier.", timestamp: "Jan 5, 2:30 PM" },
  { title: "Delivered", timestamp: "Jan 6, 1:47 PM" },
];
  document.querySelectorAll("l-Timeline").forEach((el) => (el.items = items));
</script>`,
              vue: `<template>
  <l-timeline :items="items" transition="fade"></l-timeline>
  <l-timeline :items="items" transition="slide-up"></l-timeline>
  <l-timeline :items="items" transition="slide-right" transitionDelay="100"></l-timeline>
  <l-timeline :items="items" transition="drop" transitionDuration="700"></l-timeline>
</template>

<script setup lang="ts">
import "lojee-ui/elements";

const items = [
  { title: "Order placed", timestamp: "Jan 4, 9:02 AM" },
  { title: "Shipped", description: "Package handed to carrier.", timestamp: "Jan 5, 2:30 PM" },
  { title: "Delivered", timestamp: "Jan 6, 1:47 PM" },
];
</script>`,
              angular: `// app.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "lojee-ui/elements";

@Component({
  selector: "app-root",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <l-timeline [items]="items" transition="fade"></l-timeline>
    <l-timeline [items]="items" transition="slide-up"></l-timeline>
    <l-timeline [items]="items" transition="slide-right" transitionDelay="100"></l-timeline>
    <l-timeline [items]="items" transition="drop" transitionDuration="700"></l-timeline>
  \`,
})
export class AppComponent {
  items = [
    { title: "Order placed", timestamp: "Jan 4, 9:02 AM" },
    { title: "Shipped", description: "Package handed to carrier.", timestamp: "Jan 5, 2:30 PM" },
    { title: "Delivered", timestamp: "Jan 6, 1:47 PM" },
  ];
}`,
            }}
          />
        </section>
      </div>
    </div>
  );
}
