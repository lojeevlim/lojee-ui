import { cx } from "../../../core/tokens";
import { Icon } from "../Icons/Icon";

export interface StepperStep {
  label: string;
  description?: string;
}

export type StepperOrientation = "horizontal" | "vertical";

type StepStatus = "complete" | "current" | "upcoming";

// Data-driven (array-of-steps prop) rather than compound children — same
// reasoning as Tabs/NavigationMenu/BottomNavigation: once wrapped as a Web
// Component via r2wc, arbitrary light-DOM children can't be inspected across
// the shadow boundary, so a plain data array is the only shape that works
// identically in both the React and Web Component builds.
export interface StepperProps {
  steps: StepperStep[];
  /** 0-indexed — steps before this are complete, this one is current, after are upcoming. */
  currentStep: number;
  orientation?: StepperOrientation;
  className?: string;
  classNames?: {
    root?: string;
    step?: string;
    circle?: string;
    completeCircle?: string;
    currentCircle?: string;
    label?: string;
    description?: string;
    connector?: string;
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
}: {
  status: StepStatus;
  index: number;
  classNames?: StepperProps["classNames"];
}) {
  if (status === "complete") {
    return (
      <div className={cx(CIRCLE_BASE, "bg-slate-900 text-white", classNames?.circle, classNames?.completeCircle)}>
        <Icon name="check" size={16} />
      </div>
    );
  }
  if (status === "current") {
    return (
      <div className={cx(CIRCLE_BASE, "border-2 border-slate-900 text-slate-900", classNames?.circle, classNames?.currentCircle)}>
        {index + 1}
      </div>
    );
  }
  return <div className={cx(CIRCLE_BASE, "border border-slate-300 text-slate-400", classNames?.circle)}>{index + 1}</div>;
}

export function Stepper({ steps, currentStep, orientation = "horizontal", className, classNames }: StepperProps) {
  if (orientation === "vertical") {
    return (
      <ol className={cx("flex flex-col", className, classNames?.root)}>
        {steps.map((step, i) => {
          const status = statusOf(i, currentStep);
          const isLast = i === steps.length - 1;
          return (
            <li key={i} className={cx("flex gap-3", classNames?.step)}>
              <div className="flex flex-col items-center">
                <StepCircle status={status} index={i} classNames={classNames} />
                {!isLast && (
                  <div className={cx("my-1 w-0.5 flex-1", i < currentStep ? "bg-slate-900" : "bg-slate-200", classNames?.connector)} />
                )}
              </div>
              <div className={cx("pb-8", isLast && "pb-0")}>
                <p className={cx("text-sm font-medium", status === "upcoming" ? "text-slate-400" : "text-slate-900", classNames?.label)}>
                  {step.label}
                </p>
                {step.description && (
                  <p className={cx("mt-0.5 text-sm text-slate-500", classNames?.description)}>{step.description}</p>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    );
  }

  return (
    <ol className={cx("flex items-start", className, classNames?.root)}>
      {steps.map((step, i) => {
        const status = statusOf(i, currentStep);
        const isLast = i === steps.length - 1;
        return (
          <li key={i} className={cx("flex items-start", !isLast && "flex-1", classNames?.step)}>
            <div className="flex flex-col items-center gap-1.5">
              <StepCircle status={status} index={i} classNames={classNames} />
              <div className="max-w-[9rem] text-center">
                <p className={cx("text-sm font-medium", status === "upcoming" ? "text-slate-400" : "text-slate-900", classNames?.label)}>
                  {step.label}
                </p>
                {step.description && (
                  <p className={cx("mt-0.5 text-xs text-slate-500", classNames?.description)}>{step.description}</p>
                )}
              </div>
            </div>
            {!isLast && (
              <div className={cx("mt-4 h-0.5 flex-1", i < currentStep ? "bg-slate-900" : "bg-slate-200", classNames?.connector)} />
            )}
          </li>
        );
      })}
    </ol>
  );
}
