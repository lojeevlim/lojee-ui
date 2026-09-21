import { useState } from "react";
import type { CSSProperties } from "react";
import { Sidebar, SidebarHeader, SidebarFooter, type SidebarVariant } from "./Sidebar/Sidebar";
import { SidebarMenuItem } from "./Sidebar/SidebarMenuItem";
import { Icon } from "./Icons/Icon";
import { Avatar } from "./Avatar/Avatar";
import { OptionGroup, ColorSwatches, PlaygroundLayout, AppWindowFrame } from "./PlaygroundHelpers";
import { cx, isColorName, COLOR_HEX } from "../../core/tokens";
import type { CodeBlockVariants } from "./CodeBlock";

// Slides+fades the header/footer label away instead of yanking it out on the
// spot — kept mounted the whole time (only its box shrinks to 0) so the
// collapse/expand animation reads as one continuous motion, not a mid-width pop.
// (SidebarMenuItem does the equivalent for its own label internally.)
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
        <SidebarMenuItem key={item.label} icon={item.icon} active={item.active} collapsed={collapsed} dark={dark} color={color}>
          {item.label}
        </SidebarMenuItem>
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

  // `dark`/`color` have no attribute equivalent on Sidebar to detect
  // automatically, so those still need passing to each SidebarMenuItem
  // directly, mirroring whatever's given to Sidebar itself. `collapsed` is
  // the exception — in real Web Component usage (js/vue/angular below),
  // SidebarMenuItem finds its ancestor <l-sidebar> itself and mirrors its
  // "collapsed" attribute automatically; only the React example still needs
  // it passed explicitly, since there's no such DOM tag for it to find there.
  const navDarkAttr = dark ? " dark" : "";
  const navColorAttr = color !== "slate" ? ` color="${color}"` : "";
  const navCollapsedAttrJsx = collapsed ? " collapsed" : "";
  const navItemsJsx = NAV_ITEMS.map((item) => {
    const activeAttr = item.active ? " active" : "";
    return `  <SidebarMenuItem icon="${item.icon}"${activeAttr}${navCollapsedAttrJsx}${navDarkAttr}${navColorAttr}>${item.label}</SidebarMenuItem>`;
  }).join("\n");
  const navItemsMarkup = NAV_ITEMS.map((item) => {
    const activeAttr = item.active ? " active" : "";
    return `  <l-SidebarMenuItem icon="${item.icon}"${activeAttr}${navDarkAttr}${navColorAttr}>${item.label}</l-SidebarMenuItem>`;
  }).join("\n");

  const code = `<Sidebar${widthAttrJsx}${collapsedAttr}${variantAttr}${colorAttr}${collapsibleAttr} onCollapsedChange={setCollapsed}>
  <SidebarHeader>
    {/* keep the logo mark always visible; only the text needs to react to
        \`collapsed\` (fade/slide it out) so the header doesn't just blink */}
    <div className="flex items-center gap-2.5">
      <span className="logo-box"><Icon name="zap" size={14} /></span>
      {!collapsed && <span>${headerText}</span>}
    </div>
  </SidebarHeader>
${navItemsJsx}
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
  const htmlMarkup = `<l-Sidebar${widthAttrHtml}${collapsedAttr}${variantAttr}${colorAttr}${collapsibleAttr}>
  <div slot="header" class="flex items-center gap-2.5">
    <span class="logo-box"><l-Icon name="zap" size={14}></l-Icon></span>
    <span>${headerText}</span>
  </div>
${navItemsMarkup}
  <div slot="footer" class="flex items-center gap-2">
    <l-Avatar initials="JD" size="sm" />
    <span>Jordan Diaz</span>
  </div>
</l-Sidebar>`;

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
