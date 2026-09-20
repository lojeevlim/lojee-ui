import { useState } from "react";
import { createPortal } from "react-dom";
import type { CSSProperties } from "react";
import { Sidebar, SidebarHeader, SidebarFooter, type SidebarVariant } from "./Sidebar/Sidebar";
import { Icon } from "./Icons/Icon";
import { Avatar } from "./Avatar/Avatar";
import { OptionGroup, ColorSwatches, PlaygroundLayout, AppWindowFrame } from "./PlaygroundHelpers";
import { cx, isColorName, COLOR_HEX, type ColorName } from "../../core/tokens";
import { useTooltipPortal, tooltipPortalPositionStyle, TOOLTIP_PORTAL_Z_CLASS } from "../../core/tooltipPortal";
import type { CodeBlockVariants } from "./CodeBlock";

// A "#rrggbb" → "rgba(r, g, b, alpha)" conversion for a custom (non-ColorName)
// active-nav-item background on a dark-ish variant — mirrors DARK_ACTIVE_BG's
// translucent `bg-{color}-500/25` treatment, which only exists as fixed
// Tailwind classes for the built-in palette.
function hexToRgba(hex: string, alpha: number): string {
  const match = /^#?([0-9a-f]{6})$/i.exec(hex);
  if (!match) return hex;
  const value = parseInt(match[1], 16);
  return `rgba(${(value >> 16) & 255}, ${(value >> 8) & 255}, ${value & 255}, ${alpha})`;
}

// Slides+fades a nav/header label away instead of yanking it out on the
// spot — kept mounted the whole time (only its box shrinks to 0) so the
// collapse/expand animation reads as one continuous motion, not a mid-width pop.
function labelSlideStyle(hidden: boolean): CSSProperties {
  return {
    display: "inline-block",
    overflow: "hidden",
    opacity: hidden ? 0 : 1,
    maxWidth: hidden ? 0 : 160,
    transform: hidden ? "translateX(-6px)" : "translateX(0)",
    transition: "opacity .15s ease, transform .2s cubic-bezier(.4,0,.2,1), max-width .2s cubic-bezier(.4,0,.2,1)",
  };
}

const VARIANTS: SidebarVariant[] = ["light", "dark", "bordered", "elevated", "minimal", "gradient", "glass"];

const DETACHED_VARIANTS: ReadonlySet<SidebarVariant> = new Set(["bordered", "elevated", "minimal"]);

const DARK_VARIANTS: ReadonlySet<SidebarVariant> = new Set(["dark", "gradient", "glass"]);

// "light"/"dark"/"gradient"/"glass" dock flush against the window's left
// edge (their own `border-r` already reads as a dividing line there) —
// "bordered"/"elevated"/"minimal" are detached-panel looks instead, so they
// need a neutral page background behind them to actually read as floating.
const DOCK_CELL_CLASSES: Record<SidebarVariant, string> = {
  light: "",
  dark: "",
  gradient: "",
  glass: "",
  bordered: "flex bg-zinc-100 p-3",
  elevated: "flex bg-zinc-100 p-3",
  minimal: "flex bg-zinc-100 p-3",
};

const NAV_ITEMS = [
  { icon: "home", label: "Dashboard", active: true },
  { icon: "folder", label: "Projects", active: false },
  { icon: "users", label: "Team", active: false },
  { icon: "settings", label: "Settings", active: false },
];

