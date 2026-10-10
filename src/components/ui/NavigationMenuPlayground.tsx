import { useState } from "react";
import { PREVIEW_PAGE_BG } from "./playgroundUtils";
import { NavigationMenu, type NavigationMenuItem, type NavigationMenuOrientation } from "./NavigationMenu/NavigationMenu";
import { OptionGroup, ColorSwatches, PlaygroundLayout, AppWindowFrame } from "./PlaygroundHelpers";
import type { ActiveVariant } from "../../core/activeVariant";
import type { CodeBlockVariants } from "./CodeBlock";
import { useMotion } from "./playgroundMotion";

const ORIENTATIONS: NavigationMenuOrientation[] = ["horizontal", "vertical"];

// "theme" = no `variant` prop: the active item follows the theme's active-item style.
const VARIANTS = ["theme", "solid", "outline", "soft"] as const;
const LABELS = ["Home", "Products", "Pricing", "About", "Contact"] as const;

export default function NavigationMenuPlayground() {
  const motion = useMotion();
  const [orientation, setOrientation] = useState<NavigationMenuOrientation>("horizontal");
  const [color, setColor] = useState<string>("accent");
  const [variant, setVariant] = useState<(typeof VARIANTS)[number]>("theme");
  const [activeLabel, setActiveLabel] = useState<(typeof LABELS)[number]>("Home");

  const items: NavigationMenuItem[] = LABELS.map((label) => ({
    label,
    href: "#",
    active: label === activeLabel,
  }));

  // Horizontal reads as a top nav bar, docked above the page; vertical reads
  // as a side nav, docked to the left — each shown with a little page
  // content in the remaining space.
  const menu = (
    <NavigationMenu
      key={motion.replayKey}
      {...motion.props}
      items={items}
      orientation={orientation}
      color={color}
      variant={variant === "theme" ? undefined : (variant as ActiveVariant)}
      onActiveItemChange={(item) => setActiveLabel(item.label as (typeof LABELS)[number])}
    />
  );

  const pageFiller = (
    <div className="flex h-28 items-center justify-center rounded-xl border border-dashed border-border text-sm text-fg-subtle">
      Page content
    </div>
  );

  const preview = (
    <AppWindowFrame>
      {orientation === "horizontal" ? (
        <div className={`min-h-[220px] flex-1 ${PREVIEW_PAGE_BG}`}>
          <div className="border-b border-border px-4 py-3">{menu}</div>
          <div className="p-6">{pageFiller}</div>
        </div>
      ) : (
        <div className={`flex min-h-[260px] flex-1 ${PREVIEW_PAGE_BG}`}>
          <div className="w-48 shrink-0 border-r border-border p-4">{menu}</div>
          <div className="flex-1 p-6">{pageFiller}</div>
        </div>
      )}
    </AppWindowFrame>
  );

  const itemsCode = LABELS.map(
    (label) => `    { label: "${label}", href: "#"${label === activeLabel ? ", active: true" : ""} },`
  ).join("\n");

  // `items` is a "json"-typed prop with no native attribute form — it must be
  // assigned as a real DOM property (js) or bound (vue/angular) rather than
  // stringified into the tag.
  const attrs = [
    `orientation="${orientation}"`,
    color !== "accent" ? `color="${color}"` : null,
    variant !== "theme" ? `variant="${variant}"` : null,
  ]
    .filter(Boolean)
    .join(" ") + motion.attrs;

  const codeVariants: CodeBlockVariants = {
    react: `<NavigationMenu
  ${attrs}
  items={[
${itemsCode}
  ]}
  onActiveItemChange={(item) => setActiveLabel(item.label)}
/>`,
    js: `<l-navigation-menu id="nav-menu-demo" ${attrs}></l-navigation-menu>

<script type="module">
  import "lojee-ui/elements";

  const items = [
${itemsCode}
  ];

  const el = document.getElementById("nav-menu-demo");
  el.items = items;
  el.addEventListener("activeitemchange", (e) => {
    console.log("Active:", e.detail.label);
  });
</script>`,
    vue: `<template>
  <l-navigation-menu :items="items" ${attrs} @activeitemchange="onChange" />
</template>

<script setup lang="ts">
const items = [
${itemsCode}
];

function onChange(e: CustomEvent) {
  console.log("Active:", e.detail.label);
}
</script>`,
    angular: `<l-navigation-menu [items]="items" ${attrs} (activeitemchange)="onChange($event)"></l-navigation-menu>

items = [
${itemsCode}
];

onChange(e: CustomEvent) {
  console.log("Active:", e.detail.label);
}`,
  };

  return (
    <PlaygroundLayout preview={preview} variants={codeVariants}>
      <OptionGroup label="Orientation" options={ORIENTATIONS} value={orientation} onChange={setOrientation} />
      <OptionGroup label="Variant" options={VARIANTS} value={variant} onChange={setVariant} />
      <ColorSwatches value={color} onChange={setColor} custom />
      <OptionGroup label="Active item" options={LABELS} value={activeLabel} onChange={setActiveLabel} />
      {motion.controls}
    </PlaygroundLayout>
  );
}
