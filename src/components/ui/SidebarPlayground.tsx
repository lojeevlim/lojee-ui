import { useState } from "react";
import { Sidebar, type SidebarVariant } from "./Sidebar/Sidebar";
import { OptionGroup, ColorSwatches, PlaygroundLayout, AppWindowFrame } from "./PlaygroundHelpers";
import { isColorName, COLOR_HEX } from "../../core/tokens";
import type { CodeBlockVariants } from "./CodeBlock";

const VARIANTS: SidebarVariant[] = ["light", "dark", "bordered", "elevated", "minimal", "gradient", "glass"];

// "bordered"/"elevated" build their own backdrop in now (see Sidebar.tsx's `isDetachedPanel`), so
// they dock flush here just like every other variant. "minimal" has no chrome of its own by design
// (it's meant to blend into the page) — this wrapper is purely so its boundary is visible in the
// playground UI, not something a real usage needs to replicate.
const DOCK_CELL_CLASSES: Record<SidebarVariant, string> = {
  light: "",
  dark: "",
  bordered: "",
  elevated: "",
  gradient: "",
  glass: "",
  minimal: "flex bg-zinc-100 p-3",
};

// `items` instead of composed SidebarMenuItems — dark/color/collapsed theming and the
// collapse/expand animation all come from Sidebar itself automatically once items are generated
// from it, no manual wiring needed the way composing SidebarMenuItem directly requires. None of
// these set `active` themselves, so Sidebar's own self-managed selection kicks in — click a row
// below to see it (tracked here only to show the "Active" readout, not required for it to work).
const NAV_ITEMS = [
  { icon: "home", label: "Dashboard" },
  { icon: "folder", label: "Projects" },
  { icon: "users", label: "Team" },
  { icon: "settings", label: "Settings" },
];

const DEFAULT_ACTIVE_OPTIONS = ["none", ...NAV_ITEMS.map((item) => item.label)];

