import { useState } from "react";
import { NavigationMenu, type NavigationMenuItem, type NavigationMenuOrientation } from "./NavigationMenu/NavigationMenu";
import { OptionGroup, PlaygroundLayout, AppWindowFrame } from "./PlaygroundHelpers";
import type { CodeBlockVariants } from "./CodeBlock";

const ORIENTATIONS: NavigationMenuOrientation[] = ["horizontal", "vertical"];

const LABELS = ["Home", "Products", "Pricing", "About", "Contact"] as const;

export default function NavigationMenuPlayground() {
  const [orientation, setOrientation] = useState<NavigationMenuOrientation>("horizontal");
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
      items={items}
      orientation={orientation}
      onChange={(_, item) => setActiveLabel(item.label as (typeof LABELS)[number])}
    />
  );

  const pageFiller = (
    <div className="flex h-28 items-center justify-center rounded-xl border border-dashed border-slate-200 text-sm text-slate-300">
      Page content
    </div>
  );

  const preview = (
    <AppWindowFrame>
      {orientation === "horizontal" ? (
        <div className="bg-white" style={{ height: 220 }}>
          <div className="border-b border-slate-200 px-4 py-3">{menu}</div>
          <div className="p-6">{pageFiller}</div>
        </div>
      ) : (
        <div className="flex bg-white" style={{ height: 260 }}>
          <div className="w-48 shrink-0 border-r border-slate-200 p-4">{menu}</div>
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
  const attrs = `orientation="${orientation}"`;

  const codeVariants: CodeBlockVariants = {
    react: `<NavigationMenu
  ${attrs}
  items={[
${itemsCode}
  ]}
  onChange={(index, item) => setActiveLabel(item.label)}
/>`,
    js: `<l-NavigationMenu id="nav-menu-demo" ${attrs} />

<script type="module">
  import "lojee-ui/elements";

  const items = [
${itemsCode}
  ];

  const el = document.getElementById("nav-menu-demo");
  el.items = items;
  el.addEventListener("change", (e) => {
    console.log("Selected index:", e.detail);
  });
</script>`,
    vue: `<template>
  <l-NavigationMenu :items="items" ${attrs} @change="onChange" />
</template>

<script setup>
const items = [
${itemsCode}
];

function onChange(index) {
  console.log("Selected index:", index);
}
</script>`,
    angular: `<l-NavigationMenu [items]="items" ${attrs} (change)="onChange($event)"></l-NavigationMenu>

items = [
${itemsCode}
];

onChange(index: number) {
  console.log("Selected index:", index);
}`,
  };

  return (
    <PlaygroundLayout preview={preview} variants={codeVariants}>
      <OptionGroup label="Orientation" options={ORIENTATIONS} value={orientation} onChange={setOrientation} />
      <OptionGroup label="Active item" options={LABELS} value={activeLabel} onChange={setActiveLabel} />
    </PlaygroundLayout>
  );
}
