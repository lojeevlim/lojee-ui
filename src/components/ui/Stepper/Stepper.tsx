import { createElement, useEffect, useImperativeHandle, useRef, useState } from "react";
import type { ComponentType, CSSProperties, ReactNode, Ref } from "react";
import { cx, isColorName, type ColorName } from "../../../core/tokens";
import { activeAccent } from "../../../core/activeVariant";
import { Icon } from "../Icons/Icon";
import { Button } from "../Buttons/Button";
import { motionClass, motionStyle, type TransitionVariant, type HoverEffect } from "../../../core/motion";
import { StepperContext, type StepperStepContext } from "./stepperContext";

export type { StepperStepContext };

/** A step's section: any React node, or a component (rendered with a `StepperStepContext`). */
export type StepperContent = ReactNode | ComponentType<StepperStepContext>;

export interface StepperStep {
  label: string;
  description?: string;
  /** This step's section, shown under (horizontal) or beside (vertical) the steps while the step is current —
   * like Tabs / NavigationMenu content. Pass an element (`<Shipping />`) or a **component** (`Shipping`), which is
   * rendered with a `StepperStepContext` so it can call `next()` / `prev()` itself. Give a component a stable
   * identity (define it outside render) — an inline one is a new component type each render and would remount.
   * Web Components: plain text, or leave it out and fill the `step-<index>` slot (see `sections`). */
  content?: StepperContent;
  disabled?: boolean;
}

export type StepperOrientation = "horizontal" | "vertical";

type StepStatus = "complete" | "current" | "upcoming";

/** Methods a React consumer can call through a `ref` to drive the stepper from outside. */
export interface StepperHandle {
  next: () => void;
  prev: () => void;
  goTo: (index: number) => void;
  reset: () => void;
}

// Data-driven (array-of-steps prop) rather than compound children — same
// reasoning as Tabs/NavigationMenu/BottomNavigation: once wrapped as a Web
// Component via r2wc, arbitrary light-DOM children can't be inspected across
// the shadow boundary, so a plain data array is the only shape that works
// identically in both the React and Web Component builds.
export interface StepperProps {
  /** The steps to render, in order — each has a `label`, optional `description`, optional `content` section and optional `disabled`. */
  steps: StepperStep[];
  /** 0-indexed — steps before this are complete, this one is current, after are upcoming; past the last index,
   * every step shows as complete. Like Sidebar's `active`, it is a *default*, not a lock: the stepper manages the
   * current step itself (clicks, Back / Next, `ref`), and follows this prop whenever it changes. */
  currentStep?: number;
  /** Initial step when `currentStep` isn't given (default: 0). */
  defaultStep?: number;
  /** Layout direction: "horizontal" (default) or "vertical". */
  orientation?: StepperOrientation;
  /** Color of complete / current steps and the connector (default: "accent", which follows the theme's accent
   * color) — one of the built-in ColorNames, or any other CSS color value. */
  color?: ColorName | (string & {});
  /** Show the built-in Back / Next buttons (Finish on the last step) — they change the current step for you
   * (default: false). Works with or without step `content`. */
  navigation?: boolean;
  /** Let the step circles be clicked to jump to that step (default: on when any step has `content`). */
  clickable?: boolean;
  /** Text of the built-in Back button when `navigation` is on (default: "Back"). */
  backLabel?: string;
  /** Text of the built-in Next button when `navigation` is on (default: "Next"). */
  nextLabel?: string;
  /** Text of the Next button on the last step when `navigation` is on (default: "Finish"). */
  finishLabel?: string;
  /** Reserve a section for every step even when no step has `content`. For Web Components the sections are
   * `<l-stepper-item step="0">…</l-stepper-item>` children (any framework's components can go inside; they turn this
   * on by themselves), or plain slots: `<div slot="step-0">…</div>` and `slot="completed"`. React users use
   * `<StepperItem>` or `content`. */
  sections?: boolean;
  /** Shown instead of a step's section once every step is complete (after Finish). An element or a component
   * (rendered with a `StepperStepContext`, `index === steps.length`). */
  completedContent?: StepperContent;
  /** `<StepperItem step={n}>` sections (React): each shows while the stepper's current step is `n`. They and any
   * component inside can call `useStepper()` to change the step. */
  children?: ReactNode;
  /** Called with the new index and step whenever the current step changes (a click, Back / Next, `ref`, or the
   * `currentStep` prop). `index === steps.length` means every step is complete. */
  onStepChange?: (index: number, step: StepperStep | undefined) => void;
  /** Imperative handle — `ref.current.next()`, `.prev()`, `.goTo(2)`, `.reset()` (React 19 passes `ref` as a prop). */
  ref?: Ref<StepperHandle>;
  /** Enter transition: "fade" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "zoom" | "zoom-out" | "flip" | "blur" | "bounce" | "rotate" | "drop" | "skew" (default: none). Respects `prefers-reduced-motion`. */
  transition?: TransitionVariant;
  /** Enter transition duration in ms (default: 450). */
  transitionDuration?: number;
  /** Delay before the enter transition starts, in ms (default: 0) — handy for staggering. */
  transitionDelay?: number;
  /** Effect while hovering: "lift" | "scale" | "press" | "tilt" | "ring" | "glow" | "shine" (default: none). Applied to each step circle. */
  hoverEffect?: HoverEffect;
  /** Extra class name(s) appended to the root element. */
  className?: string;
  /** Per-part class overrides — merged after (and win over) the built-in styling. */
  classNames?: {
    root?: string;
    step?: string;
    circle?: string;
    completeCircle?: string;
    currentCircle?: string;
    label?: string;
    description?: string;
    connector?: string;
    panel?: string;
    navigation?: string;
  };
}

