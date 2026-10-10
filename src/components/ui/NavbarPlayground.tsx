import { useState } from "react";
import { PREVIEW_PAGE_BG } from "./playgroundUtils";
import { Navbar, type NavbarVariant } from "./Navbar/Navbar";
import { Avatar } from "./Avatar/Avatar";
import { OptionGroup, GradientColorSwatches, PlaygroundLayout, AppWindowFrame } from "./PlaygroundHelpers";
import { cx } from "../../core/tokens";
import type { CodeBlockVariants } from "./CodeBlock";
import { useMotion } from "./playgroundMotion";
import type { GradientDirection } from "../../core/gradient";

const VARIANTS: NavbarVariant[] = ["light", "dark", "bordered", "elevated", "minimal", "gradient"];

// `items` instead of composed NavbarItems — dark/color theming all come from Navbar itself
// automatically once items are generated from it, no manual wiring needed the way composing
// NavbarItem directly requires (same split as Sidebar's own `items`/`SidebarMenuItem`). None of these
// set `active` themselves, so Navbar's own self-managed selection kicks in — click a link below to
// see it (tracked here only to show the "Active" readout, not required for it to work).
const NAV_ITEMS = [{ label: "Home" }, { label: "Products" }];
const DEFAULT_ACTIVE_OPTIONS = ["none", ...NAV_ITEMS.map((item) => item.label)];

