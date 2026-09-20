import { Stepper } from "../Stepper";
import CodeBlock from "../../CodeBlock";
import { SectionLabel } from "../../ShowcaseHelpers";

export default function StepperShowcase() {
  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Stepper</h1>
          <p className="text-sm text-slate-500 mt-1">A multi-step progress indicator — numbered circles connected by a line.</p>
        </div>

        <section>
          <SectionLabel sub="currentStep sits in the middle, so complete, current, and upcoming steps are all visible.">Basic</SectionLabel>
          <Stepper
            currentStep={2}
            steps={[{ label: "Cart" }, { label: "Shipping" }, { label: "Payment" }, { label: "Confirm" }]}
          />
          <CodeBlock
            variants={{
              react: `<Stepper
  currentStep={2}
  steps={[
    { label: "Cart" },
    { label: "Shipping" },
    { label: "Payment" },
    { label: "Confirm" },
  ]}
/>`,
              js: `<Stepper id="stepper-basic" currentStep="2" />

<script type="module">
  import "lojee-ui/elements";

  document.getElementById("stepper-basic").steps = [
    { label: "Cart" },
    { label: "Shipping" },
    { label: "Payment" },
    { label: "Confirm" },
  ];
</script>`,
              vue: `<template>
  <Stepper :steps="steps" currentStep="2" />
</template>

<script setup>
import "lojee-ui/elements";

const steps = [
  { label: "Cart" },
  { label: "Shipping" },
  { label: "Payment" },
  { label: "Confirm" },
];
</script>`,
              angular: `// app.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "lojee-ui/elements";

@Component({
  selector: "app-root",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`<Stepper [steps]="steps" currentStep="2" />\`,
})
export class AppComponent {
  steps = [
    { label: "Cart" },
    { label: "Shipping" },
    { label: "Payment" },
    { label: "Confirm" },
  ];
}`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Each step can carry a short description below its label.">With descriptions</SectionLabel>
          <Stepper
            currentStep={1}
            steps={[
              { label: "Account", description: "Create your login" },
              { label: "Profile", description: "Tell us about you" },
              { label: "Review", description: "Confirm your details" },
            ]}
          />
          <CodeBlock
            variants={{
              react: `<Stepper
  currentStep={1}
  steps={[
    { label: "Account", description: "Create your login" },
    { label: "Profile", description: "Tell us about you" },
    { label: "Review", description: "Confirm your details" },
  ]}
/>`,
              js: `<Stepper id="stepper-desc" currentStep="1" />

<script type="module">
  document.getElementById("stepper-desc").steps = [
    { label: "Account", description: "Create your login" },
    { label: "Profile", description: "Tell us about you" },
    { label: "Review", description: "Confirm your details" },
  ];
</script>`,
              vue: `<template>
  <Stepper :steps="steps" currentStep="1" />
</template>

<script setup>
const steps = [
  { label: "Account", description: "Create your login" },
  { label: "Profile", description: "Tell us about you" },
  { label: "Review", description: "Confirm your details" },
];
</script>`,
              angular: `// app.component.ts (same component as above, with its own \`steps\` array)
steps = [
  { label: "Account", description: "Create your login" },
  { label: "Profile", description: "Tell us about you" },
  { label: "Review", description: "Confirm your details" },
];

// app.component.html
<Stepper [steps]="steps" currentStep="1" />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub={'Set orientation="vertical" to stack steps top-to-bottom, label beside each circle.'}>Vertical orientation</SectionLabel>
          <div className="max-w-sm">
            <Stepper
              orientation="vertical"
              currentStep={1}
              steps={[
                { label: "Order placed", description: "We've received your order" },
                { label: "Processing", description: "Your order is being prepared" },
                { label: "Shipped", description: "On its way to you" },
                { label: "Delivered" },
              ]}
            />
          </div>
          <CodeBlock
            variants={{
              react: `<Stepper
  orientation="vertical"
  currentStep={1}
  steps={[
    { label: "Order placed", description: "We've received your order" },
    { label: "Processing", description: "Your order is being prepared" },
    { label: "Shipped", description: "On its way to you" },
    { label: "Delivered" },
  ]}
/>`,
              js: `<Stepper id="stepper-vertical" orientation="vertical" currentStep="1" />

<script type="module">
  document.getElementById("stepper-vertical").steps = [
    { label: "Order placed", description: "We've received your order" },
    { label: "Processing", description: "Your order is being prepared" },
    { label: "Shipped", description: "On its way to you" },
    { label: "Delivered" },
  ];
</script>`,
              vue: `<template>
  <Stepper :steps="steps" orientation="vertical" currentStep="1" />
</template>

<script setup>
const steps = [
  { label: "Order placed", description: "We've received your order" },
  { label: "Processing", description: "Your order is being prepared" },
  { label: "Shipped", description: "On its way to you" },
  { label: "Delivered" },
];
</script>`,
              angular: `// app.component.ts (same component as above, with its own \`steps\` array)
steps = [
  { label: "Order placed", description: "We've received your order" },
  { label: "Processing", description: "Your order is being prepared" },
  { label: "Shipped", description: "On its way to you" },
  { label: "Delivered" },
];

// app.component.html
<Stepper [steps]="steps" orientation="vertical" currentStep="1" />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="When currentStep is past the last index, every step shows as complete.">All complete</SectionLabel>
          <Stepper
            currentStep={4}
            steps={[{ label: "Cart" }, { label: "Shipping" }, { label: "Payment" }, { label: "Confirm" }]}
          />
          <CodeBlock
            variants={{
              react: `<Stepper
  currentStep={4}
  steps={[
    { label: "Cart" },
    { label: "Shipping" },
    { label: "Payment" },
    { label: "Confirm" },
  ]}
/>`,
              js: `<Stepper id="stepper-complete" currentStep="4" />

<script type="module">
  document.getElementById("stepper-complete").steps = [
    { label: "Cart" },
    { label: "Shipping" },
    { label: "Payment" },
    { label: "Confirm" },
  ];
</script>`,
              vue: `<template>
  <Stepper :steps="steps" currentStep="4" />
</template>

<script setup>
const steps = [
  { label: "Cart" },
  { label: "Shipping" },
  { label: "Payment" },
  { label: "Confirm" },
];
</script>`,
              angular: `// app.component.ts (same component as above, with its own \`steps\` array)
steps = [
  { label: "Cart" },
  { label: "Shipping" },
  { label: "Payment" },
  { label: "Confirm" },
];

// app.component.html
<Stepper [steps]="steps" currentStep="4" />`,
            }}
          />
        </section>
      </div>
    </div>
  );
}