function statusOf(index: number, currentStep: number): StepStatus {
  if (index < currentStep) return "complete";
  if (index === currentStep) return "current";
  return "upcoming";
}

const CIRCLE_BASE = "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-medium transition-colors";

function StepCircle({
  status,
  index,
  classNames,
  onClick,
  disabled,
  label,
  hoverEffect,
}: {
  status: StepStatus;
  index: number;
  classNames?: StepperProps["classNames"];
  onClick?: () => void;
  disabled?: boolean;
  label: string;
  hoverEffect?: HoverEffect;
}) {
  const hover = motionClass(undefined, hoverEffect);
  let circle: ReactNode;
  if (status === "complete") {
    circle = (
      <div data-step-circle="complete" className={cx(CIRCLE_BASE, "bg-[var(--ac)] text-white", hover, classNames?.circle, classNames?.completeCircle)}>
        <Icon name="check" size={16} />
      </div>
    );
  } else if (status === "current") {
    circle = (
      <div data-step-circle="current" className={cx(CIRCLE_BASE, "border-2 border-[var(--ac)] text-[var(--ac)]", hover, classNames?.circle, classNames?.currentCircle)}>
        {index + 1}
      </div>
    );
  } else {
    circle = <div data-step-circle="upcoming" className={cx(CIRCLE_BASE, "border border-border-strong text-fg-subtle", hover, classNames?.circle)}>{index + 1}</div>;
  }
  if (!onClick) return <>{circle}</>;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={`Go to step ${index + 1}: ${label}`}
      aria-current={status === "current" ? "step" : undefined}
      className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ac)] focus-visible:ring-offset-2 focus-visible:ring-offset-surface disabled:cursor-not-allowed disabled:opacity-40"
    >
      {circle}
    </button>
  );
}

