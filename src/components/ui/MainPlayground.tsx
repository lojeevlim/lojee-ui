import { useState } from "react";
import { AppWindowFrame, OptionGroup, PlaygroundLayout } from "./PlaygroundHelpers";
import type { CodeBlockVariants } from "./CodeBlock";
import { useTheme } from "../../core/theme";
import { ThemeProvider } from "./Theme/ThemeProvider";
import { App } from "./AppLayout/App";
import { Main, type MainMargin, type MainPadding, type MainRounded } from "./Main/Main";

const PADDINGS: MainPadding[] = ["none", "sm", "md", "lg", "xl"];
const MARGINS: MainMargin[] = ["none", "sm", "md", "lg", "xl"];
const ROUNDEDS: MainRounded[] = ["none", "sm", "md", "lg", "xl", "2xl", "3xl"];
// What the panel looks like: the built-in default, or one of the class overrides.
const PANELS = ["default", "square", "bare"] as const;
type Panel = (typeof PANELS)[number];
const PANEL_CLASS: Record<Panel, string> = { default: "", square: "rounded-none", bare: "m-0 rounded-none bg-transparent" };

export default function MainPlayground() {
  const { accent, mode: theme } = useTheme();
  const [padding, setPadding] = useState<MainPadding>("md");
  const [margin, setMargin] = useState<MainMargin>("md");
  const [rounded, setRounded] = useState<MainRounded>("xl");
  const [panel, setPanel] = useState<Panel>("default");

  const className = PANEL_CLASS[panel];

  const preview = (
    <AppWindowFrame>
      <div className="relative min-h-[320px] flex-1">
        <ThemeProvider isolated mode={theme} accent={accent}>
          <App layout={[["main"]]} className="!absolute inset-0 !h-auto">
            <Main padding={padding} margin={margin} rounded={rounded} className={className}>
              <div className="flex h-full min-h-[120px] items-center justify-center rounded-lg border border-dashed border-border-strong text-sm text-fg-subtle">
                Page content
              </div>
            </Main>
          </App>
        </ThemeProvider>
      </div>
    </AppWindowFrame>
  );

  const paddingAttr = `${padding !== "md" ? ` padding="${padding}"` : ""}${margin !== "md" ? ` margin="${margin}"` : ""}${rounded !== "xl" ? ` rounded="${rounded}"` : ""}`;
  const reactClass = className ? ` className="${className}"` : "";
  const htmlClass = className ? ` class="${className}"` : "";

  const codeVariants: CodeBlockVariants = {
    react: `<App>
  <Main${paddingAttr}${reactClass}>
    <Dashboard />
  </Main>
</App>`,
    js: `<l-theme-provider default-mode="${theme}" default-accent="${accent}">
  <l-app>
    <l-main${paddingAttr}${htmlClass}>
      <my-dashboard></my-dashboard>
    </l-main>
  </l-app>
</l-theme-provider>

<script type="module">import "lojee-ui/elements";</script>`,
    vue: `<template>
  <l-theme-provider default-mode="${theme}" default-accent="${accent}">
    <l-app>
      <l-main${paddingAttr}${htmlClass}>
        <Dashboard />
      </l-main>
    </l-app>
  </l-theme-provider>
</template>

<script setup lang="ts">
import "lojee-ui/elements";
</script>`,
    angular: `<l-theme-provider default-mode="${theme}" default-accent="${accent}">
  <l-app>
    <l-main${paddingAttr}${htmlClass}>
      <app-dashboard></app-dashboard>
    </l-main>
  </l-app>
</l-theme-provider>`,
  };

  return (
    <PlaygroundLayout preview={preview} variants={codeVariants}>
      <OptionGroup label="Padding" options={PADDINGS} value={padding} onChange={setPadding} />
      <OptionGroup label="Margin" options={MARGINS} value={margin} onChange={setMargin} />
      <OptionGroup label="Rounded" options={ROUNDEDS} value={rounded} onChange={setRounded} />
      <OptionGroup label="Panel" options={PANELS} value={panel} onChange={setPanel} />
    </PlaygroundLayout>
  );
}
