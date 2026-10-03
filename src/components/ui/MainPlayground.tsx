import { useState } from "react";
import { AppWindowFrame, ColorSwatches, OptionGroup, PlaygroundLayout } from "./PlaygroundHelpers";
import type { CodeBlockVariants } from "./CodeBlock";
import type { ColorName } from "../../core/tokens";
import { useTheme, type Accent, type ThemeMode } from "../../core/theme";
import { ThemeProvider } from "./Theme/ThemeProvider";
import { App } from "./AppLayout/App";
import { Main, type MainPadding } from "./Main/Main";

const PADDINGS: MainPadding[] = ["none", "sm", "md", "lg", "xl"];
const THEMES: ThemeMode[] = ["light", "dark"];
// What the panel looks like: the built-in default, or one of the class overrides.
const PANELS = ["default", "square", "bare"] as const;
type Panel = (typeof PANELS)[number];
const PANEL_CLASS: Record<Panel, string> = { default: "", square: "rounded-none", bare: "m-0 rounded-none bg-transparent" };

export default function MainPlayground() {
  const { accent: siteAccent } = useTheme();
  const [padding, setPadding] = useState<MainPadding>("md");
  const [panel, setPanel] = useState<Panel>("default");
  const [theme, setTheme] = useState<ThemeMode>("light");
  const [accent, setAccent] = useState<Accent>(siteAccent);
  // Follow the site accent when it changes (the swatches can still override it).
  const [prevSiteAccent, setPrevSiteAccent] = useState(siteAccent);
  if (prevSiteAccent !== siteAccent) {
    setPrevSiteAccent(siteAccent);
    setAccent(siteAccent);
  }

  const className = PANEL_CLASS[panel];

  const preview = (
    <AppWindowFrame>
      <div className="relative min-h-[320px] flex-1">
        <ThemeProvider isolated mode={theme} accent={accent}>
          <App layout={[["main"]]} className="!absolute inset-0 !h-auto">
            <Main padding={padding} className={className}>
              <div className="flex h-full min-h-[120px] items-center justify-center rounded-lg border border-dashed border-border-strong text-sm text-fg-subtle">
                Page content
              </div>
            </Main>
          </App>
        </ThemeProvider>
      </div>
    </AppWindowFrame>
  );

  const paddingAttr = padding !== "md" ? ` padding="${padding}"` : "";
  const reactClass = className ? ` className="${className}"` : "";
  const htmlClass = className ? ` class="${className}"` : "";

  const codeVariants: CodeBlockVariants = {
    react: `<App>
  <Main${paddingAttr}${reactClass}>
    <Dashboard />
  </Main>
</App>`,
    js: `<l-Theme-Provider default-mode="${theme}" default-accent="${accent}">
  <l-App>
    <l-Main${paddingAttr}${htmlClass}>
      <my-dashboard></my-dashboard>
    </l-Main>
  </l-App>
</l-Theme-Provider>

<script type="module">import "lojee-ui/elements";</script>`,
    vue: `<template>
  <l-Theme-Provider default-mode="${theme}" default-accent="${accent}">
    <l-App>
      <l-Main${paddingAttr}${htmlClass}>
        <Dashboard />
      </l-Main>
    </l-App>
  </l-Theme-Provider>
</template>

<script setup lang="ts">
import "lojee-ui/elements";
</script>`,
    angular: `<l-Theme-Provider default-mode="${theme}" default-accent="${accent}">
  <l-App>
    <l-Main${paddingAttr}${htmlClass}>
      <app-dashboard></app-dashboard>
    </l-Main>
  </l-App>
</l-Theme-Provider>`,
  };

  return (
    <PlaygroundLayout preview={preview} variants={codeVariants}>
      <OptionGroup label="Padding" options={PADDINGS} value={padding} onChange={setPadding} />
      <OptionGroup label="Panel" options={PANELS} value={panel} onChange={setPanel} />
      <OptionGroup label="Theme" options={THEMES} value={theme} onChange={setTheme} />
      <ColorSwatches label="Accent" value={accent as ColorName} onChange={(c) => setAccent(c as Accent)} />
    </PlaygroundLayout>
  );
}
