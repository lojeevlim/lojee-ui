import { useState } from "react";
import { Chart, type ChartType, type ChartVariant } from "./Chart/Chart";
import { OptionGroup, ColorSwatches, PlaygroundLayout, AppWindowFrame, AppWindowBody } from "./PlaygroundHelpers";
import type { ColorName } from "../../core/tokens";
import type { CodeBlockVariants } from "./CodeBlock";
import { useMotion } from "./playgroundMotion";

const TYPES: ChartType[] = ["bar", "line", "donut"];
const VARIANTS: ChartVariant[] = ["default", "values"];
const DURATIONS = ["400", "800", "1200", "2000", "3000"] as const;

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
  const [variant, setVariant] = useState<ChartVariant>("default");
  const [color, setColor] = useState<ColorName>("accent");
  const [showLabels, setShowLabels] = useState(true);
  const [countUp, setCountUp] = useState(true);
  const [duration, setDuration] = useState<(typeof DURATIONS)[number]>("1200");
  const [countKey, setCountKey] = useState(0);
  const motion = useMotion();

  const preview = (
    <AppWindowFrame>
      <AppWindowBody className="min-h-[280px] w-full">
        <div className="w-full max-w-md">
          <Chart key={`${motion.replayKey}-${countKey}`} {...motion.props} countUp={countUp} countUpDuration={Number(duration)} type={type} variant={variant} data={SAMPLE_DATA} color={color} showLabels={showLabels} height={200} />
        </div>
      </AppWindowBody>
    </AppWindowFrame>
  );

  const typeAttr = type !== "bar" ? ` type="${type}"` : "";
  const variantAttr = variant !== "default" ? ` variant="${variant}"` : "";
  const colorAttr = color !== "accent" ? ` color="${color}"` : "";
  const showLabelsAttr = showLabels ? "" : " showLabels={false}";
  const showLabelsAttrHtml = showLabels ? "" : ` showLabels="false"`;
  const customDuration = countUp && duration !== "1200";
  const countUpAttr = (countUp ? "" : " countUp={false}") + (customDuration ? ` countUpDuration={${duration}}` : "");
  const countUpAttrHtml = (countUp ? "" : ' count-up="false"') + (customDuration ? ` count-up-duration="${duration}"` : "");

  const codeVariants: CodeBlockVariants = {
    react: `<Chart${typeAttr}${variantAttr}${colorAttr}${showLabelsAttr}${countUpAttr}${motion.attrs}
  data={[
${SAMPLE_DATA_CODE}
  ]}
/>`,
    js: `<l-chart id="chart-demo"${typeAttr}${variantAttr}${colorAttr}${showLabelsAttrHtml}${countUpAttrHtml}${motion.attrs}></l-chart>

<script type="module">
  import "lojee-ui/elements";

  document.getElementById("chart-demo").data = [
${SAMPLE_DATA_CODE}
  ];
</script>`,
    vue: `<template>
  <l-chart :data="data"${typeAttr}${variantAttr}${colorAttr}${showLabelsAttrHtml}${countUpAttrHtml}${motion.attrs} />
</template>

<script setup lang="ts">
const data = [
${SAMPLE_DATA_CODE}
];
</script>`,
    angular: `<l-chart [data]="data"${typeAttr}${variantAttr}${colorAttr}${showLabelsAttrHtml}${countUpAttrHtml}${motion.attrs} />

data = [
${SAMPLE_DATA_CODE}
];`,
  };

  return (
    <PlaygroundLayout preview={preview} variants={codeVariants}>
      <OptionGroup label="Type" options={TYPES} value={type} onChange={setType} />
      <OptionGroup label="Variant" options={VARIANTS} value={variant} onChange={setVariant} />
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
      {countUp && (
        <OptionGroup
          label="Count-up duration (ms)"
          options={DURATIONS}
          value={duration}
          onChange={(v) => {
            setDuration(v);
            setCountKey((n) => n + 1);
          }}
        />
      )}
      {motion.controls}
    </PlaygroundLayout>
  );
}
