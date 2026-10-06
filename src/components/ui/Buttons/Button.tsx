import { Loader2 } from "lucide-react";
import type { AriaAttributes, ReactNode, MouseEventHandler, CSSProperties } from "react";
import {
  colorClasses,
  destructiveClasses,
  defaultGradientPartner,
  GRADIENT_CLASSES,
  sizeClasses,
  iconOnlySizeClasses,
  iconSize,
  cx,
  isColorName,
  customButtonStyle,
  shapeClasses,
  BASE_BUTTON_CLASSES,
  type ColorName,
  type ButtonVariant,
  type Size,
  type Shape,
} from "../../../core/tokens";
import { getIcon } from "../../../core/icons";
import { animatedClass, animatedStyle, type AnimatedProp } from "../../../core/animated";
import { AnimatedOverlay } from "../../../core/AnimatedOverlay";
import { useGlassLighting, type GlassLighting } from "../../../core/glassLighting";
import { motionClass, motionStyle, type TransitionVariant, type HoverEffect } from "../../../core/motion";
import { linearGradient, type GradientDirection } from "../../../core/gradient";

export type { GradientDirection };

export interface ButtonProps {
  /** Attention animation: "glow" | "pulse" | "sweep" | "bounce" | "float" | "wiggle" | "border-spin" | "particles" | "tail" — one, or a list to combine, e.g. ["particles", "tail"] (default: none). Respects `prefers-reduced-motion`. */
  animation?: AnimatedProp;
  /** Color of the animation (pulse ring, glow, spinning border): a `ColorName` or any CSS color (default: the component's own color). */
  pulseColor?: ColorName | (string & {});
  /** Second color — turns the pulse ring and spinning border into a gradient from `pulseColor` to this (default: solid `pulseColor`). */
  pulseGradientTo?: ColorName | (string & {});
  /** Visual style: "solid", "outline", "ghost", "soft", "link", "dashed", "destructive", "destructive-soft", "destructive-outline", "gradient" or "glass" (default: "solid"). */
  variant?: ButtonVariant;
  /** Lights the glass variant's frame like a backlight, in the button's colour — dark mode only: "hover" (while hovered), "press" (while pressed, fading out after) or "scroll" (while it is at the vertical centre of the viewport). Ignored by the other variants (default: none). */
  lighting?: GlassLighting;
  /** Button color: a built-in `ColorName` (default: "accent", which follows the theme accent) or any CSS color such as "#8b5cf6"; ignored by the destructive variants. */
  color?: ColorName | (string & {});
  /** Second color for the gradient variant: a `ColorName` or any CSS color such as "#ec4899" (defaults to a matching preset partner). */
  gradientTo?: ColorName | (string & {});
  /** Direction of the gradient variant: "to-right" | "to-left" | "to-bottom" | "to-top" | "to-br" | "to-bl" | "to-tr" | "to-tl" (default: "to-right"). */
  gradientDirection?: GradientDirection;
  /** "xs" | "sm" | "md" | "lg" | "xl" | "full" (full width) (default: "md"). */
  size?: Size;
  /** "default" (size-based rounding), "pill" or "square" (default: "default"). */
  shape?: Shape;
  /** Disables the button and dims it (default: false). */
  disabled?: boolean;
  /** Shows a spinner in place of the icon and disables the button while true (default: false). */
  loading?: boolean;
  /** Icon name, e.g. "settings" — see src/core/icons.ts for the available set. */
  icon?: string;
  /** Render as an icon-only button (no visible text) — label becomes the accessible name. */
  iconOnly?: boolean;
  /** Which side of the text the icon appears on: "left" or "right" (default: "left"); ignored when `iconOnly`. */
  iconPosition?: "left" | "right";
  /** Visible text (simple alternative to children) and the accessible name when iconOnly. */
  label?: string;
  /** Small overlay badge, e.g. a notification count. */
  badge?: ReactNode;
  /** Button content; takes precedence over `label` when both are given. */
  children?: ReactNode;
  /** Called with the click event when the button is clicked (not fired while disabled or loading). */
  onClick?: MouseEventHandler<HTMLButtonElement>;
  /** Native button type: "button", "submit" or "reset" (default: "button"). */
  type?: "button" | "submit" | "reset";
  /** For a button that toggles a disclosure (menu, listbox, etc.) it doesn't own itself. */
  "aria-haspopup"?: AriaAttributes["aria-haspopup"];
  /** Whether the disclosure this button controls is currently open (controlled by the parent). */
  "aria-expanded"?: boolean;
  /** Enter transition: "fade" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "zoom" | "zoom-out" | "flip" | "blur" | "bounce" | "rotate" | "drop" | "skew" (default: none). Respects `prefers-reduced-motion`. */
  transition?: TransitionVariant;
  /** Enter transition duration in ms (default: 450). */
  transitionDuration?: number;
  /** Delay before the enter transition starts, in ms (default: 0) — handy for staggering. */
  transitionDelay?: number;
  /** Effect while hovering: "lift" | "scale" | "press" | "tilt" | "ring" | "glow" | "shine" (default: none). */
  hoverEffect?: HoverEffect;
  /** Extra class names applied to the button element. */
  className?: string;
  /** Per-part class overrides — merged after (and win over) the built-in styling. */
  classNames?: {
    root?: string;
    icon?: string;
    badge?: string;
  };
}

