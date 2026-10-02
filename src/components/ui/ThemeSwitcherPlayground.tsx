import { useState } from "react";
import { PREVIEW_PAGE_BG } from "./playgroundUtils";
import { AppWindowFrame, OptionGroup, PlaygroundLayout } from "./PlaygroundHelpers";
import type { CodeBlockVariants } from "./CodeBlock";
import { ThemeSwitcher } from "./ThemeSwitcher/ThemeSwitcher";

const ALIGNS = ["start", "center", "end"] as const;
const TOGGLE = ["on", "off"] as const;

export default function ThemeSwitcherPlayground() {
  const [align, setAlign] = useState<(typeof ALIGNS)[number]>("start");
  const [activeItems, setActiveItems] = useState<(typeof TOGGLE)[number]>("on");
  // Accent off by default: its 12 colors make the dropdown tall, and a short one shows the placement better.
  const [accent, setAccent] = useState<(typeof TOGGLE)[number]>("off");
  // Keep the menu showing so every setting is visible immediately, without clicking the button first.
  const [pinned, setPinned] = useState<(typeof TOGGLE)[number]>("on");

  const preview = (
    <AppWindowFrame className="overflow-auto">
      {/* The button stays put near the top of the window; only the dropdown moves with `align`. */}
      <div className={`flex min-h-[460px] min-w-[480px] flex-1 items-start justify-center ${PREVIEW_PAGE_BG} px-6 pb-6 pt-8`}>
        <ThemeSwitcher align={align} showActiveItems={activeItems === "on"} showAccent={accent === "on"} open={pinned === "on" ? true : undefined} />
      </div>
    </AppWindowFrame>
  );

  const reactAttrs = [
    align !== "end" && ` align="${align}"`,
    activeItems === "off" && " showActiveItems={false}",
    accent === "off" && " showAccent={false}",
  ]
    .filter(Boolean)
    .join("");
  const htmlAttrs = (bind: (name: string) => string) =>
    [align !== "end" && ` align="${align}"`, activeItems === "off" && ` ${bind("show-active-items")}`, accent === "off" && ` ${bind("show-accent")}`]
      .filter(Boolean)
      .join("");

  const codeVariants: CodeBlockVariants = {
    react: `<ThemeProvider>
  <ThemeSwitcher${reactAttrs} />
</ThemeProvider>`,
    js: `<l-Theme-Provider default-mode="light" default-accent="orange">
  <l-Theme-Switcher${htmlAttrs((n) => `${n}="false"`)}></l-Theme-Switcher>
</l-Theme-Provider>

<script type="module">import "lojee-ui/elements";</script>`,
    vue: `<template>
  <l-Theme-Provider default-mode="light" default-accent="orange">
    <l-Theme-Switcher${htmlAttrs((n) => `:${n}="false"`)}></l-Theme-Switcher>
  </l-Theme-Provider>
</template>

<script setup lang="ts">
import "lojee-ui/elements";
</script>`,
    angular: `<l-Theme-Provider default-mode="light" default-accent="orange">
  <l-Theme-Switcher${htmlAttrs((n) => `[${n.replace(/-(\w)/g, (_, c: string) => c.toUpperCase())}]="false"`)}></l-Theme-Switcher>
</l-Theme-Provider>`,
  };

  return (
    <PlaygroundLayout preview={preview} variants={codeVariants}>
      <OptionGroup label="Dropdown align" options={ALIGNS} value={align} onChange={setAlign} />
      <OptionGroup label="Active items section" options={TOGGLE} value={activeItems} onChange={setActiveItems} />
      <OptionGroup label="Accent section" options={TOGGLE} value={accent} onChange={setAccent} />
      <OptionGroup label="Keep menu open" options={TOGGLE} value={pinned} onChange={setPinned} />
    </PlaygroundLayout>
  );
}
