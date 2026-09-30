import { useEffect, useRef, useSyncExternalStore } from "react";

// `<l-stepper-item step="1">` — the Web Component counterpart of React's <StepperItem>. A React tree can't pass
// context to another custom element's React root, so the two elements talk through the DOM instead: `<l-stepper>`
// publishes its current step on its host as `data-step` / `data-step-done`, and each item watches its closest
// `<l-stepper>` ancestor for changes and shows its slotted content only while its own `step` matches.

const STEPPER_TAG = "l-stepper";

function stepperOf(el: HTMLElement | null): Element | null {
  const root = el?.getRootNode();
  const host = root instanceof ShadowRoot ? root.host : null;
  return host?.closest(STEPPER_TAG) ?? null;
}

export interface StepperItemElementProps {
  /** The step this section belongs to (0-indexed), or "complete" for the finished state. */
  step?: string;
}

export function StepperItemElement({ step = "0" }: StepperItemElementProps) {
  const ref = useRef<HTMLDivElement>(null);

  // `stepper` state as a "current|done" string, read straight from the parent's attributes and kept live with a
  // MutationObserver (useSyncExternalStore also re-reads it right after subscribing, once the ref is set).
  const snapshot = useSyncExternalStore(
    (notify) => {
      const parent = stepperOf(ref.current);
      if (!parent) return () => {};
      const observer = new MutationObserver(notify);
      observer.observe(parent, { attributes: true, attributeFilter: ["data-step", "data-step-done"] });
      return () => observer.disconnect();
    },
    () => {
      const parent = stepperOf(ref.current);
      return parent ? `${parent.getAttribute("data-step") ?? "0"}|${parent.getAttribute("data-step-done") ?? "false"}` : "|";
    },
    () => "|"
  );

  // Having an item is what turns the stepper's section on — no need to also write `sections="true"` by hand.
  useEffect(() => {
    stepperOf(ref.current)?.setAttribute("sections", "true");
  }, []);

  const [current, done] = snapshot.split("|");
  const active = step === "complete" ? done === "true" : done !== "true" && current !== "" && Number(current) === Number(step);

  return (
    <div ref={ref} style={{ display: active ? "block" : "none" }}>
      <slot />
    </div>
  );
}
