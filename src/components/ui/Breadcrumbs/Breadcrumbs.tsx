import type { CSSProperties, ReactNode } from "react";
import { cx, isColorName, type ColorName } from "../../../core/tokens";
import { activeAccent, type ActiveVariant } from "../../../core/activeVariant";

export type BreadcrumbsVariant = ActiveVariant | "text";

export interface BreadcrumbsProps {
  /** The `BreadcrumbItem` elements, in order; the last one without an `href` is the current page. */
  children?: ReactNode;
  /** Color of the current (last) item and of link hovers (default: "accent", which follows the theme's accent
   * color) — one of the built-in ColorNames, or any other CSS color value. Same as Navbar / Sidebar. */
  color?: ColorName | (string & {});
  /** How the current item is drawn (default: "text"): "text" highlights only its text, "solid" / "outline" /
   * "soft" put it in a filled, outlined or tinted pill — the same looks as active items elsewhere. */
  variant?: BreadcrumbsVariant;
  /** Extra class names applied to the list element. */
  className?: string;
  /** Per-part class overrides (`root`) — merged after the built-in styling. */
  classNames?: {
    root?: string;
  };
}

// Items are separate components (light-DOM children in the Web Component build, so React context can't reach
// them), so `color` and `variant` travel as CSS custom properties set on the list — they inherit through the DOM
// and through slots. `BreadcrumbItem` reads them (with neutral fallbacks for standalone use).
function crumbVars(color: string, variant: BreadcrumbsVariant): CSSProperties {
  const ac = activeAccent(color, isColorName(color));
  const text = `color-mix(in srgb, ${ac} 82%, var(--lojee-fg))`;
  const vars: Record<string, string> = { "--ac": ac };
  switch (variant) {
    case "solid":
      Object.assign(vars, { "--bc-color": "#fff", "--bc-bg": ac, "--bc-shadow": "none", "--bc-px": "0.5rem" });
      break;
    case "outline":
      Object.assign(vars, { "--bc-color": text, "--bc-bg": "transparent", "--bc-shadow": `inset 0 0 0 1.5px ${ac}`, "--bc-px": "0.5rem" });
      break;
    case "soft":
      Object.assign(vars, {
        "--bc-color": text,
        "--bc-bg": `color-mix(in srgb, ${ac} 16%, transparent)`,
        "--bc-shadow": "none",
        "--bc-px": "0.5rem",
      });
      break;
    default:
      Object.assign(vars, { "--bc-color": text, "--bc-bg": "transparent", "--bc-shadow": "none", "--bc-px": "0" });
  }
  return vars as CSSProperties;
}

export function Breadcrumbs({ children, color = "accent", variant = "text", className, classNames }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb">
      <ol style={crumbVars(color, variant)} className={cx("flex flex-wrap items-center gap-1.5", className, classNames?.root)}>
        <slot>{children}</slot>
      </ol>
    </nav>
  );
}
