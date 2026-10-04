import type { ChangeEventHandler, FocusEventHandler, FormEventHandler, InputHTMLAttributes, ReactNode } from "react";
import { cx, type ColorName } from "../../../core/tokens";
import { motionClass, motionStyle, type TransitionVariant, type HoverEffect } from "../../../core/motion";
import { getIcon } from "../../../core/icons";

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  /** The value was committed — the native change event (the web component's `update` event, detail = the new value). */
  onChange?: ChangeEventHandler<HTMLInputElement>;
  /** Called as the user edits — the native input event (the web component's `input` event, detail = the current value). */
  onInput?: FormEventHandler<HTMLInputElement>;
  /** Called when the field gains focus — the native focus event (the web component's `focus` event). */
  onFocus?: FocusEventHandler<HTMLInputElement>;
  /** Called when the field fails validation (e.g. `required` and empty) — the native invalid event (the web component's `invalid` event, detail = the message). */
  onInvalid?: FormEventHandler<HTMLInputElement>;
  /** Text or node shown beside the box; clicking it toggles the checkbox. */
  label?: ReactNode;
  /** Checked background color (default: accent — follows the theme). */
  color?: ColorName;
  /** Enter transition: "fade" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "zoom" | "zoom-out" | "flip" | "blur" | "bounce" | "rotate" | "drop" | "skew" (default: none). Respects `prefers-reduced-motion`. */
  transition?: TransitionVariant;
  /** Enter transition duration in ms (default: 450). */
  transitionDuration?: number;
  /** Delay before the enter transition starts, in ms (default: 0) — handy for staggering. */
  transitionDelay?: number;
  /** Effect while hovering: "lift" | "scale" | "press" | "tilt" | "ring" | "glow" | "shine" (default: none). */
  hoverEffect?: HoverEffect;
  /** Extra class names applied to the root `<label>` element. */
  className?: string;
  /** Per-part class overrides — merged after (and win over) the built-in styling. */
  classNames?: {
    root?: string;
    box?: string;
    label?: string;
  };
}

const CHECKED_BG: Record<ColorName, string> = {
  slate: "peer-checked:bg-slate-900 dark:peer-checked:bg-slate-600",
  gray: "peer-checked:bg-gray-600",
  indigo: "peer-checked:bg-indigo-600",
  accent: "peer-checked:bg-accent-600",
  violet: "peer-checked:bg-violet-600",
  blue: "peer-checked:bg-blue-600",
  cyan: "peer-checked:bg-cyan-600",
  emerald: "peer-checked:bg-emerald-600",
  teal: "peer-checked:bg-teal-600",
  amber: "peer-checked:bg-amber-500",
  orange: "peer-checked:bg-orange-600",
  rose: "peer-checked:bg-rose-600",
  pink: "peer-checked:bg-pink-600",
};

export function Checkbox({ label, color = "accent", transition, transitionDuration, transitionDelay, hoverEffect, className, classNames, ...rest }: CheckboxProps) {
  // getIcon() always returns the same stable, module-level-imported
  // component reference for a given name, so this never actually causes a
  // remount — the lint rule can't verify that statically, hence the disable.
  const CheckIcon = getIcon("check");
  return (
    <label
      className={cx(
        "inline-flex items-center gap-2 text-sm text-fg-muted",
        rest.disabled && "opacity-40 pointer-events-none",
        motionClass(transition, hoverEffect),
        className,
        classNames?.root
      )}
      style={motionStyle(transitionDuration, transitionDelay)}
    >
      <span className="relative inline-flex h-4 w-4 shrink-0">
        {/* The box and icon below are direct siblings of the input (not
            nested inside one another) so Tailwind's `peer-checked:` sibling
            selector — which only matches siblings sharing the input's own
            parent — reaches both of them. */}
        <input type="checkbox" className="peer sr-only" {...rest} />
        <span
          className={cx(
            "absolute inset-0 rounded border border-border-strong bg-surface transition-colors peer-checked:border-transparent peer-focus-visible:ring-2 peer-focus-visible:ring-slate-500/30",
            CHECKED_BG[color],
            classNames?.box
          )}
        />
        {/* eslint-disable-next-line react-hooks/static-components -- see comment above `const CheckIcon` */}
        {CheckIcon && <CheckIcon size={12} className="absolute inset-0 m-auto text-white opacity-0 transition-opacity peer-checked:opacity-100" />}
      </span>
      {label && <span className={classNames?.label}>{label}</span>}
    </label>
  );
}
