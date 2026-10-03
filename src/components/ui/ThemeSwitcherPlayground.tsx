import { useState } from "react";
import { PREVIEW_PAGE_BG } from "./playgroundUtils";
import { AppWindowFrame, OptionGroup, PlaygroundLayout } from "./PlaygroundHelpers";
import type { CodeBlockVariants } from "./CodeBlock";
import { ThemeSwitcher } from "./ThemeSwitcher/ThemeSwitcher";
import { useMotion } from "./playgroundMotion";
import { DEFAULT_ACCENT, DEFAULT_DESIGN, useTheme } from "../../core/theme";

const ALIGNS = ["start", "center", "end"] as const;
const TOGGLE = ["on", "off"] as const;

export default function ThemeSwitcherPlayground() {
  const motion = useMotion();
  // What the switcher in the preview has picked — the page theme — so the sample code starts from the same mode and accent.
  const { mode: themeMode, accent: themeAccent, design: themeDesign } = useTheme();
  const [align, setAlign] = useState<(typeof ALIGNS)[number]>("start");
  const [design, setDesign] = useState<(typeof TOGGLE)[number]>("on");
  const [activeItems, setActiveItems] = useState<(typeof TOGGLE)[number]>("on");
  // Accent on by default so the built-in colors and the "Custom" row (any color from a picker) are visible right away.
  const [accent, setAccent] = useState<(typeof TOGGLE)[number]>("on");
  const [custom, setCustom] = useState<(typeof TOGGLE)[number]>("on");
  // Keep the menu showing so every setting is visible immediately, without clicking the button first.
  const [pinned, setPinned] = useState<(typeof TOGGLE)[number]>("on");

  const preview = (
    <AppWindowFrame className="overflow-auto">
      {/* The button stays put near the top of the window; only the dropdown moves with `align`. */}
      <div className={`flex min-h-[460px] min-w-[480px] flex-1 items-start justify-center ${PREVIEW_PAGE_BG} px-6 pb-6 pt-8`}>
        <ThemeSwitcher key={motion.replayKey} align={align} showDesign={design === "on"} showActiveItems={activeItems === "on"} showAccent={accent === "on"} showCustom={custom === "on"} open={pinned === "on" ? true : undefined} {...motion.props} />
      </div>
    </AppWindowFrame>
  );

  const reactAttrs = [
    align !== "end" && ` align="${align}"`,
    design === "off" && " showDesign={false}",
    activeItems === "off" && " showActiveItems={false}",
    accent === "off" && " showAccent={false}",
    accent === "on" && custom === "off" && " showCustom={false}",
  ]
    .filter(Boolean)
    .join("") + motion.attrs;
  const htmlAttrs = (bind: (name: string) => string) =>
    [align !== "end" && ` align="${align}"`, design === "off" && ` ${bind("show-design")}`, activeItems === "off" && ` ${bind("show-active-items")}`, accent === "off" && ` ${bind("show-accent")}`,
      accent === "on" && custom === "off" && ` ${bind("show-custom")}`,
    ]
      .filter(Boolean)
      .join("") + motion.attrs;

  const providerProps = `${themeMode !== "light" ? ` defaultMode="${themeMode}"` : ""}${themeAccent !== DEFAULT_ACCENT ? ` defaultAccent="${themeAccent}"` : ""}${themeDesign !== DEFAULT_DESIGN ? ` defaultDesign="${themeDesign}"` : ""}`;

  const codeVariants: CodeBlockVariants = {
    react: `<ThemeProvider${providerProps}>
  <ThemeSwitcher${reactAttrs} />
</ThemeProvider>`,
    js: `<l-Theme-Provider default-mode="${themeMode}" default-accent="${themeAccent}"${themeDesign !== DEFAULT_DESIGN ? ` default-design="${themeDesign}"` : ""}>
  <l-Theme-Switcher${htmlAttrs((n) => `${n}="false"`)}></l-Theme-Switcher>
</l-Theme-Provider>

<script type="module">import "lojee-ui/elements";</script>`,
    vue: `<template>
  <l-Theme-Provider default-mode="${themeMode}" default-accent="${themeAccent}"${themeDesign !== DEFAULT_DESIGN ? ` default-design="${themeDesign}"` : ""}>
    <l-Theme-Switcher${htmlAttrs((n) => `:${n}="false"`)}></l-Theme-Switcher>
  </l-Theme-Provider>
</template>

<script setup lang="ts">
import "lojee-ui/elements";
</script>`,
    angular: `<l-Theme-Provider default-mode="${themeMode}" default-accent="${themeAccent}"${themeDesign !== DEFAULT_DESIGN ? ` default-design="${themeDesign}"` : ""}>
  <l-Theme-Switcher${htmlAttrs((n) => `[${n.replace(/-(\w)/g, (_, c: string) => c.toUpperCase())}]="false"`)}></l-Theme-Switcher>
</l-Theme-Provider>`,
  };

  return (
    <PlaygroundLayout preview={preview} variants={codeVariants}>
      <OptionGroup label="Dropdown align" options={ALIGNS} value={align} onChange={setAlign} />
      <OptionGroup label="Design section" options={TOGGLE} value={design} onChange={setDesign} />
      <OptionGroup label="Active items section" options={TOGGLE} value={activeItems} onChange={setActiveItems} />
      <OptionGroup label="Accent section" options={TOGGLE} value={accent} onChange={setAccent} />
      {accent === "on" && <OptionGroup label="Custom color row" options={TOGGLE} value={custom} onChange={setCustom} />}
      <OptionGroup label="Keep menu open" options={TOGGLE} value={pinned} onChange={setPinned} />
      {motion.controls}
    </PlaygroundLayout>
  );
}
