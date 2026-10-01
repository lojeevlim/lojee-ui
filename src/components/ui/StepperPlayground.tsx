import { useState } from "react";
import { Stepper, type StepperStep, type StepperOrientation } from "./Stepper/Stepper";
import { StepperItem } from "./Stepper/StepperItem";
import { OptionGroup, ColorSwatches, PlaygroundLayout, AppWindowFrame } from "./PlaygroundHelpers";
import type { ColorName } from "../../core/tokens";
import type { CodeBlockVariants } from "./CodeBlock";
import { useMotion } from "./playgroundMotion";

const ORIENTATIONS: StepperOrientation[] = ["horizontal", "vertical"];
const STEP_INDICES = ["0", "1", "2", "3"] as const;
const TOGGLE = ["off", "on"] as const;
// How each step's section is supplied: none, `content` in the steps array, or <StepperItem> children.
const SECTION_MODES = ["none", "content", "items"] as const;
type SectionMode = (typeof SECTION_MODES)[number];

const STEP_LABELS = ["Cart", "Shipping", "Payment", "Confirm"] as const;
const STEP_BLURBS = ["Review the items in your cart.", "Where should we send it?", "Choose how you'd like to pay.", "Everything look right? Place the order."];

const panel = (title: string, blurb: string) => (
  <div className="rounded-xl border border-dashed border-border p-4">
    <p className="text-sm font-medium text-fg">{title}</p>
    <p className="mt-1 text-sm text-fg-subtle">{blurb}</p>
  </div>
);

const PLAIN_STEPS: StepperStep[] = STEP_LABELS.map((label) => ({ label }));
const CONTENT_STEPS: StepperStep[] = STEP_LABELS.map((label, i) => ({ label, content: panel(label, STEP_BLURBS[i]) }));

const indent = (code: string, spaces: number) => code.replace(/^/gm, " ".repeat(spaces));

// Web Components: `content` is plain text, or leave it out and use <l-stepper-item step="n"> children.
const PLAIN_STEPS_CODE = `  { label: "Cart" },
  { label: "Shipping" },
  { label: "Payment" },
  { label: "Confirm" },`;

const TEXT_STEPS_CODE = `  { label: "Cart", content: "Review the items in your cart." },
  { label: "Shipping", content: "Where should we send it?" },
  { label: "Payment", content: "Choose how you'd like to pay." },
  { label: "Confirm", content: "Everything look right? Place the order." },`;

const SLOTS_CODE = `  <l-stepper-item step="0">Review the items in your cart.</l-stepper-item>
  <l-stepper-item step="1"><my-shipping-form></my-shipping-form></l-stepper-item>
  <l-stepper-item step="2"><my-payment-form></my-payment-form></l-stepper-item>
  <l-stepper-item step="3">Everything look right? Place the order.</l-stepper-item>
  <l-stepper-item step="complete">All done.</l-stepper-item>`;

