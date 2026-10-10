import { useState } from "react";
import { RangeSlider } from "./RangeSlider/RangeSlider";
import type { SliderSize, SliderThumbVariant, SliderValuePlacement } from "./Slider/Slider";
import type { ColorName } from "../../core/tokens";
import { OptionGroup, ColorSwatches, PlaygroundLayout, AppWindowFrame, AppWindowBody } from "./PlaygroundHelpers";
import type { CodeBlockVariants } from "./CodeBlock";
import { useMotion } from "./playgroundMotion";

const SIZES: SliderSize[] = ["sm", "md", "lg"];
const PLACEMENTS: SliderValuePlacement[] = ["side", "thumb"];
const THUMBS: SliderThumbVariant[] = ["pill", "circle", "bar", "solid"];

export default function RangeSliderPlayground() {
  const motion = useMotion();
  const [color, setColor] = useState<ColorName>("accent");
  const [showValue, setShowValue] = useState(true);
  const [size, setSize] = useState<SliderSize>("md");
  const [placement, setPlacement] = useState<SliderValuePlacement>("side");
  const [thumb, setThumb] = useState<SliderThumbVariant>("pill");
  const [value, setValue] = useState<[number, number]>([20, 70]);

  const preview = (
    <AppWindowFrame>
      <AppWindowBody>
        <div className="w-64">
          <RangeSlider key={motion.replayKey} {...motion.props} color={color} size={size} thumbVariant={thumb} valuePlacement={placement} showValue={showValue} value={value} onChange={setValue} />
        </div>
      </AppWindowBody>
    </AppWindowFrame>
  );

  const code = `<RangeSlider color="${color}"${size !== "md" ? ` size="${size}"` : ""}${thumb !== "pill" ? ` thumbVariant="${thumb}"` : ""}${showValue && placement !== "side" ? ` valuePlacement="${placement}"` : ""}${showValue ? " showValue" : ""}${motion.attrs} value={[${value[0]}, ${value[1]}]} onChange={setValue} />`;

  // `value` is registered as a "json" prop on <RangeSlider> — it's a
  // [number, number] tuple, not a single native input value, so it must be
  // assigned as a real DOM property (js) / bound (vue/angular), never a
  // stringified attribute. `showValue` needs an explicit "true" since r2wc
  // parses a bare attribute as false.
  const valueLiteral = `[${value[0]}, ${value[1]}]`;
  const showValueAttr = `${size !== "md" ? ` size="${size}"` : ""}${thumb !== "pill" ? ` thumbVariant="${thumb}"` : ""}${showValue && placement !== "side" ? ` valuePlacement="${placement}"` : ""}` + (showValue ? ` showValue` : "") + motion.attrs;

  const codeVariants: CodeBlockVariants = {
    react: code,
    js: `<l-range-slider id="range-slider" color="${color}"${showValueAttr}></l-range-slider>

<script type="module">
  import "lojee-ui/elements";

  document.querySelector("#range-slider").value = ${valueLiteral};
</script>`,
    vue: `<template>
  <l-range-slider :value="value" color="${color}"${showValueAttr} />
</template>

<script setup lang="ts">
const value = ${valueLiteral};
</script>`,
    angular: `<l-range-slider [value]="value" color="${color}"${showValueAttr} />

value = ${valueLiteral};`,
  };

  return (
    <PlaygroundLayout preview={preview} variants={codeVariants}>
      <ColorSwatches value={color} onChange={setColor} />
      <OptionGroup label="Size" options={SIZES} value={size} onChange={setSize} />
      <OptionGroup label="Value" options={PLACEMENTS} value={placement} onChange={setPlacement} />
      <OptionGroup label="Thumb" options={THUMBS} value={thumb} onChange={setThumb} />

      <div>
        <span className="mb-1.5 block text-xs font-medium text-fg-subtle">Options</span>
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setShowValue((v) => !v)}
            className={
              "rounded-md px-2.5 py-1 text-xs font-medium transition-colors " +
              (showValue ? "bg-fg text-surface" : "bg-surface-muted text-fg-muted hover:bg-border")
            }
          >
            Show value
          </button>
        </div>
      </div>
      {motion.controls}
    </PlaygroundLayout>
  );
}
