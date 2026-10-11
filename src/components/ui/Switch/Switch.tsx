import type { ChangeEventHandler, FocusEventHandler, FormEventHandler, InputHTMLAttributes, ReactNode } from "react";
import { cx, type ColorName } from "../../../core/tokens";
import { Icon } from "../Icons/Icon";
import { motionClass, motionStyle, type TransitionVariant, type HoverEffect } from "../../../core/motion";

export type SwitchSize = "sm" | "md" | "lg";

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  /** The value was committed — the native change event (the web component's `update` event, detail = the new value). */
  onChange?: ChangeEventHandler<HTMLInputElement>;
  /** Called as the user edits — the native input event (the web component's `input` event, detail = the current value). */
  onInput?: FormEventHandler<HTMLInputElement>;
  /** Called when the field gains focus — the native focus event (the web component's `focus` event). */
  onFocus?: FocusEventHandler<HTMLInputElement>;
  /** Called when the field fails validation (e.g. `required` and empty) — the native invalid event (the web component's `invalid` event, detail = the message). */
  onInvalid?: FormEventHandler<HTMLInputElement>;
  /** Text or element shown next to the switch. */
  label?: ReactNode;
  /** Switch size: "sm", "md" or "lg" (default: "md"). */
  size?: SwitchSize;
  /** Icon name shown inside the thumb while the switch is on (named `iconOn`, not `onIcon`: Vue reads any `on…` attribute as an event listener), e.g. "check" or "moon" — see src/core/icons.ts for the available set (default: none). */
  iconOn?: string;
  /** Icon name shown inside the thumb while the switch is off, e.g. "x" or "sun" (default: none). */
  iconOff?: string;
  /** "On" track color (default: accent — follows the theme). */
  color?: ColorName;
  /** Enter transition: "fade" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "zoom" | "zoom-out" | "flip" | "blur" | "bounce" | "rotate" | "drop" | "skew" (default: none). Respects `prefers-reduced-motion`. */
  transition?: TransitionVariant;
  /** Enter transition duration in ms (default: 450). */
  transitionDuration?: number;
  /** Delay before the enter transition starts, in ms (default: 0) — handy for staggering. */
  transitionDelay?: number;
  /** Effect while hovering: "lift" | "scale" | "press" | "tilt" | "ring" | "glow" | "shine" (default: none). */
  hoverEffect?: HoverEffect;
  /** Extra class name(s) appended to the root element. */
  className?: string;
  /** Per-part class overrides — merged after (and win over) the built-in styling. */
  classNames?: {
    root?: string;
    track?: string;
    thumb?: string;
    icon?: string;
    label?: string;
  };
}

const TRACK_SIZE: Record<SwitchSize, string> = {
  sm: "h-5 w-9",
  md: "h-6 w-11",
  lg: "h-7 w-13",
};

const THUMB_SIZE: Record<SwitchSize, string> = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
};

const ICON_PX: Record<SwitchSize, number> = { sm: 10, md: 12, lg: 14 };

const ON_BG: Record<ColorName, string> = {
  slate: "peer-checked:bg-slate-900 dark:peer-checked:bg-slate-500",
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

// The thumb is white, so the "on" icon takes the switch's own color — never white-on-white.
const ON_ICON: Record<ColorName, string> = {
  slate: "text-slate-800",
  gray: "text-gray-700",
  indigo: "text-indigo-600",
  accent: "text-accent-600",
  violet: "text-violet-600",
  blue: "text-blue-600",
  cyan: "text-cyan-600",
  emerald: "text-emerald-600",
  teal: "text-teal-600",
  amber: "text-amber-600",
  orange: "text-orange-600",
  rose: "text-rose-600",
  pink: "text-pink-600",
};

const RING: Record<ColorName, string> = {
  slate: "peer-focus-visible:ring-fg-subtle/30",
  gray: "peer-focus-visible:ring-gray-500/30",
  indigo: "peer-focus-visible:ring-indigo-500/30",
  accent: "peer-focus-visible:ring-accent-500/30",
  violet: "peer-focus-visible:ring-violet-500/30",
  blue: "peer-focus-visible:ring-blue-500/30",
  cyan: "peer-focus-visible:ring-cyan-500/30",
  emerald: "peer-focus-visible:ring-emerald-500/30",
  teal: "peer-focus-visible:ring-teal-500/30",
  amber: "peer-focus-visible:ring-amber-500/30",
  orange: "peer-focus-visible:ring-orange-500/30",
  rose: "peer-focus-visible:ring-rose-500/30",
  pink: "peer-focus-visible:ring-pink-500/30",
};

export function Switch({ label, iconOn, iconOff, size = "md", color = "accent", transition, transitionDuration, transitionDelay, hoverEffect, className, classNames, ...rest }: SwitchProps) {
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
      <span className={cx("relative inline-flex shrink-0", TRACK_SIZE[size])}>
        {/* The track and thumb below are direct siblings of the input (not
            nested inside one another) so Tailwind's `peer-checked:` sibling
            selector — which only matches siblings sharing the input's own
            parent — reaches both of them. */}
        <input type="checkbox" role="switch" className="peer sr-only" {...rest} />
        <span
          className={cx(
            "absolute inset-0 rounded-full bg-border transition-colors peer-focus-visible:ring-2",
            ON_BG[color],
            RING[color],
            classNames?.track
          )}
        />
        <span
          className={cx(
            "absolute top-0.5 left-0.5 rounded-full bg-white shadow transition-transform peer-checked:translate-x-full",
            THUMB_SIZE[size],
            classNames?.thumb
          )}
        />
        {/* The icons are siblings of the input too (not children of the thumb), so the same `peer-checked:` that slides the thumb also
            swaps them (`shadow-none!` because the Clay design puts a shadow on every sibling span of a switch input) — each rides along with the thumb and cross-fades with a quarter turn. */}
        {iconOff && (
          <span
            aria-hidden
            className={cx(
              "pointer-events-none absolute top-0.5 left-0.5 flex items-center justify-center text-slate-600 shadow-none! transition-all duration-200 peer-checked:translate-x-full peer-checked:rotate-90 peer-checked:scale-50 peer-checked:opacity-0",
              THUMB_SIZE[size],
              classNames?.icon
            )}
          >
            <Icon name={iconOff} size={ICON_PX[size]} />
          </span>
        )}
        {iconOn && (
          <span
            aria-hidden
            className={cx(
              "pointer-events-none absolute top-0.5 left-0.5 flex shadow-none! -rotate-90 scale-50 items-center justify-center opacity-0 transition-all duration-200 peer-checked:translate-x-full peer-checked:rotate-0 peer-checked:scale-100 peer-checked:opacity-100",
              ON_ICON[color],
              THUMB_SIZE[size],
              classNames?.icon
            )}
          >
            <Icon name={iconOn} size={ICON_PX[size]} />
          </span>
        )}
      </span>
      {label && <span className={classNames?.label}>{label}</span>}
    </label>
  );
}
