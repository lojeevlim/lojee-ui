import { createContext, useContext } from "react";
import type { StepperStep } from "./Stepper";

/** What a step's section (a component used as `content`, a `<StepperItem>`, or anything calling `useStepper()`)
 * gets to work with — enough to drive the stepper from inside it (e.g. a form whose own "Continue" button
 * calls `next()` once it validates). */
export interface StepperStepContext {
  /** The current step (0-indexed). `count` once every step is complete. */
  index: number;
  step: StepperStep | undefined;
  /** Number of steps. */
  count: number;
  isFirst: boolean;
  isLast: boolean;
  /** True after the last step's Finish — every step is complete. */
  done: boolean;
  next: () => void;
  prev: () => void;
  goTo: (index: number) => void;
}

export const StepperContext = createContext<StepperStepContext | null>(null);

/** The surrounding `<Stepper>`'s current step and controls — for a component rendered inside a step. */
export function useStepper(): StepperStepContext {
  const ctx = useContext(StepperContext);
  if (!ctx) throw new Error("useStepper() must be used inside a <Stepper>.");
  return ctx;
}
