import { useState } from "react";
import { Slider, type SliderSize, type SliderThumbVariant, type SliderValuePlacement } from "./Slider/Slider";
import type { ColorName } from "../../core/tokens";
import { OptionGroup, ColorSwatches, PlaygroundLayout, AppWindowFrame, AppWindowBody } from "./PlaygroundHelpers";
import type { CodeBlockVariants } from "./CodeBlock";
import { useMotion } from "./playgroundMotion";

const SIZES: SliderSize[] = ["sm", "md", "lg"];
const PLACEMENTS: SliderValuePlacement[] = ["side", "thumb"];
const THUMBS: SliderThumbVariant[] = ["pill", "circle", "bar", "solid"];

export default function SliderPlayground() {
  const motion = useMotion();
  const [color, setColor] = useState<ColorName>("accent");
  const [showValue, setShowValue] = useState(true);
  const [value, setValue] = useState(50);
  const [size, setSize] = useState<SliderSize>("md");
  const [placement, setPlacement] = useState<SliderValuePlacement>("side");
  const [thumb, setThumb] = useState<SliderThumbVariant>("pill");

  const preview = (
    <AppWindowFrame>
      <AppWindowBody>
        <div className="w-64">
          <Slider key={motion.replayKey} {...motion.props} color={color} size={size} thumbVariant={thumb} valuePlacement={placement} showValue={showValue} value={value} onChange={(e) => setValue(Number(e.target.value))} />
        </div>
      </AppWindowBody>
    </AppWindowFrame>
  );

  const code = `<Slider color="${color}"${size !== "md" ? ` size="${size}"` : ""}${thumb !== "pill" ? ` thumbVariant="${thumb}"` : ""}${showValue && placement !== "side" ? ` valuePlacement="${placement}"` : ""}${showValue ? " showValue" : ""}${motion.attrs} value={${value}} onChange={(e) => setValue(Number(e.target.value))} />`;

  // `value` on <Slider> is a plain string/number prop (not an array like
  // RangeSlider's), and there are no min/max/step controls here, so
  // everything is a plain attribute. `showValue` needs an explicit "true"
  // since r2wc parses a bare attribute as false.
  const htmlMarkup = `<l-slider color="${color}"${size !== "md" ? ` size="${size}"` : ""}${thumb !== "pill" ? ` thumbVariant="${thumb}"` : ""}${showValue && placement !== "side" ? ` valuePlacement="${placement}"` : ""}${
    showValue ? ` showValue` : ""
  }${motion.attrs} value="${value}" />`;

  const codeVariants: CodeBlockVariants = {
    react: code,
    js: `${htmlMarkup}\n\n<script type="module">import "lojee-ui/elements";</script>`,
    vue: htmlMarkup,
    angular: htmlMarkup,
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
