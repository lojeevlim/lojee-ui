import type { ChangeEventHandler, FocusEventHandler, FormEventHandler, InputHTMLAttributes } from "react";
import { cx } from "../../../core/tokens";
import { motionClass, motionStyle, type TransitionVariant, type HoverEffect } from "../../../core/motion";
import { Icon } from "../Icons/Icon";
import { INPUT_VARIANT_CLASSES, INPUT_VARIANT_INVALID_CLASSES, type InputVariant } from "../../../core/inputVariants";

export type InputSize = "sm" | "md" | "lg";

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** The value was committed — the native change event (the web component's `update` event, detail = the new value). */
  onChange?: ChangeEventHandler<HTMLInputElement>;
  /** Called as the user edits — the native input event (the web component's `input` event, detail = the current value). */
  onInput?: FormEventHandler<HTMLInputElement>;
  /** Called when the field gains focus — the native focus event (the web component's `focus` event). */
  onFocus?: FocusEventHandler<HTMLInputElement>;
  /** Called when the field fails validation (e.g. `required` and empty) — the native invalid event (the web component's `invalid` event, detail = the message). */
  onInvalid?: FormEventHandler<HTMLInputElement>;
  /** Control height and text size: "sm" | "md" | "lg". Defaults to "md". */
  size?: InputSize;
  /** Look of the field: "outline" | "filled" | "underline" | "soft" (default: "outline"). */
  variant?: InputVariant;
  /** Applies error (rose) styling when true (default: false). */
  invalid?: boolean;
  /** Icon name, e.g. "mail" — see src/core/icons.ts for the available set. */
  leadingIcon?: string;
  /** Icon name, e.g. "eye" — see src/core/icons.ts for the available set. */
  trailingIcon?: string;
  /** Enter transition: "fade" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "zoom" | "zoom-out" | "flip" | "blur" | "bounce" | "rotate" | "drop" | "skew" (default: none). Respects `prefers-reduced-motion`. */
  transition?: TransitionVariant;
  /** Enter transition duration in ms (default: 450). */
  transitionDuration?: number;
  /** Delay before the enter transition starts, in ms (default: 0) — handy for staggering. */
  transitionDelay?: number;
  /** Effect while hovering: "lift" | "scale" | "press" | "tilt" | "ring" | "glow" | "shine" (default: none). */
  hoverEffect?: HoverEffect;
  /** Extra class name(s) applied to the root element. */
  className?: string;
  /** Per-part class overrides — merged after (and win over) the built-in styling. */
  classNames?: { root?: string; input?: string; icon?: string };
}

const SIZE_CLASSES: Record<InputSize, string> = {
  sm: "h-8 px-2.5 text-sm",
  md: "h-10 px-3 text-sm",
  lg: "h-12 px-4 text-base",
};

const ICON_PX: Record<InputSize, number> = { sm: 14, md: 16, lg: 18 };

const BASE_CLASSES =
  "w-full rounded-md border border-border-strong bg-surface text-fg placeholder:text-fg-subtle outline-none transition-colors focus:border-slate-500 focus:ring-2 focus:ring-slate-500/20 disabled:cursor-not-allowed disabled:opacity-50";

const INVALID_CLASSES = "border-rose-400 focus:border-rose-500 focus:ring-rose-500/20";

export function Input({
  variant = "outline",
  size = "md",
  invalid = false,
  leadingIcon,
  trailingIcon,
  transition,
  transitionDuration,
  transitionDelay,
  hoverEffect,
  className,
  classNames,
  style,
  ...rest
}: InputProps) {
  const inputClasses = cx(
    BASE_CLASSES,
    SIZE_CLASSES[size],
    INPUT_VARIANT_CLASSES[variant],
    invalid && INVALID_CLASSES,
    invalid && INPUT_VARIANT_INVALID_CLASSES[variant],
    leadingIcon && "pl-9",
    trailingIcon && "pr-9"
  );

  const motionStyles = { ...style, ...motionStyle(transitionDuration, transitionDelay) };

  if (!leadingIcon && !trailingIcon) {
    return (
      <input
        aria-invalid={invalid || undefined}
        data-input-variant={variant}
        // An <input> can't host the hover "shine" streak (it needs an ::after), so that effect is skipped here.
        className={cx(inputClasses, motionClass(transition, hoverEffect === "shine" ? undefined : hoverEffect), className, classNames?.root, classNames?.input)}
        style={motionStyles}
        {...rest}
      />
    );
  }

  return (
    <span
      className={cx("relative inline-flex w-full items-center", motionClass(transition, hoverEffect), className, classNames?.root)}
      style={motionStyles}
    >
      {leadingIcon && (
        <Icon
          name={leadingIcon}
          size={ICON_PX[size]}
          className={cx("pointer-events-none absolute left-3 text-fg-subtle", classNames?.icon)}
        />
      )}
      <input aria-invalid={invalid || undefined} data-input-variant={variant} className={cx(inputClasses, classNames?.input)} {...rest} />
      {trailingIcon && (
        <Icon
          name={trailingIcon}
          size={ICON_PX[size]}
          className={cx("pointer-events-none absolute right-3 text-fg-subtle", classNames?.icon)}
        />
      )}
    </span>
  );
}
