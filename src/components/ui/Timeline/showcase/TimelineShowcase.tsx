import { Timeline } from "../Timeline";
import CodeBlock from "../../CodeBlock";
import { SectionLabel } from "../../ShowcaseHelpers";

export default function TimelineShowcase() {
  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Timeline</h1>
          <p className="text-sm text-slate-500 mt-1">
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
              js: `<l-Timeline id="timeline-basic"></l-Timeline>

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
  <l-Timeline :items="items" />
</template>

<script setup>
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
  template: \`<l-Timeline [items]="items" />\`,
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
              js: `<l-Timeline id="timeline-icons"></l-Timeline>

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
  <l-Timeline :items="items" />
</template>

<script setup>
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
<l-Timeline [items]="items" />`,
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
              js: `<l-Timeline id="timeline-horizontal" orientation="horizontal"></l-Timeline>

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
  <l-Timeline :items="items" orientation="horizontal" />
</template>

<script setup>
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
<l-Timeline [items]="items" orientation="horizontal" />`,
            }}
          />
        </section>
      </div>
    </div>
  );
}
