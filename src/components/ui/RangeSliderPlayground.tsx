import { useState } from "react";
import { RangeSlider } from "./RangeSlider/RangeSlider";
import type { ColorName } from "../../core/tokens";
import { ColorSwatches, PlaygroundLayout, AppWindowFrame, AppWindowBody } from "./PlaygroundHelpers";
import type { CodeBlockVariants } from "./CodeBlock";

export default function RangeSliderPlayground() {
  const [color, setColor] = useState<ColorName>("slate");
  const [showValue, setShowValue] = useState(true);
  const [value, setValue] = useState<[number, number]>([20, 70]);

  const preview = (
    <AppWindowFrame>
      <AppWindowBody>
        <div className="w-64">
          <RangeSlider color={color} showValue={showValue} value={value} onChange={setValue} />
        </div>
      </AppWindowBody>
    </AppWindowFrame>
  );

  const code = `<RangeSlider color="${color}"${showValue ? " showValue" : ""} value={[${value[0]}, ${value[1]}]} onChange={setValue} />`;

  // `value` is registered as a "json" prop on <RangeSlider> — it's a
  // [number, number] tuple, not a single native input value, so it must be
  // assigned as a real DOM property (js) / bound (vue/angular), never a
  // stringified attribute. `showValue` needs an explicit "true" since r2wc
  // parses a bare attribute as false.
  const valueLiteral = `[${value[0]}, ${value[1]}]`;
  const showValueAttr = showValue ? ` showValue` : "";

  const codeVariants: CodeBlockVariants = {
    react: code,
    js: `<RangeSlider id="range-slider" color="${color}"${showValueAttr} />

<script type="module">
  import "lojee-ui/elements";

  document.querySelector("#range-slider").value = ${valueLiteral};
</script>`,
    vue: `<template>
  <RangeSlider :value="value" color="${color}"${showValueAttr} />
</template>

<script setup>
const value = ${valueLiteral};
</script>`,
    angular: `<RangeSlider [value]="value" color="${color}"${showValueAttr} />

value = ${valueLiteral};`,
  };

  return (
    <PlaygroundLayout preview={preview} variants={codeVariants}>
      <ColorSwatches value={color} onChange={setColor} />

      <div>
        <span className="mb-1.5 block text-xs font-medium text-slate-500">Options</span>
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setShowValue((v) => !v)}
            className={
              "rounded-md px-2.5 py-1 text-xs font-medium transition-colors " +
              (showValue ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200")
            }
          >
            Show value
          </button>
        </div>
      </div>
    </PlaygroundLayout>
  );
}
