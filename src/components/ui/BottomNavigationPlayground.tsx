import { useState } from "react";
import { BottomNavigation, type BottomNavigationItem } from "./BottomNavigation/BottomNavigation";
import { OptionGroup, PlaygroundLayout, AppWindowFrame } from "./PlaygroundHelpers";
import type { CodeBlockVariants } from "./CodeBlock";

const LABELS = ["Home", "Search", "Saved", "Profile"] as const;
const ICONS: Record<(typeof LABELS)[number], string> = {
  Home: "home",
  Search: "search",
  Saved: "heart",
  Profile: "user",
};

export default function BottomNavigationPlayground() {
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
      <div className="flex flex-col justify-between bg-white" style={{ height: 280 }}>
        <div className="m-4 flex h-40 items-center justify-center rounded-xl border border-dashed border-slate-200 text-sm text-slate-300">
          Page content
        </div>
        <BottomNavigation items={items} />
      </div>
    </AppWindowFrame>
  );

  const itemsCode = LABELS.map(
    (label) => `    { icon: "${ICONS[label]}", label: "${label}"${label === activeLabel ? ", active: true" : ""} },`
  ).join("\n");

  // `items` is a "json"-typed prop with no native attribute form — it must be
  // assigned as a real DOM property (js) or bound (vue/angular) rather than
  // stringified into the tag.
  const codeVariants: CodeBlockVariants = {
    react: `<BottomNavigation
  items={[
${itemsCode}
  ]}
/>`,
    js: `<BottomNavigation id="bottom-nav-demo" />

<script type="module">
  import "lojee-ui/elements";

  const items = [
${itemsCode}
  ];

  const el = document.getElementById("bottom-nav-demo");
  el.items = items;
</script>`,
    vue: `<template>
  <BottomNavigation :items="items" />
</template>

<script setup>
const items = [
${itemsCode}
];
</script>`,
    angular: `<BottomNavigation [items]="items" />

items = [
${itemsCode}
];`,
  };

  return (
    <PlaygroundLayout preview={preview} variants={codeVariants}>
      <OptionGroup label="Active tab" options={LABELS} value={activeLabel} onChange={setActiveLabel} />
    </PlaygroundLayout>
  );
}
