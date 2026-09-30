import type { ReactNode } from "react";
import { useStepper } from "./stepperContext";

export interface StepperItemProps {
  /** The step this section belongs to (0-indexed) — it renders only while the stepper's current step equals it.
   * `"complete"` shows it once every step is done (after Finish). */
  step: number | "complete";
  /** Content shown while this section's step is current. */
  children?: ReactNode;
  /** Extra class name(s) applied to the wrapper element around `children`. */
  className?: string;
}

/**
 * One step's section, as a component: `<StepperItem step={1}><ShippingForm /></StepperItem>` inside `<Stepper>`.
 * It shows its children only when `step` matches the stepper's current step, so a form (or any component) lives
 * next to the step it belongs to instead of in the `steps` array. Components inside can call `useStepper()` to
 * move the stepper themselves. React only — Web Components fill the `step-<index>` slots instead.
 */
export function StepperItem({ step, children, className }: StepperItemProps) {
  const { index, done } = useStepper();
  const active = step === "complete" ? done : !done && step === index;
  if (!active) return null;
  return <div className={className}>{children}</div>;
}
