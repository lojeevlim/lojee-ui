import type { ReactNode } from "react";
import { cx, type ColorName } from "../../../core/tokens";
import { Icon } from "../Icons/Icon";
import { getIcon } from "../../../core/icons";
import { animatedClass, animatedStyle, type AnimatedProp } from "../../../core/animated";
import { AnimatedOverlay } from "../../../core/AnimatedOverlay";
import { motionClass, motionStyle, type TransitionVariant, type HoverEffect } from "../../../core/motion";

export type AlertVariant = "info" | "success" | "warning" | "error" | "accent";

export interface AlertProps {
  /** Attention animation: "glow" | "pulse" | "sweep" | "bounce" | "float" | "wiggle" | "border-spin" | "particles" | "tail" — one, or a list to combine, e.g. ["particles", "tail"] (default: none). Respects `prefers-reduced-motion`. */
  animation?: AnimatedProp;
  /** Color of the animation (pulse ring, glow, spinning border): a `ColorName` or any CSS color (default: the component's own color). */
  pulseColor?: ColorName | (string & {});
  /** Second color — turns the pulse ring and spinning border into a gradient from `pulseColor` to this (default: solid `pulseColor`). */
  pulseGradientTo?: ColorName | (string & {});
  /** Visual/semantic tone: "info" | "success" | "warning" | "error" | "accent" — "accent" follows the theme accent color (default: "info"). */
  variant?: AlertVariant;
  /** Optional bold heading shown above the description. */
  title?: ReactNode;
  /** The description/body. */
  children: ReactNode;
  /** Icon name to override the variant's default icon, or `false` to hide the icon entirely. */
  icon?: string | false;
  /** Shows a dismiss (X) button (default: false); the alert does not hide itself, so remove it in `onClose`. */
  closable?: boolean;
  /** Called with no arguments when the dismiss button is clicked. */
  onClose?: () => void;
  /** Enter transition: "fade" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "zoom" | "zoom-out" | "flip" | "blur" | "bounce" | "rotate" | "drop" | "skew" (default: none). Respects `prefers-reduced-motion`. */
  transition?: TransitionVariant;
  /** Enter transition duration in ms (default: 450). */
  transitionDuration?: number;
  /** Delay before the enter transition starts, in ms (default: 0) — handy for staggering. */
  transitionDelay?: number;
  /** Effect while hovering: "lift" | "scale" | "press" | "tilt" | "ring" | "glow" | "shine" (default: none). */
  hoverEffect?: HoverEffect;
  /** Extra class names applied to the root element. */
  className?: string;
  /** Per-part class overrides — merged after (and win over) the built-in styling. */
  classNames?: {
    root?: string;
    icon?: string;
    title?: string;
    description?: string;
    closeButton?: string;
  };
}

const DEFAULT_ICON: Record<AlertVariant, string> = {
  info: "info",
  success: "circle-check",
  warning: "triangle-alert",
  error: "circle-x",
  accent: "info",
};

const VARIANT_CLASSES: Record<AlertVariant, string> = {
  info: "border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-200",
  success: "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200",
  warning: "border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-200",
  error: "border-rose-200 bg-rose-50 text-rose-800 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-200",
  accent: "border-accent-200 bg-accent-50 text-accent-800 dark:border-accent-900 dark:bg-accent-950/40 dark:text-accent-200",
};

// Default animation color per tone.
const VARIANT_ANIM_COLOR: Record<AlertVariant, string> = { info: "blue", success: "emerald", warning: "amber", error: "rose", accent: "accent" };

const ICON_COLOR_CLASSES: Record<AlertVariant, string> = {
  info: "text-blue-500",
  success: "text-emerald-500",
  warning: "text-amber-500",
  error: "text-rose-500",
  accent: "text-accent-500",
};

export function Alert({
  variant = "info",
  title,
  children,
  icon,
  closable = false,
  onClose,
  className,
  classNames,
  animation,
  pulseColor,
  pulseGradientTo,
  transition,
  transitionDuration,
  transitionDelay,
  hoverEffect,
}: AlertProps) {
  const iconName = icon === false ? undefined : icon || DEFAULT_ICON[variant];
  // getIcon() always returns the same stable, module-level-imported
  // component reference for a given name, so this never actually causes a
  // remount — the lint rule can't verify that statically, hence the disable
  // (only relevant here so we can decide whether to render the icon slot at
  // all before handing the name off to <Icon>).
  const hasIcon = Boolean(iconName && getIcon(iconName));

  return (
    <div
      role="alert"
      className={cx(
        "flex gap-3 rounded-lg border p-4",
        VARIANT_CLASSES[variant],
        animatedClass(animation),
        motionClass(transition, hoverEffect),
        className,
        classNames?.root
      )}
      style={{ ...animatedStyle(animation, VARIANT_ANIM_COLOR[variant], pulseColor, pulseGradientTo), ...motionStyle(transitionDuration, transitionDelay) }}
    >
      {hasIcon && iconName && (
        <Icon name={iconName} size={20} className={cx("mt-0.5 shrink-0", ICON_COLOR_CLASSES[variant], classNames?.icon)} />
      )}
      <div className="min-w-0 flex-1">
        {title && (
          <div className={cx("text-sm font-semibold", classNames?.title)}>
            <slot name="title">{title}</slot>
          </div>
        )}
        <div className={cx("text-sm", title ? "mt-1" : "", classNames?.description)}>
          <slot>{children}</slot>
        </div>
      </div>
      {closable && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Dismiss"
          className={cx(
            "-mt-1 -mr-1 shrink-0 rounded-md p-1 opacity-60 transition-opacity hover:opacity-100",
            classNames?.closeButton
          )}
        >
          <Icon name="x" size={16} />
        </button>
      )}
      <AnimatedOverlay variant={animation} />
    </div>
  );
}
