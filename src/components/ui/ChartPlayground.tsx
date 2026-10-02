import { useState } from "react";
import { Chart, type ChartType } from "./Chart/Chart";
import { OptionGroup, ColorSwatches, PlaygroundLayout, AppWindowFrame, AppWindowBody } from "./PlaygroundHelpers";
import type { ColorName } from "../../core/tokens";
import type { CodeBlockVariants } from "./CodeBlock";
import { useMotion } from "./playgroundMotion";

const TYPES: ChartType[] = ["bar", "line", "donut"];

const SAMPLE_DATA = [
  { label: "Mon", value: 24 },
  { label: "Tue", value: 33 },
  { label: "Wed", value: 28 },
  { label: "Thu", value: 41 },
  { label: "Fri", value: 36 },
];

const SAMPLE_DATA_CODE = `  { label: "Mon", value: 24 },
  { label: "Tue", value: 33 },
  { label: "Wed", value: 28 },
  { label: "Thu", value: 41 },
  { label: "Fri", value: 36 },`;

export default function ChartPlayground() {
  const [type, setType] = useState<ChartType>("bar");
  const [color, setColor] = useState<ColorName>("accent");
  const [showLabels, setShowLabels] = useState(true);
  const [countUp, setCountUp] = useState(false);
  const [countKey, setCountKey] = useState(0);
  const motion = useMotion();

  const preview = (
    <AppWindowFrame>
      <AppWindowBody className="min-h-[280px] w-full">
        <div className="w-full max-w-md">
          <Chart key={`${motion.replayKey}-${countKey}`} {...motion.props} countUp={countUp} type={type} data={SAMPLE_DATA} color={color} showLabels={showLabels} height={200} />
        </div>
      </AppWindowBody>
    </AppWindowFrame>
  );

  const typeAttr = type !== "bar" ? ` type="${type}"` : "";
  const colorAttr = color !== "accent" ? ` color="${color}"` : "";
  const showLabelsAttr = showLabels ? "" : " showLabels={false}";
  const showLabelsAttrHtml = showLabels ? "" : ` showLabels="false"`;
  const countUpAttr = countUp ? " countUp" : "";

  const codeVariants: CodeBlockVariants = {
    react: `<Chart${typeAttr}${colorAttr}${showLabelsAttr}${countUpAttr}${motion.attrs}
  data={[
${SAMPLE_DATA_CODE}
  ]}
/>`,
    js: `<l-Chart id="chart-demo"${typeAttr}${colorAttr}${showLabelsAttrHtml}${countUpAttr}${motion.attrs}></l-Chart>

<script type="module">
  import "lojee-ui/elements";

  document.getElementById("chart-demo").data = [
${SAMPLE_DATA_CODE}
  ];
</script>`,
    vue: `<template>
  <l-Chart :data="data"${typeAttr}${colorAttr}${showLabelsAttrHtml}${countUpAttr}${motion.attrs} />
</template>

<script setup lang="ts">
const data = [
${SAMPLE_DATA_CODE}
];
</script>`,
    angular: `<l-Chart [data]="data"${typeAttr}${colorAttr}${showLabelsAttrHtml}${countUpAttr}${motion.attrs} />

data = [
${SAMPLE_DATA_CODE}
];`,
  };

  return (
    <PlaygroundLayout preview={preview} variants={codeVariants}>
      <OptionGroup label="Type" options={TYPES} value={type} onChange={setType} />
      <ColorSwatches value={color} onChange={setColor} />
      <label className="flex items-center gap-2 text-xs font-medium text-fg-subtle">
        <input type="checkbox" checked={showLabels} onChange={(e) => setShowLabels(e.target.checked)} />
        Show labels
      </label>
      <div className="flex items-center gap-3">
        <label className="flex items-center gap-2 text-xs font-medium text-fg-subtle">
          <input
            type="checkbox"
            checked={countUp}
            onChange={(e) => {
              setCountUp(e.target.checked);
              setCountKey((n) => n + 1);
            }}
          />
          Count up
        </label>
        {countUp && (
          <button type="button" onClick={() => setCountKey((n) => n + 1)} className="rounded-md bg-surface-muted px-2.5 py-1 text-xs font-medium text-fg-muted hover:bg-border">
            Replay
          </button>
        )}
      </div>
      {motion.controls}
    </PlaygroundLayout>
  );
}
