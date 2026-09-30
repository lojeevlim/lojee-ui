import { cx, isColorName, type ColorName } from "../../../core/tokens";

// Same three-tier active-fill system as Navbar's own (see navbarActiveStyles.ts for the identical
// reasoning) — kept as its own copy rather than a shared import, matching how this component's other
// color maps are also kept local instead of centralized. Split into its own module (rather than living
// directly in SidebarMenuItem.tsx) purely so Sidebar.tsx can import `sidebarActiveFillClasses` too, to
// color its sliding pill (see Sidebar.tsx's `renderItemRow`) identically without duplicating this
// lookup — a plain component file can't export a non-component value like this without breaking Fast
// Refresh.
const ACTIVE_BG: Record<ColorName, string> = {
  slate: "bg-slate-900 dark:bg-white/15",
  gray: "bg-gray-700 dark:bg-white/15",
  indigo: "bg-indigo-600",
  accent: "bg-accent-600",
  violet: "bg-violet-600",
  blue: "bg-blue-600",
  cyan: "bg-cyan-600",
  emerald: "bg-emerald-600",
  teal: "bg-teal-600",
  amber: "bg-amber-500",
  orange: "bg-orange-600",
  rose: "bg-rose-600",
  pink: "bg-pink-600",
};

const DARK_ACTIVE_BG: Record<ColorName, string> = {
  slate: "bg-white/10",
  gray: "bg-white/10",
  indigo: "bg-indigo-500/25",
  accent: "bg-accent-500/25",
  violet: "bg-violet-500/25",
  blue: "bg-blue-500/25",
  cyan: "bg-cyan-500/25",
  emerald: "bg-emerald-500/25",
  teal: "bg-teal-500/25",
  amber: "bg-amber-500/25",
  orange: "bg-orange-500/25",
  rose: "bg-rose-500/25",
  pink: "bg-pink-500/25",
};

const VIVID_ACTIVE_BG: Record<ColorName, string> = {
  slate: "bg-white/35",
  gray: "bg-white/35",
  indigo: "bg-indigo-500/65",
  accent: "bg-accent-500/65",
  violet: "bg-violet-500/65",
  blue: "bg-blue-500/65",
  cyan: "bg-cyan-500/65",
  emerald: "bg-emerald-500/65",
  teal: "bg-teal-500/65",
  amber: "bg-amber-500/65",
  orange: "bg-orange-500/65",
  rose: "bg-rose-500/65",
  pink: "bg-pink-500/65",
};

/** The fill/ring classes for the active state — shared by SidebarMenuItem's own `activeStyle="fill"`
 * and Sidebar's sliding pill (`activeStyle="text"` rows just switch text color/weight, no fill of
 * their own — see SidebarMenuItem's own `activeStyle` doc). */
export function sidebarActiveFillClasses(color: ColorName | (string & {}), dark: boolean, vividActive: boolean): string {
  const colorIsNamed = isColorName(color);
  return dark
    ? cx(
        colorIsNamed ? (vividActive ? VIVID_ACTIVE_BG[color] : DARK_ACTIVE_BG[color]) : vividActive ? "bg-white/35" : "bg-white/10",
        // Extra edge definition on top of the stronger fill — a translucent/gradient surface doesn't
        // give the active row a contrasting opaque background to read against the way "dark"'s plain
        // fill does, so the ring/shadow does some of that job instead.
        vividActive && "shadow-md ring-1 ring-inset ring-white/40"
      )
    : colorIsNamed
      ? `${ACTIVE_BG[color]} shadow-sm`
      : "shadow-sm";
}
