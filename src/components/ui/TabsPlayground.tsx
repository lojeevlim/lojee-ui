import { useState } from "react";
import { Tabs, type TabItem } from "./Tabs/Tabs";
import type { ColorName } from "../../core/tokens";
import { OptionGroup, ColorSwatches, PlaygroundLayout, AppWindowFrame, AppWindowBody } from "./PlaygroundHelpers";
import type { CodeBlockVariants } from "./CodeBlock";
import { useMotion } from "./playgroundMotion";

const INDICES = ["0", "1", "2"] as const;

const SAMPLE_TABS: TabItem[] = [
  { label: "Overview", content: <p className="text-sm text-fg-muted">A quick summary of the project.</p> },
  { label: "Activity", content: <p className="text-sm text-fg-muted">Recent activity shows up here.</p> },
  { label: "Settings", content: <p className="text-sm text-fg-muted">Adjust your preferences.</p> },
];

const SAMPLE_TABS_CODE = `[
    { label: "Overview", content: <p>A quick summary of the project.</p> },
    { label: "Activity", content: <p>Recent activity shows up here.</p> },
    { label: "Settings", content: <p>Adjust your preferences.</p> },
  ]`;

export default function TabsPlayground() {
  const motion = useMotion({ hover: false });
  const [color, setColor] = useState<ColorName>("accent");
  const [defaultIndex, setDefaultIndex] = useState<(typeof INDICES)[number]>("0");

  const preview = (
    <AppWindowFrame>
      <AppWindowBody>
        <Tabs key={motion.replayKey} {...motion.props} tabs={SAMPLE_TABS} color={color} defaultIndex={Number(defaultIndex)} />
      </AppWindowBody>
    </AppWindowFrame>
  );

  const code = `<Tabs
  tabs={${SAMPLE_TABS_CODE}}
  color="${color}"
  defaultIndex={${defaultIndex}}${motion.attrs}
/>`;

  // `tabs` is a "json"-typed prop with no native attribute form — it must be
  // assigned as a real DOM property (js) or bound (vue/angular) rather than
  // stringified into the tag. Its `content` field is plain text here (a
  // registered `<Tabs>` has no slot/prop for arbitrary JSX like the
  // React-only `<p>` wrappers in SAMPLE_TABS above).
  const attrs = `color="${color}" defaultIndex="${defaultIndex}"${motion.attrs}`;

  const tabsData = `  { label: "Overview", content: "A quick summary of the project." },
  { label: "Activity", content: "Recent activity shows up here." },
  { label: "Settings", content: "Adjust your preferences." },`;

  const codeVariants: CodeBlockVariants = {
    react: code,
    js: `<l-tabs id="tabs-demo" ${attrs}></l-tabs>

<script type="module">
  import "lojee-ui/elements";

  const tabs = [
${tabsData}
  ];

  const el = document.getElementById("tabs-demo");
  el.tabs = tabs;
</script>`,
    vue: `<template>
  <l-tabs :tabs="tabs" ${attrs} />
</template>

<script setup lang="ts">
const tabs = [
${tabsData}
];
</script>`,
    angular: `<l-tabs [tabs]="tabs" ${attrs} />

tabs = [
${tabsData}
];`,
  };

  return (
    <PlaygroundLayout preview={preview} variants={codeVariants}>
      <ColorSwatches value={color} onChange={setColor} />
      <OptionGroup label="Default index" options={INDICES} value={defaultIndex} onChange={setDefaultIndex} />
      {motion.controls}
    </PlaygroundLayout>
  );
}