const GLASS_CLASSES = [
  "lojee-glass-btn relative isolate",
  "before:pointer-events-none before:absolute before:-inset-1.5 before:-z-20 before:rounded-[var(--btn-frame-r)] before:border before:border-[color:color-mix(in_srgb,var(--btn-glass)_22%,transparent)] before:bg-[color-mix(in_srgb,var(--btn-glass)_8%,transparent)] before:backdrop-blur-[3px] before:content-['']",
  "after:pointer-events-none after:absolute after:inset-0 after:-z-10 after:rounded-[inherit] after:bg-[inherit] after:content-['']",
].join(" ");

export function Button({
  variant = "solid",
  lighting,
  color = "accent",
  gradientTo,
  gradientDirection = "to-right",
  size = "md",
  shape = "default",
  disabled = false,
  loading = false,
  icon,
  iconOnly = false,
  iconPosition = "left",
  label,
  badge,
  children,
  onClick,
  type = "button",
  "aria-haspopup": ariaHaspopup,
  "aria-expanded": ariaExpanded,
  className,
  classNames,
  animation,
  pulseColor,
  pulseGradientTo,
  transition,
  transitionDuration,
  transitionDelay,
  hoverEffect,
}: ButtonProps) {
  // getIcon() always returns the same stable, module-level-imported
  // component reference for a given name, so this never actually causes a
  // remount — the lint rule can't verify that statically, hence the disable.
  const [lightRef, lightAttrs] = useGlassLighting<HTMLButtonElement>(lighting, variant === "glass");
  const Icon = getIcon(icon);
  const base = BASE_BUTTON_CLASSES;

  let variantClass;
  let gradientStyle: CSSProperties | undefined;
  const custom = !isColorName(color) && !variant.startsWith("destructive");
  // "glass": a solid button inside Card's glass-style frame: a frosted, colour-tinted band just outside it (::before) and, in dark mode, a backlight in the colour.
  let glassStyle: CSSProperties | undefined;
  if (variant === "glass") {
    const solid = custom ? customButtonStyle("solid", color) : undefined;
    const colorSet = colorClasses[color as ColorName] || colorClasses.accent;
    variantClass = cx(solid ? solid.className : colorSet.solid, GLASS_CLASSES);
    // The frame's corners are concentric with the button's: its radius plus the 6px gap (Card does the same with +10px).
    const token = size === "xs" || size === "sm" ? "--radius-md" : size === "xl" ? "--radius-xl" : "--radius-lg";
    const frameRadius = shape === "pill" ? "9999px" : shape === "square" ? "6px" : `calc(var(${token}) + 6px)`;
    glassStyle = { ...solid?.style, ["--btn-glass" as string]: isColorName(color) ? `var(--color-${color}-500)` : color, ["--btn-frame-r" as string]: frameRadius };
  } else if (custom) {
    // Any CSS color: a few inline variables plus literal classes (see customButtonStyle).
    const c = customButtonStyle(variant, color);
    variantClass = variant === "gradient" ? cx(GRADIENT_CLASSES, c.className) : c.className;
    gradientStyle = c.style;
  } else if (variant === "destructive") {
    variantClass = destructiveClasses.solid;
  } else if (variant === "destructive-soft") {
    variantClass = destructiveClasses.soft;
  } else if (variant === "destructive-outline") {
    variantClass = destructiveClasses.outline;
  } else if (variant === "gradient") {
    variantClass = GRADIENT_CLASSES;
  } else {
    const colorSet = colorClasses[color as ColorName] || colorClasses.slate;
    variantClass = colorSet[variant] || colorSet.solid;
  }

  if (variant === "gradient") {
    const to = gradientTo ?? (isColorName(color) ? defaultGradientPartner[color] ?? "violet" : `color-mix(in srgb, ${color} 60%, black)`);
    gradientStyle = { ...gradientStyle, backgroundImage: linearGradient(color, to, gradientDirection) };
  }

  const sizeClass = iconOnly ? iconOnlySizeClasses[size] : sizeClasses[size] || sizeClasses.md;
  const shapeClass = shapeClasses[shape] || "";
  const content = children ?? label;

  return (
    <button
      ref={lightRef}
      {...lightAttrs}
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      style={{ ...gradientStyle, ...glassStyle, ...animatedStyle(animation, color, pulseColor, pulseGradientTo), ...motionStyle(transitionDuration, transitionDelay) }}
      aria-label={iconOnly ? label : undefined}
      aria-haspopup={ariaHaspopup}
      aria-expanded={ariaExpanded}
      className={cx(base, variantClass, sizeClass, shapeClass, badge != null && "relative", animatedClass(animation), motionClass(transition, hoverEffect), className, classNames?.root)}
    >
      {loading && <Loader2 size={iconSize[size]} className="animate-spin" />}
      {/* eslint-disable-next-line react-hooks/static-components -- see comment above `const Icon` */}
      {!loading && Icon && (iconOnly || iconPosition === "left") && <Icon size={iconSize[size]} className={classNames?.icon} />}
      {!iconOnly && <slot>{content}</slot>}
      {/* eslint-disable-next-line react-hooks/static-components -- see comment above `const Icon` */}
      {!loading && Icon && !iconOnly && iconPosition === "right" && <Icon size={iconSize[size]} className={classNames?.icon} />}
      {badge && (
        <span
          className={cx(
            "absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-semibold text-white",
            classNames?.badge
          )}
        >
          {badge}
        </span>
      )}
      <AnimatedOverlay variant={animation} />
    </button>
  );
}
