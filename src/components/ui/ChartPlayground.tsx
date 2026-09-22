import { useState } from "react";
import { Chart, type ChartType } from "./Chart/Chart";
import { OptionGroup, ColorSwatches, PlaygroundLayout, AppWindowFrame, AppWindowBody } from "./PlaygroundHelpers";
import type { ColorName } from "../../core/tokens";
import type { CodeBlockVariants } from "./CodeBlock";

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
  const [color, setColor] = useState<ColorName>("indigo");
  const [showLabels, setShowLabels] = useState(true);

  const preview = (
    <AppWindowFrame>
      <AppWindowBody className="min-h-[280px] w-full">
        <div className="w-full max-w-md">
          <Chart type={type} data={SAMPLE_DATA} color={color} showLabels={showLabels} height={200} />
        </div>
      </AppWindowBody>
    </AppWindowFrame>
  );

  const typeAttr = type !== "bar" ? ` type="${type}"` : "";
  const colorAttr = color !== "indigo" ? ` color="${color}"` : "";
  const showLabelsAttr = showLabels ? "" : " showLabels={false}";
  const showLabelsAttrHtml = showLabels ? "" : ` showLabels="false"`;

  const codeVariants: CodeBlockVariants = {
    react: `<Chart${typeAttr}${colorAttr}${showLabelsAttr}
  data={[
${SAMPLE_DATA_CODE}
  ]}
/>`,
    js: `<l-Chart id="chart-demo"${typeAttr}${colorAttr}${showLabelsAttrHtml} />

<script type="module">
  import "lojee-ui/elements";

  document.getElementById("chart-demo").data = [
${SAMPLE_DATA_CODE}
  ];
</script>`,
    vue: `<template>
  <l-Chart :data="data"${typeAttr}${colorAttr}${showLabelsAttrHtml} />
</template>

<script setup lang="ts">
const data = [
${SAMPLE_DATA_CODE}
];
</script>`,
    angular: `<l-Chart [data]="data"${typeAttr}${colorAttr}${showLabelsAttrHtml} />

data = [
${SAMPLE_DATA_CODE}
];`,
  };

  return (
    <PlaygroundLayout preview={preview} variants={codeVariants}>
      <OptionGroup label="Type" options={TYPES} value={type} onChange={setType} />
      <ColorSwatches value={color} onChange={setColor} />
      <label className="flex items-center gap-2 text-xs font-medium text-slate-500">
        <input type="checkbox" checked={showLabels} onChange={(e) => setShowLabels(e.target.checked)} />
        Show labels
      </label>
    </PlaygroundLayout>
  );
}
