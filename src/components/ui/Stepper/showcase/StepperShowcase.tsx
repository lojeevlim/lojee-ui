import { useRef, useState } from "react";
import { Stepper, type StepperHandle, type StepperStepContext } from "../Stepper";
import { StepperItem } from "../StepperItem";
import { useStepper } from "../stepperContext";
import { Button } from "../../Buttons/Button";
import CodeBlock from "../../CodeBlock";
import { SectionLabel } from "../../ShowcaseHelpers";

const STEPS_CODE = `[{ label: "Cart" }, { label: "Shipping" }, { label: "Payment" }, { label: "Confirm" }]`;

const colorCode = (attr: string) => ({
  react: `<Stepper ${attr} currentStep={2} steps={${STEPS_CODE}} />`,
  js: `<l-Stepper id="stepper-color" ${attr} current-step="2" />

<script type="module">
  import "lojee-ui/elements";

  document.getElementById("stepper-color").steps = ${STEPS_CODE};
</script>`,
  vue: `<template>
  <l-Stepper :steps="steps" ${attr} current-step="2" />
</template>

<script setup lang="ts">
import "lojee-ui/elements";

const steps = ${STEPS_CODE};
</script>`,
  angular: `<l-Stepper [steps]="steps" ${attr} current-step="2"></l-Stepper>

steps = ${STEPS_CODE};`,
});

const SECTION_STEPS_CODE = `[
  { label: "Cart", content: "Review the items in your cart." },
  { label: "Shipping", content: "Where should we send it?" },
  { label: "Payment", content: "Choose how you'd like to pay." },
  { label: "Confirm", content: "Everything look right? Place the order." },
]`;

const sectionStep = (label: string, blurb: string) => ({
  label,
  content: (
    <div className="rounded-xl border border-dashed border-border p-4">
      <p className="text-sm font-medium text-fg">{label}</p>
      <p className="mt-1 text-sm text-fg-subtle">{blurb}</p>
    </div>
  ),
});

// Components used as step content — defined at module level so their identity is stable across renders. Each gets the
// stepper's controls (next / prev / goTo …) and can use its own state and hooks.
function AccountStep({ next }: StepperStepContext) {
  const [email, setEmail] = useState("");
  return (
    <form
      className="space-y-3 rounded-xl border border-dashed border-border p-4"
      onSubmit={(e) => {
        e.preventDefault();
        next();
      }}
    >
      <label className="block text-sm font-medium text-fg">
        Email
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="mt-1 w-full rounded-md border border-border-strong bg-surface px-3 py-2 text-sm text-fg outline-none focus:ring-2 focus:ring-accent-500"
        />
      </label>
      <Button type="submit" color="accent" label="Continue" disabled={!email.includes("@")} />
    </form>
  );
}

function PlanStep({ next, prev }: StepperStepContext) {
  const [plan, setPlan] = useState("Pro");
  return (
    <div className="space-y-3 rounded-xl border border-dashed border-border p-4">
      <p className="text-sm font-medium text-fg">Pick a plan</p>
      <div className="flex gap-2">
        {["Free", "Pro", "Team"].map((p) => (
          <Button key={p} color="accent" variant={plan === p ? "solid" : "outline"} label={p} onClick={() => setPlan(p)} />
        ))}
      </div>
      <div className="flex gap-2">
        <Button variant="ghost" color="accent" label="Back" onClick={prev} />
        <Button color="accent" label={`Continue with ${plan}`} onClick={next} />
      </div>
    </div>
  );
}

function ReviewStep({ goTo }: StepperStepContext) {
  return (
    <div className="space-y-3 rounded-xl border border-dashed border-border p-4">
      <p className="text-sm text-fg-muted">Looks good? You can jump back to any step.</p>
      <Button variant="soft" color="accent" label="Edit account" onClick={() => goTo(0)} />
    </div>
  );
}

// Same sections again, but as <StepperItem> children: each picks up the stepper's controls with useStepper().
const AccountItem = () => <AccountStep {...useStepper()} />;
const PlanItem = () => <PlanStep {...useStepper()} />;
const ReviewItem = () => <ReviewStep {...useStepper()} />;

const SLOT_STEPS_CODE = `[{ label: "Account" }, { label: "Plan" }, { label: "Review" }]`;

