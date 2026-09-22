import { useState } from "react";
import { Stepper, type StepperStep, type StepperOrientation } from "./Stepper/Stepper";
import { OptionGroup, PlaygroundLayout, AppWindowFrame } from "./PlaygroundHelpers";
import type { CodeBlockVariants } from "./CodeBlock";

const ORIENTATIONS: StepperOrientation[] = ["horizontal", "vertical"];
const STEP_INDICES = ["0", "1", "2", "3"] as const;

const SAMPLE_STEPS: StepperStep[] = [{ label: "Cart" }, { label: "Shipping" }, { label: "Payment" }, { label: "Confirm" }];

const SAMPLE_STEPS_CODE = `  { label: "Cart" },
  { label: "Shipping" },
  { label: "Payment" },
  { label: "Confirm" },`;

export default function StepperPlayground() {
  const [orientation, setOrientation] = useState<StepperOrientation>("horizontal");
  const [currentStep, setCurrentStep] = useState<(typeof STEP_INDICES)[number]>("1");

  const stepper = <Stepper steps={SAMPLE_STEPS} currentStep={Number(currentStep)} orientation={orientation} />;

  const stepFiller = (
    <div className="flex h-28 items-center justify-center rounded-xl border border-dashed border-slate-200 text-sm text-slate-300">
      Step content
    </div>
  );

  // Horizontal sits above a wizard step's content, like a checkout flow;
  // vertical sits beside it, like a settings wizard's step list.
  const preview = (
    <AppWindowFrame>
      {orientation === "horizontal" ? (
        <div className="bg-white p-6" style={{ height: 260 }}>
          {stepper}
          <div className="mt-6">{stepFiller}</div>
        </div>
      ) : (
        <div className="flex gap-6 bg-white p-6" style={{ height: 260 }}>
          <div className="shrink-0">{stepper}</div>
          <div className="flex-1">{stepFiller}</div>
        </div>
      )}
    </AppWindowFrame>
  );

  // `steps` is a "json"-typed prop with no native attribute form — it must be
  // assigned as a real DOM property (js) or bound (vue/angular) rather than
  // stringified into the tag.
  const attrs = `currentStep="${currentStep}" orientation="${orientation}"`;

  const codeVariants: CodeBlockVariants = {
    react: `<Stepper
  currentStep={${currentStep}}
  orientation="${orientation}"
  steps={[
${SAMPLE_STEPS_CODE}
  ]}
/>`,
    js: `<l-Stepper id="stepper-demo" ${attrs} />

<script type="module">
  import "lojee-ui/elements";

  const steps = [
${SAMPLE_STEPS_CODE}
  ];

  const el = document.getElementById("stepper-demo");
  el.steps = steps;
</script>`,
    vue: `<template>
  <l-Stepper :steps="steps" ${attrs} />
</template>

<script setup lang="ts">
const steps = [
${SAMPLE_STEPS_CODE}
];
</script>`,
    angular: `<l-Stepper [steps]="steps" ${attrs} />

steps = [
${SAMPLE_STEPS_CODE}
];`,
  };

  return (
    <PlaygroundLayout preview={preview} variants={codeVariants}>
      <OptionGroup label="Orientation" options={ORIENTATIONS} value={orientation} onChange={setOrientation} />
      <OptionGroup label="Current step" options={STEP_INDICES} value={currentStep} onChange={setCurrentStep} />
    </PlaygroundLayout>
  );
}
