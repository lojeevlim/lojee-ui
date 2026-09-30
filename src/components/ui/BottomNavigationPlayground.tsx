import { useState } from "react";
import { BottomNavigation, type BottomNavigationItem } from "./BottomNavigation/BottomNavigation";
import { OptionGroup, ColorSwatches, PlaygroundLayout, AppWindowFrame } from "./PlaygroundHelpers";
import type { ColorName } from "../../core/tokens";
import type { ActiveVariant } from "../../core/activeVariant";
import type { CodeBlockVariants } from "./CodeBlock";

// "theme" = no `variant` prop: the active tab follows the theme's active-item style. "text" highlights only the icon + label.
const VARIANTS = ["theme", "solid", "outline", "soft", "text"] as const;
const LABELS = ["Home", "Search", "Saved", "Profile"] as const;
const ICONS: Record<(typeof LABELS)[number], string> = {
  Home: "home",
  Search: "search",
  Saved: "heart",
  Profile: "user",
};

export default function BottomNavigationPlayground() {
  const [color, setColor] = useState<ColorName>("accent");
  const [variant, setVariant] = useState<(typeof VARIANTS)[number]>("theme");
  const [activeLabel, setActiveLabel] = useState<(typeof LABELS)[number]>("Home");

  const items: BottomNavigationItem[] = LABELS.map((label) => ({
    icon: ICONS[label],
    label,
    active: label === activeLabel,
  }));

  // Docks to the bottom of a (typically mobile-width) page — shown with
  // page content filling the space above it.
  const preview = (
    <AppWindowFrame className="mx-auto max-w-xs">
      {/* Fills the (full-height) preview window with the bar pinned to its bottom edge, like a phone screen. */}
      <div className="flex min-h-[280px] flex-1 flex-col justify-between bg-surface">
        <div className="m-4 flex flex-1 items-center justify-center rounded-xl border border-dashed border-border text-sm text-border-strong">
          Page content
        </div>
        <BottomNavigation
          items={items}
          color={color}
          variant={variant === "theme" ? undefined : (variant as ActiveVariant | "text")}
          onActiveItemChange={(item) => setActiveLabel(item.label as (typeof LABELS)[number])}
        />
      </div>
    </AppWindowFrame>
  );

  const itemsCode = LABELS.map(
    (label) => `    { icon: "${ICONS[label]}", label: "${label}"${label === activeLabel ? ", active: true" : ""} },`
  ).join("\n");

  // `items` is a "json"-typed prop with no native attribute form — it must be
  // assigned as a real DOM property (js) or bound (vue/angular) rather than
  // stringified into the tag.
  const attrs = [color !== "accent" ? `color="${color}"` : null, variant !== "theme" ? `variant="${variant}"` : null]
    .filter(Boolean)
    .join(" ");
  const attrStr = attrs ? ` ${attrs}` : "";

  const codeVariants: CodeBlockVariants = {
    react: `<BottomNavigation${attrs ? `\n  ${attrs}` : ""}
  items={[
${itemsCode}
  ]}
/>`,
    js: `<l-BottomNavigation id="bottom-nav-demo"${attrStr} />

<script type="module">
  import "lojee-ui/elements";

  const items = [
${itemsCode}
  ];

  const el = document.getElementById("bottom-nav-demo");
  el.items = items;
</script>`,
    vue: `<template>
  <l-BottomNavigation :items="items"${attrStr} />
</template>

<script setup lang="ts">
const items = [
${itemsCode}
];
</script>`,
    angular: `<l-BottomNavigation [items]="items"${attrStr} />

items = [
${itemsCode}
];`,
  };

  return (
    <PlaygroundLayout preview={preview} variants={codeVariants}>
      <OptionGroup label="Variant" options={VARIANTS} value={variant} onChange={setVariant} />
      <ColorSwatches value={color} onChange={setColor} />
      <OptionGroup label="Active tab" options={LABELS} value={activeLabel} onChange={setActiveLabel} />
    </PlaygroundLayout>
  );
}