export default function StepperShowcase() {
  const ref = useRef<StepperHandle>(null);
  const [changed, setChanged] = useState("Cart");

  return (
    <div className="min-h-screen rounded-xl bg-surface p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-fg">Stepper</h1>
          <p className="text-sm text-fg-subtle mt-1">A multi-step progress indicator — numbered circles connected by a line.</p>
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
              js: `<l-Stepper id="stepper-basic" current-step="2" />

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
  <l-Stepper :steps="steps" current-step="2" />
</template>

<script setup lang="ts">
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
  template: \`<l-Stepper [steps]="steps" current-step="2" />\`,
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
          <SectionLabel sub="Give a step content and the stepper shows that step's section under it. Set navigation to add built-in Back / Next buttons (Finish on the last step) that change the step for you; the step circles are clickable too. Like Sidebar and Navbar, it manages the current step itself.">
            Step sections
          </SectionLabel>
          <Stepper
            defaultStep={1}
            navigation
            completedContent={<p className="rounded-xl bg-surface-muted p-4 text-sm text-fg">All done — your order is placed.</p>}
            onStepChange={(_, step) => setChanged(step?.label ?? "Complete")}
            steps={[
              sectionStep("Cart", "Review the items in your cart."),
              sectionStep("Shipping", "Where should we send it?"),
              sectionStep("Payment", "Choose how you'd like to pay."),
              sectionStep("Confirm", "Everything look right? Place the order."),
            ]}
          />
          <p className="mt-2 text-sm text-fg-subtle">
            Current step: <span className="font-medium text-fg">{changed}</span>
          </p>
          <CodeBlock
            variants={{
              react: `<Stepper
  defaultStep={1}
  navigation
  completedContent={<p>All done — your order is placed.</p>}
  onStepChange={(index, step) => console.log(index, step?.label)}
  steps={[
    { label: "Cart", content: <CartPanel /> },
    { label: "Shipping", content: <ShippingPanel /> },
    { label: "Payment", content: <PaymentPanel /> },
    { label: "Confirm", content: <ConfirmPanel /> },
  ]}
/>

{/* navigation shows the built-in Back / Next buttons (Finish on the last step).
    Step circles are clickable by default when a step has content — clickable={false} turns that off. */}`,
              js: `<l-Stepper id="stepper-sections" default-step="1" navigation="true" />

<script type="module">
  import "lojee-ui/elements";

  const el = document.getElementById("stepper-sections");
  el.steps = ${SECTION_STEPS_CODE};
  el.addEventListener("stepchange", (e) => console.log("Step:", e.detail));
</script>`,
              vue: `<template>
  <l-Stepper :steps="steps" default-step="1" navigation="true" @stepchange="onChange" />
</template>

<script setup lang="ts">
import "lojee-ui/elements";

const steps = ${SECTION_STEPS_CODE};

function onChange(e: CustomEvent) {
  console.log("Step:", e.detail);
}
</script>`,
              angular: `<l-Stepper [steps]="steps" default-step="1" navigation="true" (stepchange)="onChange($event)"></l-Stepper>

steps = ${SECTION_STEPS_CODE};

onChange(e: CustomEvent) {
  console.log("Step:", e.detail);
}`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="A step's content can be a component, not just an element: pass the component itself and the stepper renders it with { next, prev, goTo, index, isFirst, isLast }, so a form can advance the stepper when it validates. Define the component outside render so its identity stays stable.">
            Components as step content
          </SectionLabel>
          <Stepper
            steps={[
              { label: "Account", content: AccountStep },
              { label: "Plan", content: PlanStep },
              { label: "Review", content: ReviewStep },
            ]}
          />
          <CodeBlock
            variants={{
              react: `import { Stepper, type StepperStepContext } from "lojee-ui";

// Any component works — it receives the stepper's controls as props.
function AccountStep({ next }: StepperStepContext) {
  const [email, setEmail] = useState("");
  return (
    <form onSubmit={(e) => { e.preventDefault(); next(); }}>
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <button disabled={!email.includes("@")}>Continue</button>
    </form>
  );
}

function PlanStep({ next, prev }: StepperStepContext) { /* ... */ }
function ReviewStep({ goTo }: StepperStepContext) { /* ... */ }

<Stepper
  steps={[
    { label: "Account", content: AccountStep },   // pass the component itself…
    { label: "Plan", content: <PlanStep /> },       // …or an element (no controls, just renders)
    { label: "Review", content: ReviewStep },
  ]}
/>`,
              js: `<!-- Web Components: <l-stepper-item step="n"> is the counterpart of React's <StepperItem step={n}> -->
<l-stepper id="stepper-slots" navigation="true">
  <l-stepper-item step="0"><my-account-form></my-account-form></l-stepper-item>
  <l-stepper-item step="1"><my-plan-picker></my-plan-picker></l-stepper-item>
  <l-stepper-item step="2">Looks good?</l-stepper-item>
  <l-stepper-item step="complete">All done.</l-stepper-item>
</l-stepper>

<script type="module">
  import "lojee-ui/elements";

  document.getElementById("stepper-slots").steps = ${SLOT_STEPS_CODE};
</script>`,
              vue: `<template>
  <!-- <l-stepper-item step="n"> is the counterpart of <StepperItem step={n}>; any Vue component can go inside -->
  <l-stepper :steps="steps" navigation="true">
    <l-stepper-item step="0"><AccountForm /></l-stepper-item>
    <l-stepper-item step="1"><PlanPicker /></l-stepper-item>
    <l-stepper-item step="2">Looks good?</l-stepper-item>
    <l-stepper-item step="complete">All done.</l-stepper-item>
  </l-stepper>
</template>

<script setup lang="ts">
import "lojee-ui/elements";
import AccountForm from "./AccountForm.vue";
import PlanPicker from "./PlanPicker.vue";

const steps = ${SLOT_STEPS_CODE};
</script>`,
              angular: `<!-- <l-stepper-item step="n"> is the counterpart of <StepperItem step={n}>; any Angular component can go inside -->
<l-stepper [steps]="steps" navigation="true">
  <l-stepper-item step="0"><app-account-form /></l-stepper-item>
  <l-stepper-item step="1"><app-plan-picker /></l-stepper-item>
  <l-stepper-item step="2">Looks good?</l-stepper-item>
  <l-stepper-item step="complete">All done.</l-stepper-item>
</l-stepper>

steps = ${SLOT_STEPS_CODE};`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub={`Or write each step's section as a component in the JSX: <StepperItem step={n}> renders its children only while the stepper's current step is n (step="complete" for the finished state). Inside, useStepper() gives any component the current step and next / prev / goTo.`}>
            StepperItem
          </SectionLabel>
          <Stepper steps={[{ label: "Account" }, { label: "Plan" }, { label: "Review" }]}>
            <StepperItem step={0}>
              <AccountItem />
            </StepperItem>
            <StepperItem step={1}>
              <PlanItem />
            </StepperItem>
            <StepperItem step={2}>
              <ReviewItem />
            </StepperItem>
            <StepperItem step="complete">
              <p className="rounded-xl bg-surface-muted p-4 text-sm text-fg">All done.</p>
            </StepperItem>
          </Stepper>
          <CodeBlock
            variants={{
              react: `import { Stepper, StepperItem, useStepper } from "lojee-ui";

function AccountForm() {
  const { next } = useStepper();          // the surrounding stepper's controls
  const [email, setEmail] = useState("");
  return (
    <form onSubmit={(e) => { e.preventDefault(); next(); }}>
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <button disabled={!email.includes("@")}>Continue</button>
    </form>
  );
}

<Stepper steps={[{ label: "Account" }, { label: "Plan" }, { label: "Review" }]}>
  <StepperItem step={0}><AccountForm /></StepperItem>   {/* shown while the current step is 0 */}
  <StepperItem step={1}><PlanPicker /></StepperItem>
  <StepperItem step={2}><Review /></StepperItem>
  <StepperItem step="complete">All done.</StepperItem>  {/* shown after Finish */}
</Stepper>`,
              js: `<!-- Web Components: <l-stepper-item step="n"> is the counterpart of <StepperItem step={n}> -->
<l-stepper navigation="true">
  <l-stepper-item step="0"><my-account-form></my-account-form></l-stepper-item>
  <l-stepper-item step="1"><my-plan-picker></my-plan-picker></l-stepper-item>
  <l-stepper-item step="2">Review</l-stepper-item>
  <l-stepper-item step="complete">All done.</l-stepper-item>
</l-stepper>`,
              vue: `<template>
  <!-- <l-stepper-item step="N"> is the Web Component equivalent of <StepperItem step={N}> -->
  <l-stepper :steps="steps" navigation="true">
    <l-stepper-item step="0"><AccountForm /></l-stepper-item>
    <l-stepper-item step="1"><PlanPicker /></l-stepper-item>
    <l-stepper-item step="2">Review</l-stepper-item>
    <l-stepper-item step="complete">All done.</l-stepper-item>
  </l-stepper>
</template>`,
              angular: `<!-- <l-stepper-item step="N"> is the Web Component equivalent of <StepperItem step={N}> -->
<l-stepper [steps]="steps" navigation="true">
  <l-stepper-item step="0"><app-account-form /></l-stepper-item>
  <l-stepper-item step="1"><app-plan-picker /></l-stepper-item>
  <l-stepper-item step="2">Review</l-stepper-item>
  <l-stepper-item step="complete">All done.</l-stepper-item>
</l-stepper>`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Change the step from your own code: a ref with next / prev / goTo / reset, or by setting currentStep — it follows the prop whenever it changes.">
            Driving it from code
          </SectionLabel>
          <Stepper ref={ref} defaultStep={0} clickable={false} steps={[{ label: "Cart" }, { label: "Shipping" }, { label: "Payment" }, { label: "Confirm" }]} />
          <div className="mt-4 flex flex-wrap gap-2">
            <Button variant="outline" color="accent" label="Prev" onClick={() => ref.current?.prev()} />
            <Button color="accent" label="Next" onClick={() => ref.current?.next()} />
            <Button variant="soft" color="accent" label="Go to step 3" onClick={() => ref.current?.goTo(2)} />
            <Button variant="ghost" color="accent" label="Reset" onClick={() => ref.current?.reset()} />
          </div>
          <CodeBlock
            variants={{
              react: `const stepper = useRef<StepperHandle>(null);

<Stepper ref={stepper} steps={steps} />

<button onClick={() => stepper.current?.next()}>Next</button>
<button onClick={() => stepper.current?.prev()}>Prev</button>
<button onClick={() => stepper.current?.goTo(2)}>Go to step 3</button>
<button onClick={() => stepper.current?.reset()}>Reset</button>

{/* or just render with a new value — it follows currentStep when it changes */}
<Stepper steps={steps} currentStep={step} />`,
              js: `<l-Stepper id="stepper-code"></l-Stepper>
<button id="next">Next</button>

<script type="module">
  import "lojee-ui/elements";

  const el = document.getElementById("stepper-code");
  el.steps = [{ label: "Cart" }, { label: "Shipping" }, { label: "Payment" }];
  let step = 0;
  document.getElementById("next").addEventListener("click", () => {
    el.currentStep = ++step;   // the stepper follows the property whenever it changes
  });
</script>`,
              vue: `<template>
  <l-Stepper :steps="steps" :currentStep="step" />
  <button @click="step++">Next</button>
</template>

<script setup lang="ts">
import { ref } from "vue";
import "lojee-ui/elements";

const step = ref(0);
const steps = [{ label: "Cart" }, { label: "Shipping" }, { label: "Payment" }];
</script>`,
              angular: `<l-Stepper [steps]="steps" [currentStep]="step"></l-Stepper>
<button (click)="step = step + 1">Next</button>

step = 0;
steps = [{ label: "Cart" }, { label: "Shipping" }, { label: "Payment" }];`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="By default the stepper uses the theme's accent color, so it changes with the accent picker. Pass color to pin a built-in color or any CSS color.">
            Colors
          </SectionLabel>
          <div className="space-y-6">
            {([undefined, "emerald", "rose", "amber"] as const).map((c) => (
              <div key={c ?? "default"}>
                <p className="mb-2 text-xs font-medium text-fg-subtle">{c ? `color="${c}"` : "default (follows the theme accent)"}</p>
                <Stepper
                  color={c}
                  currentStep={2}
                  steps={[{ label: "Cart" }, { label: "Shipping" }, { label: "Payment" }, { label: "Confirm" }]}
                />
              </div>
            ))}
          </div>
          <CodeBlock variants={colorCode('color="emerald"')} />
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
              js: `<l-Stepper id="stepper-desc" current-step="1" />

<script type="module">
  document.getElementById("stepper-desc").steps = [
    { label: "Account", description: "Create your login" },
    { label: "Profile", description: "Tell us about you" },
    { label: "Review", description: "Confirm your details" },
  ];
</script>`,
              vue: `<template>
  <l-Stepper :steps="steps" current-step="1" />
</template>

<script setup lang="ts">
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
<l-Stepper [steps]="steps" current-step="1" />`,
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
              js: `<l-Stepper id="stepper-vertical" orientation="vertical" current-step="1" />

<script type="module">
  document.getElementById("stepper-vertical").steps = [
    { label: "Order placed", description: "We've received your order" },
    { label: "Processing", description: "Your order is being prepared" },
    { label: "Shipped", description: "On its way to you" },
    { label: "Delivered" },
  ];
</script>`,
              vue: `<template>
  <l-Stepper :steps="steps" orientation="vertical" current-step="1" />
</template>

<script setup lang="ts">
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
<l-Stepper [steps]="steps" orientation="vertical" current-step="1" />`,
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
              js: `<l-Stepper id="stepper-complete" current-step="4" />

<script type="module">
  document.getElementById("stepper-complete").steps = [
    { label: "Cart" },
    { label: "Shipping" },
    { label: "Payment" },
    { label: "Confirm" },
  ];
</script>`,
              vue: `<template>
  <l-Stepper :steps="steps" current-step="4" />
</template>

<script setup lang="ts">
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
<l-Stepper [steps]="steps" current-step="4" />`,
            }}
          />
        </section>
      </div>
    </div>
  );
}