const ACTIVE_BG: Record<ColorName, string> = {
  slate: "bg-slate-900",
  gray: "bg-gray-700",
  indigo: "bg-indigo-600",
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

// Translucent version for dark-ish variants ("dark"/"gradient"/"glass") — a solid ACTIVE_BG
// color would clash with an already-dark or already-colored surface.
const DARK_ACTIVE_BG: Record<ColorName, string> = {
  slate: "bg-white/10",
  gray: "bg-white/10",
  indigo: "bg-indigo-500/25",
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

// One nav row. Pulled out from the `.map()` below so each row gets its own
// `useTooltipPortal` instance (hooks can't be called a variable number of
// times inside a single component's render).
function NavRow({
  item,
  collapsed,
  dark,
  isGradient,
  color,
}: {
  item: (typeof NAV_ITEMS)[number];
  collapsed: boolean;
  dark: boolean;
  isGradient: boolean;
  color: string;
}) {
  const { ref: triggerRef, state: tooltipState, show, hide } = useTooltipPortal<HTMLAnchorElement>();
  const named = isColorName(color);

  return (
    <div className={collapsed ? "flex w-full justify-center" : undefined}>
      <a
        ref={triggerRef}
        href="#"
        onMouseEnter={collapsed ? show : undefined}
        onMouseLeave={collapsed ? hide : undefined}
        onFocus={collapsed ? show : undefined}
        onBlur={collapsed ? hide : undefined}
        // A custom (non-ColorName) color has no fixed Tailwind class to draw
        // from for the active pill's background — set it inline instead,
        // translucent on a dark-ish variant like DARK_ACTIVE_BG's `/25`
        // treatment, solid otherwise like ACTIVE_BG.
        style={item.active && !named ? { backgroundColor: dark ? hexToRgba(color, 0.25) : color } : undefined}
        className={`flex items-center rounded-lg py-2 text-sm transition-colors ${
          // Little horizontal padding and no gap while collapsed: the
          // row's only ~40px wide by then (Sidebar's own 72px rail,
          // minus its body padding minus this nav's own padding) —
          // `px-3 gap-2.5` on top of that pushes the link's min-content
          // past its container width, so the active pill visibly
          // overflows the rail's right edge instead of just showing the icon.
          collapsed ? "w-fit justify-center px-2" : "w-full gap-2.5 px-3"
        } ${
          item.active
            ? named
              ? dark
                ? `${DARK_ACTIVE_BG[color]} font-medium text-white`
                : `${ACTIVE_BG[color]} font-medium text-white shadow-sm`
              : dark
                ? "font-medium text-white"
                : "font-medium text-white shadow-sm"
            : // A gradient background is saturated/colorful, not neutral like
              // "dark"/"glass" — slate-based grey text reads as muddy against
              // it, so it gets a lighter, white-based translucent tone instead.
              isGradient
              ? "text-white/75 hover:bg-white/10 hover:text-white"
              : dark
                ? "text-slate-400 hover:bg-white/5 hover:text-slate-200"
                : "text-slate-600 hover:bg-slate-100"
        }`}
      >
        <Icon name={item.icon} size={18} className="shrink-0" />
        <span className="truncate" style={labelSlideStyle(collapsed)}>
          {item.label}
        </span>
      </a>
      {/* Portals out of the Sidebar's scrollable body instead of relying on
          CSS overflow to escape it — so scrolling never has to be traded off
          against an unclipped tooltip (see core/tooltipPortal.ts). */}
      {collapsed &&
        tooltipState &&
        createPortal(
          <span
            role="tooltip"
            style={{ position: "fixed", ...tooltipPortalPositionStyle(tooltipState.rect, "right") }}
            className={cx(
              "pointer-events-none whitespace-nowrap rounded-md bg-slate-900 px-2 py-1 text-xs font-medium text-white shadow-lg",
              TOOLTIP_PORTAL_Z_CLASS
            )}
          >
            {item.label}
          </span>,
          tooltipState.root
        )}
    </div>
  );
}

export default function SidebarPlayground() {
  const [header, setHeader] = useState("Lojee Inc");
  const [width, setWidth] = useState(256);
  const [collapsed, setCollapsed] = useState(false);
  const [variant, setVariant] = useState<SidebarVariant>("light");
  const [color, setColor] = useState<string>("slate");
  const [collapsible, setCollapsible] = useState(true);
  const dark = DARK_VARIANTS.has(variant);
  const isGradient = variant === "gradient";
  const detached = DETACHED_VARIANTS.has(variant);

  const footerContent = (
    <div className="flex items-center gap-2">
      <Avatar initials="JD" size="sm" />
      <span
        className={`truncate text-sm font-medium ${isGradient ? "text-white" : dark ? "text-slate-200" : "text-slate-700"}`}
        style={labelSlideStyle(collapsed)}
      >
        Jordan Diaz
      </span>
    </div>
  );

  const headerContent = (
    <div className="flex items-center gap-2.5">
      <span className={cx("flex h-7 w-7 shrink-0 items-center justify-center rounded-lg", dark ? "bg-white/15" : "bg-slate-900")}>
        <Icon name="zap" size={14} className="text-white" />
      </span>
      {header && (
        <span
          className={cx("truncate font-semibold", dark ? "text-white" : "text-slate-900")}
          style={labelSlideStyle(collapsed)}
        >
          {header}
        </span>
      )}
    </div>
  );

  const navRows = (
    <nav className="space-y-0.5 p-2">
      {NAV_ITEMS.map((item) => (
        <NavRow key={item.label} item={item} collapsed={collapsed} dark={dark} isGradient={isGradient} color={color} />
      ))}
    </nav>
  );

  const preview = (
    // No `overflow-visible` override needed anymore — the collapsed nav
    // items' tooltip portals itself out of this frame entirely (see
    // core/tooltipPortal.ts) instead of relying on CSS overflow to escape
    // it, so the frame can keep its rounded corners clipped unconditionally.
    <AppWindowFrame>
      <div className="flex" style={{ height: 425 }}>
        <div className={DOCK_CELL_CLASSES[variant]}>
          <Sidebar
            width={width}
            collapsed={collapsed}
            variant={variant}
            color={color}
            collapsible={collapsible}
            onCollapsedChange={setCollapsed}
            className={detached ? "h-full" : undefined}
          >
            <SidebarHeader>{headerContent}</SidebarHeader>
            {navRows}
            <SidebarFooter>{footerContent}</SidebarFooter>
          </Sidebar>
        </div>
        <div className="flex-1 overflow-y-auto bg-zinc-50" />
      </div>
    </AppWindowFrame>
  );

  const widthAttrJsx = !collapsed && width !== 256 ? ` width={${width}}` : "";
  const widthAttrHtml = !collapsed && width !== 256 ? ` width="${width}"` : "";
  const collapsedAttr = collapsed ? " collapsed" : "";
  const variantAttr = variant !== "light" ? ` variant="${variant}"` : "";
  const colorAttr = color !== "slate" ? ` color="${color}"` : "";
  const collapsibleAttr = collapsible ? " collapsible" : "";
  const headerText = header || "Lojee Inc";

  const code = `<Sidebar${widthAttrJsx}${collapsedAttr}${variantAttr}${colorAttr}${collapsibleAttr} onCollapsedChange={setCollapsed}>
  <SidebarHeader>
    {/* keep the logo mark always visible; only the text needs to react to
        \`collapsed\` (fade/slide it out) so the header doesn't just blink */}
    <div className="flex items-center gap-2.5">
      <span className="logo-box"><Icon name="zap" size={14} /></span>
      {!collapsed && <span>${headerText}</span>}
    </div>
  </SidebarHeader>
  <NavLinks />
  <SidebarFooter>
    <div className="flex items-center gap-2">
      <Avatar initials="JD" size="sm" />
      <span>Jordan Diaz</span>
    </div>
  </SidebarFooter>
</Sidebar>`;

  // <SidebarHeader>/<SidebarFooter> are projected as light-DOM content via
  // slot="header"/slot="footer" — same treatment NotificationShowcase.tsx
  // gives `actions`.
  const htmlMarkup = `<Sidebar${widthAttrHtml}${collapsedAttr}${variantAttr}${colorAttr}${collapsibleAttr}>
  <SidebarHeader slot="header" class="flex items-center gap-2.5">
    <span class="logo-box"><Icon name="zap" size={14}></Icon></span>
    <span>${headerText}</span>
  </SidebarHeader>
  <!-- nav links -->
  <SidebarFooter slot="footer" class="flex items-center gap-2">
    <Avatar initials="JD" size="sm" />
    <span>Jordan Diaz</span>
  </SidebarFooter>
</Sidebar>`;

  const codeVariants: CodeBlockVariants = {
    react: code,
    js: `${htmlMarkup}\n\n<script type="module">import "lojee-ui/elements";</script>`,
    vue: htmlMarkup,
    angular: htmlMarkup,
  };

  return (
    <PlaygroundLayout preview={preview} variants={codeVariants}>
      <div>
        <span className="mb-1.5 block text-xs font-medium text-slate-500">Header</span>
        <input
          value={header}
          onChange={(e) => setHeader(e.target.value)}
          className="w-full rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-900 outline-none transition-colors focus:border-slate-400"
          placeholder="Lojee Inc"
        />
      </div>
      <div>
        <span className="mb-1.5 block text-xs font-medium text-slate-500">Width (px)</span>
        <input
          type="number"
          value={width}
          disabled={collapsed}
          onChange={(e) => setWidth(Number(e.target.value) || 256)}
          className="w-full rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-900 outline-none transition-colors focus:border-slate-400 disabled:opacity-50"
          min={160}
          max={400}
        />
      </div>
      <OptionGroup label="Variant" options={VARIANTS} value={variant} onChange={setVariant} />
      <ColorSwatches
        // Only ever reflects a *named* selection back onto the fixed swatch
        // row — a custom color from the wheel below naturally shows none of
        // them as selected, which is the correct state (it isn't one of them).
        value={isColorName(color) ? color : "slate"}
        onChange={setColor}
        actions={
          <label
            className="flex cursor-pointer items-center gap-1.5 rounded-md px-1.5 py-0.5 text-xs font-medium text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
            title="Pick a custom color — not limited to the swatches above"
          >
            {/* A real color wheel: whatever hue the user picks is used
                exactly as-is (no snapping to the nearest built-in swatch),
                since `Sidebar`'s `color` prop now accepts any CSS color
                value, not just a ColorName. The input itself is invisible
                and overlaid on a swatch showing the current color, since
                native color inputs can't otherwise be restyled to match the
                swatches above it. */}
            <span
              className="relative flex h-4 w-4 shrink-0 items-center justify-center rounded-full ring-1 ring-inset ring-black/10"
              style={{ backgroundColor: isColorName(color) ? COLOR_HEX[color] : color }}
            >
              <input
                type="color"
                value={isColorName(color) ? COLOR_HEX[color] : color}
                onChange={(e) => setColor(e.target.value)}
                aria-label="Pick a custom color"
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              />
            </span>
            Custom
          </label>
        }
      />
      <div className="flex items-center gap-4 sm:col-span-2">
        <label className="flex items-center gap-2 text-xs font-medium text-slate-500">
          <input type="checkbox" checked={collapsible} onChange={(e) => setCollapsible(e.target.checked)} />
          Collapsible
        </label>
        <label className="flex items-center gap-2 text-xs font-medium text-slate-500">
          <input type="checkbox" checked={collapsed} onChange={(e) => setCollapsed(e.target.checked)} />
          Collapsed
        </label>
      </div>
    </PlaygroundLayout>
  );
}