export default function NavbarPlayground() {
  const motion = useMotion();
  const [brand, setBrand] = useState("App");
  const [sticky, setSticky] = useState(false);
  const [bordered, setBordered] = useState(true);
  const [variant, setVariant] = useState<NavbarVariant>("light");
  const [color, setColor] = useState<string>("accent");
  const [gradientTo, setGradientTo] = useState<string>("violet");
  const [gradientDirection, setGradientDirection] = useState<GradientDirection>("to-right");
  const [borderWidth, setBorderWidth] = useState(2);
  const [defaultActiveItem, setDefaultActiveItem] = useState("Home");
  const [activeLabel, setActiveLabel] = useState<string | undefined>(undefined);
  const defaultActiveItemValue = defaultActiveItem === "none" ? undefined : defaultActiveItem;
  const onDark = variant === "dark" || variant === "gradient";
  // Only "bordered" has an adjustable border — "elevated" is shadow-only (see Navbar.tsx's
  // `hasAccentBorder`), so the border-thickness control has nothing to affect there.
  const showBorderWidthControl = variant === "bordered";
  // "minimal" has no chrome of its own by design (it's meant to blend into the page) — this tint is
  // purely so its boundary is visible in the playground UI, not something a real usage needs to
  // replicate (same purpose as SidebarPlayground's own `DOCK_CELL_CLASSES`). Applied to the scroll
  // container itself (below), not a div wrapping just the navbar — see that div's own comment for why.
  const isMinimal = variant === "minimal";

  const navbar = (
    // Only an initial default (see Navbar.tsx's `defaultActiveItem` doc) — the preview remounts on
    // change (via `key`) so picking a different one is actually visible here, same as a fresh page
    // load would show; it wouldn't otherwise re-apply on top of whatever's already selected.
    <Navbar
      key={`${defaultActiveItemValue}-${motion.replayKey}`}
      {...motion.props}
      brand={brand ? <span className={onDark ? "text-white" : undefined}>{brand}</span> : undefined}
      sticky={sticky}
      bordered={bordered}
      variant={variant}
      color={color}
      gradientTo={variant === "gradient" ? gradientTo : undefined}
      gradientDirection={variant === "gradient" ? gradientDirection : undefined}
      borderWidth={borderWidth}
      defaultActiveItem={defaultActiveItemValue}
      onActiveItemChange={(item) => setActiveLabel(item.label)}
      items={NAV_ITEMS}
      actions={<Avatar initials="JD" size="sm" />}
    />
  );

  // Navbar docks to the top of a page — shown with scrollable content below
  // it so toggling `sticky` demonstrates something real: pinned in place vs.
  // scrolling away with the rest of the page.
  const preview = (
    <AppWindowFrame>
      {/* A `position: sticky` element can only stay stuck within the bounds of its own immediate
          parent's box — once you scroll past that parent's bottom edge, it scrolls away with it, since
          there's nowhere left to stick to. A div wrapping just the navbar (even an unstyled one) gives
          it a parent whose height exactly equals the navbar's own height, with zero room below it — so
          `sticky` broke immediately on any scroll at all, no matter how small. The navbar is a direct
          child of this scroll container instead, sharing its full height (it fills the window, at least `min-h-56`) as its containing block
          so sticky has real room to work — "minimal"'s own visibility tint (see `isMinimal` above)
          lives on this same container rather than a separate wrapper div, for the same reason. */}
      <div className={cx("min-h-56 flex-1 overflow-y-auto", isMinimal ? `${PREVIEW_PAGE_BG} p-3` : PREVIEW_PAGE_BG)}>
        {navbar}
        <div className={cx("space-y-3", !isMinimal && "p-4")}>
          {Array.from({ length: 8 }).map((_, i) => (
            <p key={i} className="text-sm text-fg-subtle">
              Scroll row {i + 1}
            </p>
          ))}
        </div>
      </div>
    </AppWindowFrame>
  );

  const brandAttr = brand ? ` brand="${brand}"` : "";
  const stickyAttr = sticky ? " sticky" : "";
  const borderedAttrJsx = bordered ? "" : " bordered={false}";
  const borderedAttrHtml = bordered ? "" : ` bordered="false"`;
  const variantAttr = variant !== "light" ? ` variant="${variant}"` : "";
  const baseColorAttr = color !== "accent" ? ` color="${color}"` : "";
  const gradientAttr = variant === "gradient" ? ` gradientTo="${gradientTo}"${gradientDirection !== "to-right" ? ` gradientDirection="${gradientDirection}"` : ""}` : "";
  const colorAttr = `${baseColorAttr}${gradientAttr}`;
  // Only meaningful for "bordered" — no point showing it in the sample for any other variant.
  const borderWidthAttrJsx = showBorderWidthControl && borderWidth !== 2 ? ` borderWidth={${borderWidth}}` : "";
  const borderWidthAttrHtml = showBorderWidthControl && borderWidth !== 2 ? ` border-width="${borderWidth}"` : "";
  const itemsLiteral = `[\n${NAV_ITEMS.map((item) => `    { label: "${item.label}" },`).join("\n")}\n  ]`;
  const defaultActiveItemAttrJsx = defaultActiveItemValue ? ` defaultActiveItem="${defaultActiveItemValue}"` : "";
  // Same attribute names in React and the custom elements, so they ride along on the last attribute of each.
  const motionAttrs = motion.attrs;
  const defaultActiveItemAttrHtml = defaultActiveItemValue ? ` default-active-item="${defaultActiveItemValue}"` : "";

  const code = `<Navbar${brandAttr}${stickyAttr}${borderedAttrJsx}${variantAttr}${colorAttr}${borderWidthAttrJsx}${defaultActiveItemAttrJsx}${motionAttrs}
  onActiveItemChange={(item) => console.log(item)}
  items={${itemsLiteral}}
  actions={<Avatar initials="JD" size="sm" />}
/>`;

  // Custom-element markup: `brand` stays a plain snapshot attribute (simple
  // text), while `actions` (an Avatar component) is projected as light-DOM
  // content via slot="actions" — same treatment NotificationShowcase.tsx
  // gives its `actions` prop. `items` itself always goes through the real
  // property (`.items =` / `:items` / `[items]`), never an attribute — same
  // reasoning as SidebarPlayground's own sample: arrays can't round-trip
  // through a plain HTML attribute string.
  const codeVariants: CodeBlockVariants = {
    react: code,
    js: `<l-navbar id="app-navbar"${brandAttr}${stickyAttr}${borderedAttrHtml}${variantAttr}${colorAttr}${borderWidthAttrHtml}${defaultActiveItemAttrHtml}${motionAttrs}>
  <div slot="actions">
    <l-avatar initials="JD" size="sm"></l-avatar>
  </div>
</l-navbar>

<script type="module">
  import "lojee-ui/elements";

  const navbar = document.getElementById("app-navbar");
  navbar.items = ${itemsLiteral};
  navbar.addEventListener("activeitemchange", (e) => console.log(e.detail));
</script>`,
    vue: `<template>
  <!-- l-Navbar is a native custom element, not a Vue component — Vue's own #slotName shorthand only
       resolves for actual Vue components, so a real light-DOM slot="actions" is what projects here,
       same plain attribute vanilla JS/Angular use below. -->
  <l-navbar${brandAttr}${stickyAttr}${borderedAttrHtml}${variantAttr}${colorAttr}${borderWidthAttrHtml}${defaultActiveItemAttrHtml}${motionAttrs} :items="items" @activeitemchange="(e) => console.log(e.detail)">
    <div slot="actions">
      <l-avatar initials="JD" size="sm" />
    </div>
  </l-navbar>
</template>

<script setup lang="ts">
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
  template: \`<l-navbar${brandAttr}${stickyAttr}${borderedAttrHtml}${variantAttr}${colorAttr}${borderWidthAttrHtml}${defaultActiveItemAttrHtml}${motionAttrs} [items]="items" (activeitemchange)="onActiveItemChange($event.detail)">
    <div slot="actions">
      <l-avatar initials="JD" size="sm" />
    </div>
  </l-navbar>\`,
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
      <div className="sm:col-span-2">
        <span className="mb-1.5 block text-xs font-medium text-fg-subtle">Brand</span>
        <input
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="w-full rounded-md border border-border px-3 py-1.5 text-sm text-fg outline-none transition-colors focus:border-border-strong"
          placeholder="App"
        />
      </div>
      <OptionGroup label="Variant" options={VARIANTS} value={variant} onChange={setVariant} />
      {showBorderWidthControl && (
        <div>
          <span className="mb-1.5 flex items-center justify-between text-xs font-medium text-fg-subtle">
            Border thickness (px)
            <span className="text-fg-muted">{borderWidth}</span>
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
      <OptionGroup
        label="Default active item"
        options={DEFAULT_ACTIVE_OPTIONS}
        value={defaultActiveItem}
        onChange={setDefaultActiveItem}
      />
      <GradientColorSwatches
        gradient={variant === "gradient"}
        color={color}
        onColorChange={setColor}
        gradientTo={gradientTo}
        onGradientToChange={setGradientTo}
        direction={gradientDirection}
        onDirectionChange={setGradientDirection}
      />
      {/* Beside (not below) the color swatches above — a normal, un-col-spanned grid cell, same
          reasoning as OptionGroup/ColorSwatches themselves, so the two share one row instead of this
          stacking as its own full-width row underneath. */}
      <div className="flex flex-col justify-center gap-2">
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 text-xs font-medium text-fg-subtle">
            <input type="checkbox" checked={sticky} onChange={(e) => setSticky(e.target.checked)} />
            Sticky
          </label>
          <label className="flex items-center gap-2 text-xs font-medium text-fg-subtle">
            <input type="checkbox" checked={bordered} onChange={(e) => setBordered(e.target.checked)} />
            Bordered
          </label>
        </div>
        {activeLabel != null && (
          <p className="text-xs font-medium text-fg-subtle">
            Active: <span className="text-fg-muted">{activeLabel}</span>
          </p>
        )}
      </div>
      {motion.controls}
    </PlaygroundLayout>
  );
}
