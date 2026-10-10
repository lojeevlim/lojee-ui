import { useState } from "react";
import { PREVIEW_PAGE_BG } from "./playgroundUtils";
import { BottomNavigation, type BottomNavigationItem } from "./BottomNavigation/BottomNavigation";
import { OptionGroup, ColorSwatches, PlaygroundLayout, AppWindowFrame } from "./PlaygroundHelpers";
import type { ActiveVariant } from "../../core/activeVariant";
import type { CodeBlockVariants } from "./CodeBlock";
import { useMotion } from "./playgroundMotion";

// "theme" = no `variant` prop: the active tab follows the theme's active-item style. "text" highlights only the icon + label.
const VARIANTS = ["theme", "solid", "outline", "soft", "text"] as const;
const FABS = ["none", "plus", "scan", "search", "zap"] as const;
const LABELS = ["Home", "Search", "Saved", "Profile"] as const;
const ICONS: Record<(typeof LABELS)[number], string> = {
  Home: "home",
  Search: "search",
  Saved: "heart",
  Profile: "user",
};

export default function BottomNavigationPlayground() {
  const motion = useMotion();
  const [color, setColor] = useState<string>("accent");
  const [iconOnly, setIconOnly] = useState(false);
  const [fab, setFab] = useState<(typeof FABS)[number]>("none");
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
      <div className={`flex min-h-[280px] flex-1 flex-col justify-between ${PREVIEW_PAGE_BG}`}>
        <div className="m-4 flex flex-1 items-center justify-center rounded-xl border border-dashed border-border text-sm text-border-strong">
          Page content
        </div>
        <BottomNavigation
          key={motion.replayKey}
          {...motion.props}
          items={items}
          color={color}
          iconOnly={iconOnly}
          fabIcon={fab === "none" ? undefined : fab}
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
  const attrs = [color !== "accent" ? `color="${color}"` : null, variant !== "theme" ? `variant="${variant}"` : null, iconOnly ? `iconOnly="true"` : null, fab !== "none" ? `fabIcon="${fab}"` : null, motion.attrs.trim() || null]
    .filter(Boolean)
    .join(" ");
  const attrStr = attrs ? ` ${attrs}` : "";

  const codeVariants: CodeBlockVariants = {
    react: `<BottomNavigation${attrs ? `\n  ${attrs}` : ""}
  items={[
${itemsCode}
  ]}
/>`,
    js: `<l-bottom-navigation id="bottom-nav-demo"${attrStr}></l-bottom-navigation>

<script type="module">
  import "lojee-ui/elements";

  const items = [
${itemsCode}
  ];

  const el = document.getElementById("bottom-nav-demo");
  el.items = items;
</script>`,
    vue: `<template>
  <l-bottom-navigation :items="items"${attrStr} />
</template>

<script setup lang="ts">
const items = [
${itemsCode}
];
</script>`,
    angular: `<l-bottom-navigation [items]="items"${attrStr} />

items = [
${itemsCode}
];`,
  };

  return (
    <PlaygroundLayout preview={preview} variants={codeVariants}>
      <div>
        <span className="mb-1.5 block text-xs font-medium text-fg-subtle">Labels</span>
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setIconOnly((v) => !v)}
            className={"rounded-md px-2.5 py-1 text-xs font-medium transition-colors " + (iconOnly ? "bg-fg text-surface" : "bg-surface-muted text-fg-muted hover:bg-border")}
          >
            Icon only
          </button>
        </div>
      </div>
      <OptionGroup label="Floating button" options={FABS} value={fab} onChange={setFab} />
      <OptionGroup label="Variant" options={VARIANTS} value={variant} onChange={setVariant} />
      <ColorSwatches value={color} onChange={setColor} custom />
      <OptionGroup label="Active tab" options={LABELS} value={activeLabel} onChange={setActiveLabel} />
      {motion.controls}
    </PlaygroundLayout>
  );
}