export function Stepper({
  steps,
  currentStep,
  defaultStep = 0,
  orientation = "horizontal",
  color = "accent",
  navigation = false,
  sections = false,
  clickable,
  backLabel = "Back",
  nextLabel = "Next",
  finishLabel = "Finish",
  completedContent,
  children,
  onStepChange,
  ref,
  transition,
  transitionDuration,
  transitionDelay,
  hoverEffect,
  className,
  classNames,
}: StepperProps) {
  const hasContent = sections || steps.some((s) => s.content != null) || completedContent != null || children != null;
  const canClick = clickable ?? hasContent;
  const last = steps.length;

  // Self-managed current step (identical "seed, not lock" behavior to Navbar / Sidebar `active`): the prop
  // seeds it and wins again whenever it changes; clicks, Back / Next and the `ref` move it in between.
  const [step, setStep] = useState(currentStep ?? defaultStep);
  const [prevProp, setPrevProp] = useState(currentStep);
  if (currentStep !== prevProp) {
    setPrevProp(currentStep);
    if (currentStep !== undefined) setStep(currentStep);
  }
  const clamped = Math.max(0, Math.min(step, last));
  const done = clamped >= last;

  const goTo = (index: number) => {
    const next = Math.max(0, Math.min(index, last));
    if (next === clamped) return;
    setStep(next);
    onStepChange?.(next, steps[next]);
  };
  // No dependency array: the handle is rebuilt every render so it always sees the latest step.
  useImperativeHandle(ref, () => ({
    next: () => goTo(clamped + 1),
    prev: () => goTo(clamped - 1),
    goTo,
    reset: () => goTo(0),
  }));

  // A component used as `content` gets the stepper's controls; an element/text is rendered as is. Each section is also
  // a named slot (`step-<i>`, `completed`) so Web Component users can slot in any framework's markup.
  const ctx = (index: number): StepperStepContext => ({
    index,
    step: steps[index],
    count: last,
    isFirst: index === 0,
    isLast: index === last - 1,
    done,
    next: () => goTo(clamped + 1),
    prev: () => goTo(clamped - 1),
    goTo,
  });
  const renderContent = (c: StepperContent, index: number): ReactNode =>
    typeof c === "function" ? createElement(c as ComponentType<StepperStepContext>, ctx(index)) : (c as ReactNode);

  // Publish the current step on the custom-element host (a no-op in plain React) so `<l-stepper-item step="n">`
  // siblings — separate React roots that can't share context — can show themselves when their step is current.
  const rootRef = useRef<HTMLOListElement>(null);
  useEffect(() => {
    const root = rootRef.current?.getRootNode();
    if (root instanceof ShadowRoot) {
      root.host.setAttribute("data-step", String(clamped));
      root.host.setAttribute("data-step-done", String(done));
    }
  });

  // Every colored part reads `--ac`, so `color` is one variable instead of a per-color class map.
  const colorStyle = { ["--ac" as string]: activeAccent(color, isColorName(color)) } as CSSProperties;
  const vertical = orientation === "vertical";
  const motionCls = motionClass(transition);
  const rootStyle = { ...colorStyle, ...motionStyle(transitionDuration, transitionDelay) };
  // The built-in buttons only take the named palette; a custom CSS color falls back to the accent there.
  const buttonColor: ColorName = isColorName(color) ? color : "accent";

  const circleFor = (i: number, status: StepStatus) => (
    <StepCircle
      status={status}
      index={i}
      classNames={classNames}
      label={steps[i].label}
      disabled={steps[i].disabled}
      hoverEffect={hoverEffect}
      onClick={canClick ? () => goTo(i) : undefined}
    />
  );

  const list = vertical ? (
    <ol ref={rootRef} style={hasContent ? colorStyle : rootStyle} className={cx("flex flex-col", !hasContent && motionCls, !hasContent && className, !hasContent && classNames?.root)}>
      {steps.map((s, i) => {
        const status = statusOf(i, clamped);
        const isLast = i === steps.length - 1;
        return (
          <li key={i} className={cx("flex gap-3", classNames?.step)}>
            <div className="flex flex-col items-center">
              {circleFor(i, status)}
              {!isLast && (
                <div data-step-connector={i < clamped ? "done" : "todo"} className={cx("my-1 w-0.5 flex-1", i < clamped ? "bg-[var(--ac)]" : "bg-border", classNames?.connector)} />
              )}
            </div>
            <div className={cx("pb-8", isLast && "pb-0")}>
              <p className={cx("text-sm font-medium", status === "upcoming" ? "text-fg-subtle" : "text-fg", classNames?.label)}>{s.label}</p>
              {s.description && <p className={cx("mt-0.5 text-sm text-fg-subtle", classNames?.description)}>{s.description}</p>}
            </div>
          </li>
        );
      })}
    </ol>
  ) : (
    <ol ref={rootRef} style={hasContent ? colorStyle : rootStyle} className={cx("flex items-start", !hasContent && motionCls, !hasContent && className, !hasContent && classNames?.root)}>
      {steps.map((s, i) => {
        const status = statusOf(i, clamped);
        const isLast = i === steps.length - 1;
        return (
          <li key={i} className={cx("flex items-start", !isLast && "flex-1", classNames?.step)}>
            <div className="flex flex-col items-center gap-1.5">
              {circleFor(i, status)}
              <div className="max-w-[9rem] text-center">
                <p className={cx("text-sm font-medium", status === "upcoming" ? "text-fg-subtle" : "text-fg", classNames?.label)}>{s.label}</p>
                {s.description && <p className={cx("mt-0.5 text-xs text-fg-subtle", classNames?.description)}>{s.description}</p>}
              </div>
            </div>
            {!isLast && <div data-step-connector={i < clamped ? "done" : "todo"} className={cx("mt-4 h-0.5 flex-1", i < clamped ? "bg-[var(--ac)]" : "bg-border", classNames?.connector)} />}
          </li>
        );
      })}
    </ol>
  );

  if (!hasContent && !navigation) return list;

  // The current step's section (when steps have content), plus the built-in navigation: Back / Next (Finish on the last step).
  const section = (
    <div style={colorStyle} className={cx("min-w-0", vertical && "flex-1")}>
      {hasContent && (
        <div role="tabpanel" className={classNames?.panel}>
          {done ? (
            <slot name="completed">{completedContent != null ? renderContent(completedContent, last) : null}</slot>
          ) : (
            <slot name={`step-${clamped}`}>{steps[clamped]?.content != null ? renderContent(steps[clamped].content, clamped) : null}</slot>
          )}
          {children}
          {/* Light-DOM children of <l-stepper> (its <l-stepper-item> elements) land here. */}
          <slot />
        </div>
      )}
      {navigation && (
        <div className={cx(hasContent && "mt-4", "flex items-center justify-between gap-2", classNames?.navigation)}>
          <Button color={buttonColor} variant="outline" label={backLabel} disabled={clamped === 0} onClick={() => goTo(clamped - 1)} />
          <Button
            color={buttonColor}
            label={clamped >= last - 1 && !done ? finishLabel : nextLabel}
            disabled={done}
            onClick={() => goTo(clamped + 1)}
          />
        </div>
      )}
    </div>
  );

  return (
    <StepperContext.Provider value={ctx(clamped)}>
      <div
        className={cx(vertical ? "flex items-start gap-8" : "flex flex-col gap-6", motionCls, className, classNames?.root)}
        style={motionStyle(transitionDuration, transitionDelay)}
      >
        {vertical ? <div className="shrink-0">{list}</div> : list}
        {section}
      </div>
    </StepperContext.Provider>
  );
}