export default function SidebarPlayground() {
  const [header, setHeader] = useState("Lojee Inc");
  const [width, setWidth] = useState(256);
  const [collapsed, setCollapsed] = useState(false);
  const [variant, setVariant] = useState<SidebarVariant>("light");
  const [color, setColor] = useState<string>("slate");
  const [collapsible, setCollapsible] = useState(true);
  const [defaultActiveItem, setDefaultActiveItem] = useState("none");
  const [borderWidth, setBorderWidth] = useState(2);
  const [activeLabel, setActiveLabel] = useState<string | undefined>(undefined);
  const headerText = header || "Lojee Inc";
  const defaultActiveItemValue = defaultActiveItem === "none" ? undefined : defaultActiveItem;
  // Only "bordered" has an adjustable border — "elevated" is shadow-only (see Sidebar.tsx's
  // `hasAccentBorder`), so the border-thickness control has nothing to affect there.
  const showBorderWidthControl = variant === "bordered";

  const preview = (
    // No `overflow-visible` override needed anymore — the collapsed nav
    // items' tooltip portals itself out of this frame entirely (see
    // core/tooltipPortal.ts) instead of relying on CSS overflow to escape
    // it, so the frame can keep its rounded corners clipped unconditionally.
    <AppWindowFrame>
      <div className="flex" style={{ height: 425 }}>
        <div className={DOCK_CELL_CLASSES[variant]}>
          <Sidebar
            key={defaultActiveItemValue}
            width={width}
            // Without this, every variant defaults to height="100vh" and just gets clipped by
            // AppWindowFrame's overflow-hidden down to this frame's 425px — invisible for the
            // edge-docking variants (nothing structural near their bottom edge to cut off), but
            // "bordered"/"elevated"/"minimal" have a bottom edge (rounded corners, in-box padding)
            // that needs to actually fit within 425px, not just be sliced off mid-shape.
            height="100%"
            collapsed={collapsed}
            variant={variant}
            color={color}
            collapsible={collapsible}
            onCollapsedChange={setCollapsed}
            onActiveItemChange={(item) => setActiveLabel(item.label)}
            header={headerText}
            headerIcon="zap"
            footer="Jordan Diaz"
            defaultActiveItem={defaultActiveItemValue}
            borderWidth={borderWidth}
            items={NAV_ITEMS}
          />
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
  // `collapsed`/`collapsible` are boolean props — a bare attribute (no `="..."`) parses as an empty
  // string, which r2wc's boolean coercion reads as false, so every non-JSX target needs an explicit
  // truthy value instead. Vue/Angular already bind `items` via `:items`/`[items]`, so the same
  // binding syntax (not a plain string attribute) is used here too, for consistency within each
  // sample and because it sets the real boolean prop directly rather than relying on string parsing.
  const collapsedAttrHtml = collapsed ? ' collapsed="true"' : "";
  const collapsibleAttrHtml = collapsible ? ' collapsible="true"' : "";
  const collapsedAttrVue = collapsed ? ' :collapsed="true"' : "";
  const collapsibleAttrVue = collapsible ? ' :collapsible="true"' : "";
  const collapsedAttrAngular = collapsed ? ' [collapsed]="true"' : "";
  const collapsibleAttrAngular = collapsible ? ' [collapsible]="true"' : "";
  const itemsLiteral = `[\n${NAV_ITEMS.map((item) => `    { label: "${item.label}", icon: "${item.icon}" },`).join("\n")}\n  ]`;
  const defaultActiveItemAttrJsx = defaultActiveItemValue ? ` defaultActiveItem="${defaultActiveItemValue}"` : "";
  const defaultActiveItemAttrHtml = defaultActiveItemValue ? ` default-active-item="${defaultActiveItemValue}"` : "";
  // Only meaningful for "bordered" — no point showing it in the sample for any other variant.
  const borderWidthAttrJsx = showBorderWidthControl && borderWidth !== 2 ? ` borderWidth={${borderWidth}}` : "";
  const borderWidthAttrHtml = showBorderWidthControl && borderWidth !== 2 ? ` border-width="${borderWidth}"` : "";

  const code = `<Sidebar${widthAttrJsx}${collapsedAttr}${variantAttr}${colorAttr}${collapsibleAttr}${defaultActiveItemAttrJsx}${borderWidthAttrJsx}
  onCollapsedChange={setCollapsed}
  onActiveItemChange={(item) => console.log(item)}
  header="${headerText}"
  headerIcon="zap"
  footer="Jordan Diaz"
  items={${itemsLiteral}}
/>`;

  const codeVariants: CodeBlockVariants = {
    react: code,
    js: `<l-Sidebar id="app-sidebar"${widthAttrHtml}${collapsedAttrHtml}${variantAttr}${colorAttr}${collapsibleAttrHtml}${defaultActiveItemAttrHtml}${borderWidthAttrHtml} header="${headerText}" header-icon="zap" footer="Jordan Diaz"></l-Sidebar>

<script type="module">
  import "lojee-ui/elements";

  const sidebar = document.getElementById("app-sidebar");
  sidebar.items = ${itemsLiteral};
  sidebar.addEventListener("activeitemchange", (e) => console.log(e.detail));
</script>`,
    vue: `<template>
  <l-Sidebar${widthAttrHtml}${collapsedAttrVue}${variantAttr}${colorAttr}${collapsibleAttrVue}${defaultActiveItemAttrHtml}${borderWidthAttrHtml} header="${headerText}" header-icon="zap" footer="Jordan Diaz" :items="items" @activeitemchange="(e) => console.log(e.detail)" />
</template>

<script setup>
import "lojee-ui/elements";

const items = ${itemsLiteral};
</script>`,
    angular: `// app.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "lojee-ui/elements";

@Component({
  selector: "app-root",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`<l-Sidebar${widthAttrHtml}${collapsedAttrAngular}${variantAttr}${colorAttr}${collapsibleAttrAngular}${defaultActiveItemAttrHtml}${borderWidthAttrHtml} header="${headerText}" header-icon="zap" footer="Jordan Diaz" [items]="items" (activeitemchange)="onActiveItemChange($event.detail)" />\`,
})
export class AppComponent {
  items = ${itemsLiteral};
  onActiveItemChange(item: unknown) {
    console.log(item);
  }
}`,
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
      {showBorderWidthControl && (
        <div>
          <span className="mb-1.5 flex items-center justify-between text-xs font-medium text-slate-500">
            Border thickness (px)
            <span className="text-slate-700">{borderWidth}</span>
          </span>
          <input
            type="range"
            value={borderWidth}
            onChange={(e) => setBorderWidth(Number(e.target.value))}
            className="w-full accent-slate-900"
            min={1}
            max={12}
          />
        </div>
      )}
      {/* Only an initial default (see Sidebar.tsx's `defaultActiveItem` doc) — the preview remounts
          on change (via `key`) so picking a different one is actually visible here, same as a fresh
          page load would show; it wouldn't otherwise re-apply on top of whatever's already selected. */}
      <OptionGroup
        label="Default active item"
        options={DEFAULT_ACTIVE_OPTIONS}
        value={defaultActiveItem}
        onChange={setDefaultActiveItem}
      />
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
        {/* Click a row in the preview — no state wiring above drives this beyond onActiveItemChange
            itself, demonstrating the built-in self-managed selection live. */}
        <span className="text-xs font-medium text-slate-400">
          Active: <span className="text-slate-700">{activeLabel ?? "none yet — click a row"}</span>
        </span>
      </div>
    </PlaygroundLayout>
  );
}