export default function StepperPlayground() {
  const motion = useMotion();
  const [orientation, setOrientation] = useState<StepperOrientation>("horizontal");
  const [color, setColor] = useState<ColorName>("accent");
  const [currentStep, setCurrentStep] = useState<(typeof STEP_INDICES)[number]>("1");
  const [mode, setMode] = useState<SectionMode>("items");
  const [nav, setNav] = useState<(typeof TOGGLE)[number]>("on");
  const navigation = nav === "on";
  // Sections or navigation can change the step from inside the preview, so they report back.
  const reports = mode !== "none" || navigation;

  // Sections show the current step's section; navigation adds Back / Next buttons. Both report every change so the
  // "Current step" control below stays in sync when you click through the preview.
  const stepper = (
    <Stepper
      key={motion.replayKey}
      {...motion.props}
      steps={mode === "content" ? CONTENT_STEPS : PLAIN_STEPS}
      currentStep={Number(currentStep)}
      orientation={orientation}
      color={color}
      navigation={navigation}
      onStepChange={(i) => setCurrentStep(String(Math.min(i, 3)) as (typeof STEP_INDICES)[number])}
    >
      {mode === "items" && (
        <>
          {STEP_LABELS.map((label, i) => (
            <StepperItem key={label} step={i}>
              {panel(label, STEP_BLURBS[i])}
            </StepperItem>
          ))}
          <StepperItem step="complete">{panel("All done", "Your order has been placed.")}</StepperItem>
        </>
      )}
    </Stepper>
  );

  const preview = (
    <AppWindowFrame>
      <div className="min-h-[300px] flex-1 bg-surface p-6">{stepper}</div>
    </AppWindowFrame>
  );

  // ---- code -----------------------------------------------------------------------------------------------------
  // "accent" is the default (follows the theme), so `color` is only written out when changed.
  const colorProp = color !== "accent" ? `  color="${color}"\n` : "";
  const reactProps = `  currentStep={${currentStep}}\n  orientation="${orientation}"\n${colorProp}${navigation ? "  navigation\n" : ""}${
    motion.attrs.trim() ? motion.attrs.trim().split(/ (?=\w+=)/).map((a) => `  ${a}\n`).join("") : ""
  }${
    reports ? "  onStepChange={(index, step) => console.log(index, step?.label)}\n" : ""
  }`;

  const react =
    mode === "items"
      ? `import { Stepper, StepperItem, useStepper } from "lojee-ui";

// Any component inside a StepperItem can call useStepper() for { index, next, prev, goTo, isFirst, isLast, done }.
function ShippingForm() {
  const { next, prev } = useStepper();
  return (
    <form onSubmit={(e) => { e.preventDefault(); next(); }}>
      {/* fields… */}
      <button type="button" onClick={prev}>Back</button>
      <button type="submit">Continue</button>
    </form>
  );
}

<Stepper
${reactProps}  steps={[
    { label: "Cart" },
    { label: "Shipping" },
    { label: "Payment" },
    { label: "Confirm" },
  ]}
>
  <StepperItem step={0}><CartPanel /></StepperItem>          {/* shown while the current step is 0 */}
  <StepperItem step={1}><ShippingForm /></StepperItem>
  <StepperItem step={2}><PaymentForm /></StepperItem>
  <StepperItem step={3}><ConfirmPanel /></StepperItem>
  <StepperItem step="complete">All done.</StepperItem>       {/* shown after Finish */}
</Stepper>`
      : `import { Stepper } from "lojee-ui";

<Stepper
${reactProps}  steps={[
${
        mode === "content"
          ? `    { label: "Cart", content: <CartPanel /> },        // an element…
    { label: "Shipping", content: ShippingForm },       // …or a component: it gets { next, prev, goTo, … }
    { label: "Payment", content: <PaymentForm /> },
    { label: "Confirm", content: <ConfirmPanel /> },`
          : indent(PLAIN_STEPS_CODE, 2)
      }
  ]}
/>`;

  // Web Component attributes: dashed names, booleans as "true".
  const attrs = [
    `current-step="${currentStep}"`,
    `orientation="${orientation}"`,
    color !== "accent" ? `color="${color}"` : null,
    navigation ? 'navigation="true"' : null,
    motion.attrs.trim() || null,
  ]
    .filter(Boolean)
    .join(" ");
  const stepsCode = mode === "content" ? TEXT_STEPS_CODE : PLAIN_STEPS_CODE;
  const slotted = mode === "items";
  const hasEvent = reports;

  const js = `<l-stepper id="stepper-demo" ${attrs}>${slotted ? `\n${SLOTS_CODE}\n` : ""}</l-stepper>

<script type="module">
  import "lojee-ui/elements";

  const el = document.getElementById("stepper-demo");
  el.steps = [
${stepsCode}
  ];${hasEvent ? `\n  el.addEventListener("stepchange", (e) => console.log("Step index:", e.detail));` : ""}
</script>`;

  const vue = `<template>
  <l-stepper :steps="steps" ${attrs}${hasEvent ? ' @stepchange="onStepChange"' : ""}>${slotted ? `\n${indent(SLOTS_CODE, 2)}\n  ` : ""}</l-stepper>
</template>

<script setup lang="ts">
import "lojee-ui/elements";

const steps = [
${stepsCode}
];${hasEvent ? '\n\nfunction onStepChange(e: CustomEvent) {\n  console.log("Step index:", e.detail);\n}' : ""}
</script>`;

  const angular = `<l-stepper [steps]="steps" ${attrs}${hasEvent ? ' (stepchange)="onStepChange($event)"' : ""}>${slotted ? `\n${SLOTS_CODE}\n` : ""}</l-stepper>

steps = [
${stepsCode}
];${hasEvent ? '\n\nonStepChange(e: CustomEvent) {\n  console.log("Step index:", e.detail);\n}' : ""}`;

  const codeVariants: CodeBlockVariants = { react, js, vue, angular };

  return (
    <PlaygroundLayout preview={preview} variants={codeVariants}>
      <OptionGroup label="Orientation" options={ORIENTATIONS} value={orientation} onChange={setOrientation} />
      <ColorSwatches value={color} onChange={setColor} />
      <OptionGroup label="Step sections" options={SECTION_MODES} value={mode} onChange={setMode} />
      <OptionGroup label="Navigation buttons" options={TOGGLE} value={nav} onChange={setNav} />
      <OptionGroup label="Current step" options={STEP_INDICES} value={currentStep} onChange={setCurrentStep} />
      {motion.controls}
    </PlaygroundLayout>
  );
}
